"use client";

import { useState } from "react";
import Link from "next/link";
import { useCookieConsent } from "@/context/CookieConsent";

export default function CookieBanner() {
  const { hasInteracted, acceptAll, rejectAll, savePreferences } =
    useCookieConsent();

  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (hasInteracted) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0705] border-t border-[#C9A084]/20 shadow-[0_-4px_32px_rgba(0,0,0,0.6)]"
    >
      <div className="max-w-5xl mx-auto px-5 py-5">
        {/* ── Collapsed row ─────────────────────────────────────── */}
        {!expanded && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-[#9a8c7e] text-xs leading-relaxed flex-1">
              We use cookies to keep this site secure and, with your permission,
              to understand how it is used. See our{" "}
              <Link
                href="/cookie-policy"
                className="text-[#C9A084] underline underline-offset-2 hover:text-[#e8c98a] transition-colors"
              >
                Cookie Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => setExpanded(true)}
                className="text-xs tracking-[0.12em] uppercase text-[#9a8c7e] border border-[#C9A084]/25 px-4 py-2 rounded-sm hover:border-[#C9A084]/50 hover:text-[#C9A084] transition-colors"
              >
                Manage
              </button>
              <button
                onClick={rejectAll}
                className="text-xs tracking-[0.12em] uppercase text-[#9a8c7e] border border-[#C9A084]/25 px-4 py-2 rounded-sm hover:border-[#C9A084]/50 hover:text-[#C9A084] transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="text-xs tracking-[0.12em] uppercase text-[#0a0705] bg-[#C9A084] px-5 py-2 rounded-sm hover:bg-[#e8c98a] transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        )}

        {/* ── Expanded preferences ──────────────────────────────── */}
        {expanded && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[#f0e6d3] text-sm font-light tracking-wide">
                Cookie Preferences
              </h2>
              <button
                onClick={() => setExpanded(false)}
                className="text-[#9a8c7e] text-xs hover:text-[#C9A084] transition-colors"
                aria-label="Collapse preferences"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 divide-y divide-[#C9A084]/10">
              {/* Necessary */}
              <CategoryRow
                title="Strictly Necessary"
                description="Essential for login sessions and CSRF protection. Cannot be disabled."
                checked={true}
                disabled
              />

              {/* Analytics */}
              <CategoryRow
                title="Analytics"
                description="Helps us understand which pages are visited so we can improve the site. No personal data is sold."
                checked={analytics}
                onChange={setAnalytics}
              />

              {/* Marketing */}
              <CategoryRow
                title="Marketing"
                description="Allows personalised content and ads from platforms such as Meta. Currently not active."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-end pt-1">
              <button
                onClick={rejectAll}
                className="text-xs tracking-[0.12em] uppercase text-[#9a8c7e] border border-[#C9A084]/25 px-4 py-2 rounded-sm hover:border-[#C9A084]/50 hover:text-[#C9A084] transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={() => savePreferences(analytics, marketing)}
                className="text-xs tracking-[0.12em] uppercase text-[#0a0705] bg-[#C9A084] px-5 py-2 rounded-sm hover:bg-[#e8c98a] transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-component ────────────────────────────────────────────────────────────

function CategoryRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 pt-3 first:pt-0">
      <div className="flex-1">
        <p className="text-[#e8ddd0] text-xs font-normal tracking-wide">
          {title}
          {disabled && (
            <span className="ml-2 text-[#9a8c7e] text-[10px] normal-case tracking-normal">
              Always on
            </span>
          )}
        </p>
        <p className="text-[#6e6358] text-xs leading-snug mt-0.5">
          {description}
        </p>
      </div>
      {/* Toggle */}
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`
          relative shrink-0 mt-0.5 w-9 h-5 rounded-full transition-colors duration-200
          focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A084]
          ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
          ${checked ? "bg-[#C9A084]" : "bg-[#3a3028]"}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white
            transition-transform duration-200
            ${checked ? "translate-x-4" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}
