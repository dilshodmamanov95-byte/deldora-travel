'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Данные статей блога
const blogPosts = [
  {
    id: 'best-time-to-visit-uzbekistan',
    title: 'Лучшее время для посещения Узбекистана',
    excerpt: 'Узнайте, когда лучше всего посещать Узбекистан, чтобы насладиться его красотами в полной мере.',
    image: 'https://images.unsplash.com/photo-1604150484998-849905558838?q=80&w=800&auto=format&fit=crop',
    date: '15 Мая 2024',
    views: 1254,
    category: 'Путеводители',
    tags: ['Узбекистан', 'Путешествия', 'Советы'],
    author: 'Гульнара Юлдашева',
    status: 'published',
  },
  {
    id: 'top-10-places-in-tashkent',
    title: 'Топ 10 мест, которые нужно посетить в Ташкенте',
    excerpt: 'Путеводитель по самым интересным местам столицы Узбекистана.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
    date: '10 Мая 2024',
    views: 2345,
    category: 'Путеводители',
    tags: ['Ташкент', 'Достопримечательности', 'Путеводитель'],
    author: 'Ильхом Таджибаев',
    status: 'published',
  },
  {
    id: 'history-of-samarkand',
    title: 'История Самарканда: от древности до наших дней',
    excerpt: 'Узнайте о богатейшей истории одного из самых древних городов мира.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop',
    date: '5 Мая 2024',
    views: 876,
    category: 'История',
    tags: ['Самарканд', 'История', 'Культура'],
    author: 'Рустам Усманов',
    status: 'draft',
  },
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(blogPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetch('/api/content/blog-posts')
      .then((response) => response.json())
      .then((data) => { if (Array.isArray(data.docs) && data.docs.length) setPosts(data.docs as typeof blogPosts) })
      .catch(() => undefined)
  }, [])

  // Уникальные категории
  const categories = ['all', ...new Set(posts.map(p => p.category))];
  const statuses = ['all', 'published', 'draft'];

  // Фильтрация и поиск
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Пагинация
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Удаление статьи
  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту статью?')) return
    const response = await fetch(`/api/content/blog-posts?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    if (response.ok) setPosts((current) => current.filter((post) => post.id !== id))
  };

  // Смена статуса
  const toggleStatus = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: post.status === 'published' ? 'draft' : 'published' } : post
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Блог</h1>
          <p className="text-slate-400 text-sm">Управление статьями блога</p>
        </div>
        <Link
          href="/admin/blog/add"
          className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Добавить статью
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск статей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none"
          >
            <option value="all">Все категории</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none"
          >
            <option value="all">Все статусы</option>
            <option value="published">Опубликованные</option>
            <option value="draft">Черновики</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">ID</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Название</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Категория</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Автор</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Дата</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Просмотры</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Статус</th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm text-slate-300">
                    <code className="bg-slate-700 px-2 py-1 rounded text-xs">{post.id}</code>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-white">{post.title}</div>
                    <div className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-300">{post.author}</td>
                  <td className="px-4 py-4 text-sm text-slate-300">{post.date}</td>
                  <td className="px-4 py-4 text-sm text-slate-300">{post.views}</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleStatus(post.id)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        post.status === 'published' 
                          ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                          : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      }`}
                    >
                      {post.status === 'published' ? 'Опубликовано' : 'Черновик'}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="text-slate-400 hover:text-gold-400 transition-colors p-1 rounded hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
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
                <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                  Статьи не найдены
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredPosts.length > itemsPerPage && (
        <div className="flex items-center justify-between bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-sm text-slate-400">
            Показано {paginatedPosts.length} из {filteredPosts.length} статей
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
          <div className="text-2xl font-bold text-white">{posts.length}</div>
          <div className="text-sm text-slate-400">Всего статей</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-2xl font-bold text-gold-400">
            {posts.filter(p => p.status === 'published').length}
          </div>
          <div className="text-sm text-slate-400">Опубликованные</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-2xl font-bold text-gold-400">
            {posts.filter(p => p.status === 'draft').length}
          </div>
          <div className="text-sm text-slate-400">Черновики</div>
        </div>
      </div>
    </div>
  );
}
