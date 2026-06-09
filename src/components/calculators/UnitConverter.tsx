'use client';

import { useState, useCallback } from 'react';
import { UNIT_CATEGORIES, convertUnit } from '@/lib/calculators/unit';
import { UnitCategory, Unit } from '@/lib/types';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/contexts/LanguageContext';

export default function UnitConverter() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<UnitCategory>(UNIT_CATEGORIES[0]);
  const [fromUnit, setFromUnit] = useState<Unit>(UNIT_CATEGORIES[0].units[0]);
  const [toUnit, setToUnit] = useState<Unit>(UNIT_CATEGORIES[0].units[1]);
  const [inputValue, setInputValue] = useState('1');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = useCallback(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;
    
    const converted = convertUnit(value, fromUnit, toUnit, activeCategory.id);
    setResult(converted);
  }, [inputValue, fromUnit, toUnit, activeCategory.id]);

  const handleCategoryChange = useCallback((category: UnitCategory) => {
    setActiveCategory(category);
    setFromUnit(category.units[0]);
    setToUnit(category.units[1]);
    setResult(null);
  }, []);

  const swapUnits = useCallback(() => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      setResult(convertUnit(value, toUnit, temp, activeCategory.id));
    }
  }, [fromUnit, toUnit, inputValue, activeCategory.id]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^-?\d*\.?\d*$/.test(val)) {
      setInputValue(val);
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {UNIT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              activeCategory.id === cat.id
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--button-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t(`unit.${cat.id}`)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* Input */}
        <div className="p-4 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">{t('unit.from')}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-mono outline-none tabular-nums"
              placeholder={t('unit.enterValue')}
            />
            <select
              value={fromUnit.id}
              onChange={(e) => {
                const unit = activeCategory.units.find(u => u.id === e.target.value);
                if (unit) setFromUnit(unit);
              }}
              className="px-3 py-1 rounded-lg bg-[var(--button-bg)] text-[var(--text-primary)] text-sm font-medium outline-none cursor-pointer"
            >
              {activeCategory.units.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">
            {fromUnit.name}
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="p-2 rounded-full bg-[var(--button-bg)] hover:bg-[var(--button-hover)] transition-colors active:scale-95"
            aria-label={t('unit.swapUnits')}
          >
            <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* Result */}
        <div className="p-4 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">{t('unit.to')}</label>
          <div className="flex gap-2">
            <div className="flex-1 text-2xl sm:text-3xl font-bold text-[var(--accent)] font-mono tabular-nums">
              {result !== null ? result.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 10,
              }) : '—'}
            </div>
            <select
              value={toUnit.id}
              onChange={(e) => {
                const unit = activeCategory.units.find(u => u.id === e.target.value);
                if (unit) setToUnit(unit);
              }}
              className="px-3 py-1 rounded-lg bg-[var(--button-bg)] text-[var(--text-primary)] text-sm font-medium outline-none cursor-pointer"
            >
              {activeCategory.units.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">
            {toUnit.name}
          </div>
        </div>

        {/* Convert Button */}
        <Button
          variant="equals"
          className="w-full"
          onClick={handleConvert}
        >
          {t('unit.convert')}
        </Button>
      </div>
    </div>
  );
}
