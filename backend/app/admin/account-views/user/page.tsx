'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function UserAccountView() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the user dashboard
    router.push('/users/dashboard')
  }, [router])

  return (
    <div className="p-6">
      <p className="text-gray-500">Redirecting to User Dashboard...</p>
    </div>
  )
}
