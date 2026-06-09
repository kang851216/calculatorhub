import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-[var(--button-bg)] bg-[var(--bg-primary)] shadow-sm ${
        hoverable
          ? 'cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--accent)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
