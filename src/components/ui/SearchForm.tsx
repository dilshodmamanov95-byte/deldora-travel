'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';

export function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const { dictionary } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('destination', searchQuery);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gold-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={dictionary.search.tourPlaceholder}
        className="w-full pl-12 pr-4 py-4 bg-white border border-gold-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 text-gray-800 placeholder-gray-400 shadow-lg"
      />
    </form>
  );
}
