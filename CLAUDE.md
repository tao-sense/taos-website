# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # prisma generate + next build
npm run lint         # next lint
npx prisma migrate dev   # Run migrations (dev)
npx prisma db push       # Push schema changes without migration history
npx prisma studio        # Open Prisma Studio GUI
```

No test suite is configured.

## Architecture

**TAOS (The Art of Sensuality)** — a B2C platform for tantra massage, intimacy coaching, and workshops. Built with Next.js 15 App Router, React 19, Tailwind CSS, Prisma/PostgreSQL, NextAuth v4 (credentials + JWT), and Stripe subscriptions.

### Route structure

| Path | Access | Purpose |
|------|--------|---------|
| `/`, `/about`, `/offerings/**`, `/faq`, `/contact` | Public | Marketing pages |
| `/signin`, `/signup` | Public | Credentials auth |
| `/pricing` | Auth + feature flag | Stripe subscription checkout |
| `/dashboard`, `/account` | Authenticated | Member area + subscription management |
| `/admin` | ADMIN role only | Workshop CRUD + system stats |

`middleware.ts` enforces auth and role checks on all protected paths. It also gates `/pricing`, `/dashboard`, and `/account` behind the `NEXT_PUBLIC_FEATURE_SUBSCRIPTIONS` feature flag.

### Key data models (Prisma)

- **User** — credentials auth, enum role (`USER` / `ADMIN`), bcrypt password
- **Subscription** — Stripe subscription lifecycle (linked to User)
- **Workshop** — admin-created, published flag, capacity
- **WorkshopInterest / WorkshopEnquiry** — lead capture and booking forms
- **Contact / Subscriber** — contact form submissions and newsletter signups

### API routes (`/app/api/`)

- `auth/[...nextauth]` — NextAuth handler
- `signup` — registration with Zod validation + bcrypt
- `checkout` — creates Stripe checkout session (subscription mode)
- `webhooks/stripe` — handles `checkout.session.completed`
- `contact`, `workshop-interest`, `workshop-enquiry` — form submissions; send email via Resend/Nodemailer
- `admin/workshops` — CRUD for workshops (role-checked server-side)
- `health` — system status; `/api/ping` is a lightweight probe

### Lib utilities (`/lib/`)

- `auth.ts` — NextAuth config (credentials provider, JWT callbacks, role injection)
- `prisma.ts` — singleton Prisma client (query/error logging in dev)
- `stripe.ts` — Stripe client
- `flags.ts` — `NEXT_PUBLIC_FEATURE_SUBSCRIPTIONS` boolean helper

### Email

React Email templates live in `/Emails/`. Two transports are used: **Resend** (primary) and **Nodemailer** (fallback/admin), configured via env vars.

### UI conventions

- Tailwind CSS with a black/white/gold (`#d4af37`) palette
- Framer Motion for `fadeIn` / `fadeUp` entrance animations
- `ScrollFade` component wraps sections for intersection-observer-triggered reveals
- Server components by default; add `"use client"` only when interactivity is needed
- Client-side data fetching uses native `fetch()` in `useEffect`; `/admin/system` uses SWR for polling

## Environment variables

Copy `.env.example` to `.env.local`. Required keys:

```
NEXTAUTH_SECRET
NEXTAUTH_URL / NEXT_PUBLIC_APP_URL
DATABASE_URL               # Postgres (use ?pgbouncer=true in prod)
RESEND_API_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_ID
NEXT_PUBLIC_FEATURE_SUBSCRIPTIONS   # "true" enables subscriptions flow
```

For local Stripe webhook testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

## Database notes

Production uses Supabase with PgBouncer connection pooling (`?pgbouncer=true` on `DATABASE_URL`). Use a separate `DIRECT_URL` (without pooling) for `prisma migrate` and `prisma studio`. Schema changes should go through `prisma migrate dev` to preserve migration history.
