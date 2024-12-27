import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function fetchBookings(sortField = 'timestamps->created_at', sortDirection = 'desc') {
  try {
    let query = supabase
      .from('sales')
      .select('*')

    // Handle JSON field sorting
    if (sortField.includes('->')) {
      query = query.order(sortField, { ascending: sortDirection === 'asc' })
    } else {
      query = query.order(sortField, { ascending: sortDirection === 'asc' })
    }

    const { data, error } = await query

    if (error) {
      console.error('Database error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Fetch error:', error)
    return { success: false, error: error?.message || 'Failed to fetch bookings' }
  }
}

export async function deleteBooking(id: string) {
  try {
    const { error } = await supabase
      .from('sales')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Delete error:', error)
    return { success: false, error: error?.message || 'Failed to delete booking' }
  }
}

export async function createBooking(bookingData: any) {
  try {
    const { data, error } = await supabase
      .from('sales')
      .insert([bookingData])
      .select()
      .single()

    if (error) {
      console.error('Create error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Create error:', error)
    return { success: false, error: error?.message || 'Failed to create booking' }
  }
}

export async function updateBooking(id: string, bookingData: any) {
  try {
    const { data, error } = await supabase
      .from('sales')
      .update(bookingData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Update error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Update error:', error)
    return { success: false, error: error?.message || 'Failed to update booking' }
  }
}
