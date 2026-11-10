import json
import base64

path = "C:/Users/acer/.gemini/antigravity/brain/394e546a-d217-4ada-a369-b4d2e133d241/.system_generated/steps/178/output.txt"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

norm = data.get("normalized_result", {})
settle_step = None
for s in norm.get("steps", []):
    if s.get("step_id") == "settle":
        settle_step = s
        break

if settle_step and "artifacts" in settle_step:
    arts = settle_step["artifacts"]
    
    # 1. Save screenshot
    sc_val = arts.get("screenshot", {}).get("value", {})
    if "data_base64" in sc_val:
        b64 = sc_val["data_base64"]
        with open("e:/Coding/Dupe/.extracted_data/rea_zed_screenshot.png", "wb") as f:
            f.write(base64.b64decode(b64))
        print(f"Saved rea_zed_screenshot.png ({len(b64)} chars base64)")
    
    # 2. Save captured DOM
    dom_val = arts.get("dom", {}).get("value", {})
    if "html" in dom_val:
        dom_html = dom_val["html"]
        with open("e:/Coding/Dupe/.extracted_data/rea_zed_rendered_dom.html", "w", encoding="utf-8") as f:
            f.write(dom_html)
        print(f"Saved rea_zed_rendered_dom.html ({len(dom_html)} chars)")
    elif "content" in dom_val:
        dom_html = dom_val["content"]
        with open("e:/Coding/Dupe/.extracted_data/rea_zed_rendered_dom.html", "w", encoding="utf-8") as f:
            f.write(dom_html)
        print(f"Saved rea_zed_rendered_dom.html ({len(dom_html)} chars)")

print("REA extraction complete!")

