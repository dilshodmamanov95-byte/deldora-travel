'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { dictionaries, locales, type Locale } from './translations';

const STORAGE_KEY = 'deldora_selected_language';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: (typeof dictionaries)[Locale];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = stored && locales.includes(stored as Locale) ? (stored as Locale) : 'ru';
    setLocaleState(initial);
    document.documentElement.lang = initial;
    setMounted(true);
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.cookie = `${STORAGE_KEY}=${nextLocale};path=/;max-age=31536000;SameSite=Lax`;
    document.documentElement.lang = nextLocale;
    window.dispatchEvent(new CustomEvent('deldora:language-change', { detail: nextLocale }));
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, dictionary: dictionaries[locale] }}>
      {mounted ? children : children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}
