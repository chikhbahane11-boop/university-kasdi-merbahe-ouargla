import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPARISON_DATA, CLASSIFICATION_ITEMS } from '../constants';
import EvolutionChart from './EvolutionChart';
import GlossaryTerm from './GlossaryTerm';
import SourceReader from './SourceReader';
import { MessageCircle, ChevronDown, ChevronUp, Check, Building2, Briefcase, User, Scale } from 'lucide-react';

const MotionDiv = motion.div as any;

const StageApplication: React.FC = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Classification Game State
  const [completed, setCompleted] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  const handleClassify = (item: typeof CLASSIFICATION_ITEMS[0], targetType: string) => {
    if (item.type === targetType) {
      setFeedback({ ...feedback, [item.id]: item.correctText });
      setCompleted([...completed, item.id]);
    } else {
      setFeedback({ ...feedback, [item.id]: 'حاول مرة أخرى! انتبه لطبيعة النشاط أو الشكل القانوني.' });
      setTimeout(() => {
        const newFeedback = { ...feedback };
        delete newFeedback[item.id];
        setFeedback(newFeedback);
      }, 2000);
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">تطبيق ومقارنة</h2>
        <p className="text-slate-500">لعبة التصنيف والمقارنة بين أنواع الشركات</p>
      </div>

      {/* 1. Classification Game */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">1. لعبة التصنيف: مدنية أم تجارية؟</h3>
          <p className="text-slate-400">قم بتصنيف الحالات التالية إلى "شركة تجارية" أو "شركة مدنية".</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
            <Building2 className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <h4 className="font-bold">شركة تجارية</h4>
            <p className="text-xs text-slate-400 mt-1">بحكم الشكل أو الموضوع</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
            <Briefcase className="w-8 h-8 text-sky-400 mx-auto mb-2" />
            <h4 className="font-bold">شركة مدنية</h4>
            <p className="text-xs text-slate-400 mt-1">نشاط مدني (مهن حرة، فلاحة)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLASSIFICATION_ITEMS.map((item) => {
             if (completed.includes(item.id)) return null; 

             return (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white text-slate-900 p-4 rounded-xl shadow-lg"
              >
                <h4 className="font-bold text-lg mb-3 text-center">{item.name}</h4>
                
                {feedback[item.id] ? (
                   <div className={`text-xs p-2 rounded text-center font-bold ${feedback[item.id].includes('صحيح') || feedback[item.id].includes('أحسنت') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                     {feedback[item.id]}
                   </div>
                ) : (
                  <div className="flex justify-between gap-2">
                    <button onClick={() => handleClassify(item, 'commercial')} className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-xs py-2 rounded transition">تجارية</button>
                    <button onClick={() => handleClassify(item, 'civil')} className="flex-1 bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs py-2 rounded transition">مدنية</button>
                  </div>
                )}
              </motion.div>
             );
          })}
          
          {completed.length === CLASSIFICATION_ITEMS.length && (
            <div className="col-span-full text-center py-8 animate-in zoom-in">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">أحسنت! لقد صنفت جميع الحالات بنجاح.</h3>
            </div>
          )}
        </div>
      </section>

      {/* 2. Comparison Table (Persons vs Capital) */}
      <section>
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">2. مقارنة جوهرية: شركات الأشخاص vs الأموال</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {COMPARISON_DATA.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4 mx-auto">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-800 mb-4">{item.concept}</h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">شركات الأشخاص (SNC)</span>
                  <p className="text-sm text-slate-600 mt-1">{item.ancient}</p>
                </div>
                <div className="h-px bg-slate-100 w-full"></div>
                <div className="text-center">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">شركات الأموال (SPA)</span>
                  <p className="text-sm text-slate-800 font-medium mt-1">{item.modern}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Visual Chart (Risk vs Capital) */}
      <EvolutionChart />

      {/* 4. Challenges in In Salah */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl overflow-hidden relative mt-8">
        <div className="relative z-10 text-center">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <MessageCircle className="w-6 h-6 text-indigo-400" />
              تحدي الواقع في عين صالح
            </h3>
            <p className="text-lg opacity-90 mb-6">
              "برأيك، ما هو التحدي الأكبر الذي يواجه تأسيس شركة تجارية في منطقة مثل عين صالح؟ هل هو رأس المال، أم البيروقراطية، أم الثقافة القانونية؟"
            </p>
            
            <button 
              onClick={() => setShowAnswer(!showAnswer)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-full text-sm font-bold transition shadow-lg"
            >
              {showAnswer ? "إخفاء التحليل" : "عرض نقاط للنقاش"}
              {showAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {showAnswer && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="text-right bg-slate-800/50 rounded-xl border border-slate-700 p-6 max-w-3xl mx-auto"
                >
                  <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
                    <li>
                      <span className="text-slate-200">المسافة والإدارة:</span> بعد الإدارات المركزية قد يعقد إجراءات التأسيس (السجل التجاري، الضرائب).
                    </li>
                    <li>
                      <span className="text-slate-200">طبيعة النشاط:</span> المنطقة تحتاج لأنشطة خدماتية وفلاحية، مما يطرح إشكال التكييف (مدني أم تجاري).
                    </li>
                    <li>
                      <span className="text-slate-200">ثقافة "العقد الشفهي":</span> التحدي هو الانتقال من التجارة التقليدية (بالكلمة) إلى تأسيس شركات بعقود موثقة.
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-slate-900 to-slate-900"></div>
      </div>
    </div>
  );
};

export default StageApplication;