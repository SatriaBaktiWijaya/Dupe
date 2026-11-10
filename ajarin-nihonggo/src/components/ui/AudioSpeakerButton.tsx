import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playJapaneseSpeech } from '../../utils/audio';

interface AudioSpeakerButtonProps {
  textToSpeak: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  rate?: number;
  label?: string;
}

export const AudioSpeakerButton: React.FC<AudioSpeakerButtonProps> = ({
  textToSpeak,
  className = '',
  size = 'md',
  rate = 0.85,
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;
    setIsPlaying(true);
    await playJapaneseSpeech(textToSpeak, rate);
    setIsPlaying(false);
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  const btnPaddings = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2',
  }[size];

  return (
    <button
      type="button"
      onClick={handlePlay}
      title={label || `Dengarkan pelafalan "${textToSpeak}"`}
      className={`inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--element-background)] hover:bg-[var(--element-hover)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all duration-150 active:scale-95 ${btnPaddings} ${
        isPlaying ? 'text-[var(--text-accent)] border-[var(--border-focused)] shadow-[0_0_12px_rgba(92,120,226,0.3)]' : ''
      } ${className}`}
    >
      <Volume2 className={`${iconSizes} ${isPlaying ? 'animate-pulse' : ''}`} />
    </button>
  );
};

export default AudioSpeakerButton;

