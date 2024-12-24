'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Edit, Trash2, Plus, Eye, Search, Filter, ArrowUpDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { deleteListing, fetchListings } from './actions'
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal'

export default function ListingsPage() {
  const router = useRouter()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortField, setSortField] = useState('created_at')
  const [sortDirection, setSortDirection] = useState('desc')
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [listingToDelete, setListingToDelete] = useState<{ id: string, title: string } | null>(null)

  useEffect(() => {
    loadListings()
  }, [sortField, sortDirection])

  async function loadListings() {
    try {
      setLoading(true)
      const result = await fetchListings(sortField, sortDirection)
      
      if (result.success) {
        setListings(result.data || [])
      } else {
        console.error('Error fetching listings:', result.error)
        alert(result.error || 'Failed to fetch listings')
      }
    } catch (error) {
      console.error('Error loading listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string, title: string) => {
    console.log('Deleting:', { id, title });
    setListingToDelete({ id, title });
    setDeleteModalOpen(true);
  }

  const handleDelete = async () => {
    if (!listingToDelete) return;
    
    try {
      setDeleteLoading(listingToDelete.id);
      console.log('Deleting listing:', listingToDelete);
      
      const result = await deleteListing(listingToDelete.id);
      console.log('Delete result:', result);
      
      if (result.success) {
        // Remove the deleted item from the local state
        setListings(prev => prev.filter(item => item.id !== listingToDelete.id));
        setDeleteModalOpen(false);
        setListingToDelete(null);
        
        // Force a router refresh and refetch listings
        router.refresh();
        await loadListings();
      } else {
        console.error('Delete error:', result.error);
        alert(result.error || 'Failed to delete listing. Please try again.');
      }
    } catch (error: any) {
      console.error('Error in delete handler:', error);
      alert(error?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  }

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.details?.description?.short?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Listings</h1>
            <Link
              href="/admin/tours/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Tour
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search listings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : filteredListings.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No listings found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your filters'
                    : 'Get started by creating a new tour listing.'}
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <div className="mt-6">
                    <Link
                      href="/admin/tours/new"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Tour
                    </Link>
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
                        onClick={() => toggleSort('title')}
                      >
                        <div className="flex items-center gap-2">
                          Title
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => toggleSort('details->>pricing->>base_price')}
                      >
                        <div className="flex items-center gap-2">
                          Price
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => toggleSort('created_at')}
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
                    {filteredListings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              {listing.details?.media?.gallery_urls?.[0] ? (
                                <Image
                                  src={listing.details.media.gallery_urls[0]}
                                  alt={`Tour: ${listing.title}`}
                                  width={40}
                                  height={40}
                                  className="rounded-lg object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                  <Image
                                    src="/placeholder-tour.png"
                                    alt="Tour placeholder"
                                    width={40}
                                    height={40}
                                    className="rounded-lg object-cover opacity-50"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {listing.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {listing.details.description?.short}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="capitalize">{listing.type}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${listing.details.pricing?.base_price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${listing.status === 'published' ? 'bg-green-100 text-green-800' : 
                              listing.status === 'draft' ? 'bg-gray-100 text-gray-800' : 
                              'bg-red-100 text-red-800'}`}
                          >
                            {listing.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(listing.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/tours/${listing.slug}`}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <Eye className="w-5 h-5" />
                            </Link>
                            <Link
                              href={`/admin/tours/${listing.id}/edit`}
                              className="text-blue-400 hover:text-blue-500"
                            >
                              <Edit className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(listing.id, listing.title)}
                              className="text-gray-400 hover:text-red-600"
                              disabled={deleteLoading === listing.id}
                            >
                              {deleteLoading === listing.id ? (
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
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <DeleteConfirmationModal
          title="Delete Tour"
          message={`Are you sure you want to delete "${listingToDelete?.title}"? This action cannot be undone.`}
          isOpen={deleteModalOpen}
          isLoading={!!deleteLoading}
          onConfirm={handleDelete}
          onCancel={() => {
            setDeleteModalOpen(false)
            setListingToDelete(null)
          }}
        />
      )}
    </>
  )
}
