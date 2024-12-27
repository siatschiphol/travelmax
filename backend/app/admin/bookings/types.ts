export interface BookingData {
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

export interface Booking {
  id: string
  booking_reference: string
  user_id: string
  experience_id: string
  status: string
  booking_data: BookingData
  timestamps: {
    created_at: string
    updated_at: string
  }
}
