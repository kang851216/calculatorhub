'use client';

import { useState, useRef, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Language } from '@/lib/types';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
  { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

export default function LanguageSelector() {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = languages.find(l => l.code === locale) || languages[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 rounded-lg transition-colors hover:bg-[var(--button-bg)] active:scale-95"
        aria-label={t('language.select')}
        title={t('language.select')}
      >
        <Languages className="w-4 h-4 text-[var(--text-primary)]" />
        <span className="text-xs font-medium text-[var(--text-primary)] hidden sm:inline">
          {current.flag}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 py-1 rounded-xl bg-[var(--bg-primary)] border border-[var(--button-bg)] shadow-xl z-50">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                locale === lang.code
                  ? 'text-[var(--accent)] bg-[var(--accent)]/5 font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--button-bg)]'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
