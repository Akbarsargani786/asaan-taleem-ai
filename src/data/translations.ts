import { Language } from '../types';

export interface TranslationSchema {
  appName: string;
  appTagline: string;
  creatorCredit: string;
  creatorCreditEn: string;
  creatorCreditSd: string;
  creatorCreditUr: string;
  nav: {
    home: string;
    subjects: string;
    aiTeacher: string;
    quizzes: string;
    offline: string;
    about: string;
  };
  home: {
    welcome: string;
    subWelcome: string;
    streak: string;
    points: string;
    snapHomework: string;
    snapHomeworkSub: string;
    askTeacher: string;
    askTeacherSub: string;
    dailyQuiz: string;
    dailyQuizSub: string;
    offlineVault: string;
    offlineVaultSub: string;
    dailyConceptTitle: string;
    dailyConceptBody: string;
    listenConcept: string;
    exploreSubjects: string;
    quickPromptsTitle: string;
    creatorBadgeTitle: string;
  };
  subjects: {
    title: string;
    subtitle: string;
    allGrades: string;
    primary: string;
    middle: string;
    matric: string;
    intermediate: string;
    math: string;
    science: string;
    physics: string;
    chemistry: string;
    biology: string;
    sindhiSub: string;
    englishSub: string;
    chaptersCount: string;
    askUstadAboutTopic: string;
    downloadTopic: string;
    keyFormulas: string;
  };
  teacher: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    sendButton: string;
    uploadPhoto: string;
    uploadPhotoDesc: string;
    photoUploaded: string;
    removePhoto: string;
    solvingQuestion: string;
    stepsTitle: string;
    teacherTip: string;
    formulaTitle: string;
    listenAnswer: string;
    stopAudio: string;
    saveOffline: string;
    savedSuccess: string;
    practiceTitle: string;
    checkAnswer: string;
    trySampleProblem: string;
    sampleProblems: string;
    useAkbarVoice: string;
    defaultVoice: string;
    customVoiceActive: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    startQuiz: string;
    questionOf: string;
    score: string;
    showHint: string;
    nextQuestion: string;
    finishQuiz: string;
    congratulations: string;
    wellDone: string;
    practiceAgain: string;
    explanation: string;
    generateNewQuiz: string;
    generating: string;
  };
  offline: {
    title: string;
    subtitle: string;
    savedCount: string;
    downloadPdf: string;
    noSaved: string;
    noSavedDesc: string;
    simulatedOffline: string;
    onlineMode: string;
    offlineMode: string;
    preloadedNotes: string;
    openLesson: string;
    removeLesson: string;
  };
  about: {
    title: string;
    subtitle: string;
    appNameLabel: string;
    creatorLabel: string;
    creatorName: string;
    purposeLabel: string;
    purposeText: string;
    languagesLabel: string;
    languagesText: string;
    missionTitle: string;
    missionBody: string;
    voiceStudioTitle: string;
    voiceStudioSubtitle: string;
    uploadRecording: string;
    recordMic: string;
    recordingNow: string;
    stopRecording: string;
    playSample: string;
    voiceClonedStatus: string;
    howToSetupTitle: string;
    howToSetupBody: string;
    setupDocsSteps: string[];
    sampleSentence: string;
    voiceSavedAlert: string;
  };
  common: {
    step: string;
    grade: string;
    subject: string;
    listen: string;
    loading: string;
    error: string;
    close: string;
    cancel: string;
    offlineBadge: string;
    viewInPhone: string;
    fullWidthView: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  sindhi: {
    appName: "آسان تعليم AI",
    appTagline: "سنڌي، اردو ۽ انگريزي ۾ سولي ۽ مفت تعليم",
    creatorCredit: "هي ايپ اڪبر سرگاڻي ٺاهي آهي",
    creatorCreditEn: "Created by Akbar Sargani",
    creatorCreditSd: "هي ايپ اڪبر سرگاڻي ٺاهي آهي",
    creatorCreditUr: "یہ ایپ اکبر سرگانی نے بنائی ہے",
    nav: {
      home: "مکيه صفحو",
      subjects: "مضمون",
      aiTeacher: "آسان استاد",
      quizzes: "ڪوئز ۽ ٽيسٽ",
      offline: "آف لائين سبق",
      about: "اڪبر سرگاڻي بابت",
    },
    home: {
      welcome: "ڀلي ڪري آيا، شاگرد!",
      subWelcome: "اڄ اسان رياضي ۽ سائنس بلڪل سولي سنڌي ۾ سکنداسين.",
      streak: "ڏينهن جو تسلسل",
      points: "تعليمي پوائنٽس",
      snapHomework: "هوم ورڪ جي تصوير ڪڍو",
      snapHomeworkSub: "ڪتاب يا ڪاپي جي تصوير اپلوڊ ڪريو ۽ سولو حل حاصل ڪريو",
      askTeacher: "آسان استاد کان پڇو",
      askTeacherSub: "ڪو به سوال پڇو، استاد سولي سنڌي ۾ مرحليوار سمجهائيندو",
      dailyQuiz: "روزانو 5 منٽ ڪوئز",
      dailyQuizSub: "پنهنجي ذهانت آزمايو ۽ تمغا کٽيو",
      offlineVault: "آف لائين پڙهائي لائبريري",
      offlineVaultSub: "بغير انٽرنيٽ جي ڪڏهن به ياد ڪريو",
      dailyConceptTitle: "اڄ جو سولو تصور: نيوٽن جو پهريون قانون",
      dailyConceptBody: "ڪا به شي جيستائين ان تي ٻاهران زور نه لڳايو وڃي، تيستائين يا ته ماٺ رهندي يا سڌي لڪير ۾ هلندي رهندي. هن کي جمود (Inertia) به چئبو آهي.",
      listenConcept: "سبق ٻڌو",
      exploreSubjects: "مضمون چونڊيو ۽ پڙهو",
      quickPromptsTitle: "شاگردن پاران اڪثر پڇيا ويندڙ سوال:",
      creatorBadgeTitle: "ايپ جو باني ۽ خالق",
    },
    subjects: {
      title: "تعليمي نصاب ۽ مضمون",
      subtitle: "سنڌ ٽيڪسٽ بڪ بورڊ ۽ وفاقي نصاب مطابق چونڊيل مضمون",
      allGrades: "سڀ درجا",
      primary: "پرائمري (پهرين کان پنجين)",
      middle: "مڊل (ڇهين کان اٺين)",
      matric: "مئٽرڪ (نائين ۽ ڏهين)",
      intermediate: "انٽر (يارھين ۽ ٻارھين)",
      math: "رياضي (Math)",
      science: "جنرل سائنس",
      physics: "طبعيات (Physics)",
      chemistry: "ڪيميا (Chemistry)",
      biology: "حياتيات (Biology)",
      sindhiSub: "سنڌي ادب ۽ گرامر",
      englishSub: "انگريزي گرامر",
      chaptersCount: "سبق ۽ مرحليوار حل",
      askUstadAboutTopic: "هن سبق بابت پڇو",
      downloadTopic: "آف لائين محفوظ ڪريو",
      keyFormulas: "اهم فارمولا ۽ اصول:",
    },
    teacher: {
      title: "آسان استاد (AI Teacher)",
      subtitle: "توهان جو ذاتي مهربان استاد، جيڪو سولي سنڌي ۾ هر مرحلو کولي سمجهائي ٿو",
      inputPlaceholder: "پنهنجو رياضي يا سائنس جو سوال هتي لکو...",
      sendButton: "سوال پڇو",
      uploadPhoto: "تصوير اپلوڊ ڪريو",
      uploadPhotoDesc: "هوم ورڪ جي تصوير هتي ڇڪي رکو يا ڪلڪ ڪريو",
      photoUploaded: "تصوير چونڊيل آهي",
      removePhoto: "تصوير هٽايو",
      solvingQuestion: "استاد سوچي رهيو آهي ۽ سولي سنڌي ۾ مرحليوار حل تيار ڪري رهيو آهي...",
      stepsTitle: "قدم به قدم سمجهاڻي (Step-by-Step)",
      teacherTip: "استاد جي سولي صلاح:",
      formulaTitle: "ضروري فارمولو يا قاعدو:",
      listenAnswer: "آواز ۾ پڙهي ٻڌو",
      stopAudio: "آواز بند ڪريو",
      saveOffline: "سبق محفوظ ڪريو (Offline)",
      savedSuccess: "سبق ڪاميابي سان آف لائين محفوظ ٿي ويو!",
      practiceTitle: "هاڻي پاڻ آزمايو (توهان جو امتحان):",
      checkAnswer: "جواب چيڪ ڪريو",
      trySampleProblem: "يا هي هوم ورڪ نمونا حل ڪري ڏسو:",
      sampleProblems: "نموني جا سوال",
      useAkbarVoice: "اڪبر سرگاڻي جو ڪسٽم آواز استعمال ڪريو",
      defaultVoice: "عام سسٽم آواز",
      customVoiceActive: "اڪبر سرگاڻي جو آواز فعال آهي",
    },
    quiz: {
      title: "ڪوئز ۽ ذهني مشق",
      subtitle: "مضمونن مان سوال حل ڪريو، پنهنجي ياداشت پڪي ڪريو ۽ نمبر کٽيو",
      startQuiz: "ٽيسٽ شروع ڪريو",
      questionOf: "سوال",
      score: "اسڪور",
      showHint: "سولو اشارو (Hint)",
      nextQuestion: "ايندڙ سوال",
      finishQuiz: "نتيجو ڏسو",
      congratulations: "شاباش! تمام سٺو ڪم!",
      wellDone: "توهان ڪاميابي سان هي ٽيسٽ پورو ڪري ورتو.",
      practiceAgain: "ٻيهر ٽيسٽ ڏيو",
      explanation: "صحيح جواب جي سمجهاڻي:",
      generateNewQuiz: "نئون AI ڪوئز ٺاهيو",
      generating: "نئون ڪوئز تيار ٿي رهيو آهي...",
    },
    offline: {
      title: "آف لائين اسٽڊي ڪارڊز",
      subtitle: "بغير انٽرنيٽ جي ڪنهن به وقت پڙهو، رويزن ڪريو يا پرنٽ ڪڍو",
      savedCount: "محفوظ ٿيل سبق",
      downloadPdf: "پرنٽ / پي ڊي ايف ڊائون لوڊ ڪريو",
      noSaved: "اڃا تائين ڪو به سبق محفوظ ناهي ڪيو ويو.",
      noSavedDesc: "آسان استاد صفحي تان ڪنهن به سوال کي 'سبق محفوظ ڪريو' دٻائي هتي آڻي سگهو ٿا.",
      simulatedOffline: "انٽرنيٽ جي آزمايش",
      onlineMode: "آن لائين موڊ فعال آهي",
      offlineMode: "آف لائين موڊ (بغير نيٽ جي سبق دستياب آهن)",
      preloadedNotes: "نصاب جا بنيادي فارمولا ۽ خلاصا:",
      openLesson: "سبق پڙهو",
      removeLesson: "سبق هٽايو",
    },
    about: {
      title: "ايپ ۽ باني بابت",
      subtitle: "آسان تعليم AI جو مقصد، باني اڪبر سرگاڻي ۽ ڪسٽم وائيس سسٽم",
      appNameLabel: "ايپ جو نالو:",
      creatorLabel: "ٺاهيندڙ / باني:",
      creatorName: "Akbar Sargani (اڪبر سرگاڻي)",
      purposeLabel: "مکيه مقصد (Purpose):",
      purposeText: "Making education easy and accessible for every student. (هر شاگرد لاءِ تعليم سولي، اثرائتي ۽ بغير ڪنهن رڪاوٽ جي ميسر بنائڻ).",
      languagesLabel: "سهڪاري ٻوليون (Languages):",
      languagesText: "Sindhi, Urdu, and English (سنڌي، اردو ۽ انگريزي)",
      missionTitle: "اسان جو مشن ۽ پيغام",
      missionBody: "اڪبر سرگاڻي جو خواب آهي ته سنڌ ۽ سموري پاڪستان جو هر ٻار سولي مادري زبان ۾ رياضي، سائنس ۽ جديد تعليم حاصل ڪري پنهنجو مستقبل روشن ڪري سگهي.",
      voiceStudioTitle: "اڪبر سرگاڻي جو ڪسٽم آواز اسٽوڊيو (Custom Voice)",
      voiceStudioSubtitle: "پنهنجي حقيقي آواز جي رڪارڊنگ اپلوڊ ڪريو يا مائيڪ ذريعي رڪارڊ ڪريو ته جيئن استاد اوهان جي آواز ۾ جواب پڙهي.",
      uploadRecording: "آواز جي آڊيو فائيل اپلوڊ ڪريو (MP3/WAV/M4A)",
      recordMic: "مائيڪ مان آواز رڪارڊ ڪريو",
      recordingNow: "رڪارڊنگ جاري آهي... ڪجهه ڳالهايو",
      stopRecording: "رڪارڊنگ روڪيو ۽ محفوظ ڪريو",
      playSample: "آواز جو نمونو ٻڌو",
      voiceClonedStatus: "وائيس ڪلوننگ سروس اسٽيٽس",
      howToSetupTitle: "وائيس ڪلوننگ سروس محفوظ نموني ڪيئن ترتيب ڏجي؟",
      howToSetupBody: "ڪسٽم وائيس ڪلوننگ (جهڙوڪ ElevenLabs API) کي محفوظ رکو ته جيئن ڪا به ڪي (Key) برائوزر يا پبلڪ ڪوڊ ۾ ظاهر نه ٿئي:",
      setupDocsSteps: [
        "1. ElevenLabs يا ٻئي معتبر پليٽ فارم تان پنهنجو اڪائونٽ ٺاهي هڪ آڊيو ڪلون Voice ID ٺاهيو.",
        "2. AI Studio جي Settings > Secrets پينل ۾ وڃي ELEVENLABS_API_KEY شامل ڪريو.",
        "3. ان سان گڏ ELEVENLABS_VOICE_ID به سيٽ ڪريو. سرور محفوظ طريقي سان پس پرده ڪال ڪندو.",
        "4. بغير ڪنهن ڪي جي به مقامي برائوزر اسٽوريج ۽ آواز جا نمونا محفوظ رهن ٿا."
      ],
      sampleSentence: "سلام! مان اڪبر سرگاڻي آهيان. آسان تعليم AI سان هر شاگرد سولي نموني پڙهي سگهندو.",
      voiceSavedAlert: "توهان جو آواز نمونو ڪاميابيءَ سان محفوظ ٿي ويو!",
    },
    common: {
      step: "مرحلو",
      grade: "درجو",
      subject: "مضمون",
      listen: "ٻڌو",
      loading: "مهرباني ڪري انتظار ڪريو...",
      error: "معذرت، ڪا غلطي ٿي وئي. مهرباني ڪري ٻيهر ڪوشش ڪريو.",
      close: "بند ڪريو",
      cancel: "منسوخ",
      offlineBadge: "آف لائين دستياب",
      viewInPhone: "موبائل فريم",
      fullWidthView: "فل اسڪرين",
    },
  },

  urdu: {
    appName: "آسان تعلیم AI",
    appTagline: "سندھی، اردو اور انگریزی میں آسان تعلیمی رہنما",
    creatorCredit: "یہ ایپ اکبر سرگانی نے بنائی ہے",
    creatorCreditEn: "Created by Akbar Sargani",
    creatorCreditSd: "هي ايپ اڪبر سرگاڻي ٺاهي آهي",
    creatorCreditUr: "یہ ایپ اکبر سرگانی نے بنائی ہے",
    nav: {
      home: "ہوم پیج",
      subjects: "مضامین",
      aiTeacher: "آسان استاد",
      quizzes: "کوئز اور پریکٹس",
      offline: "آف لائن اسباق",
      about: "اکبر سرگانی کے متعلق",
    },
    home: {
      welcome: "خوش آمدید، عزیز طالب علم!",
      subWelcome: "آج ہم ریاضی اور سائنس کو مرحلہ وار اور آسان انداز میں سیکھیں گے۔",
      streak: "روزانہ کا تسلسل",
      points: "تعلیمی پوائنٹس",
      snapHomework: "ہوم ورک کی تصویر اپلوڈ کریں",
      snapHomeworkSub: "کاپی یا کتاب کی تصویر کھینچیں اور فوری مرحلہ وار حل پائیں",
      askTeacher: "آسان استاد سے پوچھیں",
      askTeacherSub: "کوئی بھی سوال لکھیں، استاد آسان الفاظ میں سمجھائیں گے",
      dailyQuiz: "روزانہ 5 منٹ کوئز",
      dailyQuizSub: "اپنی صلاحیتوں کو آزمائیں اور نئے بیجز حاصل کریں",
      offlineVault: "آف لائن اسٹڈی لائبریری",
      offlineVaultSub: "بغیر انٹرنیٹ کے کسی بھی وقت دہرائی کریں",
      dailyConceptTitle: "آج کا سبق: نیوٹن کا پہلا قانون",
      dailyConceptBody: "کوئی بھی جسم اس وقت تک ساکن یا یکساں حرکت میں رہتا ہے جب تک کوئی بیرونی قوت اثر انداز نہ ہو۔ اسے قانون جمود (Inertia) بھی کہا جاتا ہے۔",
      listenConcept: "سبق سنیں",
      exploreSubjects: "مضامین منتخب کریں اور پڑھیں",
      quickPromptsTitle: "طلباء کے مقبول ترین سوالات:",
      creatorBadgeTitle: "ایپ ڈویلپر اور بانی",
    },
    subjects: {
      title: "درسی کتب اور مضامین",
      subtitle: "سندھ اور وفاقی نصاب کے مطابق بنیادی درسی اسباق",
      allGrades: "تمام درجات",
      primary: "پرائمری (کلاس 1 تا 5)",
      middle: "مڈل (کلاس 6 تا 8)",
      matric: "میٹرک (کلاس 9 اور 10)",
      intermediate: "انٹرمیڈیٹ (کلاس 11 اور 12)",
      math: "ریاضی (Mathematics)",
      science: "جنرل سائنس",
      physics: "طبیعیات (Physics)",
      chemistry: "کیمسٹری (Chemistry)",
      biology: "حیاتیات (Biology)",
      sindhiSub: "سندھی زبان و ادب",
      englishSub: "انگلش گرامر",
      chaptersCount: "اسباق اور حل شدہ سوالات",
      askUstadAboutTopic: "اس سبق کے متعلق پوچھیں",
      downloadTopic: "آف لائن محفوظ کریں",
      keyFormulas: "اہم فارمولے اور کلیات:",
    },
    teacher: {
      title: "آسان استاد (AI Teacher)",
      subtitle: "آپ کا مہربان ذاتی استاد جو ہر سوال کو آسان زبان میں مرحلہ وار حل کرتا ہے",
      inputPlaceholder: "ریاضی یا سائنس کا اپنا سوال یہاں درج کریں...",
      sendButton: "سوال پوچھیں",
      uploadPhoto: "تصویر اپلوڈ کریں",
      uploadPhotoDesc: "ہوم ورک کی تصویر کھینچیں یا یہاں ڈراپ کریں",
      photoUploaded: "تصویر منتخب ہو گئی ہے",
      removePhoto: "تصویر ہٹائیں",
      solvingQuestion: "استاد سوال کا جائزہ لے رہے ہیں اور مرحلہ وار حل تیار کر رہے ہیں...",
      stepsTitle: "مرحلہ وار حل (Step-by-Step)",
      teacherTip: "استاد کی خاص نصیحت:",
      formulaTitle: "لاگو ہونے والا فارمولا:",
      listenAnswer: "آواز میں سنیں",
      stopAudio: "آواز بند کریں",
      saveOffline: "سبق محفوظ کریں (Offline)",
      savedSuccess: "سبق آف لائن لائبریری میں محفوظ ہو گیا ہے!",
      practiceTitle: "خود آزمائی کا سوال:",
      checkAnswer: "جواب چیک کریں",
      trySampleProblem: "یا ہوم ورک کے نمونے حل کریں:",
      sampleProblems: "نمونہ سوالات",
      useAkbarVoice: "اکبر سرگانی کی کسٹم آواز استعمال کریں",
      defaultVoice: "معیاری سسٹم آواز",
      customVoiceActive: "اکبر سرگانی کی آواز فعال ہے",
    },
    quiz: {
      title: "کوئز اور پریکٹس ٹیسٹ",
      subtitle: "مضامین کے اہم سوالات حل کریں اور اپنے علم کو پختہ بنائیں",
      startQuiz: "ٹیسٹ شروع کریں",
      questionOf: "سوال",
      score: "اسکور",
      showHint: "مددگار اشارہ (Hint)",
      nextQuestion: "اگلا سوال",
      finishQuiz: "نتیجہ دیکھیں",
      congratulations: "شاباش! شاندار کارکردگی!",
      wellDone: "آپ نے کامیابی سے ٹیسٹ مکمل کر لیا ہے۔",
      practiceAgain: "دوبارہ ٹیسٹ دیں",
      explanation: "درست جواب کی وضاحت:",
      generateNewQuiz: "نیا AI کوئز بنائیں",
      generating: "نیا کوئز بن رہا ہے...",
    },
    offline: {
      title: "آف لائن اسٹڈی نوٹس",
      subtitle: "بغیر انٹرنیٹ کے کسی بھی وقت مطالعہ کریں، دہرائیں اور پرنٹ کریں",
      savedCount: "محفوظ اسباق",
      downloadPdf: "پرنٹ / پی ڈی ایف ڈاؤن لوڈ کریں",
      noSaved: "ابھی تک کوئی سبق محفوظ نہیں کیا گیا۔",
      noSavedDesc: "آسان استاد کے صفحے پر 'سبق محفوظ کریں' بٹن دبا کر اسباق یہاں محفوظ کریں۔",
      simulatedOffline: "انٹرنیٹ اسٹیٹس",
      onlineMode: "آن لائن موڈ فعال ہے",
      offlineMode: "آف لائن موڈ (اسباق محفوظ شدہ میموری سے دستیاب ہیں)",
      preloadedNotes: "نصاب کے اہم فارمولے اور خلاصے:",
      openLesson: "سبق کھولیں",
      removeLesson: "سبق حذف کریں",
    },
    about: {
      title: "خالق اور ایپ کا تعارف",
      subtitle: "آسان تعلیم AI کا مقصد، تخلیق کار اکبر سرگانی اور کسٹم وائس سسٹم",
      appNameLabel: "ایپ کا نام:",
      creatorLabel: "تخلیق کار / بانی:",
      creatorName: "Akbar Sargani (اکبر سرگانی)",
      purposeLabel: "بنیادی مقصد (Purpose):",
      purposeText: "Making education easy and accessible for every student. (ہر طالب علم کے لیے تعلیم کو آسان، قابل رسائی اور عام بنانا)۔",
      languagesLabel: "تعاون یافتہ زبانیں (Languages):",
      languagesText: "Sindhi, Urdu, and English (سندھی، اردو اور انگریزی)",
      missionTitle: "ہمارا مقصد اور پیغام",
      missionBody: "اکبر سرگانی کا ویژن ہے کہ سندھ اور پاکستان کا ہر طالب علم اپنی مادری زبان میں ریاضی اور سائنس کو آسانی سے سمجھے۔",
      voiceStudioTitle: "اکبر سرگانی کا کسٹم وائس اسٹوڈیو (Custom Voice)",
      voiceStudioSubtitle: "اپنی آواز کا نمونہ اپلوڈ یا ریکارڈ کریں تاکہ AI استاد آپ کی اپنی آواز میں اسباق پڑھ کر سنائے۔",
      uploadRecording: "آواز کی آڈیو فائل اپلوڈ کریں (MP3/WAV)",
      recordMic: "مائیک سے آواز ریکارڈ کریں",
      recordingNow: "ریکارڈنگ جاری ہے... کچھ بولیے",
      stopRecording: "ریکارڈنگ روکیں اور محفوظ کریں",
      playSample: "آواز کا نمونہ سنیں",
      voiceClonedStatus: "وائس کلوننگ سروس اسٹیٹس",
      howToSetupTitle: "وائس کلوننگ سروس کو محفوظ طریقے سے کیسے کنفیگر کریں؟",
      howToSetupBody: "کسٹم وائس کلوننگ (جیسے ElevenLabs API) کو محفوظ رکھنا ضروری ہے تاکہ API کیز براؤزر پر ایکسپوز نہ ہوں:",
      setupDocsSteps: [
        "1۔ ElevenLabs پر اکاؤنٹ بنا کر اپنی آواز کا وائس ماڈل (Voice ID) بنائیں۔",
        "2۔ AI Studio کی Settings > Secrets پینل میں ELEVENLABS_API_KEY محفوظ کریں۔",
        "3۔ ساتھ ہی ELEVENLABS_VOICE_ID بھی سیٹ کریں تاکہ سرور کالز خودکار طور پر ہینڈل ہوں۔",
        "4۔ اس طرح کوئی بھی خفیہ کی براؤزر میں ظاہر نہیں ہوتی اور سب محفوظ رہتا ہے۔"
      ],
      sampleSentence: "السلام علیکم! میں اکبر سرگانی ہوں۔ آسان تعلیم AI کا مقصد ہر طالب علم کو آسان تعلیم فراہم کرنا ہے۔",
      voiceSavedAlert: "آپ کی آواز کا نمونہ کامیابی سے محفوظ ہو گیا ہے!",
    },
    common: {
      step: "مرحلہ",
      grade: "کلاس",
      subject: "مضمون",
      listen: "سنیں",
      loading: "براہ کرم انتظار کیجیے...",
      error: "معذرت، کوئی مسئلہ پیش آیا۔ دوبارہ کوشش کریں۔",
      close: "بند کریں",
      cancel: "منسوخ",
      offlineBadge: "آف لائن دستیاب",
      viewInPhone: "موبائل فریم",
      fullWidthView: "فل اسکرین",
    },
  },

  english: {
    appName: "Asaan Taleem AI",
    appTagline: "Easy Learning in Sindhi, Urdu, and English",
    creatorCredit: "Created by Akbar Sargani",
    creatorCreditEn: "Created by Akbar Sargani",
    creatorCreditSd: "هي ايپ اڪبر سرگاڻي ٺاهي آهي",
    creatorCreditUr: "یہ ایپ اکبر سرگانی نے بنائی ہے",
    nav: {
      home: "Home",
      subjects: "Subjects",
      aiTeacher: "AI Teacher",
      quizzes: "Quizzes",
      offline: "Offline Study",
      about: "About Creator",
    },
    home: {
      welcome: "Welcome, Student!",
      subWelcome: "Learn Mathematics and Science step-by-step in simple language.",
      streak: "Day Streak",
      points: "Study Points",
      snapHomework: "Snap Homework Photo",
      snapHomeworkSub: "Upload homework questions from your notebook for instant step solutions",
      askTeacher: "Ask AI Teacher",
      askTeacherSub: "Type any question and get clear step-by-step guidance in simple Sindhi or Urdu",
      dailyQuiz: "Daily 5-Min Quiz",
      dailyQuizSub: "Test your understanding and earn achievement badges",
      offlineVault: "Offline Study Cards",
      offlineVaultSub: "Study key formulas and notes anytime without internet connection",
      dailyConceptTitle: "Today's Concept: Newton's First Law",
      dailyConceptBody: "An object will remain at rest or continue moving in a straight line at constant speed unless acted upon by a net external force. This property is known as Inertia.",
      listenConcept: "Listen Lesson",
      exploreSubjects: "Explore Subjects & Curriculum",
      quickPromptsTitle: "Frequently asked by students:",
      creatorBadgeTitle: "Created by Akbar Sargani",
    },
    subjects: {
      title: "Curriculum & Subjects",
      subtitle: "Sindh Textbook Board & National Curriculum chapters broken down simply",
      allGrades: "All Grades",
      primary: "Primary (Class 1 - 5)",
      middle: "Middle (Class 6 - 8)",
      matric: "Matric (Class 9 - 10)",
      intermediate: "Intermediate (Class 11 - 12)",
      math: "Mathematics",
      science: "General Science",
      physics: "Physics",
      chemistry: "Chemistry",
      biology: "Biology",
      sindhiSub: "Sindhi Literature & Grammar",
      englishSub: "English Grammar & Writing",
      chaptersCount: "Chapters & Solved Guides",
      askUstadAboutTopic: "Ask AI Teacher About This",
      downloadTopic: "Save Offline",
      keyFormulas: "Key Formulas & Principles:",
    },
    teacher: {
      title: "Asaan Ustad (AI Teacher)",
      subtitle: "Your patient mentor explaining complex concepts step by step in simple Sindhi, Urdu, or English",
      inputPlaceholder: "Type your math or science question here...",
      sendButton: "Ask Question",
      uploadPhoto: "Upload Photo",
      uploadPhotoDesc: "Snap homework photo or drag and drop image here",
      photoUploaded: "Photo selected",
      removePhoto: "Remove photo",
      solvingQuestion: "Asaan Ustad is analyzing the problem and preparing step-by-step explanations...",
      stepsTitle: "Step-by-Step Breakdown",
      teacherTip: "Teacher's Tip:",
      formulaTitle: "Applied Formula / Principle:",
      listenAnswer: "Listen Aloud",
      stopAudio: "Stop Voice",
      saveOffline: "Save Lesson (Offline)",
      savedSuccess: "Lesson successfully saved to Offline Library!",
      practiceTitle: "Try it Yourself (Practice Problem):",
      checkAnswer: "Check Answer",
      trySampleProblem: "Or test with these sample homework questions:",
      sampleProblems: "Sample Homework Cards",
      useAkbarVoice: "Speak in Akbar Sargani's Voice",
      defaultVoice: "Standard AI Voice",
      customVoiceActive: "Akbar Sargani's Voice Active",
    },
    quiz: {
      title: "Interactive Quizzes & Practice",
      subtitle: "Test your mastery with step-by-step explanations and instant scoring",
      startQuiz: "Start Practice Test",
      questionOf: "Question",
      score: "Score",
      showHint: "Show Hint",
      nextQuestion: "Next Question",
      finishQuiz: "View Results",
      congratulations: "Bravo! Excellent work!",
      wellDone: "You have completed this practice test.",
      practiceAgain: "Retake Quiz",
      explanation: "Step-by-Step Explanation:",
      generateNewQuiz: "Generate New AI Quiz",
      generating: "Generating fresh quiz questions...",
    },
    offline: {
      title: "Offline Study Cards & Notes",
      subtitle: "Access saved lessons, formulas, and summaries without an active internet connection",
      savedCount: "Saved Lessons",
      downloadPdf: "Download / Print Study Sheet",
      noSaved: "No saved lessons yet.",
      noSavedDesc: "Ask any question in AI Teacher and tap 'Save Lesson' to access it offline anytime.",
      simulatedOffline: "Internet Status",
      onlineMode: "Online Mode Active",
      offlineMode: "Offline Mode (Local Storage Active)",
      preloadedNotes: "Essential Syllabus Revision Cards:",
      openLesson: "Open Lesson",
      removeLesson: "Remove",
    },
    about: {
      title: "About the Creator",
      subtitle: "Asaan Taleem AI details, Creator Akbar Sargani, and Custom Voice Studio",
      appNameLabel: "App Name:",
      creatorLabel: "Creator:",
      creatorName: "Akbar Sargani",
      purposeLabel: "Purpose:",
      purposeText: "Making education easy and accessible for every student.",
      languagesLabel: "Languages:",
      languagesText: "Sindhi, Urdu, and English.",
      missionTitle: "Mission & Vision",
      missionBody: "Asaan Taleem AI was envisioned and created by Akbar Sargani to dismantle educational barriers for students across Sindh and Pakistan by offering intuitive AI tutoring in their native mother tongue.",
      voiceStudioTitle: "Custom Voice Studio (Akbar Sargani's Voice)",
      voiceStudioSubtitle: "Upload an audio recording or record directly from your microphone so the AI teacher speaks in your voice.",
      uploadRecording: "Upload Voice Recording (MP3 / WAV / M4A)",
      recordMic: "Record with Microphone",
      recordingNow: "Recording your voice... speak now",
      stopRecording: "Stop & Save Voice Sample",
      playSample: "Test Play Voice Sample",
      voiceClonedStatus: "Voice Cloning Service Status",
      howToSetupTitle: "How to Configure Voice Cloning Securely",
      howToSetupBody: "To synthesize dynamic AI answers in your cloned voice using a production TTS service (such as ElevenLabs):",
      setupDocsSteps: [
        "1. Create an account on ElevenLabs (or your chosen voice provider) and clone your uploaded voice to receive a Voice ID.",
        "2. Add your ELEVENLABS_API_KEY in the AI Studio Settings > Secrets panel (never commit keys to source code).",
        "3. Set ELEVENLABS_VOICE_ID with your custom voice ID.",
        "4. The backend server proxy (/api/tts) securely routes requests with server-side credentials and streams audio back."
      ],
      sampleSentence: "Hello! I am Akbar Sargani. With Asaan Taleem AI, learning mathematics and science is simple and fun for every student.",
      voiceSavedAlert: "Your voice sample has been successfully saved!",
    },
    common: {
      step: "Step",
      grade: "Grade",
      subject: "Subject",
      listen: "Listen",
      loading: "Please wait...",
      error: "Sorry, an error occurred. Please try again.",
      close: "Close",
      cancel: "Cancel",
      offlineBadge: "Offline Ready",
      viewInPhone: "Phone Frame",
      fullWidthView: "Full Screen",
    },
  },
};
