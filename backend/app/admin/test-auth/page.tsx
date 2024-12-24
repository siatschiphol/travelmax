import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function TestAuthPage() {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { data: { session }, error } = await supabase.auth.getSession()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>
      
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Session Info:</h2>
        {error ? (
          <div className="text-red-500">
            Error: {error.message}
          </div>
        ) : session ? (
          <div>
            <p>User ID: {session.user.id}</p>
            <p>Email: {session.user.email}</p>
            <pre className="mt-4 bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="text-yellow-600">
            No session found. Please log in.
          </div>
        )}

        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p>Cookies present: {cookieStore.getAll().length}</p>
          <p>Cookie names: {cookieStore.getAll().map(c => c.name).join(', ')}</p>
        </div>
      </div>
    </div>
  )
}
