// Testimonial quotes for an offering page. Renders nothing while the list is
// empty, so quotes can be added later without layout changes.
export type Testimonial = { quote: string; attribution: string };

export default function Testimonials({
  items,
  heading = "What people say",
}: {
  items: Testimonial[];
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-black text-white py-20 px-6 border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-10">
        <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
          {heading}
        </h2>
        {items.map((t) => (
          <blockquote key={t.quote} className="border-l-4 border-gold pl-4 italic text-white/85">
            <p>“{t.quote}”</p>
            <footer className="mt-2 not-italic text-gold">— {t.attribution}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
