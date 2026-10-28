export type Language = 'sindhi' | 'urdu' | 'english';

export type Subject =
  | 'mathematics'
  | 'science'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'sindhi'
  | 'english';

export type GradeLevel = 'primary' | 'middle' | 'matric' | 'intermediate';

export interface StepItem {
  stepNumber: number;
  title: string;
  explanation: string;
  formulaOrKeyFact?: string;
  tipInSindhi?: string;
}

export interface PracticeProblem {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface TeacherResponse {
  title: string;
  directAnswer: string;
  stepByStep: StepItem[];
  practiceProblem?: PracticeProblem;
  voiceScript?: string;
  isFallback?: boolean;
  imageThumbnail?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
  subject?: Subject;
}

export interface SavedLesson {
  id: string;
  title: string;
  subject: Subject;
  language: Language;
  date: string;
  data: TeacherResponse;
  originalQuestion: string;
  imageThumbnail?: string;
}

export interface UserStats {
  xp: number;
  streakDays: number;
  quizzesCompleted: number;
  questionsSolved: number;
  savedLessonsCount: number;
}

export interface CustomVoiceProfile {
  id: string;
  voiceName: string;
  audioBase64?: string;
  audioMimeType?: string;
  durationSeconds?: number;
  isCustomVoiceEnabled: boolean;
  createdAt: string;
}

export interface VoiceCloningStatus {
  isConfigured: boolean;
  service: string;
  voiceId?: string;
  details: string;
}
