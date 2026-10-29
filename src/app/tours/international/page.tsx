import { TourCard } from '@/components/ui/TourCard';
import { internationalTours, getPopularInternationalTours, getHotInternationalTours, getNewInternationalTours } from '@/data/internationalTours';
import Link from 'next/link';
import { Globe, Plane, Star, Flame, Sparkles } from 'lucide-react';

export default function InternationalToursPage({
  searchParams,
}: {
  searchParams: {
    filter?: string;
    country?: string;
    sort?: string;
  };
}) {
  // Apply filters
  let filteredTours = [...internationalTours];

  if (searchParams.filter) {
    switch (searchParams.filter) {
      case 'popular':
        filteredTours = getPopularInternationalTours();
        break;
      case 'hot':
        filteredTours = getHotInternationalTours();
        break;
      case 'new':
        filteredTours = getNewInternationalTours();
        break;
    }
  }

  if (searchParams.country) {
    filteredTours = filteredTours.filter(tour => tour.country === searchParams.country);
  }

  // Apply sorting
  if (searchParams.sort) {
    switch (searchParams.sort) {
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
    }
  }

  // Get unique countries
  const countries = Array.from(new Set(internationalTours.map(tour => tour.country)));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-64 bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Международные туры
          </h1>
          <p className="text-xl">
            Путешествуйте по миру с Deldora Travel
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-3xl font-bold text-gold-500">{internationalTours.length}</p>
              <p className="text-gray-600 text-sm">Туров</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-3xl font-bold text-blue-500">{countries.length}</p>
              <p className="text-gray-600 text-sm">Стран</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-3xl font-bold text-green-500">{getPopularInternationalTours().length}</p>
              <p className="text-gray-600 text-sm">Популярных</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-3xl font-bold text-red-500">{getHotInternationalTours().length}</p>
              <p className="text-gray-600 text-sm">Горящих</p>
            </div>
          </div>
        </div>
      </section>

      {/* Country Filters */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-2 text-gold-500" />
            Популярные страны
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tours/international"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !searchParams.country
                  ? 'bg-gold-500 text-white'
                  : 'bg-white text-gray-600 border border-gold-200 hover:border-gold-300'
              }`}
            >
              Все страны
            </Link>
            {countries.map((country) => (
              <Link
                key={country}
                href={`/tours/international?country=${encodeURIComponent(country)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  searchParams.country === country
                    ? 'bg-gold-500 text-white'
                    : 'bg-white text-gray-600 border border-gold-200 hover:border-gold-300'
                }`}
              >
                {country}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Найдено: {filteredTours.length} тура
            </h2>
            <form method="get" className="flex items-center space-x-2">
              <span className="text-gray-600">Сортировать:</span>
              <select
                name="sort"
                defaultValue={searchParams.sort || 'default'}
                className="px-4 py-2 border border-gold-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
                <option value="duration">По продолжительности</option>
              </select>
              <button type="submit" className="px-3 py-2 rounded-lg bg-gold-500 text-white">OK</button>
            </form>
          </div>

          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={{ ...tour, country: tour.country }}
                  currency="USD"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Туров по вашему запросу не найдено
              </h3>
              <p className="text-gray-600 mb-8">
                Попробуйте изменить параметры поиска или выбрать другую страну
              </p>
              <Link
                href="/tours/international"
                className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all"
              >
                Показать все международные туры
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center">
            <Flame className="w-6 h-6 mr-2 text-red-500" />
            Горящие предложения
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getHotInternationalTours().slice(0, 3).map((tour) => (
              <TourCard
                key={tour.id}
                tour={{ ...tour, country: tour.country }}
                currency="USD"
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Tours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-2 text-purple-500" />
            Новые туры
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getNewInternationalTours().map((tour) => (
              <TourCard
                key={tour.id}
                tour={{ ...tour, country: tour.country }}
                currency="USD"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-gold-500 to-gold-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Не нашли подходящий тур?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Мы можем organized индивидуальный тур специально для вас
          </p>
          <Link
            href="/contacts"
            className="inline-block bg-white text-gold-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </div>
  );
}
