'use client'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import { SidebarProvider } from '@/contexts/SidebarContext'

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen ml-16 lg:ml-56">
          <Header />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  )
}
