import React from 'react';
import {
  Camera,
  Sparkles,
  HelpCircle,
  Download,
  Flame,
  Award,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Lightbulb,
  User,
  Mic,
} from 'lucide-react';
import { Language, UserStats, Subject } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { VoicePlayer } from '../components/VoicePlayer';
import { NavTab } from '../components/BottomNav';

interface HomePageProps {
  language: Language;
  stats: UserStats;
  onNavigate: (tab: NavTab) => void;
  onOpenHomeworkModal: () => void;
  onAskPreloadedQuestion: (question: string, subject: Subject) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  stats,
  onNavigate,
  onOpenHomeworkModal,
  onAskPreloadedQuestion,
}) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'sindhi' || language === 'urdu';
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const quickPrompts = [
    {
      q: language === 'sindhi'
        ? 'پائٿاگورس جو ٿيورم سولي سنڌي ۾ سمجهايو ۽ هڪ مثال ڏيو.'
        : language === 'urdu'
        ? 'مسئلہ فیثاغورث آسان زبان میں مع مثال سمجھائیں۔'
        : 'Explain Pythagorean Theorem with a simple real-world example.',
      sub: 'mathematics' as Subject,
      tag: 'Math',
    },
    {
      q: language === 'sindhi'
        ? 'ٻوٽا سج جي روشنيءَ مان پنهنجو کاڌو ڪيئن ٺاهيندا آهن؟ (ڦوٽوسنٿيسس)'
        : language === 'urdu'
        ? 'پودے فوٹوسنتھیسز سے خوراک کیسے تیار کرتے ہیں؟'
        : 'How do plants make their food through photosynthesis?',
      sub: 'biology' as Subject,
      tag: 'Science',
    },
    {
      q: language === 'sindhi'
        ? 'مساوات 3x + 12 = 30 کي قدم به قدم حل ڪريو.'
        : language === 'urdu'
        ? 'مساوات 3x + 12 = 30 کو مرحلہ وار حل کریں۔'
        : 'Solve 3x + 12 = 30 step by step.',
      sub: 'mathematics' as Subject,
      tag: 'Algebra',
    },
    {
      q: language === 'sindhi'
        ? 'نيوٽن جا حرڪت جا ٽي قانون روزمره جي مثالن سان سمجهايو.'
        : language === 'urdu'
        ? 'نیوٹن کے تینوں قوانین روزمرہ زندگی کی مثالوں سے سمجھائیں۔'
        : "Explain Newton's laws of motion with real-world examples.",
      sub: 'physics' as Subject,
      tag: 'Physics',
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 pb-20">
      {/* Hero Welcome Card with Sindhi Cultural Accent */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-900 to-emerald-950 text-white p-5 sm:p-6 shadow-xl border border-teal-700/60">
        {/* Cultural Geometric background motif */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-44 h-44 rounded-full bg-teal-500/15 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-teal-950 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.appName}</span>
            </span>

            {/* Streak & XP Pills */}
            <div className="flex items-center gap-2 text-xs font-extrabold">
              <span className="bg-teal-700/80 px-2.5 py-1 rounded-xl flex items-center gap-1 border border-teal-600/50">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{stats.streakDays} {t.home.streak}</span>
              </span>
              <span className="bg-teal-700/80 px-2.5 py-1 rounded-xl flex items-center gap-1 border border-teal-600/50">
                <Award className="w-3.5 h-3.5 text-yellow-300" />
                <span>{stats.xp} XP</span>
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1 mt-2">
            {t.home.welcome}
          </h2>
          <p className="text-teal-100 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
            {t.home.subWelcome}
          </p>

          {/* Quick primary actions */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-4">
            <button
              onClick={onOpenHomeworkModal}
              className="btn-press bg-amber-500 hover:bg-amber-400 text-teal-950 p-3 sm:p-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform"
            >
              <Camera className="w-4 h-4 shrink-0" />
              <span className="truncate">{t.home.snapHomework}</span>
            </button>

            <button
              onClick={() => onNavigate('teacher')}
              className="btn-press bg-teal-700 hover:bg-teal-600 text-white p-3 sm:p-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg border border-teal-500/50 transition-transform"
            >
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="truncate">{t.home.askTeacher}</span>
            </button>
          </div>
        </div>
      </div>

      {/* APP CREATOR CREDIT CARD (Required on Home Screen) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-teal-950 flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
            👨‍💻
          </div>
          <div>
            <div className="text-[11px] font-extrabold text-teal-700 uppercase tracking-wider mb-0.5">
              {t.home.creatorBadgeTitle}
            </div>
            <div className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              "Created by Akbar Sargani"
            </div>
            <div className="text-xs sm:text-sm font-bold text-teal-800 leading-snug">
              "هي ايپ اڪبر سرگاڻي ٺاهي آهي"
            </div>
            <div className="text-xs font-bold text-slate-600 leading-snug">
              "یہ ایپ اکبر سرگانی نے بنائی ہے"
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('about')}
          className="btn-press bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shrink-0"
        >
          <User className="w-3.5 h-3.5 text-teal-700" />
          <span>اڪبر سرگاڻي & ڪسٽم آواز</span>
          <NextIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Touch Buttons (4 key modules) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Homework Snap Card */}
        <button
          onClick={onOpenHomeworkModal}
          className="btn-press text-right rtl:text-right ltr:text-left p-4 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">
              {t.home.snapHomework}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2">
              {t.home.snapHomeworkSub}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-teal-700 mt-3">
            <span>تصوير ڪڍو</span>
            <NextIcon className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* AI Teacher Card */}
        <button
          onClick={() => onNavigate('teacher')}
          className="btn-press text-right rtl:text-right ltr:text-left p-4 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">
              {t.home.askTeacher}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2">
              {t.home.askTeacherSub}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-teal-700 mt-3">
            <span>استاد سان چيٽ</span>
            <NextIcon className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Quizzes Card */}
        <button
          onClick={() => onNavigate('quiz')}
          className="btn-press text-right rtl:text-right ltr:text-left p-4 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <HelpCircle className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">
              {t.home.dailyQuiz}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2">
              {t.home.dailyQuizSub}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-3">
            <span>ٽيسٽ ڏيو</span>
            <NextIcon className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Offline Study Cards */}
        <button
          onClick={() => onNavigate('offline')}
          className="btn-press text-right rtl:text-right ltr:text-left p-4 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
            <Download className="w-6 h-6 text-sky-700" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">
              {t.home.offlineVault}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2">
              {t.home.offlineVaultSub}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-sky-700 mt-3">
            <span>آف لائين نوٽس</span>
            <NextIcon className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Daily Concept of the Day Card with Voice Read Aloud */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50/70 border border-amber-200/90 rounded-3xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-xs font-black text-amber-800">
          <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-500/20" />
          <span>اڄ جو مکيه سبق (Daily Concept)</span>
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2">
          {t.home.dailyConceptTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
          {t.home.dailyConceptBody}
        </p>
        <VoicePlayer
          textToRead={`${t.home.dailyConceptTitle}. ${t.home.dailyConceptBody}`}
          language={language}
          label={t.home.listenConcept}
        />
      </div>

      {/* Curriculum Shortcuts */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-700" />
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
              {t.home.exploreSubjects}
            </h3>
          </div>
          <button
            onClick={() => onNavigate('subjects')}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
          >
            <span>سڀ مضمون</span>
            <NextIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onNavigate('subjects')}
            className="btn-press p-3 rounded-2xl bg-teal-50/70 hover:bg-teal-100/70 border border-teal-200 text-right rtl:text-right ltr:text-left transition-all"
          >
            <div className="text-xl mb-1">📐</div>
            <div className="text-xs font-extrabold text-teal-950">
              {t.subjects.math}
            </div>
            <div className="text-[10px] text-teal-700">ڪلاس ۵ کان ۱۲</div>
          </button>

          <button
            onClick={() => onNavigate('subjects')}
            className="btn-press p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 text-right rtl:text-right ltr:text-left transition-all"
          >
            <div className="text-xl mb-1">🔬</div>
            <div className="text-xs font-extrabold text-emerald-950">
              {t.subjects.science}
            </div>
            <div className="text-[10px] text-emerald-700">جنرل سائنس</div>
          </button>

          <button
            onClick={() => onNavigate('subjects')}
            className="btn-press p-3 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 text-right rtl:text-right ltr:text-left transition-all"
          >
            <div className="text-xl mb-1">⚡</div>
            <div className="text-xs font-extrabold text-blue-950">
              {t.subjects.physics}
            </div>
            <div className="text-[10px] text-blue-700">طبعيات و حرڪت</div>
          </button>

          <button
            onClick={() => onNavigate('subjects')}
            className="btn-press p-3 rounded-2xl bg-purple-50/70 hover:bg-purple-100/70 border border-purple-200 text-right rtl:text-right ltr:text-left transition-all"
          >
            <div className="text-xl mb-1">🌿</div>
            <div className="text-xs font-extrabold text-purple-950">
              {t.subjects.biology}
            </div>
            <div className="text-[10px] text-purple-700">حياتيات و سيل</div>
          </button>
        </div>
      </div>

      {/* Frequently Asked Student Prompts */}
      <div className="space-y-2">
        <h4 className="text-xs font-extrabold text-slate-600 px-1">
          {t.home.quickPromptsTitle}
        </h4>
        <div className="space-y-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onAskPreloadedQuestion(prompt.q, prompt.sub)}
              className="btn-press w-full text-right rtl:text-right ltr:text-left p-3 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 flex items-center justify-between gap-3 shadow-2xs transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md shrink-0">
                  {prompt.tag}
                </span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1">
                  {prompt.q}
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Small Credit Footer on Home Screen (Required by user) */}
      <div className="text-center pt-3 pb-2 border-t border-slate-200/80 text-xs text-slate-500 space-y-1">
        <p className="font-extrabold text-slate-700">
          Created by Akbar Sargani • هي ايپ اڪبر سرگاڻي ٺاهي آهي • یہ ایپ اکبر سرگانی نے بنائی ہے
        </p>
        <p className="text-[11px] text-slate-400">
          Asaan Taleem AI • Making education easy and accessible for every student
        </p>
      </div>
    </div>
  );
};
