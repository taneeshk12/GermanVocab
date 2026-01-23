import Link from "next/link";
import { getVocabBySlug, getTopics, getVocabByTopic, getAllVocab } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next"
import { Metadata } from "next";
import { ArrowLeft, Book, Volume2 } from "lucide-react";

type Props = {
    params: Promise<{ level: string; topic: string; slug: string }>;
};

// SEO: Generate Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { level, slug } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;
    const item = getVocabBySlug(uppercaseLevel, slug);

    if (!item) {
        return { title: "Word Not Found" };
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

    return (
        <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[80vh]">

            <div className="w-full max-w-3xl">
                <Link href={`/${level}/${topic}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to {topic}
                </Link>

                <div className="bg-card border shadow-2xl rounded-[2rem] p-8 sm:p-16 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
                            Deep Dive
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                            Level {item.level}
                        </span>
                    </div>

                    <div className="text-center py-8 relative z-10">
                        <div className="inline-block mb-2">
                            <span className="text-2xl sm:text-4xl text-muted-foreground font-serif italic mr-3">{item.article}</span>
                            <h1 className="inline text-6xl sm:text-8xl font-black text-foreground tracking-tight">
                                {item.word}
                            </h1>
                        </div>
                        {item.plural && (
                            <p className="text-xl text-muted-foreground italic mt-2">
                                (Plural: <span className="font-semibold">{item.plural}</span>)
                            </p>
                        )}
                    </div>

                    <div className="grid gap-8 mt-8 relative z-10">
                        <div className="text-center">
                            <p className="text-3xl sm:text-4xl font-medium text-primary">
                                {item.meaning_en}
                            </p>
                        </div>

                        <div className="bg-secondary/50 p-8 rounded-3xl border border-border/50 backdrop-blur-sm mt-4">
                            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                                <Book size={18} />
                                <span className="text-sm font-bold uppercase tracking-wide">Example Usage</span>
                            </div>
                            <p className="text-2xl font-serif italic text-foreground mb-3 leading-relaxed">
                                "{item.example_de}"
                            </p>
                            <p className="text-lg text-muted-foreground">
                                {item.example_en}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-center gap-6">
                    <Link
                        href={`/${level}/${topic}`}
                        className="px-8 py-3 rounded-full border bg-background hover:bg-secondary transition-colors font-medium"
                    >
                        Continue Browsing
                    </Link>
                    <Link
                        href="/quiz/daily"
                        className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold shadow-lg shadow-primary/25"
                    >
                        Quiz Me on This
                    </Link>
                </div>
            </div>
        </div>
    );
}
