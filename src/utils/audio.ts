// Audio helper for reading answers aloud in Sindhi, Urdu, and English
import { Language } from '../types';

let currentAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

export interface AudioPlaybackState {
  isPlaying: boolean;
  rate: number;
}

export function stopAllAudio(): void {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {
      // ignore
    }
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  }
  currentUtterance = null;
}

export async function playTextAloud(
  text: string,
  language: Language,
  rate: number = 1.0,
  onStart?: () => void,
  onEnd?: () => void,
  useCustomVoice: boolean = false
): Promise<void> {
  stopAllAudio();

  // Try server TTS first (custom voice or Gemini TTS)
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language, useCustomVoice }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audioBase64) {
        const mime = data.mimeType || 'audio/wav';
        const audio = new Audio(`data:${mime};base64,${data.audioBase64}`);
        audio.playbackRate = rate;
        currentAudio = audio;

        audio.onplay = () => onStart?.();
        audio.onended = () => {
          currentAudio = null;
          onEnd?.();
        };
        audio.onerror = () => {
          fallbackWebSpeech(text, language, rate, onStart, onEnd);
        };

        await audio.play();
        return;
      }
    }
  } catch (err) {
    console.warn('Server TTS failed, falling back to Web Speech API:', err);
  }

  // Fallback to browser SpeechSynthesis
  fallbackWebSpeech(text, language, rate, onStart, onEnd);
}

function fallbackWebSpeech(
  text: string,
  language: Language,
  rate: number = 1.0,
  onStart?: () => void,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }

  // Clean text from symbols for speech synthesis
  const cleanText = text
    .replace(/[#*`_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) {
    onEnd?.();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = rate;
  utterance.pitch = 1.0;

  // Language code mapping
  if (language === 'sindhi') {
    utterance.lang = 'sd-PK';
  } else if (language === 'urdu') {
    utterance.lang = 'ur-PK';
  } else {
    utterance.lang = 'en-US';
  }

  // Try to pick matching voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => {
    if (language === 'sindhi') {
      return (
        v.lang.startsWith('sd') ||
        v.lang.startsWith('ur') ||
        v.lang.startsWith('ar') ||
        v.name.toLowerCase().includes('sindhi') ||
        v.name.toLowerCase().includes('urdu')
      );
    } else if (language === 'urdu') {
      return (
        v.lang.startsWith('ur') ||
        v.name.toLowerCase().includes('urdu') ||
        v.lang.startsWith('hi')
      );
    } else {
      return v.lang.startsWith('en');
    }
  });

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => onStart?.();
  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };
  utterance.onerror = () => {
    currentUtterance = null;
    onEnd?.();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}
