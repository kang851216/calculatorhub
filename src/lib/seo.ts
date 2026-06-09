import { Metadata } from 'next';
import { CalculatorType } from './types';
import { CALCULATOR_INFO } from './constants';

const SITE_NAME = 'CalculatorHub';
const SITE_URL = 'https://calculator-hub.pages.dev';
const DEFAULT_OG_IMAGE = '/og-image.png';

export function getCalculatorMetadata(type: CalculatorType): Metadata {
  const info = CALCULATOR_INFO[type];
  const path = `/${type}`;
  const title = `${info.title} - Free Online Calculator | ${SITE_NAME}`;
  const description = info.longDescription;

  return {
    title,
    description,
    openGraph: {
      title: `${info.title} - ${SITE_NAME}`,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${info.title} - ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
  };
}

export const homeMetadata: Metadata = {
  title: `${SITE_NAME} - Free Online Calculators: Basic, Scientific, Unit Converter & More`,
  description: 'Free online calculators for everyday use. Basic arithmetic, scientific functions, unit conversions, currency exchange rates, BMI, and date calculations. Fast, accurate, and mobile-friendly.',
  openGraph: {
    title: `${SITE_NAME} - Your All-in-One Online Calculator Suite`,
    description: 'Free online calculators for everyday use. Basic arithmetic, scientific functions, unit conversions, currency exchange rates, BMI, and date calculations.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Free Online Calculators`,
    description: 'Your all-in-one online calculator suite. Fast, accurate, and mobile-friendly.',
  },
  alternates: {
    canonical: SITE_URL,
  },
};
