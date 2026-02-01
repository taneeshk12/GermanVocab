import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

// SEO Metadata for the blog directory
export const metadata: Metadata = generateSEO({
  title: "German Learning Blog - Tips, Grammar & Culture | Learn German Daily",
  description:
    "Explore expert tips, grammar guides, and cultural insights to help you master the German language faster. From A1 basics to B2 fluency strategies.",
  keywords: [
    "learn german blog",
    "german grammar tips",
    "how to learn german fast",
    "german culture insights",
    "german language tips",
    "free german resources",
  ],
});

// Mock Data - In a real app, this would come from a CMS or MDX files
const BLOG_POSTS = [
  {
    slug: "how-to-learn-german-fast-beginners-guide",
    title: "How to Learn German Fast: The Ultimate Beginner's Guide (2025)",
    excerpt:
      "Discover the scientifically proven methods to master German vocabulary and grammar in record time. Stop wasting time on ineffective drills.",
    date: "February 1, 2025",
    readTime: "8 min read",
    category: "Learning Strategies",
    image: "/blog/learn-fast.jpg", // You'll need to add these images or use placeholders
  },
  {
    slug: "best-free-german-learning-apps-2025",
    title: "The Best Free German Learning Apps in 2025: A Detailed Review",
    excerpt:
      "We compare Duolingo, Memrise, and open-source alternatives to help you choose the best tool for your learning style in 2025.",
    date: "February 3, 2025",
    readTime: "7 min read",
    category: "Resources",
    image: "/blog/app-review.jpg",
  },
  {
    slug: "100-most-common-german-words",
    title: "The 100 Most Common German Words You Need to Know",
    excerpt:
      "Mastering these 100 words will give you 50% comprehension of daily German conversation. Download the full list and start practicing today.",
    date: "January 28, 2025",
    readTime: "12 min read",
    category: "Vocabulary",
    image: "/blog/common-words.jpg",
  },
  {
    slug: "german-articles-der-die-das-explained",
    title: "Der, Die, or Das? German Articles Explained Simply",
    excerpt:
      "Struggling with German genders? Use our simple rules and mnemonic tricks to finally guess the correct article 90% of the time.",
    date: "January 20, 2025",
    readTime: "6 min read",
    category: "Grammar",
    image: "/blog/der-die-das.jpg",
  },
   {
    slug: "goethe-zertifikat-a1-exam-prep",
    title: "How to Pass the Goethe-Zertifikat A1 Exam",
    excerpt:
      "A complete breakdown of the A1 exam structure, essential vocabulary list, and practice tips to ensure you pass with flying colors.",
    date: "January 15, 2025",
    readTime: "10 min read",
    category: "Exams",
    image: "/blog/goethe-exam.jpg",
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen pb-20">
      <PageHeader
        title="Learning Hub"
        description="Expert articles, guides, and tips to accelerate your German journey."
      />

      <div className="container mx-auto px-6 max-w-6xl -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="h-48 bg-linear-to-r from-violet-500/20 to-indigo-500/20 w-full relative overflow-hidden">
                {/* Placeholder for actual blog images */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-bold text-4xl select-none">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  <span className="text-primary">{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
