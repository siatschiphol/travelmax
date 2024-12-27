'use client'

import { Filter, Search, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'

const searchResults = [
  {
    id: 1,
    title: 'Design System',
    type: 'Project',
    image: 'https://picsum.photos/seed/70/400/300'
  },
  {
    id: 2,
    title: 'Analytics Dashboard',
    type: 'Document',
    image: 'https://picsum.photos/seed/71/400/300'
  },
  {
    id: 3,
    title: 'Mobile App UI',
    type: 'Project',
    image: 'https://picsum.photos/seed/72/400/300'
  }
]

const filters = [
  { id: 'all', label: 'All' },
  { id: 'projects', label: 'Projects' },
  { id: 'documents', label: 'Documents' },
  { id: 'people', label: 'People' }
]

export default function SearchPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Results</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            <span>Sort by: Relevance</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition-colors"
            >
              <div className="relative h-48">
                <Image
                  src={result.image}
                  alt={result.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="text-sm text-gray-500">{result.type}</span>
                <h3 className="font-medium mt-1">{result.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
