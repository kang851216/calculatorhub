'use client';

import UnitConverter from '@/components/calculators/UnitConverter';
import { useTranslation } from '@/contexts/LanguageContext';

export default function UnitConverterClient() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {t('page.unitConverter.title')}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {t('page.unitConverter.desc')}
        </p>
      </div>
      <UnitConverter />
    </div>
  );
}
