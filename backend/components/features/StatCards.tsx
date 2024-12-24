'use client'

import { ArrowUpRight, DollarSign, Users, ShoppingBag } from 'lucide-react'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    icon: DollarSign,
    trend: 'up'
  },
  {
    title: 'Active Users',
    value: '2,345',
    change: '+15.3%',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Total Sales',
    value: '12,789',
    change: '+8.2%',
    icon: ShoppingBag,
    trend: 'up'
  }
]

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center text-sm font-medium text-green-600">
                {stat.change}
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
