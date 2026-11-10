import re

with open("extracted_svgs.html", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"<!-- SVG 0 -->\s*(<svg.*?</svg>)", text, re.DOTALL)
if m:
    with open("zed_logo.svg", "w", encoding="utf-8") as out:
        out.write(m.group(1))
    print("Saved zed_logo.svg successfully!")
else:
    print("SVG 0 not found")
