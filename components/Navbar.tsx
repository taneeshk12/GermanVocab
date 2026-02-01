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
        <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl glass-panel border border-white/40 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
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
                    <div className="hidden lg:flex items-center gap-1 bg-secondary/50 rounded-full p-1 border border-white/20 mr-2">
                        <NavLink href="/a1">Level A1</NavLink>
                        <NavLink href="/a2">Level A2</NavLink>
                        <NavLink href={`/${currentLevel}/practice`}>Practice</NavLink>
                        <NavLink href="/quiz/daily">Daily Quiz</NavLink>
                        <NavLink href="/learned-words">Review Learned</NavLink>
                        <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors font-medium relative group">
                          <span className="relative z-10">Blog</span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                    </div>

                    {user && !loading && stats && (
                        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 sm:border-l border-border/50">
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 font-bold border border-amber-500/20" title="Current Streak">
                                <Flame size={14} className="fill-amber-500 sm:w-4 sm:h-4" />
                                <span className="text-sm sm:text-base">{stats.current_streak}</span>
                            </div>
                            <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20" title="Total XP">
                                <Trophy size={14} className="fill-primary/20 sm:w-4 sm:h-4" />
                                <span className="text-sm sm:text-base">{stats.total_xp}</span>
                            </div>
                        </div>
                    )}

                    {/* User Profile with Login/Logout */}
                    <div className="pl-2 sm:pl-4 sm:border-l border-border/50">
                        <UserProfile />
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="lg:hidden p-2 ml-1 rounded-xl hover:bg-secondary/80 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-2xl mx-0 flex flex-col gap-2 animate-in slide-in-from-top-5 duration-200">
                    <MobileNavLink href="/a1" onClick={() => setIsMenuOpen(false)}>Level A1</MobileNavLink>
                    <MobileNavLink href="/a2" onClick={() => setIsMenuOpen(false)}>Level A2</MobileNavLink>
                    <MobileNavLink href={`/${currentLevel}/practice`} onClick={() => setIsMenuOpen(false)}>Practice</MobileNavLink>
                    <MobileNavLink href="/quiz/daily" onClick={() => setIsMenuOpen(false)}>Daily Quiz</MobileNavLink>
                    <MobileNavLink href="/learned-words" onClick={() => setIsMenuOpen(false)}>Review Learned</MobileNavLink>
                    <div className="border-t border-border/50 pt-2 mt-2">
                        <Link 
                            href="/profile" 
                            className="flex items-center gap-2 px-6 py-4 text-base font-semibold rounded-xl hover:bg-primary/5 hover:text-primary transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Profile & Stats
                        </Link>
                        <Link 
                            href="/blog" 
                            className="text-muted-foreground hover:text-primary transition-colors font-medium relative group"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blog
                        </Link>
                    </div>
                </div>
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
            onClick={onClick}
            className="px-6 py-4 text-base font-semibold rounded-xl hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-between group"
        >
            {children}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                →
            </div>
        </Link>
    );
}
