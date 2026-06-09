'use client';

import { useEffect } from 'react';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/locales';

function getPreferredLocale(): string {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const browserLang = navigator.language || '';

  // Exact match
  if (LOCALES.includes(browserLang as any)) return browserLang;

  // Match language without region (e.g., 'zh' → choose variant)
  if (browserLang.startsWith('zh')) {
    if (browserLang === 'zh-CN' || browserLang === 'zh-SG') return 'zh-CN';
    return 'zh-TW'; // Default Traditional Chinese
  }
  if (browserLang.startsWith('ko')) return 'ko';

  return DEFAULT_LOCALE;
}

export default function RootRedirect() {
  useEffect(() => {
    const locale = getPreferredLocale();
    window.location.replace(`/${locale}`);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-[var(--text-secondary)] text-sm">Redirecting...</p>
        <div className="mt-4 flex gap-3 justify-center">
          {LOCALES.map(locale => (
            <a
              key={locale}
              href={`/${locale}`}
              className="text-sm text-[var(--accent)] hover:underline"
            >
              {locale === 'en' ? 'English' :
               locale === 'zh-TW' ? '繁體中文' :
               locale === 'zh-CN' ? '简体中文' :
               '한국어'}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
