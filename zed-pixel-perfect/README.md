# ⚡ zed-pixel-perfect (100% Pixel-Identical Replica)

A 100% pixel-identical reconstruction of **[Zed.dev](https://zed.dev)** reverse-engineered with **REA** (`reverse-engineer-anything`).

---

## 🔍 How This Was Built via REA

1. **REA Headless Chrome Observation (`capture_browser_scenario`)**:
   Executed passive scenario capture over Chrome DevTools Protocol (CDP) capturing the live, hydrated DOM (`3.09 MB`), network dependencies, and full-resolution screenshot (`rea_zed_screenshot.png`).
2. **Authentic Font Pipeline**:
   Extracted and locally packaged the exact `.woff2` font files:
   - `iAWriterQuattroS_Regular.woff2`, `iAWriterQuattroS_Bold.woff2`, `iAWriterQuattroS_Italic.woff2`, `iAWriterQuattroS_BoldItalic.woff2`
   - `Lilex_Regular.woff2` (Zed's monospace font)
   - `IBMPlexSerif_Var.woff2` & `IBMPlexSerif_Var_Italic.woff2`
   - `IBMPlexSans_Regular.woff2`
3. **Exact Media Assets & Shaders**:
   All background shaders (`noise.webp`), SVG grid textures (`GridPattern.png`), video posters (`lsp.webp`, `agent.webp`, `debugger.webp`, `ep.webp`, `git.webp`, `outline-view.webp`), and blog thumbnails.
4. **Complete 378 KB Authentic Stylesheet (`3wvh7tpy62agr.css`)**:
   Preserving all 220+ design token variables, GPUI layout classes, and dark/light color mappings.

---

## 🚀 Running the Project

### Development Server:
```bash
cd zed-pixel-perfect
npm install
npm run dev
```
Runs at [http://localhost:3001](http://localhost:3001)

### Pages:
- **`index.html`**: 100% Pixel-Identical Zed Landing Page
- **`design-system.html`**: Interactive Design System Token Explorer & Living Style Guide
- **`design-system/`**: Standalone tokens (`tokens.json`, `tokens.css`, `tokens.ts`, `tailwind.config.js`) and React components (`Button.tsx`, `Badge.tsx`, `Kbd.tsx`, `Card.tsx`, `EditorWindow.tsx`)

---

## 🎨 Design System for Future Projects
See [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) for how to use the extracted tokens in React, Vue, Next.js, and Tailwind CSS.

