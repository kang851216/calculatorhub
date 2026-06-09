'use client';

import CurrencyConverter from '@/components/calculators/CurrencyConverter';
import { useTranslation } from '@/contexts/LanguageContext';

export default function CurrencyConverterClient() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {t('page.currency.title')}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {t('page.currency.desc')}
        </p>
      </div>
      <CurrencyConverter />
    </div>
  );
}
