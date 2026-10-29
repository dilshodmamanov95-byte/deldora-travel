'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SortDesc } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';

interface SortOption {
  value: string;
  label: string;
}

interface TourSortProps {
  sortOptions: SortOption[];
}

export function TourSort({ sortOptions }: TourSortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { dictionary } = useLocale();

  const sortBy = searchParams.get('sort') || 'default';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set('sort', e.target.value);
    } else {
      params.delete('sort');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <SortDesc className="w-5 h-5 text-gold-500" />
      <span className="text-gray-600">{dictionary.tours.sortBy}</span>
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="px-4 py-2 border border-gold-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
