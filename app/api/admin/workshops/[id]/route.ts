import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: NextResponse.json({ error: "Unauthorised" }, { status: 401 }) };
  if ((session.user as any).role !== "ADMIN") return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  return { session };
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await context.params;
  const data = await request.json();

  try {
    const updated = await prisma.workshop.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        location: data.location ?? null,
        link: data.link ?? null,
        published: Boolean(data.published),
        priceCents: Number(data.priceCents) || 0,
        capacity: data.capacity ? Number(data.capacity) : null,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Error updating workshop:", err);
    return NextResponse.json({ error: "Failed to update workshop" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await context.params;

  try {
    await prisma.workshop.delete({ where: { id } });
    return NextResponse.json({ message: "Workshop deleted" });
  } catch (err) {
    console.error("Error deleting workshop:", err);
    return NextResponse.json({ error: "Failed to delete workshop" }, { status: 500 });
  }
}
