export type CalculatorType =
  | 'basic'
  | 'scientific'
  | 'unit-converter'
  | 'currency'
  | 'bmi'
  | 'date';

export interface HistoryEntry {
  id: string;
  type: CalculatorType;
  expression: string;
  result: string;
  timestamp: number;
}

export interface UnitCategory {
  id: string;
  name: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface CurrencyRate {
  base: string;
  rates: Record<string, number>;
  updated: string;
}

export interface BMIResult {
  bmi: number;
  category: string;
  color: string;
}

export type Theme = 'light' | 'dark';

export type Language = 'en' | 'zh-TW' | 'zh-CN' | 'ko';
