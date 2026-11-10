import json

path = "C:/Users/acer/.gemini/antigravity/brain/394e546a-d217-4ada-a369-b4d2e133d241/.system_generated/steps/178/output.txt"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

print("Top-level keys:", list(data.keys()))
for k in data.keys():
    v = data[k]
    if isinstance(v, dict):
        print(f"  {k}: dict with keys {list(v.keys())[:10]}")
    elif isinstance(v, list):
        print(f"  {k}: list of length {len(v)}")
    else:
        print(f"  {k}: {type(v)}")

# Check artifacts / screenshot / dom
if "artifacts" in data:
    for a in data["artifacts"]:
        print("Artifact:", a.get("kind"), a.get("path") or a.get("mime_type") or "no path")

