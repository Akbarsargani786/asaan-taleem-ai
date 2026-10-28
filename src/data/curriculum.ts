import { Subject, GradeLevel, Language } from '../types';

export interface CurriculumTopic {
  id: string;
  subject: Subject;
  grade: GradeLevel;
  title: Record<Language, string>;
  description: Record<Language, string>;
  keyFormula: string;
  sampleQuestion: Record<Language, string>;
  quickSummary: Record<Language, string>;
}

export interface SampleHomeworkItem {
  id: string;
  subject: Subject;
  title: Record<Language, string>;
  grade: GradeLevel;
  questionText: Record<Language, string>;
  mockImageUrl: string;
}

export const CURRICULUM_TOPICS: CurriculumTopic[] = [
  {
    id: 'math-linear-eq',
    subject: 'mathematics',
    grade: 'middle',
    title: {
      sindhi: 'لينيئر مساواتون (Linear Equations)',
      urdu: 'یک درجی مساواتیں (Linear Equations)',
      english: 'Linear Equations in One Variable',
    },
    description: {
      sindhi: 'هڪ اڻ ڄاتل عدد (Variable) سان سادا رياضي حساب ڪتاب حل ڪرڻ جو قاعدو.',
      urdu: 'ایک متغیر پر مشتمل سادہ مساواتیں حل کرنے کا طریقہ۔',
      english: 'Techniques to solve simple equations with a single variable.',
    },
    keyFormula: 'ax + b = c  =>  x = (c - b) / a',
    sampleQuestion: {
      sindhi: 'جيڪڏهن 3x + 9 = 24 هجي ته x جو قدر مرحليوار ڳوليو.',
      urdu: 'اگر 3x + 9 = 24 ہو تو x کی قیمت معلوم کریں۔',
      english: 'Solve for x: 3x + 9 = 24 step by step.',
    },
    quickSummary: {
      sindhi: 'پهرين ٻنهي پاسن کان 9 ڪٽيو: 3x = 15. پوءِ 3 سان ورهائي ڇڏيو: x = 5.',
      urdu: 'پہلے دونوں طرف سے 9 گھٹائیں: 3x = 15۔ پھر 3 سے تقسیم کریں: x = 5۔',
      english: 'Subtract 9 from both sides: 3x = 15. Then divide both sides by 3: x = 5.',
    },
  },
  {
    id: 'math-pythagoras',
    subject: 'mathematics',
    grade: 'matric',
    title: {
      sindhi: 'پائٿاگورس جو ٿيورم (Pythagoras Theorem)',
      urdu: 'مسئلہ فیثاغورث (Pythagorean Theorem)',
      english: 'Pythagorean Theorem',
    },
    description: {
      sindhi: 'قائم الزاويه ٽڪنڊي جي ٽنهي پاسن (پايو، عمود ۽ ڪَرڻ) جي وچ ۾ لاڳاپو.',
      urdu: 'قائمۃ الزاویہ مثلث کے اضلاع کا باہمی تعلق۔',
      english: 'Fundamental relation among the three sides of a right triangle.',
    },
    keyFormula: 'Hypotenuse² = Base² + Perpendicular² (c² = a² + b²)',
    sampleQuestion: {
      sindhi: 'هڪ قائم الزاويه ٽڪنڊي جو پايو 3 سينٽي ميٽر ۽ عمود 4 سينٽي ميٽر آهي، ان جو ڪَرڻ (Hypotenuse) ڳوليو.',
      urdu: 'ایک قائمۃ الزاویہ مثلث کی بنیاد 3cm اور عمود 4cm ہے، وتر کی لمبائی معلوم کریں۔',
      english: 'A right triangle has base = 3cm and height = 4cm. Calculate its hypotenuse.',
    },
    quickSummary: {
      sindhi: 'c² = 3² + 4² = 9 + 16 = 25. تنهنڪري c = √25 = 5 سينٽي ميٽر.',
      urdu: 'c² = 3² + 4² = 9 + 16 = 25۔ پس c = √25 = 5 سینٹی میٹر۔',
      english: 'c² = 3² + 4² = 9 + 16 = 25. Taking square root: c = 5cm.',
    },
  },
  {
    id: 'math-quadratic',
    subject: 'mathematics',
    grade: 'matric',
    title: {
      sindhi: 'ٻه درجي مساوات (Quadratic Equation)',
      urdu: 'دو درجی مساوات (Quadratic Formula)',
      english: 'Quadratic Equations & Formula',
    },
    description: {
      sindhi: 'چورس وارين مساواتن کي فارمولي يا فئڪٽرائيزيشن سان حل ڪرڻ.',
      urdu: 'دو درجی مساوات کو فارمولے کے ذریعے حل کرنا۔',
      english: 'Solving second-degree polynomial equations using formula or factoring.',
    },
    keyFormula: 'x = (-b ± √(b² - 4ac)) / (2a)',
    sampleQuestion: {
      sindhi: 'مساوات x² - 5x + 6 = 0 جا روٽس مرحليوار ڳوليو.',
      urdu: 'مساوات x² - 5x + 6 = 0 کے روٹس معلوم کریں۔',
      english: 'Find the roots of x² - 5x + 6 = 0 step by step.',
    },
    quickSummary: {
      sindhi: 'هن جا فئڪٽرز (x - 2)(x - 3) = 0 آهن، تنهنڪري x = 2 ۽ x = 3 جواب ملن ٿا.',
      urdu: 'اس کے اجزائے ضربی (x - 2)(x - 3) = 0 ہیں، پس x = 2 اور x = 3 حاصل ہوں گے۔',
      english: 'Factoring gives (x - 2)(x - 3) = 0, so solutions are x = 2 and x = 3.',
    },
  },
  {
    id: 'sci-photosynthesis',
    subject: 'biology',
    grade: 'middle',
    title: {
      sindhi: 'ڦوٽوسنٿيسس يا ضيائي تاليف (Photosynthesis)',
      urdu: 'ضیائی تالیف (Photosynthesis)',
      english: 'Photosynthesis in Plants',
    },
    description: {
      sindhi: 'ٻوٽن پاران سج جي روشني، پاڻي ۽ ڪاربان ڊاءِ آڪسائيڊ مان پنهنجو کاڌو تيار ڪرڻ وارو عمل.',
      urdu: 'سورج کی روشنی اور کاربن ڈائی آکسائیڈ سے پودوں کا خوراک بنانا۔',
      english: 'Process through which green plants convert light energy into chemical energy.',
    },
    keyFormula: '6CO₂ + 6H₂O + سج جي روشني => C₆H₁₂O₆ (گلوڪوز) + 6O₂',
    sampleQuestion: {
      sindhi: 'ٻوٽن ۾ ڦوٽوسنٿيسس جا ڪهڙا مرحلا آهن ۽ ڪلوروفل جو ڪهڙو ڪم آهي؟',
      urdu: 'فوٹوسنتھیسز کا بنیادی فارمولا کیا ہے اور اس میں کلوروفل کا کیا کردار ہے؟',
      english: 'Explain the chemical equation and role of chlorophyll in photosynthesis.',
    },
    quickSummary: {
      sindhi: 'ڪلوروفل پنن ۾ سج جي توانائي جذب ڪري پاڻي ۽ هوا مان کاڌو ٺاهي ٿو ۽ صاف آڪسيجن هوا ۾ ڇڏي ٿو.',
      urdu: 'کلوروفل روشنی کو جذب کر کے گلوکوز اور آکسیجن پیدا کرتا ہے۔',
      english: 'Chlorophyll absorbs sunlight, converting water and CO₂ into glucose and releasing oxygen.',
    },
  },
  {
    id: 'sci-newton-laws',
    subject: 'physics',
    grade: 'matric',
    title: {
      sindhi: 'نيوٽن جا حرڪت بابت ٽي قانون (Newton’s Laws)',
      urdu: 'حرکت کے تینوں قوانین (Newton’s Laws of Motion)',
      english: "Newton's Three Laws of Motion",
    },
    description: {
      sindhi: 'جمود جو قانون، قوت ۽ تيزي جو تعلق (F = ma)، ۽ عمل ۽ ردعمل وارو قانون.',
      urdu: 'قانون جمود، قوت اور اسراع کا تعلق (F = ma)، اور عمل و ردعمل کا قانون۔',
      english: 'Inertia, Force = mass × acceleration, and Action = Reaction.',
    },
    keyFormula: 'قانون ٻيو: F = m × a  (قوت = مايو × تيزي)',
    sampleQuestion: {
      sindhi: 'جيڪڏهن 5 ڪلوگرام مادي واري جسم کي 2 m/s² جي تيزي ڏيڻي هجي ته ڪيتري قوت لڳندي؟',
      urdu: 'اگر 5 کلوگرام کے جسم پر 2 میٹر فی سیکنڈ اسکوائر کا اسراع پیدا کرنا ہو تو کتنی قوت درکار ہوگی؟',
      english: 'Calculate the force required to accelerate a 5 kg mass at 2 m/s².',
    },
    quickSummary: {
      sindhi: 'ڏنل آهي: m = 5 kg, a = 2 m/s². فارمولو F = m × a = 5 × 2 = 10 نيوٽن (N).',
      urdu: 'معلوم ہے: m = 5kg اور a = 2m/s²۔ فارمولا: F = 5 × 2 = 10 نیوٹن۔',
      english: 'Given: mass = 5 kg, acceleration = 2 m/s². Force = 5 × 2 = 10 Newtons (N).',
    },
  },
  {
    id: 'sci-cells',
    subject: 'biology',
    grade: 'middle',
    title: {
      sindhi: 'گهرڙو ۽ ان جي ساخت (Plant vs Animal Cell)',
      urdu: 'خلیہ کی ساخت (Plant and Animal Cell)',
      english: 'Cell Structure & Organelles',
    },
    description: {
      sindhi: 'ٻوٽن ۽ جانورن جي گهرڙن جا بنيادي فرق، سيل وال، نيوڪليئس ۽ مائيٽوڪانڊريا.',
      urdu: 'پودوں اور جانوروں کے خلیات کا باہمی فرق اور اہم حصے جیسے مائیٹوکونڈریا۔',
      english: 'Structural differences between plant and animal cells.',
    },
    keyFormula: 'سيل وال ۽ ڪلوروپلاسٽ صرف ٻوٽن واري گهرڙي ۾ هوندا آهن.',
    sampleQuestion: {
      sindhi: 'ٻوٽي جي گهرڙي ۽ جانور جي گهرڙي ۾ مکيه فرق ڪهڙا آهن؟',
      urdu: 'پودے اور جانور کے خلیے میں تین بنیادی فرق بیان کریں۔',
      english: 'What are the three main differences between plant and animal cells?',
    },
    quickSummary: {
      sindhi: 'ٻوٽن ۾ سيل وال (Cell Wall) ۽ ڪلوروپلاسٽ هوندا آهن ۽ هڪ وڏو ويڪيول (Vacuole) هوندو آهي.',
      urdu: 'پودوں کے خلیے میں سیل وال اور کلوروپلاسٹ موجود ہوتے ہیں جو جانوروں میں نہیں ہوتے۔',
      english: 'Plant cells have a rigid cell wall, chloroplasts, and a large central vacuole.',
    },
  },
];

// Pre-crafted high contrast SVG data URLs representing real homework questions
export const SAMPLE_HOMEWORK_CARDS: SampleHomeworkItem[] = [
  {
    id: 'hw-algebra',
    subject: 'mathematics',
    grade: 'middle',
    title: {
      sindhi: 'هوم ورڪ: الجبرا مساوات (2x + 7 = 19)',
      urdu: 'ہوم ورک: الجبرا مساوات (2x + 7 = 19)',
      english: 'Homework: Solve 2x + 7 = 19',
    },
    questionText: {
      sindhi: 'مهرباني ڪري تصوير مان هي سوال حل ڪريو: 2x + 7 = 19 ۾ x جو قدر معلوم ڪريو.',
      urdu: 'تصویر میں دیا گیا سوال حل کریں: 2x + 7 = 19 سے x معلوم کریں۔',
      english: 'Solve the equation from the homework sheet: 2x + 7 = 19 for x.',
    },
    mockImageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="%23fffbeb" rx="16" stroke="%23f59e0b" stroke-width="4"/><line x1="20" y1="50" x2="380" y2="50" stroke="%23cbd5e1" stroke-width="1.5"/><line x1="20" y1="90" x2="380" y2="90" stroke="%23cbd5e1" stroke-width="1.5"/><line x1="20" y1="130" x2="380" y2="130" stroke="%23cbd5e1" stroke-width="1.5"/><line x1="20" y1="170" x2="380" y2="170" stroke="%23cbd5e1" stroke-width="1.5"/><line x1="20" y1="210" x2="380" y2="210" stroke="%23cbd5e1" stroke-width="1.5"/><text x="40" y="40" font-family="sans-serif" font-weight="bold" font-size="16" fill="%231e293b">Math Homework - Exercise 4.2</text><text x="40" y="115" font-family="monospace" font-weight="bold" font-size="28" fill="%230f766e">Q1. Solve: 2x + 7 = 19</text><text x="40" y="160" font-family="sans-serif" font-size="14" fill="%2364748b">Show all intermediate calculation steps.</text></svg>`,
  },
  {
    id: 'hw-pythagoras',
    subject: 'mathematics',
    grade: 'matric',
    title: {
      sindhi: 'هوم ورڪ: پائٿاگورس ٽڪنڊو (Base 6, Perp 8)',
      urdu: 'ہوم ورک: مسئلہ فیثاغورث (قائمۃ الزاویہ مثلث)',
      english: 'Homework: Right Triangle Hypotenuse',
    },
    questionText: {
      sindhi: 'هن ٽڪنڊي جو ڪَرڻ (Hypotenuse) ڳوليو جنهن جو پايو 6 سينٽي ميٽر ۽ عمود 8 سينٽي ميٽر آهي.',
      urdu: 'اس مثلث کے وتر کی لمبائی معلوم کریں جس کا قاعدہ 6 اور عمود 8 ہے۔',
      english: 'Find the hypotenuse of a right triangle with base = 6 and height = 8.',
    },
    mockImageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="%23f0fdf4" rx="16" stroke="%2316a34a" stroke-width="4"/><polygon points="80,180 80,60 260,180" fill="%23dcfce7" stroke="%2315803d" stroke-width="3"/><rect x="80" y="160" width="20" height="20" fill="none" stroke="%2315803d" stroke-width="2"/><text x="50" y="125" font-family="sans-serif" font-weight="bold" font-size="18" fill="%2315803d">b = 8 cm</text><text x="145" y="205" font-family="sans-serif" font-weight="bold" font-size="18" fill="%2315803d">a = 6 cm</text><text x="180" y="110" font-family="sans-serif" font-weight="bold" font-size="20" fill="%23b91c1c">c = ? (Hypotenuse)</text><text x="240" y="50" font-family="sans-serif" font-weight="bold" font-size="15" fill="%23334155">Geometry Sheet: Class 9</text></svg>`,
  },
  {
    id: 'hw-ohms-law',
    subject: 'physics',
    grade: 'matric',
    title: {
      sindhi: 'هوم ورڪ: اوهم جو قانون (V = I × R)',
      urdu: 'ہوم ورک: اوہم کا قانون (V = IR)',
      english: "Homework: Ohm's Law Circuit Problem",
    },
    questionText: {
      sindhi: 'جيڪڏهن هڪ سرڪٽ ۾ ڪرنٽ 3 ايمپيئر ۽ ريزسٽنس 4 اوهم هجي ته وولٽيج معلوم ڪريو.',
      urdu: 'اگر سرکٹ میں کرنٹ 3A اور مزاحمت 4 اوم ہو تو وولٹیج معلوم کریں۔',
      english: 'If an electric circuit has current I = 3 A and resistance R = 4 Ω, calculate voltage V.',
    },
    mockImageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="%23eff6ff" rx="16" stroke="%232563eb" stroke-width="4"/><text x="30" y="45" font-family="sans-serif" font-weight="bold" font-size="16" fill="%231e3a8a">Physics Class 10 - Electricity Unit</text><rect x="60" y="80" width="280" height="100" fill="none" stroke="%231e40af" stroke-width="3" rx="8"/><circle cx="200" cy="80" r="18" fill="%23dbeafe" stroke="%231d4ed8" stroke-width="2"/><text x="194" y="86" font-family="sans-serif" font-weight="bold" font-size="16" fill="%231d4ed8">R</text><text x="75" y="140" font-family="sans-serif" font-size="16" fill="%231e293b">Current I = 3 Amperes</text><text x="210" y="140" font-family="sans-serif" font-size="16" fill="%231e293b">Resistance R = 4 Ω</text><text x="75" y="165" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23dc2626">Find: Voltage (V) = ?</text></svg>`,
  },
];
