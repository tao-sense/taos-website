import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  derivePaymentStatus,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_COLOURS,
  pence2gbp,
} from "@/lib/payment-utils";
import { getWorkshopPricing } from "@/lib/workshop-config";

export const dynamic = "force-dynamic";

const EARLY_BIRD_DEADLINE = new Date("2026-10-31T23:59:59Z");

const STATUS_BADGE: Record<string, string> = {
  pending:  "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100  text-green-800",
  waitlist: "bg-blue-100   text-blue-800",
  declined: "bg-red-100    text-red-800",
};

const STATUSES = ["pending", "accepted", "waitlist", "declined"] as const;

export default async function WorkshopEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ workshop?: string; status?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") redirect("/");

  const { workshop: workshopFilter, status: statusFilter } = await searchParams;

  // Status counts across all records (no active filter)
  const counts = await prisma.workshopEnquiry.groupBy({
    by: ["status"],
    _count: { id: true },
  });
  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count.id]));

  // Workshops for filter dropdown
  const workshops = await prisma.workshop.findMany({
    orderBy: { date: "desc" },
    select: { id: true, title: true },
  });
  const workshopMap = Object.fromEntries(workshops.map((w) => [w.id, w.title]));

  // Filtered enquiries — health_notes deliberately excluded
  const where: Record<string, string> = {};
  if (workshopFilter) where.workshop_id = workshopFilter;
  if (statusFilter) where.status = statusFilter;

  const enquiries = await prisma.workshopEnquiry.findMany({
    where,
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      city: true,
      age: true,
      workshop_id: true,
      status: true,
      created_at: true,
      // Payment fields
      room_type: true,
      people_count: true,
      agreed_price_pp: true,
      payment_status: true,
      payments: { select: { amount_pence: true } },
    },
  });

  // Summary cards — accepted records only, for each workshop
  const acceptedByWorkshop: Record<
    string,
    { people: number; expectedPence: number; receivedPence: number }
  > = {};
  for (const e of enquiries) {
    if (e.status !== "accepted") continue;
    const wid = e.workshop_id ?? "unknown";
    if (!acceptedByWorkshop[wid]) {
      acceptedByWorkshop[wid] = { people: 0, expectedPence: 0, receivedPence: 0 };
    }
    const s = acceptedByWorkshop[wid];
    const pc = e.people_count ?? 1;
    s.people += pc;
    if (e.agreed_price_pp) s.expectedPence += e.agreed_price_pp * pc;
    s.receivedPence += e.payments.reduce((t, p) => t + p.amount_pence, 0);
  }

  return (
    <main className="bg-black text-white min-h-screen p-10">

      {/* Admin nav */}
      <div className="flex gap-4 mb-10 flex-wrap">
        <Link href="/admin/workshops" className="px-4 py-2 border border-gold rounded text-gold hover:bg-gold hover:text-black transition">
          Workshops
        </Link>
        <Link href="/admin/workshop-interest" className="px-4 py-2 border border-gold rounded text-gold hover:bg-gold hover:text-black transition">
          Workshop Interest
        </Link>
        <Link href="/admin/workshop-enquiries" className="px-4 py-2 border border-gold rounded bg-gold text-black font-semibold transition">
          Applications
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gold mb-8">Admin | Applications</h1>

      {/* Status counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {STATUSES.map((s) => (
          <div key={s} className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-gold">{countMap[s] ?? 0}</p>
            <p className="text-white/60 capitalize text-sm mt-1">{s}</p>
          </div>
        ))}
      </div>

      {/* Summary cards — accepted bookings per workshop */}
      {Object.keys(acceptedByWorkshop).length > 0 && (
        <div className="mb-10 space-y-3">
          <h2 className="text-white/40 text-xs uppercase tracking-widest mb-3">Accepted bookings summary</h2>
          {Object.entries(acceptedByWorkshop).map(([wid, s]) => {
            const cfg = getWorkshopPricing(wid);
            return (
              <div key={wid} className="bg-white/5 rounded-lg p-5 flex flex-wrap gap-8 items-center">
                <div>
                  <p className="text-white/40 text-xs mb-1">Workshop</p>
                  <p className="text-white/80 text-sm font-medium">{workshopMap[wid] ?? wid}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Confirmed places</p>
                  <p className="text-gold font-bold text-xl">{s.people}</p>
                </div>
                {s.expectedPence > 0 && (
                  <>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Total expected</p>
                      <p className="text-white/80 font-semibold">{pence2gbp(s.expectedPence)}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Received</p>
                      <p className="text-green-400 font-semibold">{pence2gbp(s.receivedPence)}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Outstanding</p>
                      <p className="text-yellow-400 font-semibold">
                        {pence2gbp(Math.max(0, s.expectedPence - s.receivedPence))}
                      </p>
                    </div>
                  </>
                )}
                {cfg && (
                  <p className="text-white/30 text-xs self-end">
                    Balance due:{" "}
                    {new Date(
                      cfg.startDate.getTime() - cfg.balanceDueDaysBefore * 86400000
                    ).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Filters */}
      <form method="GET" className="flex flex-wrap gap-4 mb-8 items-center">
        <select
          name="workshop"
          defaultValue={workshopFilter ?? ""}
          className="bg-white/10 border border-white/20 text-white rounded px-3 py-2 text-sm"
        >
          <option value="">All workshops</option>
          {workshops.map((w) => (
            <option key={w.id} value={w.id}>
              {w.title}
            </option>
          ))}
        </select>

        <select
          name="status"
          defaultValue={statusFilter ?? ""}
          className="bg-white/10 border border-white/20 text-white rounded px-3 py-2 text-sm capitalize"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-gold text-black rounded font-semibold text-sm hover:bg-white transition"
        >
          Filter
        </button>

        {(workshopFilter || statusFilter) && (
          <a
            href="/admin/workshop-enquiries"
            className="px-4 py-2 border border-white/30 text-white/60 rounded hover:border-white hover:text-white transition text-sm"
          >
            Clear
          </a>
        )}
      </form>

      {/* Table */}
      {enquiries.length === 0 ? (
        <p className="text-white/50">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/20 text-white/40 uppercase text-xs">
                <th className="py-3 pr-6">Name</th>
                <th className="py-3 pr-6">Email</th>
                <th className="py-3 pr-6">Phone</th>
                <th className="py-3 pr-6">City</th>
                <th className="py-3 pr-6">Age</th>
                <th className="py-3 pr-6">Workshop</th>
                <th className="py-3 pr-6">Status</th>
                <th className="py-3 pr-6">Applied</th>
                <th className="py-3 pr-6">EB</th>
                <th className="py-3 pr-6">Room</th>
                <th className="py-3 pr-6">Ppl</th>
                <th className="py-3 pr-6">Pay</th>
                <th className="py-3 pr-6">Paid</th>
                <th className="py-3 pr-6">Owes</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-3 pr-6 font-medium">{e.name}</td>
                  <td className="py-3 pr-6 text-white/70">{e.email}</td>
                  <td className="py-3 pr-6 text-white/60">{e.phone ?? "—"}</td>
                  <td className="py-3 pr-6 text-white/60">{e.city ?? "—"}</td>
                  <td className="py-3 pr-6 text-white/60">{e.age ?? "—"}</td>
                  <td className="py-3 pr-6 text-white/70">
                    {e.workshop_id ? (workshopMap[e.workshop_id] ?? "Unknown") : "Unknown"}
                  </td>
                  <td className="py-3 pr-6">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                        STATUS_BADGE[e.status] ?? "bg-white/10 text-white"
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="py-3 pr-6 text-white/40 text-xs">
                    {e.created_at
                      ? new Date(e.created_at).toLocaleDateString("en-GB")
                      : "—"}
                  </td>
                  <td className="py-3 pr-6">
                    {e.created_at && new Date(e.created_at) <= EARLY_BIRD_DEADLINE ? (
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-800">EB</span>
                    ) : (
                      <span className="text-white/20 text-xs">—</span>
                    )}
                  </td>
                  {/* Payment columns */}
                  <td className="py-3 pr-6 text-white/50 text-xs capitalize">
                    {e.room_type ?? <span className="text-white/20">—</span>}
                  </td>
                  <td className="py-3 pr-6 text-white/50 text-xs">
                    {e.people_count ?? <span className="text-white/20">—</span>}
                  </td>
                  <td className="py-3 pr-6">
                    {e.agreed_price_pp != null ? (() => {
                      const pc = e.people_count ?? 1;
                      const totalDue = e.agreed_price_pp * pc;
                      const cfg = e.workshop_id ? getWorkshopPricing(e.workshop_id) : null;
                      const depositDue = cfg ? cfg.depositPence * pc : 0;
                      const totalPaid = e.payments.reduce((t, p) => t + p.amount_pence, 0);
                      const ds = derivePaymentStatus(e.payment_status, totalPaid, totalDue, depositDue);
                      return (
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${PAYMENT_STATUS_COLOURS[ds]}`}>
                          {PAYMENT_STATUS_LABELS[ds]}
                        </span>
                      );
                    })() : <span className="text-white/20 text-xs">—</span>}
                  </td>
                  <td className="py-3 pr-6 text-green-400 text-xs font-semibold">
                    {e.payments.length > 0
                      ? pence2gbp(e.payments.reduce((t, p) => t + p.amount_pence, 0))
                      : <span className="text-white/20">—</span>}
                  </td>
                  <td className="py-3 pr-6 text-xs">
                    {e.agreed_price_pp != null ? (() => {
                      const pc = e.people_count ?? 1;
                      const owing = e.agreed_price_pp * pc - e.payments.reduce((t, p) => t + p.amount_pence, 0);
                      return owing > 0
                        ? <span className="text-yellow-400 font-semibold">{pence2gbp(owing)}</span>
                        : <span className="text-white/20">—</span>;
                    })() : <span className="text-white/20">—</span>}
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/admin/workshop-enquiries/${e.id}`}
                      className="text-gold hover:underline text-xs whitespace-nowrap"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
