'use client'

import { Book, FileQuestion, MessageSquare, Search } from 'lucide-react'

const helpCategories = [
  {
    title: 'Getting Started',
    icon: Book,
    description: 'Learn the basics of using the dashboard',
    articles: [
      'Quick start guide',
      'Dashboard overview',
      'Basic navigation'
    ]
  },
  {
    title: 'FAQs',
    icon: FileQuestion,
    description: 'Frequently asked questions',
    articles: [
      'Account settings',
      'Data management',
      'Security features'
    ]
  },
  {
    title: 'Support',
    icon: MessageSquare,
    description: 'Get help from our support team',
    articles: [
      'Contact support',
      'Report an issue',
      'Feature request'
    ]
  }
]

export default function HelpPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Help Center</h1>
        <p className="text-gray-500 mt-2">Find answers and get support</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {helpCategories.map((category) => {
          const Icon = category.icon
          return (
            <div
              key={category.title}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
              <p className="text-gray-500 mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.articles.map((article) => (
                  <li key={article}>
                    <button className="text-blue-600 hover:underline text-sm">
                      {article}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
