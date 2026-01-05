"use client";

import Link from "next/link";
import { BookOpen, Trophy, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { getProgress, UserProgress } from "@/lib/progress";

export function Navbar() {
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        // Initial load
        setProgress(getProgress());

        // Listen for updates
        const handleUpdate = () => {
            setProgress(getProgress());
        };
        window.addEventListener('progress-updated', handleUpdate);
        return () => window.removeEventListener('progress-updated', handleUpdate);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                        <BookOpen size={18} />
                    </div>
                    <span>LinguFlow</span>
                </Link>

                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/a1" className="hover:text-primary transition-colors">Learn</Link>
                    <Link href="/quiz/daily" className="hover:text-primary transition-colors">Daily Quiz</Link>
                    <Link href="/a1/practice" className="hidden sm:block hover:text-primary transition-colors">Practice</Link>

                    {progress && (
                        <div className="flex items-center gap-4 border-l pl-4 border-border/50">
                            <div className="flex items-center gap-1.5 text-amber-500 font-bold" title="Current Streak">
                                <Flame size={18} className={progress.streak > 0 ? "fill-amber-500" : ""} />
                                <span>{progress.streak}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-primary font-bold" title="Total XP">
                                <Trophy size={18} />
                                <span>{progress.xp}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
