'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Bus, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';
import { domesticTours, type DomesticTour } from '@/data/domesticTours';

// Тип для внутреннего тура
export default function AdminDomesticToursPage() {
  const [tours, setTours] = useState<DomesticTour[]>(domesticTours);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetch('/api/content/domestic-tours')
      .then((response) => response.json())
      .then((data) => { if (Array.isArray(data.docs) && data.docs.length) setTours(data.docs as DomesticTour[]) })
      .catch(() => undefined)
  }, [])

  // Уникальные регионы для фильтра
  const regions = ['all', ...new Set(tours.map(t => t.region))];

  // Фильтрация и поиск
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tour.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterRegion === 'all' || tour.region === filterRegion;
    return matchesSearch && matchesFilter;
  });

  // Пагинация
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Удаление тура
  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот тур?')) return
    const response = await fetch(`/api/content/domestic-tours?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    if (response.ok) setTours((current) => current.filter((tour) => tour.id !== id))
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Внутренние туры</h1>
          <p className="text-slate-400 text-sm">Управление турами по Узбекистану</p>
        </div>
        <Link
          href="/admin/tours/domestic/add"
          className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Добавить тур
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск туров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none"
          >
            <option value="all">Все регионы</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">ID</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Название</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Регион</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Цена (USD)</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Рейтинг</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Бронирования</th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTours.length > 0 ? (
              paginatedTours.map((tour) => (
                <tr
                  key={tour.id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm text-slate-300">
                    <code className="bg-slate-700 px-2 py-1 rounded text-xs">{tour.id}</code>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-white">{tour.title}</div>
                    <div className="text-xs text-slate-400">{tour.destination}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-300">{tour.region}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gold-400">${tour.price.USD}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gold-400 mr-1" />
                      <span className="text-sm text-slate-300">{tour.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-300">{tour.bookings}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/tours/domestic/edit/${tour.id}`}
                        className="text-slate-400 hover:text-gold-400 transition-colors p-1 rounded hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-slate-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  Туры не найдены
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredTours.length > itemsPerPage && (
        <div className="flex items-center justify-between bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-sm text-slate-400">
            Показано {paginatedTours.length} из {filteredTours.length} туров
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>
            <span className="text-sm text-white">
              Страница {currentPage} из {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-2xl font-bold text-white">{tours.length}</div>
          <div className="text-sm text-slate-400">Всего туров</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-2xl font-bold text-gold-400">
            ${tours.reduce((sum, tour) => sum + tour.price.USD, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">Средняя цена</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-2xl font-bold text-gold-400">
            {tours.reduce((sum, tour) => sum + tour.rating, 0) / tours.length || 0}
          </div>
          <div className="text-sm text-slate-400">Средний рейтинг</div>
        </div>
      </div>
    </div>
  );
}
