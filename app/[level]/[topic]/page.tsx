import Link from "next/link";
import { getVocabByTopic, getTopics } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { VocabCard } from "@/components/VocabCard";
import { Analytics } from "@vercel/analytics/next"
import { ArrowLeft, BookOpen } from "lucide-react";
import { Metadata } from "next";
import { generateTopicSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";

export function generateStaticParams() {
    const levels: Level[] = ["A1", "A2", "B1", "B2"];
    const params = [];

    for (const level of levels) {
        const topics = getTopics(level);
        for (const topic of topics) {
            params.push({ level: level.toLowerCase(), topic: topic.toLowerCase() });
        }
    }
    return params;
}

type Props = {
    params: Promise<{ level: string; topic: string }>;
};

// Generate metadata for each topic
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { level, topic } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        return {};
    }

    const words = getVocabByTopic(uppercaseLevel, topic);
    return generateTopicSEO(level, topic, words.length);
}

export default async function TopicPage({ params }: Props) {
    const { level, topic } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        notFound();
    }

    const words = getVocabByTopic(uppercaseLevel, topic);

    // Structured data
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: `Level ${uppercaseLevel}`, url: `/${level}` },
        { name: topic.charAt(0).toUpperCase() + topic.slice(1), url: `/${level}/${topic}` },
    ]);

    return (
        <div className="min-h-screen">
            <PageHeader
                title={topic}
                description={`Master essential German vocabulary related to ${topic}.`}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {words.map((item) => (
                        <VocabCard key={item.id} item={item} />
                    ))}
                </div>

                {words.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-secondary/20">
                        <p className="text-muted-foreground">No words found for this topic.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
