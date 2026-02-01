"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { ChevronRight, Book, Sparkles, Hash, Clock, MessageCircle, Users, Apple, Home as HomeIcon, Briefcase, Cat, Heart, Shirt, CloudSun, Car, CalendarDays, Palette, Globe, Map as MapIcon, Ruler, Zap, Activity, ShoppingBag, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { getWordsMasteredStatus } from "@/lib/word-progress";
import { getAllVocab } from "@/lib/vocab";
import { Level } from "@/lib/types";

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
    if (t.includes('health') || t.includes('fitness')) return { icon: <Activity size={32} className="text-red-500" />, color: "from-red-400 to-rose-500", shadow: "shadow-red-500/20" };
    if (t.includes('shop') || t.includes('market') || t.includes('store')) return { icon: <ShoppingBag size={32} className="text-violet-500" />, color: "from-violet-400 to-fuchsia-500", shadow: "shadow-violet-500/20" };
    if (t.includes('honoured') || t.includes('dear') || t.includes('letter')) return { icon: <Mail size={32} className="text-slate-600" />, color: "from-slate-400 to-gray-500", shadow: "shadow-slate-500/20" };

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

export function TopicsGrid({ topics, level }: TopicsGridProps) {
    const [progressMap, setProgressMap] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        async function fetchAllProgress() {
            const vocabulary = getAllVocab(level.toUpperCase() as Level);
            const wordIds = vocabulary.map(v => v.id);
            console.log(`TopicsGrid: Fetching progress for ${wordIds.length} words in level ${level}`);
            console.log(`TopicsGrid: First 10 word IDs:`, wordIds.slice(0, 10));
            
            const statusMap = await getWordsMasteredStatus(wordIds);
            console.log(`TopicsGrid: Received status for ${statusMap.size} words`);
            console.log(`TopicsGrid: Status map entries:`, Array.from(statusMap.entries()).slice(0, 10));
            
            const newProgressMap = new Map<string, number>();
            
            topics.forEach(topic => {
                const topicWords = vocabulary.filter(v => v.topic === topic.name);
                const topicWordIds = topicWords.map(w => w.id);
                const masteredCount = topicWords.filter(v => {
                    const isLearned = statusMap.get(v.id);
                    if (isLearned) {
                        console.log(`TopicsGrid: Found learned word in ${topic.name}: ${v.id} (${v.word})`);
                    }
                    return isLearned;
                }).length;
                const percentage = topicWords.length > 0 
                  ? Math.round((masteredCount / topicWords.length) * 100) 
                  : 0;
                console.log(`TopicsGrid: ${topic.name} - ${masteredCount}/${topicWords.length} learned (${percentage}%)`);
                console.log(`TopicsGrid: ${topic.name} word IDs sample:`, topicWordIds.slice(0, 5));
                newProgressMap.set(topic.name, percentage);
            });
            
            setProgressMap(newProgressMap);
        }
        
        fetchAllProgress();
    }, [topics, level]);

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
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
            {topics.map((topic) => {
                const visual = getTopicVisual(topic.name);
                return (
                    <motion.div 
                        key={topic.name} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <GlassCard
                            href={`/${level}/${topic.slug}`}
                            className="flex flex-col h-full p-0 overflow-hidden group hover:ring-2 hover:ring-primary/20 transition-all duration-300"
                            hoverEffect={true}
                        >
                            {/* Card Header with Gradient Background */}
                            <div className={`relative h-24 bg-linear-to-r ${visual.color} overflow-hidden`}>
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

                            {/* Card Content */}
                            <div className="p-5 sm:p-6 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                        {topic.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                                        <Book size={14} />
                                        {topic.count} words
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                                    <div className="flex flex-col flex-1 mr-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Progress</span>
                                            <span className="text-[10px] font-bold text-primary">{progressMap.get(topic.name) || 0}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-primary transition-all duration-1000 ease-out" 
                                                style={{ width: `${progressMap.get(topic.name) || 0}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
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
