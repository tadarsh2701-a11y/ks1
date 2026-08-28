'use client';

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { DiscretionShield } from './DiscretionShield';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { useUserProgress } from '../hooks/useUserProgress';

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [discretionActive, setDiscretionActive] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const { progress } = useUserProgress();
  const bookmarkCount = progress.bookmarkedTopicIds.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDiscretionActive((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-sans selection:bg-[#4e1b1d] selection:text-[#ffb3b2] antialiased overflow-x-hidden relative flex flex-col justify-between">
        <div className="film-grain" />

        <Navbar
          onToggleDiscretion={() => setDiscretionActive(true)}
          onOpenLanguage={() => setIsLanguageModalOpen(true)}
          bookmarkCount={bookmarkCount}
        />

        <LanguageSelectorModal
          isOpen={isLanguageModalOpen}
          onClose={() => setIsLanguageModalOpen(false)}
        />

        <DiscretionShield
          isActive={discretionActive}
          onToggle={() => setDiscretionActive(false)}
        />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}