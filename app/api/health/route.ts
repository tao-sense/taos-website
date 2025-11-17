import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const result: any = {
    timestamp: new Date().toISOString(),
    database: null,
    stripe: null,
    email: null,
    status: "ok",
  };

  // 🟢 DATABASE CHECK
  try {
    await prisma.$queryRaw`SELECT 1`;
    result.database = "connected";
  } catch (err: any) {
    result.database = "error: " + err.message;
    result.status = "error";
  }

  // 🟢 STRIPE CHECK
  try {
    new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });
    result.stripe = "connected";
  } catch (err: any) {
    result.stripe = "error: " + err.message;
    result.status = "error";
  }

  // 🟢 RESEND CHECK — THIS IS THE WORKING ONE
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
      result.email = `error: ${res.status} ${res.statusText}`;
      result.status = "error";
    }
  } catch (err: any) {
    result.email = "error: " + err.message;
    result.status = "error";
  }

  return NextResponse.json(result);
}