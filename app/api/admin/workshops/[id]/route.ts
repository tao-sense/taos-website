import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  try {
    const updated = await prisma.workshop.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        location: data.location,
        link: data.link,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update workshop" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.workshop.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Workshop deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete workshop" },
      { status: 500 }
    );
  }
}