import re
import json

def analyze_css(filename):
    with open(filename, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    # Extract CSS variables
    css_vars = re.findall(r'(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);', content)
    unique_vars = {}
    for k, v in css_vars:
        unique_vars[k.strip()] = v.strip()
        
    # Extract font-family
    font_families = set(re.findall(r'font-family\s*:\s*([^;}]+)', content))
    
    # Extract colors
    hex_colors = set(re.findall(r'#[0-9a-fA-F]{3,8}\b', content))
    rgba_colors = set(re.findall(r'rgba?\([^)]+\)', content))
    hsl_colors = set(re.findall(r'hsla?\([^)]+\)', content))
    
    return {
        "filename": filename,
        "total_length": len(content),
        "variables_count": len(unique_vars),
        "variables": unique_vars,
        "font_families": list(font_families)[:20],
        "hex_colors_sample": list(hex_colors)[:40],
        "rgba_colors_sample": list(rgba_colors)[:20]
    }

results = []
for fname in ["inline_style_1.css", "zed_style_1.css", "zed_style_2.css"]:
    res = analyze_css(fname)
    print(f"=== {fname} ===")
    print(f"Length: {res['total_length']}, Vars: {res['variables_count']}")
    print(f"Fonts: {res['font_families']}")
    if res['variables']:
        print("Variables sample:", list(res['variables'].items())[:15])
    results.append(res)

with open("css_analysis.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)
print("Saved css_analysis.json")
