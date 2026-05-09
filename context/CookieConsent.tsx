"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextType = {
  consent: ConsentCategories;
  hasInteracted: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (analytics: boolean, marketing: boolean) => void;
};

const STORAGE_KEY = "taos-cookie-consent-v2";

const defaultConsent: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(
  null
);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentCategories>(defaultConsent);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentCategories;
        setConsent({ ...defaultConsent, ...parsed, necessary: true });
        setHasInteracted(true);
      }
    } catch {
      // ignore — treat as no prior interaction
    }
  }, []);

  const persist = useCallback((next: ConsentCategories) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    setConsent(next);
    setHasInteracted(true);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, marketing: true });
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ necessary: true, analytics: false, marketing: false });
  }, [persist]);

  const savePreferences = useCallback(
    (analytics: boolean, marketing: boolean) => {
      persist({ necessary: true, analytics, marketing });
    },
    [persist]
  );

  return (
    <CookieConsentContext.Provider
      value={{ consent, hasInteracted, acceptAll, rejectAll, savePreferences }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx)
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}
