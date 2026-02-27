"use client";

import { useState, useCallback } from "react";
import { QuizQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, HelpCircle, RotateCcw, BookOpen, ChevronRight } from "lucide-react";
import { trackQuizCompletion, markWordForPractice } from "@/lib/supabase-integration";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { AuthGate } from "@/components/AuthGate";

interface QuizInterfaceProps {
    questions: QuizQuestion[];
}

type Phase = "quiz" | "practice-review" | "done";

export default function QuizInterface({ questions: initialQuestions }: QuizInterfaceProps) {
    const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [totalAnswered, setTotalAnswered] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [practiceAgainQueue, setPracticeAgainQueue] = useState<QuizQuestion[]>([]);
    const [phase, setPhase] = useState<Phase>("quiz");
    const [practiceViewIndex, setPracticeViewIndex] = useState(0);
    const [practiceTestIndex, setPracticeTestIndex] = useState(0);
    const [practiceTestAnswered, setPracticeTestAnswered] = useState(false);
    const [practiceTestSelected, setPracticeTestSelected] = useState<string | null>(null);
    const { speak } = useTextToSpeech();

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (option: string) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);
        setTotalAnswered(prev => prev + 1);

        if (option === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
            speak("Richtig!");
        } else {
            speak("Falsch!");
        }
    };

    const handleMarkPracticeAgain = useCallback(() => {
        setPracticeAgainQueue(prev => [...prev, currentQuestion]);
    }, [currentQuestion]);

    const persistPracticeAgain = (q: QuizQuestion) => {
        // Fire-and-forget DB write – don't block UI
        if (q.id) {
            markWordForPractice(q.id, q.level ?? 'a1', q.topic ?? 'general');
        }
    };

    const nextQuestion = (markForPractice = false) => {
        if (markForPractice) {
            setPracticeAgainQueue(prev => [...prev, currentQuestion]);
            persistPracticeAgain(currentQuestion);
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            // End of quiz
            trackQuizCompletion("A1", score, questions.length);
            if (practiceAgainQueue.length > 0 || markForPractice) {
                const finalQueue = markForPractice
                    ? [...practiceAgainQueue, currentQuestion]
                    : practiceAgainQueue;
                setPracticeAgainQueue(finalQueue);
                setPhase("practice-review");
            } else {
                setPhase("done");
            }
        }
    };

    // ── Practice-review phase: show meaning then re-test ──────────────────────
    const practiceWord = practiceAgainQueue[practiceViewIndex];
    const practiceTestWord = practiceAgainQueue[practiceTestIndex];

    const handlePracticeTestAnswer = (option: string) => {
        if (practiceTestAnswered) return;
        setPracticeTestSelected(option);
        setPracticeTestAnswered(true);
        if (option === practiceTestWord.correctAnswer) speak("Richtig!");
        else speak("Falsch!");
    };

    const advancePracticeTest = () => {
        if (practiceTestIndex < practiceAgainQueue.length - 1) {
            setPracticeTestIndex(prev => prev + 1);
            setPracticeTestSelected(null);
            setPracticeTestAnswered(false);
        } else {
            setPhase("done");
        }
    };

    // ─── DONE screen ──────────────────────────────────────────────────────────
    if (phase === "done") {
        const pct = Math.round((score / (totalAnswered || 1)) * 100);
        return (
            <div className="bg-card w-full max-w-md mx-auto rounded-3xl p-8 text-center border shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-muted-foreground mb-8">
                    {score} correct out of {totalAnswered} answered.
                </p>

                <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Score</div>
                    <div className="text-5xl font-extrabold text-primary">{pct}%</div>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    className="w-full h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
                >
                    <RefreshCw size={18} /> Play Again
                </button>
            </div>
        );
    }

    // ─── PRACTICE-REVIEW phase ────────────────────────────────────────────────
    if (phase === "practice-review") {
        const isTestPhase = practiceViewIndex >= practiceAgainQueue.length;

        if (!isTestPhase) {
            // Step 1: show the meaning of flagged words one by one
            return (
                <div className="w-full max-w-xl mx-auto px-4 sm:px-0 animate-in fade-in duration-300">
                    <div className="mb-4 flex items-center justify-between px-1">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <BookOpen size={14} /> Study Mode
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {practiceViewIndex + 1} / {practiceAgainQueue.length}
                        </span>
                    </div>

                    <div className="bg-card border rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
                        {/* thin accent bar */}
                        <div className="h-1 bg-amber-400 w-full" />

                        <div className="p-8 sm:p-10 text-center">
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">English</p>
                            <h3 className="text-3xl sm:text-4xl font-black mb-8 text-foreground">
                                {practiceAgainQueue[practiceViewIndex].question}
                            </h3>

                            <div className="h-px bg-border mb-6" />

                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">German</p>
                            <p className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                                {practiceAgainQueue[practiceViewIndex].correctAnswer}
                            </p>

                            {practiceAgainQueue[practiceViewIndex].explanation && (
                                <p className="text-sm text-muted-foreground mt-4 italic">
                                    {practiceAgainQueue[practiceViewIndex].explanation}
                                </p>
                            )}
                        </div>

                        <div className="px-8 pb-8">
                            <button
                                onClick={() => {
                                    if (practiceViewIndex + 1 >= practiceAgainQueue.length) {
                                        setPracticeViewIndex(practiceAgainQueue.length); // trigger test phase
                                    } else {
                                        setPracticeViewIndex(prev => prev + 1);
                                    }
                                }}
                                className="w-full h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {practiceViewIndex + 1 < practiceAgainQueue.length ? (
                                    <>Next Word <ChevronRight size={18} /></>
                                ) : (
                                    <>Test Yourself <ArrowRight size={18} /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // Step 2: re-test flagged words
        if (!practiceTestWord) {
            setPhase("done");
            return null;
        }

        const isCorrect = practiceTestSelected === practiceTestWord.correctAnswer;
        const showWrong = practiceTestAnswered && !isCorrect;

        return (
            <div className="w-full max-w-xl mx-auto px-4 sm:px-0 animate-in fade-in duration-300">
                <div className="mb-4 flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <RotateCcw size={14} /> Re-Test
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {practiceTestIndex + 1} / {practiceAgainQueue.length}
                    </span>
                </div>

                <div className="bg-card border rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
                    <div className="h-1 bg-violet-500 w-full" />
                    <div className="p-8 sm:p-10">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 text-center">
                            What is the German word for…
                        </p>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
                            {practiceTestWord.question}
                        </h3>

                        <div className="space-y-3">
                            {practiceTestWord.options?.map((option, idx) => {
                                const sel = option === practiceTestSelected;
                                const correct = option === practiceTestWord.correctAnswer;
                                const showC = practiceTestAnswered && correct;
                                const showW = practiceTestAnswered && sel && !correct;

                                return (
                                    <button
                                        key={option}
                                        onClick={() => handlePracticeTestAnswer(option)}
                                        disabled={practiceTestAnswered}
                                        className={cn(
                                            "group w-full p-4 rounded-xl border-2 text-left font-medium transition-all relative overflow-hidden",
                                            practiceTestAnswered ? "cursor-default" : "hover:border-primary hover:bg-primary/5 active:scale-[0.98]",
                                            showC && "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
                                            showW && "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
                                            !practiceTestAnswered && !showC && !showW && "border-border bg-card shadow-sm"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-3">
                                                <span className={cn(
                                                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border transition-colors",
                                                    showC ? "bg-green-200 border-green-300 text-green-800" :
                                                        showW ? "bg-red-200 border-red-300 text-red-800" :
                                                            "bg-background border-border text-muted-foreground"
                                                )}>
                                                    {String.fromCharCode(65 + idx)}
                                                </span>
                                                <span className="text-lg">{option}</span>
                                            </span>
                                            {showC && <CheckCircle2 className="text-green-600 animate-in zoom-in" />}
                                            {showW && <XCircle className="text-red-600 animate-in zoom-in" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {practiceTestAnswered && (
                            <div className="mt-6 animate-in slide-in-from-bottom-2 fade-in">
                                <button
                                    onClick={advancePracticeTest}
                                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                                >
                                    {practiceTestIndex < practiceAgainQueue.length - 1
                                        ? <><span>Next</span><ArrowRight size={18} /></>
                                        : "See Final Results"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ─── MAIN QUIZ phase ──────────────────────────────────────────────────────
    return (
        <AuthGate currentIndex={currentIndex} freeLimit={3} featureName="quiz questions">
            <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
                <div className="flex justify-between items-center mb-6 px-2">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Question</span>
                        <span className="text-xl font-bold">
                            {currentIndex + 1}{" "}
                            <span className="text-muted-foreground text-base font-normal">/ {questions.length}</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border">
                        <CheckCircle2 size={16} className="text-primary" />
                        <span className="text-sm font-bold text-foreground">{score}</span>
                    </div>
                </div>

                <div className="relative bg-card rounded-2xl sm:rounded-3xl border shadow-xl overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary">
                        <div
                            className="h-full bg-primary transition-all duration-300 ease-out rounded-r-full"
                            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
                        />
                    </div>

                    <div className="p-8 sm:p-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold mb-6 border border-primary/10">
                            <HelpCircle size={14} />
                            What is the German word for…
                        </div>

                        {/* Show English word — user must pick German */}
                        <h3 className="text-2xl sm:text-3xl font-bold mb-10 leading-snug">
                            {currentQuestion.question}
                        </h3>

                        <div className="space-y-3">
                            {currentQuestion.options?.map((option, idx) => {
                                const isSelected = option === selectedOption;
                                const isCorrect = option === currentQuestion.correctAnswer;
                                const showCorrect = isAnswered && isCorrect;
                                const showWrong = isAnswered && isSelected && !isCorrect;

                                return (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswer(option)}
                                        disabled={isAnswered}
                                        className={cn(
                                            "group w-full p-4 rounded-xl border-2 text-left font-medium transition-all relative overflow-hidden",
                                            isAnswered
                                                ? "cursor-default"
                                                : "hover:border-primary hover:bg-primary/5 active:scale-[0.98]",
                                            showCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
                                            showWrong && "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
                                            !isAnswered && !showCorrect && !showWrong && "border-border bg-card hover:border-primary hover:bg-muted/50 shadow-sm"
                                        )}
                                    >
                                        <div className="flex items-center justify-between relative z-10">
                                            <span className="flex items-center gap-3">
                                                <span className={cn(
                                                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border transition-colors",
                                                    showCorrect ? "bg-green-200 border-green-300 text-green-800" :
                                                        showWrong ? "bg-red-200 border-red-300 text-red-800" :
                                                            "bg-background border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary"
                                                )}>
                                                    {String.fromCharCode(65 + idx)}
                                                </span>
                                                <span className="text-lg">{option}</span>
                                            </span>
                                            {showCorrect && <CheckCircle2 className="text-green-600 animate-in zoom-in" />}
                                            {showWrong && <XCircle className="text-red-600 animate-in zoom-in" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {isAnswered && (
                            <div className="mt-8 pt-6 border-t animate-in slide-in-from-bottom-2 fade-in">
                                {currentQuestion.explanation && (
                                    <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl mb-5 text-sm">
                                        <span className="font-bold text-primary block mb-1 uppercase tracking-wide text-xs flex items-center gap-1">
                                            <HelpCircle size={12} /> Example
                                        </span>
                                        <p className="text-foreground leading-relaxed">{currentQuestion.explanation}</p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    {/* Practice Again — only show when wrong or uncertain */}
                                    {selectedOption !== currentQuestion.correctAnswer && (
                                        <button
                                            onClick={() => nextQuestion(true)}
                                            className="flex-1 h-12 rounded-full border-2 border-amber-500 text-amber-600 font-bold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all flex items-center justify-center gap-2 text-sm"
                                        >
                                            <RotateCcw size={16} />
                                            Practice Again
                                        </button>
                                    )}

                                    <button
                                        onClick={() => nextQuestion(false)}
                                        className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                                    >
                                        {currentIndex < questions.length - 1 ? (
                                            <>Next <ArrowRight size={18} /></>
                                        ) : (
                                            "Finish"
                                        )}
                                    </button>
                                </div>

                                {/* If got it right, still allow manual "Practice Again" */}
                                {selectedOption === currentQuestion.correctAnswer && (
                                    <button
                                        onClick={() => nextQuestion(true)}
                                        className="mt-2 w-full text-xs text-muted-foreground hover:text-amber-600 transition-colors flex items-center justify-center gap-1 py-1"
                                    >
                                        <RotateCcw size={12} />
                                        Not sure? Add to practice list
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthGate>
    );
}
