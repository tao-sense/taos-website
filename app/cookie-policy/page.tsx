import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | The Art of Sensuality",
  description:
    "Learn how The Art of Sensuality (TAOS) uses cookies and similar technologies on our website.",
  alternates: {
    canonical: "https://theartofsensuality.com/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#0a0705] text-[#e8ddd0]">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center border-b border-[#c9a96e]/20">
        <p className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-4 font-light">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-wide text-[#f0e6d3] mb-4">
          Cookie Policy
        </h1>
        <p className="text-[#8a7a6a] text-sm tracking-widest uppercase">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        <div className="prose-taos">
          <p className="text-[#c4b5a5] leading-relaxed text-base">
            This Cookie Policy explains what cookies are, which cookies The Art
            of Sensuality (TAOS) uses, and how you can manage your preferences.
            It should be read alongside our{" "}
            <a
              href="/privacy"
              className="text-[#c9a96e] underline underline-offset-4 hover:text-[#e8c98a] transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-4">
          <SectionHeading number="1" title="What Are Cookies?" />
          <Body>
            Cookies are small text files placed on your device when you visit a
            website. They allow the site to recognise your browser on future
            visits and can store certain preferences or information about your
            session. Cookies cannot run programmes or carry viruses.
          </Body>
          <Body>
            Similar technologies — such as local storage and session storage —
            work in comparable ways and are covered by this policy.
          </Body>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <SectionHeading number="2" title="Cookies We Use" />
          <Body>
            TAOS currently uses only{" "}
            <strong className="text-[#e8ddd0] font-medium">
              strictly necessary cookies
            </strong>
            . These are essential for the website to function correctly and
            cannot be switched off. They do not track you for advertising
            purposes and do not require your consent under UK GDPR.
          </Body>

          <CookieTable
            rows={[
              {
                name: "next-auth.session-token",
                purpose:
                  "Keeps you logged in to your TAOS account during a session.",
                type: "Strictly Necessary",
                duration: "Session / up to 30 days",
              },
              {
                name: "next-auth.csrf-token",
                purpose:
                  "Protects form submissions against cross-site request forgery (CSRF) attacks.",
                type: "Strictly Necessary",
                duration: "Session",
              },
              {
                name: "__Secure-next-auth.session-token",
                purpose:
                  "Secure variant of the session token used over HTTPS connections.",
                type: "Strictly Necessary",
                duration: "Session / up to 30 days",
              },
            ]}
          />

          <Body>
            We do{" "}
            <strong className="text-[#e8ddd0] font-medium">not</strong>{" "}
            currently use analytics, advertising, or tracking cookies. If this
            changes, we will update this policy and seek your consent before any
            such cookies are set.
          </Body>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <SectionHeading number="3" title="Third-Party Cookies" />
          <Body>
            At present, no third-party cookies are set by our website. If you
            follow links to external sites (for example, our Instagram or
            Facebook pages), those sites operate under their own cookie
            policies, which we encourage you to review.
          </Body>
        </div>

        {/* Section 4 */}
        <div className="space-y-4">
          <SectionHeading number="4" title="Managing Your Cookies" />
          <Body>
            Because we only use strictly necessary cookies, no consent banner is
            required at this time. However, you can always manage or delete
            cookies through your browser settings. Please be aware that
            disabling strictly necessary cookies may affect how the website
            functions.
          </Body>
          <Body>Instructions for the most common browsers:</Body>
          <ul className="space-y-2 pl-5">
            {[
              {
                browser: "Google Chrome",
                url: "https://support.google.com/chrome/answer/95647",
              },
              {
                browser: "Mozilla Firefox",
                url: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer",
              },
              {
                browser: "Safari",
                url: "https://support.apple.com/en-gb/guide/safari/sfri11471/mac",
              },
              {
                browser: "Microsoft Edge",
                url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
              },
            ].map(({ browser, url }) => (
              <li key={browser} className="text-[#c4b5a5] text-sm">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9a96e] underline underline-offset-4 hover:text-[#e8c98a] transition-colors"
                >
                  {browser}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 5 */}
        <div className="space-y-4">
          <SectionHeading number="5" title="Changes to This Policy" />
          <Body>
            We may update this Cookie Policy from time to time — particularly if
            we introduce analytics or advertising tools. The &ldquo;last
            updated&rdquo; date at the top of this page will reflect any
            changes, and where required by law, we will notify you and seek
            fresh consent.
          </Body>
        </div>

        {/* Section 6 */}
        <div className="space-y-4">
          <SectionHeading number="6" title="Contact Us" />
          <Body>
            If you have any questions about how we use cookies, please contact
            Wesley Tan at{" "}
            <a
              href="mailto:touch@taosense.uk"
              className="text-[#c9a96e] underline underline-offset-4 hover:text-[#e8c98a] transition-colors"
            >
              touch@taosense.uk
            </a>
            .
          </Body>
          <Body>
            You also have the right to lodge a complaint with the UK&rsquo;s
            data protection regulator, the{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a96e] underline underline-offset-4 hover:text-[#e8c98a] transition-colors"
            >
              Information Commissioner&rsquo;s Office (ICO)
            </a>
            .
          </Body>
        </div>

        {/* Back link */}
        <div className="pt-8 border-t border-[#c9a96e]/20">
          <a
            href="/privacy"
            className="text-[#c9a96e] text-sm tracking-widest uppercase hover:text-[#e8c98a] transition-colors"
          >
            ← Privacy Policy
          </a>
        </div>
      </section>
    </main>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="text-xl font-light tracking-wide text-[#f0e6d3] flex items-baseline gap-3">
      <span className="text-[#c9a96e] text-sm font-normal">{number}.</span>
      {title}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#c4b5a5] leading-relaxed text-base">{children}</p>
  );
}

interface CookieRow {
  name: string;
  purpose: string;
  type: string;
  duration: string;
}

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-[#c9a96e]/20">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#c9a96e]/20 bg-[#c9a96e]/5">
            <th className="text-left px-4 py-3 text-[#c9a96e] font-normal tracking-widest uppercase text-xs">
              Cookie
            </th>
            <th className="text-left px-4 py-3 text-[#c9a96e] font-normal tracking-widest uppercase text-xs">
              Purpose
            </th>
            <th className="text-left px-4 py-3 text-[#c9a96e] font-normal tracking-widest uppercase text-xs">
              Type
            </th>
            <th className="text-left px-4 py-3 text-[#c9a96e] font-normal tracking-widest uppercase text-xs">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.name}
              className={`border-b border-[#c9a96e]/10 last:border-0 ${
                i % 2 === 0 ? "" : "bg-white/[0.02]"
              }`}
            >
              <td className="px-4 py-3 text-[#e8ddd0] font-mono text-xs whitespace-nowrap">
                {row.name}
              </td>
              <td className="px-4 py-3 text-[#c4b5a5] leading-snug">
                {row.purpose}
              </td>
              <td className="px-4 py-3 text-[#c4b5a5] whitespace-nowrap">
                {row.type}
              </td>
              <td className="px-4 py-3 text-[#c4b5a5] whitespace-nowrap">
                {row.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
