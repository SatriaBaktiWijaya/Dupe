import re

with open("e:/Coding/Dupe/.extracted_data/rea_zed_rendered_dom.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# 1. Clean CDN CGI wrappers
# Strip /cdn-cgi/image/width=...,quality=...,format=auto/
cleaned = re.sub(r'/cdn-cgi/image/[^/]+/', '/', html)

# 2. Map remote images to local downloaded assets
replacements = {
    "https://images.zed.dev/video-posters/agent.webp": "/video-posters/agent.webp",
    "https://images.zed.dev/video-posters/debugger.webp": "/video-posters/debugger.webp",
    "https://images.zed.dev/video-posters/ep.webp": "/video-posters/ep.webp",
    "https://images.zed.dev/video-posters/git.webp": "/video-posters/git.webp",
    "https://images.zed.dev/video-posters/lsp.webp": "/video-posters/lsp.webp",
    "https://images.zed.dev/video-posters/outline-view.webp": "/video-posters/outline-view.webp",
    "https://images.zed.dev/video-posters/text-manipulation.webp": "/video-posters/text-manipulation.webp",
    "https://images.zed.dev/blog/delta-public-beta/thumbnail.webp": "/blog-thumbs/delta-beta.webp",
    "https://images.zed.dev/blog/introducing-delta/delta-thumb.webp": "/blog-thumbs/delta-thumb.webp",
    "https://images.zed.dev/blog/introducing-delta/xanadu-thumb.webp": "/blog-thumbs/xanadu-thumb.webp",
    "https://github.com/identicons/zed.png": "/img/zed-identicon.png",
}

for k, v in replacements.items():
    cleaned = cleaned.replace(k, v)

# Fix duplicate slashes from cdn-cgi stripping if any
cleaned = cleaned.replace('src="//img/', 'src="/img/')
cleaned = cleaned.replace('src="//_next/', 'src="/_next/')
cleaned = cleaned.replace('srcset="//img/', 'srcset="/img/')
cleaned = cleaned.replace('srcset="//_next/', 'srcset="/_next/')
cleaned = cleaned.replace('imagesrcset="//', 'imagesrcset="/')

# 3. Add Design System Navigation Pill (so the user can always access tokens)
nav_pill = """
<!-- Design System Quick Access Floating Bar -->
<div style="position: fixed; bottom: 24px; right: 24px; z-index: 99999; display: flex; align-items: center; gap: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <a href="./design-system.html" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 9999px; background: #5c78e2; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; box-shadow: 0 10px 30px -5px rgba(92, 120, 226, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.25); transition: all 150ms ease;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
    <span>Zed Design System & Tokens</span>
  </a>
</div>
"""

if "</body>" in cleaned:
    cleaned = cleaned.replace("</body>", nav_pill + "\n</body>")
else:
    cleaned += nav_pill

with open("e:/Coding/Dupe/zed-pixel-perfect/index.html", "w", encoding="utf-8") as f:
    f.write(cleaned)

print("Saved e:/Coding/Dupe/zed-pixel-perfect/index.html successfully!")
print(f"Total size: {len(cleaned)} characters")

