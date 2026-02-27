"use client";

import { useEffect, useState } from "react";
import { VocabItem } from "@/lib/types";
import { getMasteredWords } from "@/lib/word-progress";
import { getAllVocab } from "@/lib/vocab";
import QuizInterface from "@/components/QuizInterface";
import { PracticeAgainTab } from "@/components/PracticeAgainTab";
import { BookOpen, Trophy, Target, Lock, LogIn, RotateCcw } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getPracticeAgainWords } from "@/lib/supabase-integration";

type Tab = "quiz" | "practice";

export function LearnedWordsQuiz() {
  const [learnedWords, setLearnedWords] = useState<VocabItem[]>([]);
  const [practiceCount, setPracticeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("quiz");

  useEffect(() => {
    async function checkAuthAndLoadWords() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        setIsAuthenticated(!!user);

        if (!user) {
          setIsLoading(false);
          return;
        }

        // Load learned words + practice-again count in parallel
        const [learnedData, practiceRows] = await Promise.all([
          getMasteredWords(),
          getPracticeAgainWords(),
        ]);

        setPracticeCount(practiceRows.length);

        if (learnedData.length > 0) {
          // Support A1 and A2
          const allVocab = (["A1", "A2"] as const).flatMap((lvl) =>
            getAllVocab(lvl)
          ) as VocabItem[];
          const learnedWordIds = new Set(learnedData.map((m) => m.word_id));
          setLearnedWords(allVocab.filter((w) => learnedWordIds.has(w.id)));
        }
      } catch (error) {
        console.error("Error loading learned words:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuthAndLoadWords();
  }, []);

  /* ── Loading ─────────────────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
      </div>
    );
  }

  /* ── Not logged in ──────────────────────────────────────────────────────── */
  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-card border rounded-3xl p-12 shadow-2xl">
          <div className="relative mb-6 inline-block">
            <Lock size={64} className="mx-auto text-muted-foreground" />
            <div className="absolute -top-2 -right-2 p-2 bg-primary rounded-full">
              <LogIn size={20} className="text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Login Required</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Please log in to access your learned words and track your progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              <LogIn size={20} /> Log In
            </Link>
            <Link
              href="/auth"
              className="px-8 py-4 rounded-xl border border-primary text-primary font-bold hover:bg-primary/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Sign Up Free
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            ✨ 100% Free • Track your progress &amp; master German vocabulary
          </p>
        </div>
      </div>
    );
  }

  /* ── Quiz running ────────────────────────────────────────────────────────── */
  if (quizStarted) {
    const questions = learnedWords.map((word) => {
      const germanAnswer = word.article
        ? `${word.article} ${word.word}`
        : word.word;

      const wrongAnswers = learnedWords
        .filter((w) => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => (w.article ? `${w.article} ${w.word}` : w.word));

      const allOptions = [germanAnswer, ...wrongAnswers].sort(
        () => Math.random() - 0.5
      );

      return {
        id: word.id,
        question: word.meaning_en,
        article: word.article,
        options: allOptions,
        correctAnswer: germanAnswer,
        explanation: word.example_de || "",
        type: "mcq" as const,
        level: word.level,
        topic: word.topic,
      };
    });

    return <QuizInterface questions={questions} />;
  }

  /* ── Tab UI ──────────────────────────────────────────────────────────────── */
  return (
    <div className="max-w-2xl mx-auto py-6">

      {/* Tab pills */}
      <div className="flex gap-2 mb-8 p-1 bg-secondary/50 rounded-2xl border border-border max-w-xs mx-auto">
        <button
          onClick={() => setActiveTab("quiz")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === "quiz"
              ? "bg-card shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Trophy size={15} />
          Quiz
          {learnedWords.length > 0 && (
            <span className="ml-1 bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5">
              {learnedWords.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === "practice"
              ? "bg-card shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <RotateCcw size={15} />
          Practice Again
          {practiceCount > 0 && (
            <span className="ml-1 bg-amber-500/10 text-amber-600 text-xs rounded-full px-2 py-0.5">
              {practiceCount}
            </span>
          )}
        </button>
      </div>

      {/* ── QUIZ TAB ──────────────────────────────────────────────────────── */}
      {activeTab === "quiz" && learnedWords.length === 0 && (
        <div className="bg-card border rounded-3xl p-12 shadow-2xl text-center">
          <BookOpen size={64} className="mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-3xl font-bold mb-4">No Learned Words Yet</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start practicing to learn some words first! Mark words as learned
            through practice or flashcards, and they&apos;ll appear here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/A1"
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              <Target size={20} /> Start Learning
            </Link>
            <Link
              href="/A1/practice"
              className="px-8 py-4 rounded-xl border border-primary text-primary font-bold hover:bg-primary/10 transition-colors inline-flex items-center gap-2"
            >
              Practice Now
            </Link>
          </div>
        </div>
      )}

      {activeTab === "quiz" && learnedWords.length > 0 && (
        <div className="bg-card border rounded-3xl p-10 shadow-2xl text-center">
          <Trophy size={60} className="mx-auto mb-5 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-3">Quiz Yourself</h2>
          <p className="text-muted-foreground mb-1">
            You&apos;ve learned{" "}
            <span className="font-bold text-primary">{learnedWords.length}</span>{" "}
            words.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            English word is shown — pick the correct German word (with article).
          </p>

          <div className="grid gap-3 mb-8 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-0.5 text-sm">Reinforcement</h3>
                <p className="text-xs text-muted-foreground">
                  Regular review cements words in long-term memory
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <RotateCcw size={18} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-0.5 text-sm">Flag Hard Words</h3>
                <p className="text-xs text-muted-foreground">
                  Tap "Practice Again" on any missed word — it gets saved to your
                  Practice list
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setQuizStarted(true)}
            className="w-full sm:w-auto px-12 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/25 text-lg"
          >
            <Target size={22} />
            Start Quiz ({learnedWords.length} words)
          </button>

          <Link
            href="/A1"
            className="block mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Learning
          </Link>
        </div>
      )}

      {/* ── PRACTICE AGAIN TAB ─────────────────────────────────────────────── */}
      {activeTab === "practice" && <PracticeAgainTab />}
    </div>
  );
}
