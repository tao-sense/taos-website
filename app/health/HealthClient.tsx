"use client";

import { useEffect, useState } from "react";

export default function HealthClient() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() => setStatus({ error: true }));
  }, []);

  const getColor = (value: string) => {
    if (!value) return "text-gray-400";
    if (value.startsWith("connected")) return "text-green-400";
    if (value.startsWith("error")) return "text-red-400";
    return "text-yellow-400";
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gold mb-6">
          TAOS System Health
        </h1>

        {!status ? (
          <p className="text-white/60 text-lg">Checking system health…</p>
        ) : (
          <div className="space-y-6">
            <StatusRow
              label="Database (Supabase)"
              value={status.database}
              color={getColor(status.database)}
            />

            <StatusRow
              label="Stripe API"
              value={status.stripe}
              color={getColor(status.stripe)}
            />

            <StatusRow
              label="Email (Resend)"
              value={status.email}
              color={getColor(status.email)}
            />

            <p className="text-white/40 text-sm mt-12">
              Last checked: {new Date(status.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function StatusRow({ label, value, color }: any) {
  const symbol = color.includes("green")
    ? "🟢"
    : color.includes("red")
    ? "🔴"
    : "🟡";

  return (
    <div className="flex justify-between items-center bg-white/5 px-6 py-4 rounded-xl border border-white/10">
      <span className="text-white font-medium">{label}</span>
      <span className={`font-semibold ${color}`}>
        {symbol} {value}
      </span>
    </div>
  );
}