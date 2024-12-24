'use client'

import { Settings } from 'lucide-react'

export default function ChartSection() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Revenue Overview</h2>
          <p className="text-sm text-gray-500">Monthly revenue statistics</p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-lg">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {/* Chart placeholder - In a real app, you'd use a charting library like Chart.js or Recharts */}
      <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Chart visualization would go here</p>
      </div>
    </div>
  )
}
