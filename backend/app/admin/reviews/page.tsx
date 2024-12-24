'use client'

import { useState } from 'react'
import { Star, MessageSquare, UserCheck, Search, Filter, Plus, ThumbsUp, Flag, MoreHorizontal, Mail } from 'lucide-react'

interface Review {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  type: 'customer' | 'professional'
  status: 'published' | 'pending' | 'flagged'
  helpful: number
  response?: string
}

const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'John Doe',
    rating: 5,
    comment: 'Excellent service and beautiful property! Would definitely recommend.',
    date: '2024-12-20',
    type: 'customer',
    status: 'published',
    helpful: 12
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    rating: 4,
    comment: 'Great experience overall. The amenities were top-notch.',
    date: '2024-12-19',
    type: 'professional',
    status: 'published',
    helpful: 8,
    response: 'Thank you for your detailed review!'
  }
]

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState('customer')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showRequestReview, setShowRequestReview] = useState(false)

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter
    const matchesType = activeTab === 'all' || review.type === activeTab
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'flagged':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="text-gray-500">Manage customer and professional reviews</p>
        </div>
        <button
          onClick={() => setShowRequestReview(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Request Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-xl font-bold">4.8/5</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-xl font-bold">156</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Professional Reviews</p>
              <p className="text-xl font-bold">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Helpful Votes</p>
              <p className="text-xl font-bold">892</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveTab('customer')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Customer Reviews
          </button>
          <button
            onClick={() => setActiveTab('professional')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'professional' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Professional Reviews
          </button>
        </div>
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="pending">Pending</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.customerName}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    review.type === 'professional' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {review.type.charAt(0).toUpperCase() + review.type.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(review.status)}`}>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Flag">
                  <Flag className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{review.comment}</p>
            {review.response && (
              <div className="mt-4 pl-4 border-l-2 border-gray-200">
                <p className="text-sm text-gray-500">Response:</p>
                <p className="mt-1 text-gray-600">{review.response}</p>
              </div>
            )}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>{review.date}</span>
                <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                  <ThumbsUp className="w-4 h-4" />
                  {review.helpful} helpful
                </button>
              </div>
              <button className="text-blue-500 hover:text-blue-600">Reply</button>
            </div>
          </div>
        ))}
      </div>

      {showRequestReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Request Professional Review</h2>
              <button
                onClick={() => setShowRequestReview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Plus className="w-4 h-4" rotate={45} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Reviewer Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter your message to the reviewer"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRequestReview(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
