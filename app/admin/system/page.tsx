"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminSystemPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect logic – done safely inside useEffect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    } else if (
      status === "authenticated" &&
      session?.user?.role !== "ADMIN"
    ) {
      router.replace("/signin");
    }
  }, [status, session, router]);

  // While session is loading or redirecting, show a simple message
  if (status === "loading") {
    return (
      <main className="bg-black min-h-screen text-white p-10">
        <h1 className="text-3xl font-bold text-gold mb-4">
          TAOS System Health
        </h1>
        <p className="text-white/70">Checking your session…</p>
      </main>
    );
  }

  // If not authenticated or not admin, we don't render the dashboard
  if (
    status === "unauthenticated" ||
    (status === "authenticated" && session?.user?.role !== "ADMIN")
  ) {
    return null;
  }

  // Only fetch health data when we KNOW the user is an authenticated ADMIN
  const shouldFetch =
    status === "authenticated" && session?.user?.role === "ADMIN";

  const { data, error, isLoading } = useSWR(
    shouldFetch ? "/api/health" : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  return (
    <main className="bg-black min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold text-gold mb-8">TAOS System Health</h1>

      {!data && isLoading && (
        <p className="text-white/70">Loading system status…</p>
      )}

      {error && (
        <p className="text-red-400">
          Error loading health data. Check /api/health directly.
        </p>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Database */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-2xl text-gold mb-2">Database (Supabase)</h2>
            <p>Status: {data.database}</p>
            {data.latency !== null && (
              <p>Latency: {data.latency} ms</p>
            )}
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

          {/* Cron / KV if present */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <h2 className="text-2xl text-gold mb-2">Supabase Keep-Alive</h2>
            <p>Last Cron Run:</p>
            <p className="text-xl">
              {data.lastCronRun ?? "No data recorded yet"}
            </p>
            {data.cronLatency && (
              <p>Cron DB latency: {data.cronLatency} ms</p>
            )}
          </div>
        </div>
      )}

      {/* Raw JSON debug at the bottom if you ever need it */}
      {data && (
        <section className="mt-10">
          <h2 className="text-xl mb-2 text-white/70">Raw health payload</h2>
          <pre className="text-xs bg-white/5 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}