/**
 * DEPRECATED: This file contains old localStorage functions
 * Please use supabase-integration.ts instead for all new code
 * 
 * This file is kept for backwards compatibility only
 * All functions now redirect to Supabase
 */

import { getUserProgress, trackWordPractice, trackQuizCompletion, trackPracticeSession, markWordLearned as markWordMastered } from "./supabase-integration";
import { Level } from "./types";

export interface UserProgress {
    masteredWordIds: string[];
    totalPracticeSessions: number;
    quizHistory: {
        date: string;
        score: number;
        total: number;
        level: string;
    }[];
    xp: number;
    streak: number;
    lastActiveDate: string | null;
}

/**
 * @deprecated Use getUserProgress() from supabase-integration.ts
 */
export async function getProgress(): Promise<UserProgress> {
    const stats = await getUserProgress();
    
    // Return in old format for compatibility
    return {
        masteredWordIds: [],
        totalPracticeSessions: 0,
        quizHistory: [],
        xp: stats.xp,
        streak: stats.streak,
        lastActiveDate: null
    };
}

/**
 * @deprecated Data is automatically saved to Supabase
 */
export function saveProgress(progress: UserProgress) {
    console.warn('saveProgress is deprecated - data is automatically saved to Supabase');
    // Dispatch event for UI updates
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event('progress-updated'));
        window.dispatchEvent(new Event('stats-updated'));
    }
}

/**
 * @deprecated Streak is automatically checked in Supabase
 */
export function checkStreak(progress: UserProgress): UserProgress {
    console.warn('checkStreak is deprecated - streak is automatically managed in Supabase');
    return progress;
}

/**
 * @deprecated Use markWordMastered() from supabase-integration.ts
 */
export async function markWordAsMastered(wordId: string) {
    console.warn('markWordAsMastered is deprecated - use markWordMastered() from supabase-integration.ts');
    await markWordMastered(wordId, 'a1');
}

/**
 * @deprecated Use trackQuizCompletion() from supabase-integration.ts
 */
export async function addQuizResult(level: string, score: number, total: number) {
    console.warn('addQuizResult is deprecated - use trackQuizCompletion() from supabase-integration.ts');
    await trackQuizCompletion(level, score, total);
}

/**
 * @deprecated Use trackPracticeSession() from supabase-integration.ts
 */
export async function incrementPracticeStats(xpEarned: number = 5) {
    console.warn('incrementPracticeStats is deprecated - use trackPracticeSession() from supabase-integration.ts');
    // Can't track without more details, just trigger UI update
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event('stats-updated'));
    }
}
