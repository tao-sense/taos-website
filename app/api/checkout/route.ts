import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST() {
 if (process.env.NEXT_PUBLIC_FEATURE_SUBSCRIPTIONS !== 'true') {
  return NextResponse.json({ error: 'Subscriptions disabled' }, { status: 404 });
}
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // Ensure a Stripe customer exists
  let customerId: string | undefined;
  const existingSub = await prisma.subscription.findFirst({ where: { userId: user.id } });
  customerId = existingSub?.stripeCustomerId || undefined;

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: customerId,
    customer_email: customerId ? undefined : user.email || undefined,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { userId: user.id },
  });

  return NextResponse.json({ url: checkout.url });
}
