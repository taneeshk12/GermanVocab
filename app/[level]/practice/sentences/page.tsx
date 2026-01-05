import Link from "next/link";
import { getAllVocab } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SentencePractice } from "@/components/SentencePractice";

export function generateStaticParams() {
    return ["a1", "a2", "b1", "b2"].map((level) => ({
        level: level,
    }));
}

type Props = {
    params: Promise<{ level: string }>;
};

export default async function SentencesPage({ params }: Props) {
    const { level } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        notFound();
    }

    const words = getAllVocab(uppercaseLevel);

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <Link
                    href={`/${level}/practice`}
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-1" /> Back to Practice
                </Link>

                <div className="max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        Sentence Formation
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Practice building German sentences with {words.length} words from Level {uppercaseLevel}.
                        Create your own sentences and compare them with examples!
                    </p>
                </div>
            </div>

            <SentencePractice words={words} />
        </div>
    );
}
