import { Metadata } from 'next';
import { getCalculatorMetadata } from '@/lib/seo';
import BasicCalculatorClient from './client';

export const metadata: Metadata = getCalculatorMetadata('basic');

export default function BasicCalculatorPage() {
  return <BasicCalculatorClient />;
}
