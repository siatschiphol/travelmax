'use client'

import { 
  LayoutDashboard, 
  ShoppingCart, 
  Ticket,
  Building,
  Gift,
  Star,
  Newspaper,
  User,
  DollarSign,
  Users,
  Settings,
  Bell,
  Search,
  LogOut,
  Heart,
  Compass,
  FileText,
  Shield,
  Users as UsersIcon,
  Compass as CompassIcon,
  FileText as FileTextIcon,
  Shield as ShieldIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { TravelmaxLogo } from '../logo/TravelmaxLogo'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingCart, label: 'Bookings', href: '/admin/bookings' },
  { icon: Ticket, label: 'Ticket Sales', href: '/admin/ticket-sales' },
  { icon: Building, label: 'Listings', href: '/admin/listings' },
  { icon: Gift, label: 'Redeem', href: '/admin/redeem' },
  { icon: Star, label: 'Reviews', href: '/admin/reviews' },
  { icon: Newspaper, label: 'News', href: '/admin/news' },
  { icon: User, label: 'Profile', href: '/admin/profile' },
  { icon: DollarSign, label: 'Finances', href: '/admin/finances' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' }
]

const bottomNavItems = [
  { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
  { icon: Search, label: 'Search', href: '/admin/search-input' }
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={`fixed left-0 top-0 bg-[#0f172a] text-gray-100 h-screen flex flex-col transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <TravelmaxLogo size={isCollapsed ? 'small' : 'default'} />
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-gray-200 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center shrink-0">
            <UsersIcon className="w-6 h-6 text-gray-300" />
          </div>
          <div className={`min-w-0 ${isCollapsed ? 'hidden' : 'block'}`}>
            <h3 className="font-medium text-sm text-gray-100 truncate">John Doe</h3>
            <p className="text-xs text-gray-400 truncate">Administrator</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-4">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-100'}`} />
                  <span className={`text-sm font-medium truncate ${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-700/50 p-4">
        <ul className="space-y-1">
          {bottomNavItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-100'
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${pathname === item.href ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-100'}`} />
                <span className={`text-sm font-medium truncate ${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-gray-700/50">
        <button className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-100 transition-all duration-200 group">
          <LogOut className="w-5 h-5 shrink-0 text-gray-400 group-hover:text-gray-100" />
          <span className={`text-sm font-medium truncate ${isCollapsed ? 'hidden' : 'block'}`}>Logout</span>
        </button>
      </div>
    </div>
  )
}
