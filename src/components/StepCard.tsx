import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, Copy, Check, Volume2 } from 'lucide-react';
import { StepItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { playTextAloud } from '../utils/audio';

interface StepCardProps {
  step: StepItem;
  totalSteps: number;
  language: Language;
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  totalSteps,
  language,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isReadingStep, setIsReadingStep] = useState<boolean>(false);
  const t = TRANSLATIONS[language];

  const handleCopyFormula = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReadStep = () => {
    const text = `${t.common.step} ${step.stepNumber}: ${step.title}. ${step.explanation}. ${step.formulaOrKeyFact || ''}`;
    setIsReadingStep(true);
    playTextAloud(
      text,
      language,
      1.0,
      () => setIsReadingStep(true),
      () => setIsReadingStep(false)
    );
  };

  // Convert numbers to Sindhi / Urdu digits if needed
  const toEasternDigits = (n: number) => {
    const eastern = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return language === 'sindhi' || language === 'urdu'
      ? n
          .toString()
          .split('')
          .map((d) => eastern[parseInt(d, 10)] || d)
          .join('')
      : n.toString();
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/90 relative overflow-hidden transition-all hover:border-teal-300">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-700 text-white font-black flex items-center justify-center text-sm shadow-xs">
            {toEasternDigits(step.stepNumber)}
          </div>
          <div>
            <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
              {t.common.step} {toEasternDigits(step.stepNumber)} / {toEasternDigits(totalSteps)}
            </span>
            <h4 className="text-base font-extrabold text-slate-800 leading-snug">
              {step.title}
            </h4>
          </div>
        </div>

        {/* Read Step Aloud Button */}
        <button
          onClick={handleReadStep}
          title={t.teacher.listenAnswer}
          className={`btn-press p-1.5 rounded-lg border transition-colors ${
            isReadingStep
              ? 'bg-amber-100 border-amber-300 text-amber-800'
              : 'bg-slate-50 hover:bg-teal-50 border-slate-200 text-slate-600 hover:text-teal-700'
          }`}
        >
          <Volume2 className={`w-4 h-4 ${isReadingStep ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Explanation text */}
      <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-3">
        {step.explanation}
      </p>

      {/* Formula or Key Scientific Rule */}
      {step.formulaOrKeyFact && (
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl p-3 my-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sky-900 font-mono text-sm sm:text-base font-bold">
            <span className="text-xs font-sans text-sky-700 bg-white/80 px-1.5 py-0.5 rounded border border-sky-200 font-semibold">
              {t.teacher.formulaTitle}
            </span>
            <span className="tracking-wide select-all">{step.formulaOrKeyFact}</span>
          </div>
          <button
            onClick={() => handleCopyFormula(step.formulaOrKeyFact || '')}
            title="Copy formula"
            className="p-1 rounded text-sky-700 hover:bg-sky-100 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Teacher's Tip */}
      {step.tipInSindhi && (
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-2.5 flex items-start gap-2 text-xs sm:text-sm text-amber-900 font-medium">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-800 ml-1">{t.teacher.teacherTip}</span>
            <span>{step.tipInSindhi}</span>
          </div>
        </div>
      )}
    </div>
  );
};
