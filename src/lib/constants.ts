import { CalculatorType } from './types';

export const CALCULATOR_INFO: Record<CalculatorType, {
  title: string;
  description: string;
  longDescription: string;
  icon: string;
}> = {
  'basic': {
    title: 'Basic Calculator',
    description: 'Perform basic arithmetic operations',
    longDescription: 'A simple yet powerful calculator for addition, subtraction, multiplication, division, and percentage calculations.',
    icon: 'Calculator',
  },
  'scientific': {
    title: 'Scientific Calculator',
    description: 'Advanced mathematical functions',
    longDescription: 'Trigonometry, logarithms, exponents, and more for complex mathematical computations.',
    icon: 'Sigma',
  },
  'unit-converter': {
    title: 'Unit Converter',
    description: 'Convert between different units',
    longDescription: 'Easily convert length, mass, temperature, volume, and area units with accurate formulas.',
    icon: 'ArrowLeftRight',
  },
  'currency': {
    title: 'Currency Converter',
    description: 'Live currency exchange rates',
    longDescription: 'Convert between world currencies using real-time exchange rates. Supports 30+ currencies.',
    icon: 'DollarSign',
  },
  'bmi': {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    longDescription: 'Check your Body Mass Index and discover your weight category with our easy-to-use BMI calculator.',
    icon: 'Heart',
  },
  'date': {
    title: 'Date Calculator',
    description: 'Calculate date differences',
    longDescription: 'Find the duration between two dates, add or subtract days, and calculate age easily.',
    icon: 'Calendar',
  },
};

export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
  { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
  { code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
  { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩' },
  { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾' },
  { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },
  { code: 'ILS', name: 'Israeli Shekel', flag: '🇮🇱' },
  { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'ARS', name: 'Argentine Peso', flag: '🇦🇷' },
];

export const CURRENCY_API_URL = 'https://open.er-api.com/v6/latest/USD';

export const MAX_HISTORY_ENTRIES = 100;
