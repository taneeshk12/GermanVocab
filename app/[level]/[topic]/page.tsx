import Link from "next/link";
import { getVocabByTopic, getTopics, getTopicBySlug } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next"
import { ArrowLeft, BookOpen } from "lucide-react";

import { generateTopicSEO, generateBreadcrumbSchema, siteViewport } from "@/lib/seo";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = siteViewport;
import { PageHeader } from "@/components/PageHeader";
import { TopicVocabGrid } from "@/components/TopicVocabGrid";
import { slugify } from "@/lib/utils";

export function generateStaticParams() {
    const levels: Level[] = ["A1", "A2", "B1", "B2"];
    const params = [];

    for (const level of levels) {
        const topics = getTopics(level);
        for (const topic of topics) {
            params.push({ level: level.toLowerCase(), topic: slugify(topic) });
        }
    }
    return params;
}

// ...

type Props = {
    params: Promise<{ level: string; topic: string }>;
};

// Generate metadata for each topic
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { level, topic: topicSlug } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        return {};
    }

    const topicName = getTopicBySlug(uppercaseLevel, topicSlug);
    if (!topicName) return {};

    const words = getVocabByTopic(uppercaseLevel, topicName);
    return generateTopicSEO(level, topicName, words.length);
}

export default async function TopicPage({ params }: Props) {
    const { level, topic: topicSlug } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        notFound();
    }

    const topicName = getTopicBySlug(uppercaseLevel, topicSlug);
    if (!topicName) {
        notFound();
    }

    const words = getVocabByTopic(uppercaseLevel, topicName);

    // Structured data
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: `Level ${uppercaseLevel}`, url: `/${level}` },
        { name: topicName.charAt(0).toUpperCase() + topicName.slice(1), url: `/${level}/${topicSlug}` },
    ]);

    return (
        <div className="min-h-screen">
            <PageHeader
                title={topicName}
                description={`Master essential German vocabulary related to ${topicName}.`}
                imageSrc="/level-illustration.png"
            >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link href={`/${level}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-full border border-border bg-background/50 hover:bg-background">
                        <ArrowLeft size={16} className="mr-1" /> Back to Level {uppercaseLevel}
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                        <BookOpen size={16} />
                        <span>{words.length} Words</span>
                    </div>
                </div>
            </PageHeader>

            <div className="container mx-auto px-6 py-12 -mt-10 relative z-20">
                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />

                <TopicVocabGrid words={words} />

                {words.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-secondary/20">
                        <p className="text-muted-foreground">No words found for this topic.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
