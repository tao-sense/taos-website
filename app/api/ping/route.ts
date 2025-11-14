// Final rebuild trigger — do NOT remove
// force-vercel-rebuild-uuid: 202511142100
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  // 1️⃣ Validate that only Vercel Cron can access this endpoint
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // 2️⃣ Very lightweight DB touch (keeps Supabase alive)
    await prisma.$queryRaw`SELECT 1`;

    // 3️⃣ Return nothing (silent mode)
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // If DB is down, return a 500 (also silent)
    return new NextResponse(null, { status: 500 });
  }
}