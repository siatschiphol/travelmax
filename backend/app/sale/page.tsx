'use client'

import { Grid, List, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '$99.99',
    image: 'https://picsum.photos/seed/1/400/300'
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$149.99',
    image: 'https://picsum.photos/seed/2/400/300'
  },
  // Add more products as needed
]

export default function SalePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Grid className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <List className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-lg font-semibold mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
