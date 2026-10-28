import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Heart,
  Globe,
  Mic,
  Square,
  Upload,
  Play,
  CheckCircle2,
  AlertCircle,
  Key,
  ShieldCheck,
  Sparkles,
  FileAudio,
  Radio,
  ExternalLink,
  Volume2,
} from 'lucide-react';
import { Language, CustomVoiceProfile, VoiceCloningStatus } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { stopAllAudio } from '../utils/audio';

interface AboutPageProps {
  language: Language;
  voiceProfile: CustomVoiceProfile | null;
  onSaveVoiceProfile: (profile: CustomVoiceProfile) => void;
  onToggleCustomVoice: (enabled: boolean) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  language,
  voiceProfile,
  onSaveVoiceProfile,
  onToggleCustomVoice,
}) => {
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Audio recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(
    voiceProfile?.audioBase64 ? `data:audio/wav;base64,${voiceProfile.audioBase64}` : null
  );
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // Status from backend
  const [cloningStatus, setCloningStatus] = useState<VoiceCloningStatus>({
    isConfigured: false,
    service: 'ElevenLabs Voice Cloning',
    details: 'Checking service status...',
  });

  const [testPlaying, setTestPlaying] = useState<boolean>(false);
  const [saveAlert, setSaveAlert] = useState<boolean>(false);

  useEffect(() => {
    // Fetch live voice cloning configuration status from backend
    fetch('/api/voice-cloning-status')
      .then((res) => res.json())
      .then((data: VoiceCloningStatus) => {
        setCloningStatus(data);
      })
      .catch((e) => {
        console.warn('Could not fetch voice cloning status:', e);
      });

    return () => {
      stopAllAudio();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle uploading audio file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      setRecordedBlobUrl(result);

      const profile: CustomVoiceProfile = {
        id: `voice-${Date.now()}`,
        voiceName: 'Akbar Sargani Voice',
        audioBase64: base64Data,
        audioMimeType: file.type || 'audio/wav',
        isCustomVoiceEnabled: true,
        createdAt: new Date().toISOString(),
      };

      onSaveVoiceProfile(profile);
      setSaveAlert(true);
      setTimeout(() => setSaveAlert(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Start in-browser microphone recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const blobUrl = URL.createObjectURL(audioBlob);
        setRecordedBlobUrl(blobUrl);

        // Convert to base64 to store in local profile
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = (reader.result as string).split(',')[1];
          const profile: CustomVoiceProfile = {
            id: `voice-rec-${Date.now()}`,
            voiceName: 'Akbar Sargani Recorded Voice',
            audioBase64: base64String,
            audioMimeType: 'audio/wav',
            durationSeconds: recordingDuration,
            isCustomVoiceEnabled: true,
            createdAt: new Date().toISOString(),
          };
          onSaveVoiceProfile(profile);
          setSaveAlert(true);
          setTimeout(() => setSaveAlert(false), 3000);
        };
        reader.readAsDataURL(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Error starting audio recording:', err);
      alert('مائيڪ تائين رسائي نه ملي سگهي. مهرباني ڪري مائيڪ جي اجازت ڏيو.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  // Play test audio sample
  const playSampleAudio = () => {
    if (!recordedBlobUrl) return;
    stopAllAudio();
    const audio = new Audio(recordedBlobUrl);
    setTestPlaying(true);
    audio.onended = () => setTestPlaying(false);
    audio.onerror = () => setTestPlaying(false);
    audio.play();
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-24">
      {/* Creator Credit Hero Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-teal-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-teal-950 flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.about.appNameLabel} {t.appName}</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {t.about.creatorName}
          </h2>

          {/* 3-Language Creator Credit Box Required by user */}
          <div className="bg-white/10 backdrop-blur-sm border border-teal-400/30 rounded-2xl p-4 space-y-2 mt-2">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              سرڪاري ڪرڊٽ • Creator Attributions:
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              <div className="text-sm font-extrabold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span>"Created by Akbar Sargani"</span>
              </div>
              <div className="text-sm font-extrabold text-teal-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>"هي ايپ اڪبر سرگاڻي ٺاهي آهي"</span>
              </div>
              <div className="text-sm font-extrabold text-teal-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-300 shrink-0" />
                <span>"یہ ایپ اکبر سرگانی نے بنائی ہے"</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Details Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <User className="w-5 h-5 text-teal-800" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {t.about.title}
            </h3>
            <p className="text-xs text-slate-500">
              {t.about.subtitle}
            </p>
          </div>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-500 block mb-0.5">
              {t.about.appNameLabel}
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              Asaan Taleem AI (آسان تعليم AI)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-500 block mb-0.5">
              {t.about.creatorLabel}
            </span>
            <span className="text-sm font-extrabold text-teal-800">
              Akbar Sargani (اڪبر سرگاڻي)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 sm:col-span-2">
            <span className="font-bold text-slate-500 block mb-0.5">
              {t.about.purposeLabel}
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
              Making education easy and accessible for every student.
            </p>
            <p className="text-xs text-slate-600 mt-1">
              (هر شاگرد لاءِ سنڌي، اردو ۽ انگريزي ۾ سولي ۽ مفت تعليم ميسر ڪرڻ).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 sm:col-span-2">
            <span className="font-bold text-slate-500 block mb-0.5">
              {t.about.languagesLabel}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              {t.about.languagesText}
            </span>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1">
          <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{t.about.missionTitle}:</span>
          </div>
          <p>{t.about.missionBody}</p>
        </div>
      </div>

      {/* CUSTOM VOICE STUDIO */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Mic className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {t.about.voiceStudioTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {t.about.voiceStudioSubtitle}
              </p>
            </div>
          </div>

          {/* Toggle Custom Voice switch */}
          {voiceProfile && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleCustomVoice(!voiceProfile.isCustomVoiceEnabled)}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  voiceProfile.isCustomVoiceEnabled
                    ? 'bg-amber-500 text-teal-950 font-black ring-2 ring-amber-300'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {voiceProfile.isCustomVoiceEnabled ? 'آواز فعال آهي' : 'آواز بند'}
              </button>
            </div>
          )}
        </div>

        {/* Voice Cloning Status Banner */}
        <div
          className={`rounded-2xl p-3.5 border flex items-start gap-2.5 text-xs ${
            cloningStatus.isConfigured
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          {cloningStatus.isConfigured ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <Radio className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
          )}
          <div className="space-y-1">
            <div className="font-extrabold flex items-center gap-1.5">
              <span>{t.about.voiceClonedStatus}:</span>
              <span className="underline">{cloningStatus.service}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-black ${
                  cloningStatus.isConfigured
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-200 text-amber-900'
                }`}
              >
                {cloningStatus.isConfigured ? 'Ready (فعال)' : 'Setup Available'}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">
              {cloningStatus.details}
            </p>
          </div>
        </div>

        {/* Sample sentence to read */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs">
          <span className="font-bold text-slate-600 block mb-1">
            رڪارڊنگ دوران پڙهڻ لاءِ نموني جو جملو (Sample Sentence):
          </span>
          <p className="text-teal-950 font-bold bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed">
            "{t.about.sampleSentence}"
          </p>
        </div>

        {/* Action Controls: Upload or Record */}
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            accept="audio/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Record via mic */}
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="btn-press bg-teal-700 hover:bg-teal-800 text-white p-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <Mic className="w-4 h-4 text-amber-300" />
                <span>{t.about.recordMic}</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="btn-press bg-red-600 hover:bg-red-700 text-white p-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 animate-pulse shadow-md"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>
                  {t.about.stopRecording} ({recordingDuration}s)
                </span>
              </button>
            )}

            {/* Upload file */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-press bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 p-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4 text-teal-700" />
              <span>{t.about.uploadRecording}</span>
            </button>
          </div>

          {/* Test Playback if audio exists */}
          {recordedBlobUrl && (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-950">
                <FileAudio className="w-4 h-4 text-teal-700" />
                <span>اڪبر سرگاڻي جو آواز نمونو محفوظ آهي</span>
              </div>
              <button
                onClick={playSampleAudio}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                  testPlaying
                    ? 'bg-amber-500 text-teal-950 animate-pulse'
                    : 'bg-teal-700 text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t.about.playSample}</span>
              </button>
            </div>
          )}

          {saveAlert && (
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.about.voiceSavedAlert}</span>
            </div>
          )}
        </div>

        {/* Secure Configuration Guide (Instructions on how to configure voice cloning service securely) */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 mt-4 text-xs">
          <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>{t.about.howToSetupTitle}</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {t.about.howToSetupBody}
          </p>
          <div className="space-y-1.5 pt-1 text-slate-700 font-medium">
            {t.about.setupDocsSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-2 rounded-xl border border-slate-200/80 leading-relaxed">
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
