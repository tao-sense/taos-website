import Link from 'next/link';

export default function CardCTA({
  title,
  children,
  cta,
  href,
}: {
  title: string;
  children: React.ReactNode;
  cta: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gold">{title}</h3>
      <p className="mt-3 text-white/80">{children}</p>
      <Link
        href={href}
        className="mt-5 inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
      >
        {cta}
      </Link>
    </div>
  );
}