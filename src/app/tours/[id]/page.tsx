'use client';

import { notFound } from 'next/navigation';
import { TourCard } from '@/components/ui/TourCard';
import { internationalTours } from '@/data/internationalTours';
import { domesticTours } from '@/data/domesticTours';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, MapPin, Plane, Users, Star, Heart, Share2, Phone, Mail } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';
import { localizedTags, localizedTourField, localizedText } from '@/i18n/content';

// Combine all tours for search
const allTours = [
  ...internationalTours.map(tour => ({ ...tour, type: 'international' as const })),
  ...domesticTours.map(tour => ({ ...tour, type: 'domestic' as const })),
];

export default function TourDetailPage({ params }: { params: { id: string } }) {
  // Find the tour by slug
  const { locale, dictionary } = useLocale();
  const tour = allTours.find(t => t.slug === params.id);

  if (!tour) {
    return notFound();
  }

  const tourTitle = localizedTourField(tour as unknown as Record<string, any>, 'title', locale);
  const tourShortDescription = localizedTourField(tour as unknown as Record<string, any>, 'shortDescription', locale);
  const tourDescription = localizedTourField(tour as unknown as Record<string, any>, 'description', locale);
  const tourPlace = localizedTourField(tour as unknown as Record<string, any>, 'country' in tour ? 'country' : 'region', locale);
  const detail = dictionary.tourDetail;

  // Get related tours (same type or similar tags)
  const relatedTours = allTours
    .filter(t => t.id !== tour.id && t.type === tour.type)
    .slice(0, 4);

  // Calculate average rating
  const avgRating = tour.rating;

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gold-500">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <Link href="/tours" className="hover:text-gold-500">
              Туры
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/tours/${tour.type === 'international' ? 'international' : 'domestic'}`} className="hover:text-gold-500">
              {tour.type === 'international' ? detail.international : detail.domestic}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{tourTitle}</span>
          </nav>
        </div>
      </section>

      {/* Tour Header */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Title and Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                    tour.isPopular
                      ? 'bg-gold-500 text-white'
                      : tour.isHot
                        ? 'bg-red-500 text-white'
                        : tour.isNew
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tour.isPopular && detail.popular}
                                        {tour.isHot && detail.hot}
                                        {tour.isNew && detail.new}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gold-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {tourTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gold-500" />
                  <span>{tourPlace}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gold-500" />
                  <span>{tour.duration} {dictionary.tour.days}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gold-500" />
                  <span>{tour.tourType === 'group' ? dictionary.tour.group : tour.tourType === 'individual' ? dictionary.tour.individual : dictionary.tour.both}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex text-gold-400 mr-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(avgRating) ? 'fill-current' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span>({tour.reviewCount} отзывов)</span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gold-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{detail.from}</p>
                    <p className="text-4xl font-bold text-gold-600">
                      ${tour.price.USD}
                      <span className="text-lg text-gold-500">/{detail.perPerson}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      ≈ {tour.price.UZS.toLocaleString('ru-RU')} UZS
                    </p>
                  </div>
                  {tour.oldPrice && (
                    <div className="text-right">
                      <p className="text-xl text-gray-400 line-through">
                        ${tour.oldPrice.USD}
                      </p>
                      <p className="text-sm text-green-500 font-medium">
                        -{Math.round(((tour.oldPrice.USD - tour.price.USD) / tour.oldPrice.USD) * 100)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="w-full sm:flex-1 bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all shadow-lg">
                  Забронировать тур
                </button>
                <Link
                  href="/contacts"
                  className="w-full sm:flex-1 bg-white border-2 border-gold-200 text-gold-600 px-8 py-4 rounded-xl font-semibold hover:bg-gold-50 transition-all text-center"
                >
                  Уточнить детали
                </Link>
              </div>
            </div>

            {/* Main Image */}
            <div className="lg:sticky lg:top-24">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={tour.images[0]}
                  alt={tourTitle}
                  className="w-full h-96 lg:h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {tour.images.slice(1, 3).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${tourTitle} ${index + 2}`}
                    className="w-full h-32 object-cover rounded-xl"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Description */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                О туре
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg mb-6">{tourShortDescription}</p>
                <p className="mb-4">{tourDescription.split('\n\n')[0]}</p>
                <p>{tourDescription.split('\n\n')[1]}</p>
              </div>

              {/* Highlights */}
              {'highlights' in tour && tour.highlights && tour.highlights.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Что включено в тур
                  </h3>
                  <ul className="space-y-3">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-gold-500 rounded-full mr-3"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Included/Excluded */}
              {'included' in tour && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Включено
                    </h3>
                    <ul className="space-y-2">
                      {tour.included.map((item, index) => (
                        <li key={index} className="text-gray-600 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {localizedText(item, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Не включено
                    </h3>
                    <ul className="space-y-2">
                      {tour.excluded.map((item, index) => (
                        <li key={index} className="text-gray-600 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {localizedText(item, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Best For */}
              {'bestFor' in tour && tour.bestFor && tour.bestFor.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Подходит для
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tour.bestFor.map((item, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gold-50 text-gold-600 rounded-full text-sm font-medium"
                      >
                        {localizedText(item, locale)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Информация о туре
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-3" />
                      <span>{detail.duration}</span>
                    </div>
                    <span className="font-medium">{tour.duration} дн.</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-3" />
                      <span>{detail.tourType}</span>
                    </div>
                    <span className="font-medium">
                      {tour.tourType === 'group' ? dictionary.tour.group : tour.tourType === 'individual' ? dictionary.tour.individual : dictionary.tour.both}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3" />
                      <span>{detail.direction}</span>
                    </div>
                    <span className="font-medium">{tourPlace}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-5 h-5 mr-3" />
                      <span>{detail.from}</span>
                    </div>
                    <span className="font-bold text-gold-600">${tour.price.USD}</span>
                  </div>

                  {'departureCity' in tour && (
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div className="flex items-center text-gray-600">
                        <Plane className="w-5 h-5 mr-3" />
                        <span>{detail.departure}</span>
                      </div>
                      <span className="font-medium">{tour.departureCity}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3" />
                      <span>{detail.season}</span>
                    </div>
                    <span className="font-medium">{tour.season.join(', ')}</span>
                  </div>
                </div>

                {/* Tags */}
                {tour.tags && tour.tags.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Теги
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {localizedTags(tour.tags, locale).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white text-gray-600 text-sm rounded-full border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="mt-6 bg-white rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Узнайте больше
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Свяжитесь с нами, чтобы уточнить детали или забронировать тур
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="tel:+998991234567"
                      className="flex items-center justify-center bg-gold-500 text-white px-4 py-3 rounded-xl font-medium hover:bg-gold-600 transition-all"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Позвонить
                    </Link>
                    <Link
                      href="mailto:info@deldora-travel.uz"
                      className="flex items-center justify-center bg-white border border-gold-200 text-gold-600 px-4 py-3 rounded-xl font-medium hover:bg-gold-50 transition-all"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Написать
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      {'itinerary' in tour && tour.itinerary && tour.itinerary.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
              Маршрут тура
            </h2>
            <div className="space-y-4">
              {tour.itinerary.map((day, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gold-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      День {day.day}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{localizedText(day.title, locale)}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{localizedText(day.description, locale)}</p>
                  {'activities' in day && day.activities && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Активности:
                      </h4>
                      <ul className="list-disc list-inside text-gray-600">
                        {day.activities.map((activity, i) => (
                          <li key={i}>{localizedText(activity, locale)}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {'meals' in day && day.meals && day.meals.length > 0 && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>{detail.meals}: {day.meals.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
              Похожие туры
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={{ ...tour, country: 'country' in tour ? tour.country : tour.region }}
                  currency="USD"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-gold-500 to-gold-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы забронировать?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Свяжитесь с нами прямо сейчас!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacts"
              className="inline-block bg-white text-gold-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Забронировать
            </Link>
            <Link
              href="/contacts"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Уточнить детали
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
