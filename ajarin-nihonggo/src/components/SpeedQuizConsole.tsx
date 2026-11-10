import React, { useState, useEffect, useCallback } from 'react';
import { KanaItem } from '../data/kanaData';
import { KbdBadge } from './ui/KbdBadge';
import { AudioSpeakerButton } from './ui/AudioSpeakerButton';
import { playJapaneseSpeech } from '../utils/audio';
import { recordQuizCompletion } from '../utils/storage';
import confetti from 'canvas-confetti';
import { Flame, Trophy, RotateCcw, CheckCircle2, XCircle, Zap } from 'lucide-react';

interface SpeedQuizConsoleProps {
  items: KanaItem[];
  kanaTypeTitle: string;
}

interface Question {
  targetItem: KanaItem;
  options: KanaItem[];
  correctIndex: number;
}

const QUESTIONS_PER_ROUND = 10;

export const SpeedQuizConsole: React.FC<SpeedQuizConsoleProps> = ({
  items,
  kanaTypeTitle,
}) => {
  const [currentRound, setCurrentRound] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isRoundFinished, setIsRoundFinished] = useState(false);

  // Generate a random question given the pool
  const generateQuestion = useCallback((pool: KanaItem[]): Question => {
    const targetItem = pool[Math.floor(Math.random() * pool.length)];
    // Pick 3 distractors
    const distractors: KanaItem[] = [];
    const poolCopy = pool.filter((i) => i.id !== targetItem.id);
    while (distractors.length < 3 && poolCopy.length > 0) {
      const idx = Math.floor(Math.random() * poolCopy.length);
      distractors.push(poolCopy.splice(idx, 1)[0]);
    }
    const options = [...distractors, targetItem].sort(() => Math.random() - 0.5);
    const correctIndex = options.findIndex((o) => o.id === targetItem.id);
    return { targetItem, options, correctIndex };
  }, []);

  // Initialize or restart a round
  const startNewRound = useCallback(() => {
    if (items.length < 4) return;
    const questions: Question[] = [];
    for (let i = 0; i < QUESTIONS_PER_ROUND; i++) {
      questions.push(generateQuestion(items));
    }
    setCurrentRound(questions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setIsRoundFinished(false);
  }, [items, generateQuestion]);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const currentQuestion = currentRound[currentIndex];

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#5c78e2', '#a1c181', '#f59e0b', '#ec4899'],
      });
    } catch {
      // ignore
    }
  };

  const handleSelectAnswer = useCallback((index: number) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setMaxStreak((prev) => Math.max(prev, newStreak));

      // Pronounce character on correct answer
      playJapaneseSpeech(currentQuestion.targetItem.character);

      // Streak milestones
      if (newStreak === 5 || newStreak === 10 || newStreak === 20) {
        triggerConfetti();
      }
    } else {
      setCurrentStreak(0);
    }

    // Auto proceed to next question after 900ms
    setTimeout(() => {
      if (currentIndex + 1 < currentRound.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setIsRoundFinished(true);
        recordQuizCompletion(
          isCorrect ? score + 1 : score,
          QUESTIONS_PER_ROUND,
          Math.max(maxStreak, isCorrect ? currentStreak + 1 : currentStreak)
        );
        triggerConfetti();
      }
    }, 900);
  }, [isAnswered, currentQuestion, currentStreak, currentIndex, currentRound.length, score, maxStreak]);

  // Keyboard navigation for [1], [2], [3], [4]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (!isRoundFinished && !isAnswered) {
        if (e.key === '1') {
          e.preventDefault();
          handleSelectAnswer(0);
        } else if (e.key === '2') {
          e.preventDefault();
          handleSelectAnswer(1);
        } else if (e.key === '3') {
          e.preventDefault();
          handleSelectAnswer(2);
        } else if (e.key === '4') {
          e.preventDefault();
          handleSelectAnswer(3);
        }
      } else if (isRoundFinished && (e.key === 'r' || e.key === 'Enter')) {
        e.preventDefault();
        startNewRound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRoundFinished, isAnswered, handleSelectAnswer, startNewRound]);

  if (!currentQuestion && !isRoundFinished) {
    return (
      <div className="text-center py-12 text-[var(--text-muted)] font-mono">
        Menyiapkan kuis kecepatan...
      </div>
    );
  }

  // Round completion summary screen
  if (isRoundFinished) {
    const accuracy = Math.round((score / QUESTIONS_PER_ROUND) * 100);
    return (
      <div className="max-w-md mx-auto p-8 rounded-2xl bg-[var(--surface-background)] border border-[var(--border)] shadow-xl text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--element-background)] border border-[var(--border)] flex items-center justify-center text-[var(--text-accent)] shadow-sm">
          <Trophy className="w-8 h-8 text-amber-400" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">
            Kuis {kanaTypeTitle} Selesai!
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Hasil latihan kecepatan identifikasi aksara
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-[var(--element-background)] border border-[var(--border)] text-center">
            <div className="text-xs font-mono text-[var(--text-muted)]">Skor</div>
            <div className="text-xl font-bold text-[var(--text-accent)] font-mono">
              {score}/{QUESTIONS_PER_ROUND}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--element-background)] border border-[var(--border)] text-center">
            <div className="text-xs font-mono text-[var(--text-muted)]">Akurasi</div>
            <div className="text-xl font-bold text-[var(--success)] font-mono">
              {accuracy}%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--element-background)] border border-[var(--border)] text-center">
            <div className="text-xs font-mono text-[var(--text-muted)]">Max Streak</div>
            <div className="text-xl font-bold text-amber-400 font-mono flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{maxStreak}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={startNewRound}
          className="w-full py-2.5 rounded-lg bg-[var(--text-accent)] hover:opacity-95 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Mulai Ronde Baru</span>
          <KbdBadge className="bg-white/20 text-white border-white/30">R</KbdBadge>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Quiz Top Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--text)] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Speed Quiz {kanaTypeTitle}</span>
          </span>
          <span>•</span>
          <span>Pertanyaan {currentIndex + 1} dari {QUESTIONS_PER_ROUND}</span>
        </div>

        {/* Current In-Quiz Streak */}
        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--element-background)] border border-[var(--border)] text-amber-400 font-bold">
          <Flame className="w-3.5 h-3.5 fill-amber-400" />
          <span>{currentStreak} Streak</span>
        </div>
      </div>

      {/* Question Card Box */}
      <div className="p-8 rounded-2xl bg-[var(--surface-background)] border border-[var(--border)] shadow-xl text-center space-y-4 relative overflow-hidden">
        {/* Step Indicator Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--element-background)]">
          <div
            className="h-full bg-[var(--text-accent)] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / QUESTIONS_PER_ROUND) * 100}%` }}
          />
        </div>

        <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
          Pilihlah Romaji yang Tepat
        </div>

        {/* Large Character Display */}
        <div className="py-2">
          <span className="kana-display text-8xl font-bold tracking-tight text-[var(--text)] block drop-shadow-sm select-none">
            {currentQuestion.targetItem.character}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <AudioSpeakerButton textToSpeak={currentQuestion.targetItem.character} size="sm" />
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Dengarkan petunjuk suara
          </span>
        </div>
      </div>

      {/* 4 Options Grid (Hotkeys 1, 2, 3, 4) */}
      <div className="grid grid-cols-2 gap-3">
        {currentQuestion.options.map((option, idx) => {
          let btnStyle = 'border-[var(--border)] bg-[var(--surface-background)] hover:bg-[var(--element-hover)] text-[var(--text)] hover:border-[var(--border-focused)]';

          if (isAnswered) {
            if (idx === currentQuestion.correctIndex) {
              btnStyle = 'border-[var(--success)] bg-[var(--success-background)] text-[var(--success)] shadow-[0_0_12px_rgba(161,193,129,0.3)] font-bold';
            } else if (idx === selectedOption) {
              btnStyle = 'border-[var(--error)] bg-[var(--error-background)] text-[var(--error)] shadow-[0_0_12px_rgba(208,114,119,0.3)]';
            } else {
              btnStyle = 'opacity-40 border-[var(--border)] bg-[var(--surface-background)] text-[var(--text-muted)]';
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectAnswer(idx)}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all duration-150 select-none ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <KbdBadge>{idx + 1}</KbdBadge>
                <span className="text-lg font-mono font-bold uppercase tracking-wide">
                  {option.romaji}
                </span>
              </div>

              {isAnswered && idx === currentQuestion.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                <XCircle className="w-5 h-5 text-[var(--error)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Helpful Hint Footer */}
      <div className="text-center text-xs font-mono text-[var(--text-muted)]">
        Gunakan tombol keyboard <KbdBadge>1</KbdBadge> <KbdBadge>2</KbdBadge> <KbdBadge>3</KbdBadge> <KbdBadge>4</KbdBadge> untuk menjawab secepat kilat.
      </div>
    </div>
  );
};

export default SpeedQuizConsole;

