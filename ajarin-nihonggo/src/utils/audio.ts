/**
 * Native Japanese Pronunciation Audio Engine using Web Speech API
 */

let cachedJapaneseVoice: SpeechSynthesisVoice | null = null;

export function initVoices(): Promise<SpeechSynthesisVoice | null> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve(null);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find((v) => v.lang.startsWith('ja') || v.lang.includes('JP'));
    if (jaVoice) {
      cachedJapaneseVoice = jaVoice;
      resolve(jaVoice);
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      const updatedVoices = window.speechSynthesis.getVoices();
      const updatedJa = updatedVoices.find((v) => v.lang.startsWith('ja') || v.lang.includes('JP'));
      cachedJapaneseVoice = updatedJa || null;
      resolve(cachedJapaneseVoice);
    };
  });
}

export function playJapaneseSpeech(text: string, rate: number = 0.85): Promise<boolean> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      resolve(false);
      return;
    }

    window.speechSynthesis.cancel(); // Cancel any current speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = rate; // Slightly slower for crisp beginner articulation
    utterance.pitch = 1.0;

    if (cachedJapaneseVoice) {
      utterance.voice = cachedJapaneseVoice;
    } else {
      const voices = window.speechSynthesis.getVoices();
      const ja = voices.find((v) => v.lang.startsWith('ja') || v.lang.includes('JP'));
      if (ja) utterance.voice = ja;
    }

    utterance.onend = () => resolve(true);
    utterance.onerror = () => resolve(false);

    window.speechSynthesis.speak(utterance);
  });
}

