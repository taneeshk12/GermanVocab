"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/types";

interface QuizInterfaceProps {
    questions: QuizQuestion[];
}

export default function QuizInterface({ questions }: QuizInterfaceProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (option: string) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        if (option === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-800 shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
                <p className="text-xl mb-6">You scored {score} out of {questions.length}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full transition-colors"
                >
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Question {currentIndex + 1}/{questions.length}</span>
                <span className="text-sm font-bold bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Score: {score}</span>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800">
                <div
                    className="h-full bg-blue-500 transition-all duration-300 ease-out"
                    style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
                ></div>
            </div>

            <h3 className="text-2xl font-bold mb-8 text-center">{currentQuestion.question}</h3>

            <div className="space-y-3">
                {currentQuestion.options?.map((option) => {
                    let className = "w-full p-4 rounded-xl border-2 text-left font-medium transition-all transform active:scale-95 ";

                    if (isAnswered) {
                        if (option === currentQuestion.correctAnswer) {
                            className += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 ";
                        } else if (option === selectedOption) {
                            className += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 ";
                        } else {
                            className += "border-gray-100 dark:border-gray-800 text-gray-400 ";
                        }
                    } else {
                        className += "border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 ";
                    }

                    return (
                        <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            disabled={isAnswered}
                            className={className}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {isAnswered && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4 text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-bold block mb-1">Explanation:</span>
                        {currentQuestion.explanation}
                    </div>
                    <button
                        onClick={nextQuestion}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-lg shadow-blue-500/30"
                    >
                        {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
                    </button>
                </div>
            )}
        </div>
    );
}
