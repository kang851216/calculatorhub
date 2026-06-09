import { BMIResult } from '../types';

export function calculateBMI(
  weight: number,
  height: number,
  isMetric: boolean
): BMIResult {
  let bmi: number;

  if (isMetric) {
    // weight in kg, height in cm
    bmi = weight / Math.pow(height / 100, 2);
  } else {
    // weight in lb, height in inches
    bmi = (weight / Math.pow(height, 2)) * 703;
  }

  bmi = Math.round(bmi * 10) / 10;

  let category: string;
  let color: string;

  if (bmi < 16) {
    category = 'Severe Thinness';
    color = '#64748b';
  } else if (bmi < 17) {
    category = 'Moderate Thinness';
    color = '#94a3b8';
  } else if (bmi < 18.5) {
    category = 'Mild Thinness';
    color = '#cbd5e1';
  } else if (bmi < 25) {
    category = 'Normal Weight';
    color = '#22c55e';
  } else if (bmi < 30) {
    category = 'Overweight';
    color = '#eab308';
  } else if (bmi < 35) {
    category = 'Obese Class I';
    color = '#f97316';
  } else if (bmi < 40) {
    category = 'Obese Class II';
    color = '#ef4444';
  } else {
    category = 'Obese Class III';
    color = '#dc2626';
  }

  return { bmi, category, color };
}

export function getBMIRangePosition(bmi: number): number {
  // Returns position as percentage (0-100) for the gauge
  const minBMI = 10;
  const maxBMI = 45;
  const clamped = Math.max(minBMI, Math.min(maxBMI, bmi));
  return ((clamped - minBMI) / (maxBMI - minBMI)) * 100;
}
