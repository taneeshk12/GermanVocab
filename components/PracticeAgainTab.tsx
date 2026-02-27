"use client";

import { useEffect, useState, useCallback } from "react";
import { VocabItem } from "@/lib/types";
import { getAllVocab } from "@/lib/vocab";
import {
    getPracticeAgainWords,
    unmarkWordForPractice,
    markWordLearned,
} from "@/lib/supabase-integration";
import {
    RotateCcw,
    CheckCircle2,
    Trash2,
    Volume2,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Link from "next/link";

interface PracticeWord extends VocabItem {
    times_practiced: number;
    correct_count: number;
    last_practiced_at: string | null;
}

export function PracticeAgainTab() {
    const [words, setWords] = useState<PracticeWord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
    const { speak } = useTextToSpeech();

    const load = useCallback(async () => {
        setIsLoading(true);
        try {
            const dbRows = await getPracticeAgainWords();
            if (dbRows.length === 0) {
                setWords([]);
                return;
            }

            // Resolve word IDs against local vocab (all available levels)
            const allVocab = (["A1", "A2"] as const).flatMap((lvl) =>
                getAllVocab(lvl)
            ) as VocabItem[];

            const matched: PracticeWord[] = [];

            for (const row of dbRows) {
                const vocab = allVocab.find((v) => v.id === row.word_id);
                if (vocab) {
                    matched.push({
                        ...vocab,
                        times_practiced: row.times_practiced,
                        correct_count: row.correct_count,
                        last_practiced_at: row.last_practiced_at,
                    });
                }
            }

            setWords(matched);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const withPending = (id: string, fn: () => Promise<void>) => async () => {
        setPendingIds((s) => new Set(s).add(id));
        try {
            await fn();
            setWords((prev) => prev.filter((w) => w.id !== id));
        } finally {
            setPendingIds((s) => {
                const next = new Set(s);
                next.delete(id);
                return next;
            });
        }
    };

    const handleRemove = (word: PracticeWord) =>
        withPending(word.id, () => unmarkWordForPractice(word.id))();

    const handleMarkLearned = (word: PracticeWord) =>
        withPending(word.id, async () => {
            await unmarkWordForPractice(word.id);
            await markWordLearned(word.id, word.level, word.topic);
        })();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
        );
    }

    if (words.length === 0) {
        return (
            <div className="max-w-lg mx-auto text-center py-16">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">All Clear! 🎉</h3>
                <p className="text-muted-foreground mb-6">
                    You have no words flagged for extra practice. Keep quizzing to
                    discover any gaps.
                </p>
                <Link
                    href="/learned-words"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                >
                    <RotateCcw size={16} /> Take a Quiz
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header row */}
            <div className="flex items-center justify-between mb-5 px-1">
                <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">{words.length}</span>{" "}
                    {words.length === 1 ? "word" : "words"} flagged for practice
                </p>
                <span className="text-xs text-muted-foreground italic">
                    Tap a word to see its meaning
                </span>
            </div>

            <div className="space-y-3">
                {words.map((word) => {
                    const isPending = pendingIds.has(word.id);
                    const isOpen = expandedId === word.id;
                    const germanWord = word.article
                        ? `${word.article} ${word.word}`
                        : word.word;

                    return (
                        <div
                            key={word.id}
                            className={`bg-card border rounded-2xl overflow-hidden shadow-sm transition-all ${isPending ? "opacity-50 pointer-events-none" : ""
                                }`}
                        >
                            {/* Main row — click to expand */}
                            <button
                                onClick={() => setExpandedId(isOpen ? null : word.id)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/40 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                        <RotateCcw size={16} className="text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">{germanWord}</p>
                                        {!isOpen && (
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                Tap to reveal meaning
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Listen button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speak(word.word);
                                        }}
                                        className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors"
                                        title="Listen"
                                    >
                                        <Volume2 size={16} />
                                    </button>
                                    {isOpen ? (
                                        <ChevronUp size={18} className="text-muted-foreground" />
                                    ) : (
                                        <ChevronDown size={18} className="text-muted-foreground" />
                                    )}
                                </div>
                            </button>

                            {/* Expanded detail */}
                            {isOpen && (
                                <div className="border-t px-4 pb-4 pt-3 bg-muted/20 animate-in slide-in-from-top-1 fade-in duration-150">
                                    {/* Meaning */}
                                    <div className="mb-3">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                            English meaning
                                        </p>
                                        <p className="text-lg font-semibold text-primary">
                                            {word.meaning_en}
                                        </p>
                                    </div>

                                    {/* Example */}
                                    {word.example_de && (
                                        <div className="mb-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                                Example
                                            </p>
                                            <p className="text-sm italic text-foreground">
                                                {word.example_de}
                                            </p>
                                            {word.example_en && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {word.example_en}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Action buttons */}
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => handleMarkLearned(word)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-all active:scale-95 shadow-sm"
                                        >
                                            <CheckCircle2 size={15} />
                                            I Know It
                                        </button>
                                        <button
                                            onClick={() => handleRemove(word)}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-bold transition-all active:scale-95"
                                            title="Remove from practice list"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-center text-muted-foreground mt-2">
                                        "I Know It" moves the word to your Learned list
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
