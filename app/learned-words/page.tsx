import { PageHeader } from "@/components/PageHeader";
import { LearnedWordsQuiz } from "@/components/LearnedWordsQuiz";
import { Suspense } from "react";

export const metadata = {
  title: "Review Learned Words | German Vocab",
  description: "Quiz yourself on all the German words you've mastered",
};

export default function LearnedWordsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Review Learned Words"
        description="Test your knowledge on all the words you've mastered"
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
