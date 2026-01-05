import Link from "next/link";
import { getVocabByTopic, getTopics } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { VocabCard } from "@/components/VocabCard";
import { ArrowLeft, BookOpen } from "lucide-react";

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

export default async function TopicPage({ params }: Props) {
    const { level, topic } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        notFound();
    }

    const words = getVocabByTopic(uppercaseLevel, topic);

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <Link href={`/${level}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft size={16} className="mr-1" /> Back to Level {uppercaseLevel}
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20">
                            <BookOpen size={14} />
                            <span>{words.length} Words</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold capitalize tracking-tight">{topic}</h1>
                        <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
                            Master essential German vocabulary related to {topic}.
                        </p>
                    </div>
                </div>
            </div>

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
    );
}
