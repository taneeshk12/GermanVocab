import { Metadata } from "next";
import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = generateSEO({
  title: "German Grammar Guides — A1 to B2 | LearnGermanDaily",
  description:
    "Master German grammar with comprehensive guides: articles, cases, verbs, word order, adjectives, modals, prepositions, tenses, pronouns, negation. Practical examples and practice links.",
  keywords: [
    "german grammar",
    "learn german grammar",
    "german articles",
    "german cases",
    "german verb conjugation",
    "german word order",
    "german adjective endings",
    "german modal verbs",
    "german prepositions",
    "german tenses",
    "german pronouns",
    "german negation",
    "der die das",
    "nominative accusative dative genitive",
    "german grammar for beginners",
    "a1 german grammar",
    "b1 german grammar",
    "b2 german grammar"
  ],
});

const TOPICS = [
  {
    slug: "german-noun-genders-and-plurals-a1-guide",
    title: "German Nouns: Articles, Plurals & Gender Rules (A1)",
    excerpt: "Master der/die/das, plural forms, compounds, and normalization. Essential foundation for all German learners.",
    level: "A1",
    keywords: ["german nouns", "der die das", "german plurals", "noun genders german", "german articles explained"]
  },
  {
    slug: "german-cases-nominative-accusative-dative-genitive",
    title: "German Cases: Nominative, Accusative, Dative, Genitive (A1-A2)",
    excerpt: "Complete guide to the 4 cases: when to use them, how articles change, and practical examples.",
    level: "A1-A2",
    keywords: ["german cases", "nominative accusative dative genitive", "case system german", "german declension"]
  },
  {
    slug: "german-verbs-conjugation-present-past",
    title: "German Verbs: Conjugation, Present & Past Tense (A1-A2)",
    excerpt: "Learn regular/irregular verbs, present tense conjugation, perfect tense with haben/sein, and common patterns.",
    level: "A1-A2",
    keywords: ["german verb conjugation", "present tense german", "past tense german", "haben sein", "german verbs"]
  },
  {
    slug: "german-pronouns-personal-possessive-demonstrative",
    title: "German Pronouns: Personal, Possessive & Demonstrative (A1-A2)",
    excerpt: "Complete guide to all pronoun types, declension, and usage in different cases.",
    level: "A1-A2",
    keywords: ["german pronouns", "personal pronouns german", "demonstrative pronouns", "possessive pronouns german"]
  },
  {
    slug: "german-negation-nicht-kein-nirgendwo",
    title: "German Negation: Nicht, Kein, Nie, Niemand (A1)",
    excerpt: "Master negative words, word order with negation, and common negation patterns.",
    level: "A1",
    keywords: ["german negation", "nicht kein nichts", "negative words german", "german word order negation"]
  },
  {
    slug: "german-prepositions-with-cases-a1-guide",
    title: "German Prepositions: Accusative, Dative & Two-Way (A1-A2)",
    excerpt: "Complete list of prepositions, case changes, contractions, and common collocations.",
    level: "A1-A2",
    keywords: ["german prepositions", "two-way prepositions", "dative accusative prepositions", "german preposition cases"]
  },
  {
    slug: "german-word-order-sentence-structure",
    title: "German Word Order & Sentence Structure (A2)",
    excerpt: "Master V2 word order, question formation, separable verbs, and complex sentence patterns.",
    level: "A2",
    keywords: ["german word order", "sentence structure german", "v2 word order", "teka molo", "german syntax"]
  },
  {
    slug: "german-adjective-endings-declension",
    title: "German Adjective Endings: Weak, Strong, Mixed (B1)",
    excerpt: "Complete guide to adjective declension after definite/indefinite articles and no article.",
    level: "B1",
    keywords: ["german adjective endings", "adjective declension", "weak strong mixed adjectives", "german adjectives"]
  },
  {
    slug: "german-modal-verbs-konnen-mussen-wollen",
    title: "German Modal Verbs: Können, Müssen, Wollen, Sollen, Dürfen, Mögen (A1-A2)",
    excerpt: "Master the 6 modal verbs: meanings, conjugation, word order, and real-life usage examples.",
    level: "A1-A2",
    keywords: ["german modal verbs", "können müssen wollen", "modals german", "dürfen sollen mögen"]
  },
  {
    slug: "german-tenses-present-perfect-future",
    title: "German Tenses: Present, Perfect, Future & Past (A1-B1)",
    excerpt: "Master time expressions, auxiliary verbs, and when to use each tense in German.",
    level: "A1-B1",
    keywords: ["german tenses", "present perfect german", "future tense german", "past tense german"]
  }
];

export default function GrammarIndex() {
  return (
    <div className="min-h-screen pb-20">
      <PageHeader
        title="German Grammar Guides"
        description="Comprehensive grammar lessons from A1 to B2 level. Each guide includes practical examples, exercises, and links to practice your skills."
      />

      <div className="container mx-auto px-6 max-w-4xl py-12">
        <p className="text-muted-foreground mb-6">
          These grammar guides are organized by topic and difficulty level. Start with A1 basics and progress through the levels. Each guide includes SEO-optimized content, practical examples, and internal links to related topics and practice pages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={`/blog/${t.slug}`}
              className="block p-6 border rounded-2xl hover:shadow-lg transition-all bg-white/50 dark:bg-black/20"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-primary">{t.level}</span>
                <span className="text-sm text-muted-foreground">Guide</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t.title}</h3>
              <p className="text-muted-foreground mb-4">{t.excerpt}</p>
              <div className="text-sm font-semibold text-primary">Read full guide →</div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg border border-border/50 bg-primary/5">
          <h4 className="font-bold mb-3">Practice & Vocabulary Links</h4>
          <p className="text-muted-foreground mb-4">
            Apply what you learn with our interactive practice tools and vocabulary lists.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/a1" className="px-4 py-2 bg-primary text-white rounded-md font-semibold">A1 Vocabulary</Link>
            <Link href="/quiz" className="px-4 py-2 border rounded-md font-semibold">Grammar Quizzes</Link>
            <Link href="/practice" className="px-4 py-2 border rounded-md font-semibold">Practice Exercises</Link>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-lg border border-border/50 bg-secondary/10">
          <h4 className="font-bold mb-3">Learning Path</h4>
          <p className="text-muted-foreground mb-4">
            Follow this recommended order for the best learning experience:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Nouns & Articles (A1) - Foundation</li>
            <li>Cases (A1-A2) - Essential for sentences</li>
            <li>Verbs & Tenses (A1-A2) - Action words</li>
            <li>Word Order (A2) - Sentence structure</li>
            <li>Adjectives (B1) - Descriptions</li>
            <li>Modals & Prepositions (A1-A2) - Advanced basics</li>
            <li>Pronouns & Negation (A1-A2) - Complete sentences</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
