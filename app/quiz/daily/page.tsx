import QuizInterface from "@/components/QuizInterface";
import { generateDailyQuiz } from "@/lib/quiz";
import Link from "next/link";
// We don't need 'use client' here because the page itself processes data on server (or build),
// then passes it to the client component. BUT `generateDailyQuiz` handles randomness.
// If we want a new quiz on every refresh for "Daily", we should use dynamic rendering or client-side generation.
// For "Daily" usually implies "Same for everyone today" or "New every time you visit". 
// Given the requirements "Client-side logic", lets generate it on the client OR generate on server for that render.
// To keep it simple and SEO friendly (not that quiz needs SEO content usually), let's generate on server component dynamically.

export const dynamic = "force-dynamic"; // Ensure new quiz on refresh

export default function DailyQuizPage() {
    const questions = generateDailyQuiz("A1", 10); // Default to A1 for daily quiz for now

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
            <div className="w-full max-w-md mb-8 flex justify-between items-center">
                <Link href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    ← Exit Quiz
                </Link>
                <h1 className="text-xl font-bold">Daily German Quiz</h1>
                <div className="w-12"></div> {/* Spacer for center alignment */}
            </div>

            <QuizInterface questions={questions} />
        </div>
    );
}
