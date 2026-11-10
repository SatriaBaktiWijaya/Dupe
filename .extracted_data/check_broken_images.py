import re
import os

with open("e:/Coding/Dupe/zed-pixel-perfect/index.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Find all <img> tags
imgs = re.findall(r'<img[^>]+>', html, re.IGNORECASE)
print(f"Total <img> tags: {len(imgs)}")

broken = []
working = []
BASE_DIR = "e:/Coding/Dupe/zed-pixel-perfect"

for idx, img in enumerate(imgs):
    src_match = re.search(r'src=["\']([^"\']+)["\']', img)
    if not src_match:
        print(f"Img {idx} has NO src attribute: {img[:100]}")
        continue
    
    src = src_match.group(1)
    
    # Check if local or remote
    if src.startswith("http://") or src.startswith("https://"):
        continue
    
    # Remove leading slash to check local path
    rel_path = src.lstrip("/\\")
    full_path = os.path.join(BASE_DIR, rel_path.replace("/", os.sep))
    
    if os.path.exists(full_path):
        working.append(src)
    else:
        broken.append((src, img[:120]))

print(f"\nWorking local image paths: {len(working)}")
print(f"Broken / Missing image paths: {len(broken)}")

print("\nSample missing paths (first 25):")
missing_unique = {}
for src, tag in broken:
    missing_unique[src] = missing_unique.get(src, 0) + 1

for src, count in list(missing_unique.items())[:30]:
    print(f"  [{count}x] {src}")
