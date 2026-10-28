import React, { useRef, useState } from 'react';
import { Camera, Upload, X, Check, Image as ImageIcon, Sparkles, BookOpen } from 'lucide-react';
import { Language, Subject, GradeLevel } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SAMPLE_HOMEWORK_CARDS, SampleHomeworkItem } from '../data/curriculum';

interface HomeworkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectProblem: (data: {
    questionText: string;
    imageBase64?: string;
    subject: Subject;
    grade: GradeLevel;
  }) => void;
}

export const HomeworkUploadModal: React.FC<HomeworkUploadModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectProblem,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('mathematics');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('matric');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handlePickSample = (sample: SampleHomeworkItem) => {
    setSelectedImage(sample.mockImageUrl);
    setCustomQuestion(sample.questionText[language]);
    setSelectedSubject(sample.subject);
    setSelectedGrade(sample.grade);
  };

  const handleSubmit = () => {
    onSelectProblem({
      questionText: customQuestion || (selectedImage ? 'مهرباني ڪري هن تصوير وارو هوم ورڪ سوال سولي سنڌي ۾ مرحليوار حل ڪريو.' : ''),
      imageBase64: selectedImage || undefined,
      subject: selectedSubject,
      grade: selectedGrade,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-800">
                {t.home.snapHomework}
              </h3>
              <p className="text-xs text-slate-500">
                {t.home.snapHomeworkSub}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Hidden inputs */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Upload Drop Zone or Image Preview */}
          {selectedImage ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-teal-500 bg-slate-900 shadow-md">
              <img
                src={selectedImage}
                alt="Selected homework"
                className="w-full max-h-56 object-contain bg-slate-950/20"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2.5 right-2.5 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:bg-red-700 transition-all"
                title={t.teacher.removePhoto}
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-teal-900/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.teacher.photoUploaded}</span>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all ${
                isDragging
                  ? 'border-teal-500 bg-teal-50/50'
                  : 'border-slate-300 hover:border-teal-500 bg-slate-50/60'
              }`}
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 shadow-inner">
                <ImageIcon className="w-7 h-7" />
              </div>
              <p className="font-bold text-slate-700 text-sm mb-1">
                {t.teacher.uploadPhotoDesc}
              </p>
              <p className="text-xs text-slate-500 mb-4">
                (JPG, PNG, WEBP - Mobile Photo or Screenshot)
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="btn-press bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Camera className="w-4 h-4" />
                  <span>ڪئميرا مان تصوير ڪڍو</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-press bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4 text-teal-700" />
                  <span>گيلري مان تصوير چونڊيو</span>
                </button>
              </div>
            </div>
          )}

          {/* Optional Question Text or Guidance */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              سوال جو تفصيل يا نوٽ (اختياري):
            </label>
            <textarea
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="مثال: مهرباني ڪري هن سوال کي سولي سنڌي ۾ مرحليوار سمجهايو..."
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>

          {/* Preloaded Sample Questions for immediate 1-click testing */}
          <div>
            <div className="flex items-center gap-1.5 mb-2 text-xs font-extrabold text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.teacher.sampleProblems} (فوري چيڪ ڪرڻ لاءِ ڪلڪ ڪريو):</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {SAMPLE_HOMEWORK_CARDS.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handlePickSample(card)}
                  type="button"
                  className="btn-press text-right rtl:text-right ltr:text-left p-2.5 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-teal-50/40 flex items-center justify-between gap-2 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {card.title[language]}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {card.questionText[language]}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] bg-teal-700 text-white font-bold px-2 py-0.5 rounded-lg shrink-0">
                    حل ڪريو
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-200"
          >
            {t.common.cancel}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedImage && !customQuestion.trim()}
            className="btn-press bg-teal-700 hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>آسان استاد ڏانهن موڪليو</span>
          </button>
        </div>
      </div>
    </div>
  );
};
