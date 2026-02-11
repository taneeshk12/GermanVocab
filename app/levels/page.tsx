"use client";

import Link from "next/link";
import { BookOpen, Zap, TrendingUp, Award, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const levels = [
  {
    level: "A1",
    title: "Beginner",
    description: "Start your German journey with basic vocabulary and everyday expressions",
    words: 965,
    topics: "Numbers, Colors, Family, Food, Greetings",
    color: "from-green-500 to-emerald-600",
    shadowColor: "shadow-green-500/25",
    icon: BookOpen,
    cefr: "Can understand and use familiar everyday expressions and very basic phrases."
  },
  {
    level: "A2",
    title: "Elementary",
    description: "Build on basics with more vocabulary and simple sentence structures",
    words: 1842,
    topics: "Shopping, Weather, Body Parts, School, Travel",
    color: "from-blue-500 to-cyan-600",
    shadowColor: "shadow-blue-500/25",
    icon: Zap,
    cefr: "Can understand frequently used expressions. Can describe matters of immediate need."
  },
  {
    level: "B1",
    title: "Intermediate",
    description: "Express yourself with confidence on familiar topics and situations",
    words: 1357,
    topics: "Work, Hobbies, Technology, Health, Environment",
    color: "from-orange-500 to-amber-600",
    shadowColor: "shadow-orange-500/25",
    icon: TrendingUp,
    cefr: "Can describe experiences, dreams, hopes and ambitions with some confidence."
  },
  {
    level: "B2",
    title: "Upper Intermediate",
    description: "Master complex topics and express yourself fluently in German",
    words: 886,
    topics: "Business, Politics, Culture, Abstract Concepts",
    color: "from-purple-500 to-pink-600",
    shadowColor: "shadow-purple-500/25",
    icon: Award,
    cefr: "Can interact with native speakers with fluency and understand complex texts."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function LevelsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Aurora Background */}
      <div className="absolute inset-0 w-full h-full -z-10 opacity-30 blur-3xl saturate-150 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse lg:animate-aurora" />
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000 lg:animate-aurora"
          style={{ animationDirection: "reverse" }}
        />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-2000" />
      </div>

      {/* Grid Background Pattern */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="container mx-auto px-4 py-12 sm:py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-primary mb-6 shadow-sm"
          >
            <Star size={14} className="fill-primary text-primary" />
            <span>Structured Learning Path</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-foreground"
          >
            Choose Your <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-blue-600 animate-gradient">
              Proficiency Level
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Select your starting point based on the Common European Framework of Reference (CEFR). Not sure? Start with A1.
          </motion.p>
        </div>

        {/* Level Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {levels.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.level} variants={itemVariants}>
                <Link
                  href={`/${item.level.toLowerCase()}`}
                  className="group relative block h-full"
                >
                  <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${item.color} opacity-30 blur-sm group-hover:opacity-60 transition duration-500`} />

                  <div className="relative h-full bg-card/50 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-6 sm:p-8 overflow-hidden transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                    {/* Background decoration */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 blur-3xl rounded-full transform translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity`} />

                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-4xl font-black tracking-tight text-foreground">
                            {item.level}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.color} shadow-lg shadow-black/5`}>
                            {item.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                          <BookOpen size={16} />
                          {item.words} Words
                        </div>
                      </div>

                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/80 mb-6 text-base leading-relaxed h-[3rem]">
                      {item.description}
                    </p>

                    {/* Stats/Preview */}
                    <div className="space-y-3 mb-8">
                      <div className="p-3 rounded-xl bg-background/50 border border-border/50 backdrop-blur-sm">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          Key Topics
                        </div>
                        <div className="text-sm text-foreground font-medium truncate">
                          {item.topics}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-background/50 border border-border/50 backdrop-blur-sm">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          CEFR Goal
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {item.cefr}
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className={`text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                        Start Learning
                      </span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${item.color} text-white transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 shadow-lg`}>
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-[2px] rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
            <div className="bg-card/80 backdrop-blur-md rounded-2xl px-6 py-4 sm:px-8 sm:py-6 border border-white/10">
              <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-0 sm:mr-4 inline-block">
                Not sure where to start? We recommend beginning with <strong className="text-foreground">Level A1</strong>.
              </p>
              <Link
                href="/a1"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                Start A1 Now
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
