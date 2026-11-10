import React, { useEffect } from 'react';
import { KbdBadge } from './ui/KbdBadge';
import { X, Command, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutGroup {
  category: string;
  items: {
    keys: string[];
    description: string;
  }[];
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    category: 'Navigasi Tab & Mode',
    items: [
      { keys: ['M'], description: 'Buka Matriks Gojūon (五十音)' },
      { keys: ['F'], description: 'Buka Latihan Flashcard 3D' },
      { keys: ['Q'], description: 'Buka Kuis Kecepatan (Speed Quiz)' },
      { keys: ['G'], description: 'Buka Ungkapan Sehari-hari (Salam)' },
      { keys: ['H'], description: 'Beralih ke mode Hiragana' },
      { keys: ['K'], description: 'Beralih ke mode Katakana' },
    ],
  },
  {
    category: 'Kontrol Flashcard 3D',
    items: [
      { keys: ['Space'], description: 'Dengarkan suara pelafalan aksara' },
      { keys: ['F', 'Enter'], description: 'Balik kartu (lihat Romaji & contoh)' },
      { keys: ['J'], description: 'Ulangi / lanjut ke kartu berikutnya' },
      { keys: ['K'], description: 'Tandai aksara telah dikuasai ✓' },
      { keys: ['←', '→'], description: 'Navigasi kartu sebelumnya / selanjutnya' },
    ],
  },
  {
    category: 'Kontrol Kuis Kecepatan',
    items: [
      { keys: ['1', '2', '3', '4'], description: 'Pilih opsi jawaban 1 sampai 4' },
      { keys: ['R'], description: 'Mulai ronde kuis baru saat selesai' },
    ],
  },
  {
    category: 'Global',
    items: [
      { keys: ['T'], description: 'Ganti tema (Dark / Light mode)' },
      { keys: ['?'], description: 'Buka / tutup dialog shortcut ini' },
      { keys: ['Esc'], description: 'Tutup modal atau popup yang aktif' },
    ],
  },
];

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[var(--surface-background)] border border-[var(--border)] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-[var(--text-accent)]" />
            <h3 className="text-base font-bold text-[var(--text)]">
              Pintasan Keyboard (Keyboard Shortcuts)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--element-hover)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {SHORTCUT_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2.5">
              <div className="text-xs font-mono font-semibold text-[var(--text-accent)] uppercase tracking-wider">
                {group.category}
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--element-background)] divide-y divide-[var(--border)] overflow-hidden">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="px-4 py-2.5 flex items-center justify-between text-xs hover:bg-[var(--element-hover)] transition-colors"
                  >
                    <span className="text-[var(--text)]">{item.description}</span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((k, kIdx) => (
                        <KbdBadge key={kIdx}>{k}</KbdBadge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[var(--border)] bg-[var(--element-background)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
          <span>Dirancang untuk alur belajar cepat tanpa mouse.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-[var(--surface-background)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--element-hover)] transition-colors"
          >
            Tutup [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortcutsModal;

