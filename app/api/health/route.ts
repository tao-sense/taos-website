import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const result: any = {
    timestamp: new Date().toISOString(),
    database: null,
    latency: null,
    stripe: null,
    email: null,
    lastCronRun: null,
    status: "ok",
  };

  // 🟢 DATABASE STATUS + LATENCY
  try {
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    result.latency = Date.now() - start;
    result.database = "connected";
  } catch (err: any) {
    result.database = "error: " + err.message;
    result.status = "error";
  }

  // 🟢 STRIPE STATUS
  try {
    new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });
    result.stripe = "connected";
  } catch (err: any) {
    result.stripe = "error: " + err.message;
    result.status = "error";
  }

  // 🟢 RESEND STATUS — checking domains list works on free tier
  try {
    const res = await fetch("https://api.resend.com/v1/domains", {
      method: "GET",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });

    if (res.ok) {
      result.email = "connected";
    } else {
      const text = await res.text();
      result.email = `error: ${text}`;
      result.status = "error";
    }
  } catch (err: any) {
    result.email = "error: " + err.message;
    result.status = "error";
  }

  // 🟢 LAST KEEP-ALIVE PING FROM KV
  try {
    const resp = await fetch(`${process.env.KV_REST_API_URL}/get/taos:lastPing`, {
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
    });

    if (resp.ok) {
      const json = await resp.json();
      const value = json.result ? JSON.parse(json.result) : null;
      result.lastCronRun = value?.timestamp ?? null;
      if (value?.latency) result.cronLatency = value.latency;
    } else {
      result.lastCronRun = "error";
    }
  } catch (err) {
    result.lastCronRun = "error";
  }

  return NextResponse.json(result);
}