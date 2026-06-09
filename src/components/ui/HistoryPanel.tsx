'use client';

import { X, Trash2, Clock } from 'lucide-react';
import { HistoryEntry, CalculatorType } from '@/lib/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { formatShortDate } from '@/lib/calculators/date';

interface HistoryPanelProps {
  history: HistoryEntry[];
  type?: CalculatorType;
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  onClearType: (type: CalculatorType) => void;
}

export default function HistoryPanel({
  history,
  type,
  isOpen,
  onClose,
  onClear,
  onClearType,
}: HistoryPanelProps) {
  const { t } = useTranslation();
  const filtered = type ? history.filter(e => e.type === type) : history;
  const typeName = type ? t(`calcInfo.${type}.title`) : t('history.all');

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed md:sticky top-0 right-0 h-full w-80 md:w-72 bg-[var(--bg-primary)] border-l border-[var(--button-bg)] z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full md:hidden'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--button-bg)]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
              <h2 className="font-semibold text-[var(--text-primary)]">{t('history.title')}</h2>
            </div>
            <div className="flex items-center gap-2">
              {type && (
                <button
                  onClick={() => onClearType(type)}
                  className="p-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--button-bg)] transition-colors"
                  title={t('history.clearType')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClear}
                className="p-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--button-bg)] transition-colors"
                title={t('history.clearAll')}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-[var(--button-bg)] transition-colors md:hidden"
              >
                <X className="w-4 h-4 text-[var(--text-primary)]" />
              </button>
            </div>
          </div>

          {/* Filter indicator */}
          {type && (
            <div className="px-4 py-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)]">
              {t('history.showing', { type: typeName })}
            </div>
          )}

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[var(--text-secondary)] p-4">
                <Clock className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">{t('history.noHistory')}</p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--button-bg)]">
                {filtered.map(entry => (
                  <div key={entry.id} className="p-4 hover:bg-[var(--bg-secondary)] transition-colors">
                    <div className="text-xs text-[var(--text-secondary)] mb-1">
                      {formatShortDate(new Date(entry.timestamp))}
                    </div>
                    <div className="text-sm text-[var(--text-secondary)] font-mono">
                      {entry.expression}
                    </div>
                    <div className="text-lg font-semibold text-[var(--text-primary)] font-mono">
                      = {entry.result}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
