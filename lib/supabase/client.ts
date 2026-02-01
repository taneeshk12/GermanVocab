import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Singleton instance for client-side usage
let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export const getSupabaseClient = (): any => {
  if (!supabaseClient) {
    supabaseClient = createClient()
  }
  // Return as 'any' to bypass strict type inference issues
  return supabaseClient as any
}
