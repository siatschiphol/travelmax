'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PartnerAccountView() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the partner dashboard
    router.push('/partners/dashboard')
  }, [router])

  return (
    <div className="p-6">
      <p className="text-gray-500">Redirecting to Partner Dashboard...</p>
    </div>
  )
}
