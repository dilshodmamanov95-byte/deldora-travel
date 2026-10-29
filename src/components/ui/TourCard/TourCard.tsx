'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Star, Calendar, Users, MapPin, Plane, Bus, DollarSign, Euro } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';
import { localizedTourField } from '@/i18n/content';

interface TourCardProps {
  tour: {
    id: string;
    title: string;
    slug: string;
    destination: string;
    country?: string;
    region?: string;
    duration: number;
    price: {
      UZS: number;
      USD: number;
      EUR: number;
    };
    oldPrice?: {
      UZS: number;
      USD: number;
      EUR: number;
    };
    rating: number;
    reviewCount: number;
    thumbnail: string;
    shortDescription: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    tourType?: 'group' | 'individual' | 'both';
    isPopular?: boolean;
    isHot?: boolean;
    isNew?: boolean;
    tags?: string[];
    departureCity?: string;
    airline?: string;
  };
  currency: 'UZS' | 'USD' | 'EUR' | 'RUB';
}

export const TourCard = ({ tour, currency }: TourCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { locale, dictionary } = useLocale();
  const t = dictionary.tour;
  const localizedTitle = localizedTourField(tour as unknown as Record<string, any>, 'title', locale);
  const localizedDescription = localizedTourField(tour as unknown as Record<string, any>, 'shortDescription', locale);
  const localizedPlace = localizedTourField(tour as unknown as Record<string, any>, tour.country ? 'country' : 'region', locale);

  const getPrice = (curr: string) => {
    switch (curr) {
      case 'UZS':
        return tour.price.UZS.toLocaleString('ru-RU');
      case 'USD':
        return `$${tour.price.USD}`;
      case 'EUR':
        return `€${tour.price.EUR}`;
      case 'RUB':
        return `₽${Math.round(tour.price.USD * 90)}`; // Approximate conversion
      default:
        return `$${tour.price.USD}`;
    }
  };

  const getOldPrice = (curr: string) => {
    if (!tour.oldPrice) return null;
    switch (curr) {
      case 'UZS':
        return tour.oldPrice.UZS.toLocaleString('ru-RU');
      case 'USD':
        return `$${tour.oldPrice.USD}`;
      case 'EUR':
        return `€${tour.oldPrice.EUR}`;
      case 'RUB':
        return `₽${Math.round(tour.oldPrice.USD * 90)}`;
      default:
        return `$${tour.oldPrice.USD}`;
    }
  };

  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case 'UZS': return '₩';
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'RUB': return '₽';
      default: return '$';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/10 text-green-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'hard': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getTourTypeIcon = (type?: string) => {
    switch (type) {
      case 'group': return <Users className="w-4 h-4" />;
      case 'individual': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const discount = tour.oldPrice ? Math.round(
    ((tour.oldPrice.USD - tour.price.USD) / tour.oldPrice.USD) * 100
  ) : 0;

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        {tour.isPopular && (
          <span className="px-3 py-1 bg-gold-500 text-white text-xs font-bold rounded-full">
            {t.popular}
          </span>
        )}
        {tour.isHot && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            {t.hot}
          </span>
        )}
        {tour.isNew && (
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
            {t.new}
          </span>
        )}
        {discount > 0 && (
          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-red-500/10 transition-all group-hover:bg-white"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.thumbnail}
          alt={localizedTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1 line-clamp-1">{localizedTitle}</h3>
          <p className="text-sm opacity-90 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {localizedPlace}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <p className="text-gray-600 line-clamp-2 mb-3">{localizedDescription}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {tour.duration} {t.days}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              {getTourTypeIcon(tour.tourType)}
              {tour.tourType === 'group' ? t.group : tour.tourType === 'individual' ? t.individual : t.both}
            </div>
            {tour.difficulty && (
              <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(tour.difficulty)}`}>
                {tour.difficulty === 'easy' ? t.easy : tour.difficulty === 'medium' ? t.medium : t.hard}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex text-gold-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'fill-current' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm">{tour.reviewCount} {tour.reviewCount === 1 ? t.review : t.reviews}</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gold-500">
                  {getPrice(currency)}
                </span>
                <span className="text-sm text-gray-500 ml-1">{getCurrencySymbol(currency)}</span>
              </div>
              {tour.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {getOldPrice(currency)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-6 pb-6">
          <Link
            href={`/tours/${tour.country ? 'international' : 'domestic'}/${tour.slug}`}
            className="block w-full text-center bg-gradient-to-r from-gold-400 to-gold-600 text-white py-3 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl"
          >
            {t.details}
          </Link>
        </div>
      </div>
    </div>
  );
};
