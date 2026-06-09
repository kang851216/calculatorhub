import { Metadata } from 'next';
import { getCalculatorMetadata } from '@/lib/seo';
import UnitConverterClient from './client';

export const metadata: Metadata = getCalculatorMetadata('unit-converter');

export default function UnitConverterPage() {
  return <UnitConverterClient />;
}
