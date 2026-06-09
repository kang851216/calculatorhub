'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, History, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useTranslation } from '@/contexts/LanguageContext';

const navLinkKeys = [
  { href: '/', key: 'nav.home', icon: Calculator },
  { href: '/basic', key: 'nav.basic' },
  { href: '/scientific', key: 'nav.scientific' },
  { href: '/unit-converter', key: 'nav.units' },
  { href: '/currency', key: 'nav.currency' },
  { href: '/bmi', key: 'nav.bmi' },
  { href: '/date', key: 'nav.date' },
];

interface NavbarProps {
  onToggleHistory: () => void;
}

export default function Navbar({ onToggleHistory }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center justify-between px-6 py-3 border-b border-[var(--button-bg)] bg-[var(--bg-primary)]">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-[var(--text-primary)] hover:opacity-80 transition-opacity"
          >
            <Calculator className="w-6 h-6 text-[var(--accent)]" />
            <span>{t('nav.appName')}</span>
          </Link>

          <div className="flex items-center gap-1">
            {navLinkKeys.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--button-bg)]'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <button
            onClick={onToggleHistory}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--button-bg)] active:scale-95"
            aria-label={t('nav.toggleHistory')}
            title={t('nav.history')}
          >
            <History className="w-5 h-5 text-[var(--text-primary)]" />
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[var(--button-bg)] bg-[var(--bg-primary)]">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-[var(--button-bg)]"
          aria-label={t('nav.menu')}
        >
          <Menu className="w-5 h-5 text-[var(--text-primary)]" />
        </button>

        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[var(--text-primary)]">
          <Calculator className="w-5 h-5 text-[var(--accent)]" />
          <span>{t('nav.appName')}</span>
        </Link>

        <div className="flex items-center gap-1">
          <LanguageSelector />
          <button
            onClick={onToggleHistory}
            className="p-2 rounded-lg hover:bg-[var(--button-bg)]"
            aria-label={t('nav.toggleHistory')}
          >
            <History className="w-5 h-5 text-[var(--text-primary)]" />
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[var(--bg-primary)] shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-[var(--button-bg)]">
              <span className="font-bold text-[var(--text-primary)]">{t('nav.menu')}</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--button-bg)]"
              >
                <X className="w-5 h-5 text-[var(--text-primary)]" />
              </button>
            </div>
            <div className="py-2">
              {navLinkKeys.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-r-2 border-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--button-bg)]'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
