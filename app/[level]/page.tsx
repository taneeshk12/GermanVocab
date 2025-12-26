import Link from "next/link";
import { getTopics, getAllVocab, vocabDatabase } from "@/lib/vocab"; // Fixed import 
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";

// Generate static params for all levels
export function generateStaticParams() {
    return ["a1", "a2", "b1", "b2"].map((level) => ({
        level: level,
    }));
}

// Ensure type safety for the props
type Props = {
    params: Promise<{ level: string }>;
};

export default async function LevelPage({ params }: Props) {
    const { level } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    // Validate level
    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        notFound();
    }

    const topics = getTopics(uppercaseLevel);
    const totalWords = getAllVocab(uppercaseLevel).length;

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-gray-500 hover:underline mb-4 block">
                        &larr; Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold mb-2">Level {uppercaseLevel}</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {totalWords} words available across {topics.length} topics.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {topics.map((topic) => (
                        <Link
                            key={topic}
                            href={`/${level}/${topic.toLowerCase()}`}
                            className="block p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all font-semibold capitalize bg-white dark:bg-zinc-900"
                        >
                            {topic}
                            <span className="block text-xs font-normal text-gray-400 mt-2">
                                Practice ➔
                            </span>
                        </Link>
                    ))}
                </div>

                {topics.length === 0 && (
                    <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-xl">
                        <p className="text-gray-500">No topics found for this level yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
