import { Metadata } from 'next';
import { getCalculatorMetadata } from '@/lib/seo';
import BMICalculatorClient from './client';

export const metadata: Metadata = getCalculatorMetadata('bmi');

export default function BMICalculatorPage() {
  return <BMICalculatorClient />;
}
