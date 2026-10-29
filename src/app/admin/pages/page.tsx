'use client';

import Link from 'next/link';
import { FileText, Edit, Eye, Settings, Plus } from 'lucide-react';

export default function AdminPagesPage() {
  // Данные страниц
  const pages = [
    {
      id: 'home',
      title: 'Главная страница',
      route: '/',
      lastUpdated: '2 дня назад',
      isActive: true,
      sections: ['Hero', 'Поиск туров', 'Популярные туры', 'Горящие предложения', 'Новые туры'],
    },
    {
      id: 'about',
      title: 'О нас',
      route: '/about',
      lastUpdated: '5 дней назад',
      isActive: true,
      sections: ['О компании', 'Наша команда', 'Партнеры', 'Сертификаты'],
    },
    {
      id: 'tours',
      title: 'Все туры',
      route: '/tours',
      lastUpdated: '1 день назад',
      isActive: true,
      sections: ['Фильтры', 'Список туров', 'Фильтрация и сортировка'],
    },
    {
      id: 'tours-international',
      title: 'Международные туры',
      route: '/tours/international',
      lastUpdated: '1 день назад',
      isActive: true,
      sections: ['Фильтры по странам', 'Список международных туров'],
    },
    {
      id: 'tours-domestic',
      title: 'Внутренние туры',
      route: '/tours/domestic',
      lastUpdated: '1 день назад',
      isActive: true,
      sections: ['Фильтры по регионам', 'Список внутренних туров'],
    },
    {
      id: 'contacts',
      title: 'Контакты',
      route: '/contacts',
      lastUpdated: '1 неделя назад',
      isActive: true,
      sections: ['Контактная форма', 'Контактная информация', 'Карта'],
    },
    {
      id: 'blog',
      title: 'Блог',
      route: '/blog',
      lastUpdated: '2 дня назад',
      isActive: true,
      sections: ['Список статей', 'Категории', 'Поиск'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Управление страницами</h1>
          <p className="text-slate-400 text-sm">Настройка всех страниц сайта</p>
        </div>
        <Link
          href="/admin/pages/edit/home"
          className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Новая страница
        </Link>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-gold-500 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gold-400 mr-3" />
                <h3 className="font-semibold text-white">{page.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                page.isActive 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-red-500/10 text-red-400'
              }`}>
                {page.isActive ? 'Активна' : 'Неактивна'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-slate-400">
                <span className="text-slate-500">Маршрут:</span> {page.route}
              </p>
              <p className="text-sm text-slate-400">
                <span className="text-slate-500">Обновлено:</span> {page.lastUpdated}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-700">
              <p className="text-xs text-slate-500 line-clamp-1">
                Секции: {page.sections.join(', ')}
              </p>
              <Link
                href={`/admin/pages/edit/${page.id}`}
                className="text-slate-400 hover:text-gold-400 transition-colors flex items-center"
              >
                <Edit className="w-4 h-4 mr-1" />
                Редактировать
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-2xl font-bold text-white">{pages.length}</div>
          <div className="text-sm text-slate-400">Всего страниц</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-2xl font-bold text-gold-400">
            {pages.filter(p => p.isActive).length}
          </div>
          <div className="text-sm text-slate-400">Активные страницы</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-2xl font-bold text-gold-400">
            {pages.reduce((sum, page) => sum + page.sections.length, 0)}
          </div>
          <div className="text-sm text-slate-400">Всего секций</div>
        </div>
      </div>

      {/* Page Preview Section */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-4">Предпросмотр страницы</h2>
        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="text-center text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-4 text-slate-500" />
            <p className="mb-2">Выберите страницу для предпросмотра</p>
            <p className="text-sm text-slate-500">Здесь будет отображаться содержимое выбранной страницы</p>
          </div>
        </div>
      </div>
    </div>
  );
}
