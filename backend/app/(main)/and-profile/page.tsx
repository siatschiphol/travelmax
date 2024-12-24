'use client'

import { Calendar, Edit2, MapPin, MessageSquare, User } from 'lucide-react'
import Image from 'next/image'

const activities = [
  {
    id: 1,
    type: 'post',
    content: 'Shared a new project update',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'comment',
    content: 'Commented on Design System',
    timestamp: '4 hours ago'
  }
]

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="relative mb-8">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 rounded-xl overflow-hidden">
          <Image
            src="https://picsum.photos/seed/50/1200/400"
            alt="Cover"
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white">
            <Image
              src="https://picsum.photos/seed/51/200"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-600">Product Designer</p>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute bottom-4 right-8 flex space-x-4">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Info */}
        <div className="space-y-6">
          {/* About */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <p className="text-gray-600">
              Product designer with 5+ years of experience in creating digital products
              and solving complex problems through user-centered design.
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                San Francisco, CA
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                Joined March 2020
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-semibold">245</p>
                <p className="text-gray-500">Projects</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">5.2k</p>
                <p className="text-gray-500">Followers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Activity */}
        <div className="md:col-span-2 space-y-6">
          {/* Activity Feed */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Activity</h2>
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-600">{activity.content}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${60 + i}/400/300`}
                    alt={`Project ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
