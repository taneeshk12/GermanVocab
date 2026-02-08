"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, HelpCircle } from "lucide-react";
import { trackQuizCompletion } from "@/lib/supabase-integration";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { AuthGate } from "@/components/AuthGate";

interface QuizInterfaceProps {
    questions: QuizQuestion[];
}

export default function QuizInterface({ questions }: QuizInterfaceProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const { speak } = useTextToSpeech();

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (option: string) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        if (option === currentQuestion.correctAnswer) {
            setScore(score + 1);
            if (currentQuestion.audioText) {
                // Speak "Richtig!" followed by the sentence
                speak(`Richtig! ${currentQuestion.audioText}`);
            } else {
                speak("Richtig!");
            }
        } else {
            speak("Falsch!");
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            // Save result to Supabase
            trackQuizCompletion("A1", score, questions.length);
            setShowResult(true);
        }
    };

    if (showResult) {
        return (
            <div className="bg-card w-full max-w-md mx-auto rounded-3xl p-8 text-center border shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-muted-foreground mb-8">You mastered {score} out of {questions.length} words today.</p>

                <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Final Score</div>
                    <div className="text-5xl font-extrabold text-primary">{Math.round((score / questions.length) * 100)}%</div>
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

    return (
        <AuthGate currentIndex={currentIndex} freeLimit={1} featureName="quiz question">
            <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
                <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Question</span>
                    <span className="text-xl font-bold">{currentIndex + 1} <span className="text-muted-foreground text-base font-normal">/ {questions.length}</span></span>
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
                        style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
                    ></div>
                </div>

                <div className="p-8 sm:p-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold mb-6 border border-primary/10">
                        <HelpCircle size={14} />
                        {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'Select Article'}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold mb-10 leading-snug">{currentQuestion.question}</h3>

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
                            <div className="bg-primary/10 border border-primary/20 p-5 rounded-2xl mb-6">
                                <span className="font-bold text-primary block mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                                    <HelpCircle size={16} /> Explanation
                                </span>
                                <p className="text-foreground leading-relaxed">
                                    {currentQuestion.explanation}
                                </p>
                            </div>
                            <button
                                onClick={nextQuestion}
                                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                {currentIndex < questions.length - 1 ?
                                    <>Next Question <ArrowRight size={20} /></> :
                                    "See Results"
                                }
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </AuthGate>
    );
}
