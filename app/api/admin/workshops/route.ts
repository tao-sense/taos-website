import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const workshops = await prisma.workshop.findMany({
    orderBy: { date: "asc" },
  });
  return NextResponse.json(workshops);
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const workshop = await prisma.workshop.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        location: data.location,
        link: data.link,
      },
    });
    return NextResponse.json(workshop, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create workshop" }, { status: 500 });
  }
}