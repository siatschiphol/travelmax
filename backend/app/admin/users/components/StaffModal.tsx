'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

interface StaffModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function StaffModal({ isOpen, onClose, onSubmit }: StaffModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    password: '',
    phone: '',
    countryCode: '+1',
    role: '',
    permissions: {
      managePartnerListings: false,
      finances: false,
      systemSettings: false,
      viewAnalytics: false,
      bookingManagement: false
    },
    startDate: '',
    notes: ''
  })

  const [passwordStrength, setPasswordStrength] = useState(0)

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^a-zA-Z0-9]/)) strength++
    return strength
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setFormData(prev => ({ ...prev, password: newPassword }))
    setPasswordStrength(calculatePasswordStrength(newPassword))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create New Staff Member</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Staff Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Staff Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company*</label>
                <select
                  required
                  value={formData.company}
                  onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select company</option>
                  <option value="company1">Company 1</option>
                  <option value="company2">Company 2</option>
                  {/* Add more companies dynamically */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email*</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="staff@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password*</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
                <div className="mt-1 h-1 bg-gray-200 rounded">
                  <div
                    className={`h-full rounded transition-all ${
                      passwordStrength === 0 ? 'w-0' :
                      passwordStrength === 1 ? 'w-1/4 bg-red-500' :
                      passwordStrength === 2 ? 'w-2/4 bg-yellow-500' :
                      passwordStrength === 3 ? 'w-3/4 bg-blue-500' :
                      'w-full bg-green-500'
                    }`}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-1/3">
                  <label className="block text-sm font-medium mb-1">Country Code</label>
                  <select
                    value={formData.countryCode}
                    onChange={e => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+31">+31</option>
                    {/* Add more country codes as needed */}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Role and Permissions Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Role and Permissions</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Role*</label>
              <select
                required
                value={formData.role}
                onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select role</option>
                <option value="partner_admin">Partner Admin</option>
                <option value="sales_staff">Sales Staff</option>
                <option value="customer_support">Customer Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rights</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.managePartnerListings}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      permissions: { ...prev.permissions, managePartnerListings: e.target.checked }
                    }))}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span>Manage Partner Listings</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.finances}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      permissions: { ...prev.permissions, finances: e.target.checked }
                    }))}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span>Finances</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.systemSettings}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      permissions: { ...prev.permissions, systemSettings: e.target.checked }
                    }))}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span>System Settings</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.viewAnalytics}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      permissions: { ...prev.permissions, viewAnalytics: e.target.checked }
                    }))}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span>View Analytics and Reports</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.bookingManagement}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      permissions: { ...prev.permissions, bookingManagement: e.target.checked }
                    }))}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span>Booking Management</span>
                </label>
              </div>
            </div>
          </div>

          {/* Additional Fields Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Fields</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Internal remarks..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Staff Member
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
