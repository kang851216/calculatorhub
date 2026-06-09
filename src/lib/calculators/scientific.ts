export function sin(angle: number, isDegree: boolean = true): number {
  return Math.sin(isDegree ? toRadians(angle) : angle);
}

export function cos(angle: number, isDegree: boolean = true): number {
  return Math.cos(isDegree ? toRadians(angle) : angle);
}

export function tan(angle: number, isDegree: boolean = true): number {
  return Math.tan(isDegree ? toRadians(angle) : angle);
}

export function asin(val: number): number {
  return toDegrees(Math.asin(val));
}

export function acos(val: number): number {
  return toDegrees(Math.acos(val));
}

export function atan(val: number): number {
  return toDegrees(Math.atan(val));
}

export function log(val: number): number {
  return Math.log10(val);
}

export function ln(val: number): number {
  return Math.log(val);
}

export function sqrt(val: number): number {
  return Math.sqrt(val);
}

export function cbrt(val: number): number {
  return Math.cbrt(val);
}

export function pow(base: number, exp: number): number {
  return Math.pow(base, exp);
}

export function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (!Number.isInteger(n)) return gamma(n + 1);
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function gamma(n: number): number {
  // Stirling's approximation for factorial of non-integers
  if (n < 0.5) {
    return Math.PI / (Math.sin(Math.PI * n) * gamma(1 - n));
  }
  n -= 1;
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
  ];
  let x = c[0];
  for (let i = 1; i < g + 2; i++) {
    x += c[i] / (n + i);
  }
  const t = n + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
}

export function toRadians(deg: number): number {
  return deg * (Math.PI / 180);
}

export function toDegrees(rad: number): number {
  return rad * (180 / Math.PI);
}

export const SCIENTIFIC_CONSTANTS = {
  π: Math.PI,
  e: Math.E,
};

export function formatScientific(num: number): string {
  if (!isFinite(num)) return 'Error';
  if (isNaN(num)) return 'Error';
  
  if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
    return num.toExponential(6);
  }
  
  const str = num.toPrecision(10);
  // Remove trailing zeros
  return parseFloat(str).toString();
}
