'use client';

import { useState, useCallback } from 'react';
import Button from '@/components/ui/Button';
import { calculateDateDifference, addDays, formatDate } from '@/lib/calculators/date';
import { DateDifference } from '@/lib/calculators/date';
import { useTranslation } from '@/contexts/LanguageContext';

type Mode = 'difference' | 'add-subtract';

export default function DateCalculator() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>('difference');
  const [date1, setDate1] = useState(new Date().toISOString().split('T')[0]);
  const [date2, setDate2] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [addDaysCount, setAddDaysCount] = useState('7');
  const [addDirection, setAddDirection] = useState<'add' | 'subtract'>('add');
  const [baseDate, setBaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [difference, setDifference] = useState<DateDifference | null>(null);
  const [addResult, setAddResult] = useState<Date | null>(null);

  const handleCalculateDiff = useCallback(() => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return;
    
    const diff = calculateDateDifference(d1, d2);
    setDifference(diff);
  }, [date1, date2]);

  const handleAddSubtract = useCallback(() => {
    const base = new Date(baseDate);
    const days = parseInt(addDaysCount);
    if (isNaN(base.getTime()) || isNaN(days)) return;

    const result = addDirection === 'add' ? addDays(base, days) : addDays(base, -days);
    setAddResult(result);
  }, [baseDate, addDaysCount, addDirection]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Mode Tabs */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-xl bg-[var(--button-bg)] p-1">
          <button
            onClick={() => setMode('difference')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              mode === 'difference'
                ? 'bg-[var(--accent)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t('date.dateDifference')}
          </button>
          <button
            onClick={() => setMode('add-subtract')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              mode === 'add-subtract'
                ? 'bg-[var(--accent)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t('date.addSubtract')}
          </button>
        </div>
      </div>

      {mode === 'difference' ? (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">{t('date.startDate')}</label>
            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full bg-transparent text-lg sm:text-xl font-semibold text-[var(--text-primary)] outline-none cursor-pointer [color-scheme:var(--color-scheme)]"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">{t('date.endDate')}</label>
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full bg-transparent text-lg sm:text-xl font-semibold text-[var(--text-primary)] outline-none cursor-pointer [color-scheme:var(--color-scheme)]"
            />
          </div>

          <Button variant="equals" className="w-full" onClick={handleCalculateDiff}>
            {t('date.calculateDiff')}
          </Button>

          {difference && (
            <div className="p-5 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)] space-y-3">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[var(--accent)]">
                  {difference.years}y {difference.months}m {difference.days}d
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
                  <div className="text-lg font-bold text-[var(--text-primary)]">{difference.totalDays.toLocaleString()}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{t('date.totalDays')}</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
                  <div className="text-lg font-bold text-[var(--text-primary)]">{difference.totalWeeks.toLocaleString()}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{t('date.totalWeeks')}</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
                  <div className="text-lg font-bold text-[var(--text-primary)]">{difference.totalMonths.toLocaleString()}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{t('date.totalMonths')}</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
                  <div className="text-lg font-bold text-[var(--text-primary)]">{difference.totalYears.toLocaleString()}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{t('date.totalYears')}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">{t('date.startDate')}</label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full bg-transparent text-lg sm:text-xl font-semibold text-[var(--text-primary)] outline-none cursor-pointer [color-scheme:var(--color-scheme)]"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">
              {addDirection === 'add' ? t('date.daysToAdd') : t('date.daysToSubtract')}
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={addDaysCount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^\d*$/.test(val)) setAddDaysCount(val);
                }}
                className="flex-1 bg-transparent text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-mono outline-none tabular-nums"
                placeholder={t('date.enterDays')}
              />
              <button
                onClick={() => setAddDirection(prev => prev === 'add' ? 'subtract' : 'add')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  addDirection === 'add'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {addDirection === 'add' ? '+' : '−'}
              </button>
            </div>
          </div>

          <Button variant="equals" className="w-full" onClick={handleAddSubtract}>
            {t('date.calculate')}
          </Button>

          {addResult && (
            <div className="p-5 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
              <div className="text-xs text-[var(--text-secondary)] mb-1 text-center">
                {addDirection === 'add' 
                  ? t('date.afterAdding', { days: addDaysCount })
                  : t('date.afterSubtracting', { days: addDaysCount })}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)] text-center">
                {formatDate(addResult)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
