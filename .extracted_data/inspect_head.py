with open("e:/Coding/Dupe/.extracted_data/zed_landing.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Let's check the head of zed_landing.html
head_end = html.find("</head>")
print("Head content length:", head_end)
print(html[:1500])

# Check if there is an announcement or link to design-system
# We can inject a subtle, top-bar link or button so the user can easily hop between the authentic Zed page and the Design System explorer!

