def fix_index_html(file_path):
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()

    # Replace //video-posters/ with /video-posters/
    html_fixed = html.replace('//video-posters/', '/video-posters/')
    # Replace //blog-thumbs/ with /blog-thumbs/
    html_fixed = html_fixed.replace('//blog-thumbs/', '/blog-thumbs/')
    # Replace any leftover //img/ with /img/
    html_fixed = html_fixed.replace('//img/', '/img/')
    # Replace //_next/ with /_next/
    html_fixed = html_fixed.replace('//_next/', '/_next/')

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_fixed)
    print(f"Fixed {file_path}")

fix_index_html("e:/Coding/Dupe/zed-pixel-perfect/index.html")
fix_index_html("e:/Coding/Dupe/dupeZenLandingPage/index.html")

