import { PageHeader } from "@/components/PageHeader";
import { LearnedWordsQuiz } from "@/components/LearnedWordsQuiz";
import { Suspense } from "react";

export const metadata = {
  title: "My Vocabulary | German Vocab",
  description: "Review your learned words and quiz yourself on your full German vocabulary",
};

export default function LearnedWordsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="My Vocabulary"
        description="Quiz yourself on words you've learned, and revisit anything that needs more practice"
      />

      <Suspense fallback={
        <div className="flex justify-center items-center min-h-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }>
        <LearnedWordsQuiz />
      </Suspense>
    </div>
  );
}
