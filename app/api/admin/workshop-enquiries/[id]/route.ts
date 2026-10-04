import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["pending", "accepted", "waitlist", "declined"];
const VALID_MANUAL_PAYMENT_STATUSES = ["refunded", "cancelled"];

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
    // Record when the application is accepted (used for admin reference)
    if (data.status === "accepted") {
      const existing = await prisma.workshopEnquiry.findUnique({
        where: { id },
        select: { accepted_at: true },
      });
      if (existing && !existing.accepted_at) {
        update.accepted_at = new Date();
      }
    }
  }

  if (data.admin_notes !== undefined) {
    update.admin_notes =
      typeof data.admin_notes === "string" ? data.admin_notes : null;
  }

  // Payment setup fields
  if (data.room_type !== undefined) {
    if (data.room_type !== null && !["single", "shared"].includes(data.room_type)) {
      return NextResponse.json({ error: "room_type must be 'single' or 'shared'." }, { status: 400 });
    }
    update.room_type = data.room_type;
  }
  if (data.people_count !== undefined) {
    const n = Number(data.people_count);
    if (data.people_count !== null && (!Number.isInteger(n) || n < 1 || n > 2)) {
      return NextResponse.json({ error: "people_count must be 1 or 2." }, { status: 400 });
    }
    update.people_count = data.people_count === null ? null : n;
  }
  if (data.agreed_price_pp !== undefined) {
    update.agreed_price_pp = data.agreed_price_pp === null ? null : Number(data.agreed_price_pp);
  }
  if (data.early_bird_override !== undefined) {
    update.early_bird_override =
      data.early_bird_override === null ? null : Boolean(data.early_bird_override);
  }
  if (data.payment_status !== undefined) {
    if (
      data.payment_status !== null &&
      !VALID_MANUAL_PAYMENT_STATUSES.includes(data.payment_status)
    ) {
      return NextResponse.json(
        { error: "payment_status must be 'refunded', 'cancelled', or null." },
        { status: 400 }
      );
    }
    update.payment_status = data.payment_status;
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
