/**
 * Supabase Integration Helper
 * 
 * This file provides easy-to-use functions that replace localStorage
 * and automatically save progress to Supabase database.
 */

import { getSupabaseClient } from './supabase/client'
import { getUserStats, updateUserStats } from './api/progress'

/**
 * Get current user ID from Supabase auth
 */
export async function getCurrentUserId(): Promise<string | null> {
  const supabase = getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id || null
}

/**
 * Track quiz completion and update user stats
 */
export async function trackQuizCompletion(
  level: string,
  score: number,
  totalQuestions: number
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      console.log('User not logged in, skipping quiz tracking')
      return
    }

    const supabase = getSupabaseClient()
    const percentage = Math.round((score / totalQuestions) * 100)
    const xpEarned = score * 10 // 10 XP per correct answer

    // 1. Save quiz result to quizzes table
    const { error: quizError } = await supabase
      .from('quizzes')
      .insert({
        user_id: userId,
        quiz_type: 'daily',
        level: level.toLowerCase(),
        total_questions: totalQuestions,
        correct_answers: score,
        score_percentage: percentage,
        xp_earned: xpEarned,
        completed_at: new Date().toISOString()
      })

    if (quizError) {
      console.error('Error saving quiz:', quizError)
      return
    }

    // 2. Update user stats
    const currentStats = await getUserStats(userId)
    if (currentStats) {
      await updateUserStats(userId, {
        total_xp: (currentStats.total_xp || 0) + xpEarned,
        total_quizzes_completed: (currentStats.total_quizzes_completed || 0) + 1,
        total_quiz_questions_answered: (currentStats.total_quiz_questions_answered || 0) + totalQuestions,
        last_active_date: new Date().toISOString().split('T')[0]
      })
    }

    // 3. Update streak
    await updateStreak(userId)

    console.log(`✅ Quiz tracked: ${score}/${totalQuestions}, +${xpEarned} XP`)
  } catch (error) {
    console.error('Error tracking quiz:', error)
  }
}

/**
 * Track word practice (flashcards, translation, etc.)
 */
export async function trackWordPractice(
  wordId: string,
  level: string,
  correct: boolean
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      console.log('User not logged in, skipping word tracking')
      return
    }

    const supabase = getSupabaseClient()

    // 1. Update vocabulary progress
    const { data: existing } = await supabase
      .from('vocabulary_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('word_id', wordId)
      .single()

    if (existing) {
      // Update existing progress
      await supabase
        .from('vocabulary_progress')
        .update({
          times_practiced: (existing.times_practiced || 0) + 1,
          correct_count: (existing.correct_count || 0) + (correct ? 1 : 0),
          incorrect_count: (existing.incorrect_count || 0) + (correct ? 0 : 1),
          last_practiced_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('word_id', wordId)
    } else {
      // Create new progress entry
      await supabase
        .from('vocabulary_progress')
        .insert({
          user_id: userId,
          word_id: wordId,
          level: level.toLowerCase(),
          times_practiced: 1,
          correct_count: correct ? 1 : 0,
          incorrect_count: correct ? 0 : 1,
          proficiency_level: 'learning',
          last_practiced_at: new Date().toISOString()
        })
    }

    // 2. Award XP for correct answers
    if (correct) {
      const currentStats = await getUserStats(userId)
      if (currentStats) {
        await updateUserStats(userId, {
          total_xp: (currentStats.total_xp || 0) + 5, // 5 XP per correct word
          last_active_date: new Date().toISOString().split('T')[0]
        })
      }
    }

    console.log(`✅ Word tracked: ${wordId}, correct: ${correct}`)
  } catch (error) {
    console.error('Error tracking word:', error)
  }
}

/**
 * Mark word as learned (global - works from any practice mode)
 */
export async function markWordLearned(wordId: string, level: string, topic: string = 'general') {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      console.log('User not logged in, cannot mark word as learned')
      return
    }

    const supabase = getSupabaseClient()

    console.log(`Attempting to mark word ${wordId} as learned for user ${userId}`)

    // Check if word progress already exists
    const { data: existing, error: fetchError } = await supabase
      .from('vocabulary_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('word_id', wordId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is fine
      console.error('Error fetching word progress:', {
        error: fetchError,
        message: fetchError.message,
        details: fetchError.details,
        hint: fetchError.hint,
        code: fetchError.code,
        userId,
        wordId
      })
      console.error('🚨 RLS POLICY ERROR: Cannot read from vocabulary_progress table')
      console.error('💡 Fix: Run FIX_RLS_POLICIES.sql in Supabase SQL Editor')
      return
    }

    if (existing) {
      // Update existing record to learned
      const { error: updateError } = await supabase
        .from('vocabulary_progress')
        .update({
          proficiency_level: 'learned',
          mastered_at: new Date().toISOString(),
          last_practiced_at: new Date().toISOString(),
          times_practiced: (existing.times_practiced || 0) + 1,
          correct_count: (existing.correct_count || 0) + 1
        })
        .eq('user_id', userId)
        .eq('word_id', wordId)

      if (updateError) {
        console.error('🚨 RLS POLICY ERROR - UPDATE blocked:', {
          message: updateError.message,
          details: updateError.details,
          hint: updateError.hint,
          code: updateError.code,
          userId,
          wordId
        })
        console.log('💡 Fix: Run FIX_RLS_POLICIES.sql in Supabase SQL Editor')
        return
      }
    } else {
      // Create new record as learned
      const { error: insertError } = await supabase
        .from('vocabulary_progress')
        .insert({
          user_id: userId,
          word_id: wordId,
          level: level.toLowerCase(),
          topic: topic,
          proficiency_level: 'learned',
          times_practiced: 1,
          correct_count: 1,
          incorrect_count: 0,
          mastered_at: new Date().toISOString(),
          last_practiced_at: new Date().toISOString()
        })

      if (insertError) {
        console.error('🚨 RLS POLICY ERROR - INSERT blocked:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code,
          userId,
          wordId
        })
        console.log('💡 Fix: Run FIX_RLS_POLICIES.sql in Supabase SQL Editor')
        return
      }
    }

    // Update user stats - count all learned words (simplified single status)
    if (!existing || existing.proficiency_level !== 'learned') {
      // Query actual counts from vocabulary_progress for accuracy
      const { data: progressData, error: countError } = await supabase
        .from('vocabulary_progress')
        .select('word_id, proficiency_level')
        .eq('user_id', userId)

      if (countError) {
        console.error('Error counting vocabulary progress:', countError)
      } else if (progressData) {
        // Count all words marked as learned (single unified status)
        const totalLearned = progressData.filter(
          (p: any) => p.proficiency_level === 'learned'
        ).length

        console.log(`📊 Updated stats: ${totalLearned} words learned`)

        await updateUserStats(userId, {
          total_words_learned: totalLearned,
          total_words_mastered: totalLearned, // Same value - unified status
          last_active_date: new Date().toISOString().split('T')[0]
        })
      }
    }

    console.log(`✅ Word learned: ${wordId}`)
    
    // Trigger UI update event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('stats-updated'))
    }
  } catch (error) {
    console.error('Error marking word as mastered:', error)
  }
}

/**
 * Unmark word as learned (remove from learned list)
 */
export async function unmarkWordLearned(wordId: string) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      console.log('User not logged in, cannot unmark word')
      return
    }

    const supabase = getSupabaseClient()

    // Check if word exists and is learned
    const { data: existing } = await supabase
      .from('vocabulary_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('word_id', wordId)
      .single()

    if (existing && existing.proficiency_level === 'learned') {
      // Delete the record entirely (unmarking removes from learned list)
      const { error: deleteError } = await supabase
        .from('vocabulary_progress')
        .delete()
        .eq('user_id', userId)
        .eq('word_id', wordId)

      if (deleteError) {
        console.error('🚨 RLS POLICY ERROR - DELETE blocked (unmark):', {
          message: deleteError.message,
          details: deleteError.details,
          hint: deleteError.hint,
          code: deleteError.code,
          userId,
          wordId
        })
        console.log('💡 Fix: Run FIX_RLS_POLICIES.sql in Supabase SQL Editor')
        return
      }

      // Update user stats - recalculate actual counts
      const { data: progressData, error: countError } = await supabase
        .from('vocabulary_progress')
        .select('word_id, proficiency_level')
        .eq('user_id', userId)

      if (countError) {
        console.error('Error counting vocabulary progress:', countError)
      } else if (progressData) {
        // Count all words marked as learned (single unified status)
        const totalLearned = progressData.filter(
          (p: any) => p.proficiency_level === 'learned'
        ).length

        console.log(`📊 Updated stats after unmark: ${totalLearned} words learned`)

        await updateUserStats(userId, {
          total_words_learned: totalLearned,
          total_words_mastered: totalLearned, // Same value - unified status
          last_active_date: new Date().toISOString().split('T')[0]
        })
      }

      console.log(`✅ Word unmarked: ${wordId}`)
      
      // Trigger UI update event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('stats-updated'))
      }
    } else if (!existing) {
      // Word was never tracked, just log
      console.log(`Word ${wordId} not found in progress`)
    }
  } catch (error) {
    console.error('Error unmarking word:', error)
  }
}

/**
 * Track practice session
 */
export async function trackPracticeSession(
  level: string,
  practiceType: 'flashcards' | 'translation' | 'sentences',
  wordsCount: number,
  correctCount: number,
  durationSeconds: number
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) return

    const supabase = getSupabaseClient()
    const xpEarned = correctCount * 5 // 5 XP per correct word

    // 1. Save practice session
    await supabase
      .from('practice_sessions')
      .insert({
        user_id: userId,
        session_type: practiceType,
        level: level.toLowerCase(),
        words_practiced: wordsCount,
        correct_answers: correctCount,
        duration_seconds: durationSeconds,
        xp_earned: xpEarned,
        completed_at: new Date().toISOString()
      })

    // 2. Update user stats
    const currentStats = await getUserStats(userId)
    if (currentStats) {
      await updateUserStats(userId, {
        total_xp: (currentStats.total_xp || 0) + xpEarned,
        total_practice_sessions: (currentStats.total_practice_sessions || 0) + 1,
        total_practice_time_minutes: (currentStats.total_practice_time_minutes || 0) + Math.round(durationSeconds / 60),
        last_active_date: new Date().toISOString().split('T')[0]
      })
    }

    // 3. Update streak
    await updateStreak(userId)

    console.log(`✅ Practice session tracked: ${practiceType}, ${correctCount}/${wordsCount}, +${xpEarned} XP`)
  } catch (error) {
    console.error('Error tracking practice session:', error)
  }
}

/**
 * Update daily streak
 */
async function updateStreak(userId: string) {
  try {
    console.log('🔥 updateStreak called for userId:', userId)
    const supabase = getSupabaseClient()
    const today = new Date().toISOString().split('T')[0]

    // Get current stats
    const currentStats = await getUserStats(userId)
    if (!currentStats) {
      console.log('⚠️ No user stats found, cannot update streak')
      return
    }

    const lastActiveDate = currentStats.last_active_date
    console.log('📅 Last active:', lastActiveDate, '| Today:', today)

    // Check if already active today
    if (lastActiveDate === today) {
      console.log('✓ Already counted for today')
      return // Already counted for today
    }

    // Check if yesterday (streak continues)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    let newStreak = 1
    if (lastActiveDate === yesterdayStr) {
      // Continue streak
      newStreak = (currentStats.current_streak || 0) + 1
      console.log(`🔥 Streak continues: ${currentStats.current_streak} → ${newStreak}`)
    } else {
      // Streak broken, start new
      console.log(`💔 Streak broken (last: ${lastActiveDate}), starting fresh`)
      newStreak = 1
    }

    // Update stats
    await updateUserStats(userId, {
      current_streak: newStreak,
      longest_streak: Math.max(newStreak, currentStats.longest_streak || 0),
      last_active_date: today
    })

    // Record in daily_streaks table
    await supabase
      .from('daily_streaks')
      .insert({
        user_id: userId,
        streak_date: today,
        streak_count: newStreak
      })

    console.log(`✅ Streak updated successfully: ${newStreak} day(s)`)
  } catch (error) {
    console.error('❌ Error updating streak:', error)
  }
}

/**
 * Get user progress (replaces localStorage getProgress)
 */
export async function getUserProgress() {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return { xp: 0, streak: 0, wordsLearned: 0 }
    }

    const stats = await getUserStats(userId)
    if (!stats) {
      return { xp: 0, streak: 0, wordsLearned: 0 }
    }

    return {
      xp: stats.total_xp || 0,
      streak: stats.current_streak || 0,
      wordsLearned: stats.total_words_learned || 0
    }
  } catch (error) {
    console.error('Error getting user progress:', error)
    return { xp: 0, streak: 0, wordsLearned: 0 }
  }
}
