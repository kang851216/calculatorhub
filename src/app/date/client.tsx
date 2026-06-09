'use client';

import DateCalculator from '@/components/calculators/DateCalculator';
import { useTranslation } from '@/contexts/LanguageContext';

export default function DateCalculatorClient() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {t('page.date.title')}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {t('page.date.desc')}
        </p>
      </div>
      <DateCalculator />
    </div>
  );
}
