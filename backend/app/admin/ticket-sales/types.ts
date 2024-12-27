export interface TicketData {
  number_of_travelers: number
  special_requests?: string
  add_ons?: any[]
  pricing_breakdown: any
  payment_info: {
    payment_method: string
    transaction_details: any
    refund_info?: any
  }
  contact_details: any
  booking_date: string
  total_amount: number
  currency: string
}

export interface TicketSale {
  id: string
  booking_reference: string
  user_id: string
  experience_id: string
  status: string
  type: 'ticket' // This distinguishes ticket sales from regular bookings
  booking_data: TicketData
  timestamps: {
    created_at: string
    updated_at: string
  }
}
