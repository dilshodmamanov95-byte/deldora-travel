'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users, DollarSign, Plane, Bus, Hotel } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';

export const SearchForm = () => {
  const { dictionary } = useLocale();
  const t = dictionary.search;
  const [formData, setFormData] = useState({
    destination: '',
    tourType: 'all',
    duration: 'any',
    budget: 'any',
    travelers: 1,
    startDate: '',
    endDate: '',
  });

  const destinations = [
    { name: 'Стамбул, Турция', country: 'international' },
    { name: 'Дубай, ОАЭ', country: 'international' },
    { name: 'Пхукет, Таиланд', country: 'international' },
    { name: 'Мальдивы', country: 'international' },
    { name: 'Ташкент', country: 'domestic' },
    { name: 'Самарканд', country: 'domestic' },
    { name: 'Бухара', country: 'domestic' },
    { name: 'Хива', country: 'domestic' },
    { name: 'Чаткальские горы', country: 'domestic' },
  ];

  const tourTypes = [
    { value: 'all', label: t.allTypes, icon: <Search className="w-4 h-4" /> },
    { value: 'international', label: t.international, icon: <Plane className="w-4 h-4" /> },
    { value: 'domestic', label: t.domestic, icon: <Bus className="w-4 h-4" /> },
  ];

  const durations = [
    { value: 'any', label: t.any },
    { value: '1-3', label: '1-3 дня' },
    { value: '4-7', label: '4-7 дней' },
    { value: '8-14', label: '8-14 дней' },
    { value: '15+', label: '15+ дней' },
  ];

  const budgets = [
    { value: 'any', label: 'Любой' },
    { value: '0-500', label: '$0 - $500' },
    { value: '500-1000', label: '$500 - $1000' },
    { value: '1000-2000', label: '$1000 - $2000' },
    { value: '2000+', label: '$2000+' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build query string from form data
    const query = new URLSearchParams();
    
    if (formData.destination) {
      const selectedDest = destinations.find(d => d.name === formData.destination);
      if (selectedDest) {
        query.append('country', selectedDest.country);
        query.append('destination', formData.destination);
      }
    }
    
    if (formData.tourType !== 'all') query.append('type', formData.tourType);
    if (formData.duration !== 'any') query.append('duration', formData.duration);
    if (formData.budget !== 'any') query.append('budget', formData.budget);
    if (formData.travelers > 1) query.append('travelers', formData.travelers.toString());
    if (formData.startDate) query.append('startDate', formData.startDate);
    if (formData.endDate) query.append('endDate', formData.endDate);

    window.location.href = `/tours?${query.toString()}`;
  };

  const incrementTravelers = () => {
    setFormData(prev => ({ ...prev, travelers: Math.min(prev.travelers + 1, 10) }));
  };

  const decrementTravelers = () => {
    setFormData(prev => ({ ...prev, travelers: Math.max(prev.travelers - 1, 1) }));
  };

  return (
    <div className="bg-gradient-to-br from-white to-gold-50/50 rounded-3xl p-4 md:p-8 shadow-xl">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent">
          {t.title}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Destination */}
          <div className="relative lg:col-span-2">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
            <input
              type="text"
              name="destination"
              placeholder={t.destination}
              value={formData.destination}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 border border-gold-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              list="destinations"
            />
            <datalist id="destinations">
              {destinations.map((dest, index) => (
                <option key={index} value={dest.name} />
              ))}
            </datalist>
          </div>

          {/* Tour Type */}
          <div className="relative">
            <select
              name="tourType"
              value={formData.tourType}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-4 border border-gold-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              {tourTypes.map((type) => (
                <option key={type.value} value={type.value} className="flex items-center">
                  {type.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Duration */}
          <div className="relative">
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-4 border border-gold-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              {durations.map((duration) => (
                <option key={duration.value} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Budget */}
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-4 border border-gold-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              {budgets.map((budget) => (
                <option key={budget.value} value={budget.value}>
                  {budget.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Travelers */}
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
            <div className="flex items-center justify-between w-full pl-12 pr-4 py-4 border border-gold-200 rounded-xl">
              <span className="text-gray-600">{formData.travelers} {formData.travelers > 1 ? t.travelersPlural : t.travelers}</span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={decrementTravelers}
                  className="p-1 rounded-lg hover:bg-gold-100 transition-colors disabled:opacity-50"
                  disabled={formData.travelers <= 1}
                >
                  <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={incrementTravelers}
                  className="p-1 rounded-lg hover:bg-gold-100 transition-colors disabled:opacity-50"
                  disabled={formData.travelers >= 10}
                >
                  <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <button
              type="submit"
              className="w-full lg:w-auto flex-1 lg:flex-none bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>{t.search}</span>
            </button>
          </div>
        </form>

        {/* Quick Filters */}
        <div className="mt-8 pt-6 border-t border-gold-100">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
            {t.destination}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tours/international?country=Турция"
              className="px-4 py-2 bg-gold-50 text-gold-600 rounded-full text-sm font-medium hover:bg-gold-100 transition-colors"
            >
              Турция
            </Link>
            <Link
              href="/tours/international?country=ОАЭ"
              className="px-4 py-2 bg-gold-50 text-gold-600 rounded-full text-sm font-medium hover:bg-gold-100 transition-colors"
            >
              ОАЭ
            </Link>
            <Link
              href="/tours/international?country=Таиланд"
              className="px-4 py-2 bg-gold-50 text-gold-600 rounded-full text-sm font-medium hover:bg-gold-100 transition-colors"
            >
              Таиланд
            </Link>
            <Link
              href="/tours/international?country=Мальдивы"
              className="px-4 py-2 bg-gold-50 text-gold-600 rounded-full text-sm font-medium hover:bg-gold-100 transition-colors"
            >
              Мальдивы
            </Link>
            <Link
              href="/tours/domestic"
              className="px-4 py-2 bg-gold-50 text-gold-600 rounded-full text-sm font-medium hover:bg-gold-100 transition-colors"
            >
              Узбекистан
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
