import { Metadata } from 'next';
import { getCalculatorMetadata } from '@/lib/seo';
import DateCalculatorClient from './client';

export const metadata: Metadata = getCalculatorMetadata('date');

export default function DateCalculatorPage() {
  return <DateCalculatorClient />;
}
