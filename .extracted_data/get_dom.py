import json

path = "C:/Users/acer/.gemini/antigravity/brain/394e546a-d217-4ada-a369-b4d2e133d241/.system_generated/steps/178/output.txt"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

norm = data.get("normalized_result", {})
for s in norm.get("steps", []):
    if s.get("step_id") == "settle":
        dom_obj = s["artifacts"].get("dom", {})
        print("DOM obj keys:", list(dom_obj.keys()))
        val = dom_obj.get("value")
        if isinstance(val, dict):
            print("DOM value keys:", list(val.keys()))
        elif isinstance(val, str):
            print("DOM value is string of length:", len(val))
            with open("e:/Coding/Dupe/.extracted_data/rea_zed_rendered_dom.html", "w", encoding="utf-8") as out:
                out.write(val)
            print("Successfully saved rea_zed_rendered_dom.html!")

