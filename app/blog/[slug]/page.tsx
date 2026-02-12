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

      <h3>1. LangFlow ()</h3>
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
  "german-verbs-conjugation-present-past": {
    title: "German Verbs: Conjugation, Present & Past Tenses (A1 Guide 2026)",
    excerpt: "Master German verb conjugation with clear rules, patterns, and examples. Learn present tense, past tense (Perfekt), and the most important irregular verbs for A1 level.",
    content: `<article class="prose prose-lg dark:prose-invert max-w-4xl mx-auto">

<div class="not-prose mb-8">
  <span class="text-sm font-semibold text-primary">A1 Beginner Level Grammar</span>
</div>

<h1>German Verb Conjugation: Present & Past Tenses</h1>

<p>German verbs can seem intimidating at first, but once you understand the patterns, they become much easier. In this guide, we'll cover <strong>present tense conjugation</strong>, <strong>past tense (Perfekt)</strong>, and the most important verbs you need for A1 level.</p>

<p>Ready to become a verb master? Let's dive in! 🚀</p>

<hr/>

<h2>Understanding German Verb Forms</h2>

<p>Every German verb has three main forms you need to know:</p>

<table>
<thead>
<tr>
<th>Form</th>
<th>Example</th>
<th>English</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Infinitive</strong></td>
<td>machen</td>
<td>to make/do</td>
</tr>
<tr>
<td><strong>Stem</strong></td>
<td>mach-</td>
<td>base form</td>
</tr>
<tr>
<td><strong>Present Participle</strong></td>
<td>machend</td>
<td>making</td>
</tr>
</tbody>
</table>

<p><strong>Pro Tip:</strong> Most German verbs are regular and follow predictable patterns. Only about 10% are irregular!</p>

<hr/>

<h2>Present Tense Conjugation</h2>

<p>The present tense in German is used for:</p>
<ul>
<li>Current actions: "I eat" (Ich esse)</li>
<li>Habits: "I play soccer" (Ich spiele Fußball)</li>
<li>Future plans: "I fly tomorrow" (Ich fliege morgen)</li>
</ul>

<h3>Regular Verbs (-en verbs)</h3>

<p>For regular verbs ending in <strong>-en</strong>, remove <strong>-en</strong> and add these endings:</p>

<table>
<thead>
<tr>
<th>Pronoun</th>
<th>Endings</th>
<th>machen (to make)</th>
<th>English</th>
</tr>
</thead>
<tbody>
<tr>
<td>ich</td>
<td>-e</td>
<td>mach<strong>e</strong></td>
<td>I make</td>
</tr>
<tr>
<td>du</td>
<td>-st</td>
<td>mach<strong>st</strong></td>
<td>you make (informal)</td>
</tr>
<tr>
<td>er/sie/es</td>
<td>-t</td>
<td>mach<strong>t</strong></td>
<td>he/she/it makes</td>
</tr>
<tr>
<td>wir</td>
<td>-en</td>
<td>mach<strong>en</strong></td>
<td>we make</td>
</tr>
<tr>
<td>ihr</td>
<td>-t</td>
<td>mach<strong>t</strong></td>
<td>you make (plural)</td>
</tr>
<tr>
<td>Sie/sie</td>
<td>-en</td>
<td>mach<strong>en</strong></td>
<td>you make (formal)/they make</td>
</tr>
</tbody>
</table>

<h3>Stem-Changing Verbs (-eln verbs)</h3>

<p>Verbs ending in <strong>-eln</strong> lose the <strong>-e</strong> in <strong>ich</strong> and <strong>du</strong> forms:</p>

<table>
<thead>
<tr>
<th>Pronoun</th>
<th>lächeln (to smile)</th>
<th>English</th>
</tr>
</thead>
<tbody>
<tr>
<td>ich</td>
<td><strong>lächl</strong>e</td>
<td>I smile</td>
</tr>
<tr>
<td>du</td>
<td><strong>lächl</strong>st</td>
<td>you smile</td>
</tr>
<tr>
<td>er/sie/es</td>
<td>lächelt</td>
<td>he/she/it smiles</td>
</tr>
</tbody>
</table>

<hr/>

<h2>The Most Important German Verbs</h2>

<h3>Sein (to be) - Irregular</h3>

<table>
<thead>
<tr>
<th>Pronoun</th>
<th>sein</th>
<th>English</th>
</tr>
</thead>
<tbody>
<tr>
<td>ich</td>
<td><strong>bin</strong></td>
<td>I am</td>
</tr>
<tr>
<td>du</td>
<td><strong>bist</strong></td>
<td>you are</td>
</tr>
<tr>
<td>er/sie/es</td>
<td><strong>ist</strong></td>
<td>he/she/it is</td>
</tr>
<tr>
<td>wir</td>
<td><strong>sind</strong></td>
<td>we are</td>
</tr>
<tr>
<td>ihr</td>
<td><strong>seid</strong></td>
<td>you are (plural)</td>
</tr>
<tr>
<td>Sie/sie</td>
<td><strong>sind</strong></td>
<td>you are (formal)/they are</td>
</tr>
</tbody>
</table>

<h3>Haben (to have) - Irregular</h3>

<table>
<thead>
<tr>
<th>Pronoun</th>
<th>haben</th>
<th>English</th>
</tr>
</thead>
<tbody>
<tr>
<td>ich</td>
<td><strong>habe</strong></td>
<td>I have</td>
</tr>
<tr>
<td>du</td>
<td><strong>hast</strong></td>
<td>you have</td>
</tr>
<tr>
<td>er/sie/es</td>
<td><strong>hat</strong></td>
<td>he/she/it has</td>
</tr>
<tr>
<td>wir</td>
<td><strong>haben</strong></td>
<td>we have</td>
</tr>
<tr>
<td>ihr</td>
<td><strong>habt</strong></td>
<td>you have (plural)</td>
</tr>
<tr>
<td>Sie/sie</td>
<td><strong>haben</strong></td>
<td>you have (formal)/they have</td>
</tr>
</tbody>
</table>

<h3>Other Essential Verbs</h3>

<table>
<thead>
<tr>
<th>Infinitive</th>
<th>ich form</th>
<th>du form</th>
<th>er/sie/es form</th>
<th>English</th>
</tr>
</thead>
<tbody>
<tr>
<td>machen</td>
<td>mache</td>
<td>machst</td>
<td>macht</td>
<td>to make/do</td>
</tr>
<tr>
<td>gehen</td>
<td>gehe</td>
<td>gehst</td>
<td>geht</td>
<td>to go</td>
</tr>
<tr>
<td>kommen</td>
<td>komme</td>
<td>kommst</td>
<td>kommt</td>
<td>to come</td>
</tr>
<tr>
<td>essen</td>
<td>esse</td>
<td>isst</td>
<td>isst</td>
<td>to eat</td>
</tr>
<tr>
<td>trinken</td>
<td>trinke</td>
<td>trinkst</td>
<td>trinkt</td>
<td>to drink</td>
</tr>
<tr>
<td>sprechen</td>
<td>spreche</td>
<td>sprichst</td>
<td>spricht</td>
<td>to speak</td>
</tr>
<tr>
<td>lesen</td>
<td>lese</td>
<td>liest</td>
<td>liest</td>
<td>to read</td>
</tr>
<tr>
<td>schreiben</td>
<td>schreibe</td>
<td>schreibst</td>
<td>schreibt</td>
<td>to write</td>
</tr>
<tr>
<td>lernen</td>
<td>lerne</td>
<td>lernst</td>
<td>lernt</td>
<td>to learn</td>
</tr>
<tr>
<td>arbeiten</td>
<td>arbeite</td>
<td>arbeitest</td>
<td>arbeitet</td>
<td>to work</td>
</tr>
</tbody>
</table>

<hr/>

<h2>Past Tense (Perfekt)</h2>

<p>German past tense uses <strong>Perfekt</strong> (perfect tense), which combines:</p>
<ul>
<li><strong>haben/sein</strong> + past participle</li>
</ul>

<h3>How to Form Past Participles</h3>

<p>For regular verbs: <strong>ge-</strong> + stem + <strong>-t</strong></p>

<table>
<thead>
<tr>
<th>Infinitive</th>
<th>Stem</th>
<th>Past Participle</th>
<th>English</th>
</tr>
</thead>
<tbody>
<tr>
<td>machen</td>
<td>mach-</td>
<td><strong>ge</strong>mach<strong>t</strong></td>
<td>made/done</td>
</tr>
<tr>
<td>lernen</td>
<td>lern-</td>
<td><strong>ge</strong>lern<strong>t</strong></td>
<td>learned</td>
</tr>
<tr>
<td>arbeiten</td>
<td>arbeit-</td>
<td><strong>ge</strong>arbeit<strong>et</strong></td>
<td>worked</td>
</tr>
</tbody>
</table>

<h3>Perfekt Examples</h3>

<table>
<thead>
<tr>
<th>English</th>
<th>German</th>
<th>Literal Translation</th>
</tr>
</thead>
<tbody>
<tr>
<td>I worked</td>
<td>Ich <strong>habe gearbeitet</strong></td>
<td>I have worked</td>
</tr>
<tr>
<td>You learned</td>
<td>Du <strong>hast gelernt</strong></td>
<td>You have learned</td>
</tr>
<tr>
<td>She made</td>
<td>Sie <strong>hat gemacht</strong></td>
<td>She has made</td>
</tr>
<tr>
<td>We went</td>
<td>Wir <strong>sind gegangen</strong></td>
<td>We have gone</td>
</tr>
</tbody>
</table>

<p><strong>Important:</strong> Use <strong>sein</strong> with verbs of movement (gehen, kommen, fahren) and state changes (werden, sterben).</p>

<hr/>

<h2>Separable Verbs</h2>

<p>Many German verbs have separable prefixes that move to the end in certain tenses:</p>

<table>
<thead>
<tr>
<th>Infinitive</th>
<th>Present</th>
<th>Perfekt</th>
<th>English</th>
</tr>
</thead>
<tbody>
<tr>
<td>aufstehen</td>
<td>Ich stehe <strong>auf</strong></td>
<td>Ich bin <strong>auf</strong>gestanden</td>
<td>to get up</td>
</tr>
<tr>
<td>anrufen</td>
<td>Ich rufe <strong>an</strong></td>
<td>Ich habe <strong>an</strong>gerufen</td>
<td>to call</td>
</tr>
<tr>
<td>einkaufen</td>
<td>Ich kaufe <strong>ein</strong></td>
<td>Ich habe <strong>ein</strong>gekauft</td>
<td>to shop</td>
</tr>
</tbody>
</table>

<hr/>

<h2>Common Beginner Mistakes</h2>

<ul>
<li>❌ Forgetting the verb ending changes</li>
<li>❌ Mixing up haben vs sein in Perfekt</li>
<li>❌ Not separating separable verbs</li>
<li>❌ Using English word order in German sentences</li>
</ul>

<hr/>

<h2>Practice Sentences</h2>

<p>Try conjugating these in present tense:</p>

<ol>
<li>Ich ___ Deutsch. (sprechen)</li>
<li>Du ___ Pizza. (essen)</li>
<li>Er ___ Fußball. (spielen)</li>
<li>Wir ___ in Berlin. (wohnen)</li>
<li>Sie ___ Englisch. (lernen)</li>
</ol>

<details>
<summary>Show Answers</summary>
<ol>
<li>Ich <strong>spreche</strong> Deutsch.</li>
<li>Du <strong>isst</strong> Pizza.</li>
<li>Er <strong>spielt</strong> Fußball.</li>
<li>Wir <strong>wohnen</strong> in Berlin.</li>
<li>Sie <strong>lernt</strong> Englisch.</li>
</ol>
</details>

<hr/>

<h2>Quick Study Tips</h2>

<ul>
<li>Learn verbs in groups of 5-10 at a time</li>
<li>Practice with flashcards: front = English, back = German conjugation</li>
<li>Use our <a href="/a1" class="text-primary hover:underline font-bold">A1 vocabulary app</a> to practice verb forms</li>
<li>Write sentences using new verbs every day</li>
</ul>

<p><strong>Remember:</strong> Verbs are the action words that bring your German to life! Keep practicing and you'll master them in no time.</p>

</article>`,
    date: "2026-02-07",
    readTime: "12 min read",
    category: "Grammar",
    keywords: ["german verbs conjugation","german present tense","german past tense perfekt","learn german verbs A1","german irregular verbs","sein haben conjugation"],
  },
  "german-cases-nominative-accusative-dative-genitive": {
    title: "German Cases: Nominative, Accusative, Dative, Genitive (A1-B1 Guide 2026)",
    excerpt: "Master the 4 German cases with clear rules, examples, and practice exercises. Learn how articles change and when to use each case for A1 and B1 level German.",
    content: `<article class="prose prose-lg dark:prose-invert max-w-4xl mx-auto">

<div class="not-prose mb-8">
  <span class="text-sm font-semibold text-primary">A1-B1 Intermediate Grammar</span>
</div>

<h1>German Cases: The Complete Guide to Nominative, Accusative, Dative & Genitive</h1>

<p>German cases are one of the most challenging topics for English speakers, but they're actually quite logical once you understand the system. Cases tell you the <strong>role</strong> a noun plays in a sentence.</p>

<p>In this guide, we'll cover all 4 cases with clear rules, examples, and practice exercises. Let's master them together! 🎯</p>

<hr/>

<h2>What Are German Cases?</h2>

<p>Cases show the relationship between words in a sentence. English has very few cases, but German has four main ones:</p>

<table>
<thead>
<tr>
<th>Case</th>
<th>Purpose</th>
<th>Question</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Nominative</strong></td>
<td>Subject of sentence</td>
<td>Who/What?</td>
<td>Der Mann <em>liest</em> ein Buch.</td>
</tr>
<tr>
<td><strong>Accusative</strong></td>
<td>Direct object</td>
<td>Whom/What?</td>
<td>Der Mann liest <em>ein Buch</em>.</td>
</tr>
<tr>
<td><strong>Dative</strong></td>
<td>Indirect object</td>
<td>To whom/for what?</td>
<td>Er gibt <em>der Frau</em> ein Buch.</td>
</tr>
<tr>
<td><strong>Genitive</strong></td>
<td>Possession</td>
<td>Whose?</td>
<td>Das ist <em>das Buch der Frau</em>.</td>
</tr>
</tbody>
</table>

<hr/>

<h2>Case 1: Nominative (Wer? Was?)</h2>

<p>The nominative case is used for the <strong>subject</strong> of the sentence - the person or thing doing the action.</p>

<h3>Nominative Articles</h3>

<table>
<thead>
<tr>
<th>Definite Articles</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Nominative</strong></td>
<td>der</td>
<td>die</td>
<td>das</td>
<td>die</td>
</tr>
</tbody>
</table>

<h3>Examples</h3>

<ul>
<li><strong>Der Mann</strong> liest ein Buch. (The man reads a book.)</li>
<li><strong>Die Frau</strong> isst einen Apfel. (The woman eats an apple.)</li>
<li><strong>Das Kind</strong> spielt im Park. (The child plays in the park.)</li>
<li><strong>Die Kinder</strong> lachen laut. (The children laugh loudly.)</li>
</ul>

<p><strong>Remember:</strong> Nominative = Subject = Normal article forms!</p>

<hr/>

<h2>Case 2: Accusative (Wen? Was?)</h2>

<p>The accusative case is used for the <strong>direct object</strong> - the person or thing receiving the action.</p>

<h3>Accusative Articles</h3>

<table>
<thead>
<tr>
<th>Definite Articles</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Nominative</strong></td>
<td>der → <strong>den</strong></td>
<td>die</td>
<td>das</td>
<td>die</td>
</tr>
<tr>
<td><strong>Accusative</strong></td>
<td>den</td>
<td>die</td>
<td>das</td>
<td>die</td>
</tr>
</tbody>
</table>

<p><strong>Key Change:</strong> Only masculine definite articles change: der → den</p>

<h3>Indefinite Articles in Accusative</h3>

<table>
<thead>
<tr>
<th>Articles</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Nominative</strong></td>
<td>ein → <strong>einen</strong></td>
<td>eine</td>
<td>ein</td>
</tr>
<tr>
<td><strong>Accusative</strong></td>
<td>einen</td>
<td>eine</td>
<td>ein</td>
</tr>
</tbody>
</table>

<h3>Accusative Examples</h3>

<ul>
<li>Ich sehe <strong>den Mann</strong>. (I see the man.)</li>
<li>Sie kauft <strong>eine Zeitung</strong>. (She buys a newspaper.)</li>
<li>Er trinkt <strong>das Wasser</strong>. (He drinks the water.)</li>
<li>Wir besuchen <strong>die Freunde</strong>. (We visit the friends.)</li>
</ul>

<h3>Common Accusative Prepositions</h3>

<p>These prepositions ALWAYS trigger accusative:</p>

<ul>
<li><strong>durch</strong> - through</li>
<li><strong>für</strong> - for</li>
<li><strong>gegen</strong> - against</li>
<li><strong>ohne</strong> - without</li>
<li><strong>um</strong> - around/at</li>
</ul>

<p><strong>Example:</strong> Ich gehe <strong>für</strong> <strong>den</strong> Mann. (I'm going for the man.)</p>

<hr/>

<h2>Case 3: Dative (Wem?)</h2>

<p>The dative case is used for the <strong>indirect object</strong> - the person who receives something or benefits from the action.</p>

<h3>Dative Articles</h3>

<table>
<thead>
<tr>
<th>Definite Articles</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Nominative</strong></td>
<td>der → <strong>dem</strong></td>
<td>die → <strong>der</strong></td>
<td>das → <strong>dem</strong></td>
<td>die → <strong>den</strong></td>
</tr>
<tr>
<td><strong>Dative</strong></td>
<td>dem</td>
<td>der</td>
<td>dem</td>
<td>den</td>
</tr>
</tbody>
</table>

<h3>Indefinite Articles in Dative</h3>

<table>
<thead>
<tr>
<th>Articles</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Nominative</strong></td>
<td>ein → <strong>einem</strong></td>
<td>eine → <strong>einer</strong></td>
<td>ein → <strong>einem</strong></td>
</tr>
<tr>
<td><strong>Dative</strong></td>
<td>einem</td>
<td>einer</td>
<td>einem</td>
</tr>
</tbody>
</table>

<h3>Dative Examples</h3>

<ul>
<li>Ich gebe <strong>dem Mann</strong> ein Buch. (I give the man a book.)</li>
<li>Sie hilft <strong>der Frau</strong>. (She helps the woman.)</li>
<li>Er schenkt <strong>dem Kind</strong> einen Ball. (He gives the child a ball.)</li>
<li>Wir danken <strong>den Eltern</strong>. (We thank the parents.)</li>
</ul>

<h3>Common Dative Prepositions</h3>

<p>These prepositions ALWAYS trigger dative:</p>

<ul>
<li><strong>aus</strong> - out of/from</li>
<li><strong>bei</strong> - at/by</li>
<li><strong>mit</strong> - with</li>
<li><strong>nach</strong> - after/to</li>
<li><strong>von</strong> - from/of</li>
<li><strong>zu</strong> - to</li>
</ul>

<p><strong>Example:</strong> Ich komme <strong>aus</strong> <strong>dem</strong> Haus. (I come out of the house.)</p>

<h3>Dative Verbs</h3>

<p>Some verbs always take dative objects:</p>

<ul>
<li><strong>helfen</strong> - to help (Ich helfe <strong>dem</strong> Mann.)</li>
<li><strong>danken</strong> - to thank (Ich danke <strong>dir</strong>.)</li>
<li><strong>gefallen</strong> - to like (Das gefällt <strong>mir</strong>.)</li>
</ul>

<hr/>

<h2>Case 4: Genitive (Wessen?)</h2>

<p>The genitive case shows <strong>possession</strong> or <strong>relationship</strong>.</p>

<h3>Genitive Articles</h3>

<table>
<thead>
<tr>
<th>Definite Articles</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Nominative</strong></td>
<td>der → <strong>des</strong></td>
<td>die → <strong>der</strong></td>
<td>das → <strong>des</strong></td>
<td>die → <strong>der</strong></td>
</tr>
<tr>
<td><strong>Genitive</strong></td>
<td>des</td>
<td>der</td>
<td>des</td>
<td>der</td>
</tr>
</tbody>
</table>

<h3>Genitive Examples</h3>

<ul>
<li>Das ist das Auto <strong>des Mannes</strong>. (That's the man's car.)</li>
<li>Die Tasche <strong>der Frau</strong> ist schön. (The woman's bag is beautiful.)</li>
<li>Das Haus <strong>des Kindes</strong> ist groß. (The child's house is big.)</li>
<li>Die Bücher <strong>der Studenten</strong> sind teuer. (The students' books are expensive.)</li>
</ul>

<p><strong>Note:</strong> In spoken German, people often use "von + dative" instead of genitive: Das Auto <strong>von dem Mann</strong>.</p>

<hr/>

<h2>Complete Article Table</h2>

<table>
<thead>
<tr>
<th>Case</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Nominative</strong></td>
<td>der/ein</td>
<td>die/eine</td>
<td>das/ein</td>
<td>die/- (no article)</td>
</tr>
<tr>
<td><strong>Accusative</strong></td>
<td>den/einen</td>
<td>die/eine</td>
<td>das/ein</td>
<td>die/-</td>
</tr>
<tr>
<td><strong>Dative</strong></td>
<td>dem/einem</td>
<td>der/einer</td>
<td>dem/einem</td>
<td>den/-</td>
</tr>
<tr>
<td><strong>Genitive</strong></td>
<td>des/eines</td>
<td>der/einer</td>
<td>des/eines</td>
<td>der/-</td>
</tr>
</tbody>
</table>

<hr/>

<h2>Practice Exercises</h2>

<h3>Exercise 1: Fill in the correct articles</h3>

<ol>
<li>Ich sehe ___ (the) Mann.</li>
<li>Sie gibt ___ (the) Frau ___ (a) Buch.</li>
<li>Das ist ___ (the) Auto ___ (of the) Studentin.</li>
<li>Wir helfen ___ (the) Kindern.</li>
<li>Er kommt aus ___ (the) Haus.</li>
</ol>

<details>
<summary>Show Answers</summary>
<ol>
<li>Ich sehe <strong>den</strong> Mann. (accusative)</li>
<li>Sie gibt <strong>der</strong> Frau <strong>ein</strong> Buch. (dative + accusative)</li>
<li>Das ist das Auto <strong>der</strong> Studentin. (genitive)</li>
<li>Wir helfen <strong>den</strong> Kindern. (dative)</li>
<li>Er kommt aus <strong>dem</strong> Haus. (dative preposition)</li>
</ol>
</details>

<h3>Exercise 2: Identify the cases</h3>

<p>In this sentence: "Der Mann gibt der Frau das Buch des Kindes."</p>

<ul>
<li>Der Mann = ?</li>
<li>der Frau = ?</li>
<li>das Buch = ?</li>
<li>des Kindes = ?</li>
</ul>

<details>
<summary>Show Answers</summary>
<ul>
<li>Der Mann = <strong>Nominative</strong> (subject)</li>
<li>der Frau = <strong>Dative</strong> (indirect object)</li>
<li>das Buch = <strong>Accusative</strong> (direct object)</li>
<li>des Kindes = <strong>Genitive</strong> (possession)</li>
</ul>
</details>

<hr/>

<h2>Common Mistakes to Avoid</h2>

<ul>
<li>❌ Using nominative articles everywhere</li>
<li>❌ Forgetting dative plural is "den"</li>
<li>❌ Mixing up "der" (dative feminine) and "die" (nominative feminine)</li>
<li>❌ Not recognizing preposition case triggers</li>
</ul>

<hr/>

<h2>Pro Tips for Learning Cases</h2>

<ul>
<li><strong>Start with accusative:</strong> It's the easiest case to learn</li>
<li><strong>Learn preposition groups:</strong> Accusative vs Dative prepositions</li>
<li><strong>Use colors:</strong> Mark nouns with different colors for each case</li>
<li><strong>Practice daily:</strong> Write 5 sentences using different cases</li>
<li><strong>Don't worry about genitive initially:</strong> It's less common in spoken German</li>
</ul>

<p><strong>Remember:</strong> Cases are like word roles in a play. Each word has a specific job, and the article shows what that job is!</p>

<p>Ready to practice? Try our <a href="/quiz" class="text-primary hover:underline font-bold">case quizzes</a> or continue with <a href="/a1" class="text-primary hover:underline font-bold">vocabulary practice</a>.</p>

</article>`,
    date: "2026-02-08",
    readTime: "15 min read",
    category: "Grammar",
    keywords: ["german cases explained","nominative accusative dative genitive","german articles cases","learn german cases A1","german grammar cases","wer wen wem"],
  },
  "german-pronouns-personal-possessive-demonstrative": {
    title: "German Pronouns: Personal, Possessive & Demonstrative (A1 Guide 2026)",
    excerpt: "Master German pronouns with complete conjugation tables, case changes, and practical examples. Learn personal pronouns (ich/du/er), possessive pronouns (mein/dein/sein), and demonstrative pronouns (dieser/jener).",
    content: `<article class="prose prose-lg dark:prose-invert max-w-4xl mx-auto">

<div class="not-prose mb-8">
  <span class="text-sm font-semibold text-primary">A1 Beginner Level Grammar</span>
</div>

<h1>German Pronouns: Personal, Possessive & Demonstrative</h1>

<p>Pronouns replace nouns to make sentences smoother and avoid repetition. German pronouns change their form based on <strong>case</strong>, <strong>gender</strong>, and <strong>number</strong>. Don't worry - we'll break it down step by step!</p>

<p>By the end of this guide, you'll be using pronouns like a native speaker. Let's start! 🚀</p>

<hr/>

<h2>Personal Pronouns (Personalpronomen)</h2>

<p>Personal pronouns replace people or things. They change form in different cases.</p>

<h3>Personal Pronouns in All Cases</h3>

<table>
<thead>
<tr>
<th>English</th>
<th>Nominative</th>
<th>Accusative</th>
<th>Dative</th>
<th>Genitive</th>
</tr>
</thead>
<tbody>
<tr>
<td>I</td>
<td>ich</td>
<td>mich</td>
<td>mir</td>
<td>meiner</td>
</tr>
<tr>
<td>you (informal)</td>
<td>du</td>
<td>dich</td>
<td>dir</td>
<td>deiner</td>
</tr>
<tr>
<td>he/it</td>
<td>er</td>
<td>ihn</td>
<td>ihm</td>
<td>seiner</td>
</tr>
<tr>
<td>she/it</td>
<td>sie</td>
<td>sie</td>
<td>ihr</td>
<td>ihrer</td>
</tr>
<tr>
<td>we</td>
<td>wir</td>
<td>uns</td>
<td>uns</td>
<td>unser</td>
</tr>
<tr>
<td>you (plural)</td>
<td>ihr</td>
<td>euch</td>
<td>euch</td>
<td>euer</td>
</tr>
<tr>
<td>you (formal)</td>
<td>Sie</td>
<td>Sie</td>
<td>Ihnen</td>
<td>Ihrer</td>
</tr>
<tr>
<td>they</td>
<td>sie</td>
<td>sie</td>
<td>ihnen</td>
<td>ihrer</td>
</tr>
</tbody>
</table>

<h3>Examples in Context</h3>

<ul>
<li><strong>Nominative:</strong> <strong>Ich</strong> esse einen Apfel. (I eat an apple.)</li>
<li><strong>Accusative:</strong> Sie sieht <strong>mich</strong>. (She sees me.)</li>
<li><strong>Dative:</strong> Er gibt <strong>mir</strong> ein Buch. (He gives me a book.)</li>
<li><strong>Genitive:</strong> Das ist <strong>meiner</strong>. (That's mine.)</li>
</ul>

<hr/>

<h2>Possessive Pronouns (Possessivpronomen)</h2>

<p>Possessive pronouns show ownership: my, your, his, her, etc. They change according to the noun they describe (gender, case, number).</p>

<h3>Possessive Pronouns in Nominative</h3>

<table>
<thead>
<tr>
<th>English</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td>my</td>
<td>mein</td>
<td>meine</td>
<td>mein</td>
<td>meine</td>
</tr>
<tr>
<td>your (informal)</td>
<td>dein</td>
<td>deine</td>
<td>dein</td>
<td>deine</td>
</tr>
<tr>
<td>his/its</td>
<td>sein</td>
<td>seine</td>
<td>sein</td>
<td>seine</td>
</tr>
<tr>
<td>her/their</td>
<td>ihr</td>
<td>ihre</td>
<td>ihr</td>
<td>ihre</td>
</tr>
<tr>
<td>our</td>
<td>unser</td>
<td>unsere</td>
<td>unser</td>
<td>unsere</td>
</tr>
<tr>
<td>your (plural)</td>
<td>euer</td>
<td>euere/eure</td>
<td>euer</td>
<td>euere/eure</td>
</tr>
<tr>
<td>your (formal)</td>
<td>Ihr</td>
<td>Ihre</td>
<td>Ihr</td>
<td>Ihre</td>
</tr>
<tr>
<td>their</td>
<td>ihr</td>
<td>ihre</td>
<td>ihr</td>
<td>ihre</td>
</tr>
</tbody>
</table>

<h3>Possessive Pronouns in Other Cases</h3>

<p>Possessive pronouns change in accusative and dative just like definite articles!</p>

<table>
<thead>
<tr>
<th>Case</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Accusative</strong></td>
<td>meinen</td>
<td>meine</td>
<td>mein</td>
<td>meine</td>
</tr>
<tr>
<td><strong>Dative</strong></td>
<td>meinem</td>
<td>meiner</td>
<td>meinem</td>
<td>meinen</td>
</tr>
</tbody>
</table>

<h3>Examples</h3>

<ul>
<li><strong>Mein</strong> Buch ist interessant. (My book is interesting.)</li>
<li>Ich sehe <strong>deine</strong> Schwester. (I see your sister.)</li>
<li>Er gibt <strong>seinem</strong> Bruder ein Geschenk. (He gives his brother a gift.)</li>
<li>Das ist <strong>unsere</strong> Katze. (That's our cat.)</li>
<li>Wo ist <strong>euer</strong> Haus? (Where is your house?)</li>
</ul>

<hr/>

<h2>Demonstrative Pronouns (Demonstrativpronomen)</h2>

<p>Demonstrative pronouns point to specific things: this, that, these, those.</p>

<h3>Dieser (this/these) - Near Objects</h3>

<table>
<thead>
<tr>
<th>Case</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nominative</td>
<td>dieser</td>
<td>diese</td>
<td>dieses</td>
<td>diese</td>
</tr>
<tr>
<td>Accusative</td>
<td>diesen</td>
<td>diese</td>
<td>dieses</td>
<td>diese</td>
</tr>
<tr>
<td>Dative</td>
<td>diesem</td>
<td>dieser</td>
<td>diesem</td>
<td>diesen</td>
</tr>
<tr>
<td>Genitive</td>
<td>dieses</td>
<td>dieser</td>
<td>dieses</td>
<td>dieser</td>
</tr>
</tbody>
</table>

<h3>Jener (that/those) - Far Objects</h3>

<table>
<thead>
<tr>
<th>Case</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nominative</td>
<td>jener</td>
<td>jene</td>
<td>jenes</td>
<td>jene</td>
</tr>
<tr>
<td>Accusative</td>
<td>jenen</td>
<td>jene</td>
<td>jenes</td>
<td>jene</td>
</tr>
<tr>
<td>Dative</td>
<td>jenem</td>
<td>jener</td>
<td>jenem</td>
<td>jenen</td>
</tr>
<tr>
<td>Genitive</td>
<td>jenes</td>
<td>jener</td>
<td>jenes</td>
<td>jener</td>
</tr>
</tbody>
</table>

<h3>Examples</h3>

<ul>
<li><strong>Dieser</strong> Mann ist mein Bruder. (This man is my brother.)</li>
<li>Ich mag <strong>diese</strong> Musik. (I like this music.)</li>
<li><strong>Jenes</strong> Haus ist alt. (That house is old.)</li>
<li>Wo sind <strong>diese</strong> Bücher? (Where are these books?)</li>
</ul>

<hr/>

<h2>Special Pronouns</h2>

<h3>Indefinite Pronouns</h3>

<ul>
<li><strong>man</strong> - one/you (impersonal): <strong>Man</strong> muss früh aufstehen. (One must get up early.)</li>
<li><strong>es</strong> - it (weather/time): <strong>Es</strong> regnet. (It's raining.)</li>
<li><strong>etwas</strong> - something: Ich brauche <strong>etwas</strong> zu trinken. (I need something to drink.)</li>
<li><strong>nichts</strong> - nothing: Ich sehe <strong>nichts</strong>. (I see nothing.)</li>
</ul>

<h3>Interrogative Pronouns (Question Words)</h3>

<ul>
<li><strong>wer</strong> - who: <strong>Wer</strong> bist du? (Who are you?)</li>
<li><strong>was</strong> - what: <strong>Was</strong> machst du? (What are you doing?)</li>
<li><strong>wen</strong> - whom (accusative): <strong>Wen</strong> siehst du? (Whom do you see?)</li>
<li><strong>wem</strong> - to whom (dative): <strong>Wem</strong> gibst du das? (To whom are you giving that?)</li>
<li><strong>wo</strong> - where: <strong>Wo</strong> wohnst du? (Where do you live?)</li>
</ul>

<hr/>

<h2>Practice Exercises</h2>

<h3>Exercise 1: Replace nouns with pronouns</h3>

<ol>
<li>Anna sieht den Film. → Anna sieht ___ .</li>
<li>Ich gebe dem Mann das Buch. → Ich gebe ___ das Buch.</li>
<li>Das ist das Auto von Maria. → Das ist ___ Auto.</li>
<li>Peter und Lisa essen Pizza. → ___ essen Pizza.</li>
</ol>

<details>
<summary>Show Answers</summary>
<ol>
<li>Anna sieht <strong>ihn</strong>. (accusative)</li>
<li>Ich gebe <strong>ihm</strong> das Buch. (dative)</li>
<li>Das ist <strong>ihr</strong> Auto. (possessive)</li>
<li><strong>Sie</strong> essen Pizza. (personal plural)</li>
</ol>
</details>

<h3>Exercise 2: Choose the correct possessive pronoun</h3>

<ol>
<li>Das ist ___ Buch. (my)</li>
<li>Wo ist ___ Schwester? (your informal)</li>
<li>___ Haus ist groß. (his)</li>
<li>Wir mögen ___ Katze. (our)</li>
</ol>

<details>
<summary>Show Answers</summary>
<ol>
<li>Das ist <strong>mein</strong> Buch.</li>
<li>Wo ist <strong>deine</strong> Schwester?</li>
<li><strong>Sein</strong> Haus ist groß.</li>
<li>Wir mögen <strong>unsere</strong> Katze.</li>
</ol>
</details>

<hr/>

<h2>Common Mistakes</h2>

<ul>
<li>❌ Using "sie" for both "she" and "they"</li>
<li>❌ Forgetting pronoun case changes</li>
<li>❌ Mixing up "mein/meine/meinen" endings</li>
<li>❌ Using "ihr" (her) instead of "ihr" (their)</li>
<li>❌ Confusing "dieser" (this) and "jener" (that)</li>
</ul>

<hr/>

<h2>Learning Tips</h2>

<ul>
<li><strong>Learn in pairs:</strong> Always learn pronoun + verb together</li>
<li><strong>Use colors:</strong> Color-code different pronoun types</li>
<li><strong>Practice daily:</strong> Replace nouns with pronouns in conversations</li>
<li><strong>Start with nominative:</strong> Then add accusative, then dative</li>
<li><strong>Make flashcards:</strong> Front = English, Back = German in all cases</li>
</ul>

<p><strong>Pro Tip:</strong> Pronouns are like actors in a play - they change their "costume" (form) depending on their "role" (case)!</p>

<p>Ready to practice? Try our <a href="/quiz" class="text-primary hover:underline font-bold">pronoun quizzes</a> or review <a href="/blog/german-cases-nominative-accusative-dative-genitive" class="text-primary hover:underline font-bold">German cases</a> for more context.</p>

</article>`,
    date: "2026-02-09",
    readTime: "11 min read",
    category: "Grammar",
    keywords: ["german pronouns explained","personal pronouns german","possessive pronouns german","demonstrative pronouns dieser jener","learn german pronouns A1","ich du er sie pronouns"],
  },
  "german-negation-nicht-kein-nirgendwo": {
    title: "German Negation: Nicht, Kein, Nirgendwo & More (A1 Guide 2026)",
    excerpt: "Master German negation with clear rules for nicht, kein, nie, nichts, and niemand. Learn word order, double negatives, and common mistakes in negative sentences.",
    content: `<article class="prose prose-lg dark:prose-invert max-w-4xl mx-auto">

<div class="not-prose mb-8">
  <span class="text-sm font-semibold text-primary">A1 Beginner Level Grammar</span>
</div>

<h1>German Negation: Nicht, Kein, Nirgendwo & Negative Words</h1>

<p>Making negative sentences in German is different from English. Instead of just adding "not", German uses different negative words depending on what you're negating. Plus, word order changes!</p>

<p>This guide will make German negation crystal clear with simple rules and lots of examples. Let's turn that frown upside down! 😊</p>

<hr/>

<h2>The Two Main Negative Words</h2>

<p>German has two main ways to make sentences negative:</p>

<h3>1. Nicht (not) - For Verbs and General Negation</h3>

<p>Use <strong>nicht</strong> to negate:</p>
<ul>
<li>Verbs: Ich esse <strong>nicht</strong>. (I don't eat.)</li>
<li>Adjectives: Das ist <strong>nicht</strong> schön. (That's not beautiful.)</li>
<li>Adverbs: Er kommt <strong>nicht</strong> schnell. (He doesn't come quickly.)</li>
<li>Prepositional phrases: Ich gehe <strong>nicht</strong> ins Kino. (I'm not going to the cinema.)</li>
</ul>

<h3>2. Kein (no/not a) - For Nouns</h3>

<p>Use <strong>kein</strong> to negate nouns. It changes like an indefinite article:</p>

<table>
<thead>
<tr>
<th>Case</th>
<th>Masculine</th>
<th>Feminine</th>
<th>Neuter</th>
<th>Plural</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nominative</td>
<td>kein</td>
<td>keine</td>
<td>kein</td>
<td>keine</td>
</tr>
<tr>
<td>Accusative</td>
<td>keinen</td>
<td>keine</td>
<td>kein</td>
<td>keine</td>
</tr>
<tr>
<td>Dative</td>
<td>keinem</td>
<td>keiner</td>
<td>keinem</td>
<td>keinen</td>
</tr>
<tr>
<td>Genitive</td>
<td>keines</td>
<td>keiner</td>
<td>keines</td>
<td>keiner</td>
</tr>
</tbody>
</table>

<h3>Kein Examples</h3>

<ul>
<li>Ich habe <strong>kein</strong> Auto. (I don't have a car.)</li>
<li>Sie trinkt <strong>keinen</strong> Kaffee. (She doesn't drink coffee.)</li>
<li>Das ist <strong>keine</strong> Katze. (That's not a cat.)</li>
<li>Wir haben <strong>keine</strong> Zeit. (We don't have time.)</li>
</ul>

<hr/>

<h2>Word Order with Negation</h2>

<p>Word order is crucial in German negative sentences!</p>

<h3>Statement Word Order</h3>

<ul>
<li>✅ Subject + Verb + <strong>nicht</strong> + Other elements</li>
<li>❌ Subject + <strong>Nicht</strong> + Verb + Other elements</li>
</ul>

<p><strong>Examples:</strong></p>
<ul>
<li>Ich esse <strong>nicht</strong>. (I don't eat.)</li>
<li>Er kommt <strong>nicht</strong> heute. (He doesn't come today.)</li>
<li>Sie arbeitet <strong>nicht</strong> hier. (She doesn't work here.)</li>
</ul>

<h3>Question Word Order</h3>

<ul>
<li>✅ Verb + Subject + <strong>nicht</strong> + Other elements</li>
</ul>

<p><strong>Examples:</strong></p>
<ul>
<li>Isst du <strong>nicht</strong>? (Don't you eat?)</li>
<li>Kommt er <strong>nicht</strong> heute? (Isn't he coming today?)</li>
</ul>

<hr/>

<h2>Other Negative Words</h2>

<h3>Time Negatives</h3>

<ul>
<li><strong>nie</strong> - never: Ich gehe <strong>nie</strong> ins Kino. (I never go to the cinema.)</li>
<li><strong>niemals</strong> - never (more formal): Das mache ich <strong>niemals</strong>. (I never do that.)</li>
<li><strong>nicht mehr</strong> - no longer/not anymore: Ich rauche <strong>nicht mehr</strong>. (I don't smoke anymore.)</li>
</ul>

<h3>Place Negatives</h3>

<ul>
<li><strong>nirgendwo</strong> - nowhere: Ich gehe <strong>nirgendwo</strong> hin. (I'm not going anywhere.)</li>
<li><strong>nirgends</strong> - nowhere (less common): Das gibt es <strong>nirgends</strong>. (That doesn't exist anywhere.)</li>
</ul>

<h3>Thing/Person Negatives</h3>

<ul>
<li><strong>nichts</strong> - nothing: Ich sehe <strong>nichts</strong>. (I see nothing.)</li>
<li><strong>niemand</strong> - nobody/no one: <strong>Niemand</strong> ist da. (Nobody is there.)</li>
<li><strong>keiner</strong> - none/nobody: <strong>Keiner</strong> weiß das. (Nobody knows that.)</li>
</ul>

<h3>Other Negatives</h3>

<ul>
<li><strong>weder...noch</strong> - neither...nor: <strong>Weder</strong> Tee <strong>noch</strong> Kaffee. (Neither tea nor coffee.)</li>
<li><strong>nicht einmal</strong> - not even: <strong>Nicht einmal</strong> du! (Not even you!)</li>
<li><strong>gar nicht</strong> - not at all: Das schmeckt <strong>gar nicht</strong>. (That doesn't taste good at all.)</li>
</ul>

<hr/>

<h2>Double Negatives (Common Mistake!)</h2>

<p>⚠️ <strong>German doesn't use double negatives like English!</strong></p>

<ul>
<li>❌ Ich habe <strong>kein</strong> Geld <strong>nicht</strong>. (Don't say this!)</li>
<li>✅ Ich habe <strong>kein</strong> Geld. (I have no money.)</li>
</ul>

<p>More examples:</p>
<ul>
<li>❌ Er sieht <strong>nichts nicht</strong>.</li>
<li>✅ Er sieht <strong>nichts</strong>. (He sees nothing.)</li>
</ul>

<hr/>

<h2>Position of Nicht</h2>

<p>The position of <strong>nicht</strong> changes the meaning!</p>

<h3>1. Nicht + Verb = Complete Negation</h3>

<ul>
<li>Ich esse <strong>nicht</strong>. (I don't eat. - at all)</li>
<li>Er kommt <strong>nicht</strong>. (He doesn't come. - at all)</li>
</ul>

<h3>2. Nicht + Specific Word = Partial Negation</h3>

<ul>
<li>Ich esse <strong>nicht</strong> Fleisch. (I don't eat meat. - but I eat other things)</li>
<li>Er kommt <strong>nicht</strong> heute. (He doesn't come today. - but maybe tomorrow)</li>
</ul>

<h3>3. Nicht + Prepositional Phrase</h3>

<ul>
<li>Ich gehe <strong>nicht</strong> ins Kino. (I'm not going to the cinema.)</li>
<li>Sie arbeitet <strong>nicht</strong> in Berlin. (She doesn't work in Berlin.)</li>
</ul>

<hr/>

<h2>Common Patterns</h2>

<h3>With Modal Verbs</h3>

<ul>
<li>Ich <strong>kann nicht</strong> kommen. (I can't come.)</li>
<li>Du <strong>darfst nicht</strong> rauchen. (You mustn't smoke.)</li>
<li>Sie <strong>muss nicht</strong> arbeiten. (She doesn't have to work.)</li>
</ul>

<h3>With Separable Verbs</h3>

<ul>
<li>Ich stehe <strong>nicht</strong> auf. (I don't get up.)</li>
<li>Sie ruft <strong>nicht</strong> an. (She doesn't call.)</li>
</ul>

<h3>With Perfect Tense</h3>

<ul>
<li>Ich habe <strong>nicht</strong> gegessen. (I haven't eaten.)</li>
<li>Er ist <strong>nicht</strong> gekommen. (He hasn't come.)</li>
</ul>

<hr/>

<h2>Practice Exercises</h2>

<h3>Exercise 1: Make negative</h3>

<ol>
<li>Ich esse Fleisch. → Ich esse ___ Fleisch.</li>
<li>Sie hat Geld. → Sie hat ___ Geld.</li>
<li>Wir gehen ins Kino. → Wir gehen ___ ins Kino.</li>
<li>Er trinkt Kaffee. → Er trinkt ___ Kaffee.</li>
<li>Du kommst heute. → Du kommst ___ heute.</li>
</ol>

<details>
<summary>Show Answers</summary>
<ol>
<li>Ich esse <strong>nicht</strong> Fleisch.</li>
<li>Sie hat <strong>kein</strong> Geld.</li>
<li>Wir gehen <strong>nicht</strong> ins Kino.</li>
<li>Er trinkt <strong>keinen</strong> Kaffee.</li>
<li>Du kommst <strong>nicht</strong> heute.</li>
</ol>
</details>

<h3>Exercise 2: Correct the mistakes</h3>

<ol>
<li>Ich habe kein Geld nicht.</li>
<li>Sie kommt nicht heute nicht.</li>
<li>Er sieht nichts nicht.</li>
<li>Wir haben keine Zeit nicht.</li>
</ol>

<details>
<summary>Show Answers</summary>
<ol>
<li>Ich habe <strong>kein</strong> Geld.</li>
<li>Sie kommt <strong>nicht</strong> heute.</li>
<li>Er sieht <strong>nichts</strong>.</li>
<li>Wir haben <strong>keine</strong> Zeit.</li>
</ol>
</details>

<hr/>

<h2>Common Mistakes to Avoid</h2>

<ul>
<li>❌ Using double negatives</li>
<li>❌ Putting "nicht" in the wrong position</li>
<li>❌ Using "nicht" instead of "kein" with nouns</li>
<li>❌ Forgetting "kein" changes in cases</li>
<li>❌ Saying "no" instead of using proper negation</li>
</ul>

<hr/>

<h2>Quick Learning Tips</h2>

<ul>
<li><strong>Remember the rule:</strong> kein = nouns, nicht = everything else</li>
<li><strong>Practice word order:</strong> Subject + Verb + nicht</li>
<li><strong>Use "kein" like "ein":</strong> It changes the same way</li>
<li><strong>Avoid English logic:</strong> Don't translate "I don't have no money"</li>
<li><strong>Start simple:</strong> Master nicht and kein first, then add others</li>
</ul>

<p><strong>Fun Fact:</strong> German negation is actually more logical than English - you always know exactly what's being negated!</p>

<p>Ready to practice? Try our <a href="/quiz" class="text-primary hover:underline font-bold">negation quizzes</a> or review <a href="/blog/german-verbs-conjugation-present-past" class="text-primary hover:underline font-bold">verb conjugation</a> to combine with negation.</p>

</article>`,
    date: "2026-02-10",
    readTime: "10 min read",
    category: "Grammar",
    keywords: ["german negation explained","nicht kein rules","german negative words","learn german negation A1","nichts niemand nirgendwo","german double negatives"],
  },
  "german-prepositions-with-cases-a1-guide": {
    title: "German Prepositions: Complete Guide with Cases (A1-B1 Guide 2026)",
    excerpt: "Master German prepositions with clear case rules, examples, and memory tricks. Learn accusative prepositions (für, um, durch), dative prepositions (aus, bei, mit), and two-way prepositions (in, auf, an).",
    content: `<article class="prose prose-lg dark:prose-invert max-w-4xl mx-auto">

<div class="not-prose mb-8">
  <span class="text-sm font-semibold text-primary">A1-B1 Intermediate Grammar</span>
</div>

<h1>German Prepositions: Complete Guide with Cases</h1>

<p>Prepositions are the "glue" words that connect other words in sentences. In German, prepositions determine which <strong>case</strong> the following noun must use. This can be tricky, but we'll break it down with clear categories and memory tricks!</p>

<p>By the end, you'll know exactly which case to use with any preposition. Let's get started! 🎯</p>

<hr/>

<h2>How Prepositions Work</h2>

<p>German prepositions are divided into three main groups based on which case they require:</p>

<ul>
<li><strong>Accusative prepositions</strong> - always trigger accusative case</li>
<li><strong>Dative prepositions</strong> - always trigger dative case</li>
<li><strong>Two-way prepositions</strong> - change case based on meaning (accusative for motion, dative for location)</li>
</ul>

<p><strong>Important:</strong> The preposition itself doesn't change - only the article/noun after it!</p>

<hr/>

<h2>Accusative Prepositions (Always Accusative)</h2>

<p>These 5 prepositions ALWAYS use accusative case:</p>

<h3>1. Durch (through)</h3>
<ul>
<li>Ich gehe <strong>durch den Park</strong>. (I walk through the park.)</li>
<li>Das Licht kommt <strong>durch das Fenster</strong>. (The light comes through the window.)</li>
</ul>

<h3>2. Für (for)</h3>
<ul>
<li>Das Geschenk ist <strong>für dich</strong>. (The gift is for you.)</li>
<li>Ich kaufe Blumen <strong>für meine Mutter</strong>. (I buy flowers for my mother.)</li>
</ul>

<h3>3. Gegen (against/towards)</h3>
<ul>
<li>Er lehnt <strong>gegen die Wand</strong>. (He leans against the wall.)</li>
<li>Wir spielen <strong>gegen die andere Mannschaft</strong>. (We play against the other team.)</li>
</ul>

<h3>4. Ohne (without)</h3>
<ul>
<li>Ich trinke Kaffee <strong>ohne Zucker</strong>. (I drink coffee without sugar.)</li>
<li>Sie geht <strong>ohne ihren Mann</strong>. (She goes without her husband.)</li>
</ul>

<h3>5. Um (around/at)</h3>
<ul>
<li>Die Kinder sitzen <strong>um den Tisch</strong>. (The children sit around the table.)</li>
<li>Das Konzert beginnt <strong>um 8 Uhr</strong>. (The concert starts at 8 o'clock.)</li>
</ul>

<p><strong>Memory Trick:</strong> "D-F-G-O-U" - Durch, Für, Gegen, Ohne, Um</p>

<hr/>

<h2>Dative Prepositions (Always Dative)</h2>

<p>These 9 prepositions ALWAYS use dative case:</p>

<h3>1. Aus (out of/from)</h3>
<ul>
<li>Ich komme <strong>aus dem Haus</strong>. (I come out of the house.)</li>
<li>Er ist <strong>aus Deutschland</strong>. (He is from Germany.)</li>
</ul>

<h3>2. Bei (at/by/with)</h3>
<ul>
<li>Ich wohne <strong>bei meinen Eltern</strong>. (I live with my parents.)</li>
<li>Sie arbeitet <strong>bei einer Bank</strong>. (She works at a bank.)</li>
</ul>

<h3>3. Mit (with)</h3>
<ul>
<li>Ich komme <strong>mit dem Auto</strong>. (I come by car.)</li>
<li>Er spielt <strong>mit seinem Bruder</strong>. (He plays with his brother.)</li>
</ul>

<h3>4. Nach (after/to)</h3>
<ul>
<li><strong>Nach dem Essen</strong> gehen wir spazieren. (After eating, we go for a walk.)</li>
<li>Ich fliege <strong>nach Berlin</strong>. (I'm flying to Berlin.)</li>
</ul>

<h3>5. Seit (since)</h3>
<ul>
<li>Ich wohne hier <strong>seit einem Jahr</strong>. (I've lived here for a year.)</li>
<li>Sie arbeitet dort <strong>seit 2010</strong>. (She has worked there since 2010.)</li>
</ul>

<h3>6. Von (from/of)</h3>
<ul>
<li>Das Buch ist <strong>von Goethe</strong>. (The book is by Goethe.)</li>
<li>Ich komme <strong>von der Arbeit</strong>. (I come from work.)</li>
</ul>

<h3>7. Zu (to)</h3>
<ul>
<li>Ich gehe <strong>zu meinen Freunden</strong>. (I go to my friends' place.)</li>
<li>Er kommt <strong>zum Arzt</strong>. (He goes to the doctor.)</li>
</ul>

<h3>8. Außer (except)</h3>
<ul>
<li><strong>Außer dir</strong> kommt niemand. (Except you, no one is coming.)</li>
<li>Alle <strong>außer ihm</strong> sind da. (Everyone except him is there.)</li>
</ul>

<h3>9. Entgegen (against/towards - formal)</h3>
<ul>
<li><strong>Entgegen meinen Erwartungen</strong> kam er. (Contrary to my expectations, he came.)</li>
</ul>

<p><strong>Memory Trick:</strong> "A-B-M-N-S-V-Z-A-E" - Aus, Bei, Mit, Nach, Seit, Von, Zu, Außer, Entgegen</p>

<hr/>

<h2>Two-Way Prepositions (Accusative or Dative)</h2>

<p>These prepositions use <strong>accusative</strong> for motion/direction and <strong>dative</strong> for location/position:</p>

<h3>1. In (in/into)</h3>
<ul>
<li><strong>Location:</strong> Ich bin <strong>in dem Zimmer</strong>. (I am in the room.) <em>→ dative</em></li>
<li><strong>Motion:</strong> Ich gehe <strong>in das Zimmer</strong>. (I go into the room.) <em>→ accusative</em></li>
</ul>

<h3>2. Auf (on/onto)</h3>
<ul>
<li><strong>Location:</strong> Das Buch liegt <strong>auf dem Tisch</strong>. (The book is on the table.) <em>→ dative</em></li>
<li><strong>Motion:</strong> Ich lege das Buch <strong>auf den Tisch</strong>. (I put the book on the table.) <em>→ accusative</em></li>
</ul>

<h3>3. An (at/to)</h3>
<ul>
<li><strong>Location:</strong> Er steht <strong>an der Tür</strong>. (He stands at the door.) <em>→ dative</em></li>
<li><strong>Motion:</strong> Er geht <strong>an die Tür</strong>. (He goes to the door.) <em>→ accusative</em></li>
</ul>

<h3>4. Über (over/above)</h3>
<ul>
<li><strong>Location:</strong> Die Lampe hängt <strong>über dem Tisch</strong>. (The lamp hangs over the table.) <em>→ dative</em></li>
<li><strong>Motion:</strong> Ich springe <strong>über den Graben</strong>. (I jump over the ditch.) <em>→ accusative</em></li>
</ul>

<h3>5. Unter (under/below)</h3>
<ul>
<li><strong>Location:</strong> Die Katze sitzt <strong>unter dem Tisch</strong>. (The cat sits under the table.) <em>→ dative</em></li>
<li><strong>Motion:</strong> Die Katze läuft <strong>unter den Tisch</strong>. (The cat runs under the table.) <em>→ accusative</em></li>
</ul>

<h3>6. Vor (in front of/before)</h3>
<ul>
<li><strong>Location:</strong> Er steht <strong>vor dem Haus</strong>. (He stands in front of the house.) <em>→ dative</em></li>
<li><strong>Motion:</strong> Er geht <strong>vor das Haus</strong>. (He goes in front of the house.) <em>→ accusative</em></li>
</ul>

<h3>7. Hinter (behind)</h3>
<ul>
<li><strong>Location:</strong> Das Auto parkt <strong>hinter dem Haus</strong>. (The car parks behind the house.) <em>→ dative</em></li>
<li><strong>Motion:</strong> Das Auto fährt <strong>hinter das Haus</strong>. (The car drives behind the house.) <em>→ accusative</em></li>
</ul>

<h3>8. Neben (next to)</h3>
<ul>
<li><strong>Location:</strong> Sie sitzt <strong>neben mir</strong>. (She sits next to me.) <em>→ dative</em></li>
<li><strong>Motion:</strong> Sie setzt sich <strong>neben mich</strong>. (She sits down next to me.) <em>→ accusative</em></li>
</ul>

<h3>9. Zwischen (between)</h3>
<ul>
<li><strong>Location:</strong> Das Buch liegt <strong>zwischen den Seiten</strong>. (The book lies between the pages.) <em>→ dative</em></li>
<li><strong>Motion:</strong> Ich stelle das Buch <strong>zwischen die Seiten</strong>. (I put the book between the pages.) <em>→ accusative</em></li>
</ul>

<p><strong>Memory Trick:</strong> "I-A-Ü-U-V-H-N-Z" - In, Auf, Über, Unter, Vor, Hinter, Neben, Zwischen</p>

<hr/>

<h2>Contractions with Two-Way Prepositions</h2>

<p>Two-way prepositions often contract with definite articles:</p>

<table>
<thead>
<tr>
<th>Preposition</th>
<th>dem →</th>
<th>das →</th>
<th>der →</th>
<th>den →</th>
</tr>
</thead>
<tbody>
<tr>
<td>in</td>
<td>im</td>
<td>ins</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td>an</td>
<td>am</td>
<td>ans</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td>auf</td>
<td>—</td>
<td>aufs</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td>zu</td>
<td>zum</td>
<td>zur</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td>von</td>
<td>vom</td>
<td>—</td>
<td>—</td>
<td>—</td>
</tr>
</tbody>
</table>

<p><strong>Examples:</strong></p>
<ul>
<li>in dem → im Haus (in the house)</li>
<li>in das → ins Haus (into the house)</li>
<li>zu dem → zum Arzt (to the doctor)</li>
<li>zu der → zur Schule (to school)</li>
</ul>

<hr/>

<h2>Practice Exercises</h2>

<h3>Exercise 1: Choose the correct case</h3>

<ol>
<li>Ich gehe ___ (through) ___ Park.</li>
<li>Sie wohnt ___ (with) ___ Eltern.</li>
<li>Das Buch liegt ___ (on) ___ Tisch.</li>
<li>Er kommt ___ (from) ___ Arbeit.</li>
<li>Wir fahren ___ (to) ___ Stadt.</li>
</ol>

<details>
<summary>Show Answers</summary>
<ol>
<li>Ich gehe <strong>durch den</strong> Park. (accusative)</li>
<li>Sie wohnt <strong>bei den</strong> Eltern. (dative)</li>
<li>Das Buch liegt <strong>auf dem</strong> Tisch. (dative - location)</li>
<li>Er kommt <strong>von der</strong> Arbeit. (dative)</li>
<li>Wir fahren <strong>in die</strong> Stadt. (accusative - motion)</li>
</ol>
</details>

<h3>Exercise 2: Motion vs Location</h3>

<p>Complete with the correct preposition and article:</p>

<ol>
<li>Die Katze sitzt ___ Tisch. (under - location)</li>
<li>Die Katze läuft ___ Tisch. (under - motion)</li>
<li>Ich bin ___ Zimmer. (in - location)</li>
<li>Ich gehe ___ Zimmer. (in - motion)</li>
<li>Das Bild hängt ___ Wand. (on - location)</li>
<li>Ich hänge das Bild ___ Wand. (on - motion)</li>
</ol>

<details>
<summary>Show Answers</summary>
<ol>
<li>Die Katze sitzt <strong>unter dem</strong> Tisch.</li>
<li>Die Katze läuft <strong>unter den</strong> Tisch.</li>
<li>Ich bin <strong>im</strong> Zimmer.</li>
<li>Ich gehe <strong>ins</strong> Zimmer.</li>
<li>Das Bild hängt <strong>an der</strong> Wand.</li>
<li>Ich hänge das Bild <strong>an die</strong> Wand.</li>
</ol>
</details>

<hr/>

<h2>Common Mistakes</h2>

<ul>
<li>❌ Using wrong case with prepositions</li>
<li>❌ Forgetting contractions (im, ins, zur, etc.)</li>
<li>❌ Mixing motion and location meanings</li>
<li>❌ Using English preposition logic</li>
<li>❌ Forgetting that prepositions don't change - only articles do</li>
</ul>

<hr/>

<h2>Learning Strategy</h2>

<ul>
<li><strong>Group them:</strong> Learn accusative, dative, and two-way separately</li>
<li><strong>Use colors:</strong> Color-code prepositions by case</li>
<li><strong>Make flashcards:</strong> Preposition + case + example</li>
<li><strong>Practice daily:</strong> Describe your surroundings using prepositions</li>
<li><strong>Start with common ones:</strong> in, auf, mit, zu, von, für</li>
</ul>

<p><strong>Pro Tip:</strong> Prepositions are like traffic signs - they tell you which "road" (case) to take!</p>

<p>Ready to practice? Try our <a href="/quiz" class="text-primary hover:underline font-bold">preposition quizzes</a> or review <a href="/blog/german-cases-nominative-accusative-dative-genitive" class="text-primary hover:underline font-bold">German cases</a> for more context.</p>

</article>`,
    date: "2026-02-11",
    readTime: "13 min read",
    category: "Grammar",
    keywords: ["german prepositions explained","prepositions with cases","accusative prepositions german","dative prepositions german","two-way prepositions auf in an","learn german prepositions A1"],
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
        
        {/* Related Posts & Backlinks */}
        <div className="mt-10 p-6 rounded-lg border border-border/40 bg-white/40 dark:bg-black/20">
          <h4 className="text-lg font-bold mb-3">Related Grammar Guides & Practice</h4>
          <p className="text-muted-foreground mb-4">Continue your German grammar journey with these related topics and practice resources.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <Link href="/grammar" className="block p-3 rounded-md border hover:border-primary transition-all">
              <div className="font-semibold">All Grammar Guides</div>
              <div className="text-sm text-muted-foreground">Browse complete grammar collection</div>
            </Link>

            <Link href="/a1" className="block p-3 rounded-md border hover:border-primary transition-all">
              <div className="font-semibold">A1 Vocabulary</div>
              <div className="text-sm text-muted-foreground">Practice words from this lesson</div>
            </Link>

            <Link href="/quiz" className="block p-3 rounded-md border hover:border-primary transition-all">
              <div className="font-semibold">Grammar Quizzes</div>
              <div className="text-sm text-muted-foreground">Test your understanding</div>
            </Link>
          </div>

          <div className="border-t pt-4">
            <h5 className="font-semibold mb-3">Recommended Next Steps</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link href="/blog/german-cases-nominative-accusative-dative-genitive" className="block p-3 rounded-md border hover:border-primary transition-all">
                <div className="font-semibold">German Cases</div>
                <div className="text-sm text-muted-foreground">Learn how articles change in sentences</div>
              </Link>

              <Link href="/blog/german-verbs-conjugation-present-past" className="block p-3 rounded-md border hover:border-primary transition-all">
                <div className="font-semibold">Verb Conjugation</div>
                <div className="text-sm text-muted-foreground">Master present and past tenses</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
