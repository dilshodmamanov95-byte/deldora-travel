'use client';

import { useState } from 'react';
import { useCurrency } from '@/components/layout/Header/hooks/useCurrency';
import { CURRENCIES } from '@/components/layout/Header/constants';
import { ChevronDown } from 'lucide-react';

export function CurrencySelector() {
  const { currency, changeCurrency, formatExchangeRate, isLoading, error } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code: string) => {
    const selected = CURRENCIES.find((c) => c.code === code);
    if (selected) {
      changeCurrency(selected);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-purple-600">{currency.code}</span>
        {isLoading ? (
          <span className="text-xs text-gray-500 animate-pulse">Загрузка...</span>
        ) : error ? (
          <span className="text-xs text-red-500">{error}</span>
        ) : (
          <span className="text-xs text-gray-500 hidden md:inline">
            {formatExchangeRate(currency)}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 py-1 animate-slide-down">
          {CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              onClick={() => handleSelect(curr.code)}
              className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-purple-50 transition-colors duration-150 focus:outline-none focus:bg-purple-100 ${
                currency.code === curr.code ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
              }`}
              aria-label={`Выбрать ${curr.code}`}
            >
              <span className="font-semibold">{curr.code}</span>
              <span className="text-sm text-gray-500">{curr.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
