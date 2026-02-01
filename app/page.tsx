import { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { HomeClient } from '@/components/HomeClient';

export const metadata: Metadata = generateSEO({
	title: "Learn German Daily - Free Interactive Vocabulary & Quizzes",
	description: "Master German vocabulary including A1-B2 CEFR levels. Join thousands of students using our free spaced-repetition tools, daily quizzes, and AI pronunciation checks.",
	keywords: [
		"germany language learning", 
		"german words for beginners", 
		"free german lessons online", 
		"goethe a1 word list pdf",
		"german b1 vocabulary",
		"best app to learn german free",
		"german daily practice",
		"learn german fast",
		"german language course free",
		"basic german phrases",
		"german flashcards online",
		"how to learn german"
	]
});

export default function Home() {
	return (
        <HomeClient />
	);
}

