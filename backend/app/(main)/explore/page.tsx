'use client'

import { Compass, Flame, Star, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const featuredItems = [
  {
    id: 1,
    title: 'Featured Item 1',
    image: 'https://picsum.photos/seed/30/800/400',
    category: 'Technology'
  },
  {
    id: 2,
    title: 'Featured Item 2',
    image: 'https://picsum.photos/seed/31/800/400',
    category: 'Design'
  }
]

const trendingItems = [
  {
    id: 1,
    title: 'Trending Item 1',
    image: 'https://picsum.photos/seed/32/400/300',
    views: '2.5k'
  },
  {
    id: 2,
    title: 'Trending Item 2',
    image: 'https://picsum.photos/seed/33/400/300',
    views: '1.8k'
  }
]

export default function ExplorePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Explore</h1>
        <p className="text-gray-500 mt-1">Discover new and trending content</p>
      </div>

      {/* Featured Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Featured
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredItems.map((item) => (
            <div key={item.id} className="relative group">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-red-500" />
          Trending Now
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  {item.views} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-500" />
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Technology', 'Design', 'Business', 'Lifestyle'].map((category) => (
            <button
              key={category}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all"
            >
              {category}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
