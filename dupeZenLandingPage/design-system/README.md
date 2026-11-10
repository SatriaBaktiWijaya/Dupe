# ⚡ Zed Design System

A developer-first, high-performance design system reverse-engineered from **[Zed](https://zed.dev)** ("*Your last next editor*").

This package contains complete design tokens, color scales (Light & Dark), typography hierarchies, editor syntax highlighting palettes, terminal ANSI colors, multiplayer cursor styles, and reusable UI components.

---

## 📦 What's Inside

| File | Description |
| :--- | :--- |
| **`tokens.json`** | W3C Community Group standard Design Tokens (JSON) format. Compatible with Figma, Style Dictionary, Tokens Studio. |
| **`tokens.css`** | Pure CSS Custom Properties (`:root` light theme and `.dark` dark theme) covering 220+ tokens. |
| **`tokens.ts`** | Strongly-typed TypeScript token definitions and exports for React / Vue / Node.js. |
| **`tailwind.config.js`** | Ready-to-use Tailwind CSS configuration extending theme colors, fonts, shadows, and radiuses. |
| **`components.css`** | Pre-built component styles for buttons, shortcut badges (`kbd`), cards, modals, and code editor windows. |

---

## 🚀 Quick Start

### 1. In Any Web Project (Vanilla HTML / CSS)

Link the tokens and components into your HTML:

```html
<link rel="stylesheet" href="./design-system/tokens.css">
<link rel="stylesheet" href="./design-system/components.css">
```

To toggle dark mode, add or remove the `dark` class from the `<html>` or `<body>` element:

```html
<!-- Dark Mode -->
<html class="dark">
```

### 2. In Tailwind CSS Projects

Import the pre-configured `tailwind.config.js` in your `tailwind.config.js`:

```javascript
// tailwind.config.js
const zedConfig = require('./design-system/tailwind.config.js');

module.exports = {
  ...zedConfig,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue,svelte}',
  ],
};
```

Import the CSS variables into your main CSS file (e.g. `globals.css`):

```css
@import './design-system/tokens.css';
@import './design-system/components.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now you can use classes like:
```html
<button class="bg-zed-surface text-zed-text border border-zed-border hover:bg-zed-surface/80 rounded-md px-4 py-2">
  Zed Button <span class="font-mono text-xs text-zed-text-muted">⌘K</span>
</button>
```

### 3. In React / Next.js / TypeScript

```tsx
import { lightTokens, darkTokens, zedFonts, zedAccents } from './design-system/tokens';

export function EditorHeader() {
  return (
    <header style={{ backgroundColor: 'var(--title_bar-background)', borderBottom: '1px solid var(--border)' }}>
      <h1 style={{ color: 'var(--text)', fontFamily: zedFonts.sans }}>My Editor</h1>
    </header>
  );
}
```

---

## 🎨 Token Categories

### 1. Surfaces & Backgrounds
* `--background`: Primary canvas background
* `--surface-background`: Elevated panels, sidebars, cards
* `--panel-background`: Window panes and tool views
* `--element-background`: Buttons, dropdown triggers, inputs
* `--element-hover`: Interactive hover state

### 2. Typography & Text
* `--text`: Primary text color (high contrast)
* `--text-muted`: Secondary labels, descriptions, timestamps
* `--text-placeholder`: Input placeholder text
* `--text-accent`: Hyperlinks, active states, key emphasis

### 3. Code Editor Syntax Highlighting
* `--syntax-keyword-color`: `fn`, `let`, `const`, `return`, `impl`
* `--syntax-function-color`: Function and method invocations
* `--syntax-type-color`: Structs, interfaces, primitive types
* `--syntax-string-color`: String literals
* `--syntax-number-color`: Numeric constants
* `--syntax-comment-color`: Code comments & documentation
* `--syntax-operator-color`: Operators (`=`, `+`, `->`, `=>`)

### 4. Multiplayer Editing (Player 0 to 7)
Zed features collaborative multiplayer editing. Each collaborator gets a distinct color:
* `--players-0-cursor` through `--players-7-cursor`
* Matching selection highlighting overlays: `--players-0-selection` through `--players-7-selection`

### 5. Terminal ANSI Colors (16-color palette)
Standard, bright, and dim variants for terminal emulators and CLI tooling.

---

## 📄 License
Extracted from Zed.dev public assets for design exploration, learning, and custom project development.

