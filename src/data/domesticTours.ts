// src/data/domesticTours.ts
// Популярные туры по Узбекистану

export interface DomesticTour {
  id: string;
  title: string;
  slug: string;
  destination: string;
  region: string;
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
  difficulty: 'easy' | 'medium' | 'hard';
  tourType: 'group' | 'individual' | 'both';
  season: string[];
  images: string[];
  thumbnail: string;
  description: string;
  shortDescription: string;
  highlights: string[];
  bestFor: string[];
  departureCity: string;
  isPopular: boolean;
  isHot: boolean;
  isNew: boolean;
  tags: string[];
  bookings?: number;
}

// Популярные маршруты по Узбекистану
export const domesticTours: DomesticTour[] = [
  {
    id: 'golden-ring-8-days',
    title: 'Золотой Кольцо Узбекистана',
    slug: 'golden-ring-8-days',
    destination: 'Ташкент → Самарканд → Бухара → Хива',
    region: 'Вся страна',
    duration: 8,
    price: { UZS: 4500000, USD: 380, EUR: 350 },
    oldPrice: { UZS: 5200000, USD: 440, EUR: 400 },
    rating: 4.9,
    reviewCount: 215,
    difficulty: 'easy',
    tourType: 'both',
    season: ['spring', 'autumn'],
    images: [
      'https://images.unsplash.com/photo-1604150484998-849905558838?q=80&w=800',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1604150484998-849905558838?q=80&w=800',
    shortDescription: 'Классический маршрут по самым красивым городам Узбекистана',
    description: 'Путешествие по четырем жемчужинам Узбекистана: Ташкент, Самарканд, Бухара, Хива. Посетите величественные памятники архитектуры,megaheritage Sites ЮНЕСКО, и насладитесь богатым культурным наследием страны.',
    highlights: ['Регистан в Самарканде', 'Пои Калон в Бухаре', 'Ичан-Кала в Хиве', 'Ташкентское метро'],
    bestFor: ['История', 'Культура', 'Архитектура', 'Фотография'],
    departureCity: 'Ташкент',
    isPopular: true,
    isHot: true,
    isNew: false,
    tags: ['золотое кольцо', 'ташкент', 'самарканд', 'бухара', 'хива'],
  },
  {
    id: 'tashkent-3-days',
    title: 'Ташкент: Столица Узбекистана',
    slug: 'tashkent-3-days',
    destination: 'Ташкент и Чарвак',
    region: 'Ташкентская область',
    duration: 3,
    price: { UZS: 1800000, USD: 150, EUR: 140 },
    oldPrice: { UZS: 2100000, USD: 180, EUR: 165 },
    rating: 4.8,
    reviewCount: 156,
    difficulty: 'easy',
    tourType: 'both',
    season: ['spring', 'summer', 'autumn', 'winter'],
    images: [
      'https://images.unsplash.com/photo-1604150484998-849905558838?q=80&w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1604150484998-849905558838?q=80&w=800',
    shortDescription: 'Современность и древность в одном городе',
    description: 'Ташкент - зеленая столица с величественными памятниками, современной архитектурой и уникальным метро. Включает поездку к Чарвакскому водохранилищу.',
    highlights: ['Площадь Независимости', 'Хазрати Имам', 'Ташкентское метро', 'Чарвак'],
    bestFor: ['Городской туризм', 'Культура', 'Короткий отдых'],
    departureCity: 'Ташкент',
    isPopular: true,
    isHot: false,
    isNew: false,
    tags: ['ташкент', 'столица', 'город', 'культура'],
  },
  {
    id: 'samarkand-2-days',
    title: 'Самарканд: Жемчужина Великого Шелкового пути',
    slug: 'samarkand-2-days',
    destination: 'Самарканд',
    region: 'Самаркандская область',
    duration: 2,
    price: { UZS: 1200000, USD: 100, EUR: 90 },
    oldPrice: { UZS: 1400000, USD: 120, EUR: 110 },
    rating: 4.9,
    reviewCount: 187,
    difficulty: 'easy',
    tourType: 'both',
    season: ['spring', 'summer', 'autumn'],
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800',
      'https://images.unsplash.com/photo-1604150484998-849905558838?q=80&w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800',
    shortDescription: 'Посетите одно из самых красивых мест в Центральной Азии',
    description: 'Самарканд - древний город с уникальной архитектурой. Вы увидите площадь Регистан, мавзолей Гури Амир, обсерваторию Улугбека и многое другое.',
    highlights: ['Регистан', 'Гури Амир', 'Улугбек обсерватория', 'Шахи-Зинда'],
    bestFor: ['История', 'Архитектура', 'Weekend тур'],
    departureCity: 'Ташкент или Самарканд',
    isPopular: true,
    isHot: true,
    isNew: false,
    tags: ['самарканд', 'регистан', 'гури амир', 'история'],
  },
  {
    id: 'bukhara-3-days',
    title: 'Бухара: Священный город исламского мира',
    slug: 'bukhara-3-days',
    destination: 'Бухара',
    region: 'Бухарская область',
    duration: 3,
    price: { UZS: 1400000, USD: 120, EUR: 110 },
    oldPrice: { UZS: 1600000, USD: 135, EUR: 125 },
    rating: 4.8,
    reviewCount: 142,
    difficulty: 'easy',
    tourType: 'both',
    season: ['spring', 'autumn'],
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=800',
    shortDescription: 'Погрузитесь в атмосферу средневекового города',
    description: 'Бухара - священный город с более чем 2500-летней историей. Посетите комплекс Пои Калон, Цитадель Арк, мавзолей Исмаила Самани и торговые купола.',
    highlights: ['Пои Калон', 'Арк', 'Исмаил Самани', 'Торговые купола'],
    bestFor: ['История', 'Культура', 'Ислам', 'Архитектура'],
    departureCity: 'Ташкент или Бухара',
    isPopular: true,
    isHot: false,
    isNew: false,
    tags: ['бухара', 'пои калон', 'арк', 'исмаил самани'],
  },
  {
    id: 'khiva-2-days',
    title: 'Хива: Сказочный город-музей',
    slug: 'khiva-2-days',
    destination: 'Хива',
    region: 'Хорезмская область',
    duration: 2,
    price: { UZS: 1100000, USD: 95, EUR: 85 },
    oldPrice: { UZS: 1300000, USD: 110, EUR: 100 },
    rating: 4.7,
    reviewCount: 98,
    difficulty: 'easy',
    tourType: 'both',
    season: ['spring', 'autumn'],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800',
      'https://images.unsplash.com/photo-1604150484998-849905558838?q=80&w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800',
    shortDescription: 'Посетите уникальный город-музей под открытым небом',
    description: 'Хива - город-музей с уникальным архитектурным ансамблем Ичан-Кала, входящим в список Всемирного наследия ЮНЕСКО. Посетите крепость Куня-Арк, мечеть Джума и мавзолей Пахлавон Махмуд.',
    highlights: ['Ичан-Кала', 'Куня-Арк', 'Джума мечеть', 'Калта-Минар'],
    bestFor: ['История', 'Музей', 'Фотография', 'Weekend тур'],
    departureCity: 'Ургенч или Ташкент',
    isPopular: true,
    isHot: false,
    isNew: false,
    tags: ['хива', 'ичан-кала', 'куня-арк', 'музей'],
  },
  {
    id: 'chatkal-3-days',
    title: 'Чаткальские горы: Природа и приключения',
    slug: 'chatkal-3-days',
    destination: 'Чаткальский хребет',
    region: 'Ташкентская область',
    duration: 3,
    price: { UZS: 1500000, USD: 125, EUR: 115 },
    rating: 4.7,
    reviewCount: 56,
    difficulty: 'medium',
    tourType: 'group',
    season: ['spring', 'summer', 'autumn'],
    images: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800',
    shortDescription: 'Насладитесь красотой гор и кристально чистыми озерами',
    description: 'Чаткальские горы - идеальное место для любителей природы. Вы увидите Чарвакское водохранилище, озеро Ак-Таш, и поднимитесь на Большой Чимган.',
    highlights: ['Чарвакское водохранилище', 'Озеро Ак-Таш', 'Большой Чимган'],
    bestFor: ['Треkking', 'Природа', 'Приключения', 'Активный отдых'],
    departureCity: 'Ташкент',
    isPopular: true,
    isHot: false,
    isNew: false,
    tags: ['чаткальские горы', 'треkking', 'природа', 'озеро'],
  },
];

// Filter functions
export const getPopularDomesticTours = () => domesticTours.filter(tour => tour.isPopular);
export const getHotDomesticTours = () => domesticTours.filter(tour => tour.isHot);
export const getNewDomesticTours = () => domesticTours.filter(tour => tour.isNew);
export const getDomesticToursByRegion = (region: string) => domesticTours.filter(tour => tour.region === region);

export default domesticTours;
