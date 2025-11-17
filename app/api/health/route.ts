import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const result: any = {
    timestamp: new Date().toISOString(),
    database: "unknown",
    latency: null,
    stripe: "unknown",
    email: "unknown",
    lastCronRun: null,
    cronLatency: null,
    status: "ok",
  };

  // ---- DATABASE ----
  try {
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    result.latency = Date.now() - start;
    result.database = "connected";
  } catch (err: any) {
    result.database = `error: ${String(err.message)}`;
    result.status = "error";
  }

  // ---- STRIPE ----
  try {
    new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });
    result.stripe = "connected";
  } catch (err: any) {
    result.stripe = `error: ${String(err.message)}`;
    result.status = "error";
  }

  // ---- RESEND ----
  try {
    const res = await fetch("https://api.resend.com/v1/domains", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
    });

    if (res.ok) {
      result.email = "connected";
    } else {
      const text = await res.text();
      // ALWAYS STRINGIFY
      result.email = `error: ${String(text)}`;
      result.status = "error";
    }
  } catch (err: any) {
    result.email = `error: ${String(err.message)}`;
    result.status = "error";
  }

  // ---- CRON KEEP-ALIVE ----
  try {
    const resp = await fetch(`${process.env.KV_REST_API_URL}/get/taos:lastPing`, {
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
    });

    if (resp.ok) {
      const json = await resp.json();
      const safe = json?.result ? JSON.parse(json.result) : null;

      // NEVER return objects — ensure strings
      result.lastCronRun = safe?.timestamp ?? "none";
      result.cronLatency = safe?.latency ?? null;
    } else {
      result.lastCronRun = "none";
    }
  } catch {
    result.lastCronRun = "none";
  }

  return NextResponse.json(result, { status: 200 });
}