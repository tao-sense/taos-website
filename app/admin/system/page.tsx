"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SystemDashboard() {
  const { data: session } = useSession();

  // ADMIN-ONLY ACCESS
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    redirect("/signin");
  }

  const { data, error, isLoading } = useSWR("/api/health", fetcher, {
    refreshInterval: 5000,
  });

  return (
    <main className="bg-black min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold text-gold mb-10">TAOS System Health</h1>

      {isLoading && <p className="text-white/60">Loading...</p>}
      {error && <p className="text-red-400">Error loading system health.</p>}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* DATABASE */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-2xl text-gold mb-2">Database (Supabase)</h2>
            <p>Status: {data.database}</p>
            <p>Latency: {data.latency} ms</p>
          </div>

          {/* STRIPE */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-2xl text-gold mb-2">Stripe API</h2>
            <p>Status: {data.stripe}</p>
          </div>

          {/* EMAIL */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-2xl text-gold mb-2">Email (Resend)</h2>
            <p>Status: {data.email}</p>
          </div>

          {/* CRON + KV */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-2xl text-gold mb-2">Supabase Keep-Alive</h2>
            <p>Last Cron Run:</p>
            <p className="text-xl">{data.lastCronRun ?? "No data yet"}</p>
            {data.cronLatency && <p>Latency: {data.cronLatency} ms</p>}
          </div>

        </div>
      )}
    </main>
  );
}