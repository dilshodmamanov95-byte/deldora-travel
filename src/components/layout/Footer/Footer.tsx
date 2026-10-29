'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Instagram, Facebook, Send, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';

export const Footer = () => {
  const { dictionary, locale } = useLocale();
  const t = dictionary.footer;
  const common = dictionary.common;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16"
        >
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-amber-600 bg-clip-text text-transparent">Deldora</span>
              <span className="block text-xs text-gold-500 font-medium tracking-widest uppercase -mt-1">Travel</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">{t.description}</p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Send].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold-400 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Add other columns here */}
        </motion.div>
        <div className="text-center text-gray-500 text-sm border-t border-white/5 pt-8">
          © {currentYear} Deldora Travel. {t.rights}
        </div>
      </div>
    </footer>
  );
};