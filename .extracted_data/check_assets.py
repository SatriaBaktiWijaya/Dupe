import re

with open("e:/Coding/Dupe/.extracted_data/zed_landing.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

next_assets = set(re.findall(r'/_next/static/[a-zA-Z0-9_\-\./]+', html))
print(f"Total unique Next.js assets referenced: {len(next_assets)}")
css_files = [a for a in next_assets if a.endswith(".css")]
font_files = [a for a in next_assets if any(a.endswith(ext) for ext in [".woff2", ".woff", ".ttf"])]
image_files = [a for a in next_assets if any(a.endswith(ext) for ext in [".png", ".jpg", ".webp", ".svg"])]
js_files = [a for a in next_assets if a.endswith(".js")]

print(f"CSS ({len(css_files)}):", css_files)
print(f"Fonts ({len(font_files)}):", font_files[:5])
print(f"Images ({len(image_files)}):", image_files[:5])
print(f"JS chunks ({len(js_files)}):", len(js_files))

