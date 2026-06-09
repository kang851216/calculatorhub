'use client';

import { useTranslation } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="hidden md:block border-t border-[var(--button-bg)] bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <p>{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  );
}
