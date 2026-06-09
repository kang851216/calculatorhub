'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/contexts/LanguageContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { t } = useTranslation();

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder to prevent layout shift
  }

  const label = theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight');

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors hover:bg-[var(--button-bg)] active:scale-95"
      aria-label={label}
      title={label}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-[var(--text-primary)]" />
      ) : (
        <Sun className="w-5 h-5 text-[var(--text-primary)]" />
      )}
    </button>
  );
}
