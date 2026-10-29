'use client';

import { TourCard } from '@/components/ui/TourCard';
import { internationalTours } from '@/data/internationalTours';
import { domesticTours } from '@/data/domesticTours';
import Link from 'next/link';
import { SearchFormWrapper } from '@/components/ui/SearchFormWrapper';
import { TourSort } from '@/components/ui/TourSort';
import { Filter, SortDesc, Grid3X3, List } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';

export default function ToursPage({
  searchParams,
}: {
  searchParams: {
    filter?: string;
    type?: string;
    country?: string;
    destination?: string;
    duration?: string;
    budget?: string;
    travelers?: string;
    sort?: string;
  };
}) {
  const { dictionary } = useLocale();
  const t = dictionary.tours;
  // Combine all tours
  const allTours = [
    ...internationalTours.map(tour => ({ ...tour, type: 'international' as const })),
    ...domesticTours.map(tour => ({ ...tour, type: 'domestic' as const })),
  ];

  // Apply filters
  let filteredTours = [...allTours];

  // Filter by type
  if (searchParams.type) {
    filteredTours = filteredTours.filter(tour => tour.type === searchParams.type);
  }

  // Filter by country/destination
  if (searchParams.country) {
    filteredTours = filteredTours.filter(tour => 
      'country' in tour && tour.country === searchParams.country
    );
  }

  if (searchParams.destination) {
    filteredTours = filteredTours.filter(tour => 
      tour.destination.includes(searchParams.destination || '') ||
      tour.title.includes(searchParams.destination || '')
    );
  }

  // Filter by duration
  if (searchParams.duration) {
    const [min, max] = searchParams.duration.split('-').map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      filteredTours = filteredTours.filter(tour => 
        tour.duration >= min && tour.duration <= max
      );
    }
  }

  // Filter by budget (USD)
  if (searchParams.budget) {
    const [min, max] = searchParams.budget.replace('$', '').replace('+', '').split('-').map(Number);
    if (!isNaN(min)) {
      if (!isNaN(max)) {
        filteredTours = filteredTours.filter(tour => 
          tour.price.USD >= min && tour.price.USD <= max
        );
      } else {
        filteredTours = filteredTours.filter(tour => tour.price.USD >= min);
      }
    }
  }

  // Filter by special categories
  if (searchParams.filter) {
    switch (searchParams.filter) {
      case 'popular':
        filteredTours = filteredTours.filter(tour => tour.isPopular);
        break;
      case 'hot':
        filteredTours = filteredTours.filter(tour => tour.isHot);
        break;
      case 'new':
        filteredTours = filteredTours.filter(tour => tour.isNew);
        break;
    }
  }

  // Sort options
  const sortOptions = [
    { value: 'default', label: t.defaultSort },
    { value: 'price-asc', label: t.priceAsc },
    { value: 'price-desc', label: t.priceDesc },
    { value: 'rating', label: t.rating },
    { value: 'duration', label: t.duration },
    { value: 'new', label: t.new },
  ];

  // Apply sorting
  const sortBy = searchParams.sort || 'default';
  switch (sortBy) {
    case 'price-asc':
      filteredTours.sort((a, b) => a.price.USD - b.price.USD);
      break;
    case 'price-desc':
      filteredTours.sort((a, b) => b.price.USD - a.price.USD);
      break;
    case 'rating':
      filteredTours.sort((a, b) => b.rating - a.rating);
      break;
    case 'duration':
      filteredTours.sort((a, b) => a.duration - b.duration);
      break;
    case 'new':
      filteredTours.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
  }

  // Statistics
  const totalTours = filteredTours.length;
  const internationalCount = filteredTours.filter(t => t.type === 'international').length;
  const domesticCount = filteredTours.filter(t => t.type === 'domestic').length;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-64 bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.title}
          </h1>
          <p className="text-xl">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="-mt-12 px-4">
        <div className="container mx-auto">
          <SearchFormWrapper />
        </div>
      </section>

      {/* Stats and Controls */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {t.found}: {totalTours} {t.toursWord}
              </h2>
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="flex items-center">
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  {internationalCount} {t.internationalCount}
                </span>
                <span className="flex items-center">
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  {domesticCount} {t.domesticCount}
                </span>
              </div>
            </div>
            <TourSort sortOptions={sortOptions} />
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={{
                    ...tour,
                    country: 'country' in tour ? tour.country : tour.region
                  }}
                  currency="USD"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t.noResults}
              </h3>
              <p className="text-gray-600 mb-8">
                {t.changeSearch}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tours"
                  className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all"
                >
                  {t.showAll}
                </Link>
                <Link
                  href="/tours/international"
                  className="inline-block bg-white border border-gold-200 text-gold-600 px-8 py-3 rounded-xl font-semibold hover:bg-gold-50 transition-all"
                >
                  {t.internationalTours}
                </Link>
                <Link
                  href="/tours/domestic"
                  className="inline-block bg-white border border-gold-200 text-gold-600 px-8 py-3 rounded-xl font-semibold hover:bg-gold-50 transition-all"
                >
                  {t.domesticTours}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Ищете что-то конкретное?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/tours/international"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow group"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Международные туры
              </h3>
              <p className="text-gray-600 mb-4">
                Турция, ОАЭ, Таиланд, Мальдивы и другие направления
              </p>
              <span className="text-gold-500 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                Узнать больше
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              href="/tours/domestic"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow group"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Туры по Узбекистану
              </h3>
              <p className="text-gray-600 mb-4">
                Золотой Кольцо, Ташкент, Самарканд, Бухара, Хива
              </p>
              <span className="text-gold-500 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                Узнать больше
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              href="/contacts"
              className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow group"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Индивидуальный тур
              </h3>
              <p className="text-white/90 mb-4">
                Создадим тур специально для вас
              </p>
              <span className="text-white font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                Забронировать
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
