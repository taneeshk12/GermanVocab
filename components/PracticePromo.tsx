"use client";

import { GlassCard } from "@/components/GlassCard";
import { BookOpen, Languages, MessageSquare, ArrowRight } from "lucide-react";

export function PracticePromo() {
    const practices = [
        {
            title: "Flashcards",
            description: "Master vocabulary with interactive cards. Listen to pronunciation and learn context.",
            icon: BookOpen,
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-500/10 to-cyan-500/10",
            href: "/a1/practice/flashcards" // Default to A1, can be dynamic if needed but kept simple for promo
        },
        {
            title: "Translation",
            description: "Test your recall by translating words and phrases between German and English.",
            icon: Languages,
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-500/10 to-pink-500/10",
            href: "/a1/practice/translation"
        },
        {
            title: "Sentence Builder",
            description: "Learn grammar naturally by arranging words to form correct German sentences.",
            icon: MessageSquare,
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-500/10 to-emerald-500/10",
            href: "/a1/practice/sentences"
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container px-6 mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-foreground mb-4">Practice Makes Perfect</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Go beyond simple memorization. Our interactive practice modes are designed to strengthen your active recall and sentence construction skills.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {practices.map((practice, idx) => {
                        const Icon = practice.icon;
                        return (
                            <GlassCard
                                key={idx}
                                className="group relative overflow-hidden p-8 flex flex-col items-center text-center h-full hover:scale-105 transition-transform duration-300"
                                hoverEffect={true}
                                href={practice.href}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${practice.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className={`relative mb-6 p-4 rounded-2xl bg-gradient-to-br ${practice.gradient} shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2`}>
                                    <Icon size={32} className="text-white" />
                                </div>

                                <h3 className="relative text-2xl font-bold mb-3 text-foreground">{practice.title}</h3>
                                <p className="relative text-muted-foreground mb-8 flex-grow">
                                    {practice.description}
                                </p>

                                <div className="relative inline-flex items-center text-sm font-bold text-primary group-hover:underline decoration-2 underline-offset-4">
                                    Start Practicing <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
