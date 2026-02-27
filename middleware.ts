import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Database } from './lib/supabase/types'

export async function middleware(req: NextRequest) {
  // ── 1. www → non-www permanent redirect (301) ─────────────────────────
  // This fixes "Alternate page with proper canonical tag" in Google Search Console.
  // ALL www traffic is permanently redirected to the canonical non-www domain.
  const host = req.headers.get('host') || ''
  if (host.startsWith('www.')) {
    const nonWwwHost = host.slice(4) // strip "www."
    const url = req.nextUrl.clone()
    url.host = nonWwwHost
    // 308 preserves the HTTP method (POST stays POST); use 301 for GET-only sites
    return NextResponse.redirect(url, { status: 301 })
  }

  // ── 2. Supabase auth session refresh ──────────────────────────────────
  const res = NextResponse.next()

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired - important for auth
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // ── 3. Protect authenticated routes ───────────────────────────────────
  const protectedPaths = ['/profile', '/dashboard']
  const isProtectedPath = protectedPaths.some(path =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
