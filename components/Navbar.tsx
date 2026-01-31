"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Trophy, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { getProgress, UserProgress } from "@/lib/progress";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const pathname = usePathname();

    // Determine current level from pathname (default to a1)
    const currentLevel = pathname?.split('/')[1]?.match(/^(a1|a2|b1|b2)$/i) ? pathname.split('/')[1] : 'a1';

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
        <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl glass-panel border border-white/40 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-36 h-10 transition-transform group-hover:scale-105">
                        <Image
                            src="/app_logo.svg"
                            alt="LangFlow Logo"
                            fill
                            className="object-contain drop-shadow-md"
                        />
                    </div>
                </Link>

                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full p-1 border border-white/20 mr-2">
                        <NavLink href="/a1">Level A1</NavLink>
                        <NavLink href="/a2">Level A2</NavLink>
                        <NavLink href={`/${currentLevel}/practice`}>Practice</NavLink>
                        <NavLink href="/quiz/daily">Daily Quiz</NavLink>
                    </div>

                    {progress && (
                        <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-border/50">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 font-bold border border-amber-500/20" title="Current Streak">
                                <Flame size={16} className="fill-amber-500" />
                                <span>{progress.streak}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20" title="Total XP">
                                <Trophy size={16} className="fill-primary/20" />
                                <span>{progress.xp}</span>
                            </div>
                        </div>
                    )}

                    {!progress && (
                        <Link href="/a1" className="hidden sm:flex glass-button px-5 py-2 rounded-full text-sm font-semibold items-center gap-2">
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/50 transition-all hover:shadow-sm"
        >
            {children}
        </Link>
    );
}
