import Link from "next/link";
import type { FaqItem } from "@/lib/faq";

// Question/answer list in the same style as the Tantra page's FAQ section,
// rendered from lib/faq.ts.
export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-6 text-black/80">
      {items.map((item) => (
        <div key={item.question}>
          <h3 className="font-semibold text-black mb-2">{item.question}</h3>
          {item.answer.map((paragraph, i) => (
            <p key={i}>
              {paragraph.map((part, j) =>
                typeof part === "string" ? (
                  part
                ) : (
                  <Link key={j} href={part.href} className="text-gold underline">
                    {part.text}
                  </Link>
                )
              )}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
