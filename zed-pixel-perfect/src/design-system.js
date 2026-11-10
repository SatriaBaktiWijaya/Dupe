// Zed Design System Interactive Showcase Logic

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Theme Toggle Logic
  const themeToggle = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;

  // Check saved theme
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
    showToast(`Switched to ${isDark ? "Dark" : "Light"} mode`);
    if (window.lucide) window.lucide.createIcons();
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // 2. Global Hotkey Listeners
  window.addEventListener("keydown", (e) => {
    // If typing in input, ignore
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;

    if (e.key.toLowerCase() === "t") {
      toggleTheme();
    }
  });

  // 3. Copy Token Toast Logic
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  let toastTimer = null;

  function showToast(text) {
    if (!toast) return;
    toastMsg.textContent = text;
    toast.classList.remove("opacity-0", "translate-y-12", "pointer-events-none");
    toast.classList.add("opacity-100", "translate-y-0");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-12", "pointer-events-none");
    }, 2200);
  }

  // Bind click-to-copy on color cards
  document.querySelectorAll(".color-card").forEach((card) => {
    card.addEventListener("click", () => {
      const varName = card.getAttribute("data-var");
      const varVal = card.getAttribute("data-value");
      const textToCopy = `var(${varName})`;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied ${textToCopy} to clipboard!`);
      }).catch(() => {
        showToast(`Selected ${varName}`);
      });
    });
  });

  // 4. Interactive Code Editor Language Switcher
  const langRs = document.getElementById("editor-lang-rs");
  const langTs = document.getElementById("editor-lang-ts");
  const langPy = document.getElementById("editor-lang-py");

  const editorFilePath = document.getElementById("editor-file-path");
  const tab1Name = document.getElementById("tab-1-name");
  const editorCode = document.getElementById("editor-code");
  const editorLangIndicator = document.getElementById("editor-lang-indicator");

  const codeSnippets = {
    rs: {
      file: "src/platform/gpui.rs",
      tab: "gpui.rs",
      lang: "Rust",
      code: `<div><span class="syntax-keyword">use</span> gpui::<span class="syntax-type">WindowContext</span>;</div>
<div><span class="syntax-keyword">use</span> crate::element::<span class="syntax-type">InteractiveElement</span>;</div>
<div class="bg-[var(--editor-active_line-background)] -mx-5 px-5"><span class="syntax-keyword">pub struct</span> <span class="syntax-type">EditorView</span> {</div>
<div>    <span class="syntax-prop">buffer_id</span>: <span class="syntax-type">u64</span>,</div>
<div>    <span class="syntax-prop">cursor_pos</span>: (<span class="syntax-type">usize</span>, <span class="syntax-type">usize</span>),</div>
<div>}</div>
<div></div>
<div><span class="syntax-keyword">impl</span> <span class="syntax-type">EditorView</span> {</div>
<div>    <span class="syntax-keyword">pub fn</span> <span class="syntax-fn">paint</span>(&<span class="syntax-keyword">mut</span> <span class="syntax-var">self</span>, <span class="syntax-var">cx</span>: &<span class="syntax-keyword">mut</span> <span class="syntax-type">WindowContext</span>) {</div>
<div>        <span class="syntax-comment">// Fast GPU rasterization loop</span></div>
<div>        <span class="syntax-var">cx</span>.<span class="syntax-fn">draw_glyphs</span>(<span class="syntax-str">"Instant keystroke response"</span>);</div>
<div>    }</div>
<div>}</div>`
    },
    ts: {
      file: "src/components/scheduler.tsx",
      tab: "scheduler.tsx",
      lang: "TypeScript",
      code: `<div><span class="syntax-keyword">import</span> * <span class="syntax-keyword">as</span> React <span class="syntax-keyword">from</span> <span class="syntax-str">"react"</span>;</div>
<div><span class="syntax-keyword">import</span> { <span class="syntax-fn">format</span>, <span class="syntax-fn">addMinutes</span> } <span class="syntax-keyword">from</span> <span class="syntax-str">"date-fns"</span>;</div>
<div></div>
<div><span class="syntax-comment">// Meeting types for asynchronous teams</span></div>
<div><span class="syntax-keyword">interface</span> <span class="syntax-type">MeetingSchedulerProps</span> {</div>
<div>  <span class="syntax-prop">defaultDuration</span>?: <span class="syntax-type">number</span>;</div>
<div>  <span class="syntax-prop">maxAttendees</span>?: <span class="syntax-type">number</span>;</div>
<div>  <span class="syntax-prop">onMeetingCreate</span>?: (<span class="syntax-var">m</span>: <span class="syntax-type">Meeting</span>) => <span class="syntax-type">void</span>;</div>
<div>}</div>
<div class="bg-[var(--editor-active_line-background)] -mx-5 px-5"><span class="syntax-keyword">export function</span> <span class="syntax-fn">MeetingScheduler</span>({ <span class="syntax-var">maxAttendees</span> = <span class="syntax-num">10</span> }: <span class="syntax-type">MeetingSchedulerProps</span>) {</div>
<div>  <span class="syntax-keyword">const</span> [<span class="syntax-var">loading</span>, <span class="syntax-var">setLoading</span>] = React.<span class="syntax-fn">useState</span>(<span class="syntax-num">false</span>);</div>
<div>  <span class="syntax-keyword">return</span> <span class="syntax-tag">&lt;div</span> <span class="syntax-prop">className</span>=<span class="syntax-str">"zen-card"</span><span class="syntax-tag">&gt;</span><span class="syntax-str">Syncing with Zeta2 AI</span><span class="syntax-tag">&lt;/div&gt;</span>;</div>
<div>}</div>`
    },
    py: {
      file: "ai/agent_runner.py",
      tab: "agent_runner.py",
      lang: "Python",
      code: `<div><span class="syntax-keyword">from</span> dataclasses <span class="syntax-keyword">import</span> dataclass</div>
<div><span class="syntax-keyword">import</span> asyncio</div>
<div></div>
<div>@dataclass</div>
<div><span class="syntax-keyword">class</span> <span class="syntax-type">AgentSession</span>:</div>
<div>    <span class="syntax-prop">session_id</span>: <span class="syntax-type">str</span></div>
<div>    <span class="syntax-prop">model</span>: <span class="syntax-type">str</span> = <span class="syntax-str">"claude-3-5-sonnet"</span></div>
<div></div>
<div class="bg-[var(--editor-active_line-background)] -mx-5 px-5"><span class="syntax-keyword">async def</span> <span class="syntax-fn">dispatch_parallel_agents</span>(<span class="syntax-var">tasks</span>: <span class="syntax-type">list</span>[<span class="syntax-type">str</span>]):</div>
<div>    <span class="syntax-comment"># Zed natively supports parallel ACP worker loops</span></div>
<div>    <span class="syntax-var">results</span> = <span class="syntax-keyword">await</span> asyncio.<span class="syntax-fn">gather</span>(*[<span class="syntax-fn">run_task</span>(<span class="syntax-var">t</span>) <span class="syntax-keyword">for</span> <span class="syntax-var">t</span> <span class="syntax-keyword">in</span> <span class="syntax-var">tasks</span>])</div>
<div>    <span class="syntax-keyword">return</span> <span class="syntax-var">results</span></div>`
    }
  };

  function selectLanguage(key) {
    [langRs, langTs, langPy].forEach(b => {
      if (b) {
        b.classList.remove("zen-btn-secondary");
        b.classList.add("zen-btn-ghost");
      }
    });

    const activeBtn = key === "rs" ? langRs : key === "ts" ? langTs : langPy;
    if (activeBtn) {
      activeBtn.classList.remove("zen-btn-ghost");
      activeBtn.classList.add("zen-btn-secondary");
    }

    const data = codeSnippets[key];
    if (data && editorFilePath && tab1Name && editorCode && editorLangIndicator) {
      editorFilePath.textContent = data.file;
      tab1Name.textContent = data.tab;
      editorCode.innerHTML = data.code;
      editorLangIndicator.textContent = data.lang;
    }
  }

  if (langRs) langRs.addEventListener("click", () => selectLanguage("rs"));
  if (langTs) langTs.addEventListener("click", () => selectLanguage("ts"));
  if (langPy) langPy.addEventListener("click", () => selectLanguage("py"));
});

