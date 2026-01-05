# German A1 Vocabulary Learning Website

A comprehensive, interactive web application for learning German A1 level vocabulary with **965+ words**.

## ✨ Features

### 📚 Complete A1 Vocabulary
- 965 German words organized into 15 practical topics
- Each word includes article (der/die/das), plural form, translation, and example sentences
- Topics: Numbers, Time, Food, Family, Transport, Work, and more!

### 🎯 Multiple Practice Modes

1. **Flashcards** - Select 10, 20, 30, 50, or all words for randomized practice
2. **Translation Practice** - Test German ↔ English translation skills  
3. **Sentence Formation** - Build German sentences with vocabulary words

### 🎨 Modern Features
- Clean, intuitive interface
- Mobile-responsive design
- Dark mode support
- Progress tracking
- Keyboard shortcuts
- Randomized word order for effective learning

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📂 Navigation

1. **Homepage** → Click "Start Learning A1"
2. **Browse Topics** → Explore vocabulary by category
3. **Practice Mode** → Choose your practice type
   - Flashcards: Select card count, flip to reveal translation
   - Translation: Type answers, get instant feedback
   - Sentences: Create sentences, compare with examples

## 🗂️ Project Structure

```
app/
├── page.tsx              # Homepage (A1 focused)
├── a1/                   # A1 level routes
│   ├── practice/         # Practice modes
│   ├── [topic]/          # Topic pages
│   └── [topic]/[slug]/   # Word details
components/
├── FlashcardPractice.tsx
├── TranslationPractice.tsx
└── SentencePractice.tsx
data/vocab/
└── a1_complete.json      # 965 A1 words
```

## 📝 Topics Covered

- Numbers (140) | Time (90) | Basics (368)
- Transport (61) | Verbs (55) | Family (59)
- Food (43) | Calendar (30) | Housing (28)
- Work (26) | Colors (16) | Countries (16)
- Body (14) | Measurements (14) | Directions (5)

## 🎯 Learning Tips

1. Start with flashcards for vocabulary familiarization
2. Practice translation for accuracy
3. Build sentences to apply grammar
4. Review daily for best results!

## 🌟 Why This App?

- **Free & Open Source** - No ads, no subscriptions
- **Comprehensive** - Complete A1 curriculum
- **Interactive** - Multiple learning modes
- **Effective** - Based on spaced repetition principles

---

Built with Next.js 16 + TypeScript + Tailwind CSS

**Start learning German today! 🇩🇪**
