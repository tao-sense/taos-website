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
            <li>
              Workshop and Retreat deposits are non-refundable but may be
              transferred to another event with at least 7 days’ notice.
            </li>
          </ul>

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