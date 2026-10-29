'use client';

import { useLocale } from '@/i18n/LocaleProvider';

export function TranslatedText({ k, section = 'home' }: { k: string; section?: 'home' | 'common' }) {
  const { dictionary } = useLocale();
  const source = section === 'common' ? dictionary.common : dictionary.home;
  return <>{(source as unknown as Record<string, string>)[k] ?? k}</>;
}
