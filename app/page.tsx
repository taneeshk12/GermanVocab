import Link from "next/link";
import { ArrowRight, Book, Medal, Sparkles, Trophy, Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
//c
export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
        {/* Decorative Background Elements (Gradient Bubbles) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Top Right - Yellow/Pink -> Primary/Secondary for theme consistency */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 animate-pulse duration-[5000ms]" />

          {/* Bottom Left - Blue/Cyan -> Accent */}
          <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[100px] opacity-40 animate-pulse delay-1000 duration-[7000ms]" />

          {/* Center/Top - Purple -> Primary */}
          <div className="absolute -top-40 left-1/3 w-72 h-72 bg-primary/30 rounded-full blur-[80px] opacity-50" />

          {/* Bottom Right - Pink -> Secondary */}
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/80 rounded-full blur-[120px] opacity-30" />
        </div>

        <div className="container px-6 mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-primary mb-8 shadow-sm transition-transform hover:scale-105 cursor-default">
            <Star size={14} className="fill-primary text-primary" />
            <span>The #1 Open Source German Learning App</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black tracking-tight mb-8 text-foreground drop-shadow-sm leading-[1.1]">
            Master German <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600">
              With Confidence
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Learn faster with our scientifically proven spaced-repetition vocabulary cards.
            <span className="block mt-2 text-primary font-bold">Free. Forever.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/a1"
              className="h-14 px-8 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/25 ring-4 ring-primary/10"
            >
              Start Learning A1 <ArrowRight size={20} />
            </Link>
            <Link
              href="/a1/practice"
              className="h-14 px-8 rounded-full bg-card text-foreground font-bold text-lg flex items-center gap-2 border border-border hover:border-primary/50 hover:bg-muted/50 hover:text-primary transition-all shadow-lg shadow-black/5"
            >
              Practice Mode
            </Link>
          </div>

          {/* Trust/Social Proof */}
          <div className="mt-16 flex items-center justify-center gap-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-border shadow-sm">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Level</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-bold">A1</span>
              <span className="text-sm text-foreground font-medium">965+ Words</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="container px-6 mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-foreground mb-4">Why Learn German With Us?</h2>
            <p className="text-muted-foreground text-lg">The most effective way to build your vocabulary</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <Feature
              icon={<BookOpen className="w-10 h-10 text-primary mb-2" />}
              title="965+ A1 Words"
              desc="Comprehensive vocabulary covering all essential German basics and everyday topics."
            />
            <Feature
              icon={<Medal className="w-10 h-10 text-blue-500 mb-2" />}
              title="Interactive Practice"
              desc="Flashcards, translation exercises, and sentence building to master every word."
            />
            <Feature
              icon={<Sparkles className="w-10 h-10 text-purple-500 mb-2" />}
              title="Real Examples"
              desc="Learn words in context with authentic German sentences and English translations."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center group cursor-default text-center">
      <div className="mb-6 p-6 rounded-3xl bg-card border border-border shadow-sm transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}
