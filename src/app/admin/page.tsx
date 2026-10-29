'use client';

import Link from 'next/link';
import { 
  LayoutDashboard, 
  Plane, 
  Bus, 
  FileText, 
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Globe
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { internationalTours } from '@/data/internationalTours';
import { domesticTours } from '@/data/domesticTours';

// Type for tour - extended to include all possible fields from both international and domestic tours
interface Tour {
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
  rating?: number;
  reviewCount?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  tourType?: 'group' | 'individual' | 'both';
  season?: string[];
  images?: string[];
  thumbnail?: string;
  description?: string;
  shortDescription?: string;
  itinerary?: any[];
  included?: string[];
  excluded?: string[];
  highlights?: string[];
  bestFor?: string[];
  departureCity?: string;
  airline?: string;
  hotel?: any;
  isPopular?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  tags?: string[];
  bookings?: number;
}

export default function AdminDashboardPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [stats, setStats] = useState({
    totalTours: 0,
    internationalTours: 0,
    domesticTours: 0,
    totalRevenue: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  // Load tours data
  useEffect(() => {
    // Combine international and domestic tours
    const allTours: Tour[] = [
      ...internationalTours.map(t => ({ ...t, country: t.country || t.destination })),
      ...domesticTours.map(t => ({ ...t, region: t.region || t.destination })),
    ];
    
    setTours(allTours);
    
    const international = allTours.filter(t => t.country);
    const domestic = allTours.filter(t => t.region && !t.country);
    
    setStats({
      totalTours: allTours.length,
      internationalTours: international.length,
      domesticTours: domestic.length,
      totalRevenue: allTours.reduce((sum, tour) => sum + (tour.price?.USD || 0) * (tour.bookings || 0), 0),
      totalBookings: allTours.reduce((sum, tour) => sum + (tour.bookings || 0), 0),
    });
    setLoading(false);
  }, []);

  // Popular tours
  const popularTours = [
    ...tours,
  ]
    .sort((a, b) => (b.bookings || 0) - (a.bookings || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h1 className="text-2xl font-bold text-white mb-2">Загрузка...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h1 className="text-2xl font-bold text-white mb-2">Дашбоард</h1>
        <p className="text-slate-400">Добро пожаловать в админ-панель Deldora Travel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-gold-500 transition-colors">
          <div className="flex items-center text-slate-400 mb-2">
            <Plane className="w-5 h-5 mr-2" />
            <span className="text-sm">Всего туров</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalTours}</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-gold-500 transition-colors">
          <div className="flex items-center text-slate-400 mb-2">
            <Globe className="w-5 h-5 mr-2" />
            <span className="text-sm">Междунар.</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.internationalTours}</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-gold-500 transition-colors">
          <div className="flex items-center text-slate-400 mb-2">
            <Bus className="w-5 h-5 mr-2" />
            <span className="text-sm">По Узбекистану</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.domesticTours}</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-gold-500 transition-colors">
          <div className="flex items-center text-slate-400 mb-2">
            <DollarSign className="w-5 h-5 mr-2" />
            <span className="text-sm">Доход, $</span>
          </div>
          <div className="text-2xl font-bold text-gold-400">${stats.totalRevenue.toLocaleString()}</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-gold-500 transition-colors">
          <div className="flex items-center text-slate-400 mb-2">
            <Users className="w-5 h-5 mr-2" />
            <span className="text-sm">Бронирований</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalBookings.toLocaleString()}</div>
        </div>
      </div>

      {/* Popular Tours */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Популярные туры</h2>
          <Link href="/admin/tours" className="text-gold-400 hover:text-gold-300 text-sm flex items-center">
            Все туры <span className="ml-1">→</span>
          </Link>
        </div>
        <div className="space-y-3">
          {popularTours.map((tour) => (
            <div key={tour.id} className="flex items-center p-3 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="w-12 h-12 bg-slate-600 rounded-lg mr-3 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{tour.title}</div>
                <div className="text-slate-400 text-sm">{tour.destination}</div>
              </div>
              <div className="text-gold-400 font-semibold">${tour.price?.USD}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/admin/tours" className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-gold-500 transition-colors group">
          <div className="flex items-center text-slate-400 mb-2">
            <Plane className="w-5 h-5 mr-2 group-hover:text-gold-400 transition-colors" />
            <span>Управление турами</span>
          </div>
          <p className="text-slate-500 text-sm">Добавляйте и редактируйте туры</p>
        </Link>

        <Link href="/admin/blog" className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-gold-500 transition-colors group">
          <div className="flex items-center text-slate-400 mb-2">
            <FileText className="w-5 h-5 mr-2 group-hover:text-gold-400 transition-colors" />
            <span>Блог</span>
          </div>
          <p className="text-slate-500 text-sm">Управляйте статьями блога</p>
        </Link>

        <Link href="/admin/settings" className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-gold-500 transition-colors group">
          <div className="flex items-center text-slate-400 mb-2">
            <Settings className="w-5 h-5 mr-2 group-hover:text-gold-400 transition-colors" />
            <span>Настройки</span>
          </div>
          <p className="text-slate-500 text-sm">Настройки сайта и контакты</p>
        </Link>
      </div>
    </div>
  );
}
