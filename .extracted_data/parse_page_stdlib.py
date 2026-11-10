import re
from html.parser import HTMLParser

class ZedPageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.headings = []
        self.current_tag = None
        self.current_text = []
        self.nav_links = []
        self.in_a = False
        self.a_href = ""
        self.a_text = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag in ["h1", "h2", "h3", "h4"]:
            self.current_tag = tag
            self.current_text = []
        elif tag == "a":
            self.in_a = True
            self.a_href = attr_dict.get("href", "")
            self.a_text = []

    def handle_endtag(self, tag):
        if tag in ["h1", "h2", "h3", "h4"] and self.current_tag == tag:
            text = " ".join("".join(self.current_text).split())
            if text:
                self.headings.append((tag, text))
            self.current_tag = None
            self.current_text = []
        elif tag == "a" and self.in_a:
            text = " ".join("".join(self.a_text).split())
            if text or self.a_href:
                self.nav_links.append((text, self.a_href))
            self.in_a = False
            self.a_text = []

    def handle_data(self, data):
        if self.current_tag:
            self.current_text.append(data)
        if self.in_a:
            self.a_text.append(data)

with open("zed_landing.html", "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

parser = ZedPageParser()
parser.feed(content)

print(f"Total headings found: {len(parser.headings)}")
for tag, text in parser.headings:
    print(f"[{tag}] {text}")

print(f"\nLinks found (sample of {len(parser.nav_links)}):")
for text, href in parser.nav_links[:30]:
    if text:
        print(f"  {text} -> {href}")
