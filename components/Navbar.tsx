"use client";

import Image from "next/image";
import Link from "next/link";
import { Trophy, Flame, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserProfile, useAuth } from "./UserProfile";
import { getUserStats } from "@/lib/api/progress";

interface UserStats {
    total_xp: number;
    current_streak: number;
}

export function Navbar() {
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user } = useAuth();

    // Determine current level from pathname (default to a1)
    const currentLevel = pathname?.split('/')[1]?.match(/^(a1|a2|b1|b2)$/i) ? pathname.split('/')[1] : 'a1';

    useEffect(() => {
        async function loadStats() {
            if (user) {
                setLoading(true);
                const userStats = await getUserStats(user.id);
                if (userStats) {
                    setStats({
                        total_xp: userStats.total_xp,
                        current_streak: userStats.current_streak
                    });
                }
                setLoading(false);
            } else {
                setStats(null);
                setLoading(false);
            }
        }
        
        loadStats();

        // Listen for updates
        const handleUpdate = () => {
            loadStats();
        };
        window.addEventListener('stats-updated', handleUpdate);
        return () => window.removeEventListener('stats-updated', handleUpdate);
    }, [user]);

    return (
        <nav className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 rounded-xl sm:rounded-2xl glass-panel border border-white/40 shadow-lg transition-all duration-300">
            <div className="container mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
                <Link href="/" className="flex items-center group shrink-0" onClick={() => setIsMenuOpen(false)}>
                    <div className="relative w-28 h-8 sm:w-36 sm:h-10 transition-transform group-hover:scale-105">
                        <Image
                            src="/app_logo.svg"
                            alt="LangFlow Logo"
                            fill
                            className="object-contain drop-shadow-md"
                            priority
                        />
                    </div>
                </Link>

                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 bg-secondary/50 rounded-full p-1 border border-white/20 mr-2">
                        <NavLink href="/levels">Levels</NavLink>
                        <NavLink href={`/${currentLevel}/practice`}>Practice</NavLink>
                        <NavLink href="/quiz/daily">Daily Quiz</NavLink>
                        <NavLink href="/learned-words">Review Learned</NavLink>
                        <Link 
                            href="/blog" 
                            className="px-4 py-2 text-sm font-medium rounded-full hover:bg-white/50 hover:text-primary transition-all"
                        >
                            Blog
                        </Link>
                    </div>

                    {/* Stats Section - Responsive */}
                    {user && !loading && stats && (
                        <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-4 border-l border-border/50">
                            <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-amber-500/10 text-amber-600 font-bold border border-amber-500/20" title="Current Streak">
                                <Flame size={14} className="fill-amber-500 sm:w-4 sm:h-4" />
                                <span className="text-xs sm:text-sm">{stats.current_streak}</span>
                            </div>
                            <div className="hidden xs:flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20" title="Total XP">
                                <Trophy size={14} className="fill-primary/20 sm:w-4 sm:h-4" />
                                <span className="text-xs sm:text-sm">{stats.total_xp}</span>
                            </div>
                        </div>
                    )}

                    {/* User Profile */}
                    <div className="pl-1.5 sm:pl-4 border-l border-border/50">
                        <UserProfile />
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="lg:hidden p-1.5 sm:p-2 ml-1 rounded-xl hover:bg-secondary/80 active:bg-secondary transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay - Improved Responsive Design */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="lg:hidden fixed inset-0 bg-white backdrop-blur-sm -z-10"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    
                    {/* Menu Panel */}
                    <div className="lg:hidden absolute top-16 sm:top-20 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl p-3 sm:p-4 shadow-2xl mx-0 flex flex-col gap-1 sm:gap-2 animate-in slide-in-from-top-5 duration-200">
                        <MobileNavLink href="/levels" onClick={() => setIsMenuOpen(false)}>Levels</MobileNavLink>
                        <MobileNavLink href={`/${currentLevel}/practice`} onClick={() => setIsMenuOpen(false)}>Practice</MobileNavLink>
                        <MobileNavLink href="/quiz/daily" onClick={() => setIsMenuOpen(false)}>Daily Quiz</MobileNavLink>
                        <MobileNavLink href="/learned-words" onClick={() => setIsMenuOpen(false)}>Review Learned</MobileNavLink>
                        
                        <div className="border-t border-border/50 pt-2 mt-2">
                            <Link 
                                href="/profile" 
                                className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl hover:bg-primary/5 active:bg-primary/10 hover:text-primary transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Profile & Stats
                            </Link>
                            <Link 
                                href="/blog" 
                                className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl hover:bg-primary/5 active:bg-primary/10 hover:text-primary transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link 
            href={href} 
            className="px-4 py-2 text-sm font-medium rounded-full hover:bg-white/50 hover:text-primary transition-all"
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
    return (
        <Link 
            href={href} 
            className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl hover:bg-primary/5 active:bg-primary/10 hover:text-primary transition-all"
            onClick={onClick}
        >
            {children}
        </Link>
    );
}
