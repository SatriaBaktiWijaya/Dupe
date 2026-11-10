import re

with open("e:/Coding/Dupe/zed-pixel-perfect/index.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Check <video> tags
videos = re.findall(r'<video[^>]*>(.*?)</video>', html, re.DOTALL | re.IGNORECASE)
print(f"Total <video> tags: {len(videos)}")
for idx, v in enumerate(re.findall(r'<video[^>]*>', html, re.IGNORECASE)[:10]):
    print(f"Video {idx}: {v}")

# Check srcset in <img> tags
srcsets = re.findall(r'<img[^>]+srcset=["\']([^"\']+)["\']', html, re.IGNORECASE)
print(f"\nImages with srcset: {len(srcsets)}")
for s in srcsets[:10]:
    print("  srcset:", s[:120])

# Check background images in styles
bg_imgs = re.findall(r'url\(([^)]+)\)', html)
print(f"\nCSS url() references in HTML: {len(bg_imgs)}")
for u in set(bg_imgs):
    print("  url:", u)
