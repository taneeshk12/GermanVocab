import { Metadata, Viewport } from 'next'
import { generateSEO, generateFAQSchema, siteViewport } from '@/lib/seo'
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
		"german language course free"
	]
});

export default function Home() {
	// FAQ Schema for SEO
	const faqSchema = generateFAQSchema([
		{
			question: "How long does it take to learn German?",
			answer: "Most learners reach A1 level in 2-3 months with daily practice (30 minutes/day). B1 level typically takes 6-12 months. Our app's spaced repetition and 5000+ curated words help you learn 30% faster than traditional methods."
		},
		{
			question: "Is it hard to learn German?",
			answer: "German is moderately difficult for English speakers (FSI Category II, requiring ~750 hours). However, both languages share Germanic roots. Our structured A1-B2 curriculum and spaced repetition features make learning easier."
		},
		{
			question: "What's the best way to learn German?",
			answer: "The most effective approach combines vocabulary building, grammar practice, and active usage. Our app offers flashcards with spaced repetition, sentence practice, and daily quizzes for comprehensive learning."
		},
		{
			question: "Can I learn German for free?",
			answer: "Yes! Learn German Daily offers 5000+ words across A1-B2 levels, interactive flashcards, quizzes, sentence practice, and AI pronunciation guidance - all completely free with no hidden costs or subscriptions."
		},
		{
			question: "How to learn German fast?",
			answer: "Use spaced repetition (our flashcards), practice daily for 30 minutes, focus on high-frequency words (our A1 list), and use multiple practice modes. Most users see significant progress in 2-3 months."
		},
		{
			question: "What is the best app to learn German?",
			answer: "Learn German Daily combines DW Learn German quality with modern features: 5000+ CEFR-aligned words, spaced repetition, AI pronunciation, and completely free access. No ads or paywalls."
		},
		{
			question: "How long to learn German A1?",
			answer: "A1 level requires approximately 80-100 hours of study. With our 965 A1 words and structured daily practice (30 minutes/day), most users achieve A1 proficiency in 2-3 months."
		},
		{
			question: "Is 3 months enough to learn German?",
			answer: "Yes, 3 months is enough to reach A1 level with dedicated daily practice (30-60 minutes). For A2 level, expect 6 months, and for B1, plan for 9-12 months of consistent practice."
		}
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
			<HomeClient />
		</>
	);
}
