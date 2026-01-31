"use client";

import { useState } from "react";
import { VocabItem } from "@/lib/types";
import { VocabCard } from "@/components/VocabCard";
import { FlashcardModal } from "@/components/FlashcardModal";

interface TopicVocabGridProps {
    words: VocabItem[];
}

export function TopicVocabGrid({ words }: TopicVocabGridProps) {
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {words.map((item, index) => (
                    <VocabCard
                        key={item.id}
                        item={item}
                        onClick={() => setSelectedCardIndex(index)}
                    />
                ))}
            </div>

            {selectedCardIndex !== null && (
                <FlashcardModal
                    isOpen={true}
                    onClose={() => setSelectedCardIndex(null)}
                    words={words}
                    initialIndex={selectedCardIndex}
                />
            )}
        </>
    );
}
