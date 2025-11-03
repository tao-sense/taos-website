export default function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="inline-block h-[3px] w-6 bg-gold rounded-full" />
      <span className="uppercase tracking-widest text-[12px] text-white/60">
        {children}
      </span>
    </div>
  );
}