"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminSystemPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);

  // ============= AUTH REDIRECT =============
  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/signin");
      return;
    }

    if (session?.user?.role !== "ADMIN") {
      router.replace("/signin");
      return;
    }

    setAllowed(true);
  }, [status, session, router]);

  // Prevent hydration mismatch: render NOTHING until allowed
  if (!allowed) {
    return (
      <main className="bg-black min-h-screen text-white p-10">
        <h1 className="text-3xl text-gold mb-4">TAOS System Health</h1>
        <p className="text-white/60">Checking admin permissions…</p>
      </main>
    );
  }

  // ============= HEALTH FETCH =============
  const { data, error, isLoading } = useSWR("/api/health", fetcher, {
    refreshInterval: 5000,
  });

  return (
    <main className="bg-black min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold text-gold mb-8">TAOS System Health</h1>

      {isLoading && (
        <p className="text-white/70 mb-4">Loading system status…</p>
      )}

      {error && (
        <p className="text-red-400 mb-4">
          Error loading health data. Check /api/health directly.
        </p>
      )}

      {data && (
        <>
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
              <p className="text-xl">
                {data.lastCronRun ?? "No cron data recorded yet"}
              </p>
              {data.cronLatency && (
                <p>Cron DB latency: {data.cronLatency} ms</p>
              )}
            </div>
          </div>

          {/* Raw JSON */}
          <section className="mt-10">
            <h2 className="text-xl mb-2 text-white/70">Raw health payload</h2>
            <pre className="text-xs bg-white/5 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </section>
        </>
      )}
    </main>
  );
}
