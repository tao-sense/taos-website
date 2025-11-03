'use client';

import Link from 'next/link';

export default function MiniFAQ({
  items,
  link = '/faq',
}: {
  items: { question: string; answer: string }[];
  link?: string;
}) {
  return (
    <section className="bg-gray-50 text-black py-16 px-6 border-t border-gray-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gold mb-8 text-center">
          Common Questions
        </h2>

        <div className="space-y-8 text-black/80">
          {items.map((item, i) => (
            <div key={i}>
              <h3 className="font-semibold text-black mb-2">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={link}
            className="inline-block text-gold hover:underline font-semibold"
          >
            View all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}