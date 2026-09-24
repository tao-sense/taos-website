import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import InterestActions from "./InterestActions";

export const dynamic = "force-dynamic";

export default async function WorkshopInterestAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") redirect("/");

  const signups = await prisma.workshopInterest.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  const emails = signups.map((s) => s.email).filter(Boolean);

  return (
    <main className="min-h-screen bg-white text-black px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gold mb-3">
            Workshop Interest Signups
          </h1>
          <p className="text-black/70">
            People who have registered interest for upcoming TAOS workshops.
          </p>
        </div>

        {/* No marketing-consent field on this model — all entries are included */}
        <InterestActions emails={emails} />

        {signups.length === 0 ? (
          <div className="rounded-xl border border-black/10 bg-gray-50 p-8 text-center">
            <p className="text-black/70">No workshop interest signups yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-black/10 shadow-sm">
            <table className="min-w-full bg-white">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">First Name</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Source</th>
                  <th className="px-4 py-3 text-left font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((signup) => (
                  <tr key={signup.id} className="border-t border-black/10">
                    <td className="px-4 py-3">
                      {signup.firstName || <span className="text-black/40">—</span>}
                    </td>
                    <td className="px-4 py-3">{signup.email}</td>
                    <td className="px-4 py-3">
                      {signup.source || <span className="text-black/40">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {signup.created_at
                        ? new Date(signup.created_at).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}