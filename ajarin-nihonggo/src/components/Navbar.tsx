import React from 'react';
import { KbdBadge } from './ui/KbdBadge';
import { Flame, CheckCircle2, Moon, Sun, HelpCircle } from 'lucide-react';

export type LearningTab = 'matrix' | 'flashcards' | 'quiz' | 'greetings';
export type KanaMode = 'hiragana' | 'katakana';

interface NavbarProps {
  activeTab: LearningTab;
  onTabChange: (tab: LearningTab) => void;
  kanaMode: KanaMode;
  onKanaModeChange: (mode: KanaMode) => void;
  streak: number;
  masteredCount: number;
  totalKana: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenShortcuts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  kanaMode,
  onKanaModeChange,
  streak,
  masteredCount,
  totalKana,
  isDark,
  onToggleTheme,
  onOpenShortcuts,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[var(--surface-background)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Kana Mode Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--element-background)] border border-[var(--border)] flex items-center justify-center font-bold text-lg text-[var(--text-accent)] shadow-sm">
              あ
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-[var(--text)] flex items-center gap-1.5">
                <span>Ajarin Nihonggo</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--element-background)] text-[var(--text-muted)] border border-[var(--border)]">
                  Zed Edition
                </span>
              </div>
              <div className="text-[10px] font-mono text-[var(--text-muted)]">あじゃりん日本語</div>
            </div>
          </div>

          {/* Kana Switcher Pills (Hiragana / Katakana) */}
          <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-[var(--element-background)] border border-[var(--border)]">
            <button
              type="button"
              onClick={() => onKanaModeChange('hiragana')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                kanaMode === 'hiragana'
                  ? 'bg-[var(--surface-background)] text-[var(--text)] shadow-sm border border-[var(--border)] font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Hiragana (あ)
            </button>
            <button
              type="button"
              onClick={() => onKanaModeChange('katakana')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                kanaMode === 'katakana'
                  ? 'bg-[var(--surface-background)] text-[var(--text)] shadow-sm border border-[var(--border)] font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Katakana (ア)
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onTabChange('matrix')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-[var(--element-active)] text-[var(--text)] border border-[var(--border-focused)]'
                : 'text-[var(--text-muted)] hover:bg-[var(--element-hover)] hover:text-[var(--text)]'
            }`}
          >
            <span>Matriks</span>
            <KbdBadge className="hidden md:inline-flex">M</KbdBadge>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('flashcards')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'flashcards'
                ? 'bg-[var(--element-active)] text-[var(--text)] border border-[var(--border-focused)]'
                : 'text-[var(--text-muted)] hover:bg-[var(--element-hover)] hover:text-[var(--text)]'
            }`}
          >
            <span>Flashcard</span>
            <KbdBadge className="hidden md:inline-flex">F</KbdBadge>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('quiz')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-[var(--element-active)] text-[var(--text)] border border-[var(--border-focused)]'
                : 'text-[var(--text-muted)] hover:bg-[var(--element-hover)] hover:text-[var(--text)]'
            }`}
          >
            <span>Kuis Cepat</span>
            <KbdBadge className="hidden md:inline-flex">Q</KbdBadge>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('greetings')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'greetings'
                ? 'bg-[var(--element-active)] text-[var(--text)] border border-[var(--border-focused)]'
                : 'text-[var(--text-muted)] hover:bg-[var(--element-hover)] hover:text-[var(--text)]'
            }`}
          >
            <span>Salam</span>
            <KbdBadge className="hidden md:inline-flex">G</KbdBadge>
          </button>
        </nav>

        {/* Right Badges & Controls */}
        <div className="flex items-center gap-2.5">
          {/* Streak Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--element-background)] border border-[var(--border)] text-xs font-mono" title="Hari belajar berturut-turut">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-[var(--text)]">{streak}</span>
            <span className="text-[var(--text-muted)]">hari</span>
          </div>

          {/* Mastered Counter */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--element-background)] border border-[var(--border)] text-xs font-mono" title="Karakter yang telah dikuasai">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
            <span className="font-bold text-[var(--text)]">{masteredCount}/{totalKana}</span>
          </div>

          {/* Shortcuts Dialog Button */}
          <button
            type="button"
            onClick={onOpenShortcuts}
            className="p-1.5 rounded-md border border-[var(--border)] bg-[var(--element-background)] hover:bg-[var(--element-hover)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            title="Daftar Shortcut Keyboard (Hotkey: ?)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 rounded-md border border-[var(--border)] bg-[var(--element-background)] hover:bg-[var(--element-hover)] text-[var(--text-muted)] hover:text-[var(--text)] flex items-center gap-1 transition-colors"
            title="Ganti Tema (Hotkey: T)"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
