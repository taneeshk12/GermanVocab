'use client';

import Link from 'next/link';

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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions About Learning German
          </h2>
          <p className="text-lg text-white/70">
            Everything you need to know about learning German with our free app
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-200 border border-white/10"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-lg sm:text-xl font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <span className="text-white/60 group-open:rotate-180 transition-transform duration-200 shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-white/80 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 p-8 bg-linear-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl border border-white/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Start Learning German Daily?
          </h3>
          <p className="text-white/80 mb-6">
            Join 10,000+ learners who practice German every day with our free app
          </p>
          <Link
            href="/a1"
            className="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-white/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Learning A1 Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
