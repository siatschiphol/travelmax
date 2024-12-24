'use client'

import { Book, ChevronRight, Search } from 'lucide-react'
import ContentLayout from '@/components/layouts/ContentLayout'

const articles = [
  {
    id: 1,
    title: 'Getting Started Guide',
    category: 'Basics',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Advanced Features',
    category: 'Features',
    readTime: '10 min read'
  },
  {
    id: 3,
    title: 'API Documentation',
    category: 'Developer',
    readTime: '15 min read'
  }
]

export default function DocumentPage() {
  return (
    <ContentLayout
      title="Documentation"
      description="Browse our guides and documentation"
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Installation', 'Configuration', 'Deployment', 'FAQs'].map((link) => (
            <button
              key={link}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <span className="font-medium">{link}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Popular Articles</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-500 cursor-pointer"
              >
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Book className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{article.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">{article.category}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}
