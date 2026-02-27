export type Level = "A1" | "A2" | "B1" | "B2";

export interface VocabItem {
    id: string;
    word: string;
    article?: "der" | "die" | "das" | null;
    plural?: string | null;
    meaning_en: string;
    example_de: string;
    example_en: string;
    topic: string;
    level: Level;
    slug: string;
}

export interface QuizQuestion {
    id: string;
    type: "mcq" | "fill-blank" | "article";
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation?: string;
    audioText?: string;
    /** Used to persist "practice again" words to the DB */
    level?: string;
    topic?: string;
}
