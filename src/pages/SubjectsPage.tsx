import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Download,
  Filter,
  Check,
  Volume2,
  ChevronDown,
} from 'lucide-react';
import { Language, Subject, GradeLevel } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CURRICULUM_TOPICS, CurriculumTopic } from '../data/curriculum';
import { playTextAloud } from '../utils/audio';

interface SubjectsPageProps {
  language: Language;
  onAskTopic: (question: string, subject: Subject, grade: GradeLevel) => void;
  onSaveTopicToOffline: (topic: CurriculumTopic) => void;
}

export const SubjectsPage: React.FC<SubjectsPageProps> = ({
  language,
  onAskTopic,
  onSaveTopicToOffline,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  const [readingTopicId, setReadingTopicId] = useState<string | null>(null);
  const [savedTopicIds, setSavedTopicIds] = useState<Record<string, boolean>>({});

  const t = TRANSLATIONS[language];

  const subjectsList: { id: Subject | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'سڀ مضمون (All)', icon: '📚' },
    { id: 'mathematics', label: t.subjects.math, icon: '📐' },
    { id: 'science', label: t.subjects.science, icon: '🔬' },
    { id: 'physics', label: t.subjects.physics, icon: '⚡' },
    { id: 'biology', label: t.subjects.biology, icon: '🌿' },
    { id: 'chemistry', label: t.subjects.chemistry, icon: '🧪' },
  ];

  const gradesList: { id: GradeLevel | 'all'; label: string }[] = [
    { id: 'all', label: t.subjects.allGrades },
    { id: 'middle', label: t.subjects.middle },
    { id: 'matric', label: t.subjects.matric },
    { id: 'primary', label: t.subjects.primary },
    { id: 'intermediate', label: t.subjects.intermediate },
  ];

  const filteredTopics = CURRICULUM_TOPICS.filter((topic) => {
    if (selectedSubject !== 'all' && topic.subject !== selectedSubject) {
      return false;
    }
    if (selectedGrade !== 'all' && topic.grade !== selectedGrade) {
      return false;
    }
    return true;
  });

  const handleReadTopic = (topic: CurriculumTopic) => {
    const text = `${topic.title[language]}. ${topic.description[language]}. فارمولو: ${topic.keyFormula}. خلاصو: ${topic.quickSummary[language]}`;
    setReadingTopicId(topic.id);
    playTextAloud(
      text,
      language,
      1.0,
      () => setReadingTopicId(topic.id),
      () => setReadingTopicId(null)
    );
  };

  const handleSave = (topic: CurriculumTopic) => {
    onSaveTopicToOffline(topic);
    setSavedTopicIds((prev) => ({ ...prev, [topic.id]: true }));
    setTimeout(() => {
      setSavedTopicIds((prev) => ({ ...prev, [topic.id]: false }));
    }, 2500);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5 text-teal-800" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
              {t.subjects.title}
            </h2>
            <p className="text-xs text-slate-500">
              {t.subjects.subtitle}
            </p>
          </div>
        </div>

        {/* Filter Badges: Subjects */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none">
          {subjectsList.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.id)}
              className={`btn-press whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedSubject === sub.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{sub.icon}</span>
              <span>{sub.label}</span>
            </button>
          ))}
        </div>

        {/* Filter Badges: Grades */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>درجو:</span>
          </span>
          {gradesList.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGrade(g.id)}
              className={`btn-press whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedGrade === g.id
                  ? 'bg-amber-400 text-teal-950 font-black shadow-xs'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500">
            ڪل دستياب سبق: {filteredTopics.length}
          </span>
          <span className="text-xs font-bold text-teal-700">
            سنڌ ٽيڪسٽ بڪ بورڊ نصاب
          </span>
        </div>

        {filteredTopics.map((topic) => {
          const isReading = readingTopicId === topic.id;
          const isSaved = savedTopicIds[topic.id];

          return (
            <div
              key={topic.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 hover:border-teal-300 shadow-xs transition-all space-y-3"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800">
                      {topic.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900">
                      {topic.grade.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                    {topic.title[language]}
                  </h3>
                </div>

                {/* Listen button */}
                <button
                  onClick={() => handleReadTopic(topic)}
                  title="سبق ٻڌو"
                  className={`btn-press p-2 rounded-xl border transition-colors ${
                    isReading
                      ? 'bg-amber-100 border-amber-300 text-amber-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-teal-700'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isReading ? 'animate-pulse' : ''}`} />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {topic.description[language]}
              </p>

              {/* Key Formula Box */}
              <div className="bg-gradient-to-r from-sky-50 to-teal-50 border border-teal-200/80 rounded-2xl p-3">
                <div className="text-[11px] font-bold text-teal-800 mb-0.5">
                  {t.subjects.keyFormulas}
                </div>
                <div className="font-mono text-xs sm:text-sm font-black text-teal-950 tracking-wide select-all">
                  {topic.keyFormula}
                </div>
              </div>

              {/* Quick Summary / Sample question preview */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-xs text-slate-700 space-y-1">
                <div>
                  <span className="font-bold text-slate-900 ml-1">نموني جو سوال:</span>
                  <span>{topic.sampleQuestion[language]}</span>
                </div>
                <div className="text-teal-800 font-medium">
                  <span className="font-bold ml-1">سولو جواب:</span>
                  <span>{topic.quickSummary[language]}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() =>
                    onAskTopic(
                      topic.sampleQuestion[language],
                      topic.subject,
                      topic.grade
                    )
                  }
                  className="btn-press flex-1 bg-teal-700 hover:bg-teal-800 text-white py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.subjects.askUstadAboutTopic}</span>
                </button>

                <button
                  onClick={() => handleSave(topic)}
                  className={`btn-press px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors ${
                    isSaved
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                  }`}
                  title={t.subjects.downloadTopic}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="hidden xs:inline">محفوظ ٿي ويو</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-teal-700" />
                      <span className="hidden xs:inline">آف لائين نوٽ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
