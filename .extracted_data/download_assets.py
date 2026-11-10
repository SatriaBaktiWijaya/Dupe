import os
import re
import urllib.request

BASE_URL = "https://zed.dev"
TARGET_DIR = "e:/Coding/Dupe/dupeZenLandingPage"

with open("e:/Coding/Dupe/.extracted_data/zed_landing.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Find all /_next/static/ assets
assets = set(re.findall(r'/_next/static/[a-zA-Z0-9_\-\./]+', html))
print(f"Found {len(assets)} assets to download.")

for asset in sorted(assets):
    # Skip sourcemaps if any
    if asset.endswith(".map"):
        continue
    
    # Clean up relative path
    rel_path = asset.lstrip("/")
    local_path = os.path.join(TARGET_DIR, rel_path.replace("/", os.sep))
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    
    remote_url = BASE_URL + asset
    if not os.path.exists(local_path):
        try:
            print(f"Downloading {asset}...")
            req = urllib.request.Request(
                remote_url,
                headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = resp.read()
                with open(local_path, "wb") as out:
                    out.write(data)
        except Exception as e:
            print(f"Failed {asset}: {e}")
    else:
        print(f"Already exists: {asset}")

print("Asset download completed!")

