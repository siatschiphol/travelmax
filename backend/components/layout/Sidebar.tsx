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
  ChevronDown,
  Plus,
  ListPlus,
  Hotel,
  Plane,
  UserCircle,
  Building2,
  ShoppingBag,
  CreditCard
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarContext'
import { useState } from 'react'
import Image from 'next/image'

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingCart, label: 'Bookings', href: '/admin/bookings' },
  { icon: Ticket, label: 'Ticket Sales', href: '/admin/ticket-sales' },
  { 
    icon: Building, 
    label: 'Experiences', 
    href: '/admin/experiences',
    submenu: [
      { icon: ListPlus, label: 'All Experiences', href: '/admin/experiences' },
      { icon: Hotel, label: 'Add Tour', href: '/admin/experiences/add-hotel' },
      { icon: Plane, label: 'Add Event', href: '/admin/experiences/add-flight' },
      { icon: Plus, label: 'Add Activity', href: '/admin/experiences/add-activity' },
    ]
  },
  { icon: Gift, label: 'Redeem', href: '/admin/redeem' },
  { icon: Star, label: 'Reviews', href: '/admin/reviews' },
  { icon: Newspaper, label: 'News', href: '/admin/news' },
  { icon: User, label: 'Profile', href: '/admin/profile' },
  { icon: DollarSign, label: 'Finances', href: '/admin/finances' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  {
    icon: UserCircle,
    label: 'Switch View',
    href: '#',
    submenu: [
      { icon: Building2, label: 'Partner Dashboard', href: '/partners/dashboard' },
      { icon: User, label: 'User Dashboard', href: '/users/dashboard' }
    ]
  },
  { icon: Settings, label: 'Settings', href: '/admin/settings' }
]

const partnerNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/partners/dashboard' },
  { 
    icon: Building, 
    label: 'Experiences', 
    href: '/partners/experiences',
    submenu: [
      { icon: ListPlus, label: 'My Experiences', href: '/partners/experiences' },
      { icon: Plus, label: 'Add New', href: '/partners/experiences/add' }
    ]
  },
  { icon: ShoppingBag, label: 'Bookings', href: '/partners/bookings' },
  { icon: Ticket, label: 'Ticket Sales', href: '/partners/tickets' },
  { icon: DollarSign, label: 'Finances', href: '/partners/finances' },
  { icon: Star, label: 'Reviews', href: '/partners/reviews' },
  { icon: Users, label: 'Staff', href: '/partners/staff' },
  { icon: Settings, label: 'Settings', href: '/partners/settings' }
] as const

const userNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/users/dashboard' },
  { icon: ShoppingBag, label: 'My Bookings', href: '/users/bookings' },
  { icon: Heart, label: 'Favorites', href: '/users/favorites' },
  { icon: CreditCard, label: 'Payments', href: '/users/payments' },
  { icon: Star, label: 'Reviews', href: '/users/reviews' },
  { icon: User, label: 'Profile', href: '/users/profile' },
  { icon: Settings, label: 'Settings', href: '/users/settings' }
]

const bottomNavItems = [
  { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
  { icon: Search, label: 'Search', href: '/admin/search-input' }
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const handleSubmenuClick = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label)
  }

  // Get section-specific content
  const getSectionContent = () => {
    if (pathname.startsWith('/admin')) {
      return {
        title: 'Admin Dashboard',
        items: adminNavItems
      }
    } else if (pathname.startsWith('/partners')) {
      return {
        title: 'Partner Portal',
        items: partnerNavItems
      }
    } else if (pathname.startsWith('/users')) {
      return {
        title: 'User Dashboard',
        items: userNavItems
      }
    }
    return {
      title: 'TravelMax',
      items: adminNavItems
    }
  }

  const { title, items } = getSectionContent()

  // Add a back to admin button when in partner or user view
  const showBackToAdmin = pathname.startsWith('/partners') || pathname.startsWith('/users')

  return (
    <aside 
      className={`fixed left-0 top-0 bg-slate-900 text-slate-100 h-screen flex flex-col transition-all duration-300 z-50 shadow-lg ${isCollapsed ? 'w-16' : 'w-56'}`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      {/* Logo and User */}
      <div className="border-b border-slate-800/60">
        <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center py-3' : 'justify-between px-4 py-3'}`}>
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
            <Image
              src="/images/default.png"
              width={16}
              height={16}
              alt="T"
              className="shrink-0"
            />
          </div>
          {!isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-400" />
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="px-4 pb-3">
            <h3 className="font-medium text-sm text-slate-100 truncate">{title}</h3>
            <p className="text-xs text-slate-400 truncate">
              {pathname.startsWith('/admin') && 'Manage your platform'}
              {pathname.startsWith('/partners') && 'Business portal'}
              {pathname.startsWith('/users') && 'Your travel hub'}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {showBackToAdmin && (
          <div className="px-2 mb-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
            >
              <Shield className="w-5 h-5" />
              <span className={`truncate transition-all duration-300 ${isCollapsed ? 'hidden group-hover:block' : ''}`}>
                Back to Admin
              </span>
            </Link>
          </div>
        )}
        <ul className="space-y-1 px-2">
          {items.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.submenu && item.submenu.some(subItem => pathname === subItem.href))
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const isSubmenuOpen = openSubmenu === item.label

            return (
              <li key={index} className="relative">
                {hasSubmenu ? (
                  <div
                    onClick={() => handleSubmenuClick(item.label)}
                    className={`flex items-center ${isCollapsed ? 'justify-center' : ''} gap-3 px-3 py-2 rounded-lg transition-all duration-200 group cursor-pointer ${
                      isActive 
                        ? 'bg-teal-500/10 text-teal-400' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-100'}`} />
                    <span className={`truncate transition-all duration-300 ${isCollapsed ? 'hidden group-hover:block' : ''}`}>
                      {item.label}
                    </span>
                    {!isCollapsed && (
                      <ChevronDown 
                        className={`w-4 h-4 ml-auto transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`}
                      />
                    )}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-r-full" />
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center ${isCollapsed ? 'justify-center' : ''} gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      isActive 
                        ? 'bg-teal-500/10 text-teal-400' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-100'}`} />
                    <span className={`truncate transition-all duration-300 ${isCollapsed ? 'hidden group-hover:block' : ''}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-r-full" />
                    )}
                  </Link>
                )}
                
                {hasSubmenu && (
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isSubmenuOpen && (!isCollapsed || (isCollapsed && !isCollapsed)) 
                        ? 'max-h-[500px] opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className={`pl-4 mt-1 space-y-1 ${isCollapsed ? 'hidden group-hover:block' : ''}`}>
                      {item.submenu.map((subItem, subIndex) => {
                        const SubIcon = subItem.icon
                        const isSubItemActive = pathname === subItem.href
                        return (
                          <li key={subIndex}>
                            <Link
                              href={subItem.href}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                                isSubItemActive 
                                  ? 'bg-teal-500/10 text-teal-400' 
                                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                              }`}
                            >
                              <SubIcon className="w-4 h-4" />
                              <span className="text-sm">{subItem.label}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="mt-auto border-t border-slate-800">
        <ul className="p-2 space-y-1">
          {bottomNavItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center ${isCollapsed ? 'justify-center' : ''} gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-teal-500/10 text-teal-400' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-100'}`} />
                  <span className={`truncate transition-all duration-300 ${isCollapsed ? 'hidden group-hover:block' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
