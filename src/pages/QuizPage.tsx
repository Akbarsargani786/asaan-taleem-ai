import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  Lightbulb,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { Language, Subject, GradeLevel, QuizQuestion, UserStats } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { playTextAloud } from '../utils/audio';

interface QuizPageProps {
  language: Language;
  onUpdateStats: (pointsGained: number) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  language,
  onUpdateStats,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('mathematics');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('matric');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReadingQuestion, setIsReadingQuestion] = useState<boolean>(false);

  const t = TRANSLATIONS[language];
  const isRtl = language === 'sindhi' || language === 'urdu';
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const loadQuiz = async (subject: Subject, grade: GradeLevel) => {
    setIsLoading(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizComplete(false);
    setShowHint(false);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          grade,
          language,
          count: 4,
        }),
      });

      if (!res.ok) throw new Error('Quiz fetch failed');
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err) {
      console.error('Quiz loading failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  React.useEffect(() => {
    loadQuiz(selectedSubject, selectedGrade);
  }, [language, selectedSubject, selectedGrade]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQ) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setIsQuizComplete(true);
      const earnedXP = (score + (selectedAnswer === currentQ?.correctAnswer ? 1 : 0)) * 25;
      onUpdateStats(earnedXP);
    }
  };

  const handleReadQuestion = () => {
    if (!currentQ) return;
    const text = `${currentQ.question}. ${currentQ.options.map((opt, i) => `آپشن ${i + 1}: ${opt}`).join('. ')}`;
    setIsReadingQuestion(true);
    playTextAloud(
      text,
      language,
      1.0,
      () => setIsReadingQuestion(true),
      () => setIsReadingQuestion(false)
    );
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
                {t.quiz.title}
              </h2>
              <p className="text-xs text-slate-500">
                {t.quiz.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => loadQuiz(selectedSubject, selectedGrade)}
            className="btn-press p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
            title="Reload fresh quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {[
            { id: 'mathematics' as Subject, label: t.subjects.math, icon: '📐' },
            { id: 'science' as Subject, label: t.subjects.science, icon: '🔬' },
            { id: 'physics' as Subject, label: t.subjects.physics, icon: '⚡' },
            { id: 'biology' as Subject, label: t.subjects.biology, icon: '🌿' },
            { id: 'chemistry' as Subject, label: t.subjects.chemistry, icon: '🧪' },
          ].map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.id)}
              className={`btn-press whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                selectedSubject === sub.id
                  ? 'bg-amber-500 text-teal-950 font-black shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{sub.icon}</span>
              <span>{sub.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
          <div className="w-10 h-10 mx-auto border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="font-extrabold text-slate-700 text-sm">
            {t.quiz.generating}
          </p>
        </div>
      )}

      {/* Active Quiz Question Card */}
      {!isLoading && !isQuizComplete && currentQ && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>
                {t.quiz.questionOf} {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-teal-700">
                {t.quiz.score}: {score}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-amber-500 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
            <button
              onClick={handleReadQuestion}
              title="سوال ٻڌو"
              className={`btn-press p-2 rounded-xl border shrink-0 transition-colors ${
                isReadingQuestion
                  ? 'bg-amber-100 border-amber-300 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-teal-700'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isReadingQuestion ? 'animate-pulse' : ''}`} />
            </button>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correctAnswer;

              let btnStyle =
                'bg-slate-50/70 border-slate-200 hover:border-amber-400 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-extrabold';
                } else if (isSelected) {
                  btnStyle = 'bg-red-100 border-red-500 text-red-950 font-bold';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-70';
                }
              } else if (isSelected) {
                btnStyle = 'bg-amber-100 border-amber-500 text-teal-950 font-extrabold ring-2 ring-amber-300';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`btn-press w-full text-right rtl:text-right ltr:text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Hint disclosure */}
          {currentQ.hint && (
            <div>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-bold text-amber-800 flex items-center gap-1.5 hover:underline"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.quiz.showHint}</span>
              </button>
              {showHint && (
                <div className="mt-2 bg-amber-50/90 border border-amber-200 rounded-2xl p-3 text-xs text-amber-950 leading-relaxed animate-fade-in">
                  💡 {currentQ.hint}
                </div>
              )}
            </div>
          )}

          {/* Explanation revealed after answer */}
          {isAnswerSubmitted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 space-y-1 animate-fade-in">
              <div className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{t.quiz.explanation}</span>
              </div>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Submit or Next Question Action */}
          <div className="pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="btn-press w-full bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-extrabold py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>جواب چيڪ ڪريو</span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="btn-press w-full bg-amber-500 hover:bg-amber-400 text-teal-950 font-black py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {currentIndex + 1 < questions.length
                    ? t.quiz.nextQuestion
                    : t.quiz.finishQuiz}
                </span>
                <NextIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quiz Completion Scorecard */}
      {isQuizComplete && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl shadow-inner">
            🏆
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {t.quiz.congratulations}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.quiz.wellDone}
            </p>
          </div>

          {/* Score Circle */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-3xl p-5 max-w-xs mx-auto">
            <div className="text-3xl sm:text-4xl font-black text-teal-900">
              {score} / {questions.length}
            </div>
            <div className="text-xs font-bold text-teal-700 mt-1">
              {Math.round((score / Math.max(questions.length, 1)) * 100)}% ڪاميابي
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-black text-amber-700 bg-amber-100/80 py-1 px-3 rounded-full">
              <Award className="w-4 h-4 text-amber-600" />
              <span>+{score * 25} XP پوائنٽس حاصل ڪيا</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
            <button
              onClick={() => loadQuiz(selectedSubject, selectedGrade)}
              className="btn-press w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-extrabold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.quiz.practiceAgain}</span>
            </button>

            <button
              onClick={() => {
                const nextSubject: Subject =
                  selectedSubject === 'mathematics' ? 'science' :
                  selectedSubject === 'science' ? 'physics' : 'mathematics';
                setSelectedSubject(nextSubject);
              }}
              className="btn-press w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>ٻيو مضمون آزمايو</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
