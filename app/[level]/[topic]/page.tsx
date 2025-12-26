import Link from "next/link";
import { getVocabByTopic, getTopics } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { VocabCard } from "@/components/VocabCard";

// Generate static params for known topics in A1 (for now)
// In a real large app, we might not statically generate ALL of these if there are thousands,
// but for a set vocab list, it's perfect.
export function generateStaticParams() {
    // This is a simplified example. To cover ALL levels and topics, we'd iterate everything.
    // For now, let's just do A1 topics as a proof of concept for the build.
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

    // Validate level
    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        notFound();
    }

    const words = getVocabByTopic(uppercaseLevel, topic);

    if (words.length === 0) {
        // If valid level but unknown topic (or empty), 404
        // Alternatively could show empty state
        // notFound(); 
    }

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <div className="flex gap-2 text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span>/</span>
                        <Link href={`/${level}`} className="hover:underline">Level {uppercaseLevel}</Link>
                    </div>
                    <h1 className="text-4xl font-bold mb-2 capitalize">{topic}</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Learn German words related to {topic}.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {words.map((item) => (
                        <VocabCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
