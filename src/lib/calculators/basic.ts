export type BasicOperator = '+' | '-' | '×' | '÷' | '%';

export function calculateBasic(a: number, operator: BasicOperator, b: number): number {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷':
      if (b === 0) throw new Error('Cannot divide by zero');
      return a / b;
    case '%': return a % b;
    default: throw new Error('Unknown operator');
  }
}

export function formatNumber(num: number, maxDigits: number = 12): string {
  if (!isFinite(num)) return 'Error';
  if (isNaN(num)) return 'Error';
  
  const str = String(num);
  if (str.length <= maxDigits) return str;
  
  return num.toExponential(6);
}

export function evaluateExpression(expression: string): number {
  // Safe evaluation of basic arithmetic expressions
  const sanitized = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-');
  
  // Allow only safe characters
  if (/[^0-9+\-*/.()% ]/g.test(sanitized)) {
    throw new Error('Invalid expression');
  }
  
  try {
    return Function(`'use strict'; return (${sanitized})`)();
  } catch {
    throw new Error('Invalid expression');
  }
}
