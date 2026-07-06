import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang, LocalizedContent } from '../types';
import { getContent } from '../constants/content';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  c: LocalizedContent;
}

const STORAGE_KEY = 'portfolio-lang';

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLang = (value: unknown): value is Lang => value === 'fr' || value === 'en';

/**
 * Resolve the initial language: stored preference → 'fr'.
 * The portfolio targets the French apprenticeship market, so French is the
 * default first impression regardless of browser locale; visitors can switch.
 */
const getInitialLang = (): Lang => {
  if (typeof window === 'undefined') return 'fr';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLang(stored) ? stored : 'fr';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      toggleLang: () => setLangState((prev) => (prev === 'fr' ? 'en' : 'fr')),
      c: getContent(lang),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

/**
 * Access the active language and its resolved content bundle.
 */
export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
