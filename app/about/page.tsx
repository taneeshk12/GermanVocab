import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { BookOpen, Target, Users, TrendingUp } from "lucide-react";

export const metadata = {
  title: "About Us | German Vocab",
  description: "Learn about our mission to help learners master German vocabulary efficiently",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="About LangFlow"
        description="Empowering learners to master German vocabulary"
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Mission Section */}
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-primary" size={32} />
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            At LangFlow, we believe that learning German should be accessible, effective, and enjoyable for everyone. 
            Our platform is designed to help learners of all levels master German vocabulary through scientifically-proven 
            spaced repetition techniques and interactive practice methods.
          </p>
        </GlassCard>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="text-primary" size={28} />
              <h3 className="text-xl font-bold">5000+ Words</h3>
            </div>
            <p className="text-muted-foreground">
              Comprehensive vocabulary covering A1 to B2 CEFR levels, carefully curated 
              to help you progress from beginner to upper-intermediate.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="text-primary" size={28} />
              <h3 className="text-xl font-bold">Smart Learning</h3>
            </div>
            <p className="text-muted-foreground">
              Our spaced repetition algorithm ensures you review words at optimal intervals, 
              maximizing retention and minimizing study time.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-primary" size={28} />
              <h3 className="text-xl font-bold">Track Progress</h3>
            </div>
            <p className="text-muted-foreground">
              Monitor your learning journey with detailed statistics, streaks, and achievements 
              that keep you motivated every step of the way.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Target className="text-primary" size={28} />
              <h3 className="text-xl font-bold">Multiple Practice Modes</h3>
            </div>
            <p className="text-muted-foreground">
              Flashcards, quizzes, sentence building, and translation exercises keep your 
              learning experience varied and engaging.
            </p>
          </GlassCard>
        </div>

        {/* Why LangFlow Section */}
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold mb-4">Why Choose LangFlow?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              We understand that learning a new language can be challenging. That&apos;s why we&apos;ve built LangFlow 
              to be intuitive, efficient, and focused on what matters most: helping you actually remember and use 
              the German words you learn.
            </p>
            <p className="leading-relaxed">
              Whether you&apos;re preparing for an exam, planning to travel to Germany, or simply passionate about 
              learning languages, LangFlow provides the tools and structure you need to succeed.
            </p>
            <p className="leading-relaxed">
              Join thousands of learners who are already improving their German vocabulary with LangFlow. 
              Start your journey today!
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
