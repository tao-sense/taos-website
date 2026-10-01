import type { ReactNode } from "react";

// Compact "At a glance" facts panel used near the top of offering pages.
export default function AtAGlance({
  items,
}: {
  items: { label: string; value: ReactNode }[];
}) {
  return (
    <div className="max-w-3xl mx-auto rounded-2xl border border-gold/40 bg-white shadow-sm">
      <h2 className="font-playfair text-2xl font-semibold text-gold text-center pt-6">
        At a glance
      </h2>
      <dl className="divide-y divide-black/10 px-6 pb-4 pt-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4 py-3"
          >
            <dt className="font-semibold text-black">{item.label}</dt>
            <dd className="text-black/80">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
