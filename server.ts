import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '30mb' }));

// Initialize Google Gen AI client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Fallback educational explanations for offline/backup mode
const FALLBACK_EXPLANATIONS: Record<string, any> = {
  sindhi: {
    title: "رياضي ۽ سائنس جو سولو حل",
    directAnswer: "هيٺ ڏنل مرحلن ذريعي سوال کي سولي طريقي سان سمجهو.",
    stepByStep: [
      {
        stepNumber: 1,
        title: "سوال کي سمجهڻ ۽ ڄاڻايل شيون (Given Data)",
        explanation: "پهرين ڏسو ته سوال ۾ ڇا ڏنل آهي ۽ ڇا معلوم ڪرڻو آهي.",
        formulaOrKeyFact: "ڏنل معلومات کي ترتيب ڏيو",
        tipInSindhi: "سوال کي ڌيان سان ٻه ڀيرا پڙهو!"
      },
      {
        stepNumber: 2,
        title: "صحيح فارمولو يا اصول چونڊڻ (Formula / Principle)",
        explanation: "هن مسئلي لاءِ لاڳاپيل قاعدو يا مساوات استعمال ڪريو.",
        formulaOrKeyFact: "a² + b² = c²  يا  F = m × a",
        tipInSindhi: "هر مساوات ۾ اڪايون (Units) هڪجهڙيون رکو."
      },
      {
        stepNumber: 3,
        title: "حساب ڪتاب جا قدم (Step-by-Step Calculation)",
        explanation: "ڏنل انگ مساوات ۾ رکو ۽ مرحليوار حل ڪريو.",
        formulaOrKeyFact: "مرحليوار قدم کڻو",
        tipInSindhi: "حساب ڪتاب ۾ تڪڙ نه ڪريو."
      },
      {
        stepNumber: 4,
        title: "آخري جواب ۽ پڙتال (Final Answer & Check)",
        explanation: "جواب کي صحيح اڪائي (Units) سان لکو ۽ ٻيهر پڙتال ڪريو.",
        formulaOrKeyFact: "جواب چيڪ ڪريو",
        tipInSindhi: "شاباش! توهان جو تصور هاڻي بلڪل پڪو آهي."
      }
    ],
    practiceProblem: {
      question: "جيڪڏهن x + 4 = 10 آهي ته x جو قدر ڪهڙو هوندو؟",
      options: ["4", "6", "14", "10"],
      answerIndex: 1,
      explanation: "x + 4 = 10 مان ٻنهي پاسن کان 4 ڪٽيو، تنهنڪري x = 10 - 4 = 6 ملي ٿو."
    },
    voiceScript: "سلام پيارا شاگرد! آسان استاد سان سکڻ بلڪل سولو آهي. پهريون مرحلو ڏنل شيون سمجهڻ، ٻيو مرحلو فارمولو لاڳو ڪرڻ، ۽ ٽيون مرحلو حساب ڪرڻ آهي. شاباش!"
  },
  urdu: {
    title: "ریاضی اور سائنس کا آسان حل",
    directAnswer: "درج ذیل مراحل کے ذریعے اس سوال کو آسانی سے سمجھیں۔",
    stepByStep: [
      {
        stepNumber: 1,
        title: "معلوم معلومات اور سوال کو سمجھنا",
        explanation: "سب سے پہلے دیکھیں کہ سوال میں کیا دیا گیا ہے اور کیا معلوم کرنا ہے۔",
        formulaOrKeyFact: "دی گئی معلومات کو ترتیب دیں",
        tipInSindhi: "سوال کو غور سے دو بار پڑھیں۔"
      },
      {
        stepNumber: 2,
        title: "فارمولا اور اصول کا انتخاب",
        explanation: "متعلقہ مساوات یا سائنس کا بنیادی اصول لاگو کریں۔",
        formulaOrKeyFact: "درست فارمولا منتخب کریں",
        tipInSindhi: "یونٹس کا خاص خیال رکھیں۔"
      },
      {
        stepNumber: 3,
        title: "مرحلہ وار حساب",
        explanation: "فارمولے میں قیمتیں درج کریں اور مرحلہ وار حل کریں۔",
        formulaOrKeyFact: "مرحلہ وار حل",
        tipInSindhi: "ہر قدم کو واضح لکھیں۔"
      },
      {
        stepNumber: 4,
        title: "حتمی جواب اور تصدیق",
        explanation: "جواب کو درست اکائی کے ساتھ لکھیں اور تصدیق کریں۔",
        formulaOrKeyFact: "تصدیق مکمل",
        tipInSindhi: "بہت خوب! آپ کا تصور واضح ہو گیا ہے۔"
      }
    ],
    practiceProblem: {
      question: "اگر 2x = 16 ہو تو x کی قیمت کیا ہوگی؟",
      options: ["4", "8", "16", "32"],
      answerIndex: 1,
      explanation: "دونوں اطراف کو 2 سے تقسیم کریں، x = 16 / 2 = 8 حاصل ہوگا۔"
    },
    voiceScript: "آسان استاد کے ساتھ سیکھنا بہت آسان ہے۔ سوال کو سمجھیں، فارمولا لگائیں اور درست جواب حاصل کریں۔ شاباش!"
  },
  english: {
    title: "Step-by-Step Math & Science Solution",
    directAnswer: "Here is the clear step-by-step breakdown to master this concept.",
    stepByStep: [
      {
        stepNumber: 1,
        title: "Identify Given Information",
        explanation: "Identify what values are provided in the problem and what you need to solve for.",
        formulaOrKeyFact: "Given Data & Objective",
        tipInSindhi: "Always write down knowns and unknowns."
      },
      {
        stepNumber: 2,
        title: "Select Key Formula or Concept",
        explanation: "Choose the correct mathematical formula or scientific principle for the situation.",
        formulaOrKeyFact: "Relevant Formula",
        tipInSindhi: "Check that units are uniform."
      },
      {
        stepNumber: 3,
        title: "Step-by-Step Calculation",
        explanation: "Substitute the numbers into the equation and compute methodically.",
        formulaOrKeyFact: "Step-by-step execution",
        tipInSindhi: "Don't skip intermediate steps."
      },
      {
        stepNumber: 4,
        title: "Final Answer & Verification",
        explanation: "State the final numerical answer with proper units and double-check logic.",
        formulaOrKeyFact: "Verified Solution",
        tipInSindhi: "Great job! Keep practicing."
      }
    ],
    practiceProblem: {
      question: "If 3x + 6 = 21, what is the value of x?",
      options: ["3", "5", "7", "9"],
      answerIndex: 1,
      explanation: "Subtract 6 from both sides: 3x = 15. Then divide by 3: x = 5."
    },
    voiceScript: "Hello student! With Asaan Taleem AI, solving science and math is easy and fun. Follow each step carefully, verify your answers, and keep shining!"
  }
};

// API: Ask AI Teacher (text + homework photo)
app.post('/api/ask-teacher', async (req: Request, res: Response) => {
  try {
    const {
      question = '',
      imageBase64,
      imageMimeType = 'image/jpeg',
      language = 'sindhi',
      subject = 'mathematics',
      grade = 'matric',
    } = req.body;

    const langName =
      language === 'sindhi' ? 'Sindhi (سنڌي سولي زبان)' :
      language === 'urdu' ? 'Urdu (سادہ اردو)' : 'English';

    const systemPrompt = `You are "Asaan Ustad" (آسان استاد), a friendly, expert, encouraging school teacher for students in Sindh, Pakistan.
Your mission is to make Mathematics and Science incredibly simple, intuitive, and fun to learn.
You MUST explain in the chosen language: ${langName}.
When explaining in Sindhi, use authentic, natural, gentle, and simple Sindhi vocabulary (سولي ۽ پياري سنڌي). Use encouraging Sindhi phrases like "شاباش!", "اچو ته سولي طريقي سان سمجهون", "پهريون مرحلو", "ٻيو مرحلو", "ياد رکو".
When explaining in Urdu, use clear simple Urdu.
When explaining in English, use simple student-friendly English.

Always structure your explanation into sequential step-by-step guidance:
1. Title / Topic Name
2. Direct clear summary answer
3. 3 to 5 clear steps (Step Number, Step Title, Detailed Simple Explanation, Key Formula / Rule / Fact, Friendly Teacher Tip)
4. A mini practice multiple choice question with 4 options and the correct index (0-3) and brief reason
5. A voice read-aloud script (natural, clear, 2-3 sentences to be read aloud to the student in ${langName}).

Output strictly valid JSON with this schema:
{
  "title": "string",
  "directAnswer": "string",
  "stepByStep": [
    {
      "stepNumber": 1,
      "title": "string",
      "explanation": "string",
      "formulaOrKeyFact": "string",
      "tipInSindhi": "string"
    }
  ],
  "practiceProblem": {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "answerIndex": 0,
    "explanation": "string"
  },
  "voiceScript": "string"
}`;

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Returning rich educational fallback response.');
      const fallback = FALLBACK_EXPLANATIONS[language] || FALLBACK_EXPLANATIONS.sindhi;
      return res.json({
        ...fallback,
        title: question ? `${question} (${langName})` : fallback.title,
        isFallback: true
      });
    }

    const contents: any[] = [];
    const parts: any[] = [];

    if (imageBase64) {
      // Clean up base64 prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: imageMimeType,
          data: cleanBase64,
        },
      });
    }

    const userText = `Subject: ${subject}, Grade Level: ${grade}, Target Language: ${langName}.
Student's Question / Homework Request: "${question || 'Please analyze this uploaded homework question image step by step.'}"`;

    parts.push({ text: userText });
    contents.push({ role: 'user', parts });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const rawText = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (e) {
      // Attempt cleanup if wrapped in markdown code fence
      const match = rawText.match(/\{[\s\S]*\}/);
      if (match) {
        parsedData = JSON.parse(match[0]);
      } else {
        throw new Error('Could not parse Gemini JSON response');
      }
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/ask-teacher:', error);
    const lang = req.body.language || 'sindhi';
    const fallback = FALLBACK_EXPLANATIONS[lang] || FALLBACK_EXPLANATIONS.sindhi;
    return res.json({
      ...fallback,
      title: req.body.question || fallback.title,
      isFallback: true,
      errorNotice: error.message || 'Used offline teaching assistant database.'
    });
  }
});

// Prebuilt quiz bank for offline and fast responses
const DEFAULT_QUIZZES: Record<string, any[]> = {
  sindhi: [
    {
      id: 'q1',
      question: 'پوڙهن جسمن يا جاندارن جي گهرڙن (Cells) جي توانائي گهر (Powerhouse) ڪنهن کي چئبو آهي؟',
      options: ['مائيٽوڪانڊريا (Mitochondria)', 'نيوڪليئس (Nucleus)', 'رائيبوسوم (Ribosome)', 'سائيٽوپلازم (Cytoplasm)'],
      correctAnswer: 0,
      explanation: 'مائيٽوڪانڊريا گهرڙي ۾ توانائي (ATP) پيدا ڪري ٿو، تنهنڪري ان کي پاور هائوس چئبو آهي.',
      hint: 'هي سيل جي ساهه کڻڻ ۽ توانائي پيدا ڪرڻ جو مرڪز آهي.'
    },
    {
      id: 'q2',
      question: 'نيوٽن جي حرڪت جي پهرين قانون (First Law of Motion) جو ٻيو نالو ڇا آهي؟',
      options: ['جمود جو قانون (Law of Inertia)', 'عمل ۽ ردعمل جو قانون', 'جاذبيت جو قانون', 'توانائيءَ جي بقا جو قانون'],
      correctAnswer: 0,
      explanation: 'نيوٽن جي پهرين قانون مطابق ڪو به جسم پنهنجي حالت تڏهن ئي تبديل ڪندو جڏهن ڪو ٻاهرين طاقت لڳندي. هن خاصيت کي جمود (Inertia) چئبو آهي.',
      hint: 'هي مادي جي بيهڻ يا هلڻ واري حالت برقرار رکڻ سان لاڳاپيل آهي.'
    },
    {
      id: 'q3',
      question: 'هڪ رائٽ اينگل ٽڪنڊي (Right-Angled Triangle) ۾ پائٿاگورس ٿيورم جو صحيح فارمولو ڪهڙو آهي؟',
      options: ['c² = a² + b²', 'c = a + b', 'c² = a² - b²', 'a² = b² × c²'],
      correctAnswer: 0,
      explanation: 'پائٿاگورس ٿيورم مطابق ڪَرڻ (Hypotenuse) جو چورس باقي ٻن پاسن جي چورسن جي جوڙ جي برابر هوندو آهي: c² = a² + b².',
      hint: 'سڀ کان ڊگهي پاسي جو اسڪوائر ٻين ٻن پاسن جي اسڪوائرن جي جوڙ برابر آهي.'
    },
    {
      id: 'q4',
      question: 'ٻوٽا سج جي روشنيءَ ۾ پنهنجو کاڌو ڪهڙي عمل ذريعي تيار ڪندا آهن؟',
      options: ['ڦوٽوسنٿيسس (Photosynthesis)', 'سانگيڪاري (Respiration)', 'جذباتي عمل', 'بخارات (Evaporation)'],
      correctAnswer: 0,
      explanation: 'ڦوٽوسنٿيسس (ضيائي تاليف) ذريعي ٻوٽا پاڻي، ڪاربان ڊاءِ آڪسائيڊ ۽ سج جي روشنيءَ جي مدد سان گلوڪوز ۽ آڪسيجن ٺاهيندا آهن.',
      hint: 'ٻوٽن ۾ موجود ڪلوروفل (Chlorophyll) هن عمل ۾ اهم ڪردار ادا ڪري ٿو.'
    }
  ],
  urdu: [
    {
      id: 'q1',
      question: 'سیل (خلیہ) کا پاور ہاؤس کسے کہا جاتا ہے؟',
      options: ['مائیٹوکونڈریا (Mitochondria)', 'نیوکلیئس', 'رائیبوسوم', 'کلوروپلاسٹ'],
      correctAnswer: 0,
      explanation: 'مائیٹوکونڈریا خلیے میں توانائی تیار کرتا ہے اس لیے اسے پاور ہاؤس کہتے ہیں۔',
      hint: 'یہ توانائی کا بنیادی مرکز ہے۔'
    },
    {
      id: 'q2',
      question: 'نیوٹن کا پہلا قانون کس نام سے جانا جاتا ہے؟',
      options: ['قانون جمود (Inertia)', 'قانون عمل و ردعمل', 'قانون تجاذب', 'قانون تحفظ توانائی'],
      correctAnswer: 0,
      explanation: 'نیوٹن کے پہلے قانون کو قانون جمود بھی کہتے ہیں۔',
      hint: 'جسم کی حالت برقرار رکھنے کی صلاحیت۔'
    },
    {
      id: 'q3',
      question: 'فیثاغورث کا کلیہ کیا ہے؟',
      options: ['c² = a² + b²', 'c = a + b', 'c² = a² - b²', 'a = b × c'],
      correctAnswer: 0,
      explanation: 'قائمۃ الزاویہ مثلث میں وتر کا مربع باقی دو اضلاع کے مربعات کے مجموعے کے برابر ہوتا ہے۔',
      hint: 'c² مساوی ہے a² جمع b²'
    },
    {
      id: 'q4',
      question: 'پودے اپنی خوراک کس عمل سے تیار کرتے ہیں؟',
      options: ['فوٹوسنتھیسز (Photosynthesis)', 'تنفس', 'عمل تبخیر', 'پھیلاؤ'],
      correctAnswer: 0,
      explanation: 'پودے سورج کی روشنی اور کاربن ڈائی آکسائیڈ کی مدد سے فوٹوسنتھیسز کے ذریعے خوراک بناتے ہیں۔',
      hint: 'ضیاعی تالیف'
    }
  ],
  english: [
    {
      id: 'q1',
      question: 'Which organelle is known as the powerhouse of the cell?',
      options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Endoplasmic Reticulum'],
      correctAnswer: 0,
      explanation: 'Mitochondria generate most of the chemical energy needed to power the cell (ATP).',
      hint: 'It is responsible for cellular cellular respiration and energy.'
    },
    {
      id: 'q2',
      question: "What is Newton's First Law of Motion also known as?",
      options: ['Law of Inertia', 'Law of Acceleration', 'Law of Action & Reaction', 'Law of Gravitation'],
      correctAnswer: 0,
      explanation: 'Newton’s first law states an object remains at rest or in uniform motion unless acted upon by an external force, known as inertia.',
      hint: 'Resistance to changes in velocity.'
    },
    {
      id: 'q3',
      question: 'What is the Pythagorean theorem formula for a right triangle?',
      options: ['c² = a² + b²', 'c = a + b', 'c² = a² - b²', 'a² = b² + c²'],
      correctAnswer: 0,
      explanation: 'The hypotenuse squared is equal to the sum of the squares of the other two sides: c² = a² + b².',
      hint: 'Sum of squares of two legs.'
    },
    {
      id: 'q4',
      question: 'By which process do green plants produce their food using sunlight?',
      options: ['Photosynthesis', 'Respiration', 'Transpiration', 'Fermentation'],
      correctAnswer: 0,
      explanation: 'Photosynthesis uses sunlight, water, and carbon dioxide to create glucose and oxygen.',
      hint: 'Involves chlorophyll in green leaves.'
    }
  ]
};

// API: Generate Quizzes and Practice Tests
app.post('/api/generate-quiz', async (req: Request, res: Response) => {
  try {
    const {
      subject = 'mathematics',
      topic = 'general',
      language = 'sindhi',
      grade = 'matric',
      count = 4,
    } = req.body;

    const langName =
      language === 'sindhi' ? 'Sindhi (سنڌي سولي زبان)' :
      language === 'urdu' ? 'Urdu (سادہ اردو)' : 'English';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      const selectedList = DEFAULT_QUIZZES[language] || DEFAULT_QUIZZES.sindhi;
      return res.json({ questions: selectedList });
    }

    const prompt = `Generate ${count} engaging multiple-choice practice quiz questions for students.
Subject: ${subject}
Topic: ${topic}
Grade Level: ${grade}
Language: ${langName}

Ensure questions test key concepts, formulas, or scientific principles with clear educational value.
In Sindhi, write pure, correct Sindhi with proper grammar and Sindhi terms (like حساب، ضرب، ڪٽ، گهرڙو، حرڪت، قوت).
In Urdu, write clear Urdu.
In English, write student-friendly English.

Output JSON only in this structure:
{
  "questions": [
    {
      "id": "q1",
      "question": "string",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Detailed step-by-step reason why this is correct",
      "hint": "Short helpful hint"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const parsed = JSON.parse(response.text || '{"questions":[]}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Quiz generation error, serving default quiz:', err.message);
    const lang = req.body.language || 'sindhi';
    const fallbackList = DEFAULT_QUIZZES[lang] || DEFAULT_QUIZZES.sindhi;
    return res.json({ questions: fallbackList });
  }
});

// API: Check Voice Cloning Service status
app.get('/api/voice-cloning-status', (req: Request, res: Response) => {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const isConfigured = Boolean(apiKey && apiKey !== 'your_elevenlabs_api_key_here');

  return res.json({
    isConfigured,
    service: 'ElevenLabs Voice Cloning API',
    voiceId: voiceId ? `${voiceId.slice(0, 4)}...${voiceId.slice(-3)}` : undefined,
    details: isConfigured
      ? 'Voice cloning service is configured! AI Teacher can synthesize lessons in Akbar Sargani’s custom voice.'
      : 'Voice cloning service requires setup. Add ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID to enable speaking in Akbar Sargani’s custom voice.',
  });
});

// API: Server-side TTS with custom voice clone & gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text = '', language = 'sindhi', useCustomVoice = false } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // 1. If Custom Voice is requested and ElevenLabs Voice Cloning is configured:
    const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
    const elevenLabsVoiceId = process.env.ELEVENLABS_VOICE_ID;
    if (useCustomVoice && elevenLabsKey && elevenLabsKey !== 'your_elevenlabs_api_key_here') {
      const voiceId = elevenLabsVoiceId || '21m00Tcm4TlvDq8ikWAM';
      try {
        const elevenRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsKey,
          },
          body: JSON.stringify({
            text: text.slice(0, 600),
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.85,
            },
          }),
        });

        if (elevenRes.ok) {
          const arrayBuffer = await elevenRes.arrayBuffer();
          const base64Audio = Buffer.from(arrayBuffer).toString('base64');
          return res.json({
            audioBase64: base64Audio,
            mimeType: 'audio/mpeg',
            isCustomClonedVoice: true,
          });
        } else {
          const errBody = await elevenRes.text();
          console.warn('ElevenLabs API returned error:', errBody);
        }
      } catch (voiceErr: any) {
        console.warn('Voice cloning service fetch error:', voiceErr.message);
      }
    }

    // 2. Default Gemini 3.8 Flash Lite TTS
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && geminiKey !== 'MY_GEMINI_API_KEY') {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Read this educational lesson clearly, warmly, and distinctly at moderate teaching pace in ${language}: ${text}`,
                speechMetadata: {
                  style: 'Gentle, encouraging, articulate educational tutor',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return res.json({ audioBase64: base64Audio, mimeType: 'audio/wav', isCustomClonedVoice: false });
      }
    }

    return res.json({ fallbackWebSpeech: true, isCustomClonedVoice: false });
  } catch (err: any) {
    console.warn('TTS server fallback:', err.message);
    return res.json({ fallbackWebSpeech: true, isCustomClonedVoice: false });
  }
});

// Mount Vite or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Asaan Taleem AI server running at http://0.0.0.0:${port}`);
  });
}

startServer();
