/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Language,
  UserStats,
  Subject,
  GradeLevel,
  SavedLesson,
  TeacherResponse,
  CustomVoiceProfile,
} from './types';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { BottomNav, NavTab } from './components/BottomNav';
import { AndroidFrame } from './components/AndroidFrame';
import { HomeworkUploadModal } from './components/HomeworkUploadModal';
import { HomePage } from './pages/HomePage';
import { SubjectsPage } from './pages/SubjectsPage';
import { AITeacherPage } from './pages/AITeacherPage';
import { QuizPage } from './pages/QuizPage';
import { OfflineLibraryPage } from './pages/OfflineLibraryPage';
import { AboutPage } from './pages/AboutPage';
import { CurriculumTopic } from './data/curriculum';

const LOCAL_STORAGE_KEY_LESSONS = 'asaan_taleem_saved_lessons';
const LOCAL_STORAGE_KEY_STATS = 'asaan_taleem_user_stats';
const LOCAL_STORAGE_KEY_VOICE = 'asaan_taleem_custom_voice';

export default function App() {
  const [language, setLanguage] = useState<Language>('sindhi');
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState<boolean>(false);

  // Active question handed to AI Teacher
  const [activeTeacherQuestion, setActiveTeacherQuestion] = useState<{
    text: string;
    imageBase64?: string;
    subject?: Subject;
    grade?: GradeLevel;
  } | null>(null);

  // Saved lessons state (persisted to localStorage)
  const [savedLessons, setSavedLessons] = useState<SavedLesson[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_LESSONS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // User stats (XP, streak)
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_STATS);
      return stored
        ? JSON.parse(stored)
        : {
            xp: 320,
            streakDays: 5,
            quizzesCompleted: 6,
            questionsSolved: 14,
            savedLessonsCount: 0,
          };
    } catch {
      return {
        xp: 320,
        streakDays: 5,
        quizzesCompleted: 6,
        questionsSolved: 14,
        savedLessonsCount: 0,
      };
    }
  });

  // Custom Voice Profile (Akbar Sargani's recorded voice)
  const [voiceProfile, setVoiceProfile] = useState<CustomVoiceProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_VOICE);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Persist lessons
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_LESSONS, JSON.stringify(savedLessons));
    } catch (e) {
      console.error('Error saving lessons to localStorage:', e);
    }
  }, [savedLessons]);

  // Persist stats
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_STATS, JSON.stringify(stats));
    } catch (e) {
      console.error('Error saving stats to localStorage:', e);
    }
  }, [stats]);

  // Persist voice profile
  useEffect(() => {
    try {
      if (voiceProfile) {
        localStorage.setItem(LOCAL_STORAGE_KEY_VOICE, JSON.stringify(voiceProfile));
      }
    } catch (e) {
      console.error('Error saving voice profile to localStorage:', e);
    }
  }, [voiceProfile]);

  // Update HTML document dir and lang attributes when language changes
  useEffect(() => {
    const isRtl = language === 'sindhi' || language === 'urdu';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang =
      language === 'sindhi' ? 'sd' : language === 'urdu' ? 'ur' : 'en';

    // Update body font class
    document.body.className = `antialiased bg-slate-100 ${
      language === 'sindhi'
        ? 'font-sindhi'
        : language === 'urdu'
        ? 'font-urdu'
        : 'font-latin'
    }`;
  }, [language]);

  const handleUpdateStats = (pointsGained: number) => {
    setStats((prev) => ({
      ...prev,
      xp: prev.xp + pointsGained,
      quizzesCompleted: prev.quizzesCompleted + 1,
    }));
  };

  const handleSaveLesson = (lesson: SavedLesson) => {
    setSavedLessons((prev) => {
      const filtered = prev.filter((l) => l.title !== lesson.title);
      return [lesson, ...filtered];
    });
    setStats((prev) => ({
      ...prev,
      savedLessonsCount: prev.savedLessonsCount + 1,
      xp: prev.xp + 15,
    }));
  };

  const handleRemoveLesson = (id: string) => {
    setSavedLessons((prev) => prev.filter((l) => l.id !== id));
  };

  const handleOpenSavedLessonInTeacher = (lesson: SavedLesson) => {
    setActiveTeacherQuestion({
      text: lesson.originalQuestion,
      imageBase64: lesson.imageThumbnail,
      subject: lesson.subject,
    });
    setCurrentTab('teacher');
  };

  const handleSaveTopicToOffline = (topic: CurriculumTopic) => {
    const mockResponse: TeacherResponse = {
      title: topic.title[language],
      directAnswer: topic.quickSummary[language],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'تصور جو بنيادي تعارف',
          explanation: topic.description[language],
          formulaOrKeyFact: topic.keyFormula,
          tipInSindhi: 'هن قاعدي کي سٺي نموني ياد رکو.',
        },
        {
          stepNumber: 2,
          title: 'نموني جو حل ۽ حساب',
          explanation: topic.sampleQuestion[language],
          formulaOrKeyFact: topic.keyFormula,
          tipInSindhi: 'فارمولي ۾ قيمتون رکو ۽ مرحليوار حل ڪريو.',
        },
        {
          stepNumber: 3,
          title: 'آخري نتيجو',
          explanation: topic.quickSummary[language],
          formulaOrKeyFact: 'نتيجو مڪمل',
          tipInSindhi: 'شاباش! اهو تصور توهان جي امتحاني تياري لاءِ تمام ضروري آهي.',
        },
      ],
      practiceProblem: {
        question: topic.sampleQuestion[language],
        options: ['جواب الف', 'جواب ب', 'جواب ج', 'جواب د'],
        answerIndex: 0,
        explanation: topic.quickSummary[language],
      },
      voiceScript: `${topic.title[language]}. ${topic.description[language]}. خلاصو: ${topic.quickSummary[language]}`,
    };

    const newLesson: SavedLesson = {
      id: `topic-${topic.id}-${Date.now()}`,
      title: topic.title[language],
      subject: topic.subject,
      language,
      date: new Date().toISOString(),
      data: mockResponse,
      originalQuestion: topic.sampleQuestion[language],
    };

    handleSaveLesson(newLesson);
  };

  const handleHomeworkSubmit = (data: {
    questionText: string;
    imageBase64?: string;
    subject: Subject;
    grade: GradeLevel;
  }) => {
    setActiveTeacherQuestion({
      text: data.questionText,
      imageBase64: data.imageBase64,
      subject: data.subject,
      grade: data.grade,
    });
    setCurrentTab('teacher');
  };

  const handleAskPreloadedQuestion = (question: string, subject: Subject) => {
    setActiveTeacherQuestion({
      text: question,
      subject,
    });
    setCurrentTab('teacher');
  };

  const handleSaveVoiceProfile = (profile: CustomVoiceProfile) => {
    setVoiceProfile(profile);
  };

  const handleToggleCustomVoice = (enabled: boolean) => {
    if (voiceProfile) {
      setVoiceProfile({ ...voiceProfile, isCustomVoiceEnabled: enabled });
    }
  };

  return (
    <AndroidFrame enabled={isPhoneFrame}>
      {/* Top Navbar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        stats={stats}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        isOfflineMode={isOfflineMode}
        onToggleOfflineMode={() => setIsOfflineMode(!isOfflineMode)}
        onOpenAbout={() => setCurrentTab('about')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-4 pt-3 sm:pt-4">
        {currentTab === 'home' && (
          <HomePage
            language={language}
            stats={stats}
            onNavigate={setCurrentTab}
            onOpenHomeworkModal={() => setIsHomeworkModalOpen(true)}
            onAskPreloadedQuestion={handleAskPreloadedQuestion}
          />
        )}

        {currentTab === 'subjects' && (
          <SubjectsPage
            language={language}
            onAskTopic={(question, subject, grade) => {
              setActiveTeacherQuestion({ text: question, subject, grade });
              setCurrentTab('teacher');
            }}
            onSaveTopicToOffline={handleSaveTopicToOffline}
          />
        )}

        {currentTab === 'teacher' && (
          <AITeacherPage
            language={language}
            onOpenHomeworkModal={() => setIsHomeworkModalOpen(true)}
            activeQuestion={activeTeacherQuestion}
            onSaveLesson={handleSaveLesson}
            useCustomVoice={Boolean(voiceProfile?.isCustomVoiceEnabled)}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizPage
            language={language}
            onUpdateStats={handleUpdateStats}
          />
        )}

        {currentTab === 'offline' && (
          <OfflineLibraryPage
            language={language}
            savedLessons={savedLessons}
            onRemoveLesson={handleRemoveLesson}
            onOpenLesson={handleOpenSavedLessonInTeacher}
            isOfflineMode={isOfflineMode}
            onToggleOfflineMode={() => setIsOfflineMode(!isOfflineMode)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            language={language}
            voiceProfile={voiceProfile}
            onSaveVoiceProfile={handleSaveVoiceProfile}
            onToggleCustomVoice={handleToggleCustomVoice}
          />
        )}
      </main>

      {/* Homework Photo Upload Modal */}
      <HomeworkUploadModal
        isOpen={isHomeworkModalOpen}
        onClose={() => setIsHomeworkModalOpen(false)}
        language={language}
        onSelectProblem={handleHomeworkSubmit}
      />

      {/* Bottom Android Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        language={language}
        savedCount={savedLessons.length}
      />
    </AndroidFrame>
  );
}
