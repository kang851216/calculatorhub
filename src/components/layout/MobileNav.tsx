'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calculator,
  Sigma,
  ArrowLeftRight,
  DollarSign,
  Heart,
  Calendar,
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

const tabs: { href: string; key: string; icon: typeof Calculator }[] = [
  { href: '/basic', key: 'mobileNav.basic', icon: Calculator },
  { href: '/scientific', key: 'mobileNav.sci', icon: Sigma },
  { href: '/unit-converter', key: 'mobileNav.units', icon: ArrowLeftRight },
  { href: '/currency', key: 'mobileNav.money', icon: DollarSign },
  { href: '/bmi', key: 'mobileNav.bmi', icon: Heart },
  { href: '/date', key: 'mobileNav.date', icon: Calendar },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-primary)] border-t border-[var(--button-bg)] safe-area-bottom">
      <div className="flex items-center justify-around px-1 py-1">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center px-2 py-1.5 rounded-lg transition-colors min-w-0 ${
            pathname === '/'
              ? 'text-[var(--accent)]'
              : 'text-[var(--text-secondary)]'
          }`}
        >
          <Calculator className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 truncate">{t('mobileNav.home')}</span>
        </Link>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center px-2 py-1.5 rounded-lg transition-colors min-w-0 ${
                isActive
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 truncate">{t(tab.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
