import { Metadata } from 'next';
import { getCalculatorMetadata } from '@/lib/seo';
import ScientificCalculatorClient from './client';

export const metadata: Metadata = getCalculatorMetadata('scientific');

export default function ScientificCalculatorPage() {
  return <ScientificCalculatorClient />;
}
