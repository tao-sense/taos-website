// force-vercel-rebuild-uuid: 20251117-kv
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // 1️⃣ Touch Supabase lightly to keep it warm
    await prisma.$queryRaw`SELECT 1`;

    // 2️⃣ Write timestamp to Upstash KV
    await fetch(`${process.env.KV_REST_API_URL}/set/taos:lastPing`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: new Date().toISOString(),
      }),
    });

    // 3️⃣ Return nothing (silent)
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}