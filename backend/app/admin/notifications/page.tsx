'use client'

import { Bell, Check, Clock, MessageSquare, Package, Settings } from 'lucide-react'
import Image from 'next/image'

const notifications = [
  {
    id: 1,
    type: 'message',
    title: 'New Message',
    description: 'Sarah sent you a message',
    time: '2 minutes ago',
    avatar: 'https://picsum.photos/seed/40/200',
    unread: true
  },
  {
    id: 2,
    type: 'order',
    title: 'Order Shipped',
    description: 'Your order #12345 has been shipped',
    time: '1 hour ago',
    unread: false
  },
  {
    id: 3,
    type: 'system',
    title: 'System Update',
    description: 'System maintenance scheduled for tonight',
    time: '2 hours ago',
    unread: false
  }
]

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <p className="text-gray-500">Stay updated with your latest activities</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Check className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
          All
        </button>
        <button className="px-4 py-2 hover:bg-gray-50 rounded-lg">
          Unread
        </button>
        <button className="px-4 py-2 hover:bg-gray-50 rounded-lg">
          Important
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-4 p-4 bg-white rounded-lg border ${
              notification.unread ? 'border-blue-100 bg-blue-50/50' : 'border-gray-100'
            }`}
          >
            {/* Icon or Avatar */}
            {notification.avatar ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={notification.avatar}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                {notification.type === 'message' && (
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                )}
                {notification.type === 'order' && (
                  <Package className="w-5 h-5 text-green-600" />
                )}
                {notification.type === 'system' && (
                  <Bell className="w-5 h-5 text-orange-600" />
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{notification.title}</h3>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {notification.time}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{notification.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
