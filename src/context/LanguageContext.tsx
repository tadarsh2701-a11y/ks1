'use client';

import React, { createContext, useContext, useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { LanguageCode, LanguageInfo, INDIAN_REGIONAL_LANGUAGES, resolveLanguageCode, LANGUAGE_ALIASES } from '../types/language';
import { uiTranslations, UiTranslations } from '../data/translations/ui';
import { categoryTranslations, CategoryTranslation } from '../data/translations/categories';
import { getLocalizedTopic } from '../data/translations/topics';
import { TopicItem } from '../types/topics';

export { resolveLanguageCode, LANGUAGE_ALIASES };

export interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode, updateUrl?: boolean) => void;
  languageInfo: LanguageInfo;
  availableLanguages: LanguageInfo[];
  t: (key: keyof UiTranslations | string) => string;
  translateCategory: (categoryId: string) => CategoryTranslation;
  translateTopic: (topic: TopicItem) => TopicItem;
  translateDifficulty: (difficulty: string) => string;
  getLocalizedUrl: (path: string, overrideLang?: LanguageCode) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'velvet_ember_language';

function getLangFromWindowUrl(): LanguageCode | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('lang') || params.get('language') || params.get('locale');
    if (raw) {
      return resolveLanguageCode(raw);
    }
  } catch {
    // ignore URL parsing errors
  }
  return null;
}

// Inner component wrapped in Suspense to reactively sync Next.js searchParams
function SearchParamsSync({ onLangDetected }: { onLangDetected: (lang: LanguageCode) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const raw = searchParams.get('lang') || searchParams.get('language') || searchParams.get('locale');
    if (raw) {
      const resolved = resolveLanguageCode(raw);
      if (resolved) {
        onLangDetected(resolved);
      }
    }
  }, [searchParams, onLangDetected]);

  return null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>('en');

  // Sync saved language or URL parameter on mount after hydration
  useEffect(() => {
    const fromUrl = getLangFromWindowUrl();
    if (fromUrl) {
      setCurrentLanguageState(fromUrl);
      try {
        localStorage.setItem(STORAGE_KEY, fromUrl);
      } catch {
        // ignore
      }
      return;
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const resolved = resolveLanguageCode(saved);
      if (resolved) {
        setCurrentLanguageState(resolved);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const setLanguage = useCallback((lang: LanguageCode, updateUrl = true) => {
    setCurrentLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore localStorage errors
    }

    if (updateUrl && typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        const currentParam = url.searchParams.get('lang');
        if (currentParam !== lang) {
          url.searchParams.set('lang', lang);
          window.history.replaceState(null, '', url.pathname + url.search + url.hash);
        }
      } catch {
        // ignore URL update errors
      }
    }
  }, []);

  // Listen to popstate (browser back / forward button navigation)
  useEffect(() => {
    const handlePopState = () => {
      const fromUrl = getLangFromWindowUrl();
      if (fromUrl && fromUrl !== currentLanguage) {
        setLanguage(fromUrl, false);
      }
    };

    // Also run on mount to catch any search params that were present
    const initialFromUrl = getLangFromWindowUrl();
    if (initialFromUrl && initialFromUrl !== currentLanguage) {
      setLanguage(initialFromUrl, false);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentLanguage, setLanguage]);

  const languageInfo =
    INDIAN_REGIONAL_LANGUAGES.find((l) => l.code === currentLanguage) ||
    INDIAN_REGIONAL_LANGUAGES[0];

  const isRtl = languageInfo.direction === 'rtl';

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [currentLanguage, isRtl]);

  const t = (key: keyof UiTranslations | string): string => {
    const langObj = uiTranslations[currentLanguage] || uiTranslations.en;
    const defaultObj = uiTranslations.en;
    return (langObj as any)[key] || (defaultObj as any)[key] || String(key);
  };

  const translateCategory = (categoryId: string): CategoryTranslation => {
    const langCategories = categoryTranslations[currentLanguage] || categoryTranslations.en;
    return (
      langCategories[categoryId] ||
      categoryTranslations.en[categoryId] || {
        title: categoryId,
        shortName: categoryId,
        description: ''
      }
    );
  };

  const translateDifficulty = (difficulty: string): string => {
    const d = difficulty?.toLowerCase() || '';
    if (d.includes('begin') || d.includes('shuru') || d.includes('pratham')) return t('beginner');
    if (d.includes('inter') || d.includes('madhy')) return t('intermediate');
    if (d.includes('adv') || d.includes('unnat') || d.includes('pragat')) return t('advanced');
    return difficulty;
  };

  const translateTopic = (topic: TopicItem): TopicItem => {
    return getLocalizedTopic(topic, currentLanguage);
  };

  const getLocalizedUrl = (path: string, overrideLang?: LanguageCode): string => {
    const langToUse = overrideLang || currentLanguage;
    if (typeof window === 'undefined') {
      return path.includes('?') ? `${path}&lang=${langToUse}` : `${path}?lang=${langToUse}`;
    }
    try {
      const base = new URL(path, window.location.origin);
      base.searchParams.set('lang', langToUse);
      return base.pathname + base.search + base.hash;
    } catch {
      return path.includes('?') ? `${path}&lang=${langToUse}` : `${path}?lang=${langToUse}`;
    }
  };

  const handleLangFromSearchParams = useCallback((newLang: LanguageCode) => {
    if (newLang !== currentLanguage) {
      setLanguage(newLang, false);
    }
  }, [currentLanguage, setLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        languageInfo,
        availableLanguages: INDIAN_REGIONAL_LANGUAGES,
        t,
        translateCategory,
        translateTopic,
        translateDifficulty,
        getLocalizedUrl,
        isRtl
      }}
    >
      <Suspense fallback={null}>
        <SearchParamsSync onLangDetected={handleLangFromSearchParams} />
      </Suspense>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
