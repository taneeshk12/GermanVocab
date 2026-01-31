import { Level } from "./types";

export interface UserProgress {
    masteredWordIds: string[];
    totalPracticeSessions: number;
    quizHistory: {
        date: string;
        score: number;
        total: number;
        level: string; // Keep string to be safe with varying inputs
    }[];
    xp: number;
    streak: number;
    lastActiveDate: string | null;
}

const STORAGE_KEY = "langflow_progress";

const defaultProgress: UserProgress = {
    masteredWordIds: [],
    totalPracticeSessions: 0,
    quizHistory: [],
    xp: 0,
    streak: 0,
    lastActiveDate: null
};

export function getProgress(): UserProgress {
    if (typeof window === "undefined") {
        return defaultProgress;
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return defaultProgress;
        }
        return { ...defaultProgress, ...JSON.parse(stored) };
    } catch (e) {
        console.error("Failed to load progress", e);
        return defaultProgress;
    }
}

export function saveProgress(progress: UserProgress) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        // Dispatch event for UI updates
        window.dispatchEvent(new Event('progress-updated'));
    } catch (e) {
        console.error("Failed to save progress", e);
    }
}

export function checkStreak(progress: UserProgress): UserProgress {
    const today = new Date().toISOString().split('T')[0];

    if (progress.lastActiveDate !== today) {
        // Check if yesterday was active
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (progress.lastActiveDate === yesterdayStr) {
            progress.streak += 1;
        } else if (progress.lastActiveDate !== today) {
            // Reset streak if not today and not yesterday (unless it's the first day)
            progress.streak = 1;
        }
        progress.lastActiveDate = today;
    }
    return progress;
}

export function markWordAsMastered(wordId: string) {
    const progress = checkStreak(getProgress());
    if (!progress.masteredWordIds.includes(wordId)) {
        progress.masteredWordIds.push(wordId);
        progress.xp += 10;
        saveProgress(progress);
    }
}

export function addQuizResult(level: string, score: number, total: number) {
    const progress = checkStreak(getProgress());
    progress.quizHistory.push({
        date: new Date().toISOString(),
        score,
        total,
        level
    });
    progress.xp += score * 5;
    saveProgress(progress);
}

export function incrementPracticeStats(xpEarned: number = 5) {
    const progress = checkStreak(getProgress());
    progress.totalPracticeSessions += 1;
    progress.xp += xpEarned;
    saveProgress(progress);
}
