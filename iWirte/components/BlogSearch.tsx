'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (dateFilter) params.set('date', dateFilter);
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blog posts..."
        className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon"
      />
      <select
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon"
      >
        <option value="">All Time</option>
        <option value="week">Past Week</option>
        <option value="month">Past Month</option>
        <option value="year">Past Year</option>
      </select>
      <button
        type="submit"
        className="bg-maroon text-white px-8 py-3 rounded-lg font-semibold hover:bg-maroon-light transition-all"
      >
        Search
      </button>
    </form>
  );
}
