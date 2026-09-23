import React from "react";

export default function TermsPage() {
  return (
    <main className="bg-white text-black min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gold mb-6">
          Terms & Conditions
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </p>

        <section className="space-y-6 leading-relaxed">
          <p>
            Welcome to <strong>The Art of Sensuality (TAOS)</strong>. By booking
            or participating in any service, session, or event offered through
            TAOS, you agree to the following Terms and Conditions. Please read
            them carefully before making a booking.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            1. About TAOS
          </h2>
          <p>
            TAOS is owned and operated by Wesley Tan, based in Stroud,
            Gloucestershire, United Kingdom. TAOS provides embodiment-based
            services including Tantra Massage, Workshops, Retreats, Coaching,
            and digital educational content.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            2. Eligibility and Scope of Services
          </h2>
          <p>
            Tantra Massage sessions are currently offered exclusively to{" "}
            <strong>women</strong> and <strong>couples</strong> where at least
            one partner identifies as female. TAOS reserves the right to decline
            or discontinue service where the request falls outside these
            parameters or where professional boundaries are not respected.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            3. Bookings and Payments
          </h2>
          <p>
            Bookings may be made online through the TAOS website or directly by
            email. Payments are processed securely via Stripe. A booking is
            confirmed once full payment or deposit has been received.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            4. Cancellations and Refunds
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              For private Tantra Massage sessions: cancellations with more than
              48 hours’ notice are refundable or may be rescheduled once.
            </li>
            <li>
              Cancellations within 48 hours of the appointment are charged in
              full.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            Workshops &amp; Retreats
          </h2>

          <p className="font-semibold mt-2">Booking and confirmation</p>
          <p>
            Submitting a registration form for a workshop or retreat is a
            binding request for a place, not a confirmed booking. We review
            each registration individually — partly to manage group size and
            balance — and aim to confirm or decline within 4 working days,
            excluding weekends.
          </p>

          <p className="font-semibold mt-4">Payment</p>
          <p>
            Once your place is confirmed, a deposit of 50% of the total price
            is payable by bank transfer. The remaining balance is due by bank
            transfer no later than three weeks before the event begins, at
            which point we&rsquo;ll also send a packing list and any final
            practical details.
          </p>

          <p className="font-semibold mt-4">Cancellation</p>
          <p>
            If you cancel 70 or more days before the event starts, you&rsquo;ll
            be charged a £100 deposit fee. Between 30 and 69 days before, 50%
            of the total price. With less than 30 days&rsquo; notice, 90% of
            the total price.
          </p>

          <p className="font-semibold mt-4">Eligibility</p>
          <p>You must be 18 or over to attend any workshop or retreat.</p>

          <p className="font-semibold mt-4">Shared accommodation</p>
          <p>
            Where shared occupancy pricing is offered, couples or partners
            share together. A solo attendee who chooses shared pricing will be
            paired with another solo attendee of the same sex, at our
            discretion.
          </p>

          <p className="font-semibold mt-4">Health information</p>
          <p>
            Where a registration form asks for health information, this is
            provided voluntarily to help us assess suitability and keep
            participants safe, and is seen only by Wesley. If a registration is
            declined, this data is deleted on request and, in any case, within
            90 days.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            5. Client Responsibilities
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Clients agree to provide accurate personal and health information
              relevant to their session.
            </li>
            <li>
              Clients must respect professional and personal boundaries at all
              times. Any behaviour of a sexual, aggressive, or inappropriate
              nature will result in immediate termination of the session without
              refund.
            </li>
            <li>
              Clients must ensure they are medically and psychologically fit to
              participate in any TAOS service.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            6. Confidentiality
          </h2>
          <p>
            All client information and session content are treated with strict
            confidentiality, in accordance with professional ethics and the
            TAOS Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            7. Liability
          </h2>
          <p>
            While every effort is made to provide a safe and supportive
            environment, clients participate in all sessions and workshops at
            their own risk. TAOS shall not be liable for any injury, loss, or
            damage arising from participation, except where caused by proven
            negligence.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            8. Intellectual Property
          </h2>
          <p>
            All written materials, imagery, videos, and educational content
            provided through TAOS remain the intellectual property of Wesley
            Tan. Reproduction or redistribution without consent is prohibited.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            9. Governing Law
          </h2>
          <p>
            These Terms are governed by and interpreted under the laws of
            England and Wales. Any disputes shall be subject to the exclusive
            jurisdiction of the courts of England and Wales.
          </p>

          <p className="mt-10 text-sm text-gray-600">
            For any questions regarding these Terms, please contact{" "}
            <a href="mailto:touch@taosense.uk" className="text-gold underline">
              touch@taosense.uk
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}