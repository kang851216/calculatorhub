'use client';

import BasicCalculator from '@/components/calculators/BasicCalculator';
import { useTranslation } from '@/contexts/LanguageContext';

export default function BasicCalculatorClient() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {t('page.basic.title')}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {t('page.basic.desc')}
        </p>
      </div>
      <BasicCalculator />
    </div>
  );
}
