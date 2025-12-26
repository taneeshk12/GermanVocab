import Link from 'next/link';
import { VocabItem } from '@/lib/types';

interface VocabCardProps {
    item: VocabItem;
}

export function VocabCard({ item }: VocabCardProps) {
    return (
        <Link href={`/${item.level.toLowerCase()}/${item.topic.toLowerCase()}/${item.slug}`}>
            <div className="group border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-blue-500 transition-all bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md cursor-pointer h-full">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                        {item.article}
                    </span>
                    <span className="text-xs text-gray-400">{item.level}</span>
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.word}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    {item.plural ? `pl: ${item.plural}` : ''}
                </p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                    {item.meaning_en}
                </p>
            </div>
        </Link>
    );
}
