"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { VocabItem } from "@/lib/types";
import { ChevronLeft, ChevronRight, Volume2, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { getWordsMasteredStatus } from "@/lib/word-progress";
import { markWordLearned, unmarkWordLearned } from "@/lib/supabase-integration";

interface FlashcardModalProps {
    isOpen: boolean;
    onClose: () => void;
    words: VocabItem[];
    initialIndex: number;
}

export function FlashcardModal({ isOpen, onClose, words, initialIndex }: FlashcardModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isFlipped, setIsFlipped] = useState(false);
    const [learnedWords, setLearnedWords] = useState<Map<string, boolean>>(new Map());
    const { speak } = useTextToSpeech();

    const currentWord = words[currentIndex];
    const isCurrentLearned = currentWord ? learnedWords.get(currentWord.id) || false : false;

    // Load learned status for all words
    useEffect(() => {
        async function fetchProgress() {
            if (isOpen && words.length > 0) {
                const wordIds = words.map(w => w.id);
                const status = await getWordsMasteredStatus(wordIds);
                setLearnedWords(status);
            }
        }
        fetchProgress();
    }, [isOpen, words]);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setIsFlipped(false);
        }
    }, [isOpen, initialIndex]);

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setIsFlipped(false);
        }
    };

    const handleToggleLearned = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!currentWord) return;

        // Optimistically update UI
        const newStatus = new Map(learnedWords);
        newStatus.set(currentWord.id, !isCurrentLearned);
        setLearnedWords(newStatus);

        if (isCurrentLearned) {
            await unmarkWordLearned(currentWord.id);
        } else {
            await markWordLearned(currentWord.id, currentWord.level, currentWord.topic);
        }
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setIsFlipped(prev => !prev);
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                handleNext();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                handlePrevious();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [isOpen, currentIndex, words.length, handleNext, handlePrevious]);

    if (!currentWord) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="!max-w-3xl !p-0 !bg-transparent !shadow-none !border-none">
            <div className="relative w-full aspect-4/5 sm:aspect-4/3 max-h-150 md:max-h-175 px-12 sm:px-16 md:px-20">
                <div
                    className={cn(
                        "relative w-full h-full cursor-pointer perspective-1000 group",
                    )}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <div
                        className={cn(
                            "relative w-full h-full transition-all duration-500 transform-3d",
                            isFlipped && "transform-[rotateY(180deg)]"
                        )}
                    >
                        {/* Front */}
                        <div className={cn(
                            "absolute inset-0 w-full h-full backface-hidden",
                            "bg-card border-2 rounded-3xl shadow-2xl",
                            "flex flex-col items-center justify-center p-6 md:p-12",
                        )}>
                            <div className="text-center space-y-4 sm:space-y-6">
                                {currentWord.article && (
                                    <span className={cn(
                                        "text-xl sm:text-2xl font-serif italic",
                                        currentWord.article === 'der' && "text-blue-500",
                                        currentWord.article === 'die' && "text-red-500",
                                        currentWord.article === 'das' && "text-green-500",
                                    )}>
                                        {currentWord.article}
                                    </span>
                                )}
                                <div className="flex items-center justify-center gap-4">
                                    <h2 className="text-4xl xs:text-5xl md:text-7xl font-black text-foreground">
                                        {currentWord.word}
                                    </h2>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speak(currentWord.word);
                                        }}
                                        className="p-3 rounded-full hover:bg-primary/10 text-primary transition-colors"
                                    >
                                        <Volume2 size={32} />
                                    </button>
                                </div>
                                {currentWord.plural && (
                                    <p className="text-xl text-muted-foreground italic">
                                        Plural: {currentWord.plural}
                                    </p>
                                )}
                            </div>
                            <div className="absolute bottom-8 text-sm text-muted-foreground animate-pulse">
                                Click or Press Space to flip
                            </div>
                        </div>

                        {/* Back */}
                        <div className={cn(
                            "absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]",
                            "bg-card border-2 border-primary rounded-3xl shadow-2xl",
                            "flex flex-col items-center justify-center p-8 md:p-12",
                        )}>
                            <div className="text-center space-y-6 max-w-2xl">
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Meaning</p>
                                    <h3 className="text-4xl font-bold text-primary mb-6">
                                        {currentWord.meaning_en}
                                    </h3>
                                </div>

                                {currentWord.example_de && (
                                    <div className="space-y-4">
                                        <div className="h-px w-24 bg-border mx-auto" />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex items-center gap-3">
                                                <p className="text-2xl font-serif italic text-foreground">
                                                    "{currentWord.example_de}"
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        speak(currentWord.example_de!);
                                                    }}
                                                    className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors"
                                                >
                                                    <Volume2 size={20} />
                                                </button>
                                            </div>
                                            <p className="text-lg text-muted-foreground">
                                                {currentWord.example_en}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons - Improved with Better Arrows */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                    }}
                    disabled={currentIndex === 0}
                    className={cn(
                        "absolute top-1/2 left-2 sm:left-4 -translate-y-1/2",
                        "p-2 sm:p-3 rounded-full",
                        "bg-card border-2 border-border shadow-xl",
                        "hover:bg-primary hover:border-primary hover:text-white hover:scale-110",
                        "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-card disabled:hover:text-foreground",
                        "transition-all duration-200",
                        "flex items-center justify-center z-10"
                    )}
                    title="Previous word (←)"
                >
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" strokeWidth={3} />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                    }}
                    disabled={currentIndex === words.length - 1}
                    className={cn(
                        "absolute top-1/2 right-2 sm:right-4 -translate-y-1/2",
                        "p-2 sm:p-3 rounded-full",
                        "bg-card border-2 border-border shadow-xl",
                        "hover:bg-primary hover:border-primary hover:text-white hover:scale-110",
                        "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-card disabled:hover:text-foreground",
                        "transition-all duration-200",
                        "flex items-center justify-center z-10"
                    )}
                    title="Next word (→)"
                >
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" strokeWidth={3} />
                </button>

            </div>

            {/* Mark as Learned Button - Below card */}
            <div className="mt-4 sm:mt-6 flex justify-center">
                <button
                    onClick={handleToggleLearned}
                    className={cn(
                        "p-3 sm:p-3.5 rounded-full shadow-xl transition-all duration-200",
                        "flex items-center gap-2 font-semibold text-sm sm:text-base",
                        isCurrentLearned
                            ? "bg-green-500 text-white border-2 border-green-600 hover:bg-green-600 hover:scale-105"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-500 hover:scale-105"
                    )}
                    title={isCurrentLearned ? "Click to mark as not learned" : "Click to mark as learned"}
                >
                    {isCurrentLearned ? (
                        <>
                            <CheckCircle2 size={20} className="fill-white" />
                            <span>Learned!</span>
                        </>
                    ) : (
                        <>
                            <Circle size={20} />
                            <span>Mark as Learned</span>
                        </>
                    )}
                </button>
            </div>

            {/* Counter and Instructions */}
            <div className="mt-3 sm:mt-4 text-center space-y-2">
                <div className="text-white/90 font-bold text-base sm:text-lg">
                    {currentIndex + 1} / {words.length}
                </div>
                <div className="text-white/60 text-xs sm:text-sm font-medium">
                    <span className="hidden sm:inline">Use ← → arrows to navigate • </span>
                    Press Space to flip
                </div>
            </div>
        </Modal>
    );
}
