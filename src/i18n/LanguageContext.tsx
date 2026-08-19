import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang, LocalizedContent, Profile } from '../types';
import { getContent } from '../constants/content';
import { getCurrentProfile } from './profile';
import { applyDocumentMeta } from './meta';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Which positioning is being served (see src/i18n/profile.ts). */
  profile: Profile;
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

interface LanguageProviderProps {
  children: React.ReactNode;
  /** Defaults to the positioning matching the current URL. */
  profile?: Profile;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, profile }) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const activeProfile = profile ?? getCurrentProfile();

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    applyDocumentMeta(lang, activeProfile);
  }, [lang, activeProfile]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      toggleLang: () => setLangState((prev) => (prev === 'fr' ? 'en' : 'fr')),
      profile: activeProfile,
      c: getContent(lang, activeProfile),
    }),
    [lang, activeProfile]
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
