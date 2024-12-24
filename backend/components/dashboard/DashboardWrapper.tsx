'use client'

import { useState, useEffect } from 'react'

interface Props {
  user: any
}

export default function DashboardWrapper({ user }: Props) {
  const [DashboardContent, setDashboardContent] = useState<any>(null)

  useEffect(() => {
    const loadDashboard = async () => {
      const { default: Component } = await import('./DashboardContent')
      setDashboardContent(() => Component)
    }
    loadDashboard()
  }, [])

  if (!DashboardContent) {
    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <DashboardContent user={user} />
}
