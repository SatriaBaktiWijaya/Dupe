import urllib.request
import os

missing_chunks = [
    "/_next/static/chunks/106ja2vrcsxpa.js",
    "/_next/static/chunks/1n5wyzwnd0bg2.js",
    "/_next/static/chunks/3w24pn9ieosc_.js",
    "/_next/static/chunks/3wzblkkph-0cy.js"
]

BASE_DIR = "e:/Coding/Dupe/zed-pixel-perfect"

for ch in missing_chunks:
    url = "https://zed.dev" + ch
    local_path = os.path.join(BASE_DIR, ch.lstrip("/").replace("/", os.sep))
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    try:
        print(f"Downloading {url}...")
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(local_path, "wb") as f:
                f.write(data)
        print(f"  -> Saved {local_path} ({len(data)} bytes)")
    except Exception as e:
        print(f"  -> Error: {e}")

