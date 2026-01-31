"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { ChevronRight, Book, Star, Trophy, Sparkles, Hash, Clock, MessageCircle, Users, Apple, Home as HomeIcon, Briefcase, Cat, Heart, Shirt, CloudSun, Car, CalendarDays, Palette, Globe, Map as MapIcon, Ruler, Zap } from "lucide-react";

type TopicData = {
    name: string;
    count: number;
    slug: string;
};

interface TopicsGridProps {
    topics: TopicData[];
    level: string;
}

// Helper to get visual for a topic (moved from page.tsx and enhanced)
function getTopicVisual(topic: string) {
    const t = topic.toLowerCase();

    // Specific Mappings
    if (t.includes('calendar') || t.includes('month') || t.includes('date')) return { icon: <CalendarDays size={32} className="text-orange-500" />, color: "from-orange-400 to-red-500", shadow: "shadow-orange-500/20" };
    if (t.includes('color')) return { icon: <Palette size={32} className="text-pink-500" />, color: "from-fuchsia-500 to-pink-600", shadow: "shadow-fuchsia-500/20" };
    if (t.includes('country') || t.includes('nationality')) return { icon: <Globe size={32} className="text-teal-500" />, color: "from-teal-400 to-emerald-600", shadow: "shadow-teal-500/20" };
    if (t.includes('direction') || t.includes('location')) return { icon: <MapIcon size={32} className="text-indigo-500" />, color: "from-indigo-400 to-violet-600", shadow: "shadow-indigo-500/20" };
    if (t.includes('house') || t.includes('home') || t.includes('apartment')) return { icon: <HomeIcon size={32} className="text-cyan-600" />, color: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/20" }; // Changed from purple
    if (t.includes('measure') || t.includes('size')) return { icon: <Ruler size={32} className="text-lime-600" />, color: "from-lime-500 to-green-600", shadow: "shadow-lime-500/20" };
    if (t.includes('verb') || t.includes('action')) return { icon: <Zap size={32} className="text-yellow-500" />, color: "from-yellow-400 to-orange-500", shadow: "shadow-yellow-500/20" };

    // Existing Mappings (Adjusted if needed)
    if (t.includes('number')) return { icon: <Hash size={32} className="text-blue-500" />, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" };
    if (t.includes('time') || t.includes('day') || t.includes('week')) return { icon: <Clock size={32} className="text-amber-500" />, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" };
    if (t.includes('basic') || t.includes('greeting')) return { icon: <MessageCircle size={32} className="text-emerald-500" />, color: "from-emerald-500 to-green-500", shadow: "shadow-emerald-500/20" };
    if (t.includes('family') || t.includes('people')) return { icon: <Users size={32} className="text-rose-500" />, color: "from-rose-500 to-pink-500", shadow: "shadow-rose-500/20" };
    if (t.includes('food') || t.includes('drink')) return { icon: <Apple size={32} className="text-red-500" />, color: "from-red-500 to-orange-500", shadow: "shadow-red-500/20" };
    if (t.includes('work') || t.includes('school')) return { icon: <Briefcase size={32} className="text-slate-500" />, color: "from-slate-500 to-gray-500", shadow: "shadow-slate-500/20" };
    if (t.includes('animal')) return { icon: <Cat size={32} className="text-yellow-600" />, color: "from-yellow-500 to-amber-700", shadow: "shadow-yellow-600/20" };
    if (t.includes('body')) return { icon: <Heart size={32} className="text-pink-500" />, color: "from-pink-400 to-rose-600", shadow: "shadow-pink-500/20" };
    if (t.includes('clothes')) return { icon: <Shirt size={32} className="text-violet-500" />, color: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/20" };
    if (t.includes('weather')) return { icon: <CloudSun size={32} className="text-sky-500" />, color: "from-sky-400 to-blue-500", shadow: "shadow-sky-500/20" };
    if (t.includes('transport')) return { icon: <Car size={32} className="text-indigo-500" />, color: "from-indigo-500 to-blue-600", shadow: "shadow-indigo-500/20" };

    // Default
    return { icon: <Book size={32} className="text-primary" />, color: "from-primary to-purple-600", shadow: "shadow-primary/20" };
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function TopicsGrid({ topics, level }: TopicsGridProps) {
    if (topics.length === 0) {
        return (
            <div className="col-span-full py-20 text-center">
                <div className="inline-flex p-6 rounded-full bg-muted mb-4">
                    <Book size={40} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Topics Found</h3>
                <p className="text-muted-foreground">Check back later for content updates.</p>
            </div>
        );
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {topics.map((topic, index) => {
                const visual = getTopicVisual(topic.name);
                return (
                    <motion.div key={topic.name} variants={item}>
                        <GlassCard
                            href={`/${level}/${topic.slug}`}
                            className="flex flex-col h-full p-0 overflow-hidden group hover:ring-2 hover:ring-primary/20 transition-all duration-300"
                            hoverEffect={true}
                        >
                            {/* Card Header with Gradient Background */}
                            <div className={`relative h-24 bg-gradient-to-r ${visual.color} overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute -bottom-6 right-4 rotate-12 opacity-20 scale-150 grayscale group-hover:grayscale-0 transition-all duration-500">
                                    {visual.icon}
                                </div>

                                <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                                    <Sparkles size={10} />
                                    <span>A1</span>
                                </div>

                            </div>

                            <div className="absolute top-16 left-6">
                                <div className={`w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-4xl border-4 border-white transform group-hover:-translate-y-1 transition-transform duration-300 ${visual.shadow}`}>
                                    {visual.icon}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="pt-10 px-6 pb-6 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors capitalize line-clamp-1">{topic.name}</h3>
                                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2 mt-1">
                                        <Book size={14} />
                                        {topic.count} words
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Progress</span>
                                        <div className="h-1.5 w-24 bg-muted rounded-full mt-1 overflow-hidden">
                                            <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                                        </div>
                                    </div>

                                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                                        <ChevronRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
