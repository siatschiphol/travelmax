'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Edit, Trash2, Plus, Eye, Search, Filter, ArrowUpDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { deleteExperience, fetchExperiences } from './actions'
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal'

export default function ExperiencesPage() {
  const router = useRouter()
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortField, setSortField] = useState('created_at')  // Keep this as is for UI display
  const [sortDirection, setSortDirection] = useState('desc')
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [experienceToDelete, setExperienceToDelete] = useState<{ id: string, title: string } | null>(null)

  useEffect(() => {
    loadExperiences()
  }, [sortField, sortDirection])

  async function loadExperiences() {
    try {
      setLoading(true)
      const result = await fetchExperiences(`timestamps->>'created_at'`, sortDirection)
      
      if (result.success) {
        setExperiences(result.data || [])
      } else {
        console.error('Error fetching experiences:', result.error)
        alert(result.error || 'Failed to fetch experiences')
      }
    } catch (error) {
      console.error('Error loading experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string, title: string) => {
    console.log('Deleting:', { id, title });
    setExperienceToDelete({ id, title });
    setDeleteModalOpen(true);
  }

  const handleDelete = async () => {
    if (!experienceToDelete) return;
    
    try {
      setDeleteLoading(experienceToDelete.id);
      console.log('Deleting experience:', experienceToDelete);
      
      const result = await deleteExperience(experienceToDelete.id);
      console.log('Delete result:', result);
      
      if (result.success) {
        // Remove the deleted item from the local state
        setExperiences(prev => prev.filter(item => item.id !== experienceToDelete.id));
        setDeleteModalOpen(false);
        setExperienceToDelete(null);
        
        // Force a router refresh and refetch experiences
        router.refresh();
        await loadExperiences();
      } else {
        console.error('Delete error:', result.error);
        alert(result.error || 'Failed to delete experience. Please try again.');
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

  const filteredExperiences = experiences.filter(experience => {
    const matchesSearch = experience.details?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.details?.description?.short?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || experience.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Experiences</h1>
            <Link
              href="/admin/experiences/new"
              className="inline-flex text-sm items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Experience
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
                    placeholder="Search experiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            ) : filteredExperiences.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No experiences found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your filters'
                    : 'Get started by creating a new experience.'}
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <div className="mt-6">
                    <Link
                      href="/admin/experiences/new"
                      className="inline-flex text-sm items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Experience
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
                    {filteredExperiences.map((experience) => (
                      <tr key={experience.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              {experience.details?.media?.gallery_urls?.[0] ? (
                                <Image
                                  src={experience.details.media.gallery_urls[0]}
                                  alt={`Experience: ${experience.details.title}`}
                                  width={40}
                                  height={40}
                                  className="rounded-lg object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                  <Image
                                    src="/placeholder-experience.png"
                                    alt="Experience placeholder"
                                    width={40}
                                    height={40}
                                    className="rounded-lg object-cover opacity-50"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {experience.details.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {experience.details.description?.short}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="capitalize">{experience.type}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${experience.details.pricing?.base_price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${experience.status === 'published' ? 'bg-green-100 text-green-800' : 
                              experience.status === 'draft' ? 'bg-gray-100 text-gray-800' : 
                              'bg-red-100 text-red-800'}`}
                          >
                            {experience.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {experience.timestamps?.created_at ? 
                            new Date(experience.timestamps.created_at).toLocaleDateString() : 
                            'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/experiences/${experience.slug}`}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <Eye className="w-5 h-5" />
                            </Link>
                            <Link
                              href={`/admin/experiences/${experience.id}/edit`}
                              className="text-blue-400 hover:text-blue-500"
                            >
                              <Edit className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(experience.id, experience.details.title)}
                              className="text-gray-400 hover:text-red-600"
                              disabled={deleteLoading === experience.id}
                            >
                              {deleteLoading === experience.id ? (
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
          title="Delete Experience"
          message={`Are you sure you want to delete "${experienceToDelete?.title}"? This action cannot be undone.`}
          isOpen={deleteModalOpen}
          isLoading={!!deleteLoading}
          onConfirm={handleDelete}
          onCancel={() => {
            setDeleteModalOpen(false)
            setExperienceToDelete(null)
          }}
        />
      )}
    </>
  )
}
