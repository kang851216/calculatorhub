import { Metadata } from 'next';
import { getCalculatorMetadata } from '@/lib/seo';
import CurrencyConverterClient from './client';

export const metadata: Metadata = getCalculatorMetadata('currency');

export default function CurrencyConverterPage() {
  return <CurrencyConverterClient />;
}
