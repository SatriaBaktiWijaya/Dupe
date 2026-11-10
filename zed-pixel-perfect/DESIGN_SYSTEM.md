# 📚 Zed Design System Documentation & Reference

Welcome to the comprehensive design system manual extracted from **Zed** ([zed.dev](https://zed.dev)). 

This documentation covers the design principles, color scales, typography guidelines, component patterns, and token usage for building developer tools, high-speed editors, and modern web applications.

---

## Table of Contents
1. [Core Design Principles](#1-core-design-principles)
2. [Color System & Themes](#2-color-system--themes)
3. [Typography Hierarchy](#3-typography-hierarchy)
4. [Component Patterns & UI Chrome](#4-component-patterns--ui-chrome)
5. [Syntax Highlighting & Code Preview](#5-syntax-highlighting--code-preview)
6. [Interactive Keyboard Navigation](#6-interactive-keyboard-navigation)
7. [Integration in Modern Frameworks](#7-integration-in-modern-frameworks)

---

## 1. Core Design Principles

1. **Precision & High Density**: Zed avoids bloated padding and unnecessary decoration. Interfaces use tight line heights (typically `leading-5`), compact margins (`gap-1` or `gap-2`), and crisp 1px borders.
2. **Subtle Elevation**: Depth is conveyed through subtle border tones (`--border`, `--border-variant`) and tonal surface contrast (`--surface-background` vs `--elevated_surface-background`) rather than loud shadows.
3. **Developer-First Keyboard Ergonomics**: Primary actions always surface physical hotkeys (`[S]`, `[D]`, `[C]`, `[?]`) directly in the UI as styled `<kbd>` badges.
4. **Authentic Code Aesthetics**: Code preview windows replicate real editor chrome with macOS traffic light controls, file tabs, breadcrumbs, line gutters, and syntax-highlighted tokens.

---

## 2. Color System & Themes

Zed provides two primary calibrated color schemes: **Ayu Light** and **One Dark / Modern Dark**.

### Surface Hierarchy
| Level | CSS Token | Light Mode Value | Dark Mode Value |
| :--- | :--- | :--- | :--- |
| **App Canvas** | `--background` | `#dcdcdd` | `#3b414d` |
| **Panels & Sidebars** | `--surface-background` | `#ebebec` | `#2f343e` |
| **Editor Canvas** | `--editor-background` | `#fafafa` | `#282c33` |
| **Interactive Element** | `--element-background` | `#ebebec` | `#2e343e` |
| **Hover State** | `--element-hover` | `#dfdfe0` | `#363c46` |
| **Active State** | `--element-active` | `#cacaca` | `#454a56` |

### Border Tokens
* `--border`: Primary 1px divider between window panes (`#c9c9ca` / `#464b57`).
* `--border-variant`: Subtle internal divider (`#dfdfe0` / `#363c46`).
* `--border-focused`: Active focus ring or selected pane border (`#7d82e8` / `#47679e`).
* `--border-selected`: Tab selection or highlighted row border.

### Status & Feedback Colors
* **Info**: `--info: #5c78e2` (Light) / `#74ade8` (Dark)
* **Success / Added**: `--success: #669f59` (Light) / `#a1c181` (Dark)
* **Warning / Modified**: `--warning: #a48819` (Light) / `#dec184` (Dark)
* **Error / Deleted**: `--error: #d36151` (Light) / `#d07277` (Dark)

---

## 3. Typography Hierarchy

Zed uses four deliberate font families:
1. **Sans-Serif (`--font-sans`)**: `IBM Plex Sans`, `-apple-system`, `system-ui`. Used for navigation, body text, buttons, and status bars.
2. **Serif (`--font-serif`)**: `IBM Plex Serif`. Used for editorial headlines, blog posts, and marketing emphasis.
3. **Monospace (`--font-mono`)**: `Zed Mono` / `Lilex` / `JetBrains Mono`. Used for code buffers, terminal output, keyboard shortcuts, and statistics.
4. **Writer (`--font-writer`)**: `iA Writer Quattro S`. Used for documentation and long-form technical prose.

### Scale & Letter Spacing
* **Hero Display**: `text-5xl md:text-7xl font-medium tracking-tight font-sans`
* **Section Heading**: `text-2xl md:text-4xl font-medium tracking-tight`
* **Subheading / Card Title**: `text-lg md:text-xl font-medium`
* **Body**: `text-sm md:text-base text-zed-text-muted leading-relaxed`
* **Captions & Badges**: `text-xs font-mono font-medium`

---

## 4. Component Patterns & UI Chrome

### 4.1 Buttons
* **Primary**: High-contrast, inverted background (`bg-zed-text text-zed-bg`).
* **Accent**: Zed signature blue gradient (`linear-gradient(135deg, #5c78e2 0%, #4f67c4 100%)`).
* **Secondary**: Subtle border with surface background (`border border-zed-border bg-zed-surface`).
* **Ghost**: Transparent with hover element background.

### 4.2 Keyboard Shortcut Pill (`<kbd>`)
The signature Zed hotkey badge:
```html
<button class="zen-btn zen-btn-primary">
  Download now
  <kbd class="zen-kbd">D</kbd>
</button>
```

### 4.3 Bento Grid Cards
Zed uses clean, rounded rectangular cards with subtle border highlight and gradient ambient glow:
```html
<div class="zen-bento-card">
  <div class="flex items-center gap-2 mb-4">
    <span class="zen-badge zen-badge-accent">Rust Architecture</span>
  </div>
  <h3 class="text-xl font-medium mb-2">Engineered for Speed</h3>
  <p class="text-sm text-zed-text-muted mb-6">Written from scratch in Rust with GPU-accelerated rendering.</p>
</div>
```

---

## 5. Syntax Highlighting & Code Preview

Zed's code editor color scheme is mathematically tuned for readability across long sessions:

```html
<div class="zen-editor-window">
  <div class="zen-editor-titlebar">
    <div class="zen-traffic-lights">
      <span class="zen-light-close"></span>
      <span class="zen-light-minimize"></span>
      <span class="zen-light-maximize"></span>
    </div>
    <div class="text-xs text-zed-text-muted">src/main.rs</div>
    <div></div>
  </div>
  <div class="zen-editor-tabs">
    <div class="zen-editor-tab active">main.rs</div>
    <div class="zen-editor-tab">lib.rs</div>
  </div>
  <div class="zen-editor-body">
    <div class="zen-editor-gutter">
      <div>1</div>
      <div class="active-line">2</div>
      <div>3</div>
    </div>
    <div class="zen-editor-code">
      <div><span class="syntax-keyword">fn</span> <span class="syntax-fn">main</span>() {</div>
      <div>    <span class="syntax-fn">println!</span>(<span class="syntax-str">"Hello, Zed!"</span>);</div>
      <div>}</div>
    </div>
  </div>
</div>
```

---

## 6. Interactive Keyboard Navigation

Zed supports global shortcut keys on the landing page:
* `[D]`: Opens the Download modal.
* `[S]`: Opens the Sign-up modal.
* `[C]`: Navigates to the GitHub source repository.
* `[?]`: Opens the Keyboard Shortcuts help dialog.
* `[T]`: Toggles Light / Dark mode.

---

## 7. Integration in Modern Frameworks

See `design-system/README.md` for specific copy-paste code snippets for React, Vue, Next.js, and pure CSS.

