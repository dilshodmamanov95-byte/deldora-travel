'use client';

import { Languages } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';
import { locales, type Locale } from '@/i18n/translations';

export type SiteLanguage = 'ru' | 'uz' | 'en';

const LANGUAGES: Array<{ code: SiteLanguage; label: string }> = [
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: "O'zbek" },
  { code: 'en', label: 'English' },
];

export function LanguageSelector() {
  const { locale, setLocale } = useLocale();

  const changeLanguage = (nextLanguage: SiteLanguage) => setLocale(nextLanguage);

  return (
    <label className="relative flex h-10 items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 shadow-sm transition-colors hover:border-gold-300 focus-within:ring-2 focus-within:ring-gold-500 focus-within:ring-offset-2">
      <Languages className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
      <span className="sr-only">Выберите язык сайта</span>
      <select
        value={locale}
        onChange={(event) => changeLanguage(event.target.value as SiteLanguage)}
        className="w-[52px] cursor-pointer appearance-none bg-transparent text-sm font-semibold text-gray-700 outline-none sm:w-auto sm:pr-5"
        aria-label="Язык сайта"
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {code.toUpperCase()} — {label}
          </option>
        ))}
      </select>
    </label>
  );
}
