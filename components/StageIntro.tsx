
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, AlertTriangle, Send, Cloud, Coffee, School, FileDown } from 'lucide-react';
import SourceReader from './SourceReader';
import GlossaryTerm from './GlossaryTerm';

const MotionDiv = motion.div as any;

const StageIntro: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const [studentWord, setStudentWord] = useState('');
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentWord.trim()) {
      setSubmittedWords([...submittedWords, studentWord.trim()]);
      setStudentWord('');
    }
  };

  return (
    <div className="space-y-10">
      
      {/* 0. Official Header (Cover Page) */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-indigo-900 text-center relative overflow-hidden mb-10">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 space-y-6">
          {/* Ministry & University Info */}
          <div className="space-y-2 border-b border-slate-100 pb-6">
            <h5 className="text-sm font-bold text-slate-600 font-serif">الجمهورية الجزائرية الديمقراطية الشعبية</h5>
            <h5 className="text-sm font-bold text-slate-600 font-serif">وزارة التعليم العالي والبحث العلمي</h5>
            
            <div className="flex flex-col items-center justify-center gap-2 mt-4 text-indigo-900">
              <div className="flex items-center gap-2">
                <School className="w-6 h-6" />
                <h2 className="text-lg font-extrabold">جامعة التكوين المتواصل - ديدوش مراد</h2>
              </div>
              <h3 className="text-md font-bold text-indigo-700">مركز تمنراست - ملحقة عين صالح</h3>
            </div>
          </div>

          {/* Module & Professor Info */}
          <div className="py-4 space-y-4">
            <div>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">سنة أولى - قانون أعمال</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                مقياس: الشركات التجارية
                <span className="block text-xl text-slate-500 font-medium mt-2">(مدخل قانوني وتطبيقي)</span>
              </h1>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
              <div className="bg-slate-50 px-6 py-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-xs block mb-1">إعداد الأستاذ</span>
                <span className="text-slate-900 font-bold text-lg">الشيخ بن بحان</span>
              </div>
              <div className="bg-slate-50 px-6 py-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-xs block mb-1">الموسم الدراسي</span>
                <span className="text-slate-900 font-bold text-lg">2025 / 2026</span>
              </div>
            </div>
          </div>

          {/* PDF Download Button */}
          <div className="pt-4 border-t border-slate-100">
            <a 
              href="http://dspace.univ-djelfa.dz:8080/xmlui/bitstream/handle/112/6946/%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A7%D8%AA%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
            >
              <FileDown className="w-5 h-5 group-hover:animate-bounce" />
              <div className="text-right">
                <span className="block text-xs text-slate-300 font-normal">المطبوعة المرجعية الرسمية</span>
                <span className="block font-bold text-sm">تحميل مطبوعة د. ضيف شعيب (PDF)</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* 1. Warm-up: Word Cloud Simulation */}
      <div className="text-center space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Cloud className="w-10 h-10 text-sky-500" />
          <h2 className="text-3xl font-bold text-slate-900">التهيئة الذهنية</h2>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          صباح الخير! لنبدأ بهذا السؤال السريع..
          <br/>
          عندما تسمع كلمة "<GlossaryTerm termKey="commercial_company">شركة تجارية</GlossaryTerm>"، ما هي أول كلمة تخطر ببالك؟
        </p>

        <form onSubmit={handleAddWord} className="flex gap-3 max-w-md mx-auto">
          <input 
            type="text" 
            value={studentWord}
            onChange={(e) => setStudentWord(e.target.value)}
            placeholder="اكتب كلمتك هنا (مثلاً: ربح، مال، مدير، مخاطرة...)"
            className="flex-1 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none text-right"
          />
          <button type="submit" className="bg-sky-600 text-white p-3 rounded-xl hover:bg-sky-700 transition">
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* Word Cloud Display */}
        {submittedWords.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {submittedWords.map((word, idx) => (
              <motion.span 
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                  idx % 3 === 0 ? 'bg-indigo-100 text-indigo-700' : 
                  idx % 3 === 1 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* 2. Narrative: The Cafe Scenario (Hook) */}
      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-amber-100 rounded-br-full opacity-50"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Coffee className="w-6 h-6" />
            سيناريو الانطلاق: مشروع عين صالح
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed">
            تخيل أن ثلاثة طلاب أصدقاء قرروا بعد التخرج فتح <strong>مقهى عصري</strong> في وسط مدينة عين صالح. 
            اتفقوا على جمع مدخراتهم (رأس المال)، واستئجار محل، وتقسيم الأرباح بينهم.
            <br/><br/>
            السؤال الجوهري هنا: <strong>هل هؤلاء الأصدقاء بصدد تكوين شركة؟ وهل هي شركة مدنية أم تجارية؟</strong>
            <br/>
            إجابتك على هذا السؤال ستحدد القانون الذي سيطبق عليهم، الضرائب التي سيدفعونها، وحتى مصيرهم إذا فشل المشروع!
          </p>
        </div>
      </div>

      {/* 3. The Hook: "What If" Scenario */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <MotionDiv 
          className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-8 shadow-lg cursor-pointer hover:bg-rose-100 transition-colors group"
          onClick={() => setRevealed(true)}
        >
          {!revealed ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <AlertTriangle className="w-16 h-16 text-rose-500 animate-bounce" />
              <h3 className="text-2xl font-bold text-rose-900 group-hover:scale-105 transition-transform">تحدي الفهم</h3>
              <p className="text-rose-800 font-medium">انقر لتكتشف: ماذا لو أخطأوا في اختيار نوع الشركة؟</p>
            </div>
          ) : (
            <MotionDiv 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 text-right h-64 overflow-y-auto custom-scrollbar"
            >
              <h3 className="text-xl font-bold text-rose-900 border-b border-rose-200 pb-2 mb-2">مخاطر الاختيار الخاطئ:</h3>
              <ul className="space-y-3 text-rose-800 list-disc list-inside text-sm font-medium">
                <li><strong>المسؤولية المطلقة:</strong> في بعض الشركات، قد يخسرون منازلهم وسياراتهم لسداد ديون المقهى!</li>
                <li><strong>الإفلاس:</strong> إذا اعتبرت تجارية، قد يتعرضون لعقوبات الإفلاس القاسية.</li>
                <li><strong>الضرائب:</strong> التصنيف الخاطئ قد يعرضهم لغرامات جبائية ثقيلة.</li>
              </ul>
              <p className="mt-4 text-sm text-rose-900 font-bold text-center">
                الخلاصة: اختيار القالب القانوني ليس شكليات، بل حماية!
              </p>
            </MotionDiv>
          )}
        </MotionDiv>

        {/* Objectives */}
        <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 h-full flex flex-col justify-center">
          <h3 className="text-xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            أهداف المحاضرة (90 دقيقة)
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">1</span>
              <span className="text-slate-700">التمييز الدقيق بين الشركة المدنية والتجارية (حسب القانون الجزائري).</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">2</span>
              <span className="text-slate-700">استيعاب أنواع الشركات (تضامن، مساهمة، محدودة) والفرق بينها.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">3</span>
              <span className="text-slate-700">تطبيق المعرفة على حالات واقعية محلية.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Contextual Source Reader */}
      <SourceReader sectionKey="intro" />
    </div>
  );
};

export default StageIntro;
