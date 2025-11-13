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

  // 3️⃣ RESEND EMAIL API CHECK
  console.log("LIVE RESEND KEY:", process.env.RESEND_API_KEY);

  try {
    const res = await fetch("https://api.resend.com/v1/emails", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
    });

    if (res.ok) {
      result.email = "connected";
    } else {
      result.email = "error: API responded but not OK";
      result.status = "error";
    }
  } catch (error: any) {
    result.email = "error: " + error.message;
    result.status = "error";
  }

  return NextResponse.json(result);
}