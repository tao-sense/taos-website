export default function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="shrink-0 mt-1 text-gold">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-white/80">{body}</p>
      </div>
    </div>
  );
}