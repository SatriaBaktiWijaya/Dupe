import React from 'react';
import { KanaItem } from '../../data/kanaData';
import { AudioSpeakerButton } from './AudioSpeakerButton';
import { Check } from 'lucide-react';

interface KanaTileProps {
  item: KanaItem;
  isMastered: boolean;
  onToggleMastered: (id: string) => void;
  onClickDetail?: (item: KanaItem) => void;
}

export const KanaTile: React.FC<KanaTileProps> = ({
  item,
  isMastered,
  onToggleMastered,
  onClickDetail,
}) => {
  return (
    <div
      onClick={() => onClickDetail?.(item)}
      className={`group relative flex flex-col justify-between p-2.5 rounded-lg border transition-all duration-150 cursor-pointer select-none bg-[var(--surface-background)] hover:bg-[var(--element-hover)] ${
        isMastered
          ? 'border-[var(--success)] shadow-[0_0_10px_rgba(161,193,129,0.15)]'
          : 'border-[var(--border)] hover:border-[var(--border-focused)]'
      }`}
    >
      {/* Top Header: Romaji & Mastered Status Indicator */}
      <div className="flex items-center justify-between w-full">
        <span className="font-mono text-xs font-semibold text-[var(--text-muted)] group-hover:text-[var(--text-accent)] uppercase">
          {item.romaji}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMastered(item.id);
          }}
          title={isMastered ? 'Tandai belum hafal' : 'Tandai sudah dikuasai'}
          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
            isMastered
              ? 'bg-[var(--success)] border-[var(--success)] text-black'
              : 'border-[var(--border)] group-hover:border-[var(--text-muted)]'
          }`}
        >
          {isMastered && <Check className="w-2.5 h-2.5 stroke-[3]" />}
        </button>
      </div>

      {/* Main Kana Character Display */}
      <div className="py-2 text-center">
        <span className="kana-display text-3xl font-medium tracking-tight text-[var(--text)] transition-transform group-hover:scale-110 inline-block">
          {item.character}
        </span>
      </div>

      {/* Bottom Audio Trigger & Stroke Count */}
      <div className="flex items-center justify-between pt-1 border-t border-[var(--border-variant)]">
        <span className="text-[10px] font-mono text-[var(--text-muted)]">
          {item.strokeCount} gores
        </span>
        <AudioSpeakerButton textToSpeak={item.character} size="sm" />
      </div>
    </div>
  );
};

export default KanaTile;
