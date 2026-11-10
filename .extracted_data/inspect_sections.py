import re
import json

with open("zed_landing.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Let's inspect paragraphs, buttons, and badges
paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', html, re.DOTALL | re.IGNORECASE)
cleaned_p = []
for p in paragraphs:
    clean = re.sub(r'<[^>]+>', ' ', p)
    clean = " ".join(clean.split())
    if len(clean) > 20:
        cleaned_p.append(clean)

print(f"Total paragraphs with text: {len(cleaned_p)}")
for p in cleaned_p[:25]:
    print(f"- {p}")

# Look for buttons
buttons = re.findall(r'<button[^>]*>(.*?)</button>', html, re.DOTALL | re.IGNORECASE)
cleaned_btn = []
for b in buttons:
    clean = re.sub(r'<[^>]+>', ' ', b)
    clean = " ".join(clean.split())
    if clean:
        cleaned_btn.append(clean)

print(f"\nButtons found ({len(cleaned_btn)}):")
for b in set(cleaned_btn):
    print(f"  Button: '{b}'")
