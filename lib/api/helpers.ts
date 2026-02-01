/**
 * Helper functions to update user progress in Supabase
 * Use these functions when users complete practice sessions, quizzes, or learn words
 */

import { getSupabaseClient } from '../supabase/client'
import { getUserStats, updateUserStats, updateDailyStreak } from './progress'

/**
 * Call this when a user completes a practice session
 */
export async function recordPracticeSession(
  userId: string,
  data: {
    level: string
    practiceType: 'flashcards' | 'sentences' | 'translation'
    wordsReviewed: number
    correctAnswers: number
    timeSpentMinutes: number
    xpEarned: number
  }
) {
  const supabase = getSupabaseClient()

  try {
    // 1. Create practice session record
    const { data: session, error: sessionError } = await supabase
      .from('practice_sessions')
      .insert({
        user_id: userId,
        level: data.level,
        practice_type: data.practiceType,
        words_reviewed: data.wordsReviewed,
        correct_count: data.correctAnswers,
        time_spent_seconds: data.timeSpentMinutes * 60,
        xp_earned: data.xpEarned,
      })
      .select()
      .single()

    if (sessionError) throw sessionError

    // 2. Update user stats
    const currentStats = await getUserStats(userId)
    if (currentStats) {
      await updateUserStats(userId, {
        total_xp: currentStats.total_xp + data.xpEarned,
        total_practice_sessions: currentStats.total_practice_sessions + 1,
        total_practice_time_minutes: currentStats.total_practice_time_minutes + data.timeSpentMinutes,
      })
    }

    // 3. Update daily streak
    await updateDailyStreak(userId)

    // 4. Dispatch event to update UI
    window.dispatchEvent(new Event('stats-updated'))

    return session
  } catch (error) {
    console.error('Error recording practice session:', error)
    throw error
  }
}

/**
 * Call this when a user completes a quiz
 */
export async function recordQuizCompletion(
  userId: string,
  data: {
    level: string
    quizType: 'daily' | 'level' | 'topic'
    totalQuestions: number
    correctAnswers: number
    timeSpentSeconds: number
    xpEarned: number
  }
) {
  const supabase = getSupabaseClient()

  try {
    const scorePercentage = Math.round((data.correctAnswers / data.totalQuestions) * 100)

    // 1. Create quiz record
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        user_id: userId,
        quiz_type: data.quizType,
        level: data.level,
        total_questions: data.totalQuestions,
        correct_answers: data.correctAnswers,
        score_percentage: scorePercentage,
        time_taken_seconds: data.timeSpentSeconds,
        xp_earned: data.xpEarned,
      })
      .select()
      .single()

    if (quizError) throw quizError

    // 2. Update user stats
    const currentStats = await getUserStats(userId)
    if (currentStats) {
      await updateUserStats(userId, {
        total_xp: currentStats.total_xp + data.xpEarned,
        total_quizzes_completed: currentStats.total_quizzes_completed + 1,
        total_quiz_questions_answered: currentStats.total_quiz_questions_answered + data.totalQuestions,
      })
    }

    // 3. Update daily streak
    await updateDailyStreak(userId)

    // 4. Dispatch event to update UI
    window.dispatchEvent(new Event('stats-updated'))

    return quiz
  } catch (error) {
    console.error('Error recording quiz completion:', error)
    throw error
  }
}

/**
 * Call this when a user learns a new word
 */
export async function recordWordLearned(
  userId: string,
  data: {
    wordId: string
    level: string
    timesCorrect: number
    timesIncorrect: number
    proficiency: 'new' | 'learning' | 'familiar' | 'mastered'
  }
) {
  const supabase = getSupabaseClient()

  try {
    // 1. Update or create vocabulary progress
    const { data: existing } = await supabase
      .from('vocabulary_progress')
      .select()
      .eq('user_id', userId)
      .eq('word_id', data.wordId)
      .single()

    if (existing) {
      // Update existing
      await supabase
        .from('vocabulary_progress')
        .update({
          times_practiced: existing.times_practiced + 1,
          correct_count: existing.correct_count + data.timesCorrect,
          incorrect_count: existing.incorrect_count + data.timesIncorrect,
          proficiency_level: data.proficiency,
          last_practiced_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .eq('word_id', data.wordId)
    } else {
      // Create new
      await supabase
        .from('vocabulary_progress')
        .insert({
          user_id: userId,
          word_id: data.wordId,
          level: data.level,
          times_practiced: 1,
          correct_count: data.timesCorrect,
          incorrect_count: data.timesIncorrect,
          proficiency_level: data.proficiency,
        })
    }

    // 2. Update user stats
    const currentStats = await getUserStats(userId)
    if (currentStats) {
      const updates: Record<string, number> = {}
      
      // If this is a new word
      if (!existing) {
        updates.total_words_learned = currentStats.total_words_learned + 1
      }
      
      // If word is now mastered
      if (data.proficiency === 'mastered' && (!existing || existing.proficiency_level !== 'mastered')) {
        updates.total_words_mastered = currentStats.total_words_mastered + 1
      }

      if (Object.keys(updates).length > 0) {
        await updateUserStats(userId, updates)
      }
    }

    // 3. Dispatch event to update UI
    window.dispatchEvent(new Event('stats-updated'))
  } catch (error) {
    console.error('Error recording word learned:', error)
    throw error
  }
}

/**
 * Calculate XP earned based on activity
 */
export function calculateXP(activity: {
  type: 'practice' | 'quiz' | 'word'
  correctAnswers?: number
  totalQuestions?: number
  timeSpentMinutes?: number
}): number {
  let xp = 0

  switch (activity.type) {
    case 'practice':
      // 5 XP per correct answer + bonus for time spent
      xp = (activity.correctAnswers || 0) * 5
      if (activity.timeSpentMinutes && activity.timeSpentMinutes >= 5) {
        xp += 10 // Bonus for practicing 5+ minutes
      }
      break

    case 'quiz':
      // 10 XP per correct answer
      xp = (activity.correctAnswers || 0) * 10
      // Bonus for perfect score
      if (activity.correctAnswers === activity.totalQuestions) {
        xp += 50
      }
      break

    case 'word':
      // 2 XP per new word learned
      xp = 2
      break
  }

  return xp
}

/**
 * Get proficiency level based on performance
 */
export function calculateProficiency(
  correctCount: number,
  incorrectCount: number,
  totalPracticed: number
): 'new' | 'learning' | 'familiar' | 'mastered' {
  if (totalPracticed === 0) return 'new'
  
  const accuracy = correctCount / (correctCount + incorrectCount)
  
  if (totalPracticed >= 10 && accuracy >= 0.9) return 'mastered'
  if (totalPracticed >= 5 && accuracy >= 0.7) return 'familiar'
  if (totalPracticed >= 2) return 'learning'
  
  return 'new'
}
