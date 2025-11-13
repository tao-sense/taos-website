import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Tiny lightweight query
    await prisma.workshop.findFirst();

    return NextResponse.json({
      ok: true,
      message: "Supabase successfully pinged",
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message,
    });
  }
}