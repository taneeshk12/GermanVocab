import Link from "next/link";
import { Level } from "@/lib/types";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Languages, MessageSquare, Brain } from "lucide-react";

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
        <div className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <Link
                    href={`/${level}`}
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-1" /> Back to Level {uppercaseLevel}
                </Link>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                    Practice Level {uppercaseLevel}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Choose your practice mode and start improving your German skills today!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {practiceTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                        <Link
                            key={type.id}
                            href={type.href}
                            className="group relative overflow-hidden rounded-3xl border bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity"
                                style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />

                            <div className="relative p-8">
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${type.color} mb-6 shadow-lg`}>
                                    <Icon size={32} className="text-white" />
                                </div>

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {type.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {type.description}
                                </p>

                                <div className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                                    Start Practice <ArrowLeft size={16} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
