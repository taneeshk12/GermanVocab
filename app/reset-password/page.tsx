'use client'

import { useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Lock, Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [done, setDone] = useState(false)

    const router = useRouter()
    const supabase = getSupabaseClient()

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirm) {
            setError("Passwords don't match")
            return
        }
        setLoading(true)
        setError(null)
        try {
            const { error } = await supabase.auth.updateUser({ password })
            if (error) throw error
            setDone(true)
            setTimeout(() => router.push('/login'), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950" />
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="glass-panel border border-white/40 rounded-2xl shadow-2xl p-6 sm:p-8">

                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <Link href="/" className="relative w-40 h-12">
                                <Image src="/app_logo.svg" alt="LangFlow" fill className="object-contain" />
                            </Link>
                        </div>

                        {done ? (
                            /* Success state */
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 size={36} className="text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Password Updated!</h2>
                                <p className="text-muted-foreground mb-4">
                                    Your password has been changed. Redirecting you to sign in…
                                </p>
                                <Link
                                    href="/login"
                                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                                >
                                    Go to Sign In
                                </Link>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                    New Password
                                </h2>
                                <p className="text-center text-muted-foreground mb-6">
                                    Choose a strong password for your account
                                </p>

                                {error && (
                                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleReset} className="space-y-4">
                                    {/* New password */}
                                    <div>
                                        <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <input
                                                id="new-password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                minLength={6}
                                                autoFocus
                                                className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((p) => !p)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                                                tabIndex={-1}
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1.5">Minimum 6 characters</p>
                                    </div>

                                    {/* Confirm password */}
                                    <div>
                                        <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <input
                                                id="confirm-password"
                                                type={showConfirm ? 'text' : 'password'}
                                                value={confirm}
                                                onChange={(e) => setConfirm(e.target.value)}
                                                required
                                                minLength={6}
                                                className={`w-full pl-10 pr-12 py-2.5 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${confirm && password !== confirm
                                                        ? 'border-red-400 focus:ring-red-400/50'
                                                        : 'border-border'
                                                    }`}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm((p) => !p)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                                                tabIndex={-1}
                                                aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                                            >
                                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                        {confirm && password !== confirm && (
                                            <p className="text-xs text-red-500 mt-1.5">Passwords don&apos;t match</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || (!!confirm && password !== confirm)}
                                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Update Password'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
