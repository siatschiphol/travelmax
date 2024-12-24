'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'

const favorites = [
  {
    id: 1,
    name: 'Favorite Item 1',
    category: 'Category 1',
    image: 'https://picsum.photos/seed/10/400/300'
  },
  {
    id: 2,
    name: 'Favorite Item 2',
    category: 'Category 2',
    image: 'https://picsum.photos/seed/11/400/300'
  }
]

export default function FavoritePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Favorites</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative h-48">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
