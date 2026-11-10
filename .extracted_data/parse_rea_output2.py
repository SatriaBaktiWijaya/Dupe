import json

path = "C:/Users/acer/.gemini/antigravity/brain/394e546a-d217-4ada-a369-b4d2e133d241/.system_generated/steps/178/output.txt"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

norm = data.get("normalized_result", {})
print("Duration:", norm.get("duration_ms"), "ms")
print("Steps count:", len(norm.get("steps", [])))

for step in norm.get("steps", []):
    print("Step:", step.get("step_id"), step.get("status"), step.get("action"))
    if "artifacts" in step:
        for a in step["artifacts"]:
            print("  Artifact in step:", a.get("kind"), "keys:", list(a.keys()))

events = norm.get("events", {})
print("Events keys:", list(events.keys()))
for ek, ev in events.items():
    print(f"  Event '{ek}': {len(ev) if isinstance(ev, list) else type(ev)}")

if "scenario" in norm:
    sc = norm["scenario"]
    print("Scenario keys:", list(sc.keys()))
    if "artifacts" in sc:
        for a in sc["artifacts"]:
            print("  Artifact in scenario:", a.get("kind"), "keys:", list(a.keys()))
            if a.get("kind") == "dom":
                dom_text = a.get("content", "") or a.get("text", "") or a.get("html", "")
                print("  DOM length:", len(dom_text))
                with open("e:/Coding/Dupe/.extracted_data/rea_captured_dom.html", "w", encoding="utf-8") as dom_out:
                    dom_out.write(dom_text if isinstance(dom_text, str) else json.dumps(a))
            if a.get("kind") == "screenshot":
                print("  Screenshot artifact present!")
                if "base64" in a or "data" in a:
                    import base64
                    raw_b64 = a.get("base64") or a.get("data")
                    with open("e:/Coding/Dupe/.extracted_data/rea_screenshot.png", "wb") as sc_out:
                        sc_out.write(base64.b64decode(raw_b64))
                    print("  Saved rea_screenshot.png!")

