"use client";

import { useState, useEffect } from "react";
import { VocabItem } from "@/lib/types";
import { ArrowLeft, ArrowRight, Check, X, Volume2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { trackWordPractice, trackPracticeSession, markWordLearned } from "@/lib/supabase-integration";

interface FlashcardProps {
    words: VocabItem[];
    onComplete?: () => void;
}

interface QuizOption {
    text: string;
    isCorrect: boolean;
}

export function FlashcardPractice({ words: allWords, onComplete }: FlashcardProps) {
    const [selectedCount, setSelectedCount] = useState<number | null>(null);
    const [words, setWords] = useState<VocabItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [mastered, setMastered] = useState<Set<number>>(new Set());
    const [needsReview, setNeedsReview] = useState<Set<number>>(new Set());
    const [isComplete, setIsComplete] = useState(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [quizOptions, setQuizOptions] = useState<QuizOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const { speak } = useTextToSpeech();

    const currentWord = words[currentIndex];

    const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0;

    // Generate quiz options when word changes
    useEffect(() => {
        if (currentWord && allWords.length > 0) {
            generateQuizOptions();
        }
    }, [currentIndex, currentWord]);

    const generateQuizOptions = () => {
        if (!currentWord) return;

        // Get 3 random wrong answers from other words
        const wrongWords = allWords
            .filter(w => w.id !== currentWord.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => w.meaning_en);

        // Create options array with correct answer
        const options: QuizOption[] = [
            { text: currentWord.meaning_en, isCorrect: true },
            ...wrongWords.map(text => ({ text, isCorrect: false }))
        ];

        // Shuffle options
        const shuffled = options.sort(() => Math.random() - 0.5);
        setQuizOptions(shuffled);
        setSelectedOption(null);
        setShowResult(false);
    };

    const handleOptionSelect = (index: number) => {
        if (showResult) return; // Prevent changing after answering

        setSelectedOption(index);
        setShowResult(true);

        const isCorrect = quizOptions[index].isCorrect;

        // Track the answer
        if (currentWord) {
            trackWordPractice(currentWord.id, currentWord.level, isCorrect);
            
            if (isCorrect) {
                // Auto-mark as learned if correct
                const newMastered = new Set(mastered);
                newMastered.add(currentIndex);
                setMastered(newMastered);
                markWordLearned(currentWord.id, currentWord.level, currentWord.topic);
            } else {
                const newNeedsReview = new Set(needsReview);
                newNeedsReview.add(currentIndex);
                setNeedsReview(newNeedsReview);
            }
        }
    };

    const handleCountSelection = (count: number) => {
        const shuffled = [...allWords].sort(() => Math.random() - 0.5);
        setWords(shuffled.slice(0, count));
        setSelectedCount(count);
        setStartTime(Date.now()); // Reset start time when starting practice
    };

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
        } else {
            // Track practice session in Supabase
            const durationSeconds = Math.floor((Date.now() - startTime) / 1000);
            const correctCount = mastered.size;
            trackPracticeSession('a1', 'flashcards', words.length, correctCount, durationSeconds);
            
            setIsComplete(true);
            if (onComplete) onComplete();
        }
    };

    const handleRestart = () => {
        setIsComplete(false);
        setSelectedCount(null);
        setMastered(new Set());
        setNeedsReview(new Set());
        setCurrentIndex(0);
        setWords([]);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsFlipped(false);
        }
    };

    const handleMastered = () => {
        const newMastered = new Set(mastered);
        newMastered.add(currentIndex);
        setMastered(newMastered);

        const newNeedsReview = new Set(needsReview);
        newNeedsReview.delete(currentIndex);
        setNeedsReview(newNeedsReview);

        // Track in Supabase and mark as learned (global)
        if (currentWord) {
            trackWordPractice(currentWord.id, currentWord.level, true);
            markWordLearned(currentWord.id, currentWord.level, currentWord.topic);
        }

        handleNext();
    };

    const handleNeedsReview = () => {
        const newNeedsReview = new Set(needsReview);
        newNeedsReview.add(currentIndex);
        setNeedsReview(newNeedsReview);

        const newMastered = new Set(mastered);
        newMastered.delete(currentIndex);
        setMastered(newMastered);

        // Track in Supabase (incorrect - not marking as learned)
        if (currentWord) {
            trackWordPractice(currentWord.id, currentWord.level, false);
        }

        handleNext();
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (words.length === 0) return;

            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setIsFlipped(prev => !prev);
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                if (currentIndex < words.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                    setIsFlipped(false);
                }
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1);
                    setIsFlipped(false);
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [currentIndex, words.length]);

    // Show selection screen if no count selected
    if (selectedCount === null) {
        const countOptions = [10, 20, 30, 50, allWords.length];

        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-card border rounded-3xl p-12 shadow-2xl text-center">
                    <h2 className="text-3xl font-bold mb-4">How many flashcards?</h2>
                    <p className="text-muted-foreground mb-8">
                        Select the number of words you want to practice with
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {countOptions.map(count => (
                            <button
                                key={count}
                                onClick={() => handleCountSelection(count)}
                                className="p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                            >
                                <div className="text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">
                                    {count}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {count === allWords.length ? "All words" : "words"}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isComplete) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <div className="bg-card border rounded-3xl p-12 shadow-2xl">
                    <h2 className="text-4xl font-bold mb-6">Session Complete! 🎉</h2>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                            <div className="text-3xl font-bold text-green-600 mb-1">{mastered.size}</div>
                            <div className="text-sm font-medium text-muted-foreground">Mastered</div>
                        </div>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
                            <div className="text-3xl font-bold text-amber-600 mb-1">{needsReview.size}</div>
                            <div className="text-sm font-medium text-muted-foreground">Needs Review</div>
                        </div>
                    </div>
                    <button
                        onClick={handleRestart}
                        className="w-full px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={20} /> Practice Again
                    </button>
                </div>
            </div>
        );
    }

    if (!currentWord) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No words available for practice.</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-4xl">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 px-2">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Exit Practice</span>
                    </button>
                    
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex-1 sm:w-48 h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-sm font-bold text-muted-foreground whitespace-nowrap">
                            {currentIndex + 1} / {words.length}
                        </span>
                    </div>
                </div>

                {/* Main Practice Card - Refined for Mobile */}
                <div className="relative aspect-[4/5] sm:aspect-video w-full max-w-2xl mx-auto perspective-1000">
                    {/* Inner Container for Flip Animation */}
                    <div
                        className={cn(
                            "relative w-full h-full transition-all duration-500 transform-3d",
                            isFlipped && "transform-[rotateY(180deg)]"
                        )}
                    >
                        {/* Front of card */}
                        <div
                            className={cn(
                                "absolute inset-0 w-full h-full backface-hidden",
                                "bg-card border-2 rounded-3xl shadow-2xl",
                                "flex flex-col items-center justify-center p-8",
                            )}
                        >
                            <div className="text-center space-y-4">
                                {currentWord.article && (
                                    <span className="text-3xl text-muted-foreground font-serif italic block">
                                        {currentWord.article}
                                    </span>
                                )}
                                <div className="flex items-center justify-center gap-4">
                                    <h2 className="text-6xl font-black text-foreground">
                                        {currentWord.word}
                                    </h2>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speak(currentWord.word);
                                        }}
                                        className="p-3 rounded-full hover:bg-primary/10 text-primary transition-colors"
                                        title="Listen"
                                    >
                                        <Volume2 size={32} />
                                    </button>
                                </div>
                                {currentWord.plural && (
                                    <p className="text-xl text-muted-foreground italic">
                                        Plural: {currentWord.plural}
                                    </p>
                                )}
                                <div className="mt-6 pt-6 border-t border-border w-full max-w-md mx-auto">
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                                        Meaning
                                    </p>
                                    <h3 className="text-3xl font-bold text-primary">
                                        {currentWord.meaning_en}
                                    </h3>
                                </div>
                            </div>
                            <div className="absolute bottom-8 text-sm text-muted-foreground">
                                Click or press Space to reveal
                            </div>
                        </div>

                        {/* Back of card */}
                        <div
                            className={cn(
                                "absolute inset-0 w-full h-full backface-hidden transform-[rotateY(180deg)]",
                                "bg-card border-2 border-primary rounded-3xl shadow-2xl",
                                "flex flex-col items-center justify-center p-8",
                            )}
                        >
                            <div className="text-center space-y-6">
                                {currentWord.example_de ? (
                                    <div className="text-center">
                                        <div className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
                                            Example Sentence
                                        </div>
                                        <div className="flex items-center justify-center gap-3 mb-4">
                                            <p className="text-3xl font-serif italic text-foreground leading-relaxed">
                                                &quot;{currentWord.example_de}&quot;
                                            </p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    speak(currentWord.example_de);
                                                }}
                                                className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors shrink-0"
                                                title="Listen to example"
                                            >
                                                <Volume2 size={24} />
                                            </button>
                                        </div>
                                        <div className="h-px w-24 bg-primary/30 mx-auto mb-4" />
                                        <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                                            English Meaning
                                        </div>
                                        <p className="text-xl text-muted-foreground">
                                            {currentWord.example_en}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                        No example sentence available.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-8 flex flex-col gap-4">
                    {isFlipped && (
                        <div className="flex gap-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNeedsReview();
                                }}
                                className="flex-1 px-6 py-4 rounded-xl border-2 border-orange-500 text-orange-600 font-bold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors flex items-center justify-center gap-2"
                            >
                                <X size={20} />
                                Need More Practice
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMastered();
                                }}
                                className="flex-1 px-6 py-4 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
                            >
                                <Check size={20} />
                                Got It!
                            </button>
                        </div>
                    )}

                    <div className="flex gap-4 justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="px-6 py-3 rounded-xl border bg-background hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
                        >
                            <ArrowLeft size={20} />
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-6 py-3 rounded-xl border bg-background hover:bg-secondary transition-colors font-medium flex items-center gap-2"
                        >
                            Next
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Keyboard shortcuts hint */}
                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>Keyboard shortcuts: Space/Enter to flip • ← → to navigate</p>
                </div>
            </div>
        </div>
    );
}
