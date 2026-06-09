'use client';

import { useState, useCallback, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { calculateBMI, getBMIRangePosition } from '@/lib/calculators/bmi';
import { BMIResult } from '@/lib/types';
import { useTranslation } from '@/contexts/LanguageContext';

const categoryKeyMap: Record<string, string> = {
  'Severe Thinness': 'bmi.severeThinness',
  'Moderate Thinness': 'bmi.moderateThinness',
  'Mild Thinness': 'bmi.mildThinness',
  'Underweight': 'bmi.underweight',
  'Normal Weight': 'bmi.normalWeight',
  'Overweight': 'bmi.overweight',
  'Obese Class I': 'bmi.obeseClass1',
  'Obese Class II': 'bmi.obeseClass2',
  'Obese Class III': 'bmi.obeseClass3',
};

export default function BMICalculator() {
  const { t } = useTranslation();
  const [isMetric, setIsMetric] = useState(true);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const handleCalculate = useCallback(() => {
    let w: number, h: number;

    if (isMetric) {
      w = parseFloat(weight);
      h = parseFloat(height);
    } else {
      w = parseFloat(weight);
      const ft = parseFloat(heightFt) || 0;
      const inc = parseFloat(heightIn) || 0;
      h = ft * 12 + inc;
    }

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    const bmiResult = calculateBMI(w, h, isMetric);
    setResult(bmiResult);
  }, [weight, height, heightFt, heightIn, isMetric]);

  const gaugePosition = useMemo(() => {
    if (!result) return 0;
    const pos = getBMIRangePosition(result.bmi);
    // Clamp between 5% and 95% to prevent marker clipping at edges
    return Math.max(5, Math.min(95, pos));
  }, [result]);

  const handleWeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setWeight(val);
    }
  }, []);

  const handleHeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setHeight(val);
    }
  }, []);

  const clear = useCallback(() => {
    setWeight('');
    setHeight('');
    setHeightFt('');
    setHeightIn('');
    setResult(null);
  }, []);

  const translatedCategory = result ? (t(categoryKeyMap[result.category] || result.category)) : '';

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Unit Toggle */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-xl bg-[var(--button-bg)] p-1">
          <button
            onClick={() => setIsMetric(true)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              isMetric
                ? 'bg-[var(--accent)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t('bmi.metric')}
          </button>
          <button
            onClick={() => setIsMetric(false)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              !isMetric
                ? 'bg-[var(--accent)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t('bmi.imperial')}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Weight Input */}
        <div className="p-4 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">
            {t('bmi.weight', { unit: isMetric ? 'kg' : 'lb' })}
          </label>
          <input
            type="text"
            value={weight}
            onChange={handleWeightChange}
            className="w-full bg-transparent text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-mono outline-none tabular-nums"
            placeholder={t('bmi.enterWeight', { unit: isMetric ? 'kg' : 'lb' })}
          />
        </div>

        {/* Height Input */}
        <div className="p-4 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
          {isMetric ? (
            <>
              <label className="text-xs text-[var(--text-secondary)] mb-1 block">{t('bmi.height')}</label>
              <input
                type="text"
                value={height}
                onChange={handleHeightChange}
                className="w-full bg-transparent text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-mono outline-none tabular-nums"
                placeholder={t('bmi.enterHeight')}
              />
            </>
          ) : (
            <>
              <label className="text-xs text-[var(--text-secondary)] mb-1 block">{t('bmi.heightFeetInches')}</label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={heightFt}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) setHeightFt(val);
                    }}
                    className="w-full bg-transparent text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-mono outline-none tabular-nums"
                    placeholder={t('bmi.ft')}
                  />
                  <span className="text-xs text-[var(--text-secondary)]">{t('bmi.feet')}</span>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={heightIn}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) setHeightIn(val);
                    }}
                    className="w-full bg-transparent text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-mono outline-none tabular-nums"
                    placeholder={t('bmi.in')}
                  />
                  <span className="text-xs text-[var(--text-secondary)]">{t('bmi.inches')}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Calculate Button */}
        <div className="flex gap-2">
          <Button variant="equals" className="flex-1" onClick={handleCalculate}>
            {t('bmi.calculate')}
          </Button>
          <Button variant="function" onClick={clear}>
            {t('bmi.clear')}
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="p-6 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-2 tabular-nums">
                {result.bmi}
              </div>
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4"
                style={{ backgroundColor: result.color }}
              >
                {translatedCategory}
              </div>
            </div>

            {/* BMI Gauge */}
            <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 via-orange-400 to-red-500">
              <div
                className="absolute top-0 w-1 h-4 bg-white rounded-full shadow-lg transition-all duration-500"
                style={{ left: `${gaugePosition}%`, transform: 'translateX(-50%)' }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1">
              <span>16</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40+</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
