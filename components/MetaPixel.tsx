"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/context/CookieConsent";
import { META_PIXEL_ID } from "@/lib/fpixel";

declare global {
  interface Window {
    fbq: (type: string, eventName: string, params?: Record<string, unknown>) => void;
    _fbq: Window["fbq"];
    fbqLoaded: boolean;
  }
}

function loadPixelScript(pixelId: string) {
  if (typeof window === "undefined" || window.fbqLoaded) return;
  window.fbqLoaded = true;

  // Meta Pixel base code (script injection equivalent)
  const n = function (...args: unknown[]) {
    (n as unknown as { callMethod: (...a: unknown[]) => void }).callMethod
      ? (n as unknown as { callMethod: (...a: unknown[]) => void }).callMethod(...args)
      : (n as unknown as { queue: unknown[] }).queue.push(args);
  } as unknown as Window["fbq"];

  if (!window.fbq) {
    window.fbq = n;
    window._fbq = n;
    (n as unknown as { push: typeof n }).push = n;
    (n as unknown as { loaded: boolean }).loaded = true;
    (n as unknown as { version: string }).version = "2.0";
    (n as unknown as { queue: unknown[] }).queue = [];
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

export default function MetaPixel() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (!META_PIXEL_ID) return;

    if (consent.marketing) {
      loadPixelScript(META_PIXEL_ID);
      window.fbq("consent", "grant");
    } else {
      if (typeof window.fbq === "function") {
        window.fbq("consent", "revoke");
      }
    }
  }, [consent.marketing]);

  return null;
}
