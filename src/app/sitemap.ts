import { MetadataRoute } from 'next';
import { LOCALES, SITE_URL } from '@/lib/i18n/locales';
import { CalculatorType } from '@/lib/types';

export const dynamic = 'force-static';

const CALCULATOR_TYPES: CalculatorType[] = [
  'basic', 'scientific', 'unit-converter', 'currency', 'bmi', 'date',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // Home page for this locale
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    });

    // Calculator pages for this locale
    for (const type of CALCULATOR_TYPES) {
      entries.push({
        url: `${SITE_URL}/${locale}/${type}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    }
  }

  return entries;
}
