import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // If user is not signed in and the current path starts with /admin
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    // Get the intended destination
    const redirectTo = request.nextUrl.pathname
    // Create the login URL with the redirectTo parameter
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', redirectTo)
    return NextResponse.redirect(loginUrl)
  }

  // If user is signed in and tries to access login/signup pages
  if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return response
}

// Specify which routes this middleware will run on
export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/sign-up',
  ],
}
