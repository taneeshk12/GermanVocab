import Link from "next/link";
import { getAllVocab } from "@/lib/vocab";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Analytics } from "@vercel/analytics/next"
import { TranslationPractice } from "@/components/TranslationPractice";
import { PageHeader } from "@/components/PageHeader";

export function generateStaticParams() {
    return ["a1", "a2", "b1", "b2"].map((level) => ({
        level: level,
    }));
}

type Props = {
    params: Promise<{ level: string }>;
};

export default async function TranslationPage({ params }: Props) {
    const { level } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        notFound();
    }

    const words = getAllVocab(uppercaseLevel);
    const AVAILABLE_LEVELS = ["a1", "a2"];

    return (
        <div className="min-h-screen">
            <PageHeader
                title={`Translation Practice — Level ${uppercaseLevel}`}
                description={`Test your translation skills with ${words.length} words from Level ${uppercaseLevel}. Switch between German-to-English and English-to-German modes!`}
                imageSrc="/practice-illustration.png"
            >
                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href={`/${level}/practice`}
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-full border border-border bg-background/50 hover:bg-background"
                    >
                        <ArrowLeft size={16} className="mr-1" /> Back to Practice
                    </Link>
                    <div className="flex items-center gap-1 bg-black/10 rounded-full p-1">
                        {AVAILABLE_LEVELS.map((lvl) => (
                            <Link
                                key={lvl}
                                href={`/${lvl}/practice/translation`}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${lvl === level
                                        ? "bg-white text-black shadow-sm"
                                        : "text-white/80 hover:text-white"
                                    }`}
                            >
                                {lvl.toUpperCase()}
                            </Link>
                        ))}
                    </div>
                </div>
            </PageHeader>

            <div className="container mx-auto px-6 py-12 -mt-10 relative z-20">
                <TranslationPractice words={words} level={level} />
            </div>
        </div>
    );
}
