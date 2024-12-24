'use client'

export default function ContentLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode
  title: string
  description?: string
}) {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && (
          <p className="mt-2 text-gray-500">{description}</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Side navigation - hidden on mobile */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <nav className="sticky top-6 space-y-2">
            {/* Add side navigation items here */}
          </nav>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
