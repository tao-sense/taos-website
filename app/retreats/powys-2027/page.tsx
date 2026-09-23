import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WorkshopBookingForm from "@/app/offerings/workshops/[id]/workshop-booking-form";

const WORKSHOP_ID = "cmudsv18m0000id04441fotyp"; // Workshop record: "Tantra Massage Seminar - Garth Barns & Country House"

// Oct 31 is post-BST (clocks go back Oct 25, 2026), so 23:59 UK time = 23:59 UTC
const EARLY_BIRD_DEADLINE = new Date("2026-10-31T23:59:59Z"); // 23:59 UK time; Oct 31 is post-BST (GMT)
const EARLY_BIRD_DISCOUNT = 50;
const SINGLE_FULL = 920;
const SHARED_FULL = 720;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tantra Massage Seminar — Garth Barns & Country House, Powys | TAOS",
  description:
    "Four-day residential Tantra Massage Seminar at Garth Barns & Country House, Powys, Wales. 11–14 February 2027. Learn the full Tantra massage ritual with Wesley Tan.",
  openGraph: {
    title: "Tantra Massage Seminar — Garth Barns & Country House, Powys | TAOS",
    description:
      "Four-day residential Tantra Massage Seminar at Garth Barns & Country House, Powys. 11–14 February 2027. Guided by Wesley Tan.",
    url: "https://theartofsensuality.com/retreats/powys-2027",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: "https://theartofsensuality.com/images/retreats/powys-2027/Hero.jpg",
        width: 1200,
        height: 800,
        alt: "Garth Barns & Country House, Powys — TAOS Tantra Massage Seminar 2027",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://theartofsensuality.com/retreats/powys-2027",
  },
};

export default function Powys2027Page() {
  const isEarlyBird = new Date() <= EARLY_BIRD_DEADLINE;
  const singlePrice = isEarlyBird ? SINGLE_FULL - EARLY_BIRD_DISCOUNT : SINGLE_FULL;
  const sharedPrice = isEarlyBird ? SHARED_FULL - EARLY_BIRD_DISCOUNT : SHARED_FULL;

  return (
    <main className="bg-black text-white">

      {/* ── HERO ── */}
      <section className="relative h-[90vh] w-full flex items-end justify-center overflow-hidden">
        <Image
          src="/images/retreats/powys-2027/Hero.jpg"
          alt="Garth Barns & Country House set across the Powys hills, Wales — venue for the TAOS Tantra Massage Seminar February 2027"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 text-center px-6 pb-16 max-w-4xl mx-auto">
          <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4 font-light">
            The Art of Sensuality
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl font-semibold text-white mb-4 leading-tight">
            Tantra Massage Seminar
          </h1>
          <p className="font-playfair text-xl md:text-2xl text-gold mb-3">
            Garth Barns &amp; Country House, Powys, Wales
          </p>
          <p className="text-white/80 text-base md:text-lg">
            Thursday 11 – Sunday 14 February 2027
            <span className="mx-3 text-gold">·</span>
            4pm arrival to 4pm departure Sunday, three nights
          </p>
          {isEarlyBird && (
            <p className="text-gold/90 text-sm mt-3">
              Early bird: £50 off when you register by 31 October.
            </p>
          )}
          <a
            href="#booking"
            className="mt-8 inline-block px-8 py-3 bg-gold text-black font-semibold rounded-full hover:bg-white transition"
          >
            Book Your Space
          </a>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-12">
            <Image
              src="/images/swirl-divider.png"
              alt=""
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
              aria-hidden="true"
            />
          </div>
          <p className="text-lg md:text-xl leading-relaxed text-black/80">
            Would you like to learn the art of Tantra massage? To know yourself more clearly, to
            bring something new into a relationship, or as a foundation for further training down
            the line, there are as many reasons to come to this seminar as there are people who
            attend. Our four-day Tantra Massage Seminar gives you enough time to learn the
            fundamentals properly, step by step, with plenty of room to actually practise what
            you&rsquo;ve learned.
          </p>
        </div>

        {/* Venue images */}
        <div className="max-w-5xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-72 md:h-96 rounded-xl overflow-hidden">
            <Image
              src="/images/retreats/powys-2027/Venue-1.jpg"
              alt="Exterior of Garth Barns & Country House, Powys"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-72 md:h-96 rounded-xl overflow-hidden">
            <Image
              src="/images/retreats/powys-2027/Venue-2.jpg"
              alt="Garth Barns country house and gardens, Powys, Wales"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── WHY FOUR DAYS ── */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold">
              Why four days?
            </h2>
            <p className="text-white/80 leading-relaxed">
              A weekend isn&rsquo;t long enough to learn and practise the full structure of a
              Tantra massage properly. At the other end, a week or a series of weekends is more
              than most people need, particularly if you&rsquo;re learning for your own use rather
              than towards professional training. Four days strikes the balance: long enough to
              teach the fundamentals thoroughly and build real confidence putting them into
              practice, short enough to stay manageable alongside work and life.
            </p>
            <p className="text-white/80 leading-relaxed">
              We see this as basic level training: intensive enough to really learn, and enough of
              a challenge to stimulate real growth, realisation, and personal integration.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src="/images/retreats/powys-2027/Studiomain.jpg"
              alt="The main studio space at Garth Barns where sessions take place"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold mb-6">
            Who it&rsquo;s for
          </h2>
          <p className="text-lg leading-relaxed text-black/80">
            Open to couples and to singles, and no prior experience is needed. The practice
            sessions are floor-based, so you&rsquo;ll want to be comfortable kneeling and sitting
            for periods of time, and a reasonable level of joint mobility helps, both for your own
            comfort and for giving a massage to a partner. If you have any concerns about your
            ability to take part, get in touch directly and we can talk it through before you
            register.
          </p>
        </div>
      </section>

      {/* ── HEART OF THE SEMINAR ── */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="relative h-80 md:h-full min-h-[320px] rounded-xl overflow-hidden order-last md:order-first">
            <Image
              src="/images/retreats/powys-2027/retreatsetting.jpg"
              alt="The retreat setting at Garth Barns in the Powys hills"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold">
              The Heart of the Seminar
            </h2>
            <p className="text-white/80 leading-relaxed">
              This isn&rsquo;t just a course in sensual massage. You&rsquo;ll learn the techniques, and
              you&rsquo;ll learn them properly, but the techniques aren&rsquo;t the point. What
              we&rsquo;re really practising is presence: being with another person, and with
              ourselves, without performance, without expectation, and without judgement.
            </p>
            <p className="text-white/80 leading-relaxed">
              Most of us have learned to keep pleasure and sensuality at arm&rsquo;s length, to
              treat them as separate from who we are, or something to feel awkward about. This
              seminar works the other way. Touch becomes a way back into accepting the whole of
              ourselves, sensual and sexual nature included, not as something set apart or hidden,
              but as part of being human. The techniques exist to serve that, not the other way
              round.
            </p>
            <p className="text-white/80 leading-relaxed">
              And if you&rsquo;re already comfortable and open with your own sensuality, this is a
              chance to look closer. Openness can carry its own performance too, its own
              expectations of how things should go, how you should show up, what being &ldquo;good
              at this&rdquo; looks like. This seminar is as much an opportunity to notice those
              layers as it is to learn something new, and to practise letting go of them
              consciously, rather than simply trading one set of learned behaviour for another.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN ── */}
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold">
              What you&rsquo;ll learn
            </h2>
            <p className="text-lg leading-relaxed text-black/80">
              The full structure and techniques of the Tantra massage ritual, alongside the
              practice of presence and awareness that underpins it. Some sessions will include
              short guided meditation, breathwork, basic movement and dance, alongside the massage
              work itself.
            </p>
          </div>
          <div className="relative h-72 rounded-xl overflow-hidden">
            <Image
              src="/images/retreats/powys-2027/Massage.jpg"
              alt="Tantra massage being given at a TAOS seminar"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold mb-10">
            How the days run
          </h2>
          <div className="space-y-4">
            {[
              { day: "Thursday", hours: "4pm – 8pm" },
              { day: "Friday", hours: "9.30am – 7.30pm" },
              { day: "Saturday", hours: "9.30am – 7.30pm" },
              { day: "Sunday", hours: "9am – 4pm" },
            ].map(({ day, hours }) => (
              <div
                key={day}
                className="flex items-baseline justify-between border-b border-white/10 pb-4"
              >
                <span className="font-playfair text-xl text-white">{day}</span>
                <span className="text-gold font-light tracking-wide">{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITATION + PRACTICE FORMAT ── */}
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-semibold text-gold">Facilitation</h2>
            <p className="text-lg leading-relaxed text-black/80">
              Wesley Tan will be facilitating the seminar throughout, and may be joined by models to
              support guided demonstrations (to be confirmed).
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-playfair text-3xl font-semibold text-gold">Practice format</h2>
            <p className="text-lg leading-relaxed text-black/80">
              Sessions combine guided demonstration with paired practice. Pairs are arranged with
              a mix of male and female participants, which is part of why group balance matters
              to us.
            </p>
            <p className="text-lg leading-relaxed text-black/80">
              We do our best to keep the group evenly balanced between women and men when
              confirming registrations, since it shapes how the paired practice works. We
              can&rsquo;t guarantee an exact balance in every case, particularly if someone
              withdraws close to the seminar, but we&rsquo;ll always look for the best solution
              for the group if that happens.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE VENUE ── */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold mb-6">
            The venue
          </h2>
          <p className="text-white/80 leading-relaxed max-w-3xl mb-12 text-lg">
            We&rsquo;ll be based at Garth Barns &amp; Country House, a converted barn and country
            house set across 230 acres near Llanidloes in the Powys hills. There&rsquo;s woodland,
            open hilltop walking, a private lake for wild swimming, and a light-filled studio where
            we&rsquo;ll spend most of our time together. Rooms are en-suite, either single or
            shared double.
          </p>

          {/* Venue gallery — exterior & grounds */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            <div className="relative h-56 rounded-lg overflow-hidden col-span-2 md:col-span-2">
              <Image
                src="/images/retreats/powys-2027/venue-3.jpg"
                alt="Garth Barns & Country House approach and grounds, Powys"
                fill
                className="object-cover"
              />
            </div>
            {/* col-span-2 on mobile: odd item, spans full width instead of leaving blank cell */}
            <div className="relative h-56 rounded-lg overflow-hidden col-span-2 md:col-span-1">
              <Image
                src="/images/retreats/powys-2027/retreatview.jpg"
                alt="Views across the Powys hills from Garth Barns"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Grounds — lake & woodland */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            <div className="relative h-52 rounded-lg overflow-hidden">
              <Image
                src="/images/retreats/powys-2027/lake.jpg"
                alt="The private lake at Garth Barns for wild swimming"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-52 rounded-lg overflow-hidden">
              <Image
                src="/images/retreats/powys-2027/lakeview.jpg"
                alt="View over the private lake and surrounding hills at Garth Barns"
                fill
                className="object-cover"
              />
            </div>
            {/* col-span-2 on mobile: odd item, spans full width instead of leaving blank cell */}
            <div className="relative h-52 rounded-lg overflow-hidden col-span-2 md:col-span-1">
              <Image
                src="/images/retreats/powys-2027/thedingle.jpg"
                alt="The Dingle woodland walk at Garth Barns"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Studio */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative h-56 rounded-lg overflow-hidden">
              <Image
                src="/images/retreats/powys-2027/studio3.jpg"
                alt="Light-filled studio space at Garth Barns where sessions take place"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-56 rounded-lg overflow-hidden">
              <Image
                src="/images/retreats/powys-2027/studio4.jpg"
                alt="The studio at Garth Barns prepared for seminar sessions"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Rooms */}
          <div className="mt-8">
            <p className="text-white/50 uppercase tracking-widest text-xs mb-4">Accommodation</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {[
                { src: "Room1.jpg",  alt: "Bedroom 1 at Garth Barns" },
                { src: "room2.jpg",  alt: "Bedroom 2 at Garth Barns" },
                { src: "room3.jpg",  alt: "Bedroom 3 at Garth Barns" },
                { src: "room4.jpg",  alt: "Bedroom 4 at Garth Barns" },
              ].map(({ src, alt }) => (
                <div key={src} className="relative h-40 rounded-lg overflow-hidden">
                  <Image
                    src={`/images/retreats/powys-2027/${src}`}
                    alt={alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: "room1ensuite.jpg", alt: "En-suite bathroom for bedroom 1 at Garth Barns" },
                { src: "room2ensuite.jpg", alt: "En-suite bathroom for bedroom 2 at Garth Barns" },
                { src: "room3ensuite.jpg", alt: "En-suite bathroom for bedroom 3 at Garth Barns" },
                { src: "room4ensuite.jpg", alt: "En-suite bathroom for bedroom 4 at Garth Barns" },
              ].map(({ src, alt }) => (
                <div key={src} className="relative h-40 rounded-lg overflow-hidden">
                  <Image
                    src={`/images/retreats/powys-2027/${src}`}
                    alt={alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEES ── */}
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold mb-8">
            Seminar fees
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div className="border border-gold rounded-xl p-6">
              {isEarlyBird ? (
                <p className="font-playfair text-2xl font-semibold mb-1">
                  <span className="line-through text-black/35 text-lg font-normal mr-2">£{SINGLE_FULL}</span>
                  <span className="text-gold">£{singlePrice}</span>
                </p>
              ) : (
                <p className="text-gold font-playfair text-2xl font-semibold mb-1">£{SINGLE_FULL}</p>
              )}
              <p className="font-semibold text-black mb-2">Single occupancy</p>
              <p className="text-black/60 text-sm leading-relaxed">
                Includes tuition, accommodation and meals for the full retreat.
              </p>
            </div>
            <div className="border border-gold rounded-xl p-6">
              {isEarlyBird ? (
                <p className="font-playfair text-2xl font-semibold mb-1">
                  <span className="line-through text-black/35 text-lg font-normal mr-2">£{SHARED_FULL}</span>
                  <span className="text-gold">£{sharedPrice} per person</span>
                </p>
              ) : (
                <p className="text-gold font-playfair text-2xl font-semibold mb-1">£{SHARED_FULL} per person</p>
              )}
              <p className="font-semibold text-black mb-2">Shared double occupancy</p>
              <p className="text-black/60 text-sm leading-relaxed">
                Includes tuition, accommodation and meals for the full retreat.
              </p>
            </div>
          </div>
          {isEarlyBird && (
            <p className="text-gold text-sm mb-6">
              Early bird: register by 31 October to save £50. Deposit to be paid within 7 days of your place being confirmed.
            </p>
          )}
          <p className="text-black/70 leading-relaxed">
            Travel to and from the venue isn&rsquo;t included and is for you to arrange, though if
            you&rsquo;re travelling from a similar area to other participants, get in touch and we
            may be able to help put you in touch with each other. There&rsquo;s some free time
            around meals and in the evenings.
          </p>
          <p className="text-black/70 mt-3 font-medium">Places are capped at 20.</p>
        </div>
      </section>

      {/* ── HOW REGISTRATION WORKS ── */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold">
            How registration works
          </h2>
          <p className="text-white/80 leading-relaxed">
            Submitting the form below is a registration request for a place on the seminar.
            It&rsquo;s binding on your side, but your place isn&rsquo;t confirmed until
            we&rsquo;ve reviewed your registration and sent confirmation, which we aim to do
            within 48 hours. Once confirmed, we&rsquo;ll ask for a
            deposit of £200 by bank transfer. The remaining balance, along with practical details
            like a packing list and directions to the venue, will be sent by email three weeks
            before the seminar.
          </p>
        </div>
      </section>

      {/* ── CANCELLATION ── */}
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-playfair text-3xl font-semibold text-gold">Cancellation</h2>
          <div className="space-y-3 text-black/80">
            <div className="flex gap-4 border-b border-black/10 pb-3">
              <span className="w-56 shrink-0 font-medium">70+ days before</span>
              <span>£100 administration fee deducted from the deposit</span>
            </div>
            <div className="flex gap-4 border-b border-black/10 pb-3">
              <span className="w-56 shrink-0 font-medium">30–69 days before</span>
              <span>50% of your total cost</span>
            </div>
            <div className="flex gap-4 pb-3">
              <span className="w-56 shrink-0 font-medium">Less than 30 days</span>
              <span>90% of your total cost</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRACTICALITIES ── */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-playfair text-3xl font-semibold text-gold">Practicalities</h2>
          <p className="text-white/80 leading-relaxed">
            A full packing list and further details will be emailed four weeks before the seminar.
            For anything else, see our{" "}
            <Link href="/faq" className="text-gold underline hover:text-white transition">
              FAQ page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── REGISTRATION FORM ── */}
      <section className="bg-black text-white py-20 px-6 border-t border-white/10 scroll-mt-20" id="booking">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold mb-4 text-center">
            Register
          </h2>
          <p className="text-center text-white/70 mb-10 max-w-xl mx-auto">
            Complete the form below to request a place. Your application is reviewed before your
            place is confirmed — we&rsquo;ll be in touch within 48 hours.
          </p>
          <WorkshopBookingForm workshopId={WORKSHOP_ID} earlyBird={isEarlyBird} />
        </div>
      </section>

    </main>
  );
}
