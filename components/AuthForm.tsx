'use client'

import { useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Lock, User, Loader2, ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react'

type Mode = 'login' | 'signup' | 'forgot'

export function AuthForm() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const router = useRouter()
  const supabase = getSupabaseClient()

  const reset = () => {
    setError(null)
    setMessage(null)
    setShowPassword(false)
  }

  const switchMode = (next: Mode) => { reset(); setMode(next) }

  /* ── Sign Up ─────────────────────────────────────────────────────────── */
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); reset()
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
            display_name: username || email.split('@')[0],
          },
        },
      })
      if (error) throw error
      if (data.user) {
        setMessage('Account created! You can now sign in.')
        setTimeout(() => switchMode('login'), 2000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally { setLoading(false) }
  }

  /* ── Sign In ─────────────────────────────────────────────────────────── */
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); reset()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (data.user) {
        setMessage('Welcome back!')
        router.push('/a1')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally { setLoading(false) }
  }

  /* ── Forgot Password ─────────────────────────────────────────────────── */
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); reset()
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      })
      if (error) throw error
      setMessage('Password reset email sent! Check your inbox (and spam folder).')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email')
    } finally { setLoading(false) }
  }

  /* ── UI helpers ──────────────────────────────────────────────────────── */
  const heading = mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Start Learning' : 'Reset Password'
  const subtext =
    mode === 'login'
      ? 'Sign in to continue your German journey'
      : mode === 'signup'
        ? 'Create your free account'
        : "Enter your email and we'll send a reset link"

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <div className="glass-panel border border-white/40 rounded-2xl shadow-2xl p-6 sm:p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="relative w-40 h-12">
            <Image src="/app_logo.svg" alt="LangFlow" fill className="object-contain" />
          </Link>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          {heading}
        </h2>
        <p className="text-center text-muted-foreground mb-6">{subtext}</p>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm">
            {message}
          </div>
        )}

        {/* ── FORGOT PASSWORD FORM ──────────────────────────────────────── */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <><Mail size={18} /> Send Reset Link</>
              )}
            </button>

            <button
              type="button"
              onClick={() => switchMode('login')}
              className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
            >
              <ArrowLeft size={14} /> Back to Sign In
            </button>
          </form>
        )}

        {/* ── LOGIN / SIGNUP FORM ───────────────────────────────────────── */}
        {mode !== 'forgot' && (
          <form onSubmit={mode === 'login' ? handleSignIn : handleSignUp} className="space-y-4">

            {/* Username — signup only */}
            {mode === 'signup' && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Choose a username"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="••••••••"
                />
                {/* Show / hide password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="text-xs text-muted-foreground mt-1.5">Minimum 6 characters</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ── Toggle login / signup ───────────────────────────────────── */}
        {mode !== 'forgot' && (
          <div className="mt-6 text-center">
            <button
              onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
