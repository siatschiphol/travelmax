'use client'

import { useState } from 'react'
import { Bell, Edit, Globe, MoreHorizontal, Plus, Search, Trash2, MessageSquare, X } from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  content: string
  category: string
  publishDate: string
  status: 'published' | 'draft' | 'archived'
  author: string
  views: number
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'New Feature: Instant Booking',
    content: "We're excited to announce our new instant booking feature...",
    category: 'Feature Update',
    publishDate: '2024-12-20',
    status: 'published',
    author: 'Admin Team',
    views: 1250
  },
  {
    id: '2',
    title: 'Holiday Season Special Offers',
    content: 'Check out our exclusive holiday season deals...',
    category: 'Promotion',
    publishDate: '2024-12-19',
    status: 'published',
    author: 'Marketing Team',
    views: 890
  }
]

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('news')
  const [showNewItem, setShowNewItem] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredNews = mockNews.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">News & Notifications</h1>
          <p className="text-gray-500">Manage news articles and notifications</p>
        </div>
        <button
          onClick={() => setShowNewItem(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          New Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Published Articles</p>
              <p className="text-xl font-bold">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-xl font-bold">12.5K</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Comments</p>
              <p className="text-xl font-bold">156</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'news' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            News
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'tips' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Tips
          </button>
        </div>
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search news..."
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

      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>{item.publishDate}</span>
                  <span>•</span>
                  <span>{item.author}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Delete">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{item.content}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Globe className="w-4 h-4" />
                {item.views} views
              </div>
              <button className="text-blue-500 hover:text-blue-600">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {showNewItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Article</h2>
              <button
                onClick={() => setShowNewItem(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter article title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select category</option>
                    <option value="feature">Feature Update</option>
                    <option value="promotion">Promotion</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="Enter article content"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewItem(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
