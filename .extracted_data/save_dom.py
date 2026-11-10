import json

path = "C:/Users/acer/.gemini/antigravity/brain/394e546a-d217-4ada-a369-b4d2e133d241/.system_generated/steps/178/output.txt"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

norm = data.get("normalized_result", {})
for s in norm.get("steps", []):
    if s.get("step_id") == "settle":
        dom_text = s["artifacts"]["dom"]["value"]["text"]
        with open("e:/Coding/Dupe/.extracted_data/rea_zed_rendered_dom.html", "w", encoding="utf-8") as out:
            out.write(dom_text)
        print(f"Successfully saved rea_zed_rendered_dom.html! Length: {len(dom_text)} chars")

