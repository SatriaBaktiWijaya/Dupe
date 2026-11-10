import React, { useState } from 'react';
import { GREETINGS_DATA, GreetingItem } from '../data/greetingsData';
import { AudioSpeakerButton } from './ui/AudioSpeakerButton';
import { playJapaneseSpeech } from '../utils/audio';
import { Search, MessageSquare, Info } from 'lucide-react';

export const GreetingsModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGreeting, setActiveGreeting] = useState<GreetingItem | null>(null);

  const filteredGreetings = GREETINGS_DATA.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.japanese.toLowerCase().includes(q) ||
      item.romaji.toLowerCase().includes(q) ||
      item.meaningId.toLowerCase().includes(q) ||
      item.situation.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="p-4 rounded-xl bg-[var(--surface-background)] border border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--text)] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[var(--text-accent)]" />
            <span>Ungkapan Sehari-hari (Aisatsu - 挨拶)</span>
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Pelajari pelafalan salam esensial, konteks situasi etika Jepang, dan dekonstruksi tiap hurufnya.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari salam atau arti..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[var(--element-background)] border border-[var(--border)] text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--border-focused)] transition-colors"
          />
        </div>
      </div>

      {/* Greetings Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGreetings.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveGreeting(item)}
            className="group p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-background)] hover:bg-[var(--element-hover)] hover:border-[var(--border-focused)] transition-all duration-150 flex flex-col justify-between space-y-4 cursor-pointer shadow-sm"
          >
            {/* Top Bar: Meaning & Audio */}
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--element-background)] text-[var(--text-accent)] border border-[var(--border)]">
                {item.meaningId}
              </span>
              <AudioSpeakerButton textToSpeak={item.japanese} size="sm" />
            </div>

            {/* Main Japanese Text & Romaji */}
            <div className="space-y-1">
              <div className="kana-display text-2xl font-bold text-[var(--text)] group-hover:text-[var(--text-accent)] transition-colors">
                {item.japanese}
              </div>
              <div className="font-mono text-xs text-[var(--text-muted)]">
                {item.romaji}
              </div>
            </div>

            {/* Kana Breakdown Pills */}
            <div className="space-y-1.5 pt-2 border-t border-[var(--border-variant)]">
              <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase flex items-center gap-1">
                <Info className="w-3 h-3" />
                <span>Uraian Aksara Kana:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {item.kanaBreakdown.map((kana, kIdx) => (
                  <button
                    key={kIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playJapaneseSpeech(kana);
                    }}
                    title={`Dengarkan ${kana}`}
                    className="w-6 h-6 rounded bg-[var(--element-background)] border border-[var(--border)] hover:border-[var(--border-focused)] hover:text-[var(--text-accent)] text-xs font-mono font-medium flex items-center justify-center text-[var(--text)] transition-colors"
                  >
                    {kana}
                  </button>
                ))}
              </div>
            </div>

            {/* Context/Situation Note */}
            <div className="text-[11px] text-[var(--text-muted)] leading-relaxed italic bg-[var(--element-background)] p-2.5 rounded-lg border border-[var(--border)]">
              {item.situation}
            </div>
          </div>
        ))}
      </div>

      {filteredGreetings.length === 0 && (
        <div className="text-center py-12 text-[var(--text-muted)] font-mono text-xs">
          Tidak ada ungkapan yang cocok dengan "{searchQuery}".
        </div>
      )}
    </div>
  );
};

export default GreetingsModule;

