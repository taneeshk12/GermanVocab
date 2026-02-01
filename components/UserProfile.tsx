'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, User as UserIcon } from 'lucide-react'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      router.refresh()
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return { user, loading, signOut }
}

export function UserProfile() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="h-10 w-24 animate-pulse bg-white/10 rounded-lg" />
    )
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
      >
        Sign In
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Link 
        href="/profile"
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 glass-panel rounded-lg border border-white/20 hover:bg-accent transition-all"
      >
        <UserIcon size={16} className="text-primary" />
        <span className="text-sm font-medium">
          {user.user_metadata?.display_name || user.email?.split('@')[0]}
        </span>
      </Link>
      <Link
        href="/profile"
        className="sm:hidden p-2 glass-panel rounded-lg border border-white/20 hover:bg-accent transition-all"
        title="Profile"
      >
        <UserIcon size={18} className="text-primary" />
      </Link>
      <button
        onClick={signOut}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-border rounded-lg hover:bg-accent transition-all"
        title="Sign Out"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Sign Out</span>
      </button>
    </div>
  )
}
