import { SavedLesson } from '../types';

export function downloadLessonAsPrintable(lesson: SavedLesson): void {
  const isRtl = lesson.language === 'sindhi' || lesson.language === 'urdu';
  const langName =
    lesson.language === 'sindhi' ? 'سنڌي (Sindhi)' :
    lesson.language === 'urdu' ? 'اردو (Urdu)' : 'English';

  const stepsHtml = lesson.data.stepByStep
    .map(
      (s) => `
    <div style="margin-bottom: 16px; padding: 14px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
      <div style="font-weight: bold; color: #0f766e; font-size: 16px; margin-bottom: 6px;">
        #${s.stepNumber} - ${s.title}
      </div>
      <div style="font-size: 15px; line-height: 1.6; color: #334155; margin-bottom: 8px;">
        ${s.explanation}
      </div>
      ${
        s.formulaOrKeyFact
          ? `<div style="background: #e0f2fe; padding: 8px 12px; border-radius: 6px; font-weight: 600; color: #0369a1; font-size: 14px; margin-bottom: 6px;">
              📐 ${s.formulaOrKeyFact}
            </div>`
          : ''
      }
      ${
        s.tipInSindhi
          ? `<div style="color: #b45309; font-size: 13px; font-style: italic;">
              💡 ${s.tipInSindhi}
            </div>`
          : ''
      }
    </div>
  `
    )
    .join('');

  const printableHtml = `
    <!DOCTYPE html>
    <html lang="${lesson.language === 'sindhi' ? 'sd' : lesson.language === 'urdu' ? 'ur' : 'en'}" dir="${isRtl ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="utf-8">
      <title>${lesson.title} - Asaan Taleem AI</title>
      <style>
        body {
          font-family: 'Noto Sans Arabic', 'Lateef', sans-serif, system-ui;
          max-width: 800px;
          margin: 30px auto;
          padding: 20px;
          color: #1e293b;
        }
        .header {
          border-bottom: 2px solid #0f766e;
          padding-bottom: 15px;
          margin-bottom: 25px;
        }
        .badge {
          display: inline-block;
          background: #0f766e;
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        .meta {
          color: #64748b;
          font-size: 13px;
          margin-top: 6px;
        }
        .direct-answer {
          background: #f0fdf4;
          border-left: 4px solid #16a34a;
          padding: 14px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          color: #14532d;
          margin-bottom: 20px;
        }
        @media print {
          body { margin: 10px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <span class="badge">Asaan Taleem AI • آسان تعليم</span>
        <h1 style="margin: 10px 0 5px 0; color: #0f766e;">${lesson.title}</h1>
        <div class="meta">
          مضمون: ${lesson.subject.toUpperCase()} | ٻولي: ${langName} | تاريخ: ${new Date(lesson.date).toLocaleDateString()}
        </div>
      </div>

      <div class="no-print" style="margin-bottom: 20px; text-align: ${isRtl ? 'left' : 'right'};">
        <button onclick="window.print()" style="background: #0f766e; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">
          🖨️ پرنٽ ڪريو / Save as PDF
        </button>
      </div>

      <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #475569;">
        اصل سوال (Original Question):
      </div>
      <div style="font-size: 15px; margin-bottom: 20px; color: #1e293b; background: #fff; padding: 10px; border: 1px dashed #cbd5e1; border-radius: 6px;">
        ${lesson.originalQuestion}
      </div>

      <div class="direct-answer">
        <strong>خلاصو ۽ مکيه جواب:</strong><br/>
        ${lesson.data.directAnswer}
      </div>

      <h3 style="color: #0f766e; margin-top: 25px; margin-bottom: 12px;">قدم به قدم حل (Step-by-Step Breakdown):</h3>
      ${stepsHtml}

      ${
        lesson.data.practiceProblem
          ? `
        <div style="margin-top: 30px; padding: 16px; background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px;">
          <h4 style="margin: 0 0 10px 0; color: #b45309;">مشق جو سوال (Practice Problem):</h4>
          <p style="font-size: 15px; font-weight: bold;">${lesson.data.practiceProblem.question}</p>
          <ul style="list-style-type: none; padding: 0;">
            ${lesson.data.practiceProblem.options.map((opt, i) => `<li style="margin-bottom: 6px; padding: 6px; background: white; border-radius: 4px; border: 1px solid #fde68a;">${i + 1}. ${opt}</li>`).join('')}
          </ul>
          <p style="font-size: 13px; color: #475569; margin-top: 10px;"><strong>وضاحت:</strong> ${lesson.data.practiceProblem.explanation}</p>
        </div>
      `
          : ''
      }

      <div style="margin-top: 40px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 12px; color: #94a3b8;">
        توهان جو ذاتي تعليمي رفيق: آسان تعليم AI • بغير نيٽ جي رويزن لاء هي شيٽ محفوظ رکو
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([printableHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    // If popups blocked, create direct download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `Asaan-Taleem-Lesson-${Date.now()}.html`;
    a.click();
  }
}
