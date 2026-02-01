"use client";

import { useEffect, useState } from "react";
import { VocabItem } from "@/lib/types";
import { getMasteredWords } from "@/lib/word-progress";
import { getAllVocab } from "@/lib/vocab";
import QuizInterface from "@/components/QuizInterface";
import { BookOpen, Trophy, Target } from "lucide-react";
import Link from "next/link";

export function LearnedWordsQuiz() {
  const [learnedWords, setLearnedWords] = useState<VocabItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    async function loadLearnedWords() {
      try {
        const learnedData = await getMasteredWords();
        
        if (learnedData.length === 0) {
          setIsLoading(false);
          return;
        }

        // Get all A1 vocabulary
        const allVocab = getAllVocab("A1");
        
        // Filter to only learned words (global - from any practice mode)
        const learnedWordIds = new Set(learnedData.map(m => m.word_id));
        const filteredWords = allVocab.filter((word: VocabItem) => learnedWordIds.has(word.id));
        
        setLearnedWords(filteredWords);
      } catch (error) {
        console.error("Error loading learned words:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadLearnedWords();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (learnedWords.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-card border rounded-3xl p-12 shadow-2xl">
          <BookOpen size={64} className="mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-3xl font-bold mb-4">No Learned Words Yet</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start practicing to learn some words first! Mark words as learned through practice or flashcards,
            and they'll appear here for review.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/A1"
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              <Target size={20} />
              Start Learning
            </Link>
            <Link
              href="/A1/practice"
              className="px-8 py-4 rounded-xl border border-primary text-primary font-bold hover:bg-primary/10 transition-colors inline-flex items-center gap-2"
            >
              Practice Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (quizStarted) {
    // Generate quiz questions from learned words
    const questions = learnedWords.map(word => {
      // Create 3 wrong answers from other learned words
      const wrongAnswers = learnedWords
        .filter(w => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.meaning_en);
      
      const allOptions = [word.meaning_en, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      return {
        id: word.id,
        question: word.word,
        article: word.article,
        options: allOptions,
        correctAnswer: word.meaning_en,
        explanation: word.example_de || "",
        type: "mcq" as const
      };
    });

    return (
      <QuizInterface
        questions={questions}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-card border rounded-3xl p-12 shadow-2xl">
        <Trophy size={64} className="mx-auto mb-6 text-yellow-500" />
        <h2 className="text-4xl font-bold mb-4">Review Your Learned Words</h2>
        <p className="text-xl text-muted-foreground mb-2">
          You&apos;ve learned <span className="font-bold text-primary">{learnedWords.length}</span> words!
        </p>
        <p className="text-muted-foreground mb-8">
          Test yourself with a quiz on all your learned vocabulary
        </p>

        <div className="grid gap-4 mb-8 text-left max-w-md mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Reinforcement Learning</h3>
              <p className="text-sm text-muted-foreground">
                Regular review helps cement words in long-term memory
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="p-2 rounded-lg bg-primary/10">
              <Trophy size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Track Your Progress</h3>
              <p className="text-sm text-muted-foreground">
                Your quiz results are saved to track improvement over time
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setQuizStarted(true)}
          className="w-full sm:w-auto px-12 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/25 text-lg"
        >
          <Target size={24} />
          Start Quiz ({learnedWords.length} words)
        </button>

        <Link
          href="/A1"
          className="block mt-4 text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to Learning
        </Link>
      </div>
    </div>
  );
}
