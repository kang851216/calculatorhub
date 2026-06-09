import { MetadataRoute } from 'next';
import { LOCALES, SITE_URL } from '@/lib/i18n/locales';
import { CalculatorType } from '@/lib/types';
import { CALCULATOR_INFO } from '@/lib/constants';

const CALCULATOR_TYPES = Object.keys(CALCULATOR_INFO) as CalculatorType[];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    // Homepage for each locale
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Calculator pages for each locale
    for (const type of CALCULATOR_TYPES) {
      entries.push({
        url: `${SITE_URL}/${locale}/${type}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
