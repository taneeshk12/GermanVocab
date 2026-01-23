import Link from "next/link";
import { getAllVocab } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next"
import { Brain } from "lucide-react";
import { generateLevelSEO, generateEducationalSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Metadata } from "next";

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

// Generate metadata for each level
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { level } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;
    
    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        return {};
    }
    
    const totalWords = getAllVocab(uppercaseLevel).length;
    return generateLevelSEO(level, totalWords);
}

export default async function LevelPage({ params }: Props) {
    const { level } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    // Validate level
    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        notFound();
    }

    const totalWords = getAllVocab(uppercaseLevel).length;

    // Structured data
    const educationalSchema = generateEducationalSchema(level, totalWords);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: `Level ${uppercaseLevel}`, url: `/${level}` },
    ]);

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            
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
