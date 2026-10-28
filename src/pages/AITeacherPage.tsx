import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Send,
  Upload,
  X,
  Download,
  Check,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import {
  Language,
  Subject,
  GradeLevel,
  TeacherResponse,
  SavedLesson,
} from '../types';
import { TRANSLATIONS } from '../data/translations';
import { StepCard } from '../components/StepCard';
import { VoicePlayer } from '../components/VoicePlayer';
import { downloadLessonAsPrintable } from '../utils/exportLesson';

interface AITeacherPageProps {
  language: Language;
  onOpenHomeworkModal: () => void;
  activeQuestion?: {
    text: string;
    imageBase64?: string;
    subject?: Subject;
    grade?: GradeLevel;
  } | null;
  onSaveLesson: (lesson: SavedLesson) => void;
  useCustomVoice?: boolean;
}

export const AITeacherPage: React.FC<AITeacherPageProps> = ({
  language,
  onOpenHomeworkModal,
  activeQuestion,
  onSaveLesson,
  useCustomVoice = false,
}) => {
  const [inputText, setInputText] = useState<string>(activeQuestion?.text || '');
  const [selectedImage, setSelectedImage] = useState<string | null>(
    activeQuestion?.imageBase64 || null
  );
  const [selectedSubject, setSelectedSubject] = useState<Subject>(
    activeQuestion?.subject || 'mathematics'
  );
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(
    activeQuestion?.grade || 'matric'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentSolution, setCurrentSolution] = useState<TeacherResponse | null>(null);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);
  const [hasCheckedPractice, setHasCheckedPractice] = useState<boolean>(false);
  const [isSavedOffline, setIsSavedOffline] = useState<boolean>(false);

  const t = TRANSLATIONS[language];

  // Update input state if props change
  React.useEffect(() => {
    if (activeQuestion) {
      setInputText(activeQuestion.text);
      if (activeQuestion.imageBase64) {
        setSelectedImage(activeQuestion.imageBase64);
      }
      if (activeQuestion.subject) {
        setSelectedSubject(activeQuestion.subject);
      }
      if (activeQuestion.grade) {
        setSelectedGrade(activeQuestion.grade);
      }
      // Automatically trigger solve if incoming question is provided
      handleSolve(activeQuestion.text, activeQuestion.imageBase64, activeQuestion.subject);
    }
  }, [activeQuestion]);

  const handleSolve = async (
    questionOverride?: string,
    imageOverride?: string | null,
    subjectOverride?: Subject
  ) => {
    const q = (questionOverride !== undefined ? questionOverride : inputText).trim();
    const img = imageOverride !== undefined ? imageOverride : selectedImage;

    if (!q && !img) return;

    setIsLoading(true);
    setCurrentSolution(null);
    setSelectedPracticeOption(null);
    setHasCheckedPractice(false);
    setIsSavedOffline(false);

    try {
      const res = await fetch('/api/ask-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          imageBase64: img || undefined,
          language,
          subject: subjectOverride || selectedSubject,
          grade: selectedGrade,
        }),
      });

      if (!res.ok) {
        throw new Error('Server request failed');
      }

      const data: TeacherResponse = await res.json();
      setCurrentSolution({
        ...data,
        imageThumbnail: img || undefined,
      });
    } catch (err) {
      console.error('Error fetching teacher response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToOffline = () => {
    if (!currentSolution) return;
    const newLesson: SavedLesson = {
      id: `lesson-${Date.now()}`,
      title: currentSolution.title || inputText.slice(0, 40) || 'رياضي ۽ سائنس سبق',
      subject: selectedSubject,
      language,
      date: new Date().toISOString(),
      data: currentSolution,
      originalQuestion: inputText || 'هوم ورڪ تصوير سوال',
      imageThumbnail: selectedImage || undefined,
    };
    onSaveLesson(newLesson);
    setIsSavedOffline(true);
  };

  const handlePrintPdf = () => {
    if (!currentSolution) return;
    const tempLesson: SavedLesson = {
      id: `print-${Date.now()}`,
      title: currentSolution.title || inputText.slice(0, 40),
      subject: selectedSubject,
      language,
      date: new Date().toISOString(),
      data: currentSolution,
      originalQuestion: inputText || 'هوم ورڪ تصوير سوال',
      imageThumbnail: selectedImage || undefined,
    };
    downloadLessonAsPrintable(tempLesson);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-950 text-white rounded-3xl p-4 sm:p-5 shadow-lg border border-teal-700/60 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-teal-950 flex items-center justify-center font-black text-xl shadow-md">
            👨‍🏫
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-700/80 text-amber-300 border border-teal-600/50 mb-1">
              <Sparkles className="w-3 h-3" />
              <span>استاد اياز • Asaan Ustad</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {t.teacher.title}
            </h2>
            <p className="text-xs text-teal-200 line-clamp-1">
              {t.teacher.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Input Workspace */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        {/* Selected Homework Image Preview */}
        {selectedImage && (
          <div className="relative rounded-2xl overflow-hidden border border-teal-400 bg-slate-900 max-h-48 flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Homework question"
              className="max-h-48 object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="btn-press absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow-md hover:bg-red-700"
              title={t.teacher.removePhoto}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 bg-teal-950/80 text-white text-[11px] px-2.5 py-1 rounded-md font-semibold">
              {t.teacher.photoUploaded}
            </div>
          </div>
        )}

        {/* Text Input area */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.teacher.inputPlaceholder}
            rows={3}
            className="w-full p-3.5 text-sm sm:text-base rounded-2xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none placeholder:text-slate-400"
          />
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenHomeworkModal}
              className="btn-press px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100/70 border border-amber-300 text-amber-950 text-xs sm:text-sm font-bold flex items-center gap-1.5"
            >
              <Camera className="w-4 h-4 text-amber-700" />
              <span>{t.teacher.uploadPhoto}</span>
            </button>

            {/* Subject Selector */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value as Subject)}
              className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 outline-none cursor-pointer"
            >
              <option value="mathematics">📐 {t.subjects.math}</option>
              <option value="science">🔬 {t.subjects.science}</option>
              <option value="physics">⚡ {t.subjects.physics}</option>
              <option value="biology">🌿 {t.subjects.biology}</option>
              <option value="chemistry">🧪 {t.subjects.chemistry}</option>
            </select>
          </div>

          <button
            onClick={() => handleSolve()}
            disabled={isLoading || (!inputText.trim() && !selectedImage)}
            className="btn-press bg-teal-700 hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>سوچي رهيو آهي...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span>{t.teacher.sendButton}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div className="bg-white rounded-3xl p-6 border border-teal-200 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-teal-700 animate-spin" />
          </div>
          <p className="font-extrabold text-teal-950 text-sm sm:text-base">
            {t.teacher.solvingQuestion}
          </p>
          <p className="text-xs text-slate-500">
            مرحليوار حساب، فارمولو ۽ سولي سنڌي لفظ چونڊيا پيا وڃن...
          </p>
        </div>
      )}

      {/* Solution Display */}
      {currentSolution && (
        <div className="space-y-4 animate-fade-in">
          {/* Solution Summary Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">
                  سولو حل مڪمل ٿيو
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5 leading-snug">
                  {currentSolution.title}
                </h3>
              </div>

              {/* Offline Save & PDF Print Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleSaveToOffline}
                  className={`btn-press px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isSavedOffline
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                  }`}
                  title={t.teacher.saveOffline}
                >
                  {isSavedOffline ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.teacher.savedSuccess}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-teal-700" />
                      <span>{t.teacher.saveOffline}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrintPdf}
                  title="PDF / Print"
                  className="btn-press p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Direct Answer Box */}
            <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 text-emerald-950">
              <div className="text-xs font-bold text-emerald-800 mb-1">
                مکيه نتيجو ۽ سولو خلاصو:
              </div>
              <p className="text-sm sm:text-base font-semibold leading-relaxed">
                {currentSolution.directAnswer}
              </p>
            </div>

            {/* Voice Audio Read Aloud */}
            <VoicePlayer
              textToRead={
                currentSolution.voiceScript ||
                `${currentSolution.title}. ${currentSolution.directAnswer}. ` +
                  currentSolution.stepByStep
                    .map((s) => `${t.common.step} ${s.stepNumber}: ${s.title}. ${s.explanation}`)
                    .join('. ')
              }
              language={language}
              label={t.teacher.listenAnswer}
              useCustomVoice={useCustomVoice}
            />
          </div>

          {/* Step-by-Step Breakdown Cards */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-slate-700 px-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>{t.teacher.stepsTitle}:</span>
            </h4>

            {currentSolution.stepByStep.map((step) => (
              <StepCard
                key={step.stepNumber}
                step={step}
                totalSteps={currentSolution.stepByStep.length}
                language={language}
              />
            ))}
          </div>

          {/* Attached Practice Problem (Active Immediate Test) */}
          {currentSolution.practiceProblem && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/90 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-amber-900">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>{t.teacher.practiceTitle}</span>
              </div>

              <h4 className="font-extrabold text-base text-slate-900 leading-snug">
                {currentSolution.practiceProblem.question}
              </h4>

              <div className="space-y-2 pt-1">
                {currentSolution.practiceProblem.options.map((option, idx) => {
                  const isSelected = selectedPracticeOption === idx;
                  const isCorrect = idx === currentSolution.practiceProblem?.answerIndex;

                  let style = 'bg-white border-slate-200 text-slate-800 hover:border-amber-400';
                  if (hasCheckedPractice) {
                    if (isCorrect) {
                      style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      style = 'bg-red-100 border-red-500 text-red-950 line-through';
                    }
                  } else if (isSelected) {
                    style = 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-300';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !hasCheckedPractice && setSelectedPracticeOption(idx)}
                      className={`btn-press w-full text-right rtl:text-right ltr:text-left p-3 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{option}</span>
                      {hasCheckedPractice && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {!hasCheckedPractice ? (
                <button
                  onClick={() => setHasCheckedPractice(true)}
                  disabled={selectedPracticeOption === null}
                  className="btn-press w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-teal-950 font-black py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all"
                >
                  {t.teacher.checkAnswer}
                </button>
              ) : (
                <div className="bg-white/90 rounded-2xl p-3.5 border border-amber-200 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-amber-900">
                    وضاحت (Explanation):
                  </div>
                  <p>{currentSolution.practiceProblem.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
