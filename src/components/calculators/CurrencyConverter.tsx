'use client';

import { useState, useCallback, useEffect } from 'react';
import { CURRENCIES } from '@/lib/constants';
import { fetchExchangeRates, convertCurrency, formatCurrency } from '@/lib/calculators/currency';
import { CurrencyRate } from '@/lib/types';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/contexts/LanguageContext';

export default function CurrencyConverter() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState<CurrencyRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    loadRates();
  }, []);

  const loadRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchExchangeRates();
      setRates(data);
    } catch {
      setError(t('currency.failedLoad'));
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = useCallback(() => {
    if (!rates || !rates.rates) return;
    const value = parseFloat(amount);
    if (isNaN(value)) return;

    const fromRate = rates.rates[fromCurrency];
    const toRate = rates.rates[toCurrency];

    if (!fromRate || !toRate) {
      setError(t('currency.rateNotAvailable'));
      return;
    }

    const converted = convertCurrency(value, fromRate, toRate);
    setResult(converted);
  }, [amount, fromCurrency, toCurrency, rates, t]);

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const doConvert = useCallback(() => {
    if (!rates || !rates.rates) return;
    const value = parseFloat(amount);
    if (isNaN(value)) {
      setResult(null);
      return;
    }

    const fromRate = rates.rates[fromCurrency];
    const toRate = rates.rates[toCurrency];

    if (!fromRate || !toRate) {
      setError(t('currency.rateNotAvailable'));
      return;
    }

    const converted = convertCurrency(value, fromRate, toRate);
    setResult(converted);
  }, [amount, fromCurrency, toCurrency, rates, t]);

  // Auto-convert when amount, currencies, or rates change
  useEffect(() => {
    if (rates && rates.rates) {
      doConvert();
    }
  }, [doConvert, rates]);

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAmount(val);
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Last Updated */}
      {rates && (
        <div className="text-xs text-[var(--text-secondary)] mb-3 text-center">
          {t('currency.ratesUpdated', { date: rates.updated || 'N/A' })}
          <button
            onClick={loadRates}
            className="ml-2 text-[var(--accent)] hover:underline"
            disabled={loading}
          >
            {loading ? t('currency.refreshing') : t('currency.refresh')}
          </button>
        </div>
      )}

      {error && (
        <div className="mb-3 p-3 rounded-xl bg-red-500/10 text-red-500 text-sm text-center">
          {error}
          <button onClick={loadRates} className="ml-2 underline">{t('currency.retry')}</button>
        </div>
      )}

      <div className="space-y-4">
        {/* Amount Input */}
        <div className="p-4 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">{t('currency.amount')}</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="flex-1 bg-transparent text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-mono outline-none tabular-nums"
              placeholder={t('currency.enterAmount')}
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[var(--button-bg)] text-[var(--text-primary)] text-sm font-medium outline-none cursor-pointer"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">
            {CURRENCIES.find(c => c.code === fromCurrency)?.name}
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="p-2 rounded-full bg-[var(--button-bg)] hover:bg-[var(--button-hover)] transition-colors active:scale-95"
            aria-label={t('currency.swapCurrencies')}
          >
            <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* Result */}
        <div className="p-4 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)]">
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">{t('currency.convertedTo')}</label>
          <div className="flex gap-2 items-center">
            <div className="flex-1 text-2xl sm:text-3xl font-bold text-[var(--accent)] font-mono tabular-nums">
              {loading ? (
                <span className="text-[var(--text-secondary)]">{t('currency.loading')}</span>
              ) : result !== null ? (
                formatCurrency(result, toCurrency)
              ) : (
                '—'
              )}
            </div>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[var(--button-bg)] text-[var(--text-primary)] text-sm font-medium outline-none cursor-pointer"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">
            {CURRENCIES.find(c => c.code === toCurrency)?.name}
          </div>
        </div>

        {/* Convert Button (manual override if auto-convert hasn't fired) */}
        <Button
          variant="equals"
          className="w-full"
          onClick={handleConvert}
          disabled={loading || !!error}
        >
          {loading ? t('currency.loadingRates') : result !== null ? t('currency.refresh') : t('currency.convert')}
        </Button>

        {/* Exchange Rate Info */}
        {rates && rates.rates[fromCurrency] && rates.rates[toCurrency] && (
          <div className="text-xs text-[var(--text-secondary)] text-center">
            1 {fromCurrency} = {(rates.rates[toCurrency] / rates.rates[fromCurrency]).toFixed(6)} {toCurrency}
          </div>
        )}
      </div>
    </div>
  );
}
