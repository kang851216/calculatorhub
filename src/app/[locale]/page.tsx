'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import { CalculatorType } from '@/lib/types';
import { useTranslation } from '@/contexts/LanguageContext';
import {
  Calculator,
  Sigma,
  ArrowLeftRight,
  DollarSign,
  Heart,
  Calendar,
} from 'lucide-react';

const iconMap: Record<string, typeof Calculator> = {
  Calculator,
  Sigma,
  ArrowLeftRight,
  DollarSign,
  Heart,
  Calendar,
};

const types: CalculatorType[] = [
  'basic',
  'scientific',
  'unit-converter',
  'currency',
  'bmi',
  'date',
];

const featureKeys = [
  { labelKey: 'home.feature100Label', descKey: 'home.feature100Desc' },
  { labelKey: 'home.featureMobileLabel', descKey: 'home.featureMobileDesc' },
  { labelKey: 'home.featureDarkLabel', descKey: 'home.featureDarkDesc' },
  { labelKey: 'home.featureKeyboardLabel', descKey: 'home.featureKeyboardDesc' },
];

const iconKeys: Record<CalculatorType, string> = {
  'basic': 'Calculator',
  'scientific': 'Sigma',
  'unit-converter': 'ArrowLeftRight',
  'currency': 'DollarSign',
  'bmi': 'Heart',
  'date': 'Calendar',
};

export default function Home() {
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3">
          {t('home.title')}
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
          {t('home.subtitle')}
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {types.map(type => {
          const Icon = iconMap[iconKeys[type]] || Calculator;

          return (
            <Link key={type} href={`/${locale}/${type}`}>
              <Card hoverable className="p-5 sm:p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[var(--accent)]/10 shrink-0">
                    <Icon className="w-6 h-6 text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                      {t(`calcInfo.${type}.title`)}
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {t(`calcInfo.${type}.desc`)}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {featureKeys.map(feature => (
          <div
            key={feature.labelKey}
            className="text-center p-3 rounded-xl bg-[var(--bg-secondary)]"
          >
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              {t(feature.labelKey)}
            </div>
            <div className="text-xs text-[var(--text-secondary)] mt-0.5">
              {t(feature.descKey)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
