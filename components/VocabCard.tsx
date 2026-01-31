"use client";

import { VocabItem } from "@/lib/types";
import { GlassCard } from "@/components/GlassCard";
import { Volume2, BookOpen, UserCircle, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VocabCardProps {
    item: VocabItem;
}

export function VocabCard({ item }: VocabCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Color coding for articles
    const getArticleColor = (article?: string) => {
        if (!article) return "text-gray-500";
        if (article === "der") return "text-blue-500 bg-blue-500/10 border-blue-500/20";
        if (article === "die") return "text-red-500 bg-red-500/10 border-red-500/20";
        if (article === "das") return "text-green-500 bg-green-500/10 border-green-500/20";
        return "text-gray-500";
    };

    const handleSpeak = (e: React.MouseEvent) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(item.word);
        utterance.lang = "de-DE";
        window.speechSynthesis.speak(utterance);
    };

    return (
        <GlassCard
            className="flex flex-col h-full relative overflow-hidden transition-all hover:scale-[1.02]"
            hoverEffect={true}
        >
            {/* Header / Article */}
            <div className="flex justify-between items-start mb-4">
                {item.article ? (
                    <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider",
                        getArticleColor(item.article)
                    )}>
                        {item.article}
                    </span>
                ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-muted text-muted-foreground border border-border">
                        Phrase
                    </span>
                )}

                <button
                    onClick={handleSpeak}
                    className="p-2 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-primary transition-colors"
                >
                    <Volume2 size={18} />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center text-center space-y-2 mb-6">
                <h3 className="text-2xl font-black text-foreground font-heading">
                    {item.word}
                </h3>
                {item.plural && (
                    <span className="text-sm text-muted-foreground font-medium">
                        (pl. {item.plural})
                    </span>
                )}
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-border to-transparent my-3" />
                <p className="text-lg text-muted-foreground font-medium">
                    {item.meaning_en}
                </p>
            </div>

            {/* Footer / Example */}
            {item.example_de && (
                <div className="mt-auto pt-4 border-t border-border/50">
                    <div className="bg-muted/30 rounded-xl p-3 text-sm space-y-1">
                        <p className="font-medium text-foreground italic">"{item.example_de}"</p>
                        <p className="text-muted-foreground text-xs">{item.example_en}</p>
                    </div>
                </div>
            )}
        </GlassCard>
    );
}
