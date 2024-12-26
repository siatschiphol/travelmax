'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import TourForm from '../components/TourForm'

export default function NewTourPage() {
  const router = useRouter()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Create New Tour
          </h1>
          <TourForm mode="create" />
        </div>
      </div>
    </div>
  )
}