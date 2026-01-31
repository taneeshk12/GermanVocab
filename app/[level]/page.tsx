import Link from "next/link";
import { getAllVocab, getTopics } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next"
import { Brain, Book, ChevronRight, BookOpen, Sparkles, Languages, MessageSquare, Star, Apple, Home as HomeIcon, Briefcase, Footprints, Heart, Shirt, Sun, Car } from "lucide-react";
import { generateLevelSEO, generateEducationalSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TopicsGrid } from "@/components/TopicsGrid";

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
    const topics = getTopics(uppercaseLevel);

    // Get word counts per topic
    const vocabulary = getAllVocab(uppercaseLevel);
    const topicsWithData = topics.map(topic => {
        const count = vocabulary.filter(v => v.topic === topic).length;
        return {
            name: topic,
            count,
            slug: topic.toLowerCase() // Assuming simplest slug derivation for now as per original code href construction
        };
    });

    // Structured data
    const educationalSchema = generateEducationalSchema(level, totalWords);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: `Level ${uppercaseLevel}`, url: `/${level}` },
    ]);

    return (
        <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <PageHeader
                title={`Level ${uppercaseLevel}`}
                description={`${totalWords} words available. Master them topic by topic.`}
                imageSrc="/level-illustration.png"
            >
                <Link
                    href={`/${level}/practice`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-lg hover:from-primary/90 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                    <Brain size={20} />
                    Start Practice Mode
                </Link>
            </PageHeader>

            <div className="container px-6 mx-auto max-w-6xl pb-20">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <Book className="text-primary" size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-foreground">Learning Path</h2>
                            <p className="text-muted-foreground font-medium">Step-by-step topics</p>
                        </div>
                    </div>
                </div>

                <TopicsGrid topics={topicsWithData} level={level} />
            </div>
        </div>
    );
}
