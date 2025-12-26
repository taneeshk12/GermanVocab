import Link from "next/link";
import { getVocabBySlug, getTopics, getVocabByTopic, getAllVocab } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: Promise<{ level: string; topic: string; slug: string }>;
};

// SEO: Generate Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { level, slug } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;
    const item = getVocabBySlug(uppercaseLevel, slug);

    if (!item) {
        return {
            title: "Word Not Found",
        };
    }

    return {
        title: `${item.word} - English Meaning & German Example (${item.level})`,
        description: `Learn the meaning of "${item.word}" in English. German vocabulary for level ${item.level}. Example: ${item.example_de}`,
        alternates: {
            canonical: `/${level}/${item.topic}/${slug}`,
        }
    };
}

// Generate all static paths for build time
export function generateStaticParams() {
    const levels: Level[] = ["A1", "A2", "B1", "B2"];
    const params = [];

    for (const level of levels) {
        const items = getAllVocab(level);
        for (const item of items) {
            params.push({
                level: level.toLowerCase(),
                topic: item.topic.toLowerCase(),
                slug: item.slug
            });
        }
    }
    return params;
}

export default async function WordPage({ params }: Props) {
    const { level, topic, slug } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    const item = getVocabBySlug(uppercaseLevel, slug);

    if (!item) {
        notFound();
    }

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": item.word,
        "description": item.meaning_en,
        "inDefinedTermSet": {
            "@type": "DefinedTermSet",
            "name": `German Vocabulary Level ${item.level}`,
        },
        "termCode": item.slug
    };

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="w-full max-w-2xl">
                <div className="flex gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span>/</span>
                    <Link href={`/${level}`} className="hover:underline">Level {uppercaseLevel}</Link>
                    <span>/</span>
                    <Link href={`/${level}/${topic}`} className="hover:underline capitalize">{topic}</Link>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 sm:p-12 shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                        <span className="text-sm font-bold tracking-wider uppercase text-gray-400">
                            German Word
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold">
                            {item.level}
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-bold mb-4 text-gray-900 dark:text-white mt-2">
                        <span className="text-3xl sm:text-5xl text-gray-400 font-normal mr-2">{item.article}</span>
                        {item.word}
                    </h1>

                    {item.plural && (
                        <p className="text-xl text-gray-500 mb-8 italic">
                            Plural: {item.plural}
                        </p>
                    )}

                    <hr className="my-8 border-gray-100 dark:border-gray-800" />

                    <div className="grid gap-8">
                        <div>
                            <h2 className="text-sm font-bold uppercase text-gray-400 mb-2">English Meaning</h2>
                            <p className="text-3xl font-medium">{item.meaning_en}</p>
                        </div>

                        <div className="bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-2xl">
                            <h2 className="text-sm font-bold uppercase text-gray-400 mb-3">Example Usage</h2>
                            <p className="text-xl text-gray-800 dark:text-gray-200 mb-2 font-serif italic">
                                "{item.example_de}"
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                                {item.example_en}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-between">
                    <Link
                        href={`/${level}/${topic}`}
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        ← Back to Topic
                    </Link>
                </div>
            </div>
        </div>
    );
}
