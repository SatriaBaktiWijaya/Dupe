import re
import os

with open("e:/Coding/Dupe/zed-pixel-perfect/index.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Let's find every srcset and src in the HTML
all_srcs = set(re.findall(r'src=["\']([^"\']+)["\']', html))
all_srcsets = re.findall(r'srcset=["\']([^"\']+)["\']', html)
for ss in all_srcsets:
    for entry in ss.split(","):
        entry = entry.strip()
        if entry:
            all_srcs.add(entry.split()[0])

print(f"Total distinct image URLs in index.html: {len(all_srcs)}")

BASE_DIR = "e:/Coding/Dupe/zed-pixel-perfect"
broken = []
valid_local = []
valid_remote = []

for u in sorted(all_srcs):
    if u.startswith("data:"):
        continue
    if u.startswith("https://") or u.startswith("http://"):
        valid_remote.append(u)
        continue
    
    # Clean leading slash
    clean_u = u
    if clean_u.startswith("//"):
        broken.append((u, "Protocol-relative double slash (browser interprets as hostname)"))
        continue
    
    clean_u = clean_u.lstrip("/")
    # remove query string if any
    if "?" in clean_u:
        clean_u = clean_u.split("?")[0]
        
    local_path = os.path.join(BASE_DIR, clean_u.replace("/", os.sep))
    if os.path.exists(local_path):
        valid_local.append(u)
    else:
        broken.append((u, f"Missing file at: {local_path}"))

print(f"Valid local files: {len(valid_local)}")
print(f"Valid remote URLs: {len(valid_remote)}")
print(f"Broken / problem URLs: {len(broken)}")

for b_url, reason in broken[:30]:
    print(f"  ❌ {b_url} -> {reason}")

