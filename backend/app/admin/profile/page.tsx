'use client'

import { useState } from 'react'
import { Building, Calendar, CreditCard, Edit2, FileText, MapPin, MessageSquare, Upload, User, X } from 'lucide-react'
import Image from 'next/image'

interface Document {
  id: string
  name: string
  type: string
  status: 'verified' | 'pending' | 'rejected'
  uploadDate: string
  fileSize: string
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Business License',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2024-12-15',
    fileSize: '2.5 MB'
  },
  {
    id: '2',
    name: 'Tax Certificate',
    type: 'PDF',
    status: 'pending',
    uploadDate: '2024-12-19',
    fileSize: '1.8 MB'
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showUploadModal, setShowUploadModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
          <div className="absolute bottom-4 left-6 flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl bg-white p-1">
              <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
                <Building className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">Luxury Stays Inc.</h1>
              <p className="text-blue-100">Premium Accommodation Provider</p>
            </div>
          </div>
          <button className="absolute bottom-4 right-6 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50">
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'documents' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'payment' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Payment Information
          </button>
        </div>
      </div>

      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Business Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500">Company Name</label>
                  <p className="font-medium">Luxury Stays Inc.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Registration Number</label>
                  <p className="font-medium">REG123456789</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Tax ID</label>
                  <p className="font-medium">TAX987654321</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500">Email</label>
                  <p className="font-medium">contact@luxurystays.com</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Phone</label>
                  <p className="font-medium">+1 (555) 123-4567</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Address</label>
                  <p className="font-medium">123 Business Ave, Suite 100</p>
                  <p className="text-gray-500">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Business Description</h2>
              <p className="text-gray-600">
                Luxury Stays Inc. is a premium accommodation provider specializing in high-end
                vacation rentals and corporate housing solutions. With over 10 years of experience
                in the hospitality industry, we pride ourselves on delivering exceptional service
                and unforgettable stays for our guests.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Business Hours</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Weekdays</h3>
                  <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <h3 className="font-medium">Weekends</h3>
                  <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Certifications</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span>Hospitality Excellence Certificate</span>
                  </div>
                  <span className="text-green-600">Verified</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span>Safety Compliance Certificate</span>
                  </div>
                  <span className="text-green-600">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Business Documents</h2>
              <p className="text-gray-500">Manage your business documentation and licenses</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Document Name</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Upload Date</th>
                    <th className="text-left p-4 font-medium">Size</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{doc.type}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(doc.status)}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">{doc.uploadDate}</td>
                      <td className="p-4">{doc.fileSize}</td>
                      <td className="p-4">
                        <button className="text-blue-500 hover:text-blue-600">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <button className="text-blue-500 hover:text-blue-600">Edit</button>
              </div>
              <button className="w-full p-4 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50">
                + Add Payment Method
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Payout Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500">Bank Account</label>
                <p className="font-medium">•••• •••• •••• 8888</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Routing Number</label>
                <p className="font-medium">•••• •••• 9999</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Payout Schedule</label>
                <p className="font-medium">Weekly (Every Monday)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upload Document</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Document Type</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select document type</option>
                  <option value="license">Business License</option>
                  <option value="tax">Tax Certificate</option>
                  <option value="insurance">Insurance Document</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload File</label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supported formats: PDF, JPG, PNG (max 10MB)
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
