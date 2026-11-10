import re

with open("e:/Coding/Dupe/zed-pixel-perfect/index.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

double_slash = set(re.findall(r'//[a-zA-Z0-9_\-\./]+\.(?:webp|png|jpg|jpeg|svg)', html))
print(f"Found {len(double_slash)} protocol-relative // image paths:")
for p in sorted(list(double_slash)):
    print("  ", p)

