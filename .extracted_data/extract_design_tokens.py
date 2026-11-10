import re
import json

# 1. Read inline_style_1.css (contains theme-preview variables for light and dark)
with open("inline_style_1.css", "r", encoding="utf-8") as f:
    inline_css = f.read()

# Separate light and dark
light_match = re.search(r'\.theme-preview\s*\{([^}]+)\}', inline_css)
dark_match = re.search(r'\.dark\s+\.theme-preview\s*\{([^}]+)\}', inline_css)

def parse_vars(block):
    res = {}
    if not block:
        return res
    pairs = re.findall(r'(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);', block)
    for k, v in pairs:
        res[k.strip()] = v.strip()
    return res

light_tokens = parse_vars(light_match.group(1)) if light_match else {}
dark_tokens = parse_vars(dark_match.group(1)) if dark_match else {}

print(f"Parsed {len(light_tokens)} light tokens and {len(dark_tokens)} dark tokens.")

# 2. Read zed_style_2.css for global Tailwind tokens, colors, radiuses, shadows
with open("zed_style_2.css", "r", encoding="utf-8") as f:
    style2_css = f.read()

# Find root variables
root_vars = {}
for match in re.finditer(r':root\s*\{([^}]+)\}', style2_css):
    root_vars.update(parse_vars(match.group(1)))

print(f"Parsed {len(root_vars)} root variables from zed_style_2.css.")

# Group tokens into semantic categories:
def categorize_tokens(token_dict):
    categories = {
        "surfaces": {},
        "borders": {},
        "text": {},
        "icons": {},
        "editor": {},
        "ui_chrome": {},
        "interactive": {},
        "status": {},
        "terminal": {},
        "players": {},
        "syntax": {},
        "other": {}
    }
    for k, v in token_dict.items():
        name = k.replace("--", "")
        if any(w in name for w in ["background", "surface", "overlay"]):
            if "editor" in name or "terminal" in name:
                pass
            else:
                categories["surfaces"][k] = v
                continue
        if "border" in name:
            if "editor" in name or "terminal" in name:
                pass
            else:
                categories["borders"][k] = v
                continue
        if "text" in name or "link" in name:
            categories["text"][k] = v
            continue
        if "icon" in name:
            categories["icons"][k] = v
            continue
        if "editor" in name or "wrap_guide" in name or "indent_guide" in name or "line_number" in name:
            categories["editor"][k] = v
            continue
        if any(w in name for w in ["status_bar", "title_bar", "toolbar", "tab", "scrollbar", "minimap", "drop_target"]):
            categories["ui_chrome"][k] = v
            continue
        if "element" in name:
            categories["interactive"][k] = v
            continue
        if any(w in name for w in ["hint", "info", "success", "warning", "error", "created", "modified", "deleted", "conflict", "renamed", "hidden", "ignored", "predictive", "unreachable", "version_control"]):
            categories["status"][k] = v
            continue
        if "terminal" in name:
            categories["terminal"][k] = v
            continue
        if "players" in name:
            categories["players"][k] = v
            continue
        if "syntax" in name:
            categories["syntax"][k] = v
            continue
        categories["other"][k] = v
    return categories

light_categorized = categorize_tokens(light_tokens)
dark_categorized = categorize_tokens(dark_tokens)

summary = {
    "light_tokens": light_tokens,
    "dark_tokens": dark_tokens,
    "light_categorized": light_categorized,
    "dark_categorized": dark_categorized,
    "root_vars": root_vars
}

with open("full_tokens_extracted.json", "w", encoding="utf-8") as f:
    json.dump(summary, f, indent=2)

print("Saved full_tokens_extracted.json successfully!")
for cat, items in dark_categorized.items():
    print(f"  Category '{cat}': {len(items)} tokens")
