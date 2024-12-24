'use client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      {/* Quick stats header */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Quick Stats</h3>
            <p className="text-2xl font-semibold mt-1">Overview</p>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {/* Add action buttons here */}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {children}
      </div>
    </div>
  )
}
