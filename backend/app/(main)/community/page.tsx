'use client'

import { MessageSquare, Users } from 'lucide-react'
import Image from 'next/image'

const posts = [
  {
    id: 1,
    author: 'John Doe',
    avatar: 'https://picsum.photos/seed/20/200',
    content: 'Just shared a new project update!',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    author: 'Jane Smith',
    avatar: 'https://picsum.photos/seed/21/200',
    content: 'Looking for collaborators on a new venture',
    timestamp: '4 hours ago'
  }
]

export default function CommunityPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar */}
      <div className="w-full lg:w-64 space-y-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h2 className="font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li className="text-blue-600">General Discussion</li>
            <li className="text-gray-600 hover:text-blue-600">Announcements</li>
            <li className="text-gray-600 hover:text-blue-600">Help & Support</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Create Post */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <textarea
            placeholder="Share something with the community..."
            className="w-full p-2 border border-gray-200 rounded-lg resize-none"
            rows={3}
          />
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Post
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.avatar}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{post.author}</h3>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <p className="text-gray-700">{post.content}</p>
              <div className="mt-4 flex items-center gap-4 text-gray-500">
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <MessageSquare className="w-4 h-4" />
                  <span>Comment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-72 space-y-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h2 className="font-semibold mb-4">Community Members</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>2,345 members</span>
          </div>
        </div>
      </div>
    </div>
  )
}
