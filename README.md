# The Art of Sensuality — Next.js Starter

A production-ready starter for your platform with:

- Next.js 14 (App Router) + Tailwind CSS (black/white/gold)
- Auth (Credentials via NextAuth + Prisma, with roles)
- Stripe subscriptions (Checkout + Webhook)
- Postgres via Prisma
- Basic Admin (create workshops)
- Protected Dashboard (gated by subscription)
- Vercel-ready

## 1) Quickstart

```bash
# 1. Install deps
npm install

# 2. Copy env and fill it
cp .env.example .env.local
# - Set DATABASE_URL (e.g., Neon/Supabase URL)
# - Set NEXTAUTH_SECRET (e.g., `openssl rand -base64 32`)
# - Set STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID
# - Set NEXTAUTH_URL, NEXT_PUBLIC_APP_URL (http://localhost:3000 in dev)

# 3. Push the database schema
npx prisma db push

# (Optional) open Prisma Studio to inspect DB
npx prisma studio

# 4. Run dev server
npm run dev
```

Visit http://localhost:3000

- Create an account at `/signup`
- Sign in at `/signin`
- Subscription button on `/pricing` (creates a Stripe Checkout Session)
- After payment, Stripe will redirect to `/account`

## 2) Stripe Webhook (for subscription status)

In another terminal:

```bash
# Install Stripe CLI if needed: https://stripe.com/docs/stripe-cli
stripe login

# Forward events (adjust port if not 3000)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret into `.env.local` as `STRIPE_WEBHOOK_SECRET`.

## 3) Admin Access

Set a user to admin in Prisma Studio or via SQL:

```sql
UPDATE "User" SET "role" = 'ADMIN' WHERE email = 'you@example.com';
```

Then visit `/admin` to create/publish workshops.

## 4) Deploy (Vercel)

- Create a new Vercel project, import this repo.
- Add Environment Variables in Vercel (same as `.env.local`).
- Add a **Vercel Postgres** (or Neon/Supabase) and set `DATABASE_URL`.
- In Stripe Dashboard, set your production webhook to: `/api/webhooks/stripe`

## Notes

- Credentials auth is included for independence. You can add Google/Apple OAuth later in `lib/auth.ts`.
- Middleware protects `/dashboard` and `/admin` (role-based).
- The design system uses Tailwind with a gold accent color (`#d4af37`).

---

Made for Wes • August 2025
