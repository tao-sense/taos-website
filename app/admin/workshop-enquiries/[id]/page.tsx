import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import ApplicantDetail from "./applicant-detail";

export const dynamic = "force-dynamic";

export default async function ApplicantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") redirect("/");

  const { id } = await params;

  const enquiry = await prisma.workshopEnquiry.findUnique({ where: { id } });
  if (!enquiry) notFound();

  let workshopTitle = "Unknown";
  if (enquiry.workshop_id) {
    const workshop = await prisma.workshop.findUnique({
      where: { id: enquiry.workshop_id },
      select: { title: true },
    });
    if (workshop) workshopTitle = workshop.title;
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
        <Link href="/admin/workshop-enquiries" className="px-4 py-2 border border-gold rounded text-gold hover:bg-gold hover:text-black transition">
          Applications
        </Link>
      </div>

      <div className="mb-6">
        <Link href="/admin/workshop-enquiries" className="text-gold hover:underline text-sm">
          ← Back to Applications
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gold mb-8">
        Application — {enquiry.name}
      </h1>

      <div className="max-w-2xl space-y-8">

        <Section title="Contact">
          <Field label="Name"        value={enquiry.name} />
          <Field label="Email"       value={enquiry.email} />
          <Field label="Phone"       value={enquiry.phone} />
          <Field label="Town / City" value={enquiry.city} />
        </Section>

        <Section title="About">
          <Field label="Age"    value={enquiry.age?.toString()} />
          <Field label="Height" value={enquiry.height_cm ? `${enquiry.height_cm} cm` : null} />
          <Field label="Weight" value={enquiry.weight_kg ? `${enquiry.weight_kg} kg` : null} />
        </Section>

        <Section title="Workshop">
          <Field label="Workshop" value={workshopTitle} />
          <Field
            label="Applied"
            value={
              enquiry.created_at
                ? new Date(enquiry.created_at).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : null
            }
          />
        </Section>

        {/* Health notes — this page only; never in the list or emails */}
        <Section title="Health Information">
          <div className="bg-white/5 rounded p-4 text-white/80 text-sm whitespace-pre-wrap">
            {enquiry.health_notes ?? (
              <span className="text-white/30 italic">Not provided</span>
            )}
          </div>
        </Section>

        <Section title="About Them">
          <div className="bg-white/5 rounded p-4 text-white/80 text-sm whitespace-pre-wrap">
            {enquiry.motivation ?? (
              <span className="text-white/30 italic">Not provided</span>
            )}
          </div>
        </Section>

        {enquiry.experience && (
          <Section title="Experience">
            <div className="bg-white/5 rounded p-4 text-white/80 text-sm whitespace-pre-wrap">
              {enquiry.experience}
            </div>
          </Section>
        )}

        <Section title="Consent">
          <Field label="Privacy Policy"    value={enquiry.consent_privacy ? "Yes" : "No"} />
          <Field label="Terms & Conditions" value={enquiry.consent_terms   ? "Yes" : "No"} />
          <Field label="Health data"        value={enquiry.consent_health  ? "Yes" : "No"} />
          <Field
            label="Consented at"
            value={
              enquiry.consent_at
                ? new Date(enquiry.consent_at).toLocaleString("en-GB")
                : null
            }
          />
        </Section>

        {/* Interactive section handled client-side */}
        <ApplicantDetail
          id={enquiry.id}
          currentStatus={enquiry.status}
          currentNotes={enquiry.admin_notes ?? ""}
          applicantEmail={enquiry.email}
          applicantName={enquiry.name}
        />

      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-gold font-semibold text-sm uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex gap-4 text-sm">
      <span className="text-white/40 w-36 shrink-0">{label}</span>
      <span className="text-white/90">
        {value ?? <span className="text-white/30 italic">—</span>}
      </span>
    </div>
  );
}
