# 🚀 dupeZenLandingPage & Zed Design System

A pixel-faithful, high-performance replica of the **[Zed](https://zed.dev)** ("*Your last next editor*") landing page, paired with a complete, production-ready **Zed Design System** for you to use in any of your own projects.

---

## 🌟 Key Features

### 1. Master Landing Page (`index.html`)
* **Authentic Typography & Aesthetics**: Built with IBM Plex Sans, Zed Mono, and precise color grading matching the real zed.dev.
* **Interactive Code Editor Chrome**: Real macOS window controls, file breadcrumbs, live syntax highlighting, diagnostic squiggly underlines with hover tooltips, and Zeta2 AI edit prediction ghost text.
* **Interactive Code Switcher**: Seamlessly switch between **TypeScript** (`scheduler.tsx`), **Rust** (`main.rs`), and **ZSH Terminal** views.
* **Multiplayer Avatars & Live Cursors**: Simulated real-time collaboration with colored cursors for José Valim, Dan Abramov, and Ethan Perez.
* **Dynamic "Zed Just Works" Showcase**: Tab between *Parallel Agents*, *Debugger*, *Agentic Editing*, *Native Git*, and *Edit Prediction* with live state rendering.
* **Interactive AI Assistant Simulator**: Type custom prompts or click pre-built prompts to test streaming code diffs.
* **Extensions Catalog**: Search and filter extensions (Rust, Python, TypeScript, Docker, Vim, Copilot, etc.) in real time.
* **GPU Benchmark Comparison**: Interactive switcher comparing **Startup Time**, **Typing Latency**, and **Memory Usage** across Zed, Sublime Text, and VS Code with animated bars.
* **Keyboard Navigation & Hotkeys**:
  * Press <kbd>D</kbd> to open Download dialog (with OS auto-detection for Windows, macOS, and Linux).
  * Press <kbd>S</kbd> to open Account Creation dialog.
  * Press <kbd>C</kbd> to clone/view GitHub source.
  * Press <kbd>T</kbd> to toggle between Dark and Light mode.
  * Press <kbd>?</kbd> to view keyboard shortcut reference.
  * Press <kbd>Esc</kbd> to dismiss any modal.

---

### 2. Standalone Design System (`/design-system`)
Extracted directly from zed.dev public style trees:
* **`design-system/tokens.json`**: Official W3C Design Tokens Community Group format for Figma / Tokens Studio / Style Dictionary.
* **`design-system/tokens.css`**: Over 220+ CSS custom properties covering surfaces, borders, text, status colors, ANSI terminal, player cursors, and syntax colors for both Light and Dark themes.
* **`design-system/tokens.ts`**: TypeScript definitions and exported token dictionaries for React, Vue, Svelte, or Node.js.
* **`design-system/tailwind.config.js`**: Ready-to-use Tailwind CSS theme extensions (`bg-zed-surface`, `text-syntax-keyword`, `border-zed-border`, etc.).
* **`design-system/components.css`**: Pre-built styles for buttons, keyboard pills (`<kbd>`), badges, cards, modals, and editor windows.
* **`design-system.html`**: A dedicated **Living Styleguide & Token Explorer** where you can click to copy any color variable or hex code, test typography scales, inspect the ANSI terminal matrix, and preview components.

---

## 💻 How to Run & Preview

### Option A: Open directly in your browser
Simply double-click or open `index.html` or `design-system.html` in any modern web browser (Chrome, Edge, Firefox, Safari). No build tools or installations are strictly required!

### Option B: Using Vite dev server
```bash
cd dupeZenLandingPage
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the landing page, or [http://localhost:3000/design-system.html](http://localhost:3000/design-system.html) for the Design System showcase.

---

## 🛠️ How to Use the Design System in Your Own Projects

### Quick Copy:
Copy the entire `design-system/` folder directly into your new project:

1. **In Vanilla HTML/CSS**:
   ```html
   <link rel="stylesheet" href="./design-system/tokens.css">
   <link rel="stylesheet" href="./design-system/components.css">
   ```
2. **In Tailwind CSS**:
   Merge `design-system/tailwind.config.js` into your `tailwind.config.js` and import `tokens.css` in your global CSS.
3. **In React / Next.js**:
   Import `tokens.css` in your root layout and use `design-system/tokens.ts` for typed token constants.

For full guidelines and examples, see [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).

---

## 📄 License
Created for educational and development purposes.
Original designs and brand identity belong to [Zed Industries](https://zed.dev).

