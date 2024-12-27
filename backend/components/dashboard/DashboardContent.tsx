'use client'

import { Activity, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, BarChart3, Search, Filter, MoreHorizontal, User } from 'lucide-react'
import dynamic from 'next/dynamic'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useState } from 'react'

const AreaChartComponent = dynamic(
  () => import('./AreaChartWrapper').then((mod) => mod.AreaChartComponent),
  { ssr: false }
)

interface Props {
  user: any
}

const data = [
  { name: 'Jan', revenue: 4000, profit: 2400, previousValue: 3000 },
  { name: 'Feb', revenue: 3500, profit: 1800, previousValue: 4000 },
  { name: 'Mar', revenue: 6000, profit: 3600, previousValue: 5000 },
  { name: 'Apr', revenue: 8000, profit: 4800, previousValue: 6000 },
  { name: 'May', revenue: 5600, profit: 3200, previousValue: 4000 },
  { name: 'Jun', revenue: 7500, profit: 4500, previousValue: 6000 },
  { name: 'Jul', revenue: 9200, profit: 5800, previousValue: 7000 }
]

const stats = [
  { 
    title: 'Total Bookings (Today)', 
    value: '156', 
    change: '+15.3%', 
    trend: 'up', 
    icon: Activity,
    description: 'vs. yesterday'
  },
  { 
    title: 'Total Income', 
    value: '$52,000', 
    change: '+12.5%', 
    trend: 'up', 
    icon: DollarSign,
    description: 'vs. previous month'
  },
  { 
    title: 'Total Commissions', 
    value: '$8,549', 
    change: '+23.1%', 
    trend: 'up', 
    icon: TrendingUp,
    description: 'vs. previous month'
  },
  { 
    title: 'Total Sales', 
    value: '1,250', 
    change: '+18.2%', 
    trend: 'up', 
    icon: BarChart3,
    description: 'vs. previous month'
  }
]

const products = [
  { name: 'Premium Plan', value: 4331, color: '#1E40AF' },  // Darker blue
  { name: 'Basic Plan', value: 3211, color: '#0369A1' },    // Dark sky blue
  { name: 'Enterprise', value: 2111, color: '#0E7490' },    // Dark cyan
  { name: 'Custom Plan', value: 1231, color: '#047857' },   // Dark emerald
  { name: 'Trial Plan', value: 515, color: '#3730A3' }      // Dark indigo
]

const transactions = [
  {
    id: 1,
    user: { 
      name: 'Annette Black', 
      email: 'annette@example.com',
      avatar: 'AB'
    },
    status: 'Success',
    type: 'Premium Plan',
    price: 99.99,
    unit: 1,
    totalPrice: 99.99,
    date: '2024-01-15',
    time: '14:30',
    paymentMethod: 'Credit Card'
  },
  {
    id: 2,
    user: { 
      name: 'John Smith', 
      email: 'john@example.com',
      avatar: 'JS'
    },
    status: 'Processing',
    type: 'Enterprise',
    price: 149.99,
    unit: 2,
    totalPrice: 299.98,
    date: '2024-01-14',
    time: '09:15',
    paymentMethod: 'PayPal'
  },
  {
    id: 3,
    user: { 
      name: 'Sarah Wilson', 
      email: 'sarah@example.com',
      avatar: 'SW'
    },
    status: 'Success',
    type: 'Basic Plan',
    price: 79.99,
    unit: 1,
    totalPrice: 79.99,
    date: '2024-01-14',
    time: '16:45',
    paymentMethod: 'Credit Card'
  },
  {
    id: 4,
    user: { 
      name: 'Michael Brown', 
      email: 'michael@example.com',
      avatar: 'MB'
    },
    status: 'Failed',
    type: 'Custom Plan',
    price: 199.99,
    unit: 1,
    totalPrice: 199.99,
    date: '2024-01-14',
    time: '11:20',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 5,
    user: { 
      name: 'Emily Davis', 
      email: 'emily@example.com',
      avatar: 'ED'
    },
    status: 'Success',
    type: 'Premium Plan',
    price: 99.99,
    unit: 3,
    totalPrice: 299.97,
    date: '2024-01-13',
    time: '15:10',
    paymentMethod: 'Credit Card'
  }
]

const COLORS = ['#1E40AF', '#0369A1', '#0E7490', '#047857', '#3730A3'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-100">
        <p className="font-semibold text-gray-900">{data.name}</p>
        <p className="text-gray-700 font-medium">${data.value.toLocaleString()}</p>
        <p className="text-sm text-gray-500">
          {Math.round((data.value / products.reduce((sum, p) => sum + p.value, 0)) * 100)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardContent({ user }: Props) {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [timeRange, setTimeRange] = useState('Monthly')

  if (!user) return null;

  const totalRevenue = products.reduce((sum, product) => sum + product.value, 0);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
      case 'Processing':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
      case 'Failed':
        return 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20'
      default:
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back, {user?.email}</h2>
          <p className="text-gray-500 mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
                <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500">{stat.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Area Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
              <p className="text-sm text-gray-500 mt-1">Monthly revenue statistics</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-50 rounded-lg">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="h-80">
            <AreaChartComponent data={data} />
          </div>
        </div>

        {/* Donut Chart */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Top Products</h3>
              <p className="text-sm text-gray-500 mt-0.5">Best performing products</p>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={products}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {products.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-2">
            {products.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm font-medium text-gray-700">{product.name}</span>
                </div>
                <span className="text-sm text-gray-500">${product.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
              <p className="text-sm text-gray-500 mt-1">Latest transaction activities</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
              >
                <option value="All">All Status</option>
                <option value="Success">Success</option>
                <option value="Processing">Processing</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">User</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Type</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{transaction.user.name}</p>
                          <p className="text-xs text-gray-500">{transaction.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-800">{transaction.type}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-gray-800">${transaction.totalPrice.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-500">{transaction.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
