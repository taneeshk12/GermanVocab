"use client";

import { useState, useEffect } from "react";
import { VocabItem } from "@/lib/types";
import { VocabCard } from "@/components/VocabCard";
import { FlashcardModal } from "@/components/FlashcardModal";
import { getWordsMasteredStatus } from "@/lib/word-progress";
import { markWordLearned, unmarkWordLearned } from "@/lib/supabase-integration";

interface TopicVocabGridProps {
    words: VocabItem[];
}

export function TopicVocabGrid({ words }: TopicVocabGridProps) {
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const [learnedWords, setLearnedWords] = useState<Map<string, boolean>>(new Map());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProgress() {
            try {
                const wordIds = words.map(w => w.id);
                const status = await getWordsMasteredStatus(wordIds);
                setLearnedWords(status);
            } catch (error) {
                console.error("Error fetching progress:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProgress();
    }, [words]);

    const handleToggleLearned = async (wordId: string, currentStatus: boolean) => {
        // Find the word to get its topic
        const word = words.find(w => w.id === wordId);
        if (!word) return;

        // Optimistically update UI
        const newStatus = new Map(learnedWords);
        newStatus.set(wordId, !currentStatus);
        setLearnedWords(newStatus);

        if (currentStatus) {
            // Unmark as learned
            await unmarkWordLearned(wordId);
        } else {
            // Mark as learned (global - will show in Review Learned)
            await markWordLearned(wordId, word.level, word.topic);
        }
    };

    const learnedCount = Array.from(learnedWords.values()).filter(Boolean).length;
    const progressPercentage = words.length > 0 ? Math.round((learnedCount / words.length) * 100) : 0;

    return (
        <>
            {/* Progress Header */}
            {!isLoading && (
                <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-linear-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 shadow-sm">
                    <div className="flex justify-between items-end mb-3">
                        <div>
                            <p className="text-xs font-bold text-violet-600/60 dark:text-violet-400/60 uppercase tracking-widest mb-1">Topic Mastery</p>
                            <h3 className="font-bold text-xl">Your Progress</h3>
                        </div>
                        <span className="text-3xl font-black text-violet-600 dark:text-violet-400">
                            {progressPercentage}%
                        </span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden mb-2">
                        <div
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-sm font-medium text-muted-foreground">
                        <span>{learnedCount} of {words.length} words learned</span>
                        <span className="hidden sm:inline">Keep it up!</span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {words.map((item, index) => (
                    <VocabCard
                        key={item.id}
                        item={item}
                        onClick={() => setSelectedCardIndex(index)}
                        isLearned={learnedWords.get(item.id) || false}
                        onToggleLearned={handleToggleLearned}
                    />
                ))}
            </div>

            {selectedCardIndex !== null && (
                <FlashcardModal
                    isOpen={true}
                    onClose={() => setSelectedCardIndex(null)}
                    words={words}
                    initialIndex={selectedCardIndex}
                />
            )}
        </>
    );
}
