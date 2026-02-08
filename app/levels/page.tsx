import Link from "next/link";
import { BookOpen, Zap, TrendingUp, Award } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose Your Level | Learn German Daily",
  description: "Select your German proficiency level from A1 to B2 and start learning vocabulary tailored to your skill level.",
};

const levels = [
  {
    level: "A1",
    title: "Beginner",
    description: "Start your German journey with basic vocabulary and everyday expressions",
    words: 965,
    topics: "Numbers, Colors, Family, Food, Greetings",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    icon: BookOpen,
    cefr: "Can understand and use familiar everyday expressions and very basic phrases. Can introduce themselves and others."
  },
  {
    level: "A2",
    title: "Elementary",
    description: "Build on basics with more vocabulary and simple sentence structures",
    words: 1842,
    topics: "Shopping, Weather, Body Parts, School, Travel",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    icon: Zap,
    cefr: "Can understand frequently used expressions. Can describe matters of immediate need and personal background."
  },
  {
    level: "B1",
    title: "Intermediate",
    description: "Express yourself with confidence on familiar topics and situations",
    words: 1357,
    topics: "Work, Hobbies, Technology, Health, Environment",
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    icon: TrendingUp,
    cefr: "Can deal with most travel situations. Can describe experiences, dreams, hopes and ambitions with some confidence."
  },
  {
    level: "B2",
    title: "Upper Intermediate",
    description: "Master complex topics and express yourself fluently in German",
    words: 886,
    topics: "Business, Politics, Culture, Abstract Concepts, Academic",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    icon: Award,
    cefr: "Can interact with native speakers with fluency. Can understand complex texts and express ideas clearly on a wide range of subjects."
  }
];

export default function LevelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Choose Your Level
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your German proficiency level based on the Common European Framework of Reference (CEFR)
          </p>
        </div>

        {/* Level Cards */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {levels.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.level}
                href={`/${item.level.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                style={{
                  borderColor: item.borderColor.includes('dark') ? undefined : item.borderColor
                }}
              >
                <div className={`${item.bgColor} p-6 sm:p-8`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black mb-2">
                        Level {item.level}
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${item.color}`}>
                        {item.title}
                      </div>
                    </div>
                    <div className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 mb-6 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>

                  {/* CEFR Description */}
                  <div className="bg-background/50 rounded-xl p-4 mb-4 border border-border/50">
                    <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                      <strong className="text-foreground">CEFR:</strong> {item.cefr}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-background/80 rounded-xl p-3 border border-border/50">
                      <div className="text-xl sm:text-2xl font-bold text-foreground">
                        {item.words}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Words
                      </div>
                    </div>
                    <div className="bg-background/80 rounded-xl p-3 border border-border/50">
                      <div className="text-xl sm:text-2xl font-bold text-foreground">
                        {item.topics.split(",").length}+
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Topics
                      </div>
                    </div>
                  </div>

                  {/* Topics Preview */}
                  <div className="bg-background/80 rounded-xl p-3 border border-border/50">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Topics Include
                    </div>
                    <div className="text-sm text-foreground">
                      {item.topics}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 sm:mt-16 text-center max-w-3xl mx-auto">
          <div className="bg-card border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Not Sure Which Level to Choose?
            </h2>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Start with <strong>Level A1</strong> if you&apos;re a complete beginner. You can always move between levels as you progress!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/a1"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Start with A1
              </Link>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl border-2 border-border text-foreground font-medium hover:bg-accent transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
