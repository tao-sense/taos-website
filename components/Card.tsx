export default function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
      <div className="font-semibold text-gold">{title}</div>
      <p className="mt-2 text-white/85">{children}</p>
    </div>
  );
}