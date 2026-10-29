import { TourCard } from '@/components/ui/TourCard';
import { domesticTours, getPopularDomesticTours } from '@/data/domesticTours';
import Link from 'next/link';
import { MapPin, Star, TrendingUp, Mountain, Building2, Clock } from 'lucide-react';

export default function DomesticToursPage({
  searchParams,
}: {
  searchParams: {
    filter?: string;
    region?: string;
    sort?: string;
  };
}) {
  // Apply filters
  let filteredTours = [...domesticTours];

  if (searchParams.filter) {
    switch (searchParams.filter) {
      case 'popular':
        filteredTours = getPopularDomesticTours();
        break;
    }
  }

  if (searchParams.region) {
    filteredTours = filteredTours.filter(tour => tour.region === searchParams.region);
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

  // Get unique regions
  const regions = Array.from(new Set(domesticTours.map(tour => tour.region)));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-64 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Туры по Узбекистану
          </h1>
          <p className="text-xl">
            Откройте для себя красоту своей страны
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-3xl font-bold text-gold-500">{domesticTours.length}</p>
              <p className="text-gray-600 text-sm">Туров</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-3xl font-bold text-green-500">{regions.length}</p>
              <p className="text-gray-600 text-sm">Регионов</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-3xl font-bold text-blue-500">{getPopularDomesticTours().length}</p>
              <p className="text-gray-600 text-sm">Популярных</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-3xl font-bold text-purple-500">100%</p>
              <p className="text-gray-600 text-sm">Удовлетворенность</p>
            </div>
          </div>
        </div>
      </section>

      {/* Region Filters */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-gold-500" />
            Популярные регионы
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tours/domestic"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !searchParams.region
                  ? 'bg-gold-500 text-white'
                  : 'bg-white text-gray-600 border border-gold-200 hover:border-gold-300'
              }`}
            >
              Все регионы
            </Link>
            {regions.map((region) => (
              <Link
                key={region}
                href={`/tours/domestic?region=${encodeURIComponent(region)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  searchParams.region === region
                    ? 'bg-gold-500 text-white'
                    : 'bg-white text-gray-600 border border-gold-200 hover:border-gold-300'
                }`}
              >
                {region}
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
                  tour={{ ...tour, country: tour.region }}
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
                Попробуйте изменить параметры поиска или выбрать другой регион
              </p>
              <Link
                href="/tours/domestic"
                className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all"
              >
                Показать все туры по Узбекистану
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Popular Tours */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 mr-2 text-gold-500" />
            Популярные туры по Узбекистану
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getPopularDomesticTours().map((tour) => (
              <TourCard
                key={tour.id}
                tour={{ ...tour, country: tour.region }}
                currency="USD"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tour Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
            Типы туров
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Historical Tours */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                Исторические туры
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Посетите древние города Узбекистана с богатым культурным наследием
              </p>
              <div className="flex justify-center">
                <Link
                  href="/tours/domestic/golden-ring-8-days"
                  className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all"
                >
                  Узнать больше
                </Link>
              </div>
            </div>

            {/* Adventure Tours */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mountain className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                Приключенческие туры
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Треkking, альпинизм, горные походы в Чаткальских горах
              </p>
              <div className="flex justify-center">
                <Link
                  href="/tours/domestic/chatkal-3-days"
                  className="inline-block bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-700 transition-all"
                >
                  Узнать больше
                </Link>
              </div>
            </div>

            {/* Short Tours */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                Краткосрочные туры
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Идеальный вариант для weekend или короткого отдыха
              </p>
              <div className="flex justify-center">
                <Link
                  href="/tours/domestic"
                  className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-700 transition-all"
                >
                  Узнать больше
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-green-500 to-emerald-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Откройте для себя Узбекистан!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Наша страна полна удивительных мест, которые стоит посетить
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours/domestic/golden-ring-8-days"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Золотой Кольцо Узбекистана
            </Link>
            <Link
              href="/contacts"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
