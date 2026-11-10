import json
import re

with open("full_tokens_extracted.json", "r", encoding="utf-8") as f:
    data = json.load(f)

light_tokens = data["light_tokens"]
dark_tokens = data["dark_tokens"]

# 1. Generate tokens.css
def build_tokens_css():
    lines = []
    lines.append("/**")
    lines.append(" * Zed Design System - Official Design Tokens")
    lines.append(" * Extracted directly from zed.dev (Light & Dark themes)")
    lines.append(" * Compatible with Vanilla CSS, Tailwind CSS, Next.js, React, Vue")
    lines.append(" */")
    lines.append("")
    
    # Fonts
    lines.append(":root {")
    lines.append("  /* Typography Font Families */")
    lines.append('  --font-sans: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;')
    lines.append('  --font-serif: "IBM Plex Serif", Georgia, Cambria, "Times New Roman", Times, serif;')
    lines.append('  --font-mono: "Zed Mono", "Lilex", "JetBrains Mono", "Fira Code", Menlo, Monaco, Consolas, monospace;')
    lines.append('  --font-writer: "iA Writer Quattro S", "IBM Plex Sans", sans-serif;')
    lines.append("")
    lines.append("  /* Layout & Spacing */")
    lines.append("  --radius-xs: 2px;")
    lines.append("  --radius-sm: 4px;")
    lines.append("  --radius-md: 6px;")
    lines.append("  --radius-lg: 8px;")
    lines.append("  --radius-xl: 12px;")
    lines.append("  --radius-2xl: 16px;")
    lines.append("  --radius-full: 9999px;")
    lines.append("")
    lines.append("  /* Zed Brand Accents */")
    lines.append("  --zed-accent-blue: #5c78e2;")
    lines.append("  --zed-accent-cyan: #6eb4bf;")
    lines.append("  --zed-accent-purple: #b477cf;")
    lines.append("  --zed-accent-green: #a1c181;")
    lines.append("  --zed-accent-amber: #dec184;")
    lines.append("  --zed-accent-red: #d07277;")
    lines.append("")
    lines.append("  /* Light Mode Palette (Default) */")
    for k, v in sorted(light_tokens.items()):
        lines.append(f"  {k}: {v};")
    lines.append("}")
    lines.append("")
    
    # Dark Mode Palette
    lines.append("/* Dark Mode Palette */")
    lines.append(".dark, [data-theme=\"dark\"] {")
    for k, v in sorted(dark_tokens.items()):
        lines.append(f"  {k}: {v};")
    lines.append("}")
    lines.append("")
    
    # Utility classes for fast consumption
    lines.append("/* Editor Theme Preview Scope */")
    lines.append(".theme-preview {")
    for k, v in sorted(light_tokens.items()):
        lines.append(f"  {k}: {v};")
    lines.append("}")
    lines.append(".dark .theme-preview, [data-theme=\"dark\"] .theme-preview {")
    for k, v in sorted(dark_tokens.items()):
        lines.append(f"  {k}: {v};")
    lines.append("}")
    
    return "\n".join(lines)

# 2. Generate tokens.json (W3C standard format)
def build_tokens_json():
    w3c = {
        "$schema": "https://design-tokens.github.io/community-group/format/",
        "meta": {
            "name": "Zed Design System",
            "version": "1.0.0",
            "source": "https://zed.dev"
        },
        "font": {
            "sans": { "$value": "IBM Plex Sans, sans-serif", "$type": "fontFamily" },
            "serif": { "$value": "IBM Plex Serif, serif", "$type": "fontFamily" },
            "mono": { "$value": "Zed Mono, monospace", "$type": "fontFamily" },
            "writer": { "$value": "iA Writer Quattro S, sans-serif", "$type": "fontFamily" }
        },
        "color": {
            "light": {},
            "dark": {}
        }
    }
    
    def parse_to_obj(tokens):
        res = {}
        for k, v in tokens.items():
            name = k.replace("--", "")
            parts = name.split("-")
            curr = res
            for part in parts[:-1]:
                if part not in curr:
                    curr[part] = {}
                curr = curr[part]
            leaf = parts[-1]
            curr[leaf] = {
                "$value": v,
                "$type": "color" if any(c in v for c in ["#", "rgb", "hsl"]) else "string"
            }
        return res

    w3c["color"]["light"] = parse_to_obj(light_tokens)
    w3c["color"]["dark"] = parse_to_obj(dark_tokens)
    return json.dumps(w3c, indent=2)

# 3. Generate tokens.ts (TypeScript definitions)
def build_tokens_ts():
    lines = [
        "/**",
        " * Zed Design Tokens (TypeScript)",
        " * Fully typed tokens for React, Vue, Svelte, and Node.js projects",
        " */",
        "",
        "export interface ZedColorTokens {",
        "  background: string;",
        "  surfaceBackground: string;",
        "  panelBackground: string;",
        "  border: string;",
        "  borderFocused: string;",
        "  text: string;",
        "  textMuted: string;",
        "  textAccent: string;",
        "  editorBackground: string;",
        "  editorForeground: string;",
        "  editorActiveLine: string;",
        "  statusInfo: string;",
        "  statusSuccess: string;",
        "  statusWarning: string;",
        "  statusError: string;",
        "  syntaxKeyword: string;",
        "  syntaxFunction: string;",
        "  syntaxString: string;",
        "  syntaxNumber: string;",
        "  syntaxComment: string;",
        "  syntaxOperator: string;",
        "  [key: string]: string;",
        "}",
        "",
        "export const zedFonts = {",
        '  sans: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",',
        '  serif: "IBM Plex Serif, Georgia, Cambria, serif",',
        '  mono: "Zed Mono, Lilex, JetBrains Mono, Menlo, monospace",',
        '  writer: "iA Writer Quattro S, sans-serif",',
        "} as const;",
        "",
        "export const zedAccents = {",
        '  blue: "#5c78e2",',
        '  cyan: "#6eb4bf",',
        '  purple: "#b477cf",',
        '  green: "#a1c181",',
        '  amber: "#dec184",',
        '  red: "#d07277",',
        "} as const;",
        "",
        "export const lightTokens: Record<string, string> = " + json.dumps(light_tokens, indent=2) + ";",
        "",
        "export const darkTokens: Record<string, string> = " + json.dumps(dark_tokens, indent=2) + ";",
        "",
        "export default {",
        "  fonts: zedFonts,",
        "  accents: zedAccents,",
        "  light: lightTokens,",
        "  dark: darkTokens,",
        "};"
    ]
    return "\n".join(lines)

# 4. Generate tailwind.config.js
def build_tailwind_config():
    return """/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './design-system.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        writer: ['var(--font-writer)', 'sans-serif'],
      },
      colors: {
        zed: {
          bg: 'var(--background)',
          surface: 'var(--surface-background)',
          elevated: 'var(--elevated_surface-background)',
          panel: 'var(--panel-background)',
          border: 'var(--border)',
          'border-focus': 'var(--border-focused)',
          'border-selected': 'var(--border-selected)',
          text: 'var(--text)',
          'text-muted': 'var(--text-muted)',
          'text-accent': 'var(--text-accent)',
          icon: 'var(--icon)',
          'icon-muted': 'var(--icon-muted)',
          
          /* Semantic Status */
          info: 'var(--info)',
          'info-bg': 'var(--info-background)',
          success: 'var(--success)',
          'success-bg': 'var(--success-background)',
          warning: 'var(--warning)',
          'warning-bg': 'var(--warning-background)',
          error: 'var(--error)',
          'error-bg': 'var(--error-background)',
          
          /* Accents */
          blue: '#5c78e2',
          cyan: '#6eb4bf',
          purple: '#b477cf',
          green: '#a1c181',
          amber: '#dec184',
          red: '#d07277',
        },
        editor: {
          bg: 'var(--editor-background)',
          fg: 'var(--editor-foreground)',
          gutter: 'var(--editor-gutter-background)',
          'active-line': 'var(--editor-active_line-background)',
          'highlight-line': 'var(--editor-highlighted_line-background)',
          'line-number': 'var(--editor-line_number)',
          'active-line-number': 'var(--editor-active_line_number)',
          'wrap-guide': 'var(--editor-wrap_guide)',
          'indent-guide': 'var(--editor-indent_guide)',
        },
        syntax: {
          keyword: 'var(--syntax-keyword-color)',
          function: 'var(--syntax-function-color)',
          string: 'var(--syntax-string-color)',
          number: 'var(--syntax-number-color)',
          comment: 'var(--syntax-comment-color)',
          operator: 'var(--syntax-operator-color)',
          type: 'var(--syntax-type-color)',
          variable: 'var(--syntax-variable-color)',
          property: 'var(--syntax-property-color)',
          constant: 'var(--syntax-constant-color)',
        },
        player: {
          0: 'var(--players-0-cursor)',
          1: 'var(--players-1-cursor)',
          2: 'var(--players-2-cursor)',
          3: 'var(--players-3-cursor)',
          4: 'var(--players-4-cursor)',
          5: 'var(--players-5-cursor)',
          6: 'var(--players-6-cursor)',
          7: 'var(--players-7-cursor)',
        }
      },
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'zed-subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'zed-panel': '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
        'zed-dropdown': '0 10px 30px -4px rgba(0, 0, 0, 0.35)',
        'zed-glow': '0 0 40px -10px rgba(92, 120, 226, 0.25)',
      }
    }
  },
  plugins: []
};
"""

# Write all files to design-system/ and src/styles/
files = {
    "dupeZenLandingPage/design-system/tokens.css": build_tokens_css(),
    "dupeZenLandingPage/src/styles/tokens.css": build_tokens_css(),
    "dupeZenLandingPage/design-system/tokens.json": build_tokens_json(),
    "dupeZenLandingPage/design-system/tokens.ts": build_tokens_ts(),
    "dupeZenLandingPage/design-system/tailwind.config.js": build_tailwind_config(),
    "dupeZenLandingPage/tailwind.config.js": build_tailwind_config()
}

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {path}")

print("All Design System tokens generated successfully!")
