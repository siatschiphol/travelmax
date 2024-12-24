'use client'

import { HelpCircle, Mail, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            <span>© {currentYear} Analytics Dashboard. Made with </span>
            <Heart className="w-4 h-4 inline-block text-red-500 mx-1" />
            <span>by Your Company</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/admin/help"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help Center</span>
            </Link>
            <Link
              href="/admin/contact"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
