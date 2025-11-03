// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/** ----------  PUT (update workshop)  ---------- **/
export const PUT = async (request, context) => {
  const { id } = context.params;
  const data = await request.json();

  try {
    const updated = await prisma.workshop.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        location: data.location,
        link: data.link,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating workshop:", error);
    return NextResponse.json(
      { error: "Failed to update workshop" },
      { status: 500 }
    );
  }
};

/** ----------  DELETE (remove workshop)  ---------- **/
export const DELETE = async (request, context) => {
  const { id } = context.params;

  try {
    await prisma.workshop.delete({ where: { id } });
    return NextResponse.json({ message: "Workshop deleted" });
  } catch (error) {
    console.error("Error deleting workshop:", error);
    return NextResponse.json(
      { error: "Failed to delete workshop" },
      { status: 500 }
    );
  }
};