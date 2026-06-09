import { ReactNode } from 'react';
import { Metadata } from 'next';
import { LOCALES, LOCALE_CONFIG, SITE_URL } from '@/lib/i18n/locales';
import { getLocalizedHomeMetadata } from '@/lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as keyof typeof LOCALE_CONFIG;

  return getLocalizedHomeMetadata(locale);
}

export default function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
