'use client'

import { useState } from 'react'
import { Building, Filter, Lock, Mail, MoreHorizontal, Phone, Plus, Search, Shield, User, X } from 'lucide-react'
import Image from 'next/image'
import AdminModal from './components/AdminModal'
import PartnerModal from './components/PartnerModal'
import StaffModal from './components/StaffModal'
import UserModal from './components/UserModal'

interface UserData {
  id: string
  name: string
  email: string
  role: 'admin' | 'staff' | 'supplier' | 'customer'
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  lastActive: string
  phone?: string
  company?: string
}

const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-12-20',
    phone: '+1 (555) 123-4567',
    company: 'Admin Co.'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@luxurystays.com',
    role: 'supplier',
    status: 'active',
    joinDate: '2024-03-20',
    lastActive: '2024-12-19',
    phone: '+1 (555) 987-6543',
    company: 'Luxury Stays Inc.'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'customer',
    status: 'inactive',
    joinDate: '2024-06-10',
    lastActive: '2024-11-30'
  }
]

export default function UsersPage() {
  const [showNewUserMenu, setShowNewUserMenu] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [showPartnerModal, setShowPartnerModal] = useState(false)
  const [showStaffModal, setShowStaffModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'staff':
        return 'bg-blue-100 text-blue-800'
      case 'supplier':
        return 'bg-green-100 text-green-800'
      case 'customer':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />
      case 'staff':
        return <User className="w-4 h-4" />
      case 'supplier':
        return <Building className="w-4 h-4" />
      case 'customer':
        return <User className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Users & Staff</h1>
          <p className="text-gray-500">Manage user accounts and permissions</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowNewUserMenu(!showNewUserMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
          
          {showNewUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  setShowNewUserMenu(false)
                  setShowAdminModal(true)
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
              >
                Create New Admin
              </button>
              <button
                onClick={() => {
                  setShowNewUserMenu(false)
                  setShowPartnerModal(true)
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
              >
                Create New Partner
              </button>
              <button
                onClick={() => {
                  setShowNewUserMenu(false)
                  setShowStaffModal(true)
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
              >
                Create New Staff
              </button>
              <button
                onClick={() => {
                  setShowNewUserMenu(false)
                  setShowUserModal(true)
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
              >
                Create New App User
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Admins</p>
              <p className="text-xl font-bold">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Staff</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Suppliers</p>
              <p className="text-xl font-bold">48</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-xl font-bold">1,254</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins</option>
                <option value="staff">Staff</option>
                <option value="supplier">Suppliers</option>
                <option value="customer">Customers</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium">Role</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Contact</th>
                <th className="text-left p-4 font-medium">Join Date</th>
                <th className="text-left p-4 font-medium">Last Active</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        {user.company && (
                          <p className="text-sm text-gray-500">{user.company}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 w-fit ${getRoleColor(user.role)}`}>
                      {getRoleIcon(user.role)}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="w-4 h-4" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{user.joinDate}</td>
                  <td className="p-4 text-gray-500">{user.lastActive}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Lock className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing 3 of 1,319 users</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <AdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSubmit={(data) => {
          console.log('Admin data:', data)
          setShowAdminModal(false)
        }}
      />

      <PartnerModal
        isOpen={showPartnerModal}
        onClose={() => setShowPartnerModal(false)}
        onSubmit={(data) => {
          console.log('Partner data:', data)
          setShowPartnerModal(false)
        }}
      />

      <StaffModal
        isOpen={showStaffModal}
        onClose={() => setShowStaffModal(false)}
        onSubmit={(data) => {
          console.log('Staff data:', data)
          setShowStaffModal(false)
        }}
      />

      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSubmit={(data) => {
          console.log('User data:', data)
          setShowUserModal(false)
        }}
      />
    </div>
  )
}
