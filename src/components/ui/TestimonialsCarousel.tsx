'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';

export function TestimonialsCarousel() {
  const { locale } = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      text: { ru: 'Deldora Travel организует исключительные премиальные туры и предлагает безупречный сервис!', uz: 'Deldora Travel ajoyib premium sayohatlar tashkil qiladi va benuqson xizmat ko‘rsatadi!', en: 'Deldora Travel provides exceptional luxury tours with unmatched service!' },
      name: 'Alisher Isaev',
      location: 'Tashkent'
    },
    {
      text: { ru: 'Тур по Великому шелковому пути был потрясающим. Очень рекомендую.', uz: 'Buyuk Ipak yo‘li sayohati hayajonli tajriba bo‘ldi. Tavsiya qilaman.', en: 'The Silk Road tour was a breathtaking experience. Highly recommended.' },
      name: 'Sophia Karimova',
      location: 'Samarkand'
    }
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-24 bg-slate-900 text-white relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-12">
          {locale === 'uz' ? 'Mijozlar fikri' : locale === 'en' ? 'Client Reviews' : 'Отзывы клиентов'}
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl mx-auto bg-slate-800 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-700 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg sm:text-xl italic mb-6"
            >
              &quot;{reviews[currentIndex].text[locale]}&quot;
            </motion.p>
          </AnimatePresence>
          <h4 className="font-bold text-gold-400">{reviews[currentIndex].name}</h4>
          <p className="text-sm text-gray-400">{reviews[currentIndex].location}</p>
        </motion.div>
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button onClick={prev} className="p-3 rounded-full bg-slate-800 hover:bg-gold-500 text-white"><ChevronLeft /></button>
          <button onClick={next} className="p-3 rounded-full bg-slate-800 hover:bg-gold-500 text-white"><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
}
