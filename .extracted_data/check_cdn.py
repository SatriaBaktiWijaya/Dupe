import re

with open("e:/Coding/Dupe/.extracted_data/zed_landing.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

cdn_matches = set(re.findall(r'/cdn-cgi/image/[^"\' ]+', html))
print(f"Found {len(cdn_matches)} cdn-cgi links:")
for c in list(cdn_matches)[:10]:
    print("  ", c)

