'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language } from '@/lib/types';
import { translations } from '@/lib/i18n/translations';

interface LanguageContextType {
  locale: Language;
  setLocale: (locale: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'app-language';

function getInitialLocale(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && ['en', 'zh-TW', 'zh-CN', 'ko'].includes(stored)) {
      return stored;
    }
  }
  return 'en';
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const val = params[key];
    return val !== undefined ? String(val) : `{${key}}`;
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocaleState(getInitialLocale());
  }, []);

  const setLocale = useCallback((newLocale: Language) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.setAttribute('lang', newLocale);
    }
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const lang = translations[locale] as Record<string, string>;
      const fallback = (translations.en as Record<string, string>)[key];
      const text = lang[key] ?? fallback ?? key;
      return interpolate(text, params);
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
