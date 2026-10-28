import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, RotateCcw, FastForward, User, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { playTextAloud, stopAllAudio } from '../utils/audio';

interface VoicePlayerProps {
  textToRead: string;
  language: Language;
  label?: string;
  className?: string;
  useCustomVoice?: boolean;
}

export const VoicePlayer: React.FC<VoicePlayerProps> = ({
  textToRead,
  language,
  label,
  className = '',
  useCustomVoice = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(useCustomVoice);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    setIsCustomMode(useCustomVoice);
  }, [useCustomVoice]);

  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  const handleTogglePlay = async () => {
    if (isPlaying) {
      stopAllAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      await playTextAloud(
        textToRead,
        language,
        speed,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        isCustomMode
      );
    }
  };

  const handleSpeedCycle = () => {
    const nextSpeed = speed === 1.0 ? 1.25 : speed === 1.25 ? 0.8 : 1.0;
    setSpeed(nextSpeed);
    if (isPlaying) {
      stopAllAudio();
      playTextAloud(
        textToRead,
        language,
        nextSpeed,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        isCustomMode
      );
    }
  };

  const handleReplay = async () => {
    stopAllAudio();
    setIsPlaying(true);
    await playTextAloud(
      textToRead,
      language,
      speed,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      isCustomMode
    );
  };

  const handleToggleCustomVoice = () => {
    const next = !isCustomMode;
    setIsCustomMode(next);
    if (isPlaying) {
      stopAllAudio();
      setIsPlaying(true);
      playTextAloud(
        textToRead,
        language,
        speed,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        next
      );
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-gradient-to-r from-teal-50 via-emerald-50 to-amber-50/40 border border-teal-200/80 rounded-2xl p-2.5 sm:p-3 shadow-xs ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <button
          onClick={handleTogglePlay}
          className={`btn-press w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-all shrink-0 ${
            isPlaying
              ? 'bg-amber-600 ring-4 ring-amber-200 animate-pulse'
              : 'bg-teal-700 hover:bg-teal-800'
          }`}
          aria-label={isPlaying ? t.teacher.stopAudio : t.teacher.listenAnswer}
        >
          {isPlaying ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        <div>
          <div className="text-xs font-bold text-teal-950 flex items-center gap-1.5 flex-wrap">
            <Volume2 className="w-3.5 h-3.5 text-teal-700" />
            <span>{label || t.teacher.listenAnswer}</span>
            {isCustomMode && (
              <span className="text-[10px] bg-amber-400 text-teal-950 font-black px-1.5 py-0.2 rounded-md">
                اڪبر سرگاڻي آواز
              </span>
            )}
            {isPlaying && (
              <span className="text-[10px] text-amber-700 font-semibold animate-pulse">
                (ٻڌي رهيا آهيو...)
              </span>
            )}
          </div>

          {/* Animated sound wave indicators */}
          <div className="flex items-center gap-1 h-3 mt-1">
            <div
              className={`w-1 bg-teal-600 rounded-full transition-all duration-300 ${
                isPlaying ? 'h-3 animate-bounce' : 'h-1'
              }`}
            />
            <div
              className={`w-1 bg-teal-500 rounded-full transition-all duration-200 ${
                isPlaying ? 'h-4 animate-pulse' : 'h-1'
              }`}
            />
            <div
              className={`w-1 bg-emerald-600 rounded-full transition-all duration-300 ${
                isPlaying ? 'h-2 animate-bounce' : 'h-1'
              }`}
            />
            <div
              className={`w-1 bg-teal-600 rounded-full transition-all duration-150 ${
                isPlaying ? 'h-3.5 animate-pulse' : 'h-1'
              }`}
            />
            <div
              className={`w-1 bg-amber-500 rounded-full transition-all duration-250 ${
                isPlaying ? 'h-2 animate-bounce' : 'h-1'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Voice Mode & Speed Controls */}
      <div className="flex items-center gap-1.5 self-end sm:self-center">
        {/* Toggle between Akbar Sargani voice and default voice */}
        <button
          onClick={handleToggleCustomVoice}
          title={isCustomMode ? 'Switch to Standard Voice' : 'Switch to Akbar Sargani Voice'}
          className={`btn-press px-2 py-1 text-[11px] font-bold rounded-lg border flex items-center gap-1 transition-all ${
            isCustomMode
              ? 'bg-amber-400 border-amber-500 text-teal-950 font-black shadow-2xs'
              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <User className="w-3 h-3 text-teal-800" />
          <span>{isCustomMode ? 'اڪبر سرگاڻي' : 'ڪسٽم آواز'}</span>
        </button>

        {/* Speed */}
        <button
          onClick={handleSpeedCycle}
          title="Playback speed"
          className="btn-press px-2 py-1 text-xs font-bold rounded-lg bg-white border border-teal-200 text-teal-900 hover:bg-teal-100/50 flex items-center gap-0.5"
        >
          <FastForward className="w-3 h-3 text-teal-600" />
          <span>{speed}x</span>
        </button>

        {/* Replay */}
        <button
          onClick={handleReplay}
          title="Replay from start"
          className="btn-press p-1.5 text-xs font-bold rounded-lg bg-white border border-teal-200 text-teal-900 hover:bg-teal-100/50"
        >
          <RotateCcw className="w-3.5 h-3.5 text-teal-700" />
        </button>
      </div>
    </div>
  );
};
