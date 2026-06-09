'use client';

import { useState, useCallback, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useHistory } from '@/hooks/useHistory';
import { useTranslation } from '@/contexts/LanguageContext';
import {
  formatScientific,
  SCIENTIFIC_CONSTANTS,
  sin,
  cos,
  tan,
  log,
  ln,
  sqrt,
  factorial,
} from '@/lib/calculators/scientific';
import { CalculatorType } from '@/lib/types';

type SciOperation =
  | 'sin' | 'cos' | 'tan' | 'log' | 'ln' | 'sqrt'
  | 'square' | 'cube' | 'power' | 'factorial'
  | 'pi' | 'e' | 'inv' | 'paren-left' | 'paren-right';

export default function ScientificCalculator() {
  const { t } = useTranslation();
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [degreeMode, setDegreeMode] = useState(true);
  const { addEntry } = useHistory();

  const inputDigit = useCallback((digit: string) => {
    setError(null);
    setDisplay(prev => prev === '0' ? digit : prev + digit);
  }, []);

  const inputDecimal = useCallback(() => {
    setError(null);
    if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  }, [display]);

  const applyUnary = useCallback((op: SciOperation) => {
    setError(null);
    const value = parseFloat(display);
    let result: number;

    try {
      switch (op) {
        case 'sin':
          result = sin(value, degreeMode);
          break;
        case 'cos':
          result = cos(value, degreeMode);
          break;
        case 'tan':
          result = tan(value, degreeMode);
          break;
        case 'log':
          result = log(value);
          break;
        case 'ln':
          result = ln(value);
          break;
        case 'sqrt':
          result = sqrt(value);
          break;
        case 'square':
          result = value * value;
          break;
        case 'cube':
          result = value * value * value;
          break;
        case 'factorial':
          result = factorial(value);
          break;
        case 'inv':
          result = 1 / value;
          break;
        default:
          return;
      }

      const formatted = formatScientific(result);
      setDisplay(formatted);
      setLastResult(result);

      addEntry({
        type: 'scientific' as CalculatorType,
        expression: `${op}(${value})`,
        result: formatted,
      });
    } catch {
      setError(t('scientific.error'));
      setDisplay(t('scientific.error'));
    }
  }, [display, addEntry, degreeMode]);

  const insertConstant = useCallback((constant: 'pi' | 'e') => {
    setError(null);
    const value = constant === 'pi' ? SCIENTIFIC_CONSTANTS.π : SCIENTIFIC_CONSTANTS.e;
    setDisplay(formatScientific(value));
  }, []);

  const calculateResult = useCallback(() => {
    setError(null);
    try {
      let sanitized = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, String(SCIENTIFIC_CONSTANTS.π))
        .replace(/e(?![xp])/g, String(SCIENTIFIC_CONSTANTS.e));

      // Allow only safe characters (numbers, operators, parens, decimals, spaces)
      if (/[^0-9+\-*/.()% ]/g.test(sanitized)) {
        throw new Error('Invalid expression');
      }

      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${sanitized})`)();
      const formatted = formatScientific(result);
      
      addEntry({
        type: 'scientific' as CalculatorType,
        expression: expression || display,
        result: formatted,
      });

      setDisplay(formatted);
      setExpression('');
      setLastResult(result);
    } catch {
      setError(t('scientific.invalidExpression'));
      setDisplay(t('scientific.error'));
    }
  }, [expression, display, addEntry]);

  const clear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setError(null);
  }, []);

  const backspace = useCallback(() => {
    setError(null);
    if (display.length > 1) {
      setDisplay(prev => prev.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display]);

  const inputOperator = useCallback((op: string) => {
    setError(null);
    if (expression) {
      setExpression(prev => prev + display + ' ' + op + ' ');
    } else {
      setExpression(display + ' ' + op + ' ');
    }
    setDisplay('0');
  }, [expression, display]);

  const toggleDegreeMode = useCallback(() => {
    setDegreeMode(prev => !prev);
  }, []);

  const keyboardBindings = useMemo(() => ({
    '0': () => inputDigit('0'),
    '1': () => inputDigit('1'),
    '2': () => inputDigit('2'),
    '3': () => inputDigit('3'),
    '4': () => inputDigit('4'),
    '5': () => inputDigit('5'),
    '6': () => inputDigit('6'),
    '7': () => inputDigit('7'),
    '8': () => inputDigit('8'),
    '9': () => inputDigit('9'),
    '.': () => inputDecimal(),
    '+': () => inputOperator('+'),
    '-': () => inputOperator('-'),
    '*': () => inputOperator('×'),
    '/': () => inputOperator('÷'),
    'Enter': () => calculateResult(),
    '=': () => calculateResult(),
    'Backspace': () => backspace(),
    'Escape': () => clear(),
  }), [inputDigit, inputDecimal, inputOperator, calculateResult, backspace, clear]);

  useKeyboard(keyboardBindings, true);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Display */}
      <div className="mb-4 p-4 sm:p-6 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)] min-h-[100px] sm:min-h-[120px] flex flex-col justify-end items-end overflow-hidden">
        {error ? (
          <div className="text-red-500 text-2xl font-semibold">{error}</div>
        ) : (
          <>
            <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono mb-1 truncate w-full text-right">
              {expression || '\u00A0'}
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] font-mono truncate w-full text-right tabular-nums">
              {display}
            </div>
          </>
        )}
      </div>

      {/* Mode Indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDegreeMode}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
              degreeMode
                ? 'bg-blue-500 text-white'
                : 'bg-[var(--button-bg)] text-[var(--text-secondary)]'
            }`}
          >
            {t('scientific.deg')}
          </button>
          <span className="text-xs text-[var(--text-secondary)]">{t('scientific.rad')}</span>
        </div>
        {lastResult !== null && (
          <span className="text-xs text-[var(--text-secondary)]">
            {t('scientific.ans', { value: formatScientific(lastResult) })}
          </span>
        )}
      </div>

      {/* Scientific Buttons */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-2">
        <Button variant="function" size="sm" onClick={() => applyUnary('sin')}>sin</Button>
        <Button variant="function" size="sm" onClick={() => applyUnary('cos')}>cos</Button>
        <Button variant="function" size="sm" onClick={() => applyUnary('tan')}>tan</Button>
        <Button variant="function" size="sm" onClick={() => inputOperator('^')}>x<sup>y</sup></Button>
        <Button variant="function" size="sm" onClick={clear}>AC</Button>

        <Button variant="function" size="sm" onClick={() => applyUnary('log')}>log</Button>
        <Button variant="function" size="sm" onClick={() => applyUnary('ln')}>ln</Button>
        <Button variant="function" size="sm" onClick={() => applyUnary('sqrt')}>√</Button>
        <Button variant="function" size="sm" onClick={() => applyUnary('square')}>x²</Button>
        <Button variant="function" size="sm" onClick={backspace}>⌫</Button>

        <Button variant="function" size="sm" onClick={() => insertConstant('pi')}>π</Button>
        <Button variant="function" size="sm" onClick={() => insertConstant('e')}>e</Button>
        <Button variant="function" size="sm" onClick={() => applyUnary('factorial')}>x!</Button>
        <Button variant="function" size="sm" onClick={() => applyUnary('inv')}>1/x</Button>
        <Button variant="function" size="sm" onClick={() => applyUnary('cube')}>x³</Button>
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <Button variant="number" onClick={() => inputDigit('7')}>7</Button>
        <Button variant="number" onClick={() => inputDigit('8')}>8</Button>
        <Button variant="number" onClick={() => inputDigit('9')}>9</Button>
        <Button variant="operator" onClick={() => inputOperator('÷')}>÷</Button>

        <Button variant="number" onClick={() => inputDigit('4')}>4</Button>
        <Button variant="number" onClick={() => inputDigit('5')}>5</Button>
        <Button variant="number" onClick={() => inputDigit('6')}>6</Button>
        <Button variant="operator" onClick={() => inputOperator('×')}>×</Button>

        <Button variant="number" onClick={() => inputDigit('1')}>1</Button>
        <Button variant="number" onClick={() => inputDigit('2')}>2</Button>
        <Button variant="number" onClick={() => inputDigit('3')}>3</Button>
        <Button variant="operator" onClick={() => inputOperator('-')}>−</Button>

        <Button variant="number" onClick={() => inputDigit('0')}>0</Button>
        <Button variant="number" onClick={inputDecimal}>.</Button>
        <Button variant="equals" onClick={calculateResult}>=</Button>
        <Button variant="operator" onClick={() => inputOperator('+')}>+</Button>
      </div>
    </div>
  );
}
