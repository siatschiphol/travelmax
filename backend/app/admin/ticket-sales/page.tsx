'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, DollarSign, Filter, MoreHorizontal, Plus, Search, Ticket, X } from 'lucide-react'
import { fetchTicketSales, deleteTicketSale, createTicketSale, updateTicketSale } from './actions'
import { TicketSale } from './types'
import TicketForm from './TicketForm'
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal'

export default function TicketSalesPage() {
  const [tickets, setTickets] = useState<TicketSale[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewSale, setShowNewSale] = useState(false)
  const [showEditSale, setShowEditSale] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<TicketSale | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [ticketToDelete, setTicketToDelete] = useState<TicketSale | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  useEffect(() => {
    loadTickets()
  }, [])

  async function loadTickets() {
    try {
      setLoading(true)
      const result = await fetchTicketSales()
      
      if (result.success) {
        setTickets(result.data || [])
      } else {
        console.error('Error fetching tickets:', result.error)
        alert(result.error || 'Failed to fetch tickets')
      }
    } catch (error: any) {
      console.error('Error loading tickets:', error?.message || error)
      alert('Failed to load tickets. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!ticketToDelete) return

    try {
      setDeleteLoading(ticketToDelete.id)
      const result = await deleteTicketSale(ticketToDelete.id)
      
      if (result.success) {
        setTickets(prev => prev.filter(item => item.id !== ticketToDelete.id))
        setShowDeleteModal(false)
        setTicketToDelete(null)
      } else {
        console.error('Error deleting ticket:', result.error)
        alert(result.error || 'Failed to delete ticket')
      }
    } catch (error: any) {
      console.error('Delete error:', error)
      alert('Failed to delete ticket. Please try again.')
    } finally {
      setDeleteLoading(null)
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.booking_reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.booking_data.contact_details?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
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
          <h1 className="text-2xl font-bold">Ticket Sales</h1>
          <p className="text-gray-500">Manage your ticket sales and events</p>
        </div>
        <button
          onClick={() => setShowNewSale(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          <Plus className="w-4 h-4" />
          New Ticket Sale
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded">
              <Ticket className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-xl font-bold">
                ${tickets.reduce((sum, ticket) => sum + ticket.booking_data.total_amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded">
              <Ticket className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Tickets</p>
              <p className="text-xl font-bold">
                {tickets.reduce((sum, ticket) => sum + ticket.booking_data.number_of_travelers, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded">
              <Ticket className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold">
                {tickets.filter(ticket => ticket.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded">
              <Ticket className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cancelled</p>
              <p className="text-xl font-bold">
                {tickets.filter(ticket => ticket.status === 'cancelled').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Reference</th>
                <th className="text-left p-4 font-medium">Customer</th>
                <th className="text-left p-4 font-medium">Travelers</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    Loading tickets...
                  </td>
                </tr>
              ) : filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No tickets found
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{ticket.booking_reference}</div>
                    </td>
                    <td className="p-4">
                      {ticket.booking_data.contact_details?.name || 'N/A'}
                    </td>
                    <td className="p-4">{ticket.booking_data.number_of_travelers}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {ticket.booking_data.booking_date}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(ticket.status)}`}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {ticket.booking_data.total_amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket)
                            setShowEditSale(true)
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setTicketToDelete(ticket)
                            setShowDeleteModal(true)
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(showNewSale || showEditSale) && (
        <TicketForm
          ticket={selectedTicket || undefined}
          onSubmit={async (ticketData) => {
            try {
              if (selectedTicket) {
                // Handle update
                const result = await updateTicketSale(selectedTicket.id, ticketData)
                if (result.success) {
                  setShowEditSale(false)
                  setSelectedTicket(null)
                  await loadTickets()
                } else {
                  console.error('Error updating ticket:', result.error)
                  alert(result.error || 'Failed to update ticket')
                }
              } else {
                // Handle create
                const result = await createTicketSale(ticketData)
                if (result.success) {
                  setShowNewSale(false)
                  await loadTickets()
                } else {
                  console.error('Error creating ticket:', result.error)
                  alert(result.error || 'Failed to create ticket')
                }
              }
            } catch (error: any) {
              console.error('Error:', error)
              alert('An unexpected error occurred')
            }
          }}
          onClose={() => {
            setShowNewSale(false)
            setShowEditSale(false)
            setSelectedTicket(null)
          }}
        />
      )}

      {showDeleteModal && ticketToDelete && (
        <DeleteConfirmationModal
          title="Delete Ticket Sale"
          message={`Are you sure you want to delete ticket sale ${ticketToDelete.booking_reference}? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteModal(false)
            setTicketToDelete(null)
          }}
          loading={deleteLoading === ticketToDelete.id}
        />
      )}
    </div>
  )
}
