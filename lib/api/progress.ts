import { getSupabaseClient } from '../supabase/client'
import { Database } from '../supabase/types'

type UserStats = Database['public']['Tables']['user_stats']['Row']
type VocabularyProgress = Database['public']['Tables']['vocabulary_progress']['Row']
type PracticeSession = Database['public']['Tables']['practice_sessions']['Insert']
type Quiz = Database['public']['Tables']['quizzes']['Insert']

/**
 * Ensure user stats exist, create if missing
 */
export async function ensureUserStats(userId: string): Promise<UserStats> {
  const supabase = getSupabaseClient()
  
  // Try to get existing stats
  const { data: stats, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  // If no stats exist (PGRST116 = not found), create them
  if (error && error.code === 'PGRST116') {
    console.log('📊 Creating initial user stats for:', userId)
    const { data: newStats, error: insertError } = await supabase
      .from('user_stats')
      .insert({
        user_id: userId,
        total_xp: 0,
        current_streak: 0,
        longest_streak: 0,
        total_words_learned: 0,
        total_words_mastered: 0,
        total_practice_sessions: 0,
        total_practice_time_minutes: 0,
        total_quizzes_completed: 0,
        total_quiz_questions_answered: 0,
        last_active_date: new Date().toISOString().split('T')[0]
      })
      .select()
      .single()
    
    if (insertError) {
      console.error('❌ Error creating user stats:', insertError)
      throw insertError
    }
    console.log('✅ User stats created successfully')
    return newStats!
  }
  
  if (error) {
    console.error('❌ Error fetching user stats:', error)
    throw error
  }
  
  return stats!
}

/**
 * Get user statistics from Supabase
 */
export async function getUserStats(userId: string): Promise<UserStats | null> {
  try {
    return await ensureUserStats(userId)
  } catch (error) {
    console.error('Error getting user stats:', error)
    return null
  }
}

/**
 * Update user stats (XP, streaks, totals)
 */
export async function updateUserStats(
  userId: string, 
  updates: Database['public']['Tables']['user_stats']['Update']
) {
  const supabase = getSupabaseClient()
  
  const { data, error } = await supabase
    .from('user_stats')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating user stats:', error)
    throw error
  }
  
  return data
}

/**
 * Get vocabulary progress for a user
 */
export async function getVocabularyProgress(
  userId: string,
  filters?: {
    level?: string
    topic?: string
    status?: 'new' | 'learning' | 'mastered'
  }
): Promise<VocabularyProgress[]> {
  const supabase = getSupabaseClient()
  
  let query = supabase
    .from('vocabulary_progress')
    .select('*')
    .eq('user_id', userId)
  
  if (filters?.level) {
    query = query.eq('level', filters.level)
  }
  if (filters?.topic) {
    query = query.eq('topic', filters.topic)
  }
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching vocabulary progress:', error)
    return []
  }
  
  return data || []
}

/**
 * Get words due for review today
 */
export async function getWordsForReview(userId: string, level?: string) {
  const supabase = getSupabaseClient()
  
  let query = supabase
    .from('vocabulary_progress')
    .select('*')
    .eq('user_id', userId)
    .lte('next_review_date', new Date().toISOString().split('T')[0])
    .neq('status', 'mastered')
    .order('next_review_date', { ascending: true })
  
  if (level) {
    query = query.eq('level', level)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching words for review:', error)
    return []
  }
  
  return data || []
}

/**
 * Update or create vocabulary progress for a word
 */
export async function updateVocabularyProgress(
  userId: string,
  vocabId: string,
  updates: {
    status?: 'new' | 'learning' | 'mastered'
    isCorrect: boolean
    level: string
    topic: string
  }
) {
  const supabase = getSupabaseClient()
  
  // First, try to get existing progress
  const { data: existing } = await supabase
    .from('vocabulary_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('vocab_id', vocabId)
    .single()
  
  const now = new Date().toISOString()
  
  if (existing) {
    // Update existing record
    const newTimesPracticed = existing.times_practiced + 1
    const newTimesCorrect = existing.times_correct + (updates.isCorrect ? 1 : 0)
    const newTimesIncorrect = existing.times_incorrect + (updates.isCorrect ? 0 : 1)
    
    // Calculate new confidence level (0-100)
    const accuracy = newTimesCorrect / newTimesPracticed
    const confidenceLevel = Math.min(100, Math.round(accuracy * 100))
    
    // Calculate spaced repetition
    const quality = updates.isCorrect ? 4 : 2 // 0-5 scale
    const { data: srData } = await supabase.rpc('calculate_next_review', {
      p_ease_factor: existing.ease_factor,
      p_interval_days: existing.review_interval_days,
      p_quality: quality
    })
    
    const updateData: Database['public']['Tables']['vocabulary_progress']['Update'] = {
      last_practiced_at: now,
      times_practiced: newTimesPracticed,
      times_correct: newTimesCorrect,
      times_incorrect: newTimesIncorrect,
      confidence_level: confidenceLevel,
      status: updates.status || (confidenceLevel >= 80 ? 'mastered' : 'learning'),
    }
    
    if (srData) {
      updateData.ease_factor = srData.new_ease_factor
      updateData.review_interval_days = srData.new_interval_days
      updateData.next_review_date = srData.next_review_date
    }
    
    if (updateData.status === 'mastered' && !existing.mastered_at) {
      updateData.mastered_at = now
    }
    
    const { data, error } = await supabase
      .from('vocabulary_progress')
      .update(updateData)
      .eq('user_id', userId)
      .eq('vocab_id', vocabId)
      .select()
      .single()
    
    if (error) throw error
    return data
  } else {
    // Create new record
    const insertData: Database['public']['Tables']['vocabulary_progress']['Insert'] = {
      user_id: userId,
      vocab_id: vocabId,
      level: updates.level,
      topic: updates.topic,
      status: 'learning',
      times_practiced: 1,
      times_correct: updates.isCorrect ? 1 : 0,
      times_incorrect: updates.isCorrect ? 0 : 1,
      confidence_level: updates.isCorrect ? 100 : 0,
      last_practiced_at: now,
      next_review_date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    }
    
    const { data, error } = await supabase
      .from('vocabulary_progress')
      .insert(insertData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

/**
 * Mark a word as mastered
 */
export async function markWordAsMastered(userId: string, vocabId: string) {
  const supabase = getSupabaseClient()
  
  const { data, error } = await supabase
    .from('vocabulary_progress')
    .update({
      status: 'mastered',
      mastered_at: new Date().toISOString(),
      confidence_level: 100
    })
    .eq('user_id', userId)
    .eq('vocab_id', vocabId)
    .select()
    .single()
  
  if (error) {
    console.error('Error marking word as mastered:', error)
    throw error
  }
  
  // Update user stats
  const stats = await getUserStats(userId)
  if (stats) {
    await updateUserStats(userId, {
      total_words_mastered: stats.total_words_mastered + 1,
      total_xp: stats.total_xp + 10
    })
  }
  
  return data
}

/**
 * Create a practice session
 */
export async function createPracticeSession(session: PracticeSession) {
  const supabase = getSupabaseClient()
  
  const { data, error } = await supabase
    .from('practice_sessions')
    .insert(session)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating practice session:', error)
    throw error
  }
  
  return data
}

/**
 * Complete a practice session
 */
export async function completePracticeSession(
  sessionId: string,
  updates: {
    words_practiced: number
    correct_answers: number
    incorrect_answers: number
    duration_seconds: number
    xp_earned: number
  }
) {
  const supabase = getSupabaseClient()
  
  const { data, error } = await supabase
    .from('practice_sessions')
    .update({
      ...updates,
      completed_at: new Date().toISOString()
    })
    .eq('id', sessionId)
    .select()
    .single()
  
  if (error) {
    console.error('Error completing practice session:', error)
    throw error
  }
  
  return data
}

/**
 * Create a quiz
 */
export async function createQuiz(quiz: Quiz) {
  const supabase = getSupabaseClient()
  
  const { data, error } = await supabase
    .from('quizzes')
    .insert(quiz)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating quiz:', error)
    throw error
  }
  
  return data
}

/**
 * Complete a quiz
 */
export async function completeQuiz(
  quizId: string,
  correctAnswers: number,
  totalQuestions: number,
  durationSeconds: number
) {
  const supabase = getSupabaseClient()
  
  const scorePercentage = (correctAnswers / totalQuestions) * 100
  const xpEarned = correctAnswers * 5
  
  const { data, error } = await supabase
    .from('quizzes')
    .update({
      correct_answers: correctAnswers,
      score_percentage: scorePercentage,
      completed_at: new Date().toISOString(),
      duration_seconds: durationSeconds,
      xp_earned: xpEarned
    })
    .eq('id', quizId)
    .select()
    .single()
  
  if (error) {
    console.error('Error completing quiz:', error)
    throw error
  }
  
  return data
}

/**
 * Get quiz history for a user
 */
export async function getQuizHistory(userId: string, limit = 10) {
  const supabase = getSupabaseClient()
  
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('user_id', userId)
    .not('completed_at', 'is', null)
    .order('completed_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching quiz history:', error)
    return []
  }
  
  return data || []
}

/**
 * Update daily streak
 */
export async function updateDailyStreak(userId: string) {
  const supabase = getSupabaseClient()
  const today = new Date().toISOString().split('T')[0]
  
  // Check if today's streak already exists
  const { data: existing } = await supabase
    .from('daily_streaks')
    .select('*')
    .eq('user_id', userId)
    .eq('activity_date', today)
    .single()
  
  if (existing) {
    return existing
  }
  
  // Create new streak entry for today
  const { data, error } = await supabase
    .from('daily_streaks')
    .insert({
      user_id: userId,
      activity_date: today,
      practice_sessions_count: 0,
      quizzes_completed: 0,
      words_learned: 0,
      total_xp_earned: 0,
      total_active_minutes: 0
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating daily streak:', error)
    throw error
  }
  
  // Update user stats streak
  const stats = await getUserStats(userId)
  if (stats) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]
    
    let newStreak = 1
    if (stats.last_active_date === yesterdayStr) {
      newStreak = stats.current_streak + 1
    }
    
    await updateUserStats(userId, {
      current_streak: newStreak,
      longest_streak: Math.max(newStreak, stats.longest_streak),
      last_active_date: today
    })
  }
  
  return data
}
