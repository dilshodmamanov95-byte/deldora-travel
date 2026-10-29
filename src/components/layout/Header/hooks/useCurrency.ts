'use client';

import { useState, useEffect } from 'react';
import { CURRENCIES, DEFAULT_CURRENCY, type Currency } from '../constants';
import axios from 'axios';

// Тип для курса валюты
interface ExchangeRate {
  Ccy: string;
  Rate: string;
  Date: string;
}

// Кэш для курсов (в localStorage)
const CACHE_KEY = 'deldora_currency_rates';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 часа

// Дефолтные курсы (на случай ошибки)
const DEFAULT_RATES: Record<string, number> = {
  USD: 12000,
  EUR: 13000,
  RUB: 130,
  UZS: 1,
};

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка курсов с API ЦБ Узбекистана
  const fetchExchangeRates = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Проверяем кэш
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
            setRates(data);
            setIsLoading(false);
            return;
          }
        }
      }

      // Фетчим актуальные курсы
      // API ЦБ Узбекистана: https://cbu.uz/uz/arkiv-kursov-valyut/json/
      try {
        const response = await axios.get<ExchangeRate[]>(
          'https://cbu.uz/uz/arkiv-kursov-valyut/json/'
        );

        const newRates: Record<string, number> = { ...DEFAULT_RATES };
        response.data.forEach((rate) => {
          newRates[rate.Ccy] = parseFloat(rate.Rate.replace(/,/g, '.'));
        });

        // Сохраняем в кэш
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: newRates, timestamp: Date.now() })
          );
        }

        setRates(newRates);
      } catch (apiError) {
        console.error('API Error:', apiError);
        // Используем дефолтные курсы
        setRates(DEFAULT_RATES);
      }
    } catch (err) {
      console.error('Failed to fetch exchange rates:', err);
      setError('Не удалось загрузить курсы валют');
      setRates(DEFAULT_RATES);
    } finally {
      setIsLoading(false);
    }
  };

  // Форматирование цены
  const formatPrice = (price: number, targetCurrency: Currency = currency): string => {
    if (targetCurrency.code === 'UZS') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'UZS',
        maximumFractionDigits: 0,
      }).format(price);
    }

    // Конвертируем из UZS в целевую валюту
    const rate = rates[targetCurrency.code] || 1;
    const convertedPrice = price / rate;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: targetCurrency.code,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  // Форматирование курса (например: "USD 1 = 12,345.67 UZS")
  const formatExchangeRate = (from: Currency, to: Currency = DEFAULT_CURRENCY): string => {
    const rate = rates[from.code] || 1;
    return `${from.code} 1 = ${new Intl.NumberFormat('ru-RU').format(rate)} ${to.code}`;
  };

  // Изменение валюты
  const changeCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('deldora_selected_currency', newCurrency.code);
    }
  };

  // Загружаем курсы при монтировании
  useEffect(() => {
    fetchExchangeRates();
    // Проверяем сохраненную валюту
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('deldora_selected_currency');
      if (savedCurrency) {
        const found = CURRENCIES.find((c) => c.code === savedCurrency);
        if (found) setCurrency(found);
      }
    }
  }, []);

  return {
    currency,
    rates,
    isLoading,
    error,
    changeCurrency,
    formatPrice,
    formatExchangeRate,
    fetchExchangeRates,
  };
}
