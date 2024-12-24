'use server'

import { createClient } from '@/utils/supabase/server'
import TourFormWrapper from '../../components/TourFormWrapper'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditTourPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  // Fetch the tour data server-side
  const { data: tour, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Error loading tour: {error.message}
        </div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Tour not found
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TourFormWrapper 
        tourData={tour}
        tourId={id}
      />
    </div>
  )
}
