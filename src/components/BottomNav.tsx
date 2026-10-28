import React from 'react';
import { Home, BookOpen, Sparkles, HelpCircle, Download, User } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

export type NavTab = 'home' | 'subjects' | 'teacher' | 'quiz' | 'offline' | 'about';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  language: Language;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  language,
  savedCount,
}) => {
  const t = TRANSLATIONS[language];

  const items = [
    {
      id: 'home' as NavTab,
      label: t.nav.home,
      icon: Home,
    },
    {
      id: 'subjects' as NavTab,
      label: t.nav.subjects,
      icon: BookOpen,
    },
    {
      id: 'teacher' as NavTab,
      label: t.nav.aiTeacher,
      icon: Sparkles,
      highlight: true,
    },
    {
      id: 'quiz' as NavTab,
      label: t.nav.quizzes,
      icon: HelpCircle,
    },
    {
      id: 'offline' as NavTab,
      label: t.nav.offline,
      icon: Download,
      badge: savedCount > 0 ? savedCount : null,
    },
    {
      id: 'about' as NavTab,
      label: t.nav.about,
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
      <div className="max-w-md mx-auto px-1 py-1.5 flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="btn-press flex flex-col items-center -mt-5 focus:outline-none"
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                    isActive
                      ? 'bg-amber-500 text-teal-950 ring-4 ring-amber-100 scale-105'
                      : 'bg-teal-700 text-white hover:bg-teal-800'
                  }`}
                >
                  <Icon className="w-5 h-5 animate-pulse" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 tracking-tight truncate max-w-[55px] ${
                    isActive ? 'text-teal-900 font-black' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="btn-press flex-1 flex flex-col items-center py-0.5 px-0.5 relative focus:outline-none"
            >
              <div className="relative">
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                    isActive ? 'text-teal-700 scale-110' : 'text-slate-500'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-teal-950 text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] sm:text-[10px] mt-0.5 transition-colors font-medium truncate max-w-[50px] ${
                  isActive ? 'text-teal-700 font-bold' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
