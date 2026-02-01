/**
 * LocalStorage to Supabase Migration Script
 * 
 * This script migrates existing localStorage progress data to Supabase database.
 * Run this after setting up Supabase and authenticating a user.
 */

import { getSupabaseClient } from '../supabase/client'
import { getProgress } from '../progress'

interface LocalStorageProgress {
  masteredWordIds: string[]
  totalPracticeSessions: number
  quizHistory: {
    date: string
    score: number
    total: number
    level: string
  }[]
  xp: number
  streak: number
  lastActiveDate: string | null
}

export async function migrateLocalStorageToSupabase(userId: string) {
  console.log('🚀 Starting migration from localStorage to Supabase...')
  
  const supabase = getSupabaseClient()
  
  // Get localStorage data
  const localProgress = await getProgress()
  
  if (!localProgress || localProgress.xp === 0) {
    console.log('ℹ️ No local progress found to migrate')
    return {
      success: true,
      message: 'No local progress to migrate'
    }
  }
  
  console.log('📊 Found local progress:', {
    masteredWords: localProgress.masteredWordIds.length,
    practiceSessions: localProgress.totalPracticeSessions,
    quizzes: localProgress.quizHistory.length,
    xp: localProgress.xp,
    streak: localProgress.streak
  })
  
  try {
    // 1. Migrate User Stats
    console.log('📝 Migrating user stats...')
    const { error: statsError } = await (supabase
      .from('user_stats') as any)
      .upsert({
        user_id: userId,
        total_xp: localProgress.xp,
        current_streak: localProgress.streak,
        longest_streak: localProgress.streak,
        last_active_date: localProgress.lastActiveDate,
        total_practice_sessions: localProgress.totalPracticeSessions,
        total_words_mastered: localProgress.masteredWordIds.length,
        total_quizzes_completed: localProgress.quizHistory.length,
      })
    
    if (statsError) {
      console.error('❌ Error migrating stats:', statsError)
      throw statsError
    }
    
    // 2. Migrate Mastered Words
    console.log('📚 Migrating mastered words...')
    const vocabProgressRecords = localProgress.masteredWordIds.map((vocabId: string) => ({
      user_id: userId,
      vocab_id: vocabId,
      level: 'A1', // Default to A1, update manually if needed
      topic: 'unknown', // Update based on your vocab data
      status: 'mastered' as const,
      times_practiced: 5, // Estimated
      times_correct: 5, // Estimated
      times_incorrect: 0,
      confidence_level: 100,
      mastered_at: new Date().toISOString(),
    }))
    
    if (vocabProgressRecords.length > 0) {
      // Insert in batches of 100
      for (let i = 0; i < vocabProgressRecords.length; i += 100) {
        const batch = vocabProgressRecords.slice(i, i + 100)
        const { error: vocabError } = await (supabase
          .from('vocabulary_progress') as any)
          .upsert(batch, { onConflict: 'user_id,vocab_id' })
        
        if (vocabError) {
          console.error('❌ Error migrating vocab batch:', vocabError)
          throw vocabError
        }
        
        console.log(`   ✅ Migrated ${Math.min(i + 100, vocabProgressRecords.length)} / ${vocabProgressRecords.length} words`)
      }
    }
    
    // 3. Migrate Quiz History
    console.log('🎯 Migrating quiz history...')
    const quizRecords = localProgress.quizHistory.map((quiz: any) => ({
      user_id: userId,
      quiz_type: 'daily' as const,
      level: quiz.level,
      total_questions: quiz.total,
      correct_answers: quiz.score,
      score_percentage: (quiz.score / quiz.total) * 100,
      started_at: quiz.date,
      completed_at: quiz.date,
      xp_earned: quiz.score * 5,
    }))
    
    if (quizRecords.length > 0) {
      const { error: quizError } = await (supabase
        .from('quizzes') as any)
        .insert(quizRecords)
      
      if (quizError) {
        console.error('❌ Error migrating quizzes:', quizError)
        // Don't throw - quiz history is less critical
      }
    }
    
    // 4. Migrate Daily Streaks (create entries for last 30 days if active)
    if (localProgress.streak > 0 && localProgress.lastActiveDate) {
      console.log('🔥 Migrating streak data...')
      const streakRecords = []
      const lastActive = new Date(localProgress.lastActiveDate)
      
      for (let i = 0; i < Math.min(localProgress.streak, 30); i++) {
        const date = new Date(lastActive)
        date.setDate(date.getDate() - i)
        
        streakRecords.push({
          user_id: userId,
          activity_date: date.toISOString().split('T')[0],
          practice_sessions_count: 1,
          total_xp_earned: 10,
        })
      }
      
      if (streakRecords.length > 0) {
        const { error: streakError } = await (supabase
          .from('daily_streaks') as any)
          .upsert(streakRecords, { onConflict: 'user_id,activity_date' })
        
        if (streakError) {
          console.error('❌ Error migrating streaks:', streakError)
          // Don't throw - streak history is less critical
        }
      }
    }
    
    console.log('✅ Migration completed successfully!')
    console.log('')
    console.log('📊 Migration Summary:')
    console.log(`   - Mastered words: ${localProgress.masteredWordIds.length}`)
    console.log(`   - Quiz history: ${localProgress.quizHistory.length}`)
    console.log(`   - Total XP: ${localProgress.xp}`)
    console.log(`   - Streak: ${localProgress.streak} days`)
    console.log('')
    console.log('⚠️  You can now safely clear localStorage or keep it as backup')
    
    return {
      success: true,
      migratedData: {
        words: localProgress.masteredWordIds.length,
        quizzes: localProgress.quizHistory.length,
        xp: localProgress.xp,
        streak: localProgress.streak
      }
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Clear localStorage after successful migration
 */
export function clearLocalStorage() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('langflow_progress')
    console.log('🗑️  LocalStorage cleared')
  }
}

/**
 * Backup localStorage data to a JSON file
 */
export function backupLocalStorage() {
  if (typeof window === 'undefined') return
  
  const progress = getProgress()
  const backup = {
    timestamp: new Date().toISOString(),
    data: progress
  }
  
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `german-vocab-backup-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  
  console.log('💾 LocalStorage backed up to file')
}

// Example usage in a React component:
/*
'use client'

import { useState } from 'react'
import { migrateLocalStorageToSupabase, backupLocalStorage, clearLocalStorage } from '@/lib/api/migrate'
import { useUser } from '@supabase/auth-helpers-nextjs'

export function MigrationButton() {
  const user = useUser()
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)
  
  const handleMigrate = async () => {
    if (!user) {
      setStatus('Please sign in first')
      return
    }
    
    setLoading(true)
    setStatus('Migrating...')
    
    // Backup first
    backupLocalStorage()
    
    // Migrate
    const result = await migrateLocalStorageToSupabase(user.id)
    
    if (result.success) {
      setStatus('Migration successful! ✅')
      // Optionally clear localStorage
      // clearLocalStorage()
    } else {
      setStatus(`Migration failed: ${result.error}`)
    }
    
    setLoading(false)
  }
  
  return (
    <div>
      <button onClick={handleMigrate} disabled={loading}>
        Migrate Progress to Supabase
      </button>
      {status && <p>{status}</p>}
    </div>
  )
}
*/
