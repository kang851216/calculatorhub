'use client';

import ScientificCalculator from '@/components/calculators/ScientificCalculator';
import { useTranslation } from '@/contexts/LanguageContext';

export default function ScientificCalculatorClient() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {t('page.scientific.title')}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {t('page.scientific.desc')}
        </p>
      </div>
      <ScientificCalculator />
    </div>
  );
}
