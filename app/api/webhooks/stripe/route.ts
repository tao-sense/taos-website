// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

// Force Node runtime (not edge) for raw body access + Stripe SDK
export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_FEATURE_SUBSCRIPTIONS !== 'true') {
  return NextResponse.json({ received: true });
}
  // 1) Verify signature
  let event;
  try {
    const sig = headers().get('stripe-signature') as string | null;
    if (!sig) {
      console.error('[webhook] Missing stripe-signature header');
      return new NextResponse('Missing signature', { status: 400 });
    }
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('[webhook] Signature verification failed:', err?.message || err);
    return new NextResponse(`Webhook Error: ${err.message ?? 'invalid signature'}`, { status: 400 });
  }

  // 2) Handle only the events we care about, ack the rest
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;

        const userId = session?.metadata?.userId;
        if (!userId) {
          console.warn('[webhook] checkout.session.completed without userId metadata. Skipping upsert.');
          break;
        }

        await prisma.subscription.upsert({
          where: { userId },
          create: {
            userId,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            status: session.status ?? 'active',
            priceId: process.env.STRIPE_PRICE_ID ?? null,
            currentPeriodEnd: null,
          },
          update: {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            status: session.status ?? 'active',
          },
        });

        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as any;
        const stripeSubscriptionId = sub.id;
        const status = sub.status;
        const currentPeriodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000) : null;
        const customerId = sub.customer as string;

        const existing = await prisma.subscription.findFirst({
          where: {
            OR: [
              { stripeSubscriptionId },
              { stripeCustomerId: customerId },
            ],
          },
        });

        if (existing) {
          await prisma.subscription.update({
            where: { id: existing.id },
            data: {
              status,
              currentPeriodEnd: currentPeriodEnd ?? undefined,
              stripeSubscriptionId,
              stripeCustomerId: customerId,
            },
          });
        } else {
          console.warn('[webhook] subscription.* received but no matching subscription found yet.');
        }
        break;
      }

      default: {
        // Ack all other events to avoid 500s
        break;
      }
    }
  } catch (err: any) {
    console.error('[webhook] Handler error:', err?.message || err);
    return new NextResponse('Webhook handler failure', { status: 500 });
  }

  return NextResponse.json({ received: true });
}