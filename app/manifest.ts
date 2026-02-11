import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Learn German Daily - Master Vocabulary',
    short_name: 'LearnGerman',
    description: 'The best free app to learn German vocabulary. Master A1-B2 levels with interactive flashcards, quizzes, and spaced repetition.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/app_logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
