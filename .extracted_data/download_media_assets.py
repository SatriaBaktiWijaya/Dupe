import urllib.request
import os

media_downloads = [
    # Posters
    ("https://images.zed.dev/video-posters/agent.webp", "e:/Coding/Dupe/zed-pixel-perfect/video-posters/agent.webp"),
    ("https://images.zed.dev/video-posters/debugger.webp", "e:/Coding/Dupe/zed-pixel-perfect/video-posters/debugger.webp"),
    ("https://images.zed.dev/video-posters/ep.webp", "e:/Coding/Dupe/zed-pixel-perfect/video-posters/ep.webp"),
    ("https://images.zed.dev/video-posters/git.webp", "e:/Coding/Dupe/zed-pixel-perfect/video-posters/git.webp"),
    ("https://images.zed.dev/video-posters/lsp.webp", "e:/Coding/Dupe/zed-pixel-perfect/video-posters/lsp.webp"),
    ("https://images.zed.dev/video-posters/outline-view.webp", "e:/Coding/Dupe/zed-pixel-perfect/video-posters/outline-view.webp"),
    ("https://images.zed.dev/video-posters/text-manipulation.webp", "e:/Coding/Dupe/zed-pixel-perfect/video-posters/text-manipulation.webp"),
    
    # Blog thumbs
    ("https://images.zed.dev/blog/delta-public-beta/thumbnail.webp", "e:/Coding/Dupe/zed-pixel-perfect/blog-thumbs/delta-beta.webp"),
    ("https://images.zed.dev/blog/introducing-delta/delta-thumb.webp", "e:/Coding/Dupe/zed-pixel-perfect/blog-thumbs/delta-thumb.webp"),
    ("https://images.zed.dev/blog/introducing-delta/xanadu-thumb.webp", "e:/Coding/Dupe/zed-pixel-perfect/blog-thumbs/xanadu-thumb.webp"),

    # Agentic & edit-prediction images
    ("https://zed.dev/img/agentic/posters/explore-poster.webp", "e:/Coding/Dupe/zed-pixel-perfect/img/agentic/posters/explore-poster.webp"),
    ("https://zed.dev/img/agentic/posters/inline-assist-poster.webp", "e:/Coding/Dupe/zed-pixel-perfect/img/agentic/posters/inline-assist-poster.webp"),
    ("https://zed.dev/img/agentic/posters/mcp-poster.webp", "e:/Coding/Dupe/zed-pixel-perfect/img/agentic/posters/mcp-poster.webp"),
    ("https://zed.dev/img/edit-prediction/edit-1-poster.webp", "e:/Coding/Dupe/zed-pixel-perfect/img/edit-prediction/edit-1-poster.webp"),
    ("https://zed.dev/img/parallel-agents/sidebar.webp", "e:/Coding/Dupe/zed-pixel-perfect/img/parallel-agents/sidebar.webp"),
    
    # Zed icon webp
    ("https://zed.dev/_next/static/media/logo_icon.0-tj1lufhpk1c.webp", "e:/Coding/Dupe/zed-pixel-perfect/_next/static/media/logo_icon.0-tj1lufhpk1c.webp"),
    ("https://github.com/identicons/zed.png", "e:/Coding/Dupe/zed-pixel-perfect/img/zed-identicon.png")
]

for url, local_path in media_downloads:
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        )
        print(f"Downloading {url}...")
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(local_path, "wb") as f:
                f.write(data)
        print(f"  -> Saved {local_path} ({len(data)} bytes)")
    except Exception as e:
        print(f"  -> Error downloading {url}: {e}")

print("Media downloads finished!")

