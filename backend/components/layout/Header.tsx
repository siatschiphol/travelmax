'use client'

import { Bell, Search, User, Menu, Settings, LogOut, Sun, Moon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useSidebar } from '@/contexts/SidebarContext'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useTheme } from 'next-themes'

export default function Header() {
  const pathname = usePathname()
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const { isCollapsed } = useSidebar()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  const getHeaderTitle = () => {
    if (pathname.startsWith('/admin')) {
      return 'Admin Panel'
    } else if (pathname.startsWith('/partners')) {
      return 'Partner Portal'
    } else if (pathname.startsWith('/users')) {
      return 'User Dashboard'
    }
    return 'TravelMax'
  }

  const getHeaderDescription = () => {
    if (pathname.startsWith('/admin')) {
      return 'Manage your travel platform'
    } else if (pathname.startsWith('/partners')) {
      return 'Manage your travel business'
    } else if (pathname.startsWith('/users')) {
      return 'Your travel journey starts here'
    }
    return 'Welcome to TravelMax'
  }

  const getUserRole = () => {
    if (pathname.startsWith('/admin')) {
      return 'Administrator'
    } else if (pathname.startsWith('/partners')) {
      return 'Partner'
    } else if (pathname.startsWith('/users')) {
      return 'User'
    }
    return 'Guest'
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const getProfilePath = () => {
    if (pathname.startsWith('/admin')) {
      return '/admin/profile'
    } else if (pathname.startsWith('/partners')) {
      return '/partners/profile'
    } else if (pathname.startsWith('/users')) {
      return '/users/profile'
    }
    return '/profile'
  }

  const getSettingsPath = () => {
    if (pathname.startsWith('/admin')) {
      return '/admin/settings'
    } else if (pathname.startsWith('/partners')) {
      return '/partners/settings'
    } else if (pathname.startsWith('/users')) {
      return '/users/settings'
    }
    return '/settings'
  }

  return (
    <>
      <style jsx>{`
        #header-search {
          background-color: #f4f4f4 !important;
        }
        #header-search:focus {
          background-color: #f4f4f4 !important;
        }
      `}</style>
      <header className={`fixed top-0 right-0 left-0 z-10 ml-16 h-16 bg-white transition-colors duration-200 ${
        isDark && 'bg-gray-900'
      } shadow-sm backdrop-blur-sm`}>
        <div className="h-16 px-8">
          <div className="max-w-6xl mx-auto h-full flex items-center justify-between gap-8">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  id="header-search"
                  className={`w-full pl-11 pr-4 py-2 text-sm rounded-full transition-colors focus:outline-none ${
                    isDark 
                      ? 'text-gray-100 placeholder-gray-500 focus:ring-1 focus:ring-blue-500' 
                      : 'text-gray-900 placeholder-gray-500 focus:ring-1 focus:ring-blue-500'
                  }`}
                />
              </div>
            </div>

            {/* Right side - Navigation and User Menu */}
            <div className="flex items-center gap-6">
              {/* Main Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => router.push('/admin/dashboard')}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    pathname.startsWith('/admin/dashboard')
                      ? isDark ? 'text-blue-400' : 'text-blue-600'
                      : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Menu className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => router.push('/admin/profile')}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    pathname.startsWith('/admin/profile')
                      ? isDark ? 'text-blue-400' : 'text-blue-600'
                      : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={() => router.push('/admin/reviews')}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    pathname.startsWith('/admin/reviews')
                      ? isDark ? 'text-blue-400' : 'text-blue-600'
                      : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  Reviews
                </button>
                <button
                  onClick={() => router.push('/admin/settings')}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    pathname.startsWith('/admin/settings')
                      ? isDark ? 'text-blue-400' : 'text-blue-600'
                      : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </nav>

              {/* Theme Toggle */}
              <button 
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors ${
                    isDark 
                      ? 'hover:bg-gray-800' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDark 
                      ? 'bg-gray-800 text-blue-400' 
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className={`text-sm font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {user?.email?.split('@')[0]}
                    </p>
                    <p className={`text-xs ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {getUserRole()}
                    </p>
                  </div>
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
                    isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white'
                  }`}>
                    <button
                      onClick={() => router.push(getProfilePath())}
                      className={`w-full px-4 py-2 text-sm flex items-center gap-2 ${
                        isDark 
                          ? 'text-gray-300 hover:bg-gray-800' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => router.push(getSettingsPath())}
                      className={`w-full px-4 py-2 text-sm flex items-center gap-2 ${
                        isDark 
                          ? 'text-gray-300 hover:bg-gray-800' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <hr className={isDark ? 'border-gray-800' : 'border-gray-200'} />
                    <button
                      onClick={handleSignOut}
                      className={`w-full px-4 py-2 text-sm flex items-center gap-2 ${
                        isDark 
                          ? 'text-red-400 hover:bg-gray-800' 
                          : 'text-red-600 hover:bg-gray-50'
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
