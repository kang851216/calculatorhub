import { Metadata } from 'next';
import { LOCALES } from '@/lib/i18n/locales';
import { getLocalizedCalculatorMetadata } from '@/lib/seo';
import BMICalculatorClient from '../../bmi/client';

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedCalculatorMetadata('bmi', locale);
}

export default async function BMICalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return <BMICalculatorClient />;
}
