import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { firstName, email, source } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const trimmedFirstName =
      typeof firstName === "string" ? firstName.trim() : null;
    const trimmedEmail = String(email).trim().toLowerCase();

    await prisma.workshopInterest.upsert({
      where: { email: trimmedEmail },
      update: {
        firstName: trimmedFirstName,
        source: source || "autumn_2026_uk_tantra_workshop",
      },
      create: {
        firstName: trimmedFirstName,
        email: trimmedEmail,
        source: source || "autumn_2026_uk_tantra_workshop",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Workshop interest submit error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}