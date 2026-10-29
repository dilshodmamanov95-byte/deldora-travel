'use client';

import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';

export const ContactWidget = () => {
  const { locale } = useLocale();
  const whatsappLabel = locale === 'uz' ? 'WhatsApp orqali bog‘lanish' : locale === 'en' ? 'Contact via WhatsApp' : 'Связаться через WhatsApp';
  const telegramLabel = locale === 'uz' ? 'Telegram orqali bog‘lanish' : locale === 'en' ? 'Contact via Telegram' : 'Связаться через Telegram';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-3 sm:gap-4"
    >
      <motion.a
        href="https://wa.me/998991234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={whatsappLabel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 animate-pulse"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.a>
      <motion.a
        href="https://t.me/deldora_travel"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={telegramLabel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-sky-500/30 animate-pulse"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.a>
    </motion.div>
  );
};
