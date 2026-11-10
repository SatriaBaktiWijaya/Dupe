import json

path = "C:/Users/acer/.gemini/antigravity/brain/394e546a-d217-4ada-a369-b4d2e133d241/.system_generated/steps/178/output.txt"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

norm = data.get("normalized_result", {})
for step in norm.get("steps", []):
    print("Step:", step.get("step_id"), "Artifacts type:", type(step.get("artifacts")), step.get("artifacts"))

if "scenario" in norm:
    print("Scenario artifacts:", norm["scenario"].get("artifacts"))

