'use client';

import { useState } from 'react';

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-16">
      <h1 className="text-4xl font-bold">Membership</h1>
      <p className="text-white/80 mt-2">Unlimited classes and programs. Cancel anytime.</p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
          <div className="text-2xl font-semibold">Monthly</div>
          <div className="mt-2 text-white/70">Access to all follow‑along classes and members area.</div>
          <div className="mt-6 text-4xl font-bold">
            £15<span className="text-xl font-medium text-white/70">/mo</span>
          </div>
          <button
            className="mt-8 px-5 py-3 rounded-2xl bg-gold text-black hover:opacity-90 disabled:opacity-50"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? 'Redirecting…' : 'Subscribe with Stripe'}
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
          <div className="text-2xl font-semibold">What’s included</div>
          <ul className="mt-4 space-y-2 text-white/80">
            <li>• Follow‑along classes library</li>
            <li>• Programs for flexibility, strength, and presence</li>
            <li>• Members‑only updates & community</li>
            <li>• Cancel anytime</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
