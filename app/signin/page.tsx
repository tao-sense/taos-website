'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '/dashboard';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn('credentials', { redirect: false, email, password, callbackUrl });
    if (res?.error) setError(res.error);
    if (res?.ok) window.location.href = callbackUrl;
    setLoading(false);
  };

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <form onSubmit={onSubmit} className="mt-6 max-w-md space-y-3">
        <input className="w-full px-3 py-2 rounded-2xl bg-white/5 border border-white/10" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full px-3 py-2 rounded-2xl bg-white/5 border border-white/10" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="px-4 py-2 rounded-2xl bg-gold text-black hover:opacity-90 disabled:opacity-50" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      {error && <div className="mt-3 text-red-300">{error}</div>}
      <div className="mt-4 text-white/80">No account? <Link className="underline" href="/signup">Create one</Link></div>
    </section>
  );
}
