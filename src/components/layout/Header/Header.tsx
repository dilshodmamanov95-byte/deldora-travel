'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { NAV_ITEMS, SOCIAL_LINKS } from './constants';
import { CurrencySelector } from '@/components/ui/CurrencySelector';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Logo, ThemeToggle } from './assets';
import { useTheme } from './hooks';
import { useLocale } from '@/i18n/LocaleProvider';

export function Header() {
  const { dictionary } = useLocale();
  const nav = dictionary.nav;
  const navLabels: Record<string, string> = { 'Главная': nav.home, 'Туры': nav.tours, 'О нас': nav.about, 'Блог': nav.blog, 'Контакты': nav.contacts, 'Международные': nav.international, 'По Узбекистану': nav.domestic, 'Популярные': nav.popular, 'Горящие': nav.hot, 'Новинки': nav.new };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gold-500/10'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative flex h-14 items-center">
              <img
                src="/logo.png"
                alt="Deldora Travel Logo"
                width={56}
                height={56}
                className="relative h-14 w-auto max-w-16 object-contain bg-transparent mix-blend-multiply"
              />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                Deldora
              </span>
              <span className="block text-xs text-gold-500 font-medium tracking-wider uppercase">
                Travel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-gold-500 font-medium transition-colors flex items-center space-x-1"
                >
                  <span>{navLabels[item.label] ?? item.label}</span>
                  {'subItems' in item && item.subItems && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {'subItems' in item && item.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gold-500/10 py-3 hidden group-hover:block animate-fade-in">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 text-gray-600 hover:bg-gold-500/5 hover:text-gold-500 rounded-lg mx-2 transition-colors"
                      >
                        {navLabels[sub.label] ?? sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <CurrencySelector />
            {/* Theme Toggle Button */}
            <ThemeToggle />
            <Link
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block p-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003.579-.022 1.127-.058 1.653m-5.358 8.154c-.026.004-.053.007-.081.01-.028.003-.117.007-.25.007h-.028c-.118 0-.216-.003-.305-.01a.98.98 0 00-.328-.043.975.975 0 00-.302-.09.962.962 0 00-.394-.164.948.948 0 00-.467-.275c-.198-.173-.43-.322-.644-.446-.213-.124-.272-.198-.347-.298-.075-.099-.118-.224-.118-.404 0-.181.043-.354.13-.51.086-.157.669-1.612.916-2.207.242-.579.487-.5.669-.51.173-.008.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.479 0 1.462-1.065 2.875-1.213 3.074-.149.199-2.096 3.2-5.077 4.487-.709.306-1.262.489-1.694.625-.712.227-1.36.195-1.871.118-.571-.085-1.758-.719-2.006-1.413-.248-.694-.248-1.289-.173-1.413.074-.124.272-.198.57-.347" />
              </svg>
            </Link>
            <Link
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block p-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-colors"
              aria-label="Telegram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.8 3.18a1.5 1.5 0 00-1.54-.26L3.18 9.4c-1.04.4-1.02 1.9.03 2.28l4.35 1.55 1.68 5.38c.25.8 1.27.98 1.78.32l2.42-3.16 4.5 3.31c.8.59 1.94.16 2.18-.81l2.08-13.55c.09-.62-.02-1.1-.4-1.54zm-4.96 3.13-7.2 6.57-.62 2.88-.91-2.9 8.73-6.55z" />
              </svg>
            </Link>
            <Link
              href={SOCIAL_LINKS.phone}
              className="hidden md:block p-2 rounded-xl bg-gold-500 text-white hover:bg-gold-600 transition-colors"
              aria-label={nav.call}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gold-500/10 transition-colors"
              aria-label={nav.menu}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gold-500/10 animate-slide-down">
            <nav className="flex flex-col space-y-2 py-4">
              <div className="px-4 pb-2 flex items-center gap-2 md:hidden">
                <LanguageSelector />
                <CurrencySelector />
              </div>
              {NAV_ITEMS.map((item) => (
                <div key={item.href} className="px-4">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full py-3 text-gray-700 font-medium border-b border-gold-500/5"
                  >
                    <span>{navLabels[item.label] ?? item.label}</span>
                    {'subItems' in item && item.subItems && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>
                  {'subItems' in item && item.subItems && (
                    <div className="pl-4 py-2 space-y-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-gray-600 hover:text-gold-500 transition-colors"
                        >
                          {navLabels[sub.label] ?? sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-4 py-4 flex space-x-2">
                <Link
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex flex-col items-center justify-center py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003.579-.022 1.127-.058 1.653m-5.358 8.154c-.026.004-.053.007-.081.01-.028.003-.117.007-.25.007h-.028c-.118 0-.216-.003-.305-.01a.98.98 0 00-.328-.043.975.975 0 00-.302-.09.962.962 0 00-.394-.164.948.948 0 00-.467-.275c-.198-.173-.43-.322-.644-.446-.213-.124-.272-.198-.347-.298-.075-.099-.118-.224-.118-.404 0-.181.043-.354.13-.51.086-.157.669-1.612.916-2.207.242-.579.487-.5.669-.51.173-.008.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.479 0 1.462-1.065 2.875-1.213 3.074-.149.199-2.096 3.2-5.077 4.487-.709.306-1.262.489-1.694.625-.712.227-1.36.195-1.871.118-.571-.085-1.758-.719-2.006-1.413-.248-.694-.248-1.289-.173-1.413.074-.124.272-.198.57-.347" />
                  </svg>
                  <span className="text-xs">WhatsApp</span>
                </Link>
                <Link
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex flex-col items-center justify-center py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
                >
                  <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21.8 3.18a1.5 1.5 0 00-1.54-.26L3.18 9.4c-1.04.4-1.02 1.9.03 2.28l4.35 1.55 1.68 5.38c.25.8 1.27.98 1.78.32l2.42-3.16 4.5 3.31c.8.59 1.94.16 2.18-.81l2.08-13.55c.09-.62-.02-1.1-.4-1.54zm-4.96 3.13-7.2 6.57-.62 2.88-.91-2.9 8.73-6.55z" />
                  </svg>
                  <span className="text-xs">Telegram</span>
                </Link>
                <Link
                  href={SOCIAL_LINKS.phone}
                  className="flex-1 flex flex-col items-center justify-center py-3 bg-gold-500 text-white rounded-xl hover:bg-gold-600 transition-colors"
                >
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-xs">{nav.call}</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
