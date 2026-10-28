import React from 'react';
import { BookOpen, Flame, Award, Globe, Smartphone, Monitor, Wifi, WifiOff, User } from 'lucide-react';
import { Language, UserStats } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  stats: UserStats;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  onOpenAbout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  stats,
  isPhoneFrame,
  onTogglePhoneFrame,
  isOfflineMode,
  onToggleOfflineMode,
  onOpenAbout,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-teal-800 text-white shadow-md border-b border-teal-700/50">
      <div className="max-w-4xl mx-auto px-3 py-2 flex items-center justify-between">
        {/* Brand & Creator Attribution */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-teal-950 flex items-center justify-center font-bold shadow-sm shrink-0">
            <BookOpen className="w-5 h-5 text-teal-900" />
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base leading-tight flex items-center gap-1.5">
              <span>{t.appName}</span>
              <span className="text-[9px] bg-amber-400/90 text-teal-950 px-1.5 py-0.2 rounded font-black tracking-wide">
                AI
              </span>
            </div>
            <button
              onClick={onOpenAbout}
              className="text-[10px] text-amber-300 hover:text-white font-bold flex items-center gap-1 text-right transition-colors"
              title="Created by Akbar Sargani"
            >
              <span>By Akbar Sargani</span>
              <span className="text-teal-300">• اڪبر سرگاڻي</span>
            </button>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Creator Profile Button */}
          <button
            onClick={onOpenAbout}
            title={t.nav.about}
            className="btn-press p-1.5 rounded-lg bg-teal-900/60 hover:bg-teal-900 text-amber-300 hover:text-white flex items-center gap-1 text-xs font-bold transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden md:inline">اڪبر سرگاڻي</span>
          </button>

          {/* Online/Offline Simulator Toggle */}
          <button
            onClick={onToggleOfflineMode}
            title={isOfflineMode ? t.offline.offlineMode : t.offline.onlineMode}
            className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              isOfflineMode
                ? 'bg-amber-500 text-amber-950 font-bold ring-2 ring-amber-300'
                : 'bg-teal-900/60 hover:bg-teal-900 text-teal-100'
            }`}
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">آف لائين</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xs:inline">آن لائين</span>
              </>
            )}
          </button>

          {/* User Progress Badges */}
          <div className="hidden xs:flex items-center gap-1.5 bg-teal-900/70 px-2 py-1 rounded-lg text-xs text-amber-300 font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{stats.streakDays}d</span>
            <span className="text-teal-400">|</span>
            <Award className="w-3.5 h-3.5 text-yellow-300" />
            <span>{stats.xp}</span>
          </div>

          {/* Language Selector */}
          <div className="relative flex items-center bg-teal-900/80 rounded-lg p-0.5 border border-teal-700/60">
            <button
              onClick={() => onLanguageChange('sindhi')}
              className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                language === 'sindhi'
                  ? 'bg-amber-400 text-teal-950 shadow-sm font-bold'
                  : 'text-teal-200 hover:text-white'
              }`}
            >
              سنڌي
            </button>
            <button
              onClick={() => onLanguageChange('urdu')}
              className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                language === 'urdu'
                  ? 'bg-amber-400 text-teal-950 shadow-sm font-bold'
                  : 'text-teal-200 hover:text-white'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => onLanguageChange('english')}
              className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                language === 'english'
                  ? 'bg-amber-400 text-teal-950 shadow-sm font-bold'
                  : 'text-teal-200 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Toggle Phone Frame */}
          <button
            onClick={onTogglePhoneFrame}
            title={isPhoneFrame ? t.common.fullWidthView : t.common.viewInPhone}
            className="p-1.5 rounded-lg bg-teal-900/60 hover:bg-teal-900 text-teal-200 hover:text-white transition-all hidden md:flex"
          >
            {isPhoneFrame ? (
              <Monitor className="w-4 h-4" />
            ) : (
              <Smartphone className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
