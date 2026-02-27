import Link from "next/link";
import { getAllVocab, getTopics } from "@/lib/vocab";
import { BookOpen, Languages, MessageSquare, ArrowRight, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
    title: "Practice | German Vocab",
    description: "Choose your level and start practising German with flashcards, translation exercises, and sentence formation.",
};

const LEVELS = [
    {
        id: "a1",
        label: "A1",
        sublabel: "Beginner",
        color: "from-blue-500 to-cyan-500",
        ring: "ring-blue-400/30",
        bg: "bg-blue-50 dark:bg-blue-950/30",
        badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
        desc: "Essential everyday vocabulary — greetings, colours, numbers, family and more.",
    },
    {
        id: "a2",
        label: "A2",
        sublabel: "Elementary",
        color: "from-purple-500 to-pink-500",
        ring: "ring-purple-400/30",
        bg: "bg-purple-50 dark:bg-purple-950/30",
        badge: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
        desc: "Expand into travel, food, work and simple conversations.",
    },
] as const;

const PRACTICE_TYPES = [
    { id: "flashcards", label: "Flashcards", icon: BookOpen, color: "text-blue-600" },
    { id: "translation", label: "Translation", icon: Languages, color: "text-purple-600" },
    { id: "sentences", label: "Sentences", icon: MessageSquare, color: "text-green-600" },
];

export default function PracticeLandingPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                title="Choose Your Level"
                description="Select a level to begin practising. Each mode uses only the words from that level."
                imageSrc="/practice-illustration.png"
            />

            <div className="container mx-auto px-4 sm:px-6 max-w-4xl pb-24 -mt-10 relative z-20">
                <div className="grid gap-6 sm:grid-cols-2">
                    {LEVELS.map((lvl) => {
                        const words = getAllVocab(lvl.label);
                        const topics = getTopics(lvl.label);

                        return (
                            <div
                                key={lvl.id}
                                className={`rounded-3xl border shadow-xl overflow-hidden ${lvl.bg}`}
                            >
                                {/* Level header */}
                                <div className={`bg-gradient-to-br ${lvl.color} p-6 text-white`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-4xl font-black tracking-tight">{lvl.label}</span>
                                        <span className="text-sm font-semibold bg-white/20 rounded-full px-3 py-1">
                                            {lvl.sublabel}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/80 leading-relaxed">{lvl.desc}</p>

                                    {/* stat pills */}
                                    <div className="flex gap-2 mt-4 flex-wrap">
                                        <span className="text-xs font-bold bg-white/20 rounded-full px-3 py-1">
                                            {words.length} words
                                        </span>
                                        <span className="text-xs font-bold bg-white/20 rounded-full px-3 py-1">
                                            {topics.length} topics
                                        </span>
                                    </div>
                                </div>

                                {/* Practice-type links */}
                                <div className="p-4 space-y-2">
                                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest px-1 mb-3">
                                        Practice modes
                                    </p>
                                    {PRACTICE_TYPES.map((pt) => {
                                        const Icon = pt.icon;
                                        return (
                                            <Link
                                                key={pt.id}
                                                href={`/${lvl.id}/practice/${pt.id}`}
                                                className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-card border hover:border-primary/40 hover:bg-primary/5 transition-all group"
                                            >
                                                <span className="flex items-center gap-3">
                                                    <span className={`p-2 rounded-xl bg-secondary ${pt.color}`}>
                                                        <Icon size={16} />
                                                    </span>
                                                    <span className="font-semibold text-sm">{pt.label}</span>
                                                </span>
                                                <ChevronRight
                                                    size={16}
                                                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                                                />
                                            </Link>
                                        );
                                    })}

                                    {/* Go to full level page */}
                                    <Link
                                        href={`/${lvl.id}`}
                                        className="flex items-center justify-center gap-2 mt-3 py-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Browse {lvl.label} vocabulary <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
