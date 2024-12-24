'use client'

import DashboardLayout from '@/components/layouts/DashboardLayout'
import StatCards from '@/components/features/StatCards'
import ChartSection from '@/components/features/ChartSection'
import { Activity, Zap } from 'lucide-react'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100">
            <Zap className="w-5 h-5" />
            <span>Quick Action 1</span>
          </button>
          <button className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100">
            <Activity className="w-5 h-5" />
            <span>Quick Action 2</span>
          </button>
        </div>

        {/* Stats */}
        <StatCards />

        {/* Chart */}
        <ChartSection />

        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <p className="text-gray-500">No recent activity</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
