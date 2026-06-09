import { Metadata } from 'next';
import { LOCALES } from '@/lib/i18n/locales';
import { getLocalizedCalculatorMetadata } from '@/lib/seo';
import BasicCalculatorClient from '../../basic/client';

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedCalculatorMetadata('basic', locale);
}

export default async function BasicCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return <BasicCalculatorClient />;
}
