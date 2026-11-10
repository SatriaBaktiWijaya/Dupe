import re

with open("e:/Coding/Dupe/.extracted_data/all_image_paths.txt", "r", encoding="utf-8") as f:
    lines = [line.strip() for line in f if line.strip()]

img_urls = []
for l in lines:
    if any(ext in l.lower() for ext in [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]):
        img_urls.append(l)

print(f"Total image media assets: {len(img_urls)}")
for u in sorted(img_urls):
    print("  ", u)

