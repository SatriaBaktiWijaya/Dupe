/**
 * LocalStorage Persistence for Ajarin Nihonggo
 */

const STORAGE_KEYS = {
  MASTERED_KANA: 'ajarin_nihonggo_mastered_kana',
  STREAK_INFO: 'ajarin_nihonggo_streak_info',
  QUIZ_STATS: 'ajarin_nihonggo_quiz_stats',
  THEME: 'ajarin_nihonggo_theme',
};

export interface StreakInfo {
  currentStreak: number;
  lastStudyDate: string; // YYYY-MM-DD
}

export interface QuizStats {
  totalQuizzes: number;
  totalQuestions: number;
  correctAnswers: number;
  bestStreak: number;
}

export function getMasteredKana(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MASTERED_KANA);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function saveMasteredKana(set: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MASTERED_KANA, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.error('Failed to save mastered kana', e);
  }
}

export function toggleMasteredKanaInStorage(id: string): boolean {
  const current = getMasteredKana();
  const willBeMastered = !current.has(id);
  if (willBeMastered) {
    current.add(id);
  } else {
    current.delete(id);
  }
  saveMasteredKana(current);
  return willBeMastered;
}

export function getStreakInfo(): StreakInfo {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK_INFO);
    if (!raw) return { currentStreak: 1, lastStudyDate: getTodayString() };
    return JSON.parse(raw);
  } catch {
    return { currentStreak: 1, lastStudyDate: getTodayString() };
  }
}

export function recordDailyStudy(): StreakInfo {
  const today = getTodayString();
  const info = getStreakInfo();

  if (info.lastStudyDate === today) {
    return info; // Already counted today
  }

  const yesterday = getYesterdayString();
  let newStreak = info.currentStreak;

  if (info.lastStudyDate === yesterday) {
    newStreak += 1;
  } else {
    newStreak = 1; // Streak broken, restart
  }

  const updated: StreakInfo = {
    currentStreak: newStreak,
    lastStudyDate: today,
  };

  localStorage.setItem(STORAGE_KEYS.STREAK_INFO, JSON.stringify(updated));
  return updated;
}

export function getQuizStats(): QuizStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_STATS);
    if (!raw) return { totalQuizzes: 0, totalQuestions: 0, correctAnswers: 0, bestStreak: 0 };
    return JSON.parse(raw);
  } catch {
    return { totalQuizzes: 0, totalQuestions: 0, correctAnswers: 0, bestStreak: 0 };
  }
}

export function recordQuizCompletion(correct: number, total: number, maxStreakInQuiz: number): QuizStats {
  const current = getQuizStats();
  const updated: QuizStats = {
    totalQuizzes: current.totalQuizzes + 1,
    totalQuestions: current.totalQuestions + total,
    correctAnswers: current.correctAnswers + correct,
    bestStreak: Math.max(current.bestStreak, maxStreakInQuiz),
  };
  localStorage.setItem(STORAGE_KEYS.QUIZ_STATS, JSON.stringify(updated));
  return updated;
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

