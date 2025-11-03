'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOk(false);

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) setOk(true);
    else {
      const data = await res.json().catch(() => ({}));
      setError(data?.error || 'Sign up failed');
    }
    setLoading(false);
  };

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold">Create account</h1>
      <form onSubmit={onSubmit} className="mt-6 max-w-md space-y-3">
        <input className="w-full px-3 py-2 rounded-2xl bg-white/5 border border-white/10" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full px-3 py-2 rounded-2xl bg-white/5 border border-white/10" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full px-3 py-2 rounded-2xl bg-white/5 border border-white/10" type="password" placeholder="Password (min 8 chars)" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="px-4 py-2 rounded-2xl bg-gold text-black hover:opacity-90 disabled:opacity-50" disabled={loading}>
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      {error && <div className="mt-3 text-red-300">{error}</div>}
      {ok && <div className="mt-3 text-green-300">Account created! You can now <Link className="underline" href="/signin">sign in</Link>.</div>}
    </section>
  );
}
