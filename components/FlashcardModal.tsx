"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { VocabItem } from "@/lib/types";
import { ArrowLeft, ArrowRight, Volume2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface FlashcardModalProps {
    isOpen: boolean;
    onClose: () => void;
    words: VocabItem[];
    initialIndex: number;
}

export function FlashcardModal({ isOpen, onClose, words, initialIndex }: FlashcardModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isFlipped, setIsFlipped] = useState(false);
    const { speak } = useTextToSpeech();

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setIsFlipped(false);
        }
    }, [isOpen, initialIndex]);

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
    }, [isOpen, currentIndex, words.length]);

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

    const currentWord = words[currentIndex];

    if (!currentWord) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="!max-w-3xl !p-0 !bg-transparent !shadow-none !border-none">
            <div className="relative w-full aspect-4/5 sm:aspect-4/3 max-h-150 md:max-h-175">
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

                {/* Navigation Buttons */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                    }}
                    disabled={currentIndex === 0}
                    className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 p-3 md:p-4 rounded-full bg-background border border-border shadow-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <ArrowLeft size={24} />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                    }}
                    disabled={currentIndex === words.length - 1}
                    className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 p-3 md:p-4 rounded-full bg-background border border-border shadow-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <ArrowRight size={24} />
                </button>
            </div>

            <div className="mt-6 text-center text-white/80 font-medium">
                {currentIndex + 1} / {words.length}
            </div>
        </Modal>
    );
}
