import { Metadata, Viewport } from 'next'
import { generateSEO, generateFAQSchema, generateItemListSchema, generateSpeakableSchema, siteViewport } from '@/lib/seo'
import { HomeClient } from '@/components/HomeClient';

export const viewport: Viewport = siteViewport;

export const metadata: Metadata = generateSEO({
	title: "Learn German Daily - Free A1-B2 App | 5000+ Words",
	description: "Learn German daily with 5000+ words (A1-B2). Free flashcards, quizzes & AI pronunciation. Join 10,000+ learners. Start your daily practice now!",
	keywords: [
		"learn german",
		"learn german daily",
		"best app to learn german",
		"learn german free",
		"how to learn german",
		"german vocabulary",
		"learn german a1",
		"daily german practice",
		"dw learn german",
		"learn german online",
		"german words for beginners",
		"free german lessons online",
		"goethe a1 word list",
		"german b1 vocabulary",
		"learn german fast",
		"german flashcards online",
		"german language course free",
		"best free german app",
		"duolingo alternative german free",
		"german spaced repetition app",
		"learn german without paying",
		"german a1 vocabulary list free",
		"how to pass goethe a1",
	]
});

export default function Home() {
	// ── FAQ Schema (Google Rich Results + AI answers) ──────────────────
	const faqSchema = generateFAQSchema([
		{
			question: "What is the best free app to learn German?",
			answer: "Learn German Daily is the best free German learning app, offering 5000+ CEFR-aligned words (A1-B2), spaced repetition flashcards, sentence practice, quizzes, and AI pronunciation guidance — all at no cost. No ads, no paywalls, no subscriptions."
		},
		{
			question: "How long does it take to learn German?",
			answer: "Most learners reach A1 level in 2-3 months with daily practice (30 minutes/day). A2 takes about 4-6 months, B1 takes 6-12 months, and B2 takes 12-18 months. Our app's spaced repetition and 5000+ curated words help you learn 30% faster than traditional methods."
		},
		{
			question: "Is it hard to learn German?",
			answer: "German is moderately difficult for English speakers (FSI Category II, requiring ~750 hours total). However, both languages share Germanic roots, so many words are similar. Our structured A1-B2 curriculum and spaced repetition features make the process systematic and manageable."
		},
		{
			question: "What is the best way to learn German?",
			answer: "The most effective approach combines: (1) Daily vocabulary building with spaced repetition flashcards, (2) Grammar practice with structured exercises, (3) Sentence-level practice to understand context, (4) Daily quizzes for reinforcement. Learn German Daily provides all of these in one free app."
		},
		{
			question: "Can I learn German for free?",
			answer: "Yes! Learn German Daily offers 5000+ words across A1-B2 levels, interactive flashcards using spaced repetition, multiple quiz modes, sentence practice, and AI pronunciation guidance — all completely free with no hidden costs or subscriptions."
		},
		{
			question: "How to learn German fast?",
			answer: "To learn German fast: use spaced repetition flashcards daily (our app handles the scheduling), focus on high-frequency A1 words first, practice sentences for context, and complete the daily quiz every day. Most users see significant progress within 2-3 months using just 30 minutes per day."
		},
		{
			question: "How long to learn German A1?",
			answer: "German A1 requires approximately 80-100 study hours. With our 965 A1 words, structured daily practice of 30 minutes/day, and spaced repetition, most users achieve A1 proficiency in 2-3 months."
		},
		{
			question: "Is 3 months enough to learn German?",
			answer: "Yes, 3 months of dedicated daily practice (30-60 minutes) is enough to reach A1 level in German. For A2 level, expect 6 months, and for B1 — plan for 9-12 months of consistent practice."
		},
		{
			question: "How do German articles work (der, die, das)?",
			answer: "German has three grammatical genders: masculine (der), feminine (die), and neuter (das). Unlike English, the article must be memorized with each noun. For example: der Hund (the dog, masculine), die Katze (the cat, feminine), das Kind (the child, neuter). Our A1 course teaches all genders with flashcards."
		},
		{
			question: "What are the most common German words to learn first?",
			answer: "The most important German words for beginners include: ja (yes), nein (no), bitte (please), danke (thank you), Hallo (hello), Auf Wiedersehen (goodbye), ich (I), du (you), sein (to be), haben (to have). Learn German Daily's A1 course starts with these high-frequency essentials."
		},
		{
			question: "What is the Goethe A1 exam and how do I prepare?",
			answer: "The Goethe-Zertifikat A1 is an official German language certificate for absolute beginners, issued by the Goethe-Institut. It tests: reading (25 min), writing (20 min), and oral communication (15 min). Preparing with our 965 A1 words and daily practice gives you comprehensive vocabulary coverage for the exam."
		},
		{
			question: "What is spaced repetition for German learning?",
			answer: "Spaced repetition is a scientifically proven learning method that schedules word reviews just before you're about to forget them. Instead of cramming, you review words at increasing intervals (1 day, 3 days, 1 week, 1 month). Our German flashcard system uses this algorithm automatically, making vocabulary learning up to 30% more efficient."
		},
	]);

	// ── ItemList Schema (helps AI list our pages as resources) ────────
	const levelListSchema = generateItemListSchema(
		[
			{ name: "German A1 Vocabulary (965 words)", url: "/a1", description: "Beginner German words for absolute starters. Covers greetings, family, numbers, colors, food, and daily life." },
			{ name: "German A2 Vocabulary", url: "/a2", description: "Elementary German words covering travel, work, shopping, and social situations." },
			{ name: "German B1 Vocabulary", url: "/b1", description: "Intermediate German for expressing opinions, describing experiences, and understanding main points in complex text." },
			{ name: "German B2 Vocabulary", url: "/b2", description: "Upper-intermediate German for advanced reading, writing, and conversation." },
		],
		"German CEFR Learning Levels on Learn German Daily"
	);

	// ── Speakable Schema (voice assistants & AI audio responses) ────────
	const speakableSchema = generateSpeakableSchema([
		'h1',
		'[data-speakable="true"]',
		'.hero-description',
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(levelListSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
			/>
			<HomeClient />
		</>
	);
}
