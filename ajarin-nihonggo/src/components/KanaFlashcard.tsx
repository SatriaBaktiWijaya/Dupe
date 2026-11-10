import React, { useState, useEffect } from 'react';
import { KanaItem } from '../data/kanaData';
import { KbdBadge } from './ui/KbdBadge';
import { AudioSpeakerButton } from './ui/AudioSpeakerButton';
import { playJapaneseSpeech } from '../utils/audio';
import { RotateCw, Check, ArrowLeft, ArrowRight, Sparkles, Shuffle } from 'lucide-react';

interface KanaFlashcardProps {
  items: KanaItem[];
  masteredSet: Set<string>;
  onToggleMastered: (id: string) => void;
  kanaTypeTitle: string;
}

export const KanaFlashcard: React.FC<KanaFlashcardProps> = ({
  items,
  masteredSet,
  onToggleMastered,
  kanaTypeTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardDeck, setCardDeck] = useState<KanaItem[]>(items);

  useEffect(() => {
    setCardDeck(items);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [items]);

  const currentItem = cardDeck[currentIndex] || items[0];
  const isMastered = currentItem ? masteredSet.has(currentItem.id) : false;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cardDeck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cardDeck.length) % cardDeck.length);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleShuffle = () => {
    const shuffled = [...cardDeck].sort(() => Math.random() - 0.5);
    setCardDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleMarkMastered = () => {
    if (currentItem && !isMastered) {
      onToggleMastered(currentItem.id);
    }
    handleNext();
  };

  // Keyboard Navigation: Space = Audio, F/Enter = Flip, J = Skip, K = Master, Left/Right
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (currentItem) playJapaneseSpeech(currentItem.character);
      } else if (e.key.toLowerCase() === 'f' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key.toLowerCase() === 'j') {
        e.preventDefault();
        handleNext();
      } else if (e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleMarkMastered();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentItem, cardDeck.length, isMastered]);

  if (!currentItem) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--text)]">Flashcard {kanaTypeTitle}</span>
          <span>•</span>
          <span>Kartu {currentIndex + 1} dari {cardDeck.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShuffle}
            className="px-2.5 py-1 rounded bg-[var(--element-background)] hover:bg-[var(--element-hover)] border border-[var(--border)] text-[var(--text)] flex items-center gap-1.5 transition-colors"
            title="Acak Kartu"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Acak</span>
          </button>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="perspective-1000 w-full min-h-[380px] cursor-pointer" onClick={handleFlip}>
        <div
          className={`relative w-full h-[380px] rounded-2xl border transition-all duration-300 transform-style-preserve-3d shadow-xl ${
            isFlipped ? 'rotate-y-180' : ''
          } ${
            isMastered
              ? 'border-[var(--success)] bg-[var(--surface-background)]'
              : 'border-[var(--border)] bg-[var(--surface-background)] hover:border-[var(--border-focused)]'
          }`}
        >
          {/* ================= CARD FRONT ================= */}
          <div className="absolute inset-0 backface-hidden p-8 flex flex-col justify-between rounded-2xl select-none">
            {/* Front Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--element-background)] border border-[var(--border)]">
                {currentItem.type} • {currentItem.strokeCount} goresan
              </span>

              {isMastered && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--success-background)] text-[var(--success)] border border-[var(--success-border)] flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Dikuasai</span>
                </span>
              )}
            </div>

            {/* Front Center: Large Kana */}
            <div className="text-center space-y-2">
              <span className="kana-display text-8xl font-bold tracking-tight text-[var(--text)] block drop-shadow-sm">
                {currentItem.character}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Klik kartu atau tekan <KbdBadge>F</KbdBadge> untuk membalik
              </span>
            </div>

            {/* Front Bottom */}
            <div className="flex items-center justify-between border-t border-[var(--border-variant)] pt-4">
              <div className="flex items-center gap-2">
                <AudioSpeakerButton textToSpeak={currentItem.character} size="md" />
                <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline">
                  Tekan <KbdBadge>Space</KbdBadge> untuk suara
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-[var(--text-accent)] font-mono">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Balik Kartu</span>
              </div>
            </div>
          </div>

          {/* ================= CARD BACK ================= */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 p-8 flex flex-col justify-between rounded-2xl select-none bg-[var(--elevated_surface-background)]">
            {/* Back Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <span className="kana-display text-2xl font-bold text-[var(--text)]">
                  {currentItem.character}
                </span>
                <span className="text-xl font-mono font-bold text-[var(--text-accent)] uppercase">
                  {currentItem.romaji}
                </span>
              </div>
              <AudioSpeakerButton textToSpeak={currentItem.character} size="sm" />
            </div>

            {/* Back Body: Example & Mnemonic */}
            <div className="space-y-4 py-2">
              <div className="p-3.5 rounded-lg bg-[var(--element-background)] border border-[var(--border)] space-y-1">
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Contoh Kosakata</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="kana-display font-semibold text-[var(--text)] mr-2">{currentItem.example.word}</span>
                    <span className="font-mono text-xs text-[var(--text-muted)] mr-2">({currentItem.example.reading})</span>
                    <span className="font-medium text-[var(--text-accent)]">= {currentItem.example.meaning}</span>
                  </div>
                  <AudioSpeakerButton textToSpeak={currentItem.example.word} size="sm" />
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--surface-background)] border border-[var(--border-variant)] space-y-1">
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Tips Menghafal (Mnemonic)</span>
                </div>
                <p className="text-xs text-[var(--text)] leading-relaxed italic">
                  "{currentItem.mnemonic}"
                </p>
              </div>
            </div>

            {/* Back Bottom */}
            <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs font-mono text-[var(--text-muted)]">
              <span>Klik untuk kembali</span>
              <span className="text-[var(--text-accent)]">Goresan: {currentItem.strokeCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons & Hotkey Bar */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handlePrev}
          className="zen-btn zen-btn-secondary zen-btn-sm"
          title="Kartu Sebelumnya"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Sebelumnya</span>
          <KbdBadge>←</KbdBadge>
        </button>

        <div className="flex items-center gap-2">
          {/* Need Review Button */}
          <button
            type="button"
            onClick={handleNext}
            className="zen-btn zen-btn-ghost zen-btn-sm text-xs font-mono"
            title="Lewati / Ulangi Nanti"
          >
            <span>Ulangi</span>
            <KbdBadge>J</KbdBadge>
          </button>

          {/* Mark Mastered Button */}
          <button
            type="button"
            onClick={handleMarkMastered}
            className={`zen-btn zen-btn-sm font-mono ${
              isMastered ? 'zen-btn-secondary' : 'zen-btn-primary bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
            title="Tandai Sudah Dikuasai"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isMastered ? 'Kuasai ✓' : 'Tandai Kuasai'}</span>
            <KbdBadge>K</KbdBadge>
          </button>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="zen-btn zen-btn-secondary zen-btn-sm"
          title="Kartu Selanjutnya"
        >
          <span>Selanjutnya</span>
          <KbdBadge>→</KbdBadge>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default KanaFlashcard;

