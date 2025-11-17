// force-vercel-rebuild-uuid: 20251117-kv-v2
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  // Protect with CRON_SECRET
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // 🟢 STEP 1 — keep Supabase alive + measure latency
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - start;

    // 🟢 STEP 2 — Write last ping timestamp + latency to Upstash KV
    await fetch(`${process.env.KV_REST_API_URL}/set/taos:lastPing`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: JSON.stringify({
          timestamp: new Date().toISOString(),
          latency,
        }),
      }),
    });

    // 🟢 STEP 3 — Return nothing (silent success)
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}