import re

with open("e:/Coding/Dupe/.extracted_data/rea_zed_rendered_dom.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

print("HTML size:", len(html))

# Check stylesheets
links = re.findall(r'<link[^>]+>', html, re.IGNORECASE)
for l in links:
    if "stylesheet" in l.lower() or "preload" in l.lower():
        print("LINK:", l)

# Check inline styles
styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL | re.IGNORECASE)
print(f"Inline style tags count: {len(styles)}")
for i, s in enumerate(styles):
    print(f"Style {i} length: {len(s)}")

# Check images and SVGs
print("IMG count:", len(re.findall(r'<img[^>]+>', html)))
print("SVG count:", len(re.findall(r'<svg[^>]+>', html)))

