import { VocabItem, Level } from "./types";
import a1Data from "../data/vocab/a1.json";

// In a real app with many files, we might load these dynamically or map them.
// For now, importing directly is safe for SSG.
const vocabDatabase: Record<Level, VocabItem[]> = {
    "A1": a1Data as VocabItem[],
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
    const topics = new Set(items.map((item) => item.topic));
    return Array.from(topics);
}

export function getVocabBySlug(level: Level, slug: string): VocabItem | undefined {
    const items = getAllVocab(level);
    return items.find((item) => item.slug === slug);
}
