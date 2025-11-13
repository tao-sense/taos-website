import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function GET() {
  const result: any = {
    timestamp: new Date().toISOString(),
    database: null,
    stripe: null,
    email: null,
    status: "ok",
  };

  // 1️⃣ DATABASE CHECK — Prisma → Supabase
  try {
    await prisma.$queryRaw`SELECT 1;`;
    result.database = "connected";
  } catch (error: any) {
    result.database = "error: " + error.message;
    result.status = "error";
  }

  // 2️⃣ STRIPE CHECK
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });
    result.stripe = "connected";
  } catch (error: any) {
    result.stripe = "error: " + error.message;
    result.status = "error";
  }

  // 3️⃣ RESEND CHECK — Legacy API
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "healthcheck@taosense.uk",
        to: ["invalid@resend.dev"],
        subject: "Health Check",
        html: "<p>health</p>",
      }),
    });

    // 200 OK = working
    // 422 invalid recipient = working
    if (res.status === 200 || res.status === 422) {
      result.email = "connected";
    } else {
      const text = await res.text();
      result.email = `error: ${res.status} ${res.statusText} - ${text}`;
      result.status = "error";
    }
  } catch (error: any) {
    result.email = "error: " + error.message;
    result.status = "error";
  }

  return NextResponse.json(result);
}