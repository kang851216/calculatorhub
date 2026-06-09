'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'operator' | 'number' | 'function' | 'equals' | 'clear' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  title?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-[var(--button-bg)] hover:bg-[var(--button-hover)] text-[var(--text-primary)]',
  operator: 'bg-orange-500 hover:bg-orange-600 text-white',
  number: 'bg-[var(--bg-secondary)] hover:bg-[var(--button-hover)] text-[var(--text-primary)]',
  function: 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400',
  equals: 'bg-blue-500 hover:bg-blue-600 text-white',
  clear: 'bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
};

const sizeStyles: Record<string, string> = {
  sm: 'h-8 text-xs px-2',
  md: 'h-12 text-sm px-3',
  lg: 'h-14 text-base px-4',
};

export default function Button({
  onClick,
  children,
  className = '',
  variant = 'default',
  size = 'md',
  disabled = false,
  title,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex items-center justify-center rounded-xl font-semibold transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
