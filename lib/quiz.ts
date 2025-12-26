import { QuizQuestion, VocabItem, Level } from "./types";
import { getAllVocab } from "./vocab";

export function generateDailyQuiz(level: Level, count: number = 5): QuizQuestion[] {
    const allVocab = getAllVocab(level);

    // Shuffle implementation (Fisher-Yates)
    const shuffled = [...allVocab].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    return selected.map((item) => {
        // 50% chance of MCQ translation, 50% article
        const type = Math.random() > 0.5 ? "mcq" : "article";
        return generateQuestion(item, allVocab, type);
    });
}

function generateQuestion(item: VocabItem, allVocab: VocabItem[], type: "mcq" | "article"): QuizQuestion {
    if (type === "article" && item.article) {
        return {
            id: `q-${item.id}`,
            type: "article",
            question: `What is the article for "${item.word}"?`,
            options: ["der", "die", "das"],
            correctAnswer: item.article,
            explanation: `The correct article for ${item.word} is ${item.article}.`
        };
    }

    // Default to MCQ (Meaning)
    // Generate distractors
    const distractors = allVocab
        .filter(v => v.id !== item.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(v => v.meaning_en);

    const options = [...distractors, item.meaning_en].sort(() => 0.5 - Math.random());

    return {
        id: `q-${item.id}`,
        type: "mcq",
        question: `What is the meaning of "${item.word}"?`,
        options: options,
        correctAnswer: item.meaning_en,
        explanation: `${item.word} means "${item.meaning_en}". Example: ${item.example_de}`
    };
}
