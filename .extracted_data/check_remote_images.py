import re

with open("e:/Coding/Dupe/zed-pixel-perfect/index.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

imgs = re.findall(r'<img[^>]+>', html, re.IGNORECASE)
remote_imgs = []
data_imgs = []
other_imgs = []

for img in imgs:
    src_match = re.search(r'src=["\']([^"\']+)["\']', img)
    if src_match:
        src = src_match.group(1)
        if src.startswith("http://") or src.startswith("https://"):
            remote_imgs.append((src, img))
        elif src.startswith("data:"):
            data_imgs.append(img)
        else:
            other_imgs.append(src)

print(f"Remote images: {len(remote_imgs)}")
print(f"Data URI images: {len(data_imgs)}")
print(f"Local images: {len(other_imgs)}")

# Check what remote domains are used
remote_domains = {}
for src, tag in remote_imgs:
    domain = src.split("/")[2] if len(src.split("/")) > 2 else "unknown"
    remote_domains[domain] = remote_domains.get(domain, 0) + 1

print("\nRemote image domains:")
for d, c in remote_domains.items():
    print(f"  {d}: {c}")

print("\nSample remote image URLs:")
for src, tag in remote_imgs[:10]:
    print("  ", src)
