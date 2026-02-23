import { MetadataRoute } from 'next'
import { getAllVocab, getTopics } from '@/lib/vocab'
import { Level } from '@/lib/types'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://learngermandaily.com'
  const levels: Level[] = ['A1', 'A2', 'B1', 'B2']

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      images: [`${baseUrl}/hero-illustration.png`],
    },
    {
      url: `${baseUrl}/quiz/daily`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      images: [`${baseUrl}/quiz-illustration.png`],
    },
  ]

  // Level pages
  const levelPages: MetadataRoute.Sitemap = levels.map((level) => ({
    url: `${baseUrl}/${level.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Practice pages for each level
  const practicePages: MetadataRoute.Sitemap = levels.flatMap((level) => [
    {
      url: `${baseUrl}/${level.toLowerCase()}/practice`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${level.toLowerCase()}/practice/flashcards`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${level.toLowerCase()}/practice/sentences`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${level.toLowerCase()}/practice/translation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ])

  // Topic pages
  const topicPages: MetadataRoute.Sitemap = levels.flatMap((level) => {
    const topics = getTopics(level)
    return topics.map((topic) => ({
      url: `${baseUrl}/${level.toLowerCase()}/${topic.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  })

  // Individual word pages (limited to prevent huge sitemap)
  const wordPages: MetadataRoute.Sitemap = levels.flatMap((level) => {
    const vocab = getAllVocab(level).slice(0, 100) // Limit to top 100 per level for sitemap
    return vocab.map((word) => ({
      url: `${baseUrl}/${level.toLowerCase()}/${word.topic.toLowerCase()}/${word.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  })

  // Blog index page
  const blogIndexPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Individual Blog Pages
  const blogPosts = [
    "german-sentence-structure-word-order-explained-2026",
    "how-to-use-chatgpt-ai-to-learn-german",
    "how-to-learn-german-vocabulary-fast-scientific-guide",
    "how-to-learn-german-fast-beginners-guide",
    "german-noun-genders-and-plurals-a1-guide",
    "best-free-german-learning-apps-2025",
    "100-most-common-german-words",
    "german-articles-der-die-das-explained",
    "goethe-zertifikat-a1-exam-prep",
    "german-verbs-conjugation-present-past"
  ];

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...levelPages,
    ...practicePages,
    ...topicPages,
    ...wordPages,
    ...blogIndexPage,
    ...blogPostPages,
  ]
}
