// Database Types
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          native_language: string
          target_levels: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          native_language?: string
          target_levels?: Json
        }
        Update: {
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          native_language?: string
          target_levels?: Json
        }
      }
      user_stats: {
        Row: {
          user_id: string
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
          total_quiz_questions_correct: number
          average_quiz_score: number
          level_stats: Json
          updated_at: string
        }
        Insert: {
          user_id: string
          total_xp?: number
          current_streak?: number
          longest_streak?: number
          last_active_date?: string | null
          total_words_learned?: number
          total_words_mastered?: number
          total_practice_sessions?: number
          total_practice_time_minutes?: number
          total_quizzes_completed?: number
          total_quiz_questions_answered?: number
          total_quiz_questions_correct?: number
          average_quiz_score?: number
          level_stats?: Json
        }
        Update: {
          total_xp?: number
          current_streak?: number
          longest_streak?: number
          last_active_date?: string | null
          total_words_learned?: number
          total_words_mastered?: number
          total_practice_sessions?: number
          total_practice_time_minutes?: number
          total_quizzes_completed?: number
          total_quiz_questions_answered?: number
          total_quiz_questions_correct?: number
          average_quiz_score?: number
          level_stats?: Json
        }
      }
      vocabulary_progress: {
        Row: {
          id: string
          user_id: string
          vocab_id: string
          level: string
          topic: string
          status: 'new' | 'learning' | 'mastered'
          first_seen_at: string
          last_practiced_at: string | null
          mastered_at: string | null
          times_practiced: number
          times_correct: number
          times_incorrect: number
          confidence_level: number
          next_review_date: string | null
          review_interval_days: number
          ease_factor: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          vocab_id: string
          level: string
          topic: string
          status?: 'new' | 'learning' | 'mastered'
          first_seen_at?: string
          last_practiced_at?: string | null
          mastered_at?: string | null
          times_practiced?: number
          times_correct?: number
          times_incorrect?: number
          confidence_level?: number
          next_review_date?: string | null
          review_interval_days?: number
          ease_factor?: number
        }
        Update: {
          vocab_id?: string
          level?: string
          topic?: string
          status?: 'new' | 'learning' | 'mastered'
          last_practiced_at?: string | null
          mastered_at?: string | null
          times_practiced?: number
          times_correct?: number
          times_incorrect?: number
          confidence_level?: number
          next_review_date?: string | null
          review_interval_days?: number
          ease_factor?: number
        }
      }
      practice_sessions: {
        Row: {
          id: string
          user_id: string
          practice_type: 'flashcards' | 'translation' | 'sentences'
          level: string
          topic: string | null
          words_practiced: number
          correct_answers: number
          incorrect_answers: number
          skipped_count: number
          duration_seconds: number | null
          started_at: string
          completed_at: string | null
          xp_earned: number
          session_data: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          practice_type: 'flashcards' | 'translation' | 'sentences'
          level: string
          topic?: string | null
          words_practiced?: number
          correct_answers?: number
          incorrect_answers?: number
          skipped_count?: number
          duration_seconds?: number | null
          started_at?: string
          completed_at?: string | null
          xp_earned?: number
          session_data?: Json | null
        }
        Update: {
          words_practiced?: number
          correct_answers?: number
          incorrect_answers?: number
          skipped_count?: number
          duration_seconds?: number | null
          completed_at?: string | null
          xp_earned?: number
          session_data?: Json | null
        }
      }
      practice_attempts: {
        Row: {
          id: string
          session_id: string
          user_id: string
          vocab_id: string
          attempt_type: string
          user_answer: string | null
          correct_answer: string
          is_correct: boolean
          time_taken_seconds: number | null
          attempted_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          vocab_id: string
          attempt_type: string
          user_answer?: string | null
          correct_answer: string
          is_correct: boolean
          time_taken_seconds?: number | null
          attempted_at?: string
        }
        Update: {
          user_answer?: string | null
          is_correct?: boolean
          time_taken_seconds?: number | null
        }
      }
      quizzes: {
        Row: {
          id: string
          user_id: string
          quiz_type: 'daily' | 'custom' | 'level_test'
          level: string
          topic: string | null
          total_questions: number
          correct_answers: number
          score_percentage: number | null
          started_at: string
          completed_at: string | null
          duration_seconds: number | null
          xp_earned: number
          quiz_config: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          quiz_type?: 'daily' | 'custom' | 'level_test'
          level: string
          topic?: string | null
          total_questions: number
          correct_answers?: number
          score_percentage?: number | null
          started_at?: string
          completed_at?: string | null
          duration_seconds?: number | null
          xp_earned?: number
          quiz_config?: Json | null
        }
        Update: {
          correct_answers?: number
          score_percentage?: number | null
          completed_at?: string | null
          duration_seconds?: number | null
          xp_earned?: number
        }
      }
      quiz_questions: {
        Row: {
          id: string
          quiz_id: string
          user_id: string
          vocab_id: string
          question_type: 'mcq' | 'fill_blank' | 'article'
          question_text: string
          correct_answer: string
          user_answer: string | null
          is_correct: boolean | null
          time_taken_seconds: number | null
          options: Json | null
          explanation: string | null
          answered_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          quiz_id: string
          user_id: string
          vocab_id: string
          question_type: 'mcq' | 'fill_blank' | 'article'
          question_text: string
          correct_answer: string
          user_answer?: string | null
          is_correct?: boolean | null
          time_taken_seconds?: number | null
          options?: Json | null
          explanation?: string | null
          answered_at?: string | null
        }
        Update: {
          user_answer?: string | null
          is_correct?: boolean | null
          time_taken_seconds?: number | null
          answered_at?: string | null
        }
      }
      daily_streaks: {
        Row: {
          id: string
          user_id: string
          activity_date: string
          practice_sessions_count: number
          quizzes_completed: number
          words_learned: number
          total_xp_earned: number
          total_active_minutes: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_date: string
          practice_sessions_count?: number
          quizzes_completed?: number
          words_learned?: number
          total_xp_earned?: number
          total_active_minutes?: number
        }
        Update: {
          practice_sessions_count?: number
          quizzes_completed?: number
          words_learned?: number
          total_xp_earned?: number
          total_active_minutes?: number
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          category: 'streak' | 'words' | 'quiz' | 'practice' | 'milestone' | null
          criteria_type: string | null
          criteria_value: number | null
          xp_reward: number
          rarity: 'common' | 'rare' | 'epic' | 'legendary' | null
          created_at: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string
        }
      }
    }
  }
}
