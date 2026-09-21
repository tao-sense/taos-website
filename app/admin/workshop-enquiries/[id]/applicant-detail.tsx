"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["pending", "accepted", "waitlist", "declined"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_IDLE: Record<Status, string> = {
  pending:  "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black",
  accepted: "border-green-400  text-green-400  hover:bg-green-400  hover:text-black",
  waitlist: "border-blue-400   text-blue-400   hover:bg-blue-400   hover:text-black",
  declined: "border-red-400    text-red-400    hover:bg-red-600    hover:text-white",
};

const STATUS_ACTIVE: Record<Status, string> = {
  pending:  "bg-yellow-400 text-black border-yellow-400",
  accepted: "bg-green-400  text-black border-green-400",
  waitlist: "bg-blue-400   text-black border-blue-400",
  declined: "bg-red-500    text-white border-red-500",
};

interface Props {
  id: string;
  currentStatus: string;
  currentNotes: string;
  applicantEmail: string;
  applicantName: string;
}

export default function ApplicantDetail({
  id,
  currentStatus,
  currentNotes,
  applicantEmail,
  applicantName,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function updateStatus(newStatus: Status) {
    const prev = status;
    setStatus(newStatus);
    const res = await fetch(`/api/admin/workshop-enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      alert(body.error ?? "Failed to update status.");
      setStatus(prev);
    }
  }

  async function saveNotes() {
    setSaving(true);
    setSaveMsg("");
    const res = await fetch(`/api/admin/workshop-enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_notes: notes }),
    });
    setSaving(false);
    if (res.ok) {
      setSaveMsg("Saved.");
      setTimeout(() => setSaveMsg(""), 2500);
    } else {
      setSaveMsg("Failed to save.");
    }
  }

  async function handleDelete() {
    if (
      !confirm(
        `Delete the application from ${applicantName}? This cannot be undone.`
      )
    )
      return;
    setDeleting(true);
    const res = await fetch(`/api/admin/workshop-enquiries/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/admin/workshop-enquiries");
    } else {
      setDeleting(false);
      alert("Failed to delete application.");
    }
  }

  return (
    <div className="space-y-8">

      {/* Status */}
      <div>
        <h2 className="text-gold font-semibold text-sm uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
          Status
        </h2>
        <div className="flex flex-wrap gap-3">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className={`px-4 py-2 rounded border font-semibold capitalize text-sm transition ${
                status === s ? STATUS_ACTIVE[s] : STATUS_IDLE[s]
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Admin notes */}
      <div>
        <h2 className="text-gold font-semibold text-sm uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
          Admin Notes
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          placeholder="Internal notes — not visible to the applicant."
          className="w-full bg-white/5 border border-white/20 rounded p-3 text-white/90 text-sm placeholder:text-white/30 focus:outline-none focus:border-gold resize-y"
        />
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={saveNotes}
            disabled={saving}
            className="px-4 py-2 bg-gold text-black rounded font-semibold text-sm hover:bg-white transition disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Notes"}
          </button>
          {saveMsg && (
            <span className="text-sm text-white/50">{saveMsg}</span>
          )}
        </div>
      </div>

      {/* Reply by email */}
      <div>
        <h2 className="text-gold font-semibold text-sm uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
          Reply
        </h2>
        <a
          href={`mailto:${applicantEmail}`}
          className="inline-block px-4 py-2 border border-gold text-gold rounded hover:bg-gold hover:text-black transition text-sm font-semibold"
        >
          Reply by email →
        </a>
      </div>

      {/* Delete */}
      <div className="pt-6 border-t border-white/10">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 border border-red-500 text-red-400 rounded hover:bg-red-600 hover:text-white transition text-sm font-semibold disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete Application"}
        </button>
      </div>
    </div>
  );
}
