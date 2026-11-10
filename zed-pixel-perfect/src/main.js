/**
 * Zed Landing Page Interactive Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Theme Management (Dark / Light)
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("zen-theme") || "dark";
  if (savedTheme === "light") {
    htmlEl.classList.remove("dark");
  } else {
    htmlEl.classList.add("dark");
  }

  function toggleTheme() {
    htmlEl.classList.toggle("dark");
    const isDark = htmlEl.classList.contains("dark");
    localStorage.setItem("zen-theme", isDark ? "dark" : "light");
    if (window.lucide) window.lucide.createIcons();
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // 3. Announcement Bar Dismiss
  const closeAnnouncement = document.getElementById("close-announcement");
  const announcementBar = document.getElementById("announcement-bar");
  if (closeAnnouncement && announcementBar) {
    closeAnnouncement.addEventListener("click", () => {
      announcementBar.style.display = "none";
    });
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 5. Automatic OS Detection for Hero Download Button
  const osLabel = document.getElementById("os-detect-label");
  const ua = window.navigator.userAgent.toLowerCase();
  let userOS = "Windows";
  if (ua.includes("mac")) {
    userOS = "macOS";
  } else if (ua.includes("linux")) {
    userOS = "Linux";
  }
  if (osLabel) {
    osLabel.textContent = `Download for ${userOS}`;
  }

  // 6. Interactive Hero Editor Tabs (TypeScript, Rust, Terminal)
  const tabTs = document.getElementById("tab-hero-ts");
  const tabRs = document.getElementById("tab-hero-rs");
  const tabTerm = document.getElementById("tab-hero-term");

  const heroBreadcrumb = document.getElementById("active-breadcrumb");
  const heroCodeView = document.getElementById("hero-code-view");
  const heroGutter = document.getElementById("hero-gutter");
  const heroLangName = document.getElementById("hero-lang-name");

  const heroTabs = [tabTs, tabRs, tabTerm];

  const codeSnippetsHero = {
    ts: {
      breadcrumb: "scheduler.tsx",
      lang: "TypeScript React",
      lines: 15,
      activeLine: 7,
      code: `<div><span class="syntax-keyword">import</span> * <span class="syntax-keyword">as</span> React <span class="syntax-keyword">from</span> <span class="syntax-str">"react"</span>;</div>
<div><span class="syntax-keyword">import</span> { <span class="syntax-fn">format</span>, <span class="syntax-fn">addMinutes</span> } <span class="syntax-keyword">from</span> <span class="syntax-str">"date-fns"</span>;</div>
<div></div>
<div><span class="syntax-comment">// Essential meeting coordinator with real-time sync</span></div>
<div><span class="syntax-keyword">interface</span> <span class="syntax-type">Meeting</span> {</div>
<div>  <span class="syntax-prop">id</span>: <span class="syntax-type">string</span>;</div>
<div class="bg-[var(--editor-active_line-background)] -mx-5 px-5 flex items-center justify-between">
  <span>  <span class="syntax-prop">couldHaveBeenAnEmail</span>: <span class="syntax-type">boolean</span>;</span>
  <span class="text-[11px] text-[var(--warning)] flex items-center gap-1 font-sans">
    <i data-lucide="alert-circle" class="w-3 h-3"></i>
    <span>unused property</span>
  </span>
</div>
<div>  <span class="syntax-prop">attendees</span>: <span class="syntax-type">string</span>[];</div>
<div>  <span class="syntax-prop">actuallyStartsOnTime</span>: <span class="syntax-type">number</span>;</div>
<div>}</div>
<div></div>
<div><span class="syntax-keyword">export function</span> <span class="syntax-fn">MeetingScheduler</span>({ <span class="syntax-var">duration</span> = <span class="syntax-num">30</span> }: { <span class="syntax-prop">duration</span>?: <span class="syntax-type">number</span> }) {</div>
<div>  <span class="syntax-keyword">const</span> [<span class="syntax-var">meetings</span>, <span class="syntax-var">setMeetings</span>] = React.<span class="syntax-fn">useState</span>&lt;<span class="syntax-type">Meeting</span>[]&gt;([]);</div>
<div class="relative">
  <span>  <span class="syntax-keyword">const</span> <span class="syntax-var">nextSlot</span> = <span class="syntax-fn">addMinutes</span>(<span class="syntax-keyword">new</span> <span class="syntax-type">Date</span>(), <span class="syntax-var">duration</span>);</span>
  <span class="zen-cursor" style="background-color: #74ade8;">
    <span class="zen-cursor-tag" style="background-color: #74ade8;">José</span>
  </span>
</div>
<div class="text-[var(--predictive)] italic opacity-75">
  <span>  <span class="syntax-comment">// Tab ⇥ to accept Zeta2 prediction:</span> return &lt;<span class="syntax-tag">div</span> className="zen-card"&gt;Schedule Meeting&lt;/<span class="syntax-tag">div</span>&gt;;</span>
</div>`
    },
    rs: {
      breadcrumb: "main.rs",
      lang: "Rust",
      lines: 14,
      activeLine: 5,
      code: `<div><span class="syntax-keyword">use</span> gpui::{<span class="syntax-type">App</span>, <span class="syntax-type">AppContext</span>, <span class="syntax-type">WindowOptions</span>};</div>
<div><span class="syntax-keyword">use</span> zed_core::<span class="syntax-type">EditorState</span>;</div>
<div></div>
<div><span class="syntax-keyword">fn</span> <span class="syntax-fn">main</span>() {</div>
<div class="bg-[var(--editor-active_line-background)] -mx-5 px-5"><span class="syntax-keyword">    let</span> <span class="syntax-var">app</span> = <span class="syntax-type">App</span>::<span class="syntax-fn">new</span>().<span class="syntax-fn">with_gpu_renderer</span>();</div>
<div>    <span class="syntax-var">app</span>.<span class="syntax-fn">run</span>(|<span class="syntax-var">cx</span>: &<span class="syntax-keyword">mut</span> <span class="syntax-type">AppContext</span>| {</div>
<div>        <span class="syntax-keyword">let</span> <span class="syntax-var">window</span> = <span class="syntax-var">cx</span>.<span class="syntax-fn">open_window</span>(<span class="syntax-type">WindowOptions</span>::default(), |<span class="syntax-var">_cx</span>| {</div>
<div class="relative">
<div>            <span class="syntax-type">EditorState</span>::<span class="syntax-fn">new_with_zeta2</span>()</div>
  <span class="zen-cursor" style="background-color: #a1c181;">
    <span class="zen-cursor-tag" style="background-color: #a1c181;">Dan</span>
  </span>
</div>
<div>        });</div>
<div>        <span class="syntax-fn">println!</span>(<span class="syntax-str">"GPUI engine running at 120 FPS"</span>);</div>
<div>    });</div>
<div>}</div>`
    },
    term: {
      breadcrumb: "terminal: zsh",
      lang: "Zsh / Bash",
      lines: 10,
      activeLine: 3,
      code: `<div><span class="syntax-comment"># Zed Native High-Performance Terminal</span></div>
<div><span style="color: var(--terminal-ansi-green);">acer@workstation</span>:<span style="color: var(--terminal-ansi-blue);">~/zed</span>$ cargo build --release</div>
<div class="bg-[var(--editor-active_line-background)] -mx-5 px-5"><span style="color: var(--terminal-ansi-yellow);">   Compiling</span> gpui v0.1.0 (/crates/gpui)</div>
<div><span style="color: var(--terminal-ansi-yellow);">   Compiling</span> zed-editor v0.180.2</div>
<div><span style="color: var(--terminal-ansi-cyan);">    Finished</span> release [optimized] target(s) in 2.34s</div>
<div><span style="color: var(--terminal-ansi-green);">acer@workstation</span>:<span style="color: var(--terminal-ansi-blue);">~/zed</span>$ ./target/release/zed .</div>
<div class="text-[var(--text-accent)]">[GPUI] Metal/Vulkan GPU swapchain created. Startup latency: 58ms.</div>
<div><span style="color: var(--terminal-ansi-green);">acer@workstation</span>:<span style="color: var(--terminal-ansi-blue);">~/zed</span>$ <span class="zen-cursor" style="background-color: var(--text);"></span></div>`
    }
  };

  function switchHeroTab(key) {
    heroTabs.forEach(t => t && t.classList.remove("active"));
    const activeTab = key === "ts" ? tabTs : key === "rs" ? tabRs : tabTerm;
    if (activeTab) activeTab.classList.add("active");

    const data = codeSnippetsHero[key];
    if (data) {
      if (heroBreadcrumb) heroBreadcrumb.textContent = data.breadcrumb;
      if (heroLangName) heroLangName.textContent = data.lang;
      if (heroCodeView) heroCodeView.innerHTML = data.code;

      if (heroGutter) {
        let gutterHtml = "";
        for (let i = 1; i <= data.lines; i++) {
          if (i === data.activeLine) {
            gutterHtml += `<div class="active-line text-[var(--editor-active_line_number)]">${i}</div>`;
          } else {
            gutterHtml += `<div>${i}</div>`;
          }
        }
        heroGutter.innerHTML = gutterHtml;
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  if (tabTs) tabTs.addEventListener("click", () => switchHeroTab("ts"));
  if (tabRs) tabRs.addEventListener("click", () => switchHeroTab("rs"));
  if (tabTerm) tabTerm.addEventListener("click", () => switchHeroTab("term"));

  // 7. "Zed Just Works" Feature Showcase Tabs
  const featureTabs = document.querySelectorAll(".feature-tab");
  const featureBadge = document.getElementById("feature-badge");
  const featureTitle = document.getElementById("feature-title");
  const featureDesc = document.getElementById("feature-desc");
  const featureVisual = document.getElementById("feature-visual");

  const featureData = {
    agents: {
      badge: "Multi-Agent Flow",
      title: "Parallel Agents",
      desc: "Run multiple threads of your favorite agents across several projects so you never leave your flow. Review diffs side-by-side and accept changes with one keystroke.",
      visual: `<div class="flex items-center justify-between border-b border-[var(--border)] pb-2 text-[var(--text-muted)]">
        <span>Thread: #agent-refactor-billing</span>
        <span class="text-emerald-400 flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Active</span>
      </div>
      <div class="text-[var(--syntax-comment-color)]">// Agent searching codebase for axum handlers...</div>
      <div class="p-2 rounded bg-[var(--element-background)] border border-[var(--border)] text-[var(--text)]">
        <span class="text-[var(--text-accent)] font-bold">Tool Call:</span> read_file("crates/billing/src/routes.rs")
      </div>
      <div class="text-[var(--syntax-string-color)]">✓ Applied unified diff to 3 files. Staged for review.</div>`
    },
    debugger: {
      badge: "DAP Protocol",
      title: "Native Debugger",
      desc: "Built directly on the Debug Adapter Protocol (DAP). Native breakpoints, step-over, call stack inspection, and variable watch for Rust, Python, Go, and C++.",
      visual: `<div class="flex items-center justify-between border-b border-[var(--border)] pb-2 text-[var(--text-muted)]">
        <span>Call Stack: main::run()</span>
        <span class="text-amber-400 font-mono">Paused on Breakpoint :42</span>
      </div>
      <div class="space-y-1 text-xs">
        <div class="flex justify-between"><span class="text-[var(--syntax-var)]">self.buffer</span> <span class="text-[var(--syntax-num)]">0x7ffeefbff480</span></div>
        <div class="flex justify-between"><span class="text-[var(--syntax-var)]">line_count</span> <span class="text-[var(--syntax-num)]">4,812</span></div>
        <div class="flex justify-between"><span class="text-[var(--syntax-var)]">fps_target</span> <span class="text-[var(--syntax-num)]">120.0</span></div>
      </div>
      <div class="pt-2 flex gap-2">
        <span class="px-2 py-0.5 rounded bg-[var(--element-background)] text-[10px] font-mono">F5: Continue</span>
        <span class="px-2 py-0.5 rounded bg-[var(--element-background)] text-[10px] font-mono">F10: Step Over</span>
      </div>`
    },
    agentic: {
      badge: "Human + AI Co-pilot",
      title: "Agentic Editing",
      desc: "Zed natively supports agentic editing, enabling fluent collaboration between humans and AI. Let models read diagnostics, iterate in isolation, and submit cleanly formatted pull requests.",
      visual: `<div class="flex items-center justify-between border-b border-[var(--border)] pb-2 text-[var(--text-muted)]">
        <span>Model: Claude 3.5 Sonnet</span>
        <span class="text-[var(--text-accent)] font-mono">Diff: +28 -4</span>
      </div>
      <div class="space-y-1 text-xs">
        <div class="text-red-400 line-through bg-red-500/10 px-1">- meeting.couldHaveBeenAnEmail = true;</div>
        <div class="text-emerald-400 bg-emerald-500/10 px-1">+ meeting.sanitize_attendees();</div>
        <div class="text-emerald-400 bg-emerald-500/10 px-1">+ cx.notify();</div>
      </div>
      <div class="text-xs text-[var(--text-muted)]">Press Tab to accept entire file change.</div>`
    },
    git: {
      badge: "Version Control",
      title: "Native Git Support",
      desc: "First-class support for staging hunks, committing, pulling, pushing, viewing side-by-side diffs, and conflict resolution directly from your editor canvas.",
      visual: `<div class="flex items-center justify-between border-b border-[var(--border)] pb-2 text-[var(--text-muted)]">
        <span>Branch: feature/gpu-text-shaping</span>
        <span class="text-emerald-400 font-mono">3 files staged</span>
      </div>
      <div class="space-y-1 text-xs">
        <div class="flex items-center justify-between p-1.5 rounded bg-[var(--element-background)]">
          <span>crates/gpui/src/text.rs</span>
          <span class="text-emerald-400">+14</span>
        </div>
        <div class="flex items-center justify-between p-1.5 rounded bg-[var(--element-background)]">
          <span>crates/editor/src/buffer.rs</span>
          <span class="text-amber-400">~6</span>
        </div>
      </div>
      <div class="text-[11px] text-[var(--text-muted)]">Commit message: 'perf: vectorize glyph metrics caching'</div>`
    },
    prediction: {
      badge: "Zeta2 Model",
      title: "Edit Prediction",
      desc: "A tool that anticipates your next move. Powered by Zeta2, our open-weight language model trained specifically on code edit sequences and developer keystroke flows.",
      visual: `<div class="flex items-center justify-between border-b border-[var(--border)] pb-2 text-[var(--text-muted)]">
        <span>Engine: Zeta2 (On-device Inference)</span>
        <span class="text-[var(--text-accent)] font-mono">&lt; 15ms latency</span>
      </div>
      <div class="p-3 rounded bg-[var(--element-background)] text-xs font-mono space-y-1">
        <div><span class="syntax-keyword">const</span> coords = <span class="syntax-fn">get_screen_position</span>(event);</div>
        <div class="text-[var(--predictive)] italic">const [x, y] = [coords.clientX, coords.clientY];</div>
      </div>
      <div class="text-xs text-[var(--text-muted)]">Predicted next keystroke with 94.2% accuracy.</div>`
    }
  };

  featureTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      featureTabs.forEach(t => {
        t.classList.remove("zen-btn-secondary", "active");
        t.classList.add("zen-btn-ghost");
      });
      tab.classList.remove("zen-btn-ghost");
      tab.classList.add("zen-btn-secondary", "active");

      const key = tab.getAttribute("data-tab");
      const d = featureData[key];
      if (d) {
        if (featureBadge) featureBadge.textContent = d.badge;
        if (featureTitle) featureTitle.textContent = d.title;
        if (featureDesc) featureDesc.textContent = d.desc;
        if (featureVisual) featureVisual.innerHTML = d.visual;
      }
    });
  });

  // 8. Interactive AI Assistant Simulator
  const aiInput = document.getElementById("ai-input");
  const aiSubmit = document.getElementById("ai-submit");
  const aiResponseBox = document.getElementById("ai-response-box");

  const aiPresets = {
    "Convert MeetingScheduler to Rust struct": `[Zed AI • Claude 3.5 Sonnet]
Refactoring TypeScript 'MeetingScheduler' into a idiomatic Rust struct:

\`\`\`rust
use gpui::{AppContext, View, WindowContext};

pub struct MeetingScheduler {
    pub default_duration: u32,
    pub max_attendees: usize,
    pub meetings: Vec<Meeting>,
}

impl MeetingScheduler {
    pub fn new(max_attendees: usize) -> Self {
        Self {
            default_duration: 30,
            max_attendees,
            meetings: Vec::new(),
        }
    }
}
\`\`\`
✓ Syntactically verified. Tab to apply diff.`,
    "Optimize GPUI glyph cache": `[Zed AI • Claude 3.5 Sonnet]
Applying SIMD optimization to glyph rasterization buffer:

\`\`\`rust
// Vectorized glyph lookup table
#[inline(always)]
pub fn query_glyph_fast(id: GlyphId) -> Option<&'static GlyphData> {
    unsafe { GLYPH_CACHE.get_unchecked(id.0 as usize) }
}
\`\`\`
✓ Keystroke latency reduced by 1.8ms. Benchmark updated.`,
    "Add rate-limiting middleware": `[Zed AI • Claude 3.5 Sonnet]
Generating Axum rate-limiting layer using Governor:

\`\`\`rust
use tower_governor::{governor::GovernorConfigBuilder, GovernorLayer};

let governor_conf = GovernorConfigBuilder::default()
    .per_second(100)
    .burst_size(20)
    .finish()
    .unwrap();
let app = Router::new().layer(GovernorLayer { config: Box::leak(governor_conf) });
\`\`\`
✓ Ready to merge into crates/server/main.rs`
  };

  function simulateAiResponse(query) {
    if (!aiResponseBox) return;
    aiResponseBox.innerHTML = `
      <div class="text-[var(--text-accent)] flex items-center gap-2">
        <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
        <span>Zed AI thinking and generating unified diff...</span>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      const matchKey = Object.keys(aiPresets).find(k => k.toLowerCase() === query.trim().toLowerCase());
      const reply = matchKey ? aiPresets[matchKey] : `[Zed AI • Claude 3.5 Sonnet]
Analyzing query: "${query}"

\`\`\`typescript
// Generated patch for your active buffer
export function handleCustomRequest(cx: AppContext) {
  console.log("Processing ${query.replace(/"/g, '')}");
  return { status: "success", timestamp: Date.now() };
}
\`\`\`
✓ Verified clean AST without syntax errors.`;

      aiResponseBox.innerHTML = `
        <pre class="whitespace-pre-wrap leading-relaxed text-[var(--text)]">${reply}</pre>
      `;
    }, 600);
  }

  document.querySelectorAll(".ai-sample-prompt").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.textContent.replace(/^"|"$/g, "");
      if (aiInput) aiInput.value = text;
      simulateAiResponse(text);
    });
  });

  if (aiSubmit && aiInput) {
    aiSubmit.addEventListener("click", () => {
      if (aiInput.value.trim()) simulateAiResponse(aiInput.value);
    });
    aiInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && aiInput.value.trim()) simulateAiResponse(aiInput.value);
    });
  }

  // 9. Extensions Live Search & Filter
  const extSearch = document.getElementById("ext-search");
  const extCards = document.querySelectorAll(".ext-card");

  if (extSearch) {
    extSearch.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      extCards.forEach(card => {
        const name = card.getAttribute("data-name") || "";
        if (name.includes(q)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // 10. Performance Benchmarks Interactive Switcher
  const btnStartup = document.getElementById("metric-startup");
  const btnLatency = document.getElementById("metric-latency");
  const btnMemory = document.getElementById("metric-memory");

  const zedMetricVal = document.getElementById("zed-metric-val");
  const sublimeMetricVal = document.getElementById("sublime-metric-val");
  const vscodeMetricVal = document.getElementById("vscode-metric-val");

  const zedBar = document.getElementById("zed-bar");
  const sublimeBar = document.getElementById("sublime-bar");
  const vscodeBar = document.getElementById("vscode-bar");

  const benchmarkData = {
    startup: {
      zed: { val: "58 ms", width: "12%" },
      sublime: { val: "210 ms", width: "25%" },
      vscode: { val: "1,240 ms", width: "100%" }
    },
    latency: {
      zed: { val: "2.1 ms", width: "10%" },
      sublime: { val: "6.8 ms", width: "28%" },
      vscode: { val: "24.3 ms", width: "100%" }
    },
    memory: {
      zed: { val: "84 MB", width: "15%" },
      sublime: { val: "130 MB", width: "23%" },
      vscode: { val: "640 MB", width: "100%" }
    }
  };

  function selectBenchmark(metric) {
    [btnStartup, btnLatency, btnMemory].forEach(b => {
      if (b) {
        b.classList.remove("zen-btn-secondary", "active-metric");
        b.classList.add("zen-btn-ghost");
      }
    });

    const activeBtn = metric === "startup" ? btnStartup : metric === "latency" ? btnLatency : btnMemory;
    if (activeBtn) {
      activeBtn.classList.remove("zen-btn-ghost");
      activeBtn.classList.add("zen-btn-secondary", "active-metric");
    }

    const data = benchmarkData[metric];
    if (data) {
      if (zedMetricVal) zedMetricVal.textContent = data.zed.val;
      if (sublimeMetricVal) sublimeMetricVal.textContent = data.sublime.val;
      if (vscodeMetricVal) vscodeMetricVal.textContent = data.vscode.val;

      if (zedBar) zedBar.style.width = data.zed.width;
      if (sublimeBar) sublimeBar.style.width = data.sublime.width;
      if (vscodeBar) vscodeBar.style.width = data.vscode.width;
    }
  }

  if (btnStartup) btnStartup.addEventListener("click", () => selectBenchmark("startup"));
  if (btnLatency) btnLatency.addEventListener("click", () => selectBenchmark("latency"));
  if (btnMemory) btnMemory.addEventListener("click", () => selectBenchmark("memory"));

  // 11. Modal Windows & Global Hotkey Handling
  const modalDownload = document.getElementById("modal-download");
  const modalSignup = document.getElementById("modal-signup");
  const modalShortcuts = document.getElementById("modal-shortcuts");

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("active");
  }

  function closeAllModals() {
    [modalDownload, modalSignup, modalShortcuts].forEach(m => {
      if (m) m.classList.remove("active");
    });
  }

  // Close buttons inside modals
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });

  // Click on backdrop to close
  [modalDownload, modalSignup, modalShortcuts].forEach(m => {
    if (m) {
      m.addEventListener("click", (e) => {
        if (e.target === m) closeAllModals();
      });
    }
  });

  // Buttons that open modals
  const btnDownloadHeader = document.getElementById("btn-download");
  const btnDownloadHero = document.getElementById("hero-download-btn");
  const btnDownloadCta = document.getElementById("cta-download-btn");
  const btnSignupHeader = document.getElementById("btn-signup");
  const btnShortcutsHeader = document.getElementById("open-shortcuts");

  if (btnDownloadHeader) btnDownloadHeader.addEventListener("click", () => openModal(modalDownload));
  if (btnDownloadHero) btnDownloadHero.addEventListener("click", () => openModal(modalDownload));
  if (btnDownloadCta) btnDownloadCta.addEventListener("click", () => openModal(modalDownload));
  if (btnSignupHeader) btnSignupHeader.addEventListener("click", () => openModal(modalSignup));
  if (btnShortcutsHeader) btnShortcutsHeader.addEventListener("click", () => openModal(modalShortcuts));

  // Global Hotkeys: D, S, C, T, ?, Esc
  window.addEventListener("keydown", (e) => {
    // Ignore hotkeys when typing in input
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;

    const key = e.key.toLowerCase();
    if (key === "d") {
      e.preventDefault();
      openModal(modalDownload);
    } else if (key === "s") {
      e.preventDefault();
      openModal(modalSignup);
    } else if (key === "c") {
      window.open("https://github.com/zed-industries/zed", "_blank");
    } else if (key === "t") {
      toggleTheme();
    } else if (e.key === "?") {
      e.preventDefault();
      openModal(modalShortcuts);
    } else if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // 12. Copy Install Command
  const copyCurlBtn = document.getElementById("copy-curl-btn");
  if (copyCurlBtn) {
    copyCurlBtn.addEventListener("click", () => {
      const cmd = "curl -f https://zed.dev/install.sh | sh";
      navigator.clipboard.writeText(cmd).then(() => {
        copyCurlBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>';
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          copyCurlBtn.innerHTML = '<i data-lucide="copy" class="w-3.5 h-3.5"></i>';
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      });
    });
  }

  // 13. Simulated Sign-up submit
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Welcome to Zed! Your developer preview account is configured.");
      closeAllModals();
    });
  }
});

