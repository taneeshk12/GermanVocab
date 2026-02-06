'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How long does it take to learn German?",
    answer: "Most learners reach A1 level in 2-3 months with daily practice (30 minutes/day). B1 level typically takes 6-12 months. Our app's spaced repetition and 5000+ curated words help you learn 30% faster than traditional methods. Consistency is key - learning a little every day is more effective than cramming."
  },
  {
    question: "Is it hard to learn German?",
    answer: "German is moderately difficult for English speakers (FSI Category II, requiring ~750 hours). However, both languages share Germanic roots, making vocabulary easier. Our structured A1-B2 curriculum breaks learning into manageable steps, and features like spaced repetition flashcards make retention much easier."
  },
  {
    question: "What's the best way to learn German?",
    answer: "The most effective approach combines vocabulary building, grammar practice, and active usage. Our app offers all three: flashcards with spaced repetition for vocabulary, sentence practice for grammar, and daily quizzes for reinforcement. Practice 30 minutes daily and focus on high-frequency words first (our A1-A2 lists)."
  },
  {
    question: "Can I learn German for free?",
    answer: "Yes! Learn German Daily offers 5000+ words across A1-B2 levels, interactive flashcards, quizzes, sentence practice, and AI pronunciation guidance - all completely free. No hidden costs, subscriptions, or premium upsells. We believe quality German education should be accessible to everyone."
  },
  {
    question: "How to learn German fast?",
    answer: "To accelerate learning: 1) Use spaced repetition (our flashcards), 2) Practice daily for at least 30 minutes, 3) Focus on high-frequency words (our A1 list), 4) Apply what you learn immediately, 5) Use multiple practice modes (flashcards, quizzes, sentences). Most users see significant progress in 2-3 months."
  },
  {
    question: "What is the best app to learn German?",
    answer: "Learn German Daily combines the quality of DW Learn German with modern features: 5000+ CEFR-aligned words, spaced repetition for optimal retention, AI-powered pronunciation, and completely free access. Unlike Duolingo or Babbel, there are no ads, paywalls, or premium features - everything is free forever."
  },
  {
    question: "How long to learn German A1?",
    answer: "A1 level requires approximately 80-100 hours of study according to the Goethe Institut. With our app's 965 A1 words and structured daily practice (30 minutes/day), most users achieve A1 proficiency in 2-3 months. The key is consistent daily practice rather than intensive cramming."
  },
  {
    question: "Is 3 months enough to learn German?",
    answer: "Yes, 3 months is enough to reach A1 level with dedicated daily practice (30-60 minutes). Our optimized curriculum and spaced repetition system help you learn efficiently. For A2 level, expect 6 months, and for B1, plan for 9-12 months of consistent daily practice."
  }
];

export function FAQSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions About Learning German
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about learning German with our free app
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group glass-panel rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform duration-200 shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 p-8 glass-panel rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Ready to Start Learning German Daily?
          </h3>
          <p className="text-muted-foreground mb-6">
            Join 10,000+ learners who practice German every day with our free app
          </p>
          <Link
            href="/a1"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Start Learning A1 Now <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
