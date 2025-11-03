import React from "react";

export default function PrivacyPage() {
  return (
    <main className="bg-white text-black min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gold mb-6">Privacy Policy</h1>
        <p className="mb-8 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </p>

        <section className="space-y-6 leading-relaxed">
          <p>
            This Privacy Policy explains how <strong>The Art of Sensuality
            (TAOS)</strong> collects, uses, and protects your personal data in
            accordance with the UK General Data Protection Regulation (GDPR).
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            1. Data Controller
          </h2>
          <p>
            TAOS is operated by Wesley Tan, Stroud, Gloucestershire, United
            Kingdom. You can contact us at{" "}
            <a href="mailto:touch@taosense.uk" className="text-gold underline">
              touch@taosense.uk
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            2. Information We Collect
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Contact details (name, email, phone number, address).</li>
            <li>Booking details for sessions, workshops, or retreats.</li>
            <li>
              Health or wellbeing information voluntarily shared before a
              session.
            </li>
            <li>Payment information (processed securely via Stripe).</li>
            <li>Technical data such as device, browser, or cookies (if analytics
              are implemented).</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>To process enquiries, bookings, and payments.</li>
            <li>To deliver our services and provide session follow-up.</li>
            <li>To communicate updates, workshops, or newsletters (with consent).</li>
            <li>To maintain records for legal, tax, and professional compliance.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            4. Lawful Basis for Processing
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Consent (for contact forms and newsletters).</li>
            <li>Contractual necessity (for bookings and payments).</li>
            <li>Legitimate interest (for security and service improvement).</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            5. Data Storage and Security
          </h2>
          <p>
            Personal data is stored securely using trusted third-party
            processors:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Supabase – for form submissions and workshop enquiries.</li>
            <li>Stripe – for secure payment processing.</li>
            <li>Zoho Mail – for email communication.</li>
            <li>Resend – for automated transactional emails.</li>
          </ul>
          <p>
            Access is restricted and data is encrypted where applicable. We do
            not sell or share data with third parties for marketing purposes.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            6. Data Retention
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>General enquiries: 12 months.</li>
            <li>Booking and payment records: 6 years (for accounting compliance).</li>
            <li>Newsletter subscribers: until you unsubscribe.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            7. Your Rights
          </h2>
          <p>
            Under GDPR you have the right to:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Access, correct, or delete your personal data.</li>
            <li>Withdraw consent at any time.</li>
            <li>Request data portability or restriction of processing.</li>
            <li>Complain to the ICO if you believe your rights are violated.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            8. Cookies and Analytics
          </h2>
          <p>
            TAOS may use minimal cookies for site functionality and anonymous
            usage analytics. You can manage cookies via your browser settings.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-10">
            9. Updates to This Policy
          </h2>
          <p>
            This policy may be updated from time to time. The latest version
            will always be available on this website.
          </p>
        </section>
      </div>
    </main>
  );
}