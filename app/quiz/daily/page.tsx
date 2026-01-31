import QuizInterface from "@/components/QuizInterface";
import { generateDailyQuiz } from "@/lib/quiz";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next"
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
        <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8">
            {/* Aurora Background */}
            <div className="absolute inset-0 w-full h-full bg-background -z-20" />
            <div className="absolute inset-0 w-full h-full -z-10 opacity-30 blur-3xl saturate-150 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse lg:animate-aurora" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-2000" />
            </div>

            {/* Background Quiz Illustration */}
            <div className="absolute inset-0 w-full h-full -z-10 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-background/70 z-10" />
                <img
                    src="/quiz-illustration.png"
                    alt=""
                    className="w-full max-w-5xl h-auto object-contain opacity-40 transform scale-110 blur-[1px] sm:blur-0 sm:opacity-35"
                />
            </div>

            <div className="w-full max-w-2xl relative z-10">
                <div className="mb-8 flex justify-between items-center bg-white/40 backdrop-blur-md p-4 rounded-full border border-white/40 shadow-sm">
                    <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium flex items-center gap-1">
                        ← Exit
                    </Link>
                    <div className="flex items-center gap-2">
                        <img src="/quiz-illustration.png" alt="Quiz" className="w-8 h-8 object-contain" />
                        <h1 className="text-lg font-bold text-foreground">Daily German Quiz</h1>
                    </div>
                    <div className="w-16"></div>
                </div>

                <div className="glass-panel rounded-3xl p-1 sm:p-2 shadow-2xl">
                    <QuizInterface questions={questions} />
                </div>
            </div>
        </div>
    );
}
