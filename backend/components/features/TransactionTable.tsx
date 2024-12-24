'use client'

import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

const transactions = [
  {
    id: 1,
    customer: 'Sarah Johnson',
    amount: '$234.50',
    status: 'Completed',
    date: '2024-01-15',
    avatar: 'https://picsum.photos/seed/1/200'
  },
  {
    id: 2,
    customer: 'Michael Chen',
    amount: '$189.99',
    status: 'Pending',
    date: '2024-01-14',
    avatar: 'https://picsum.photos/seed/2/200'
  },
  {
    id: 3,
    customer: 'Emma Wilson',
    amount: '$432.20',
    status: 'Completed',
    date: '2024-01-13',
    avatar: 'https://picsum.photos/seed/3/200'
  },
  {
    id: 4,
    customer: 'James Brown',
    amount: '$129.99',
    status: 'Failed',
    date: '2024-01-12',
    avatar: 'https://picsum.photos/seed/4/200'
  }
]

export default function TransactionTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <p className="text-sm text-gray-500">Latest customer transactions</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Customer</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Amount</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Date</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={transaction.avatar}
                        alt={transaction.customer}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{transaction.customer}</span>
                  </div>
                </td>
                <td className="py-4 px-6">{transaction.amount}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      transaction.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-500">{transaction.date}</td>
                <td className="py-4 px-6">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
