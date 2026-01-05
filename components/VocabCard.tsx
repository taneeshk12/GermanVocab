import Link from 'next/link';
import { VocabItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowRight, Volume2 } from 'lucide-react';

interface VocabCardProps {
    item: VocabItem;
}

export function VocabCard({ item }: VocabCardProps) {
    return (
        <Link href={`/${item.level.toLowerCase()}/${item.topic.toLowerCase()}/${item.slug}`}>
            <div className="group h-full bg-card border hover:border-primary/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col relative overflow-hidden">

                {/* Decorative background gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-primary/10" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className={cn(
                        "text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider",
                        item.article === 'der' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                            item.article === 'die' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                                item.article === 'das' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                                    "bg-gray-100 text-gray-700"
                    )}>
                        {item.article || "—"}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground border px-2 py-0.5 rounded-full">
                        {item.level}
                    </span>
                </div>

                <div className="mb-4 relative z-10">
                    <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.word}
                    </h3>
                    <p className="text-sm text-muted-foreground italic">
                        {item.plural ? `pl. ${item.plural}` : 'no plural'}
                    </p>
                </div>

                <div className="mt-auto relative z-10">
                    <div className="h-px w-full bg-border mb-4" />
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-foreground/80">
                            {item.meaning_en}
                        </p>
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
