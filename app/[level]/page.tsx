import Link from "next/link";
import { getAllVocab } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { Brain } from "lucide-react";

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

    const totalWords = getAllVocab(uppercaseLevel).length;

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-gray-500 hover:underline mb-4 block">
                        &larr; Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold mb-2">Level {uppercaseLevel}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {totalWords} words available for practice.
                    </p>


                    {/* Practice Button */}
                    <div className="flex justify-center mt-12">
                        <Link
                            href={`/${level}/practice`}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            <Brain size={24} />
                            Start Practice Mode
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
