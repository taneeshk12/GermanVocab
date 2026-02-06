import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

// This is where you would normally fetch data from your CMS or MDX source
// For now, we use the same static data for demonstration
const BLOG_POSTS = {
  "how-to-learn-german-fast-beginners-guide": {
    title: "How to Learn German Fast: The Ultimate Beginner's Guide (2025)",
    excerpt: "Discover the scientifically proven methods to master German vocabulary and grammar in record time.",
    content: `
      <h2>The Secret to Learning German Quickly</h2>
      <p>Many beginners make the mistake of focusing too much on grammar rules initially. While grammar is important, vocabulary is the building block of communication.</p>
      
      <h3>1. Focus on the Top 1000 Words</h3>
      <p>Studies show that the 1000 most common words account for 80% of spoken communication. Start with our <a href="/a1" class="text-primary hover:underline font-bold">A1 Vocabulary List</a> to build a solid foundation.</p>
      
      <h3>2. Use Spaced Repetition</h3>
      <p>Our app uses an advanced algorithm to show you words right before you forget them. This is scientifically proven to be the most efficient way to memorize vocabulary.</p>
      
      <h3>3. Immerse Yourself Daily</h3>
      <p>Change your phone language to German, watch German shows on Netflix (like "Dark"), and label items in your house with their German names.</p>
    `,
    date: "February 1, 2025",
    readTime: "8 min read",
    category: "Learning Strategies",
    keywords: ["learn german fast", "german tips", "beginner german guide"],
  },
  "100-most-common-german-words": {
    title: "The 100 Most Common German Words You Need to Know",
    excerpt: "Mastering these 100 words will give you 50% comprehension of daily German conversation.",
    content: `
      <h2>Why These 100 Words Matter</h2>
      <p>The German language has over 5 million words, but you only need a fraction of them for daily fluency.</p>
      
      <h3>Top 10 Verbs</h3>
      <ul>
        <li><strong>sein</strong> - to be</li>
        <li><strong>haben</strong> - to have</li>
        <li><strong>werden</strong> - to become</li>
        <li><strong>sagen</strong> - to say</li>
        <li><strong>machen</strong> - to do/make</li>
      </ul>
      
      <p>Ready to learn them all? <a href="/a1" class="text-primary hover:underline font-bold">Start our Free Course</a>.</p>
    `,
    date: "January 28, 2025",
    readTime: "12 min read",
    category: "Vocabulary",
    keywords: ["common german words", "most used german vocabulary", "basic german"],
  },
  "german-articles-der-die-das-explained": {
    title: "Der, Die, or Das? German Articles Explained Simply",
    excerpt: "Struggling with German genders? Use our simple rules and mnemonic tricks.",
    content: `
      <h2>Cracking the Code of German Genders</h2>
      <p>German nouns can be Masculine (Der), Feminine (Die), or Neutral (Das). It seems random, but there are patterns!</p>
      
      <h3>Always Masculine (Der)</h3>
      <ul>
        <li>Days of the week (Der Montag)</li>
        <li>Months (Der Januar)</li>
        <li>Directions (Der Norden)</li>
        <li>Words ending in -er, -en, -el (mostly)</li>
      </ul>
      
      <h3>Always Feminine (Die)</h3>
      <ul>
        <li>Words ending in -ung, -heit, -keit, -schaft (Die Freiheit)</li>
        <li>Most plants and trees</li>
      </ul>
    `,
    date: "January 20, 2025",
    readTime: "6 min read",
    category: "Grammar",
    keywords: ["german articles", "der die das rules", "german genders explained"],
  },
  "goethe-zertifikat-a1-exam-prep": {
    title: "How to Pass the Goethe-Zertifikat A1 Exam",
    excerpt: "A complete breakdown of the A1 exam structure and practice tips.",
    content: `
      <h2>Understanding the Goethe A1 Exam</h2>
      <p>The Goethe-Zertifikat A1: Start Deutsch 1 is required for many visas and residency permits.</p>
      
      <h3>Exam Structure</h3>
      <ul>
        <li><strong>Listening (Hören):</strong> 20 mins</li>
        <li><strong>Reading (Lesen):</strong> 25 mins</li>
        <li><strong>Writing (Schreiben):</strong> 20 mins</li>
        <li><strong>Speaking (Sprechen):</strong> 15 mins</li>
      </ul>
      
      <p>Start practicing with our <a href="/quiz/daily" class="text-primary hover:underline font-bold">Daily Quizzes</a> to get exam-ready.</p>
    `,
    date: "January 15, 2025",
    readTime: "10 min read",
    category: "Exams",
    keywords: ["goethe a1 exam", "german exam prep", "start deutsch 1 tips"],
  },
  "best-free-german-learning-apps-2025": {
    title: "The Best Free German Learning Apps in 2025: A Detailed Review",
    excerpt: "We compare Duolingo, Memrise, and open-source alternatives to help you choose the best tool for your learning style.",
    content: `
      <h2>Finding the Right Tool for You</h2>
      <p>With dozens of apps available, choosing the right one can be overwhelming. Here's our honest breakdown of the top contenders for free German learning.</p>

      <h3>1. LangFlow (Open Source)</h3>
      <p>Best for: Serious learners who want transparency and efficiency without paywalls.</p>
      <ul>
        <li><strong>Pros:</strong> Completely free, no ads, scientific spaced repetition, CEFR aligned.</li>
        <li><strong>Cons:</strong> Newer community than giants like Duolingo.</li>
      </ul>

      <h3>2. Duolingo</h3>
      <p>Best for: Casual learning and maintaining a daily habit.</p>
      <ul>
        <li><strong>Pros:</strong> Gamification makes it addictive.</li>
        <li><strong>Cons:</strong> Can feel repetitive; advanced grammar is often lacking; heavy ads on free tier.</li>
      </ul>

      <h3>3. Anki</h3>
      <p>Best for: Hardcore vocabulary memorization.</p>
      <ul>
        <li><strong>Pros:</strong> Powerful customization.</li>
        <li><strong>Cons:</strong> Steep learning curve; UI is dated.</li>
      </ul>

      <h3>Verdict</h3>
      <p>If you want a balance of modern UI and serious learning tools for free, give our platform a try. It combines the best of Anki's algorithms with a modern interface.</p>
    `,
    date: "February 3, 2025",
    readTime: "7 min read",
    category: "Resources",
    keywords: ["best german learning apps", "free language apps", "duolingo alternative", "langflow vs duolingo"],
  },
    "german-noun-genders-and-plurals-a1-guide": {
    title: "German Noun Genders & Plurals Explained: Der, Die, Das Made Easy (A1 Guide 2026)",
    excerpt: "Confused about der, die, das and German plural forms? Learn simple gender rules, endings, and plural patterns with clear tables and examples for A1 learners.",
    content: `<article class="prose prose-lg dark:prose-invert max-w-4xl mx-auto">

<div class="not-prose mb-8">
  <span class="text-sm font-semibold text-primary">A1 Beginner Level Grammar</span>
</div>

<h1>German Noun Genders and Plurals (A1 Guide)</h1>

<p>When you start learning German, one of the first challenges is understanding <strong>noun genders</strong> and <strong>plural forms</strong>. Unlike English, every German noun has a grammatical gender and a special plural structure.</p>

<p>But don’t worry — once you know the patterns and rules, it becomes much easier 🎯</p>

<hr/>

<h2>What Are German Noun Genders?</h2>

<p>Every German noun belongs to one of three genders:</p>

<table>
<thead>
<tr>
<th>Article</th>
<th>Gender</th>
<th>Example</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>der</strong></td>
<td>Masculine</td>
<td>der Mann</td>
<td>the man</td>
</tr>
<tr>
<td><strong>die</strong></td>
<td>Feminine</td>
<td>die Frau</td>
<td>the woman</td>
</tr>
<tr>
<td><strong>das</strong></td>
<td>Neuter</td>
<td>das Auto</td>
<td>the car</td>
</tr>
</tbody>
</table>

<p><strong>Important:</strong> Always learn nouns WITH their article. Never learn only “Auto”. Learn “das Auto”.</p>

<hr/>

<h2>Masculine Nouns (der)</h2>

<h3>Common Rules</h3>
<ul>
<li>Male people → der Mann, der Vater, der Bruder</li>
<li>Days, months, seasons → der Montag, der Januar, der Sommer</li>
<li>Endings: -er, -el, -en (often) → der Lehrer, der Apfel, der Garten</li>
</ul>

<h3>Examples</h3>
<ul>
<li><strong>der Lehrer</strong> – teacher</li>
<li><strong>der Tisch</strong> – table</li>
<li><strong>der Computer</strong> – computer</li>
</ul>

<hr/>

<h2>Feminine Nouns (die)</h2>

<h3>Common Rules</h3>
<ul>
<li>Female people → die Frau, die Mutter, die Schwester</li>
<li>Endings: -ung, -heit, -keit, -schaft → always feminine</li>
<li>Endings: -ion, -tät, -ik → usually feminine</li>
</ul>

<h3>Examples</h3>
<ul>
<li><strong>die Zeitung</strong> – newspaper</li>
<li><strong>die Freiheit</strong> – freedom</li>
<li><strong>die Universität</strong> – university</li>
</ul>

<hr/>

<h2>Neuter Nouns (das)</h2>

<h3>Common Rules</h3>
<ul>
<li>Young people/animals → das Kind, das Baby</li>
<li>Metals → das Gold, das Silber</li>
<li>Verbs used as nouns → das Essen, das Lernen</li>
<li>-chen, -lein endings → always neuter</li>
</ul>

<h3>Examples</h3>
<ul>
<li><strong>das Mädchen</strong> – girl</li>
<li><strong>das Haus</strong> – house</li>
<li><strong>das Buch</strong> – book</li>
</ul>

<hr/>

<h2>Quick Gender Cheat Sheet</h2>

<table>
<thead>
<tr>
<th>DER</th>
<th>DIE</th>
<th>DAS</th>
</tr>
</thead>
<tbody>
<tr>
<td>Male people</td>
<td>Female people</td>
<td>Young beings</td>
</tr>
<tr>
<td>Days/Months</td>
<td>-ung, -heit, -keit</td>
<td>-chen, -lein</td>
</tr>
<tr>
<td>-er words</td>
<td>-ion, -tät, -ik</td>
<td>Metals & verbs</td>
</tr>
</tbody>
</table>

<hr/>

<h2>German Noun Plurals Explained</h2>

<p>In English, we usually add <strong>-s</strong>. But German has <strong>different plural patterns</strong>.</p>

<h3>Most Common Plural Types</h3>

<table>
<thead>
<tr>
<th>Pattern</th>
<th>Singular</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td>-e</td>
<td>der Hund</td>
<td>die Hunde</td>
</tr>
<tr>
<td>-er (+ umlaut)</td>
<td>das Kind</td>
<td>die Kinder</td>
</tr>
<tr>
<td>-n / -en</td>
<td>die Frau</td>
<td>die Frauen</td>
</tr>
<tr>
<td>-s</td>
<td>das Auto</td>
<td>die Autos</td>
</tr>
<tr>
<td>no change</td>
<td>der Lehrer</td>
<td>die Lehrer</td>
</tr>
</tbody>
</table>

<h3>Important Rule</h3>
<p><strong>All plural nouns use DIE</strong> — no matter the gender!</p>

<ul>
<li>der Mann → <strong>die Männer</strong></li>
<li>die Frau → <strong>die Frauen</strong></li>
<li>das Kind → <strong>die Kinder</strong></li>
</ul>

<hr/>

<h2>Common Beginner Mistakes</h2>

<ul>
<li>❌ Learning nouns without articles</li>
<li>❌ Guessing gender using English logic</li>
<li>❌ Forgetting that ALL plurals use “die”</li>
</ul>

<hr/>

<h2>Practice Exercise</h2>

<ol>
<li>___ Tisch</li>
<li>___ Zeitung</li>
<li>___ Kind</li>
<li>Plural of Auto → ?</li>
<li>Plural of Frau → ?</li>
</ol>

<details>
<summary>Show Answers</summary>
<ol>
<li>der</li>
<li>die</li>
<li>das</li>
<li>die Autos</li>
<li>die Frauen</li>
</ol>
</details>

<hr/>

<h2>Final Tip for Fast Learning</h2>

<p>Use flashcards and always write nouns like this:</p>

<ul>
<li>der Tisch</li>
<li>die Tasche</li>
<li>das Buch</li>
</ul>

<p>This small habit will save you HOURS later when learning cases and adjectives.</p>

<p><strong>Remember:</strong> Article + noun = one word ❤️</p>

</article>`,
    date: "2026-02-06",
    readTime: "10 min read",
    category: "Grammar",
    keywords: ["german noun genders","german plurals explained","der die das rules","learn german A1 grammar","german articles guide","german plural forms"],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];

  if (!post) return {};

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-background pt-24 pb-12 border-b border-border/40">
        <div className="container mx-auto px-6 max-w-4xl">
           <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Learning Hub
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              <Tag size={14} /> {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/50 pl-6 italic">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl py-12">
        <article className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 dark:prose-th:bg-gray-800 dark:prose-th:border-gray-700 prose-th:p-3 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-3 prose-table:w-full prose-table:my-6 max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* CTA Section */}
        <div className="mt-16 bg-linear-to-br from-primary/10 to-violet-500/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to put this into practice?</h3>
            <p className="text-muted-foreground mb-6">Join thousands of students mastering German with our free tools.</p>
            <Link 
                href="/a1" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
                Start Learning Now
            </Link>
        </div>
      </div>
    </div>
  );
}
