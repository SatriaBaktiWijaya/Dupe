import re
from bs4 import BeautifulSoup

with open("zed_landing.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

print("Title:", soup.title.string if soup.title else "No title")

# Find main sections
sections = soup.find_all(["section", "header", "footer", "main", "nav"])
print(f"Found {len(sections)} landmark elements:")
for s in sections:
    tag = s.name
    s_id = s.get("id", "")
    s_class = " ".join(s.get("class", []))
    print(f"<{tag} id='{s_id}' class='{s_class[:80]}'>")

# Find headings
for h in soup.find_all(["h1", "h2", "h3"]):
    text = h.get_text(strip=True)
    if text:
        print(f"{h.name}: {text[:100]}")

# Find SVGs / Icons / Images
images = soup.find_all("img")
print(f"Total img tags: {len(images)}")
for img in images[:15]:
    print("IMG:", img.get("src", ""), img.get("alt", ""))

# Find SVGs
svgs = soup.find_all("svg")
print(f"Total svg tags: {len(svgs)}")
