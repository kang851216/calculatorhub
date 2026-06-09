'use client';

import { useState, useEffect, useCallback } from 'react';
import { HistoryEntry, CalculatorType } from '@/lib/types';
import { MAX_HISTORY_ENTRIES } from '@/lib/constants';

const STORAGE_KEY = 'calculator-history';

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const addEntry = useCallback((entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      timestamp: Date.now(),
    };

    setHistory(prev => {
      const updated = [newEntry, ...prev].slice(0, MAX_HISTORY_ENTRIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const clearTypeHistory = useCallback((type: CalculatorType) => {
    setHistory(prev => {
      const updated = prev.filter(e => e.type !== type);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getFilteredHistory = useCallback((type?: CalculatorType) => {
    if (!type) return history;
    return history.filter(e => e.type === type);
  }, [history]);

  return {
    history,
    addEntry,
    clearHistory,
    clearTypeHistory,
    getFilteredHistory,
    isOpen,
    setIsOpen,
  };
}
