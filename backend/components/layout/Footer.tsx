'use client'

import { HelpCircle, Mail, Heart } from 'lucide-react'
import Link from 'next/link'
import { useSidebar } from '@/contexts/SidebarContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { isCollapsed } = useSidebar()

  return (
    <footer className={`fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 py-3 transition-all duration-300 z-10 ml-16 h-14`}>
      <div className="px-8 h-full">
        <div className="max-w-6xl mx-auto h-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 h-full">
            <div className="text-gray-500 text-sm flex items-center gap-1">
              <span> {currentYear} Analytics Dashboard. Made with </span>
              <Heart className="w-4 h-4 text-red-500 inline-block mx-0.5" />
              <span>by Your Company</span>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/admin/help"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm group transition-colors"
              >
                <HelpCircle className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                <span>Help Center</span>
              </Link>
              <Link
                href="/admin/contact"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm group transition-colors"
              >
                <Mail className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
