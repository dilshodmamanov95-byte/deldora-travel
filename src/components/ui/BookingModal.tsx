'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, PartyPopper } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName?: string;
}

export const BookingModal = ({ isOpen, onClose, tourName }: BookingModalProps) => {
  const { locale } = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  const t = {
    title: { ru: 'Бронирование тура', uz: 'Sayohatni bron qilish', en: 'Book a Tour' },
    name: { ru: 'Ваше имя', uz: 'Ismingiz', en: 'Your Name' },
    phone: { ru: 'Телефон', uz: 'Telefon', en: 'Phone' },
    date: { ru: 'Желаемая дата', uz: 'Istalgan sana', en: 'Preferred Date' },
    submit: { ru: 'Забронировать', uz: 'Bron qilish', en: 'Book Now' },
    success: { ru: 'Спасибо! Мы свяжемся с вами.', uz: 'Rahmat! Biz siz bilan bog‘lanamiz.', en: 'Thank you! We will contact you soon.' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full max-h-[calc(100dvh-2rem)] overflow-y-auto shadow-2xl relative">
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                <X className="w-6 h-6" />
              </button>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <PartyPopper className="w-16 h-16 text-gold-500 mb-4" />
                  <h3 className="text-2xl font-bold">{t.success[locale as keyof typeof t.success]}</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">{t.title[locale as keyof typeof t.title]}</h2>
                  {tourName && <p className="text-gold-600 font-semibold">{tourName}</p>}
                  <input type="text" placeholder={t.name[locale as keyof typeof t.name]} className="w-full p-3 rounded-xl border border-gray-300" required />
                  <input type="tel" placeholder={t.phone[locale as keyof typeof t.phone]} className="w-full p-3 rounded-xl border border-gray-300" required />
                  <input type="date" className="w-full p-3 rounded-xl border border-gray-300" required />
                  <button className="w-full bg-gold-500 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gold-600">
                    <Send className="w-5 h-5" /> {t.submit[locale as keyof typeof t.submit]}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
