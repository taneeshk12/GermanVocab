import { VocabItem, Level } from "./types";
import a1DataComplete from "../data/vocab/a1_complete.json";

// Use only the complete A1 word list (965 words from CSV)
const a1Data = a1DataComplete as VocabItem[];

// In a real app with many files, we might load these dynamically or map them.
// For now, importing directly is safe for SSG.
const vocabDatabase: Record<Level, VocabItem[]> = {
    "A1": a1Data,
    "A2": [], // todo: populate
    "B1": [], // todo: populate
    "B2": [], // todo: populate
};

export function getAllVocab(level: Level): VocabItem[] {
    return vocabDatabase[level] || [];
}

export function getVocabByTopic(level: Level, topic: string): VocabItem[] {
    const items = getAllVocab(level);
    return items.filter((item) => item.topic.toLowerCase() === topic.toLowerCase());
}

export function getTopics(level: Level): string[] {
    const items = getAllVocab(level);
    const topicCounts = new Map<string, number>();
    
    // Count words in each topic
    items.forEach(item => {
        const count = topicCounts.get(item.topic) || 0;
        topicCounts.set(item.topic, count + 1);
    });
    
    // Only return topics that have at least one word
    const topics = Array.from(topicCounts.keys()).filter(topic => topicCounts.get(topic)! > 0);
    return topics.sort();
}

export function getVocabBySlug(level: Level, slug: string): VocabItem | undefined {
    const items = getAllVocab(level);
    return items.find((item) => item.slug === slug);
}

export function getVocabStats(level: Level) {
    const items = getAllVocab(level);
    const topics = getTopics(level);
    
    return {
        totalWords: items.length,
        totalTopics: topics.length,
        wordsByTopic: topics.reduce((acc, topic) => {
            acc[topic] = getVocabByTopic(level, topic).length;
            return acc;
        }, {} as Record<string, number>)
    };
}
