"use client";

import { VocabItem } from "@/lib/types";
import { GlassCard } from "@/components/GlassCard";
import { Volume2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VocabCardProps {
    item: VocabItem;
    onClick?: () => void;
}

export function VocabCard({ item, onClick }: VocabCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const getCardStyle = (article?: string) => {
        if (!article) return "border-border hover:border-primary/50";
        if (article === "der") return "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10 hover:border-blue-500/50 hover:bg-blue-500/10";
        if (article === "die") return "border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-900/10 hover:border-red-500/50 hover:bg-red-500/10";
        if (article === "das") return "border-green-400/60 dark:border-green-600/60 bg-green-500/10 dark:bg-green-500/10 hover:border-green-500 hover:bg-green-500/20";
        return "border-border hover:border-primary/50";
    };

    const getArticleBadgeStyle = (article?: string) => {
        if (!article) return "text-muted-foreground bg-muted";
        if (article === "der") return "text-blue-600 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30";
        if (article === "die") return "text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30";
        if (article === "das") return "text-green-800 bg-green-100 dark:bg-green-500/20 dark:text-green-400 border-green-300 dark:border-green-500/40";
        return "text-muted-foreground bg-muted";
    }

    const handleSpeak = (e: React.MouseEvent) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(item.word);
        utterance.lang = "de-DE";
        window.speechSynthesis.speak(utterance);
    };

    return (
        <GlassCard
            className={cn(
                "flex flex-col h-48 relative overflow-hidden transition-all duration-300 group",
                onClick && "cursor-pointer hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]",
                getCardStyle(item.article)
            )}
            hoverEffect={false} // We handle our own hover effects
            onClick={onClick}
        >
            {/* Header / Article */}
            <div className="flex justify-between items-start w-full relative z-10">
                {item.article ? (
                    <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider shadow-sm",
                        getArticleBadgeStyle(item.article)
                    )}>
                        {item.article}
                    </span>
                ) : (
                    <div />
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // If we have a direct handleSpeak prop or logic, use it. 
                        // But reusing the existing one is fine.
                        handleSpeak(e);
                    }}
                    className="p-2 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Pronounce"
                >
                    <Volume2 size={18} />
                </button>
            </div>

            {/* Main Content - Absolute Center */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-xl font-medium text-foreground text-center leading-tight">
                    {item.word}
                </h3>
            </div>

            {/* Subtle background decoration */}
            <div className={cn(
                "absolute -bottom-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
                item.article === 'der' && "bg-blue-500",
                item.article === 'die' && "bg-red-500",
                item.article === 'das' && "bg-green-500",
                !item.article && "bg-primary"
            )} />
        </GlassCard>
    );
}
