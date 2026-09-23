import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

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
    },
  });

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
                <th className="py-3 pr-6">Early Bird</th>
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
