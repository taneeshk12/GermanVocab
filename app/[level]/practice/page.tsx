import Link from "next/link";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Languages, MessageSquare, Brain } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";

export function generateStaticParams() {
    return ["a1", "a2", "b1", "b2"].map((level) => ({
        level: level,
    }));
}

type Props = {
    params: Promise<{ level: string }>;
};

export default async function PracticePage({ params }: Props) {
    const { level } = await params;
    const uppercaseLevel = level.toUpperCase() as Level;

    if (!["A1", "A2", "B1", "B2"].includes(uppercaseLevel)) {
        notFound();
    }

    const practiceTypes = [
        {
            id: "flashcards",
            title: "Flashcards",
            description: "Review vocabulary with interactive flashcards",
            icon: BookOpen,
            color: "from-blue-500 to-cyan-500",
            href: `/${level}/practice/flashcards`,
        },
        {
            id: "translation",
            title: "Translation Practice",
            description: "Translate words and phrases between German and English",
            icon: Languages,
            color: "from-purple-500 to-pink-500",
            href: `/${level}/practice/translation`,
        },
        {
            id: "sentences",
            title: "Sentence Formation",
            description: "Build correct German sentences with given words",
            icon: MessageSquare,
            color: "from-green-500 to-emerald-500",
            href: `/${level}/practice/sentences`,
        },

    ];

    return (
        <div className="min-h-screen">
            <PageHeader
                title={`Practice Level ${uppercaseLevel}`}
                description="Strengthen your memory with targeted exercises."
                imageSrc="/practice-illustration.png"
            >
                <Link
                    href={`/${level}`}
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors px-4 py-2 rounded-full border border-border bg-background/50 hover:bg-background"
                >
                    <ArrowLeft size={16} className="mr-1" /> Back to Level {uppercaseLevel}
                </Link>
            </PageHeader>

            <div className="container px-6 mx-auto max-w-5xl pb-20 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {practiceTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                            <GlassCard
                                key={type.id}
                                href={type.href}
                                className="group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity"
                                    style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />

                                <div className="relative">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${type.color} mb-6 shadow-lg`}>
                                        <Icon size={24} className="text-white" />
                                    </div>

                                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {type.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                        {type.description}
                                    </p>

                                    <div className="inline-flex items-center text-sm font-semibold text-primary">
                                        Start Practice <ArrowLeft size={16} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
