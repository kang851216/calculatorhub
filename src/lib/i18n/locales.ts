import { Language } from '@/lib/types';

export const LOCALES: Language[] = ['en', 'zh-TW', 'zh-CN', 'ko'];

export const LOCALE_CONFIG: Record<Language, { lang: string; label: string; hrefLang: string }> = {
  'en':    { lang: 'en',      label: 'English',     hrefLang: 'en' },
  'zh-TW': { lang: 'zh-Hant', label: '繁體中文',    hrefLang: 'zh-TW' },
  'zh-CN': { lang: 'zh-Hans', label: '简体中文',    hrefLang: 'zh-CN' },
  'ko':    { lang: 'ko',      label: '한국어',       hrefLang: 'ko' },
};

export const DEFAULT_LOCALE: Language = 'en';
export const SITE_URL = 'https://calculator-hub.pages.dev';

export function isValidLocale(locale: string): locale is Language {
  return LOCALES.includes(locale as Language);
}
