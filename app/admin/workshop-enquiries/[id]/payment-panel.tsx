"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  derivePaymentStatus,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_COLOURS,
  pence2gbp,
  type DerivedPaymentStatus,
} from "@/lib/payment-utils";

interface Payment {
  id: string;
  amount_pence: number;
  paid_on: string; // ISO date string
  note: string | null;
}

interface Props {
  enquiryId: string;
  workshopId: string | null;
  // Current DB values
  roomType: string | null;
  peopleCount: number | null;
  agreedPricePp: number | null;
  earlyBirdOverride: boolean | null;
  manualPaymentStatus: string | null;
  acceptedAt: string | null;
  payments: Payment[];
  // Config passed from server (pence)
  depositPence: number;       // per person
  balanceDueDateIso: string | null;
  // For EB auto-detection
  earlyBirdAuto: boolean;
  // Suggested people count from partner presence
  suggestedPeople: number;
}

function isoToInputDate(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

const SECTION =
  "text-gold font-semibold text-sm uppercase tracking-widest mb-3 border-b border-white/10 pb-2";

export default function PaymentPanel(props: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // ── Setup state ──────────────────────────────────────────────────────────
  const [roomType, setRoomType] = useState<"single" | "shared" | null>(
    (props.roomType as "single" | "shared") ?? null
  );
  const [peopleCount, setPeopleCount] = useState<number>(
    props.peopleCount ?? props.suggestedPeople
  );
  const [earlyBirdOverride, setEarlyBirdOverride] = useState<boolean | null>(
    props.earlyBirdOverride
  );
  const [agreedPricePp, setAgreedPricePp] = useState<number | null>(
    props.agreedPricePp
  );
  const [setupSaved, setSetupSaved] = useState(!!props.roomType);

  // ── Quick-record state ───────────────────────────────────────────────────
  const [showAddForm, setShowAddForm] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [addDate, setAddDate] = useState(new Date().toISOString().slice(0, 10));
  const [addNote, setAddNote] = useState("");
  const [addSaving, setAddSaving] = useState(false);
  const [addErr, setAddErr] = useState("");

  // ── Manual payment status ────────────────────────────────────────────────
  const [manualStatus, setManualStatus] = useState<string | null>(
    props.manualPaymentStatus
  );
  const [statusSaving, setStatusSaving] = useState(false);

  // ── Derived values ────────────────────────────────────────────────────────
  const effectiveEarlyBird = earlyBirdOverride !== null ? earlyBirdOverride : props.earlyBirdAuto;
  const totalPaidPence = props.payments.reduce((s, p) => s + p.amount_pence, 0);
  const totalDuePence = agreedPricePp != null ? agreedPricePp * peopleCount : null;
  const depositDuePence = props.depositPence * peopleCount;
  const outstandingPence = totalDuePence != null ? totalDuePence - totalPaidPence : null;

  const derivedStatus: DerivedPaymentStatus | null =
    totalDuePence != null
      ? derivePaymentStatus(manualStatus, totalPaidPence, totalDuePence, depositDuePence)
      : null;

  const isOverdue =
    props.balanceDueDateIso &&
    outstandingPence != null &&
    outstandingPence > 0 &&
    new Date() > new Date(props.balanceDueDateIso);

  // ── Helpers ───────────────────────────────────────────────────────────────
  async function patchEnquiry(body: Record<string, unknown>) {
    const res = await fetch(`/api/admin/workshop-enquiries/${props.enquiryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d.error ?? "Failed to save");
    }
    return res.json();
  }

  async function saveSetup() {
    if (!roomType) return;
    setSaving(true);
    try {
      // Compute agreed price from config
      if (!props.workshopId) throw new Error("No workshop linked");
      const res = await fetch(
        `/api/admin/workshop-enquiries/${props.enquiryId}/price-preview?` +
          new URLSearchParams({
            workshopId: props.workshopId,
            roomType,
            earlyBird: String(effectiveEarlyBird),
          })
      );
      const { pricePp } = await res.json();
      await patchEnquiry({
        room_type: roomType,
        people_count: peopleCount,
        agreed_price_pp: pricePp,
        early_bird_override: earlyBirdOverride,
      });
      setAgreedPricePp(pricePp);
      setSetupSaved(true);
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function saveEarlyBirdToggle(val: boolean | null) {
    if (!props.workshopId || agreedPricePp == null) return;
    setSaving(true);
    setEarlyBirdOverride(val);
    try {
      const res = await fetch(
        `/api/admin/workshop-enquiries/${props.enquiryId}/price-preview?` +
          new URLSearchParams({
            workshopId: props.workshopId,
            roomType: roomType!,
            earlyBird: String(val !== null ? val : props.earlyBirdAuto),
          })
      );
      const { pricePp } = await res.json();
      await patchEnquiry({ early_bird_override: val, agreed_price_pp: pricePp });
      setAgreedPricePp(pricePp);
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function quickRecord(amountPence: number) {
    setAddAmount(String(amountPence / 100));
    setAddDate(new Date().toISOString().slice(0, 10));
    setAddNote("");
    setShowAddForm(true);
  }

  async function submitPayment() {
    const amountPence = Math.round(parseFloat(addAmount) * 100);
    if (!amountPence || amountPence <= 0) {
      setAddErr("Enter a valid amount.");
      return;
    }
    setAddSaving(true);
    setAddErr("");
    try {
      const res = await fetch(
        `/api/admin/workshop-enquiries/${props.enquiryId}/payments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount_pence: amountPence,
            paid_on: addDate,
            note: addNote || null,
          }),
        }
      );
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setAddErr(d.error ?? "Failed to save payment.");
        return;
      }
      setShowAddForm(false);
      setAddAmount("");
      setAddNote("");
      router.refresh();
    } finally {
      setAddSaving(false);
    }
  }

  async function deletePayment(paymentId: string) {
    if (!confirm("Delete this payment record?")) return;
    const res = await fetch(
      `/api/admin/workshop-enquiries/${props.enquiryId}/payments/${paymentId}`,
      { method: "DELETE" }
    );
    if (res.ok) router.refresh();
    else alert("Failed to delete payment.");
  }

  async function saveManualStatus(val: string | null) {
    setStatusSaving(true);
    setManualStatus(val);
    try {
      await patchEnquiry({ payment_status: val });
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setStatusSaving(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  // If no workshop linked, payment tracking is not available
  if (!props.workshopId) {
    return (
      <div>
        <h2 className={SECTION}>Payments</h2>
        <p className="text-white/40 text-sm">No workshop linked to this booking — payment tracking unavailable.</p>
      </div>
    );
  }

  // ── Setup prompt ─────────────────────────────────────────────────────────
  if (!setupSaved) {
    return (
      <div>
        <h2 className={SECTION}>Payments — Setup required</h2>
        <p className="text-white/60 text-sm mb-5">
          Set the room type to unlock payment tracking for this booking.
        </p>

        <div className="space-y-5 bg-white/5 rounded-lg p-5">
          {/* Room type */}
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Room type</p>
            <div className="flex gap-3">
              {(["single", "shared"] as const).map((rt) => (
                <button
                  key={rt}
                  type="button"
                  onClick={() => setRoomType(rt)}
                  className={`px-4 py-2 rounded border font-semibold text-sm capitalize transition ${
                    roomType === rt
                      ? "bg-gold text-black border-gold"
                      : "border-white/30 text-white/60 hover:border-white hover:text-white"
                  }`}
                >
                  {rt === "single" ? "Single occupancy" : "Shared double"}
                </button>
              ))}
            </div>
          </div>

          {/* People count */}
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-2">
              People{" "}
              {props.suggestedPeople === 2 && (
                <span className="text-gold/70">(partner included)</span>
              )}
            </p>
            <div className="flex gap-3">
              {[1, 2].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPeopleCount(n)}
                  className={`px-4 py-2 rounded border font-semibold text-sm transition ${
                    peopleCount === n
                      ? "bg-gold text-black border-gold"
                      : "border-white/30 text-white/60 hover:border-white hover:text-white"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Early bird */}
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-2">
              Early bird pricing
            </p>
            <div className="flex gap-3">
              {(["auto", "yes", "no"] as const).map((opt) => {
                const label =
                  opt === "auto"
                    ? `Auto (${props.earlyBirdAuto ? "eligible" : "not eligible"})`
                    : opt === "yes"
                    ? "Yes (override)"
                    : "No (override)";
                const active =
                  opt === "auto"
                    ? earlyBirdOverride === null
                    : opt === "yes"
                    ? earlyBirdOverride === true
                    : earlyBirdOverride === false;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setEarlyBirdOverride(
                        opt === "auto" ? null : opt === "yes" ? true : false
                      )
                    }
                    className={`px-3 py-2 rounded border text-sm transition ${
                      active
                        ? "bg-gold text-black border-gold"
                        : "border-white/30 text-white/60 hover:border-white hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {roomType && (
            <p className="text-white/40 text-xs">
              Price per person:{" "}
              <span className="text-white/80 font-semibold">
                will be calculated from workshop config
              </span>
            </p>
          )}

          <button
            type="button"
            disabled={!roomType || saving}
            onClick={saveSetup}
            className="px-5 py-2 bg-gold text-black rounded font-semibold text-sm hover:bg-white transition disabled:opacity-40"
          >
            {saving ? "Saving…" : "Confirm & unlock payments"}
          </button>
        </div>
      </div>
    );
  }

  // ── Full payment panel ────────────────────────────────────────────────────
  return (
    <div className="space-y-8">

      {/* ── Money summary ── */}
      <div>
        <h2 className={SECTION}>Payments</h2>

        <div className="bg-white/5 rounded-lg p-5 space-y-4">
          {/* Top row: room / people / EB */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-white/40 text-xs mb-1">Room</p>
              <p className="text-white/90 capitalize">{roomType === "single" ? "Single" : "Shared double"}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">People</p>
              <p className="text-white/90">{peopleCount}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Early bird</p>
              <div className="flex items-center gap-2">
                <p className={`text-sm font-semibold ${effectiveEarlyBird ? "text-yellow-400" : "text-white/50"}`}>
                  {effectiveEarlyBird ? "Yes" : "No"}
                  {earlyBirdOverride !== null && (
                    <span className="text-white/30 font-normal text-xs ml-1">(manual)</span>
                  )}
                </p>
                <div className="flex gap-1">
                  {(["auto", "yes", "no"] as const).map((opt) => {
                    const active =
                      opt === "auto"
                        ? earlyBirdOverride === null
                        : opt === "yes"
                        ? earlyBirdOverride === true
                        : earlyBirdOverride === false;
                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={saving}
                        onClick={() =>
                          saveEarlyBirdToggle(
                            opt === "auto" ? null : opt === "yes" ? true : false
                          )
                        }
                        className={`px-2 py-0.5 rounded text-xs transition ${
                          active
                            ? "bg-gold text-black"
                            : "bg-white/10 text-white/50 hover:bg-white/20"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Amounts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-white/40 text-xs mb-1">Total due</p>
              <p className="text-white/90 font-semibold">
                {totalDuePence != null ? pence2gbp(totalDuePence) : "—"}
              </p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Deposit due</p>
              <p className="text-white/90">{pence2gbp(depositDuePence)}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Total paid</p>
              <p className="text-green-400 font-semibold">{pence2gbp(totalPaidPence)}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Outstanding</p>
              <p
                className={`font-semibold ${
                  outstandingPence && outstandingPence > 0
                    ? isOverdue
                      ? "text-red-400"
                      : "text-yellow-400"
                    : "text-white/50"
                }`}
              >
                {outstandingPence != null ? pence2gbp(Math.max(0, outstandingPence)) : "—"}
                {isOverdue && (
                  <span className="ml-2 text-xs bg-red-600 text-white px-1.5 py-0.5 rounded">
                    OVERDUE
                  </span>
                )}
              </p>
            </div>
          </div>

          {props.balanceDueDateIso && (
            <p className="text-xs text-white/30">
              Balance due:{" "}
              {new Date(props.balanceDueDateIso).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          <hr className="border-white/10" />

          {/* Price per person note */}
          <p className="text-xs text-white/30">
            Price per person: {agreedPricePp != null ? pence2gbp(agreedPricePp) : "—"}
            {" "}(locked at setup)
          </p>
        </div>
      </div>

      {/* ── Payment status ── */}
      <div>
        <h2 className={SECTION}>Payment Status</h2>
        <div className="flex flex-wrap items-center gap-3">
          {derivedStatus && (
            <span
              className={`px-3 py-1 rounded text-sm font-semibold ${PAYMENT_STATUS_COLOURS[derivedStatus]}`}
            >
              {PAYMENT_STATUS_LABELS[derivedStatus]}
            </span>
          )}
          <span className="text-white/30 text-xs">Manual override:</span>
          {(["refunded", "cancelled", null] as const).map((val) => (
            <button
              key={String(val)}
              type="button"
              disabled={statusSaving}
              onClick={() => saveManualStatus(val)}
              className={`px-3 py-1.5 rounded border text-xs font-semibold transition ${
                manualStatus === val
                  ? "bg-gold text-black border-gold"
                  : "border-white/30 text-white/50 hover:border-white hover:text-white"
              }`}
            >
              {val === null ? "Clear override" : val.charAt(0).toUpperCase() + val.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Quick-record buttons ── */}
      <div>
        <h2 className={SECTION}>Record Payment</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {/* Deposit quick button */}
          <button
            type="button"
            onClick={() => quickRecord(depositDuePence)}
            className="px-4 py-2 border border-gold text-gold rounded text-sm font-semibold hover:bg-gold hover:text-black transition"
          >
            + Deposit ({pence2gbp(depositDuePence)})
          </button>
          {/* Full balance quick button — only shown when something is outstanding */}
          {outstandingPence != null && outstandingPence > 0 && (
            <button
              type="button"
              onClick={() => quickRecord(outstandingPence)}
              className="px-4 py-2 border border-green-400 text-green-400 rounded text-sm font-semibold hover:bg-green-400 hover:text-black transition"
            >
              + Balance outstanding ({pence2gbp(outstandingPence)})
            </button>
          )}
          <button
            type="button"
            onClick={() => { setAddAmount(""); setShowAddForm((v) => !v); }}
            className="px-4 py-2 border border-white/30 text-white/60 rounded text-sm hover:border-white hover:text-white transition"
          >
            {showAddForm ? "Cancel" : "+ Other amount"}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white/5 rounded-lg p-4 space-y-3 max-w-sm">
            <div>
              <label className="text-xs text-white/50 block mb-1">Amount (£)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                className="w-full bg-black border border-white/20 text-white rounded px-3 py-1.5 text-sm focus:outline-none focus:border-gold"
                placeholder="e.g. 200"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1">Date received</label>
              <input
                type="date"
                value={addDate}
                onChange={(e) => setAddDate(e.target.value)}
                className="w-full bg-black border border-white/20 text-white rounded px-3 py-1.5 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1">Note (optional)</label>
              <input
                type="text"
                value={addNote}
                onChange={(e) => setAddNote(e.target.value)}
                className="w-full bg-black border border-white/20 text-white rounded px-3 py-1.5 text-sm focus:outline-none focus:border-gold"
                placeholder="e.g. Deposit, bank transfer"
              />
            </div>
            {addErr && <p className="text-red-400 text-xs">{addErr}</p>}
            <button
              type="button"
              disabled={addSaving}
              onClick={submitPayment}
              className="px-4 py-2 bg-gold text-black rounded font-semibold text-sm hover:bg-white transition disabled:opacity-50"
            >
              {addSaving ? "Saving…" : "Save payment"}
            </button>
          </div>
        )}
      </div>

      {/* ── Payment history ── */}
      {props.payments.length > 0 && (
        <div>
          <h2 className={SECTION}>Payment History</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/30 text-xs uppercase border-b border-white/10">
                <th className="py-2 pr-6 text-left font-normal">Date</th>
                <th className="py-2 pr-6 text-left font-normal">Amount</th>
                <th className="py-2 pr-6 text-left font-normal">Note</th>
                <th className="py-2 text-left font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {props.payments
                .slice()
                .sort((a, b) => a.paid_on.localeCompare(b.paid_on))
                .map((p) => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-2 pr-6 text-white/70">
                      {new Date(p.paid_on).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-2 pr-6 text-green-400 font-semibold">
                      {pence2gbp(p.amount_pence)}
                    </td>
                    <td className="py-2 pr-6 text-white/50">{p.note ?? "—"}</td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => deletePayment(p.id)}
                        className="text-red-400/60 hover:text-red-400 text-xs transition"
                        title="Delete this payment record"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
