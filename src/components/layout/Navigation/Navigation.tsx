'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';

export const Navigation = () => {
  const { dictionary } = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: dictionary.nav.home, href: '/' },
    {
      name: dictionary.nav.tours,
      href: '/tours',
      submenu: [
        { name: dictionary.nav.international, href: '/tours/international' },
        { name: dictionary.nav.domestic, href: '/tours/domestic' },
        { name: dictionary.nav.popular, href: '/tours?filter=popular' },
        { name: dictionary.nav.new, href: '/tours?filter=new' },
      ],
    },
    { name: dictionary.nav.about, href: '/about' },
    { name: dictionary.nav.blog, href: '/blog' },
    { name: dictionary.nav.contacts, href: '/contacts' },
  ];

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <svg
                className="relative w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                <path d="M12 10.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Deldora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all ${
                    pathname === link.href || pathname.startsWith(`${link.href}/`)
                      ? 'text-gold-500 font-semibold bg-gold-500/10'
                      : 'text-gray-700 hover:text-gold-500 hover:bg-gold-500/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.submenu && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
                {link.submenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gold-500/10 py-2 hidden group-hover:block animate-fade-in">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gold-500/5 hover:text-gold-500 rounded-lg mx-2 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Book Now Button */}
          <Link
            href="/contacts"
            className="hidden lg:inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl"
          >
            {dictionary.nav.book}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gold-500/10 transition-colors"
            onClick={() => setOpenSubmenu(openSubmenu ? null : 'mobile')}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {openSubmenu === 'mobile' && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gold-500/10 animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-gold-500/5 pb-2">
                  <Link
                    href={link.href}
                    className="flex items-center justify-between w-full py-2 text-gray-700 font-medium"
                    onClick={() => setOpenSubmenu(null)}
                  >
                    <span>{link.name}</span>
                    {link.submenu && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenSubmenu(String(openSubmenu) === link.name ? null : link.name);
                        }}
                        className="p-1"
                      >
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            String(openSubmenu) === link.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </Link>
                  {link.submenu && String(openSubmenu) === link.name && (
                    <div className="pl-4 py-2 space-y-1">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block py-2 text-gray-600 hover:text-gold-500 transition-colors"
                          onClick={() => setOpenSubmenu(null)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contacts"
                className="block w-full text-center bg-gradient-to-r from-gold-400 to-gold-600 text-white px-6 py-3 rounded-xl font-semibold mt-4"
                onClick={() => setOpenSubmenu(null)}
              >
                        {dictionary.nav.book}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
