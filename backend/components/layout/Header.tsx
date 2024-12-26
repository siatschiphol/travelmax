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
    <header className={`fixed top-0 right-0 left-0 transition-all duration-300 z-10 ml-16 h-16 border-b ${
      isDark 
        ? 'bg-secondary-800/80 border-secondary-700/50 text-secondary-50' 
        : 'bg-white/80 border-secondary-200/80 text-secondary-900'
    } backdrop-blur-sm`}>
      <div className="h-16 px-8">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-secondary-50' : 'text-secondary-900'}`}>
                {getHeaderTitle()}
              </h1>
              <p className={`text-sm ${isDark ? 'text-secondary-400' : 'text-secondary-500'}`}>
                {getHeaderDescription()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? 'text-secondary-400' : 'text-secondary-400'
              }`} />
              <input
                type="text"
                placeholder="Search..."
                className={`w-64 pl-10 pr-4 py-2 text-sm rounded-lg transition-all focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'bg-secondary-900/50 border-secondary-700 text-secondary-100 placeholder-secondary-500 focus:ring-primary-500/20 focus:border-primary-500/30' 
                    : 'bg-secondary-50/80 border-secondary-200 text-secondary-900 placeholder-secondary-400 focus:ring-primary-500/20 focus:border-primary-500/30'
                } border focus:bg-opacity-100`}
              />
            </div>

            <button 
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-secondary-700/50 text-secondary-400 hover:text-secondary-200' 
                  : 'hover:bg-secondary-100 text-secondary-500 hover:text-secondary-700'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className={`p-2 rounded-lg relative group transition-colors ${
              isDark 
                ? 'hover:bg-secondary-700/50 text-secondary-400 hover:text-secondary-200' 
                : 'hover:bg-secondary-100 text-secondary-500 hover:text-secondary-700'
            }`}>
              <Bell className="w-5 h-5" />
              <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ring-2 ${
                isDark 
                  ? 'bg-primary-400 ring-secondary-800' 
                  : 'bg-primary-500 ring-white'
              }`} />
            </button>

            <div className="relative ml-2">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-3 p-1.5 rounded-lg group transition-colors ${
                  isDark 
                    ? 'hover:bg-secondary-700/50' 
                    : 'hover:bg-secondary-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark 
                    ? 'bg-primary-500/10 text-primary-400' 
                    : 'bg-primary-50 text-primary-600'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <div className="hidden md:block text-left">
                  <p className={`text-sm font-medium ${
                    isDark 
                      ? 'text-secondary-100 group-hover:text-secondary-50' 
                      : 'text-secondary-700 group-hover:text-secondary-900'
                  }`}>
                    {user?.email?.split('@')[0]}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-secondary-400' : 'text-secondary-500'}`}>
                    {getUserRole()}
                  </p>
                </div>
                <Menu className={`w-4 h-4 ${
                  isDark 
                    ? 'text-secondary-400 group-hover:text-secondary-200' 
                    : 'text-secondary-400 group-hover:text-secondary-600'
                }`} />
              </button>

              {showUserMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 border ${
                  isDark 
                    ? 'bg-secondary-800 border-secondary-700' 
                    : 'bg-white border-secondary-200/80'
                }`}>
                  <button
                    onClick={() => router.push(getProfilePath())}
                    className={`w-full px-4 py-2 text-sm flex items-center gap-2 ${
                      isDark 
                        ? 'text-secondary-100 hover:bg-secondary-700/50' 
                        : 'text-secondary-700 hover:bg-secondary-50'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => router.push(getSettingsPath())}
                    className={`w-full px-4 py-2 text-sm flex items-center gap-2 ${
                      isDark 
                        ? 'text-secondary-100 hover:bg-secondary-700/50' 
                        : 'text-secondary-700 hover:bg-secondary-50'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <hr className={isDark ? 'border-secondary-700' : 'border-secondary-200/80'} />
                  <button
                    onClick={handleSignOut}
                    className={`w-full px-4 py-2 text-sm flex items-center gap-2 ${
                      isDark 
                        ? 'text-error-400 hover:bg-secondary-700/50' 
                        : 'text-error-600 hover:bg-secondary-50'
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
  )
}
