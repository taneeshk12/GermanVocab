import json

input_path = "/Users/drashti/Desktop/GermanVocab/data/vocab/final_a2_vocab.json"
output_path = "/Users/drashti/Desktop/GermanVocab/data/vocab/A2_all.json"

with open(input_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

normalized_data = []

# Valid articles for checking
valid_articles = ["der", "die", "das", None]

for item in data:
    # 1. Normalize topic
    topic = item.get("topic", "").strip()
    if not topic:
        topic = "basics"
    else:
        topic = topic.lower()
    
    # 2. Fix article if empty string to null (A1 uses null)
    article = item.get("article")
    if article == "":
        article = None
    
    # 3. Ensure structure matches vocab item
    new_item = {
        "id": item["id"],
        "word": item["word"],
        "article": article,
        "plural": item.get("plural"),
        "meaning_en": item.get("meaning_en", ""),
        "example_de": item.get("example_de", ""),
        "example_en": item.get("example_en", ""),
        "topic": topic,
        "level": "A2",
        "slug": item["slug"]
    }
    
    normalized_data.append(new_item)

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(normalized_data, f, indent=2, ensure_ascii=False)

print(f"Normalized {len(normalized_data)} items to {output_path}")
