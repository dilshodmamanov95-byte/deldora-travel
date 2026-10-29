import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { LenisProvider } from '@/components/LenisProvider';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Deldora Travel | Премиум туры из Узбекистана',
    template: '%s | Deldora Travel',
  },
  description: 'Лучшие туры по Узбекистану и за рубежом. Индивидуальные и групповые туры премиум класса. Бронируйте онлайн!',
  keywords: ['туры', 'Узбекистан', 'отдых', 'путешествия', 'Deldora Travel', 'бронирование', 'премиум туры', 'международные туры', 'внутренний туризм'],
  authors: [{ name: 'Deldora Travel' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://deldora-travel.uz',
    siteName: 'Deldora Travel',
    title: 'Deldora Travel | Премиум туристическое агентство Узбекистан',
    description: 'Лучшие туры по Узбекистану и за рубежом. Индивидуальные и групповые туры премиум класса.',
    images: [
      {
        url: '/images/banners/hero-bg.jpg',
        width: 1920,
        height: 1080,
        alt: 'Deldora Travel - Премиум туры',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deldora Travel | Премиум туры из Узбекистана',
    description: 'Лучшие туры по Узбекистану и за рубежом. Индивидуальные и групповые туры премиум класса.',
    images: ['/images/banners/hero-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <LocaleProvider>
          <LenisProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LenisProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
