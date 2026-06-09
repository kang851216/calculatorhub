import { CurrencyRate } from '../types';
import { CURRENCY_API_URL } from '../constants';

export async function fetchExchangeRates(base: string = 'USD'): Promise<CurrencyRate> {
  const response = await fetch(`${CURRENCY_API_URL}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch exchange rates');
  }
  
  const data = await response.json();
  
  return {
    base: data.base_code,
    rates: data.rates,
    updated: data.time_last_update_utc,
  };
}

export function convertCurrency(
  amount: number,
  fromRate: number,
  toRate: number
): number {
  if (fromRate === 0) return 0;
  const baseAmount = amount / fromRate;
  return baseAmount * toRate;
}

export function formatCurrency(amount: number, code: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
