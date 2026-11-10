import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, LearningTab, KanaMode } from './components/Navbar';
import { KanaMatrix } from './components/KanaMatrix';
import { KanaFlashcard } from './components/KanaFlashcard';
import { SpeedQuizConsole } from './components/SpeedQuizConsole';
import { GreetingsModule } from './components/GreetingsModule';
import { NihonggoStatusBar } from './components/NihonggoStatusBar';
import { ShortcutsModal } from './components/ShortcutsModal';

import { HIRAGANA_DATA, KATAKANA_DATA, TOTAL_KANA_COUNT } from './data/kanaData';
import { initVoices } from './utils/audio';
import {
  getMasteredKana,
  toggleMasteredKanaInStorage,
  getStreakInfo,
  recordDailyStudy,
} from './utils/storage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LearningTab>('matrix');
  const [kanaMode, setKanaMode] = useState<KanaMode>('hiragana');
  const [masteredSet, setMasteredSet] = useState<Set<string>>(() => getMasteredKana());
  const [streak, setStreak] = useState<number>(() => getStreakInfo().currentStreak);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Dark mode state: default true (Zed dark aesthetic)
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('ajarin_nihonggo_theme');
      return stored ? stored === 'dark' : true;
    } catch {
      return true;
    }
  });

  // Apply dark mode class to html document
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('ajarin_nihonggo_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Init speech voices and daily streak on mount
  useEffect(() => {
    initVoices();
    const updatedStreak = recordDailyStudy();
    setStreak(updatedStreak.currentStreak);
  }, []);

  // Filter current kana pool based on mode (Hiragana or Katakana)
  const currentKanaList = useMemo(() => {
    return kanaMode === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA;
  }, [kanaMode]);

  const handleToggleMastered = (id: string) => {
    toggleMasteredKanaInStorage(id);
    setMasteredSet(new Set(getMasteredKana()));
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Global Hotkey Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toLowerCase();

      // Modal toggle with '?'
      if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // Theme toggle with 'T'
      if (key === 't' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        handleToggleTheme();
        return;
      }

      // If shortcuts modal is open, don't trigger tab navigation
      if (isShortcutsOpen) return;

      // Tab navigation hotkeys
      if (key === 'm') {
        e.preventDefault();
        setActiveTab('matrix');
      } else if (key === 'f') {
        // Only switch tab if not currently in flashcards or quiz
        if (activeTab !== 'flashcards') {
          e.preventDefault();
          setActiveTab('flashcards');
        }
      } else if (key === 'q') {
        e.preventDefault();
        setActiveTab('quiz');
      } else if (key === 'g') {
        e.preventDefault();
        setActiveTab('greetings');
      } else if (key === 'h' && activeTab !== 'flashcards') {
        e.preventDefault();
        setKanaMode('hiragana');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isShortcutsOpen, activeTab]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] transition-colors pb-14 font-sans selection:bg-[var(--text-accent)]/20">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        kanaMode={kanaMode}
        onKanaModeChange={setKanaMode}
        streak={streak}
        masteredCount={masteredSet.size}
        totalKana={TOTAL_KANA_COUNT}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        {activeTab === 'matrix' && (
          <KanaMatrix
            items={currentKanaList}
            masteredSet={masteredSet}
            onToggleMastered={handleToggleMastered}
            kanaTypeTitle={kanaMode === 'hiragana' ? 'Hiragana (ひらがな)' : 'Katakana (カタカナ)'}
          />
        )}

        {activeTab === 'flashcards' && (
          <KanaFlashcard
            items={currentKanaList}
            masteredSet={masteredSet}
            onToggleMastered={handleToggleMastered}
            kanaTypeTitle={kanaMode === 'hiragana' ? 'Hiragana' : 'Katakana'}
          />
        )}

        {activeTab === 'quiz' && (
          <SpeedQuizConsole
            items={currentKanaList}
            kanaTypeTitle={kanaMode === 'hiragana' ? 'Hiragana' : 'Katakana'}
          />
        )}

        {activeTab === 'greetings' && <GreetingsModule />}
      </main>

      {/* Fixed Bottom Nihonggo Status Bar */}
      <NihonggoStatusBar
        activeTab={activeTab}
        kanaMode={kanaMode}
        masteredCount={masteredSet.size}
        totalKana={TOTAL_KANA_COUNT}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Shortcuts Help Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
};

export default App;

