'use client';

import { useState, useCallback, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useHistory } from '@/hooks/useHistory';
import { useTranslation } from '@/contexts/LanguageContext';
import { BasicOperator, calculateBasic, formatNumber } from '@/lib/calculators/basic';
import { CalculatorType } from '@/lib/types';

export default function BasicCalculator() {
  const { t } = useTranslation();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<BasicOperator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addEntry } = useHistory();

  const inputDigit = useCallback((digit: string) => {
    setError(null);
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(prev => prev === '0' ? digit : prev + digit);
    }
  }, [waitingForOperand]);

  const inputDecimal = useCallback(() => {
    setError(null);
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  }, [waitingForOperand, display]);

  const performOperation = useCallback((nextOperator: BasicOperator) => {
    setError(null);
    const current = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operator) {
      try {
        const result = calculateBasic(previousValue, operator, current);
        const formatted = formatNumber(result);
        setDisplay(formatted);
        setPreviousValue(result);
        setLastAnswer(result);

        addEntry({
          type: 'basic' as CalculatorType,
          expression: `${formatNumber(previousValue)} ${operator} ${formatNumber(current)}`,
          result: formatted,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error');
        setDisplay('Error');
        setPreviousValue(null);
        return;
      }
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [display, previousValue, operator, addEntry]);

  const calculate = useCallback(() => {
    setError(null);
    if (previousValue === null || operator === null) return;

    const current = parseFloat(display);
    
    try {
      const result = calculateBasic(previousValue, operator, current);
      const formatted = formatNumber(result);
      
      addEntry({
        type: 'basic' as CalculatorType,
        expression: `${formatNumber(previousValue)} ${operator} ${formatNumber(current)}`,
        result: formatted,
      });

      setDisplay(formatted);
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      setLastAnswer(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
      setDisplay('Error');
      setPreviousValue(null);
      setOperator(null);
    }
  }, [display, previousValue, operator, addEntry]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
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

  const toggleSign = useCallback(() => {
    setError(null);
    const value = parseFloat(display);
    const newValue = -value;
    setDisplay(formatNumber(newValue));
  }, [display]);

  const percent = useCallback(() => {
    setError(null);
    const value = parseFloat(display);
    const newValue = value / 100;
    setDisplay(formatNumber(newValue));
  }, [display]);

  const recallAnswer = useCallback(() => {
    if (lastAnswer !== null) {
      setDisplay(formatNumber(lastAnswer));
      setWaitingForOperand(true);
    }
  }, [lastAnswer]);

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
    '+': () => performOperation('+'),
    '-': () => performOperation('-'),
    '*': () => performOperation('×'),
    '/': () => performOperation('÷'),
    'Enter': () => calculate(),
    '=': () => calculate(),
    'Backspace': () => backspace(),
    'Escape': () => clear(),
    'Delete': () => clear(),
    '%': () => percent(),
  }), [inputDigit, inputDecimal, performOperation, calculate, backspace, clear, percent]);

  useKeyboard(keyboardBindings, true);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Display */}
      <div className="mb-4 p-4 sm:p-6 rounded-2xl bg-[var(--display-bg)] border border-[var(--button-bg)] min-h-[100px] sm:min-h-[120px] flex flex-col justify-end items-end overflow-hidden">
        {error ? (
          <div className="text-red-500 text-2xl font-semibold">{error}</div>
        ) : (
          <>
            <div className="text-sm text-[var(--text-secondary)] font-mono mb-1 truncate w-full text-right">
              {previousValue !== null && operator
                ? `${formatNumber(previousValue)} ${operator}`
                : '\u00A0'}
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] font-mono truncate w-full text-right tabular-nums">
              {display}
            </div>
          </>
        )}
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {/* Row 1 */}
        <Button variant="function" onClick={clear}>AC</Button>
        <Button variant="function" onClick={backspace}>⌫</Button>
        <Button variant="function" onClick={percent}>%</Button>
        <Button variant="operator" onClick={() => performOperation('÷')}>÷</Button>

        {/* Row 2 */}
        <Button variant="number" onClick={() => inputDigit('7')}>7</Button>
        <Button variant="number" onClick={() => inputDigit('8')}>8</Button>
        <Button variant="number" onClick={() => inputDigit('9')}>9</Button>
        <Button variant="operator" onClick={() => performOperation('×')}>×</Button>

        {/* Row 3 */}
        <Button variant="number" onClick={() => inputDigit('4')}>4</Button>
        <Button variant="number" onClick={() => inputDigit('5')}>5</Button>
        <Button variant="number" onClick={() => inputDigit('6')}>6</Button>
        <Button variant="operator" onClick={() => performOperation('-')}>−</Button>

        {/* Row 4 */}
        <Button variant="number" onClick={() => inputDigit('1')}>1</Button>
        <Button variant="number" onClick={() => inputDigit('2')}>2</Button>
        <Button variant="number" onClick={() => inputDigit('3')}>3</Button>
        <Button variant="operator" onClick={() => performOperation('+')}>+</Button>

        {/* Row 5 */}
        <Button variant="function" onClick={toggleSign}>±</Button>
        <Button variant="number" onClick={() => inputDigit('0')}>0</Button>
        <Button variant="number" onClick={inputDecimal}>.</Button>
        <Button variant="equals" onClick={calculate}>=</Button>
      </div>

      {/* Last Answer Recall */}
      {lastAnswer !== null && (
        <button
          onClick={recallAnswer}
          className="mt-3 w-full text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors py-2"
        >
          {t('basic.ans', { value: formatNumber(lastAnswer) })}
        </button>
      )}
    </div>
  );
}
