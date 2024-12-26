'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

interface PartnerModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function PartnerModal({ isOpen, onClose, onSubmit }: PartnerModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    accountType: 'business',
    businessName: '',
    chamberOfCommerce: '',
    businessTypes: {
      souvenirs: false,
      tours: false,
      restaurants: false,
      activities: false,
      transportation: false,
      other: ''
    },
    businessDescription: '',
    bankingInfo: {
      iban: '',
      bankName: '',
      swiftCode: '',
      beneficiaryName: ''
    },
    companyLogo: null as File | null,
    taxNumber: '',
    website: '',
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, companyLogo: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords don't match!")
      return
    }
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create New Partner</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email*</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="partner@example.com"
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
              <div>
                <label className="block text-sm font-medium mb-1">Repeat Password*</label>
                <input
                  type="password"
                  required
                  value={formData.repeatPassword}
                  onChange={e => setFormData(prev => ({ ...prev, repeatPassword: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Repeat password"
                />
              </div>
            </div>
          </div>

          {/* Business Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Information</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={formData.accountType === 'business'}
                    onChange={() => setFormData(prev => ({ ...prev, accountType: 'business' }))}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span>Business</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={formData.accountType === 'individual'}
                    onChange={() => setFormData(prev => ({ ...prev, accountType: 'individual' }))}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span>Registered Individual</span>
                </label>
              </div>

              {formData.accountType === 'business' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Name*</label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter business name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Chamber of Commerce</label>
                    <input
                      type="text"
                      value={formData.chamberOfCommerce}
                      onChange={e => setFormData(prev => ({ ...prev, chamberOfCommerce: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Registration number"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Type of Business</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.businessTypes.souvenirs}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        businessTypes: { ...prev.businessTypes, souvenirs: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span>Souvenirs</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.businessTypes.tours}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        businessTypes: { ...prev.businessTypes, tours: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span>Tours</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.businessTypes.restaurants}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        businessTypes: { ...prev.businessTypes, restaurants: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span>Restaurants</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.businessTypes.activities}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        businessTypes: { ...prev.businessTypes, activities: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span>Activities</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.businessTypes.transportation}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        businessTypes: { ...prev.businessTypes, transportation: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span>Transportation</span>
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={formData.businessTypes.other}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      businessTypes: { ...prev.businessTypes, other: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Other business type..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Business Description*</label>
                <textarea
                  required
                  value={formData.businessDescription}
                  onChange={e => setFormData(prev => ({ ...prev, businessDescription: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Describe your products/services..."
                />
              </div>
            </div>
          </div>

          {/* Banking Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Banking Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">IBAN/Account Number*</label>
                <input
                  type="text"
                  required
                  value={formData.bankingInfo.iban}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    bankingInfo: { ...prev.bankingInfo, iban: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter IBAN"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bank Name*</label>
                <input
                  type="text"
                  required
                  value={formData.bankingInfo.bankName}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    bankingInfo: { ...prev.bankingInfo, bankName: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter bank name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">SWIFT/BIC Code</label>
                <input
                  type="text"
                  value={formData.bankingInfo.swiftCode}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    bankingInfo: { ...prev.bankingInfo, swiftCode: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter SWIFT/BIC code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Beneficiary Name*</label>
                <input
                  type="text"
                  required
                  value={formData.bankingInfo.beneficiaryName}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    bankingInfo: { ...prev.bankingInfo, beneficiaryName: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter beneficiary name"
                />
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tax Registration Number</label>
                <input
                  type="text"
                  value={formData.taxNumber}
                  onChange={e => setFormData(prev => ({ ...prev, taxNumber: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tax number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Business Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional notes..."
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
              Create Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
