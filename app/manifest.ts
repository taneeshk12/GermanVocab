import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Learn German Daily - Master Vocabulary A1-B2',
    short_name: 'LearnGerman',
    description: 'The best free app to learn German vocabulary. Master A1-B2 levels with interactive flashcards, quizzes, and spaced repetition. No ads, no subscriptions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f9fc',
    theme_color: '#6366f1',
    orientation: 'any',
    lang: 'en',
    categories: ['education', 'languages', 'productivity'],
    screenshots: [
      {
        src: '/hero-illustration.png',
        sizes: '1200x800',
        form_factor: 'wide',
        label: 'Learn German Daily - Home Screen',
      },
    ],
    icons: [
      {
        src: '/app_logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/logo_with_bg.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Daily Quiz',
        short_name: 'Quiz',
        description: 'Take today\'s German vocabulary quiz',
        url: '/quiz/daily',
        icons: [{ src: '/app_logo.svg', sizes: 'any' }],
      },
      {
        name: 'A1 Flashcards',
        short_name: 'Flashcards',
        description: 'Practice A1 German flashcards',
        url: '/a1/practice/flashcards',
        icons: [{ src: '/app_logo.svg', sizes: 'any' }],
      },
      {
        name: 'Grammar Guides',
        short_name: 'Grammar',
        description: 'German grammar guides and rules',
        url: '/grammar',
        icons: [{ src: '/app_logo.svg', sizes: 'any' }],
      },
    ],
  }
}
