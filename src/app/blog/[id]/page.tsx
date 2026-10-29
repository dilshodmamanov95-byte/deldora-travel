import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Eye, ArrowLeft, Clock, Share2 } from 'lucide-react';

// Blog posts data (same as in blog/page.tsx)
const blogPosts = [
  {
    id: 'best-time-to-visit-uzbekistan',
    title: 'Лучшее время для посещения Узбекистана',
    content: `
      # Лучшее время для посещения Узбекистана

      Узбекистан - это страна с уникальным климатом и разнообразными ландшафтами. 
      Выбор правильного времени для поездки может значительно повлиять на ваши 
      впечатления от путешествия.

      ## Весна (март - май)

      **Весна** - это, пожалуй, **лучшее время** для посещения Узбекистана. 
      Погода в это время года мягкая и комфортная:

      - Температура: +15°C до +25°C
      - Идеальное время для экскурсий
      - Природа расцветает
      - Меньше туристов
      - Отлично подходит для посещения всех регионов

      **Плюсы:**
      - Комфортная температура для прогулок
      - Цветущие сады и парки
      - Идеальные условия для фотографии

      **Минусы:**
      - Возможны дожди в марте-апреле
      - В начале марта в некоторых регионах может быть прохладно

      ## Лето (июнь - август)

      Лето в Узбекистане **жаркое и сухое**, особенно в центральных регионах:

      - Температура: +30°C до +45°C
      - Солнечная погода
      - Идеально для горных регионов (Чаткальские горы)

      **Плюсы:**
      - Отличное время для отдыха в горах
      - Возможность купаться в водохранилищах
      - Долгий световой день

      **Минусы:**
      - Очень жарко в Ташкенте, Самарканде, Бухаре
      - Не рекомендуется для экскурсий в дневное время
      - Высокая загруженность отелей

      **Совет:** Если вы планируете поездку летом, выбирайте горные регионы или 
      путешествуйте рано утром и вечером.

      ## Осень (сентябрь - ноябрь)

      **Осень** - это **второе лучшее время** для посещения Узбекистана:

      - Температура: +20°C до +30°C в сентябре, +10°C до +20°C в октябре-ноябре
      - Идеальная погода для экскурсий
      - Сбор урожая и фестивали
      - Меньше туристов

      **Плюсы:**
      - Комфортная температура
      - Великолепные осенние пейзажи
      - Saison фруктов и вина
      - Отличное время для треkking

      **Минусы:**
      - В ноябре может быть прохладно в вечернее время
      - В конце ноября начинается сезон дождей

      ## Зима (декабрь - февраль)

      Зима в Узбекистане **прохладная, но не суровая**:

      - Температура: 0°C до +10°C
      - Снег в горах, дожди в равнинных регионах
      - Низкий туристический сезон

      **Плюсы:**
      - Самые низкие цены на туры
      - Отличное время для лыжного отдыха в Чаткальских горах
      - Меньше туристов в достопримечательностях

      **Минусы:**
      - Не все достопримечательности работают в полной мере
      - Короткий световой день
      - Прохладная погода для прогулок

      ## лучшие месяцы для поездки

      | Месяц | Ташкент | Самарканд | Бухара | Хива | Чаткальские горы |
      |-------|---------|-----------|--------|------|-----------------|
      | Апрель | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
      | Май | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
      | Сентябрь | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
      | Октябрь | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

      ## Вывод

      **Лучшее время для посещения Узбекистана:** **апрель-май и сентябрь-октябрь**
      
      Это периоды, когда погода максимально комфортна для осмотра достопримечательностей,
      а природные условия идеальны для путешествий.

      Если вы планируете поездку в горы, то летние месяцы (июнь-август) будут отличным 
      выбором.

      Если вас не пугает жара, и вы хотите сэкономить, то июль-август может быть хорошим 
      вариантом, особенно если вы будете проводить большую часть времени в кондиционируемых 
      помещениях или в горах.
    `,
    excerpt: 'Узнайте, когда лучше всего посещать Узбекистан, чтобы насладиться его красотами в полной мере.',
    image: 'https://images.unsplash.com/photo-1604150484998-849905558838?q=80&w=800&auto=format&fit=crop',
    date: '15 Мая 2024',
    views: 1254,
    category: 'Путеводители',
    tags: ['Узбекистан', 'Путешествия', 'Советы'],
    author: 'Гульнара Юлдашева',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    readingTime: '8 мин',
  },
  {
    id: 'top-10-places-in-tashkent',
    title: 'Топ 10 мест, которые нужно посетить в Ташкенте',
    content: `
      # Топ 10 мест, которые нужно посетить в Ташкенте

      Ташкент - это удивительный город, где современность и древность переплетаются 
      в уникальной гармонии. Столица Узбекистана предлагает множество достопримечательностей,
      которые стоит посетить.

      ## 1. Площадь Независимости (Мустакиллик Майдони)

      **Площадь Независимости** - это серdце Ташкента и символ независимости Узбекистана.
      
      - **Что посмотреть:**
        - Монумент Независимости
        - Глобус с картой Узбекистана
        - Фонтаны и красивые аллеи
        - Ночное освещение

      - **Советы:**
        - Лучше всего посещать вечером, когда включается освещение
        - Отличное место для фотографий
        - Рядом расположены многие другие достопримечательности

      ## 2. Комплекс Хазрати Имам

      **Хазрати Имам** - это религиозный комплекс, который является духовным центром 
      Ташкента.

      - **Что посмотреть:**
        - Мечеть Барак-Хан
        - Медресе Муйи Муборак
        - Библиотека Муйи Муборак (хранится Коран 7 века)
        - Мавзолей Каффал Шаши

      - **Интересные факты:**
        - В библиотеке хранится одна из старейших копий Корана
        - Комплекс был построен в 16 веке

      ## 3. Ташкентское метро

      **Ташкентское метро** считается одним из самых красивых в мире.

      - **Что посмотреть:**
        - Станция "Космонавтов" (с мозаикой на космическую тематику)
        - Станция "Алишера Навои" (с великолепными орнаментами)
        - Станция "Чиланзар" (с уникальными светильниками)

      - **Советы:**
        - Поездка на метро стоит очень дешево
        - Можно купить сувенирный жетон
        - Фотографировать разрешено

      ## 4. Театр оперы и балета имени Алишера Навои

      **Театр оперы и балета** - это одно из самых красивых зданий в Ташкенте.

      - **Что посмотреть:**
        - Архитектура здания
        - Интерьеры театра
        - памятник Алишеру Навои

      - **Советы:**
        - Если есть возможность, посетите спектакль
        - Экскурсии по театру проводятся регулярно

      ## 5. Площадь Амира Темура

      **Площадь Амира Темура** - это одна из центральных площадей Ташкента.

      - **Что посмотреть:**
        - Памятник Амиру Темуру (Тамерлану)
        - Музей Тамерлана
        - Здание Театра имени Мукими

      - **Интересные факты:**
        - Памятник Амиру Темуру был установлен в 1996 году
        - Музей размещен в историческом здании

      ## 6. Базар Чорсу

      **Чорсу** - это один из самых старых и больших базаров в Ташкенте.

      - **Что посмотреть:**
        - Традиционные узбекские товары
        - Фрукты и овощи
        - Специи и пряности
        - Сувениры

      - **Советы:**
        - Отличное место для покупки сувениров
        - Можно попробовать местные деликатесы
        - Торговаться принято

      ## 7. Парк Амира Темура

      **Парк Амира Темура** - это один из самых красивых парков Ташкента.

      - **Что посмотреть:**
        - Аллеи с деревьями
        - Фонтаны
        - Памятник Амиру Темуру
        - Музей Тамерлана

      - **Советы:**
        - Отличное место для отдыха
        - Можно прокатиться на велосипеде
        - Возле парка расположены многие кафе

      ## 8. Улица Бродвея (Саяба/company)

      **Улица Бродвея** (официально - улица Саяба/company) - это пешеходная улица 
      с множеством кафе и магазинов.

      - **Что посмотреть:**
        - Кафе и рестораны
        - Магазины
        - Уличные музыканты
        - Фонтаны

      - **Советы:**
        - Отличное место для прогулок
        - Можно попробовать разные блюда узбекской кухни
        - Вечером проходитярмарка

      ## 9. Телевизионная башня

      **Телевизионная башня** - это одна из достопримечательностей Ташкента.

      - **Что посмотреть:**
        - Сама башня (высота 375 метров)
        - Смотровая площадка
        - Ресторан на высоте

      - **Интересные факты:**
        - Башня была построена в 1985 году
        - Это самая высокая башня в Центральной Азии

      ## 10. Чарвакское водохранилище

      **Чарвакское водохранилище** - это одно из самых популярных мест отдыха 
      возле Ташкента.

      - **Что посмотреть:**
        - Водохранилище
        - Горные пейзажи
        - Пляжи
        - Кафе и рестораны

      - **Советы:**
        - Отличное место для отдыха от городской суеты
        - Можно покататься на лодке
        - Отлично подходит для пикников

      ## Вывод

      Ташкент предлагает огромное количество достопримечательностей для всех вкусов.
      От исторических памятников до современных развлечений - в этом городе каждый 
      найдет что-то для себя.
      
      **Совет:** Планируйте хотя бы 3-4 дня для осмотра основных достопримечательностей
      Ташкента.
    `,
    excerpt: 'Путеводитель по самым интересным местам столицы Узбекистана.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
    date: '10 Мая 2024',
    views: 2345,
    category: 'Путеводители',
    tags: ['Ташкент', 'Достопримечательности', 'Путеводитель'],
    author: 'Ильхом Таджибаев',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    readingTime: '12 мин',
  },
  {
    id: 'history-of-samarkand',
    title: 'История Самарканда: от древности до наших дней',
    content: `# История Самарканда

    ## Древний период

    Самарканд - один из старейших городов мира. Его история насчитывает более 2500 лет.
    
    ## Средние века

    В средние века Самарканд стал важным центром на Великом Шелковом пути.
    
    ## Эпоха Тамерлана

    Амир Темур (Тамерлан) сделал Самарканд столицей своей огромной империи.
    
    ## Современность

    Сегодня Самарканд - это важный туристический центр Узбекистана.
    `,
    excerpt: 'Узнайте о богатейшей истории одного из самых древних городов мира.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop',
    date: '5 Мая 2024',
    views: 876,
    category: 'История',
    tags: ['Самарканд', 'История', 'Культура'],
    author: 'Рустам Усманов',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    readingTime: '15 мин',
  },
];

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === params.id);

  if (!post) {
    return notFound();
  }

  // Extract content parts for rendering
  const contentParts = post.content.split('\n\n').filter(part => part.trim() !== '');

  // Related posts (same category or tags)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);

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
            <Link href="/blog" className="hover:text-gold-500">
              Блог
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Post Header */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <article>
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center justify-between mb-8">
                <div className="flex items-center space-x-4 text-gray-500">
                  <Link href={`/blog?author=${encodeURIComponent(post.author)}`} className="flex items-center">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-10 h-10 rounded-full mr-3"
                      loading="lazy"
                    />
                    <span className="text-gray-800 font-medium">{post.author}</span>
                  </Link>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readingTime} чтения</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{post.views} просмотров</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Поделиться:</span>
                  <button className="p-2 text-gray-400 hover:text-gold-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Category and Tags */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="px-4 py-1 bg-gold-500 text-white text-sm font-medium rounded-full">
                  {post.category}
                </span>
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gold-50 text-gold-600 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="prose max-w-none">
              {contentParts.map((part, index) => {
                // Handle headers
                if (part.startsWith('# ')) {
                  return (
                    <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-800 mt-8 mb-4">
                      {part.substring(2)}
                    </h2>
                  );
                }
                if (part.startsWith('## ')) {
                  return (
                    <h3 key={index} className="text-xl md:text-2xl font-bold text-gray-800 mt-6 mb-3">
                      {part.substring(3)}
                    </h3>
                  );
                }
                if (part.startsWith('### ')) {
                  return (
                    <h4 key={index} className="text-lg font-bold text-gray-800 mt-4 mb-2">
                      {part.substring(4)}
                    </h4>
                  );
                }
                
                // Handle lists
                if (part.startsWith('- ') || part.startsWith('* ')) {
                  const items = part.split('\n').filter(item => item.startsWith('- ') || item.startsWith('* '));
                  return (
                    <ul key={index} className="list-disc list-inside text-gray-600 my-4">
                      {items.map((item, i) => (
                        <li key={i}>{item.substring(2)}</li>
                      ))}
                    </ul>
                  );
                }
                
                // Handle tables
                if (part.includes('|')) {
                  const rows = part.split('\n').filter(row => row.includes('|'));
                  return (
                    <div key={index} className="overflow-x-auto my-6">
                      <table className="min-w-full border border-gold-200 rounded-xl">
                        <tbody>
                          {rows.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                              {row.split('|').filter(cell => cell.trim() !== '').map((cell, j) => (
                                <td key={j} className="px-4 py-2 border border-gold-200">
                                  {cell.trim()}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                
                // Handle quotes
                if (part.startsWith('> ')) {
                  return (
                    <blockquote key={index} className="border-l-4 border-gold-500 pl-6 italic text-gray-600 my-4">
                      {part.substring(2)}
                    </blockquote>
                  );
                }
                
                // Regular paragraph
                return (
                  <p key={index} className="text-gray-600 mb-4">
                    {part}
                  </p>
                );
              })}
            </div>

            {/* Author Bio */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-16 h-16 rounded-full mr-4"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{post.author}</h3>
                  <p className="text-gray-500">
                    Автор статьи. Специалист по путешествиям и туристический эксперт.
                  </p>
                </div>
              </div>
            </div>

            {/* Share and Back */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blog"
                className="flex items-center text-gold-500 hover:text-gold-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Назад в блог
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Поделиться:</span>
                <button className="p-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
              Похожие статьи
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
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
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{post.date}</span>
                      <Eye className="w-4 h-4 ml-4 mr-1" />
                      <span>{post.views}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-gold-500 font-medium hover:text-gold-600 transition-colors"
                    >
                      Читать дальше
                      <ArrowLeft className="w-4 h-4 ml-1 transform rotate-180" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-gold-500 to-gold-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Понравилась статья?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Поделитесь ей с друзьями и не пропустите новые публикации
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-block bg-white text-gold-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Читать больше статей
            </Link>
            <Link
              href="/tours"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Посмотреть туры
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
