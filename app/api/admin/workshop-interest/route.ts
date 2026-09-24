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

function escapeCsv(value: string | null | undefined): string {
  if (value == null) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const sourceFilter = searchParams.get("source");

  const where: Record<string, string> = {};
  if (sourceFilter) where.source = sourceFilter;

  const signups = await prisma.workshopInterest.findMany({
    where,
    orderBy: { created_at: "desc" },
    select: {
      firstName: true,
      email: true,
      source: true,
      created_at: true,
    },
  });

  const header = ["name", "email", "source", "date_registered"].join(",");
  const rows = signups.map((s) =>
    [
      escapeCsv(s.firstName),
      escapeCsv(s.email),
      escapeCsv(s.source),
      escapeCsv(s.created_at ? new Date(s.created_at).toISOString() : null),
    ].join(",")
  );

  const csv = [header, ...rows].join("\n");
  const today = new Date().toISOString().slice(0, 10);
  const filename = `registered-interest-${today}.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
