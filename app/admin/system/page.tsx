"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminSystemPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // SWR is ALWAYS declared (important)
  const { data, error, isLoading } = useSWR("/api/health", fetcher, {
    refreshInterval: 5000,
  });

  // Redirect logic (runs AFTER hooks, so no crash)
  if (status === "unauthenticated") {
    if (typeof window !== "undefined") router.replace("/signin");
    return null;
  }

  if (status === "authenticated" && session?.user?.role !== "ADMIN") {
    if (typeof window !== "undefined") router.replace("/signin");
    return null;
  }

  return (
    <main className="bg-black min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold text-gold mb-10">
        TAOS System Health
      </h1>

      {status === "loading" && (
        <p className="text-white/70">Checking authentication…</p>
      )}

      {error && (
        <p className="text-red-400">
          Error loading /api/health — try refreshing.
        </p>
      )}

      {!data && isLoading && (
        <p className="text-white/70">Loading system status…</p>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Database */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-2xl text-gold mb-2">Database (Supabase)</h2>
            <p>Status: {data.database}</p>
            {data.latency && <p>Latency: {data.latency} ms</p>}
          </div>

          {/* Stripe */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-2xl text-gold mb-2">Stripe API</h2>
            <p>Status: {data.stripe}</p>
          </div>

          {/* Resend */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-2xl text-gold mb-2">Email (Resend)</h2>
            <p>Status: {data.email}</p>
          </div>

          {/* Cron */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-2xl text-gold mb-2">Supabase Keep-Alive</h2>
            <p>Last Cron Run:</p>
            <p className="text-xl">{data.lastCronRun ?? "No data"}</p>
            {data.cronLatency && (
              <p>Cron Latency: {data.cronLatency} ms</p>
            )}
          </div>

        </div>
      )}

      {data && (
        <section className="mt-10">
          <h2 className="text-xl mb-2 text-white/70">Raw JSON</h2>
          <pre className="text-xs bg-white/5 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}