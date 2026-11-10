import re

with open("e:/Coding/Dupe/.extracted_data/rea_zed_rendered_dom.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# 1. Clean cdn-cgi wrappers on local Next.js images
# Example: /cdn-cgi/image/width=750,quality=100,format=auto/_next/static/media/... -> /_next/static/media/...
cleaned_html = re.sub(r'/cdn-cgi/image/[^"\' ]+?(/_next/static/[^"\' ]+)', r'\1', html)

# 2. For external images like https://images.zed.dev/... inside /cdn-cgi/image/..., point directly to https://images.zed.dev/...
cleaned_html = re.sub(r'/cdn-cgi/image/[^"\' ]+?(https?://[^"\' ]+)', r'\1', cleaned_html)

# 3. Add a floating Design System pill switcher at the bottom-right so the user can always jump to /design-system.html
floating_pill = """
<!-- Floating Design System Pill Button -->
<div style="position: fixed; bottom: 20px; right: 20px; z-index: 999999; display: flex; align-items: center; gap: 8px;">
  <a href="./design-system.html" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 9999px; background: #5c78e2; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; box-shadow: 0 10px 25px -5px rgba(92, 120, 226, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2); transition: all 150ms ease;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
    <span>Explore Design System Tokens</span>
  </a>
</div>
"""

# Inject before </body>
if "</body>" in cleaned_html:
    cleaned_html = cleaned_html.replace("</body>", floating_pill + "\n</body>")
else:
    cleaned_html += floating_pill

with open("e:/Coding/Dupe/dupeZenLandingPage/index.html", "w", encoding="utf-8") as f:
    f.write(cleaned_html)

print("Saved 1:1 authentic index.html successfully!")

