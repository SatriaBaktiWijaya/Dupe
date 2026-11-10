import re
import urllib.parse

with open("zed_landing.html", "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

print(f"Total HTML size: {len(content)} chars")

# Find links
links = re.findall(r'<link[^>]+>', content, re.IGNORECASE)
print(f"Total link tags: {len(links)}")
css_urls = []
for l in links:
    if "stylesheet" in l.lower() or "preload" in l.lower():
        m = re.search(r'href=["\']([^"\']+)["\']', l)
        if m:
            href = m.group(1)
            print("Link:", href, "Tag:", l[:100])
            if href.endswith(".css") or "css" in href:
                css_urls.append(href)

styles = re.findall(r'<style[^>]*>(.*?)</style>', content, re.DOTALL | re.IGNORECASE)
print(f"Inline style tags count: {len(styles)}")
for i, s in enumerate(styles):
    print(f"Style {i} length: {len(s)}")
    # save inline styles
    with open(f"inline_style_{i}.css", "w", encoding="utf-8") as sf:
        sf.write(s)

with open("css_links.txt", "w", encoding="utf-8") as f:
    for u in css_urls:
        f.write(u + "\n")
