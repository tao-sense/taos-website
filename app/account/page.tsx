import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? '';
  let subStatus = 'none';

  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const sub = await prisma.subscription.findFirst({ where: { userId: user.id } });
      if (sub?.status) subStatus = sub.status;
    }
  }

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold">Account</h1>
      <div className="mt-4 rounded-2xl border border-white/10 p-6 bg-white/5">
        <div className="text-white/80">Subscription status: <span className="text-white">{subStatus}</span></div>
        <div className="text-white/70 mt-2">If you just subscribed, it may take a moment for the status to update.</div>
      </div>
    </section>
  );
}
