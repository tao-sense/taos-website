"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * CookieNotice
 *
 * A minimal, non-intrusive notice displayed in the footer area.
 * Suitable for a strictly-necessary-only cookie setup where full
 * consent is not legally required — it simply informs visitors.
 *
 * Dismissed state is stored in localStorage so it disappears after
 * the user acknowledges it once.
 *
 * Usage: Drop into your root layout or footer component.
 *   <CookieNotice />
 */
export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("taos-cookie-notice");
      if (!dismissed) setVisible(true);
    } catch {
      // localStorage blocked (private browsing, etc.) — show notice anyway
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem("taos-cookie-notice", "1");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-[#0f0c09]/95 backdrop-blur-sm
        border-t border-[#c9a96e]/20
        px-4 py-3
        flex flex-col sm:flex-row sm:items-center
        gap-3 sm:gap-6
        transition-transform duration-500
        ${visible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      {/* Message */}
      <p className="text-[#9a8c7e] text-xs leading-relaxed flex-1">
        This site uses only essential cookies to keep it working securely.
        No tracking or advertising cookies are used.{" "}
        <Link
          href="/cookie-policy"
          className="text-[#c9a96e] underline underline-offset-2 hover:text-[#e8c98a] transition-colors whitespace-nowrap"
        >
          Cookie Policy
        </Link>
      </p>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        aria-label="Dismiss cookie notice"
        className="
          shrink-0
          text-xs tracking-[0.15em] uppercase
          text-[#c9a96e] border border-[#c9a96e]/40
          px-5 py-2 rounded-sm
          hover:bg-[#c9a96e]/10 hover:border-[#c9a96e]
          transition-colors duration-200
          self-start sm:self-auto
        "
      >
        Got it
      </button>
    </div>
  );
}
