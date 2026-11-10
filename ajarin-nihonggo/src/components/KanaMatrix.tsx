import React, { useState } from 'react';
import { KanaItem } from '../data/kanaData';
import { KanaTile } from './ui/KanaTile';
import { AudioSpeakerButton } from './ui/AudioSpeakerButton';
import { X, BookOpen, Sparkles, Filter } from 'lucide-react';

interface KanaMatrixProps {
  items: KanaItem[];
  masteredSet: Set<string>;
  onToggleMastered: (id: string) => void;
  kanaTypeTitle: string;
}

export const KanaMatrix: React.FC<KanaMatrixProps> = ({
  items,
  masteredSet,
  onToggleMastered,
  kanaTypeTitle,
}) => {
  const [selectedRow, setSelectedRow] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<KanaItem | null>(null);

  const rowFilters = [
    { key: 'all', label: 'Semua (46)' },
    { key: 'vowel', label: 'Vokal (a,i,u,e,o)' },
    { key: 'k', label: 'K-Row (ka..)' },
    { key: 's', label: 'S-Row (sa..)' },
    { key: 't', label: 'T-Row (ta..)' },
    { key: 'n', label: 'N-Row (na..)' },
    { key: 'h', label: 'H-Row (ha..)' },
    { key: 'm', label: 'M-Row (ma..)' },
    { key: 'y', label: 'Y-Row (ya..)' },
    { key: 'r', label: 'R-Row (ra..)' },
    { key: 'w', label: 'W-Row (wa..)' },
  ];

  const filteredItems = selectedRow === 'all'
    ? items
    : items.filter((item) => item.row === selectedRow);

  const masteredCount = items.filter((i) => masteredSet.has(i.id)).length;
  const progressPercent = Math.round((masteredCount / items.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Controls & Progress Bar */}
      <div className="p-4 rounded-xl bg-[var(--surface-background)] border border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--text)] flex items-center gap-2">
            <span>Matriks {kanaTypeTitle} (五十音 - Gojūon)</span>
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Klik ubin untuk melihat detail goresan, contoh kosakata, dan mnemonic.
          </p>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full md:w-64 space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[var(--text-muted)]">Penguasaan:</span>
            <span className="font-bold text-[var(--text-accent)]">{masteredCount}/{items.length} ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--element-background)] border border-[var(--border)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#5c78e2] to-[#a1c181] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Row Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 pl-1 pr-2 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Baris:</span>
        </span>
        {rowFilters.map((rf) => (
          <button
            key={rf.key}
            type="button"
            onClick={() => setSelectedRow(rf.key)}
            className={`px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-all border ${
              selectedRow === rf.key
                ? 'bg-[var(--element-active)] text-[var(--text)] border-[var(--border-focused)] font-semibold'
                : 'bg-[var(--element-background)] text-[var(--text-muted)] border-[var(--border)] hover:bg-[var(--element-hover)]'
            }`}
          >
            {rf.label}
          </button>
        ))}
      </div>

      {/* Kana Grid Display */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {filteredItems.map((item) => (
          <KanaTile
            key={item.id}
            item={item}
            isMastered={masteredSet.has(item.id)}
            onToggleMastered={onToggleMastered}
            onClickDetail={(it) => setActiveItem(it)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--surface-background)] border border-[var(--border)] rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[var(--text-accent)]" />
                <span className="text-sm font-semibold">Detail Aksara {activeItem.character}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Character Showcase */}
            <div className="p-4 rounded-xl bg-[var(--element-background)] border border-[var(--border)] flex items-center justify-between">
              <div>
                <span className="kana-display text-5xl font-bold text-[var(--text)] block">
                  {activeItem.character}
                </span>
                <span className="font-mono text-sm text-[var(--text-accent)] font-semibold uppercase">
                  romaji: {activeItem.romaji}
                </span>
              </div>
              <div className="flex flex-col items-end gap-2">
                <AudioSpeakerButton textToSpeak={activeItem.character} size="lg" label="Dengarkan pelafalan" />
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {activeItem.strokeCount} Goresan
                </span>
              </div>
            </div>

            {/* Example Vocabulary */}
            <div className="p-3.5 rounded-lg border border-[var(--border)] bg-[var(--surface-background)] space-y-1.5">
              <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Contoh Kosakata</div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="kana-display text-lg font-semibold text-[var(--text)] mr-2">
                    {activeItem.example.word}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)] mr-2">
                    ({activeItem.example.reading})
                  </span>
                  <span className="text-sm font-medium text-[var(--text-accent)]">
                    = {activeItem.example.meaning}
                  </span>
                </div>
                <AudioSpeakerButton textToSpeak={activeItem.example.word} size="sm" />
              </div>
            </div>

            {/* Mnemonic Trick */}
            <div className="p-3.5 rounded-lg border border-[var(--border-variant)] bg-[var(--element-background)] space-y-1">
              <div className="text-[11px] font-mono uppercase text-[var(--text-muted)] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Tips Cepat Ingat (Mnemonic)</span>
              </div>
              <p className="text-xs text-[var(--text)] leading-relaxed italic">
                "{activeItem.mnemonic}"
              </p>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  onToggleMastered(activeItem.id);
                  setActiveItem(null);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all ${
                  masteredSet.has(activeItem.id)
                    ? 'bg-[var(--element-background)] text-[var(--text-muted)] border-[var(--border)] hover:text-red-400'
                    : 'bg-[var(--success)] text-black border-[var(--success)] font-semibold'
                }`}
              >
                {masteredSet.has(activeItem.id) ? 'Batal Tandai Kuasai' : 'Tandai Sudah Kuasai ✓'}
              </button>

              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text)] font-mono"
              >
                Tutup [esc]
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default KanaMatrix;

