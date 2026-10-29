import Link from 'next/link';
import { Calendar, Eye, ArrowRight, Globe, Building2, Mountain, Plane, Flame } from 'lucide-react';

// Blog posts data
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
  },
  {
    id: 'travelling-with-children',
    title: 'Путешествия с детьми: советы и рекомендации',
    excerpt: 'Как сделать путешествие с детьми комфортным и запоминающимся.',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop',
    date: '1 Мая 2024',
    views: 1567,
    category: 'Советы',
    tags: ['Семья', 'Дети', 'Путешествия'],
    author: 'Дилшод Рахимов',
  },
  {
    id: 'maldives-travel-guide',
    title: 'Путеводитель по Мальдивам: все, что нужно знать',
    excerpt: 'Подробный путеводитель по Мальдивам для тех, кто мечтает о рае на земле.',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop',
    date: '25 Апреля 2024',
    views: 3421,
    category: 'Путеводители',
    tags: ['Мальдивы', 'Отдых', 'Пляж'],
    author: 'Гульнара Юлдашева',
  },
  {
    id: 'hiking-in-chatkal',
    title: 'Треkking в Чаткальских горах: маршруты и советы',
    excerpt: 'Лучшие маршруты для треkking в Чаткальских горах Узбекистана.',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop',
    date: '20 Апреля 2024',
    views: 654,
    category: 'Приключения',
    tags: ['Треkking', 'Горы', 'Приключения'],
    author: 'Ильхом Таджибаев',
  },
];

const categories = [
  { name: 'Все', count: blogPosts.length, icon: <Globe className="w-5 h-5" /> },
  { name: 'Путеводители', count: blogPosts.filter(p => p.category === 'Путеводители').length, icon: <Building2 className="w-5 h-5" /> },
  { name: 'История', count: blogPosts.filter(p => p.category === 'История').length, icon: <Building2 className="w-5 h-5" /> },
  { name: 'Советы', count: blogPosts.filter(p => p.category === 'Советы').length, icon: <Plane className="w-5 h-5" /> },
  { name: 'Приключения', count: blogPosts.filter(p => p.category === 'Приключения').length, icon: <Mountain className="w-5 h-5" /> },
];

const popularPosts = blogPosts
  .sort((a, b) => b.views - a.views)
  .slice(0, 3);

const recentPosts = blogPosts
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-64 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Блог
          </h1>
          <p className="text-xl">
            Полезные статьи и советы для путешественников
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`#${category.name.toLowerCase()}`}
                className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm font-medium border border-gold-100 hover:border-gold-200 hover:bg-gold-50 transition-all flex items-center"
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
                <span className="ml-2 px-2 py-0.5 bg-gold-500/10 text-gold-600 text-xs rounded-full">{category.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl p-1">
            <div className="bg-white rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <span className="inline-block px-4 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4">
                    Избранное
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{blogPosts[0].date}</span>
                    <Eye className="w-4 h-4 ml-4 mr-2" />
                    <span>{blogPosts[0].views} просмотров</span>
                  </div>
                  <Link
                    href={`/blog/${blogPosts[0].id}`}
                    className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all flex items-center"
                  >
                    Читать статью
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gold-100 group"
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gold-500 text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center ml-4">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-gold-500 font-medium hover:text-gold-600 transition-colors"
                  >
                    Читать дальше
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sidebar */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Popular Posts */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Flame className="w-5 h-5 mr-2 text-gold-500" />
                Популярные статьи
              </h2>
              <div className="space-y-4">
                {popularPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="flex items-center space-x-4 p-4 bg-white rounded-xl hover:shadow-lg transition-shadow border border-gold-100"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 line-clamp-1">{post.title}</h3>
                      <p className="text-gold-500 text-sm">{post.views} просмотров</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gold-500" />
                Последние статьи
              </h2>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="flex items-center space-x-4 p-4 bg-white rounded-xl hover:shadow-lg transition-shadow border border-gold-100"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 line-clamp-1">{post.title}</h3>
                      <p className="text-gray-500 text-sm">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Популярные теги
              </h2>
              <div className="flex flex-wrap gap-2">
                {['Узбекистан', 'Путешествия', 'Советы', 'Ташкент', 'Самарканд', 'Мальдивы', 'Турция', 'Отдых', 'История', 'Культура'].map((tag, index) => (
                  <Link
                    key={index}
                    href={`#${tag.toLowerCase()}`}
                    className="px-4 py-2 bg-gold-50 text-gold-600 rounded-full text-sm font-medium hover:bg-gold-100 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-gold-500 to-gold-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Подпишитесь на нашу рассылку
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Получайте последние новости, специальные предложения и полезные советы
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Введите ваш email"
                className="flex-1 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="bg-white text-gold-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Подписаться
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Готовы отправиться в путешествие?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Выберите один из наших туров или свяжитесь с нами для создания индивидуального маршрута
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 transition-all shadow-lg"
            >
              Посмотреть туры
            </Link>
            <Link
              href="/contacts"
              className="inline-block bg-white border-2 border-gold-200 text-gold-600 px-8 py-4 rounded-xl font-semibold hover:bg-gold-50 transition-all"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
