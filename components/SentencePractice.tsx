"use client";

import { useState } from "react";
import { VocabItem } from "@/lib/types";
import { Check, X, RotateCcw, ArrowRight, Lightbulb, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { incrementPracticeStats, markWordAsMastered } from "@/lib/progress";

interface SentencePracticeProps {
    words: VocabItem[];
}

export function SentencePractice({ words: initialWords }: SentencePracticeProps) {
    // Shuffle words once on initialization
    const [words] = useState(() => [...initialWords].sort(() => Math.random() - 0.5));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userSentence, setUserSentence] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const { speak } = useTextToSpeech();

    const currentWord = words[currentIndex];

    const progress = ((currentIndex + 1) / words.length) * 100;


    const normalizeSentence = (text: string): string => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[.,!?;:"']/g, "")
            .replace(/\s+/g, " ");
    };

    const checkSentence = () => {
        const userNormalized = normalizeSentence(userSentence);
        const correctNormalized = normalizeSentence(currentWord.example_de);

        // Check if user's sentence is reasonably close
        // For simplicity, we'll check if it contains the word and has some similarity
        const containsWord = userNormalized.includes(normalizeSentence(currentWord.word));
        const isExactMatch = userNormalized === correctNormalized;
        const isCorrect = isExactMatch || containsWord;

        setShowResult(true);

        if (isCorrect) {
            setScore({
                ...score,
                correct: score.correct + 1,
                total: score.total + 1,
            });
            incrementPracticeStats(15);
            markWordAsMastered(currentWord.id);
        } else {
            setScore({ ...score, total: score.total + 1 });
            incrementPracticeStats(2);
        }
    };

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setUserSentence("");
            setShowResult(false);
            setShowHint(false);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setUserSentence("");
        setShowResult(false);
        setShowHint(false);
        setScore({ correct: 0, total: 0 });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !showResult) {
            checkSentence();
        } else if (e.key === "Enter" && showResult) {
            handleNext();
        }
    };

    if (!currentWord) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No words available for practice.</p>
            </div>
        );
    }

    if (currentIndex >= words.length && showResult) {
        const percentage = Math.round((score.correct / score.total) * 100);
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <div className="bg-card border rounded-3xl p-12 shadow-2xl">
                    <h2 className="text-4xl font-bold mb-6">Practice Complete! 🎉</h2>
                    <div className="text-6xl font-black text-primary mb-4">{percentage}%</div>
                    <p className="text-xl text-muted-foreground mb-8">
                        You got {score.correct} perfect sentences out of {score.total}
                    </p>
                    <button
                        onClick={handleRestart}
                        className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 shadow-lg shadow-primary/25"
                    >
                        <RotateCcw size={20} />
                        Practice Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header with score */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <div className="text-sm text-muted-foreground mb-1">Your Score</div>
                    <div className="text-2xl font-bold">
                        {score.correct} / {score.total}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>
                        {currentIndex + 1} / {words.length}
                    </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-card border rounded-3xl p-8 sm:p-12 shadow-2xl mb-8">
                <div className="mb-8">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                        Form a German sentence using this word
                    </p>
                    <div className="text-center py-6 bg-secondary/30 rounded-2xl mb-4">
                        {currentWord.article && (
                            <span className="text-2xl text-muted-foreground font-serif italic mr-2">
                                {currentWord.article}
                            </span>
                        )}
                        <span className="text-4xl sm:text-5xl font-black text-foreground mr-4">
                            {currentWord.word}
                        </span>
                        <button
                            onClick={() => speak(currentWord.word)}
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground transition-colors inline-flex align-middle"
                            title="Listen"
                        >
                            <Volume2 size={32} />
                        </button>
                    </div>
                    <p className="text-center text-lg text-muted-foreground">
                        English meaning: <span className="font-semibold text-foreground">{currentWord.meaning_en}</span>
                    </p>
                </div>

                {!showResult ? (
                    <div className="space-y-4">
                        <textarea
                            value={userSentence}
                            onChange={(e) => setUserSentence(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your German sentence here..."
                            className="w-full px-6 py-4 rounded-xl border-2 border-input bg-background text-lg font-medium focus:border-primary focus:outline-none transition-colors resize-none"
                            rows={3}
                            autoFocus
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="px-4 py-3 rounded-xl border bg-background hover:bg-secondary transition-colors font-medium inline-flex items-center gap-2"
                            >
                                <Lightbulb size={18} />
                                {showHint ? "Hide" : "Show"} Hint
                            </button>
                            <button
                                onClick={checkSentence}
                                disabled={!userSentence.trim()}
                                className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
                            >
                                Check Sentence
                            </button>
                        </div>

                        {showHint && (
                            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 animate-in slide-in-from-top-2">
                                <div className="flex items-start gap-2">
                                    <Lightbulb size={18} className="text-primary mt-1" />
                                    <div>
                                        <p className="text-sm font-bold text-primary mb-2">English version:</p>
                                        <p className="text-foreground font-medium leading-relaxed">{currentWord.example_en}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl border-2 bg-green-50 dark:bg-green-900/20 border-green-500">
                            <div className="flex items-center gap-3 mb-4">
                                <Check size={24} className="text-green-600" />
                                <span className="text-xl font-bold text-green-600">Good Job!</span>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-muted-foreground">Your sentence:</span>
                                    <p className="text-lg font-medium">{userSentence}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-muted-foreground">Example sentence:</span>
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-bold text-green-600">{currentWord.example_de}</p>
                                        <button
                                            onClick={() => speak(currentWord.example_de)}
                                            className="p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900/40 text-green-700 transition-colors"
                                            title="Listen"
                                        >
                                            <Volume2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{currentWord.example_en}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                        >
                            {currentIndex < words.length - 1 ? "Next Word" : "Complete Practice"}
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Keyboard hint */}
            {!showResult && (
                <div className="text-center text-sm text-muted-foreground">
                    <p>Press Enter to check your sentence</p>
                </div>
            )}
        </div>
    );
}
