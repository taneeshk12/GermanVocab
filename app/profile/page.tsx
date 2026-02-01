'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/UserProfile'
import { getUserStats } from '@/lib/api/progress'
import { getSupabaseClient } from '@/lib/supabase/client'
import { Trophy, Flame, BookOpen, Target, Award, Calendar, Clock, TrendingUp, Edit2, Save, X, Crown } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import { cn } from '@/lib/utils'

interface UserStats {
  total_xp: number
  current_streak: number
  longest_streak: number
  last_active_date: string | null
  total_words_learned: number
  total_words_mastered: number
  total_practice_sessions: number
  total_practice_time_minutes: number
  total_quizzes_completed: number
  total_quiz_questions_answered: number
}

interface LeaderboardUser {
  rank: number
  name: string
  xp: number
  avatar: string
  isCurrentUser?: boolean
}

// XP Levels System
const XP_LEVELS = [
  { level: 1, minXP: 0, maxXP: 100, name: 'Beginner' },
  { level: 2, minXP: 100, maxXP: 250, name: 'Learner' },
  { level: 3, minXP: 250, maxXP: 500, name: 'Student' },
  { level: 4, minXP: 500, maxXP: 1000, name: 'Scholar' },
  { level: 5, minXP: 1000, maxXP: 2000, name: 'Expert' },
  { level: 6, minXP: 2000, maxXP: 3500, name: 'Master' },
  { level: 7, minXP: 3500, maxXP: 5000, name: 'Grandmaster' },
  { level: 8, minXP: 5000, maxXP: 10000, name: 'Legend' },
]

function getCurrentLevel(totalXP: number) {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= XP_LEVELS[i].minXP) {
      const level = XP_LEVELS[i]
      const nextLevel = XP_LEVELS[i + 1]
      const xpIntoLevel = totalXP - level.minXP
      const xpNeeded = nextLevel ? nextLevel.minXP - level.minXP : 0
      const progress = nextLevel ? (xpIntoLevel / xpNeeded) * 100 : 100
      
      return {
        currentLevel: level.level,
        levelName: level.name,
        currentXP: totalXP,
        xpIntoLevel,
        nextLevelXP: nextLevel?.minXP || level.maxXP,
        xpNeeded,
        progress: Math.min(progress, 100)
      }
    }
  }
  return {
    currentLevel: 1,
    levelName: 'Beginner',
    currentXP: 0,
    xpIntoLevel: 0,
    nextLevelXP: 100,
    xpNeeded: 100,
    progress: 0
  }
}

// Dummy leaderboard users
const DUMMY_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Alex Schmidt', xp: 4250, avatar: '👑' },
  { rank: 2, name: 'Sarah Mueller', xp: 3680, avatar: '🌟' },
  { rank: 3, name: 'Max Weber', xp: 3120, avatar: '⚡' },
  { rank: 4, name: 'Emma Fischer', xp: 2750, avatar: '💫' },
  { rank: 5, name: 'Lukas Wagner', xp: 2380, avatar: '🎯' },
  { rank: 6, name: 'Sophie Klein', xp: 2120, avatar: '🚀' },
  { rank: 7, name: 'Jonas Becker', xp: 1880, avatar: '🔥' },
  { rank: 8, name: 'Mia Hoffmann', xp: 1650, avatar: '✨' },
  { rank: 9, name: 'Leon Meyer', xp: 1420, avatar: '🌙' },
  { rank: 10, name: 'Laura Schulz', xp: 1190, avatar: '🎨' },
]

function generateLeaderboard(userName: string, userXP: number): LeaderboardUser[] {
  // Find where user would rank among dummy users
  const userRank = DUMMY_LEADERBOARD.filter(u => u.xp > userXP).length + 1
  
  // Create leaderboard copy
  const leaderboard = [...DUMMY_LEADERBOARD]
  
  // Insert real user at correct position
  leaderboard.splice(userRank - 1, 0, {
    rank: userRank,
    name: userName,
    xp: userXP,
    avatar: userName.charAt(0).toUpperCase(),
    isCurrentUser: true
  })
  
  // Re-rank all users
  const rankedLeaderboard = leaderboard.map((user, index) => ({ 
    ...user, 
    rank: index + 1 
  }))
  
  // If user is in top 10, return top 10
  // If user is outside top 10, return top 9 + user
  if (userRank <= 10) {
    return rankedLeaderboard.slice(0, 10)
  } else {
    return [
      ...rankedLeaderboard.slice(0, 9),
      rankedLeaderboard.find(u => u.isCurrentUser)!
    ]
  }
}

function StatItem({ icon, label, value, subValue }: { icon: React.ReactNode, label: string, value: number | string, subValue: string }) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background/40 border border-border/50">
      <div className="p-3 rounded-full bg-background shadow-sm mb-3">
        {icon}
      </div>
      <div className="text-2xl font-black text-foreground">{value}</div>
      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</div>
      <div className="text-[10px] text-muted-foreground/60">{subValue}</div>
    </div>
  )
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function loadUserData() {
      if (user) {
        setLoading(true)
        const userStats = await getUserStats(user.id)
        if (userStats) {
          setStats(userStats)
        }
        setDisplayName(user.user_metadata?.display_name || user.email?.split('@')[0] || '')
        setLoading(false)
      }
    }

    loadUserData()
  }, [user])

  const handleSaveProfile = async () => {
    if (!user) return

    setSaving(true)
    const supabase = getSupabaseClient()

    try {
      // Update user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { display_name: displayName }
      })

      if (authError) throw authError

      // Update public users table
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: dbError } = await (supabase.from('users') as any)
        .update({ display_name: displayName })
        .eq('id', user.id)

      if (dbError) throw dbError

      setEditing(false)
      router.refresh()
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !stats) {
    return null
  }

  // Calculate level info
  const levelInfo = getCurrentLevel(stats.total_xp)
  const leaderboard = generateLeaderboard(displayName, stats.total_xp)
  
  // Debug logging
  console.log('Profile Debug:', {
    displayName,
    userXP: stats.total_xp,
    leaderboard,
    currentStreak: stats.current_streak,
    lastActiveDate: stats.last_active_date
  })

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <PageHeader
          title="Your Profile"
          description="Track your learning progress and achievements"
        />

        {/* Profile Card */}
        <div className="glass-panel border border-white/40 rounded-2xl p-5 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-8 gap-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                {editing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="text-xl sm:text-2xl font-bold bg-background/50 border border-border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
                  />
                ) : (
                  <h2 className="text-2xl sm:text-3xl font-bold truncate">{displayName}</h2>
                )}
                <p className="text-sm sm:text-base text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            
            <div className="flex w-full sm:w-auto gap-2">
            {editing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save size={18} />
                  )}
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false)
                    setDisplayName(user.user_metadata?.display_name || user.email?.split('@')[0] || '')
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-all"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-all"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* XP Level Card with Progress */}
          <div className="col-span-2 bg-linear-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-violet-600" />
                <span className="text-sm text-muted-foreground">Level {levelInfo.currentLevel}</span>
              </div>
              <span className="text-xs font-semibold text-violet-600 bg-violet-100 dark:bg-violet-900/30 px-2 py-1 rounded-full">
                {levelInfo.levelName}
              </span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold">{levelInfo.currentXP} XP</span>
                <span className="text-muted-foreground">{levelInfo.nextLevelXP} XP</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-violet-600 to-indigo-600 transition-all duration-500"
                  style={{ width: `${levelInfo.progress}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {levelInfo.xpNeeded > 0 ? `${Math.max(0, levelInfo.xpNeeded - levelInfo.xpIntoLevel)} XP to next level` : 'Max level!'}
            </p>
          </div>

          <div className="bg-linear-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Flame size={20} />
              <span className="text-sm font-semibold">Streak</span>
            </div>
            <div className="text-2xl font-bold">{stats.current_streak} days</div>
          </div>

          <div className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Target size={20} />
              <span className="text-sm font-semibold">Learned</span>
            </div>
            <div className="text-2xl font-bold">{stats.total_words_learned} words</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel border border-white/40 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary" />
                Learning Activity
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatItem
                  icon={<BookOpen className="text-blue-500" />}
                  label="Mastered"
                  value={stats.total_words_mastered}
                  subValue="Words"
                />
                <StatItem
                  icon={<Clock className="text-emerald-500" />}
                  label="Time Spent"
                  value={stats.total_practice_time_minutes}
                  subValue="Minutes"
                />
                <StatItem
                  icon={<Award className="text-amber-500" />}
                  label="Quizzes"
                  value={stats.total_quizzes_completed}
                  subValue="Completed"
                />
              </div>

              {/* Weekly/Daily Progress Goal placeholder */}
              <div className="mt-8 p-4 bg-linear-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Daily Goal Progress</span>
                  <span className="text-sm font-bold">{Math.min(100, Math.round((stats.total_quiz_questions_answered % 20) / 20 * 100))}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-violet-600 to-indigo-600 transition-all"
                    style={{ width: `${Math.min(100, (stats.total_quiz_questions_answered % 20) / 20 * 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Answer 20 questions daily to maintain your streak.
                </p>
              </div>
            </div>
          </div>

          {/* Leaderboard Column */}
          <div className="space-y-8">
            <div className="glass-panel border border-white/40 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Crown className="text-amber-500" />
                Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((item) => (
                  <div
                    key={item.rank}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border transition-all",
                      item.isCurrentUser
                        ? "bg-linear-to-r from-violet-500/20 to-indigo-500/20 border-violet-500/40 shadow-lg"
                        : "bg-background/50 border-border/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        item.rank === 1 ? "bg-amber-100 text-amber-600" :
                          item.rank === 2 ? "bg-slate-100 text-slate-600" :
                            item.rank === 3 ? "bg-orange-100 text-orange-600" :
                              "bg-muted text-muted-foreground"
                      )}>
                        {item.rank}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 flex items-center justify-center">{item.avatar}</span>
                        <span className={cn(
                          "font-bold text-sm",
                          item.isCurrentUser && "text-violet-700 dark:text-violet-300"
                        )}>
                          {item.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-black text-sm">{item.xp}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">XP</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-all">
                See Historical Rankings
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-panel border border-white/40 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/a1/practice"
              className="flex flex-col items-center gap-2 p-4 border border-border rounded-xl hover:bg-accent transition-all group"
            >
              <BookOpen className="text-primary group-hover:scale-110 transition-transform" size={24} />
              <span className="font-medium">Practice</span>
            </Link>
            <Link 
              href="/quiz/daily"
              className="flex flex-col items-center gap-2 p-4 border border-border rounded-xl hover:bg-accent transition-all group"
            >
              <Target className="text-primary group-hover:scale-110 transition-transform" size={24} />
              <span className="font-medium">Daily Quiz</span>
            </Link>
            <Link 
              href="/a1"
              className="flex flex-col items-center gap-2 p-4 border border-border rounded-xl hover:bg-accent transition-all group"
            >
              <TrendingUp className="text-primary group-hover:scale-110 transition-transform" size={24} />
              <span className="font-medium">Learn</span>
            </Link>
            <Link 
              href="/"
              className="flex flex-col items-center gap-2 p-4 border border-border rounded-xl hover:bg-accent transition-all group"
            >
              <Calendar className="text-primary group-hover:scale-110 transition-transform" size={24} />
              <span className="font-medium">Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
