import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? '';

  // Check subscription status
  let isActive = false;
  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const sub = await prisma.subscription.findFirst({ where: { userId: user.id } });
      isActive = !!sub && (sub.status === 'active' || sub.status === 'trialing' || sub.status === 'past_due');
    }
  }

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold">Welcome{session?.user?.name ? `, ${session.user.name}` : ''}</h1>
      {!isActive ? (
        <div className="mt-4 p-4 border border-white/10 rounded-2xl bg-white/5">
          <div className="text-white/80">You don’t have an active membership.</div>
          <Link className="inline-block mt-4 px-5 py-3 rounded-2xl bg-gold text-black hover:opacity-90" href="/pricing">
            Subscribe
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ['Warm‑up & Breath', 'Ground and attune your system'],
            ['Flexibility Flow', 'Open hips, hamstrings, and shoulders'],
            ['Strength & Balance', 'Control, alignment, grace'],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-white/10 p-6 bg-white/5">
              <div className="font-semibold">{title}</div>
              <div className="text-white/70 mt-2">{desc}</div>
              <button className="mt-4 px-4 py-2 rounded-2xl border border-white/20 hover:border-white/40">Start</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
