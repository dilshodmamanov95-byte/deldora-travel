'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Filter, SortDesc } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';

interface FilterOption {
  value: string;
  label: string;
}

interface TourFiltersProps {
  filterOptions: FilterOption[];
  sortOptions: FilterOption[];
  currentFilter?: string;
  currentSort?: string;
}

export function TourFilters({ filterOptions, sortOptions }: TourFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { dictionary } = useLocale();

  const filterBy = searchParams.get('filter') || '';
  const sortBy = searchParams.get('sort') || '';

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('filter', value);
    } else {
      params.delete('filter');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

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
    <section className="bg-white border-b border-gold-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Filters */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gold-500" />
              <span className="text-gray-600">{dictionary.tours.filter}</span>
              <div className="flex gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange(option.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterBy === option.value
                        ? 'bg-gold-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gold-50 hover:text-gold-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
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
        </div>
      </div>
    </section>
  );
}
