'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowUpRight, Sparkles, Compass } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';
import Link from 'next/link';

interface Destination {
  id: string;
  title: { ru: string; uz: string; en: string };
  category: 'uzbekistan' | 'international' | 'mountains' | 'beach';
  image: string;
  toursCount: number;
  rating: number;
  priceFrom: number;
  link: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: 'samarkand',
    title: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' },
    category: 'uzbekistan',
    image: 'https://images.unsplash.com/photo-1599831969155-3d8c79234856?q=80&w=1200&auto=format&fit=crop',
    toursCount: 12,
    rating: 4.9,
    priceFrom: 350,
    link: '/tours/domestic?destination=samarkand',
  },
  {
    id: 'bukhara',
    title: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' },
    category: 'uzbekistan',
    image: 'https://images.unsplash.com/photo-1569383746724-6f1b8826f81a?q=80&w=1200&auto=format&fit=crop',
    toursCount: 10,
    rating: 4.8,
    priceFrom: 320,
    link: '/tours/domestic?destination=bukhara',
  },
  {
    id: 'khiva',
    title: { ru: 'Хива', uz: 'Xiva', en: 'Khiva' },
    category: 'uzbekistan',
    image: 'https://images.unsplash.com/photo-1604150484998-849905558838?q=80&w=1200&auto=format&fit=crop',
    toursCount: 8,
    rating: 4.9,
    priceFrom: 290,
    link: '/tours/domestic?destination=khiva',
  },
  {
    id: 'maldives',
    title: { ru: 'Мальдивы', uz: 'Maldiv orollari', en: 'Maldives' },
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
    toursCount: 15,
    rating: 5.0,
    priceFrom: 1450,
    link: '/tours/international?destination=maldives',
  },
  {
    id: 'dubai',
    title: { ru: 'Дубай, ОАЭ', uz: 'Dubai, BAA', en: 'Dubai, UAE' },
    category: 'international',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    toursCount: 20,
    rating: 4.8,
    priceFrom: 850,
    link: '/tours/international?destination=dubai',
  },
  {
    id: 'chatkal',
    title: { ru: 'Чаткальские горы', uz: 'Chotqol tog‘lari', en: 'Chatkal Mountains' },
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    toursCount: 7,
    rating: 4.7,
    priceFrom: 180,
    link: '/tours/domestic?destination=chatkal',
  },
];

export const InteractiveDestinations = () => {
  const { locale } = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: { ru: 'Все направления', uz: 'Barcha yo‘nalishlar', en: 'All' } },
    { id: 'uzbekistan', label: { ru: 'По Узбекистану', uz: 'O‘zbekiston bo‘ylab', en: 'Uzbekistan' } },
    { id: 'international', label: { ru: 'За рубежом', uz: 'Xalqaro', en: 'International' } },
    { id: 'mountains', label: { ru: 'Горы', uz: 'Tog‘lar', en: 'Mountains' } },
    { id: 'beach', label: { ru: 'Пляжи', uz: 'Plyajlar', en: 'Beach' } },
  ];

  const filtered = activeCategory === 'all' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.category === activeCategory);

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/30 text-gold-300 text-sm font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-4 h-4 text-gold-400" />
            <span>{locale === 'uz' ? 'Yo‘nalishlar' : locale === 'en' ? 'Destinations' : 'Направления'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            {locale === 'uz' ? 'Top yo‘nalishlar' : locale === 'en' ? 'Top Destinations' : 'Премиальные направления'}
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all border ${
                activeCategory === c.id
                  ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-slate-950 border-gold-400 shadow-lg scale-105'
                  : 'bg-slate-900 text-gray-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {c.label[locale as keyof typeof c.label] || c.label.ru}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence>
            {filtered.map((d) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative h-[320px] sm:h-[360px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-slate-900 flex flex-col justify-end p-5 sm:p-6 border border-slate-800 hover:border-gold-500/40 transition-colors"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img src={d.image} alt={d.title.ru} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />
                </div>

                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                  <span className="px-3.5 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-gold-300 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>{d.toursCount} {locale === 'uz' ? 'ta tur' : locale === 'en' ? 'tours' : 'туров'}</span>
                  </span>
                  <span className="px-3 py-1 bg-gold-500 text-slate-950 font-bold text-xs rounded-full shadow-md">
                    ★ {d.rating}
                  </span>
                </div>

                <div className="relative z-10 transform transition-transform group-hover:-translate-y-2">
                  <div className="flex items-center space-x-1 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{d.category.toUpperCase()}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                    {d.title[locale as keyof typeof d.title] || d.title.ru}
                  </h3>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-xs text-gray-400 block">{locale === 'uz' ? 'Narxi' : locale === 'en' ? 'From' : 'От'}</span>
                      <span className="text-xl font-bold text-gold-400">${d.priceFrom}</span>
                    </div>
                    <Link href={d.link} className="w-12 h-12 rounded-2xl bg-gold-500 text-slate-950 flex items-center justify-center font-bold hover:bg-gold-400 transition-all transform hover:rotate-45">
                      <ArrowUpRight className="w-6 h-6" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
