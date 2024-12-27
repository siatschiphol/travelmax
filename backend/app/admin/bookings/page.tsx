'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, ArrowUpDown, Eye, Edit, Trash2, Ticket } from 'lucide-react'
import { fetchBookings, deleteBooking, createBooking, updateBooking } from './actions'
import { Booking } from './types'
import BookingForm from './BookingForm'
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal'

export default function BookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewBooking, setShowNewBooking] = useState(false)
  const [showEditBooking, setShowEditBooking] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortField, setSortField] = useState('timestamps->created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState<{ id: string; reference: string } | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  useEffect(() => {
    loadBookings()
  }, [sortField, sortDirection])

  async function loadBookings() {
    try {
      setLoading(true)
      const result = await fetchBookings(sortField, sortDirection)
      
      if (result.success) {
        setBookings(result.data || [])
      } else {
        console.error('Error fetching bookings:', result.error)
        alert(result.error || 'Failed to fetch bookings')
      }
    } catch (error: any) {
      console.error('Error loading bookings:', error?.message || error)
      alert('Failed to load bookings. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(current => current === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleDeleteClick = (id: string, reference: string) => {
    setBookingToDelete({ id, reference })
    setDeleteModalOpen(true)
  }

  async function handleDelete() {
    if (!bookingToDelete) return

    try {
      setDeleteLoading(bookingToDelete.id)
      const result = await deleteBooking(bookingToDelete.id)
      
      if (result.success) {
        setBookings(prev => prev.filter(item => item.id !== bookingToDelete.id))
        setDeleteModalOpen(false)
        setBookingToDelete(null)
      } else {
        console.error('Error deleting booking:', result.error)
        alert(result.error || 'Failed to delete booking')
      }
    } catch (error: any) {
      console.error('Delete error:', error)
      alert('Failed to delete booking. Please try again.')
    } finally {
      setDeleteLoading(null)
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.booking_reference.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-gray-500">Manage your bookings and experiences</p>
        </div>
        <button
          onClick={() => setShowNewBooking(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          <Plus className="w-4 h-4" />
          New Booking
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Ticket className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-xl font-bold">
                ${bookings.reduce((sum, booking) => sum + (booking.booking_data?.total_amount || 0), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Ticket className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Travelers</p>
              <p className="text-xl font-bold">
                {bookings.reduce((sum, booking) => sum + (booking.booking_data?.number_of_travelers || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Ticket className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold">
                {bookings.filter(booking => booking.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Ticket className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cancelled</p>
              <p className="text-xl font-bold">
                {bookings.filter(booking => booking.status === 'cancelled').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by booking reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No bookings found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your filters'
                : 'Get started by creating a new booking.'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <div className="mt-6">
                <button
                  onClick={() => setShowNewBooking(true)}
                  className="inline-flex text-sm items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Booking
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('booking_reference')}
                  >
                    <div className="flex items-center gap-2">
                      Reference
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Travelers
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('booking_data->total_amount')}
                  >
                    <div className="flex items-center gap-2">
                      Amount
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('timestamps->created_at')}
                  >
                    <div className="flex items-center gap-2">
                      Created
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.booking_reference}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.booking_data.number_of_travelers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.booking_data.total_amount} {booking.booking_data.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.timestamps?.created_at ? 
                        new Date(booking.timestamps.created_at).toLocaleDateString() : 
                        'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking)
                            setShowEditBooking(true)
                          }}
                          className="text-blue-400 hover:text-blue-500"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(booking.id, booking.booking_reference)}
                          className="text-gray-400 hover:text-red-600"
                          disabled={deleteLoading === booking.id}
                        >
                          {deleteLoading === booking.id ? (
                            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {(showNewBooking || showEditBooking) && (
        <BookingForm
          booking={selectedBooking || undefined}
          onSubmit={async (bookingData) => {
            try {
              if (selectedBooking) {
                // Handle update
                const result = await updateBooking(selectedBooking.id, bookingData)
                if (result.success) {
                  setShowEditBooking(false)
                  setSelectedBooking(null)
                  await loadBookings()
                } else {
                  console.error('Error updating booking:', result.error)
                  alert(result.error || 'Failed to update booking')
                }
              } else {
                // Handle create
                const result = await createBooking(bookingData)
                if (result.success) {
                  setShowNewBooking(false)
                  await loadBookings()
                } else {
                  console.error('Error creating booking:', result.error)
                  alert(result.error || 'Failed to create booking')
                }
              }
            } catch (error: any) {
              console.error('Error:', error)
              alert('An unexpected error occurred')
            }
          }}
          onClose={() => {
            setShowNewBooking(false)
            setShowEditBooking(false)
            setSelectedBooking(null)
          }}
        />
      )}

      {deleteModalOpen && bookingToDelete && (
        <DeleteConfirmationModal
          title="Delete Booking"
          message={`Are you sure you want to delete booking ${bookingToDelete.reference}? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => {
            setDeleteModalOpen(false)
            setBookingToDelete(null)
          }}
          loading={deleteLoading === bookingToDelete.id}
        />
      )}
    </div>
  )
}
