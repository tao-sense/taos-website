import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session)
    return { error: NextResponse.json({ error: "Unauthorised" }, { status: 401 }) };
  if ((session.user as any).role !== "ADMIN")
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  return { session };
}

export async function GET(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const workshopFilter = searchParams.get("workshop");
  const statusFilter = searchParams.get("status");

  const where: Record<string, string> = {};
  if (workshopFilter) where.workshop_id = workshopFilter;
  if (statusFilter) where.status = statusFilter;

  // health_notes deliberately excluded from list response
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

  // Resolve workshop titles in one query
  const workshopIds = [
    ...new Set(enquiries.map((e) => e.workshop_id).filter(Boolean)),
  ] as string[];
  const workshopMap: Record<string, string> = {};
  if (workshopIds.length > 0) {
    const workshops = await prisma.workshop.findMany({
      where: { id: { in: workshopIds } },
      select: { id: true, title: true },
    });
    for (const w of workshops) workshopMap[w.id] = w.title;
  }

  const result = enquiries.map((e) => ({
    ...e,
    workshopTitle: e.workshop_id ? (workshopMap[e.workshop_id] ?? "Unknown") : "Unknown",
  }));

  return NextResponse.json(result);
}
