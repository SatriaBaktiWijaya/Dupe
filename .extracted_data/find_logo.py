import re

with open("zed_landing.html", "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

# Let's inspect the first 5 SVGs (usually includes the logo)
svgs = re.findall(r'<svg[^>]*>.*?</svg>', content, re.DOTALL | re.IGNORECASE)
for i in range(min(5, len(svgs))):
    print(f"--- SVG {i} ---")
    print(svgs[i][:300])

# Look for zed logo or wordmark
for i, s in enumerate(svgs):
    if "zed" in s.lower() or "viewbox=\"0 0 16 16\"" in s.lower() or "0 0 32" in s.lower() or "0 0 24" in s.lower():
        print(f"Candidate logo SVG {i}: {s[:200]}")
