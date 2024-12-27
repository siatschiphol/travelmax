'use client'

import { useState } from 'react'
import { Gift, Plus, Search, Tag, Ticket, Clock, Edit, Trash2, PauseCircle, BarChart2, X } from 'lucide-react'

interface Campaign {
  id: string
  name: string
  type: string
  discount: number
  status: 'active' | 'paused' | 'ended'
  usageCount: number
  expiryDate: string
}

interface Reward {
  id: string
  name: string
  points: number
  value: number
  status: 'active' | 'inactive'
  claimed: number
  available: number
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Special',
    type: 'Percentage',
    discount: 20,
    status: 'active',
    usageCount: 156,
    expiryDate: '2024-12-31'
  },
  {
    id: '2',
    name: 'First Booking',
    type: 'Fixed',
    discount: 50,
    status: 'active',
    usageCount: 89,
    expiryDate: '2024-12-25'
  }
]

const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Free Night Stay',
    points: 1000,
    value: 200,
    status: 'active',
    claimed: 45,
    available: 55
  },
  {
    id: '2',
    name: 'Spa Voucher',
    points: 500,
    value: 100,
    status: 'active',
    claimed: 30,
    available: 70
  }
]

export default function RedeemPage() {
  const [activeTab, setActiveTab] = useState('campaigns')
  const [showNewItem, setShowNewItem] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'ended':
      case 'inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Redeem</h1>
          <p className="text-gray-500">Manage campaigns, rewards, and redemption rules</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'campaigns' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'rewards' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Rewards
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'analytics' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Tag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Campaigns</p>
              <p className="text-xl font-bold">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Gift className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Available Rewards</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Ticket className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Redemptions</p>
              <p className="text-xl font-bold">245</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={() => setShowNewItem(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          New {activeTab === 'campaigns' ? 'Campaign' : 'Reward'}
        </button>
      </div>

      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Campaign Name</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Discount</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Usage</th>
                  <th className="text-left p-4 font-medium">Expiry Date</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{campaign.name}</div>
                    </td>
                    <td className="p-4">{campaign.type}</td>
                    <td className="p-4">
                      {campaign.type === 'Percentage' ? `${campaign.discount}%` : `$${campaign.discount}`}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(campaign.status)}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">{campaign.usageCount} uses</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {campaign.expiryDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Pause">
                          <PauseCircle className="w-4 h-4 text-yellow-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Reward Name</th>
                  <th className="text-left p-4 font-medium">Points Required</th>
                  <th className="text-left p-4 font-medium">Value</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Claimed</th>
                  <th className="text-left p-4 font-medium">Available</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockRewards.map((reward) => (
                  <tr key={reward.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{reward.name}</div>
                    </td>
                    <td className="p-4">{reward.points} points</td>
                    <td className="p-4">${reward.value}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(reward.status)}`}>
                        {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">{reward.claimed}</td>
                    <td className="p-4">{reward.available}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Redemption Trends</h3>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                <BarChart2 className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Rewards</h3>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                <BarChart2 className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                New {activeTab === 'campaigns' ? 'Campaign' : 'Reward'}
              </h2>
              <button
                onClick={() => setShowNewItem(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${activeTab === 'campaigns' ? 'campaign' : 'reward'} name`}
                />
              </div>
              {activeTab === 'campaigns' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Discount Type</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Discount Value</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Points Required</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter points"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Reward Value</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Available Quantity</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter quantity"
                    />
                  </div>
                </>
              )}
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewItem(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create {activeTab === 'campaigns' ? 'Campaign' : 'Reward'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
