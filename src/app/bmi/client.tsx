'use client';

import BMICalculator from '@/components/calculators/BMICalculator';
import { useTranslation } from '@/contexts/LanguageContext';

export default function BMICalculatorClient() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {t('page.bmi.title')}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {t('page.bmi.desc')}
        </p>
      </div>
      <BMICalculator />
    </div>
  );
}
