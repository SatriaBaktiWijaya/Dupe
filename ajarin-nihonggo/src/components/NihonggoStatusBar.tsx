import React from 'react';
import { KbdBadge } from './ui/KbdBadge';
import { BookOpen, GitBranch, Volume2, HelpCircle } from 'lucide-react';
import { LearningTab, KanaMode } from './Navbar';

interface NihonggoStatusBarProps {
  activeTab: LearningTab;
  kanaMode: KanaMode;
  masteredCount: number;
  totalKana: number;
  onOpenShortcuts: () => void;
}

export const NihonggoStatusBar: React.FC<NihonggoStatusBarProps> = ({
  activeTab,
  kanaMode,
  masteredCount,
  totalKana,
  onOpenShortcuts,
}) => {
  const tabLabels = {
    matrix: 'Matriks Gojūon',
    flashcards: 'Flashcard 3D',
    quiz: 'Speed Quiz',
    greetings: 'Ungkapan Salam',
  };

  const progressPercent = Math.round((masteredCount / totalKana) * 100);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 h-7 bg-[var(--surface-background)] border-t border-[var(--border)] px-3 text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between select-none">
      {/* Left items */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[var(--text)]">
          <BookOpen className="w-3 h-3 text-[var(--text-accent)]" />
          <span className="font-semibold">ajarin-nihonggo</span>
        </div>

        <span className="text-[var(--border)]">•</span>

        <div className="flex items-center gap-1">
          <span className="capitalize">{kanaMode}</span>
          <span className="text-[var(--text)] font-semibold">
            ({kanaMode === 'hiragana' ? 'あ' : 'ア'})
          </span>
        </div>

        <span className="text-[var(--border)]">•</span>

        <div className="hidden sm:inline-flex items-center gap-1 text-[var(--text-accent)]">
          <span>{tabLabels[activeTab]}</span>
        </div>

        <span className="text-[var(--border)] hidden sm:inline">•</span>

        <div className="hidden md:inline-flex items-center gap-1">
          <span>Progres:</span>
          <span className="font-bold text-[var(--text)]">
            {masteredCount}/{totalKana} ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* Right items */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5" title="Audio engine native Web Speech API">
          <Volume2 className="w-3 h-3 text-[var(--success)]" />
          <span>ja-JP 0.85x</span>
        </div>

        <span className="text-[var(--border)] hidden sm:inline">•</span>

        <button
          type="button"
          onClick={onOpenShortcuts}
          className="flex items-center gap-1 hover:text-[var(--text)] transition-colors"
          title="Buka daftar shortcut keyboard"
        >
          <HelpCircle className="w-3 h-3" />
          <span>Shortcuts</span>
          <KbdBadge className="h-4 min-w-[1rem] text-[10px]">?</KbdBadge>
        </button>

        <span className="text-[var(--border)]">•</span>

        <span className="text-[10px] text-[var(--text-muted)] hidden lg:inline">
          Zed Design System
        </span>
      </div>
    </footer>
  );
};

export default NihonggoStatusBar;

