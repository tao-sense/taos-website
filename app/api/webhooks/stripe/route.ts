// @ts-nocheck
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28",
});

export async function POST(req: Request) {
  try {
    // ✅ FIX: `headers()` now returns a Promise in Next.js 15.5
    const headerList = await headers();
    const sig = headerList.get("stripe-signature") as string | null;

    if (!sig) {
      console.error("[webhook] Missing stripe-signature header");
      return new NextResponse("Missing signature", { status: 400 });
    }

    const body = await req.text();

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      console.log("[webhook] Received event:", event.type);
    } catch (err: any) {
      console.error("[webhook] Error verifying signature:", err.message);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // ✅ Handle event types
    switch (event.type) {
      case "checkout.session.completed":
        console.log("✅ Payment succeeded:", event.data.object.id);
        break;
      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    return new NextResponse("Received", { status: 200 });
  } catch (error) {
    console.error("[webhook] Unexpected error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}