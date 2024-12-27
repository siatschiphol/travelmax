'use client'

import { useState, useEffect } from 'react'
import { DollarSign, X } from 'lucide-react'
import { Booking } from './types'

interface BookingFormProps {
  booking?: Booking
  onSubmit: (bookingData: Partial<Booking>) => void
  onClose: () => void
}

export default function BookingForm({ booking, onSubmit, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    user_id: booking?.user_id || '',
    experience_id: booking?.experience_id || '',
    status: booking?.status || 'pending',
    booking_data: {
      number_of_travelers: booking?.booking_data?.number_of_travelers || 1,
      special_requests: booking?.booking_data?.special_requests || '',
      add_ons: booking?.booking_data?.add_ons || [],
      pricing_breakdown: booking?.booking_data?.pricing_breakdown || {},
      payment_info: {
        payment_method: booking?.booking_data?.payment_info?.payment_method || '',
        transaction_details: booking?.booking_data?.payment_info?.transaction_details || {},
        refund_info: booking?.booking_data?.payment_info?.refund_info || {}
      },
      contact_details: booking?.booking_data?.contact_details || {},
      booking_date: booking?.booking_data?.booking_date || new Date().toISOString().split('T')[0],
      total_amount: booking?.booking_data?.total_amount || 0,
      currency: booking?.booking_data?.currency || 'USD'
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{booking ? 'Edit Booking' : 'New Booking'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">User ID</label>
              <input
                type="text"
                value={formData.user_id}
                onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience ID</label>
              <input
                type="text"
                value={formData.experience_id}
                onChange={(e) => setFormData({ ...formData, experience_id: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Travelers</label>
              <input
                type="number"
                value={formData.booking_data.number_of_travelers}
                onChange={(e) => setFormData({
                  ...formData,
                  booking_data: {
                    ...formData.booking_data,
                    number_of_travelers: parseInt(e.target.value)
                  }
                })}
                min="1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Special Requests</label>
            <textarea
              value={formData.booking_data.special_requests}
              onChange={(e) => setFormData({
                ...formData,
                booking_data: {
                  ...formData.booking_data,
                  special_requests: e.target.value
                }
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Booking Date</label>
              <input
                type="date"
                value={formData.booking_data.booking_date}
                onChange={(e) => setFormData({
                  ...formData,
                  booking_data: {
                    ...formData.booking_data,
                    booking_date: e.target.value
                  }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <input
                type="text"
                value={formData.booking_data.payment_info.payment_method}
                onChange={(e) => setFormData({
                  ...formData,
                  booking_data: {
                    ...formData.booking_data,
                    payment_info: {
                      ...formData.booking_data.payment_info,
                      payment_method: e.target.value
                    }
                  }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Total Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="number"
                  value={formData.booking_data.total_amount}
                  onChange={(e) => setFormData({
                    ...formData,
                    booking_data: {
                      ...formData.booking_data,
                      total_amount: parseFloat(e.target.value)
                    }
                  })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                value={formData.booking_data.currency}
                onChange={(e) => setFormData({
                  ...formData,
                  booking_data: {
                    ...formData.booking_data,
                    currency: e.target.value
                  }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {booking ? 'Update Booking' : 'Create Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
