import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["pending", "accepted", "waitlist", "declined"];

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session)
    return { error: NextResponse.json({ error: "Unauthorised" }, { status: 401 }) };
  if ((session.user as any).role !== "ADMIN")
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  return { session };
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const enquiry = await prisma.workshopEnquiry.findUnique({ where: { id } });
  if (!enquiry)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(enquiry);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const data = await req.json();

  const update: Record<string, unknown> = { updated_at: new Date() };

  if (data.status !== undefined) {
    if (!VALID_STATUSES.includes(data.status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: pending, accepted, waitlist, declined." },
        { status: 400 }
      );
    }
    update.status = data.status;
  }

  if (data.admin_notes !== undefined) {
    update.admin_notes =
      typeof data.admin_notes === "string" ? data.admin_notes : null;
  }

  try {
    const enquiry = await prisma.workshopEnquiry.update({
      where: { id },
      data: update,
    });
    return NextResponse.json(enquiry);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  try {
    await prisma.workshopEnquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
