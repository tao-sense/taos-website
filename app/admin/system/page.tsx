"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SystemDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect once we KNOW the user is not authenticated or not admin
  if (typeof window !== "undefined") {
    if (status === "unauthenticated") {
      router.push("/signin");
      return null;
    }
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/signin");
      return null;
    }
  }

  // While session is loading, just show a loading state
  if (status === "loading") {
    return (
      <main className="bg-black min-h-screen text-white p-10">
        <h1 className="text-4xl font-bold text-gold mb-4">TAOS System Health</h1>
        <p className="text-white/60">Checking your session…</p>
      </main>
    );
  }

  // Only start fetching health data once we know the user is authenticated + admin
  const shouldFetch =
    status === "authenticated" && session?.user?.role === "ADMIN";

  const { data, error, isLoading } = useSWR(
    shouldFetch ? "/api/health" : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  return (
    <main className="bg-black min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold text-gold mb-10">TAOS System Health</h1>

      {isLoading && <p className="text-white/60">Loading system health…</p>}
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