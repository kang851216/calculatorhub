'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import HistoryPanel from '@/components/ui/HistoryPanel';
import { useHistory } from '@/hooks/useHistory';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { history, clearHistory, clearTypeHistory, isOpen, setIsOpen } = useHistory();

  return (
    <LanguageProvider>
      <Navbar onToggleHistory={() => setIsOpen(!isOpen)} />
      
      <div className="flex flex-1">
        <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 pb-20 md:pb-6">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
        
        <HistoryPanel
          history={history}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onClear={clearHistory}
          onClearType={clearTypeHistory}
        />
      </div>
      
      <Footer />
      <MobileNav />
    </LanguageProvider>
  );
}
