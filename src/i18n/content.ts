import type { Locale } from './translations';

export type LocalizedValue<T = string> = T | Partial<Record<Locale, T>>;

const commonTranslations: Record<string, Record<Locale, string>> = {
  'Турция': { ru: 'Турция', uz: 'Turkiya', en: 'Turkey' },
  'ОАЭ': { ru: 'ОАЭ', uz: 'BAA', en: 'UAE' },
  'Таиланд': { ru: 'Таиланд', uz: 'Tailand', en: 'Thailand' },
  'Мальдивы': { ru: 'Мальдивы', uz: 'Maldiv orollari', en: 'Maldives' },
  'Вся страна': { ru: 'Вся страна', uz: 'Butun mamlakat', en: 'All Uzbekistan' },
  'Ташкент': { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' },
  'Самарканд': { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' },
  'Бухара': { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' },
  'Хива': { ru: 'Хива', uz: 'Xiva', en: 'Khiva' },
  'Чудеса Стамбула и Kapadokya': { ru: 'Чудеса Стамбула и Каппадокии', uz: 'Istanbul va Kapadokiyaning mo‘jizalari', en: 'The Wonders of Istanbul and Cappadocia' },
  'Чудеса Стамбула иKapadokya': { ru: 'Чудеса Стамбула и Каппадокии', uz: 'Istanbul va Kapadokiyaning mo‘jizalari', en: 'The Wonders of Istanbul and Cappadocia' },
  'Роскошь Дубая и Абу-Даби': { ru: 'Роскошь Дубая и Абу-Даби', uz: 'Dubay va Abu-Dabi hashamati', en: 'Luxury in Dubai and Abu Dhabi' },
  'Тропический рай Таиланда': { ru: 'Тропический рай Таиланда', uz: 'Tailand tropik jannati', en: 'Thailand’s Tropical Paradise' },
  'Райский отдых на Мальдивах': { ru: 'Райский отдых на Мальдивах', uz: 'Maldiv orollarida jannat dam olish', en: 'A Paradise Holiday in the Maldives' },
  'Экзотика Гоа и культурная Индия': { ru: 'Экзотика Гоа и культурная Индия', uz: 'Goaning ekzotikasi va Hindiston madaniyati', en: 'Goa’s Exotic Charm and Cultural India' },
  'Таинственный Египет и Красное море': { ru: 'Таинственный Египет и Красное море', uz: 'Sirli Misr va Qizil dengiz', en: 'Mysterious Egypt and the Red Sea' },
  'Сказочная Малайзия: Куала-Лумпур и Лангкави': { ru: 'Сказочная Малайзия: Куала-Лумпур и Лангкави', uz: 'Sehrli Malayziya: Kuala-Lumpur va Langkavi', en: 'Fairytale Malaysia: Kuala Lumpur and Langkawi' },
  'Золотой Кольцо Узбекистана': { ru: 'Золотой Кольцо Узбекистана', uz: 'O‘zbekiston oltin halqasi', en: 'The Golden Ring of Uzbekistan' },
  'Ташкент: Столица Узбекистана': { ru: 'Ташкент: Столица Узбекистана', uz: 'Toshkent: O‘zbekiston poytaxti', en: 'Tashkent: The Capital of Uzbekistan' },
  'Самарканд: Жемчужина Великого Шелкового пути': { ru: 'Самарканд: Жемчужина Великого Шелкового пути', uz: 'Samarqand: Buyuk Ipak yo‘lining durdonasi', en: 'Samarkand: The Pearl of the Silk Road' },
  'Бухара: Священный город исламского мира': { ru: 'Бухара: Священный город исламского мира', uz: 'Buxoro: Islom olamining muqaddas shahri', en: 'Bukhara: A Sacred City of the Islamic World' },
  'Хива: Сказочный город-музей': { ru: 'Хива: Сказочный город-музей', uz: 'Xiva: Sehrli shahar-muzey', en: 'Khiva: A Fairytale Museum City' },
  'Чаткальские горы: Природа и приключения': { ru: 'Чаткальские горы: Природа и приключения', uz: 'Chatqol tog‘lari: tabiat va sarguzashtlar', en: 'Chatkal Mountains: Nature and Adventure' },
  'Прибытие в Стамбул': { ru: 'Прибытие в Стамбул', uz: 'Istanbulga kelish', en: 'Arrival in Istanbul' },
  'Исторический Стамбул': { ru: 'Исторический Стамбул', uz: 'Tarixiy Istanbul', en: 'Historic Istanbul' },
  'Босфор и азиатская часть': { ru: 'Босфор и азиатская часть', uz: 'Bosfor va Osiyo tomoni', en: 'The Bosphorus and Asian Side' },
  'Переезд в Каппадокию': { ru: 'Переезд в Каппадокию', uz: 'Kapadokiyaga o‘tish', en: 'Transfer to Cappadocia' },
  'Волшебная Каппадокия': { ru: 'Волшебная Каппадокия', uz: 'Sehrli Kapadokiya', en: 'Magical Cappadocia' },
  'Долина Пашабаг и Учхисар': { ru: 'Долина Пашабаг и Учхисар', uz: 'Pashabag vodiysi va Uchhisar', en: 'Pasabag Valley and Uchisar' },
  'Отъезд': { ru: 'Отъезд', uz: 'Jo‘nab ketish', en: 'Departure' },
  'турция': { ru: 'турция', uz: 'Turkiya', en: 'Turkey' }, 'истамбул': { ru: 'истамбул', uz: 'Istanbul', en: 'Istanbul' }, 'каппадокия': { ru: 'каппадокия', uz: 'Kapadokiya', en: 'Cappadocia' }, 'воздушный шар': { ru: 'воздушный шар', uz: 'issiq havo shari', en: 'hot air balloon' }, 'босфор': { ru: 'босфор', uz: 'Bosfor', en: 'Bosphorus' }, 'роскошь': { ru: 'роскошь', uz: 'hashamat', en: 'luxury' },
  'оаэ': { ru: 'оаэ', uz: 'BAA', en: 'UAE' }, 'дубай': { ru: 'дубай', uz: 'Dubay', en: 'Dubai' }, 'абу-даби': { ru: 'абу-даби', uz: 'Abu-Dabi', en: 'Abu Dhabi' }, 'пустыня': { ru: 'пустыня', uz: 'cho‘l', en: 'desert' }, 'небоскребы': { ru: 'небоскребы', uz: 'osmono‘par bino', en: 'skyscrapers' },
  'таиланд': { ru: 'таиланд', uz: 'Tailand', en: 'Thailand' }, 'бангкок': { ru: 'бангкок', uz: 'Bangkok', en: 'Bangkok' }, 'пхукет': { ru: 'пхукет', uz: 'Pxuket', en: 'Phuket' }, 'краби': { ru: 'краби', uz: 'Krabi', en: 'Krabi' }, 'пляж': { ru: 'пляж', uz: 'plyaj', en: 'beach' }, 'экзотика': { ru: 'экзотика', uz: 'ekzotika', en: 'exotic' },
  'мальдивы': { ru: 'мальдивы', uz: 'Maldiv orollari', en: 'Maldives' }, 'Отдых': { ru: 'Отдых', uz: 'Dam olish', en: 'Relaxation' }, 'романтика': { ru: 'романтика', uz: 'romantika', en: 'romance' }, 'медовый месяц': { ru: 'медовый месяц', uz: 'asal oyi', en: 'honeymoon' },
  'индия': { ru: 'индия', uz: 'Hindiston', en: 'India' }, 'гоа': { ru: 'гоа', uz: 'Goa', en: 'Goa' }, 'дели': { ru: 'дели', uz: 'Dehli', en: 'Delhi' }, 'агра': { ru: 'агра', uz: 'Agra', en: 'Agra' }, 'тадж-махал': { ru: 'тадж-махал', uz: 'Toj-Mahal', en: 'Taj Mahal' }, 'культура': { ru: 'культура', uz: 'madaniyat', en: 'culture' },
  'египет': { ru: 'египет', uz: 'Misr', en: 'Egypt' }, 'каир': { ru: 'каир', uz: 'Qohira', en: 'Cairo' }, 'хургада': { ru: 'хургада', uz: 'Hurgada', en: 'Hurghada' }, 'луксор': { ru: 'луксор', uz: 'Luksor', en: 'Luxor' }, 'пирамиды': { ru: 'пирамиды', uz: 'piramidalar', en: 'pyramids' }, 'красное море': { ru: 'красное море', uz: 'Qizil dengiz', en: 'Red Sea' }, 'дайвинг': { ru: 'дайвинг', uz: 'dayving', en: 'diving' },
  'малайзия': { ru: 'малайзия', uz: 'Malayziya', en: 'Malaysia' }, 'куала-лумпур': { ru: 'куала-лумпур', uz: 'Kuala-Lumpur', en: 'Kuala Lumpur' }, 'лангкави': { ru: 'лангкави', uz: 'Langkavi', en: 'Langkawi' }, 'петронас': { ru: 'петронас', uz: 'Petronas', en: 'Petronas' }, 'природа': { ru: 'природа', uz: 'tabiat', en: 'nature' },
  'Классический маршрут по самым красивым городам Узбекистана': { ru: 'Классический маршрут по самым красивым городам Узбекистана', uz: 'O‘zbekistonning eng go‘zal shaharlariga klassik sayohat', en: 'Classic route through the most beautiful cities of Uzbekistan' },
  'Современность и древность в одном городе': { ru: 'Современность и древность в одном городе', uz: 'Bir shaharda zamonaviylik va qadimiylik', en: 'Modernity and antiquity in one city' },
  'Посетите одно из самых красивых мест в Центральной Азии': { ru: 'Посетите одно из самых красивых мест в Центральной Азии', uz: 'Markaziy Osiyoning eng go‘zal joylaridan biriga tashrif buyuring', en: 'Visit one of Central Asia’s most beautiful places' },
  'Погрузитесь в атмосферу средневекового города': { ru: 'Погрузитесь в атмосферу средневекового города', uz: 'O‘rta asr shahri atmosferasiga sho‘ng‘ing', en: 'Immerse yourself in the atmosphere of a medieval city' },
  'Посетите уникальный город-музей под открытым небом': { ru: 'Посетите уникальный город-музей под открытым небом', uz: 'Ochiq osmon ostidagi noyob shahar-muzeyga tashrif buyuring', en: 'Visit a unique open-air museum city' },
  'Насладитесь красотой гор и кристально чистыми озерами': { ru: 'Насладитесь красотой гор и кристально чистыми озерами', uz: 'Tog‘lar go‘zalligi va kristall tiniq ko‘llardan zavqlaning', en: 'Enjoy beautiful mountains and crystal-clear lakes' },
  'Погрузитесь в атмосферу Востока и Запада в одном путешествии!': { ru: 'Погрузитесь в атмосферу Востока и Запада в одном путешествии!', uz: 'Bir sayohatda Sharq va G‘arb ruhiga sho‘ng‘ing!', en: 'Experience East and West in one unforgettable journey!' },
  'Откройте для себя мир роскоши и инноваций в Объединенных Арабских Эмиратах!': { ru: 'Откройте для себя мир роскоши и инноваций в Объединенных Арабских Эмиратах!', uz: 'Birlashgan Arab Amirliklarida hashamat va innovatsiyalar olamini kashf eting!', en: 'Discover a world of luxury and innovation in the United Arab Emirates!' },
  'Насладитесь экзотическим отдыхом на белоснежных пляжах Таиланда!': { ru: 'Насладитесь экзотическим отдыхом на белоснежных пляжах Таиланда!', uz: 'Tailandning oppoq qumli plyajlarida ekzotik dam olishdan zavqlaning!', en: 'Enjoy an exotic escape on Thailand’s pristine white-sand beaches!' },
  'Идеальный отдых для влюбленных на райских островах!': { ru: 'Идеальный отдых для влюбленных на райских островах!', uz: 'Jannat orollarida sevishganlar uchun ideal dam olish!', en: 'The perfect romantic escape on paradise islands!' },
  'Погрузитесь в мире контрастов: от шумного Дели до мирного Гоа!': { ru: 'Погрузитесь в мире контрастов: от шумного Дели до мирного Гоа!', uz: 'Tinchlikdagi Goagacha shovqinli Dehlidan kontrastlar olamiga sho‘ng‘ing!', en: 'Explore a world of contrasts, from vibrant Delhi to peaceful Goa!' },
  'Путешествие сквозь время в Древний Египет!': { ru: 'Путешествие сквозь время в Древний Египет!', uz: 'Qadimiy Misrga vaqt ichida sayohat!', en: 'Journey through time to ancient Egypt!' },
  'Удивительное сочетание современности и природной красоты!': { ru: 'Удивительное сочетание современности и природной красоты!', uz: 'Zamonaviylik va tabiiy go‘zallikning ajoyib uyg‘unligi!', en: 'An amazing blend of modern life and natural beauty!' },
};
export function localizedValue(value: unknown, locale: Locale, fieldName = ''): string {
  if (value == null) return '';
  if (typeof value !== 'string') {
    if (typeof value === 'object') {
      const localized = value as Record<string, unknown>;
      const direct = localized[locale];
      if (typeof direct === 'string') return direct;
      const languageCode = locale === 'uz' ? 'uz' : locale;
      const nested = localized[languageCode];
      if (typeof nested === 'string') return nested;
      const fallback = localized.ru;
      if (typeof fallback === 'string') {
        return locale === 'ru' ? fallback : (commonTranslations[fallback]?.[locale] ?? (locale === 'uz' ? 'Tarjimasi mavjud emas' : 'Translation unavailable'));
      }
    }
    return String(value);
  }

  const matched = commonTranslations[value]?.[locale];
  if (matched) return matched;
  return locale === 'ru' ? value : (/[а-яёқғҳў]/i.test(value) ? (locale === 'uz' ? 'Tarjimasi mavjud emas' : 'Translation unavailable') : value);
}

export function localizedTourField(tour: Record<string, any>, field: string, locale: Locale): string {
  const localized = tour[`${field}_${locale}`] ?? tour[`${field}${locale.toUpperCase()}`] ?? tour[`${field}Translations`]?.[locale];
  if (localized) return String(localized);
  return localizedValue(tour[field], locale, field);
}

export function localizedText(value: string, locale: Locale): string {
  return localizedValue(value, locale);
}

export function localizedTags(tags: string[] | undefined, locale: Locale): string[] {
  return (tags ?? []).map((tag) => localizedValue(tag, locale));
}
