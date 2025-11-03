// lib/flags.ts
export const flags = {
  // Controls all membership-related UI (Sign In, Sign Up, Pricing, Dashboard)
  subscriptions: process.env.NEXT_PUBLIC_ENABLE_SUBSCRIPTIONS === "true",
};