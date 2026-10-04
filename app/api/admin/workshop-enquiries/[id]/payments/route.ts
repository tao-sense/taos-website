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

// POST /api/admin/workshop-enquiries/[id]/payments
// Body: { amount_pence: number, paid_on: string (YYYY-MM-DD), note?: string }
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const data = await req.json();

  const amount = Number(data.amount_pence);
  if (!Number.isInteger(amount) || amount <= 0) {
    return NextResponse.json({ error: "amount_pence must be a positive integer." }, { status: 400 });
  }
  if (!data.paid_on || !/^\d{4}-\d{2}-\d{2}$/.test(data.paid_on)) {
    return NextResponse.json({ error: "paid_on must be YYYY-MM-DD." }, { status: 400 });
  }

  // Confirm enquiry exists
  const enquiry = await prisma.workshopEnquiry.findUnique({ where: { id }, select: { id: true } });
  if (!enquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const payment = await prisma.bookingPayment.create({
    data: {
      enquiry_id:   id,
      amount_pence: amount,
      paid_on:      new Date(data.paid_on),
      note:         typeof data.note === "string" && data.note.trim() ? data.note.trim() : null,
    },
  });

  return NextResponse.json(payment, { status: 201 });
}
