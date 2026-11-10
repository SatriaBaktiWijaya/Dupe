import re

with open("e:/Coding/Dupe/.extracted_data/rea_zed_rendered_dom.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Find all img src, video src, poster, and image preload hrefs
srcs = set(re.findall(r'src=["\']([^"\']+)["\']', html))
posters = set(re.findall(r'poster=["\']([^"\']+)["\']', html))
image_links = set(re.findall(r'<link[^>]+as=["\']image["\'][^>]+href=["\']([^"\']+)["\']', html))
srcset_links = re.findall(r'imagesrcset=["\']([^"\']+)["\']', html)
srcset_urls = set()
for s in srcset_links:
    for part in s.split(","):
        url = part.strip().split()[0]
        srcset_urls.add(url)

all_images = srcs.union(posters).union(image_links).union(srcset_urls)
print(f"Total image/media candidate URLs: {len(all_images)}")

zed_images = set()
for img in all_images:
    # Extract actual path
    clean = re.sub(r'^/cdn-cgi/image/[^/]+/', '', img)
    clean = re.sub(r'^/cdn-cgi/image/[^/]+/https?://[^/]+/', '/', clean)
    zed_images.add(clean)

print("Sample cleaned image paths (first 25):")
for z in sorted(list(zed_images))[:25]:
    print("  ", z)

with open("e:/Coding/Dupe/.extracted_data/all_image_paths.txt", "w", encoding="utf-8") as f:
    for z in sorted(list(all_images)):
        f.write(z + "\n")

