"use client";

import { useState } from "react";
import { VocabItem } from "@/lib/types";
import { ArrowRight, Check, X, RotateCcw, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { trackWordPractice, markWordLearned as markWordMastered, trackPracticeSession } from "@/lib/supabase-integration";
import { AuthGate } from "@/components/AuthGate";

interface TranslationPracticeProps {
    words: VocabItem[];
}

type Direction = "german-to-english" | "english-to-german";

export function TranslationPractice({ words: initialWords }: TranslationPracticeProps) {
    // Shuffle words once on initialization
    const [words, setWords] = useState(() => [...initialWords].sort(() => Math.random() - 0.5));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [direction, setDirection] = useState<Direction>("german-to-english");
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [startTime] = useState(() => Date.now());
    const { speak } = useTextToSpeech();

    const currentWord = words[currentIndex];

    const progress = ((currentIndex + 1) / words.length) * 100;

    const normalizeAnswer = (text: string): string => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[.,!?;:]/g, "")
            .replace(/\s+/g, " ");
    };

    const handleNext = async () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setUserAnswer("");
            setShowResult(false);
            setDirection(Math.random() > 0.5 ? "german-to-english" : "english-to-german");
        } else {
            // Practice complete - track the session
            const duration = Math.floor((Date.now() - startTime) / 1000);
            await trackPracticeSession("A1", "translation", words.length, score.correct, duration);
        }
    };

    const checkAnswer = async () => {
        const correct =
            direction === "german-to-english"
                ? normalizeAnswer(userAnswer) === normalizeAnswer(currentWord.meaning_en)
                : normalizeAnswer(userAnswer) === normalizeAnswer(currentWord.word);

        setIsCorrect(correct);
        setShowResult(true);
        if (correct) {
            setScore({ ...score, correct: score.correct + 1, total: score.total + 1 });
            // Track word practice and mark as mastered
            await trackWordPractice(currentWord.id, "A1", true);
            await markWordMastered(currentWord.id, "A1");
        } else {
            setScore({ ...score, total: score.total + 1 });
            // Track incorrect attempt
            await trackWordPractice(currentWord.id, "A1", false);
        }
    };


    const handleRestart = () => {
        setWords([...initialWords].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        setUserAnswer("");
        setShowResult(false);
        setScore({ correct: 0, total: 0 });
    };

    const toggleDirection = () => {
        setDirection(direction === "german-to-english" ? "english-to-german" : "german-to-english");
        setUserAnswer("");
        setShowResult(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !showResult) {
            checkAnswer();
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
                        You got {score.correct} out of {score.total} correct
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

    const questionText =
        direction === "german-to-english"
            ? `${currentWord.article ? currentWord.article + " " : ""}${currentWord.word}`
            : currentWord.meaning_en;

    const correctAnswer = direction === "german-to-english" ? currentWord.meaning_en : currentWord.word;

    return (
        <AuthGate currentIndex={currentIndex} freeLimit={3} featureName="translation practice">
            <div className="max-w-3xl mx-auto">
                {/* Header with direction toggle */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <div className="text-sm text-muted-foreground mb-2">Translation Mode</div>
                        <button
                            onClick={toggleDirection}
                            className="px-4 py-2 rounded-xl border bg-card hover:bg-secondary transition-colors font-medium text-sm"
                        >
                            {direction === "german-to-english" ? "🇩🇪 → 🇬🇧" : "🇬🇧 → 🇩🇪"}
                        </button>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">Score</div>
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
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-card border rounded-3xl p-12 shadow-2xl mb-8">
                    <div className="text-center mb-8">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                            Translate to {direction === "german-to-english" ? "English" : "German"}
                        </p>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <h2 className="text-5xl font-black text-foreground">{questionText}</h2>
                            {direction === "german-to-english" && (
                                <button
                                    onClick={() => speak(currentWord.word)}
                                    className="p-3 rounded-full hover:bg-primary/10 text-primary transition-colors"
                                    title="Listen"
                                >
                                    <Volume2 size={32} />
                                </button>
                            )}
                        </div>
                        {direction === "german-to-english" && currentWord.plural && (
                            <p className="text-lg text-muted-foreground italic">Plural: {currentWord.plural}</p>
                        )}
                    </div>

                    {!showResult ? (
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Type your answer..."
                                className="w-full px-6 py-4 rounded-xl border-2 border-input bg-background text-lg font-medium focus:border-primary focus:outline-none transition-colors"
                                autoFocus
                            />
                            <button
                                onClick={checkAnswer}
                                disabled={!userAnswer.trim()}
                                className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
                            >
                                Check Answer
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div
                                className={cn(
                                    "p-6 rounded-2xl border-2",
                                    isCorrect
                                        ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                                        : "bg-red-50 dark:bg-red-900/20 border-red-500"
                                )}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    {isCorrect ? (
                                        <>
                                            <Check size={24} className="text-green-600" />
                                            <span className="text-xl font-bold text-green-600">Correct!</span>
                                        </>
                                    ) : (
                                        <>
                                            <X size={24} className="text-red-600" />
                                            <span className="text-xl font-bold text-red-600">Incorrect</span>
                                        </>
                                    )}
                                </div>
                                {!isCorrect && (
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-sm text-muted-foreground">Your answer:</span>
                                            <p className="text-lg font-medium">{userAnswer}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Correct answer:</span>
                                            <div className="flex items-center gap-2">
                                                <p className="text-lg font-bold text-green-600">{correctAnswer}</p>
                                                {direction === "english-to-german" && (
                                                    <button
                                                        onClick={() => speak(currentWord.word)}
                                                        className="p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900/40 text-green-700 transition-colors"
                                                        title="Listen"
                                                    >
                                                        <Volume2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Example sentence */}
                            <div className="bg-secondary/50 p-6 rounded-2xl">
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
                                    Example
                                </p>
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-lg font-serif italic">&quot;{currentWord.example_de}&quot;</p>
                                    <button
                                        onClick={() => speak(currentWord.example_de)}
                                        className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                        title="Listen to example"
                                    >
                                        <Volume2 size={18} />
                                    </button>
                                </div>
                                <p className="text-muted-foreground">{currentWord.example_en}</p>
                            </div>

                            <button
                                onClick={handleNext}
                                className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                            >
                                Next Word
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Keyboard hint */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>Press Enter to {showResult ? "continue" : "check your answer"}</p>
                </div>
            </div>
        </AuthGate>
    );
}
