import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function fetchTicketSales(sortField = 'timestamps->created_at', sortDirection = 'desc') {
  try {
    let query = supabase
      .from('sales')
      .select('*')
      .eq('type', 'ticket') // Only fetch ticket sales

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
    return { success: false, error: error?.message || 'Failed to fetch ticket sales' }
  }
}

export async function deleteTicketSale(id: string) {
  try {
    const { error } = await supabase
      .from('sales')
      .delete()
      .eq('id', id)
      .eq('type', 'ticket') // Ensure we only delete ticket sales

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Delete error:', error)
    return { success: false, error: error?.message || 'Failed to delete ticket sale' }
  }
}

export async function createTicketSale(saleData: any) {
  try {
    const ticketSaleData = {
      ...saleData,
      type: 'ticket' // Ensure type is set to ticket
    }

    const { data, error } = await supabase
      .from('sales')
      .insert([ticketSaleData])
      .select()
      .single()

    if (error) {
      console.error('Create error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Create error:', error)
    return { success: false, error: error?.message || 'Failed to create ticket sale' }
  }
}

export async function updateTicketSale(id: string, saleData: any) {
  try {
    const { data, error } = await supabase
      .from('sales')
      .update(saleData)
      .eq('id', id)
      .eq('type', 'ticket') // Ensure we only update ticket sales
      .select()
      .single()

    if (error) {
      console.error('Update error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Update error:', error)
    return { success: false, error: error?.message || 'Failed to update ticket sale' }
  }
}
