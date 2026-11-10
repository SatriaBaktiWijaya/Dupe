import re
from html.parser import HTMLParser

with open("zed_landing.html", "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

# Extract all SVGs
svg_matches = re.findall(r'(<svg[^>]*>.*?</svg>)', content, re.DOTALL | re.IGNORECASE)
print(f"Total SVGs: {len(svg_matches)}")

# Save unique or important SVGs
with open("extracted_svgs.html", "w", encoding="utf-8") as f:
    for i, s in enumerate(svg_matches):
        f.write(f"<!-- SVG {i} -->\n{s}\n\n")

print(f"Saved {len(svg_matches)} SVGs to extracted_svgs.html")

# Check class names used frequently in zed_landing.html
classes = re.findall(r'class=["\']([^"\']+)["\']', content)
class_list = []
for c in classes:
    class_list.extend(c.split())
from collections import Counter
counts = Counter(class_list).most_common(50)
print("\nTop 50 CSS classes:")
for cls, cnt in counts:
    print(f"  {cls}: {cnt}")
