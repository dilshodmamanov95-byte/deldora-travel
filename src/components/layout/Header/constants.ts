// src/components/layout/Header/constants.ts

export const CURRENCIES = [
  { code: 'UZS', name: 'UZS', symbol: '₩' },
  { code: 'USD', name: 'USD', symbol: '$' },
  { code: 'EUR', name: 'EUR', symbol: '€' },
  { code: 'RUB', name: 'RUB', symbol: '₽' },
  { code: 'TRY', name: 'TRY', symbol: '₺' },
] as const;

export type Currency = typeof CURRENCIES[number];

export const DEFAULT_CURRENCY: Currency = CURRENCIES[0];

// Ссылки для навигации
export const NAV_ITEMS = [
  { label: 'Главная', href: '/' },
  {
    label: 'Туры',
    href: '/tours',
    subItems: [
      { label: 'Международные', href: '/tours/international' },
      { label: 'По Узбекистану', href: '/tours/domestic' },
      { label: 'Популярные', href: '/tours?filter=popular' },
      { label: 'Горящие', href: '/tours?filter=hot' },
    ],
  },
  { label: 'О нас', href: '/about' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакты', href: '/contacts' },
] as const;

// Ссылки для социальных кнопок
export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/+998991234567',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/deldora_travel_uz',
  instagram: 'https://instagram.com/deldora.travel',
  phone: 'tel:+998991234567',
  email: 'mailto:info@deldora-travel.uz',
} as const;

// Контакты компании
export const COMPANY_CONTACTS = {
  phone: '+998 (99) 123-45-67',
  phone2: '+998 (90) 987-65-43',
  email: 'info@deldora-travel.uz',
  address: 'г. Ташкент, ул. Амира Темура 100, офис 201',
  workingHours: 'Пн-Пт: 09:00-19:00, Сб: 10:00-16:00',
} as const;

export type NavItem = typeof NAV_ITEMS[number];

export type SubNavItem = {
  label: string;
  href: string;
};

export type NavItemWithSub = NavItem & {
  subItems?: SubNavItem[];
};
