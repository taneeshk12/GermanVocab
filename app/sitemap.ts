import { MetadataRoute } from 'next'
import { getAllVocab, getTopics } from '@/lib/vocab'
import { Level } from '@/lib/types'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://langflow.vercel.app' // Update with your actual domain
  const levels: Level[] = ['A1', 'A2', 'B1', 'B2']

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/quiz/daily`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
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

  return [...staticPages, ...levelPages, ...practicePages, ...topicPages, ...wordPages]
}
