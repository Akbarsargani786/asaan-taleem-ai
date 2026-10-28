import React, { useState } from 'react';
import {
  Download,
  BookOpen,
  Trash2,
  Printer,
  Search,
  WifiOff,
  Wifi,
  ExternalLink,
  Volume2,
  Sparkles,
} from 'lucide-react';
import { Language, SavedLesson } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CURRICULUM_TOPICS } from '../data/curriculum';
import { downloadLessonAsPrintable } from '../utils/exportLesson';
import { playTextAloud } from '../utils/audio';

interface OfflineLibraryPageProps {
  language: Language;
  savedLessons: SavedLesson[];
  onRemoveLesson: (id: string) => void;
  onOpenLesson: (lesson: SavedLesson) => void;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
}

export const OfflineLibraryPage: React.FC<OfflineLibraryPageProps> = ({
  language,
  savedLessons,
  onRemoveLesson,
  onOpenLesson,
  isOfflineMode,
  onToggleOfflineMode,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingLessonId, setReadingLessonId] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  const filteredLessons = savedLessons.filter((l) =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.originalQuestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReadLesson = (lesson: SavedLesson) => {
    const text = `${lesson.title}. ${lesson.data.directAnswer}. ` +
      lesson.data.stepByStep.map((s) => `${s.title}: ${s.explanation}`).join('. ');

    setReadingLessonId(lesson.id);
    playTextAloud(
      text,
      language,
      1.0,
      () => setReadingLessonId(lesson.id),
      () => setReadingLessonId(null)
    );
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Download className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
                {t.offline.title}
              </h2>
              <p className="text-xs text-slate-500">
                {t.offline.subtitle}
              </p>
            </div>
          </div>

          {/* Offline Mode Toggle Banner */}
          <button
            onClick={onToggleOfflineMode}
            className={`btn-press px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isOfflineMode
                ? 'bg-amber-500 text-teal-950 ring-2 ring-amber-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>آف لائين موڊ</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span>آن لائين</span>
              </>
            )}
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute top-3 rtl:right-3 ltr:left-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="محفوظ ٿيل اسباق ۾ ڳوليو..."
            className="w-full rtl:pr-9 ltr:pl-9 pl-3 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
      </div>

      {/* Saved Lessons Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-600">
            {t.offline.savedCount}: {savedLessons.length}
          </h3>
          <span className="text-[11px] bg-sky-100 text-sky-900 font-bold px-2 py-0.5 rounded-md">
            موبائل اسٽوريج ۾ محفوظ
          </span>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-slate-700 text-sm">
              {t.offline.noSaved}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              {t.offline.noSavedDesc}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLessons.map((lesson) => {
              const isReading = readingLessonId === lesson.id;

              return (
                <div
                  key={lesson.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-teal-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-teal-100 text-teal-800">
                          {lesson.subject}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(lesson.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-base text-slate-900 leading-snug">
                        {lesson.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleReadLesson(lesson)}
                        className={`btn-press p-1.5 rounded-lg border ${
                          isReading
                            ? 'bg-amber-100 border-amber-300 text-amber-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-teal-700'
                        }`}
                        title="سبق ٻڌو"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => downloadLessonAsPrintable(lesson)}
                        className="btn-press p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-teal-700"
                        title={t.offline.downloadPdf}
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onRemoveLesson(lesson.id)}
                        className="btn-press p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 hover:text-red-600"
                        title={t.offline.removeLesson}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {lesson.data.directAnswer}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-teal-700">
                      مرحلا: {lesson.data.stepByStep.length}
                    </span>
                    <button
                      onClick={() => onOpenLesson(lesson)}
                      className="btn-press text-xs font-extrabold text-teal-800 hover:text-teal-950 flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200"
                    >
                      <span>{t.offline.openLesson}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Preloaded Revision Study Sheets (Always available offline) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
          <BookOpen className="w-4 h-4 text-teal-700" />
          <span>{t.offline.preloadedNotes}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CURRICULUM_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                  {topic.subject}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {topic.grade}
                </span>
              </div>
              <h5 className="font-bold text-xs text-slate-900">
                {topic.title[language]}
              </h5>
              <div className="text-[11px] font-mono text-teal-800 bg-white p-1.5 rounded border border-slate-200">
                {topic.keyFormula}
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-2">
                {topic.quickSummary[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
