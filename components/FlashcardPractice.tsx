"use client";

import { useState, useEffect } from "react";
import { VocabItem } from "@/lib/types";
import { ArrowLeft, ArrowRight, Check, Volume2, RotateCcw } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { trackWordPractice, trackPracticeSession, markWordLearned } from "@/lib/supabase-integration";
import { AuthGate } from "@/components/AuthGate";

interface FlashcardProps {
    words: VocabItem[];
    level: string;
    onComplete?: () => void;
}

interface QuizOption {
    text: string;
    isCorrect: boolean;
}

export function FlashcardPractice({ words: allWords, level, onComplete }: FlashcardProps) {
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
            trackPracticeSession(level, 'flashcards', words.length, correctCount, durationSeconds);

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
            } else if (e.key === "l" || e.key === "L") {
                e.preventDefault();
                // Mark current word as learned via functional updaters
                setMastered(prev => new Set(prev).add(currentIndex));
                setNeedsReview(prev => { const n = new Set(prev); n.delete(currentIndex); return n; });
                const word = words[currentIndex];
                if (word) {
                    trackWordPractice(word.id, word.level, true);
                    markWordLearned(word.id, word.level, word.topic);
                }
                // Auto-advance
                setCurrentIndex(prev => Math.min(prev + 1, words.length - 1));
                setIsFlipped(false);
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [currentIndex, words]);

    // Show selection screen if no count selected
    if (selectedCount === null) {
        const countOptions = [10, 20, 30, 50, allWords.length];

        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-card border rounded-3xl p-12 shadow-2xl text-center">
                    <h2 className="text-3xl font-bold mb-2">How many flashcards?</h2>
                    <p className="text-muted-foreground mb-1">
                        Practising <span className="font-bold text-primary uppercase">Level {level.toUpperCase()}</span> vocabulary
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">Select the number of words</p>

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
        <AuthGate currentIndex={currentIndex} freeLimit={3} featureName="flashcards">
            <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-3 py-6 sm:p-6">
                <div className="w-full max-w-4xl">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 gap-3 sm:gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors group"
                            >
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium">Exit Practice</span>
                            </button>
                            {/* Level badge */}
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
                                Level {level.toUpperCase()}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            {/* Learned indicator */}
                            {mastered.has(currentIndex) && (
                                <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full border border-green-200 dark:border-green-800">
                                    <Check size={12} /> Learned
                                </span>
                            )}
                            <div className="flex-1 sm:w-48 h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-muted-foreground whitespace-nowrap">
                                {currentIndex + 1} / {words.length}
                            </span>
                        </div>
                    </div>

                    {/* Main Practice Card - Mobile Optimized with Touch Support */}
                    <div className="relative w-full max-w-2xl mx-auto mb-6">
                        {/* Card Container with Touch Flip */}
                        <div
                            className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-video cursor-pointer"
                            style={{ perspective: '1000px' }}
                            onClick={() => setIsFlipped(!isFlipped)}
                            onTouchEnd={(e) => {
                                e.preventDefault();
                                setIsFlipped(!isFlipped);
                            }}
                        >
                            {/* Inner Container for Flip Animation */}
                            <div
                                className="relative w-full h-full transition-transform duration-500"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                }}
                            >
                                {/* Front of card */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-card via-card to-primary/5 border-2 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden'
                                    }}
                                >
                                    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8">
                                        <div className="text-center space-y-3 sm:space-y-4 w-full">
                                            {currentWord.article && (
                                                <span className="text-xl sm:text-3xl text-muted-foreground font-serif italic block">
                                                    {currentWord.article}
                                                </span>
                                            )}
                                            <div className="flex items-center justify-center gap-2 sm:gap-4">
                                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground break-words max-w-[80%]">
                                                    {currentWord.word}
                                                </h2>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        speak(currentWord.word);
                                                    }}
                                                    className="p-2 sm:p-3 rounded-full hover:bg-primary/10 active:bg-primary/20 text-primary transition-colors"
                                                    title="Listen"
                                                >
                                                    <Volume2 size={24} className="sm:w-8 sm:h-8" />
                                                </button>
                                            </div>
                                            {currentWord.plural && (
                                                <p className="text-base sm:text-xl text-muted-foreground italic">
                                                    Plural: {currentWord.plural}
                                                </p>
                                            )}
                                            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border w-full max-w-md mx-auto">
                                                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-2">
                                                    Meaning
                                                </p>
                                                <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                                                    {currentWord.meaning_en}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 sm:bottom-8 text-xs sm:text-sm text-muted-foreground">
                                            Tap or press Space to flip
                                        </div>
                                    </div>
                                </div>

                                {/* Back of card */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/5 via-card to-card border-2 border-primary rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)'
                                    }}
                                >
                                    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8 overflow-y-auto">
                                        <div className="text-center space-y-4 sm:space-y-6 w-full">
                                            {currentWord.example_de ? (
                                                <div className="text-center">
                                                    <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
                                                        Example Sentence
                                                    </div>
                                                    <div className="flex items-start justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                        <p className="text-lg sm:text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed">
                                                            &quot;{currentWord.example_de}&quot;
                                                        </p>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                speak(currentWord.example_de);
                                                            }}
                                                            className="p-2 rounded-full hover:bg-primary/10 active:bg-primary/20 text-primary transition-colors shrink-0"
                                                            title="Listen to example"
                                                        >
                                                            <Volume2 size={20} className="sm:w-6 sm:h-6" />
                                                        </button>
                                                    </div>
                                                    <div className="h-px w-16 sm:w-24 bg-primary/30 mx-auto mb-3 sm:mb-4" />
                                                    <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-2">
                                                        English Meaning
                                                    </div>
                                                    <p className="text-base sm:text-xl text-muted-foreground">
                                                        {currentWord.example_en}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="text-center text-muted-foreground text-sm sm:text-base">
                                                    No example sentence available.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls - Always visible, no flip required */}
                    <div className="mt-4 sm:mt-6 flex flex-col gap-3 px-2 sm:px-0">

                        {/* Primary action row: Mark as Learned / Need Practice */}
                        <div className="flex gap-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNeedsReview();
                                }}
                                className={`flex-1 py-3 sm:py-4 rounded-2xl border-2 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 ${needsReview.has(currentIndex)
                                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600"
                                    : "border-orange-400 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                                    }`}
                            >
                                <RotateCcw size={16} />
                                Need Practice
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMastered();
                                }}
                                className={`flex-1 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${mastered.has(currentIndex)
                                    ? "bg-green-600 text-white shadow-green-500/30"
                                    : "bg-green-500 hover:bg-green-600 text-white shadow-green-500/25"
                                    }`}
                            >
                                <Check size={16} />
                                {mastered.has(currentIndex) ? "Learned ✓" : "Mark as Learned"}
                            </button>
                        </div>

                        {/* Secondary: Prev / Flip hint / Next */}
                        <div className="flex gap-2 justify-between items-center">
                            <button
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                                className="px-4 sm:px-6 py-2.5 rounded-xl border bg-background hover:bg-secondary active:bg-secondary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-medium text-sm flex items-center gap-2"
                            >
                                <ArrowLeft size={16} />
                                <span className="hidden xs:inline">Prev</span>
                            </button>

                            <span className="text-xs text-muted-foreground">
                                Tap card to see example
                            </span>

                            <button
                                onClick={handleNext}
                                className="px-4 sm:px-6 py-2.5 rounded-xl border bg-background hover:bg-secondary active:bg-secondary/80 transition-colors font-medium text-sm flex items-center gap-2"
                            >
                                <span className="hidden xs:inline">Next</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Keyboard shortcuts hint */}
                    <div className="mt-4 text-center text-xs text-muted-foreground hidden sm:block">
                        <p>Space/Enter to flip &nbsp;•&nbsp; ← → to navigate &nbsp;•&nbsp; L to mark learned</p>
                    </div>
                </div>
            </div>
        </AuthGate>
    );
}
