'use client'

import TourForm from './TourForm'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function TourFormWrapper({ tourData, tourId }: { tourData: any, tourId: string }) {
  const router = useRouter()

  useEffect(() => {
    console.log('TourFormWrapper received data:', { tourData, tourId })
  }, [tourData, tourId])

  if (!tourData) {
    return (
      <div className="p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          No tour data available
        </div>
      </div>
    )
  }

  return (
    <>
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
            Edit Tour
          </h1>
          <TourForm 
            mode="edit"
            tourId={tourId}
            initialData={tourData}
          />
        </div>
      </div>
    </>
  )
}
