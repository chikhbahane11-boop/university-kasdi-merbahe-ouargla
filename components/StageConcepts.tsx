import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSignature, Building, Handshake, Scale, HelpCircle, ArrowDown, Gavel, Book, Briefcase } from 'lucide-react';
import SourceReader from './SourceReader';
import GlossaryTerm from './GlossaryTerm';

const MotionDiv = motion.div as any;

const StageConcepts: React.FC = () => {
  // Think Pair Share State
  const [showThinkShareAnswer, setShowThinkShareAnswer] = useState(false);

  return (
    <div className="space-y-12">
      
      {/* Part 1: The Definition & Distinction */}
      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">1. المفهوم والطبيعة القانونية</h2>
          <p className="text-slate-500">بين <GlossaryTerm termKey="contract_theory">العقد</GlossaryTerm> و<GlossaryTerm termKey="institution_theory">النظام</GlossaryTerm>، وبين المدني والتجاري.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contract Theory */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-indigo-500 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-100 rounded-br-full opacity-50"></div>
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="bg-indigo-100 p-4 rounded-full">
                <Handshake className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">الشركة = عقد</h3>
              <p className="text-slate-600 leading-relaxed">
                حسب المادة 416 مدني: "الشركة عقد...". الأساس هو <strong>إرادة الأطراف</strong> (شريعة المتعاقدين). يغلب هذا المفهوم في شركات الأشخاص (مثل التضامن).
              </p>
            </div>
          </motion.div>

          {/* Institution Theory */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-sky-500 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-20 h-20 bg-sky-100 rounded-br-full opacity-50"></div>
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="bg-sky-100 p-4 rounded-full">
                <Building className="w-12 h-12 text-sky-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">الشركة = نظام</h3>
              <p className="text-slate-600 leading-relaxed">
                القانون يفرض شروطاً صارمة (رأس المال، الإدارة، الرقابة) لا يمكن للشركاء مخالفتها. الشركاء ينضمون لـ "مؤسسة" قائمة. يغلب في شركات الأموال.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Part 2: Pillars of Commerciality */}
      <section className="space-y-6">
         <h3 className="text-2xl font-bold text-slate-900 border-r-4 border-amber-500 pr-3">2. متى تكون الشركة تجارية؟</h3>
         <p className="text-slate-600 mb-4">حسب القانون الجزائري (المادة 544 تجاري)، هناك معياران:</p>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
               <div className="flex items-center gap-3 mb-3">
                 <FileSignature className="w-8 h-8 text-emerald-500" />
                 <h4 className="font-bold text-lg text-slate-800">1. المعيار الشكلي (الأقوى)</h4>
               </div>
               <p className="text-sm text-slate-600 leading-relaxed">
                 تكون الشركة تجارية <strong>بحكم شكلها</strong> مهما كان نشاطها، إذا اتخذت أحد الأشكال التالية:
                 <br/>- شركة التضامن (SNC)
                 <br/>- شركة التوصية (SCS)
                 <br/>- ذات المسؤولية المحدودة (SARL)
                 <br/>- المساهمة (SPA)
               </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
               <div className="flex items-center gap-3 mb-3">
                 <Briefcase className="w-8 h-8 text-blue-500" />
                 <h4 className="font-bold text-lg text-slate-800">2. المعيار الموضوعي</h4>
               </div>
               <p className="text-sm text-slate-600 leading-relaxed">
                 إذا لم تتخذ أحد الأشكال المذكورة، ننظر إلى <strong>موضوع نشاطها</strong>.
                 <br/>- إذا مارست أعمالاً تجارية (شراء لبيع، صناعة، نقل..) فهي تجارية (شركة واقع).
                 <br/>- إذا مارست أعمالاً مدنية (فلاحة، تعليم، طب) فهي <GlossaryTerm termKey="civil_company">شركة مدنية</GlossaryTerm>.
               </p>
            </div>
         </div>
      </section>

      {/* Part 3: Interactive Activity (Think-Pair-Share) */}
      <section className="bg-amber-50 p-8 rounded-3xl border-2 border-amber-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-100 rounded-full text-amber-600">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-900 mb-2">نشاط تفاعلي: فكر - زاوج - شارك</h3>
            <p className="text-amber-800 mb-6 font-medium">
              في ضوء ما سبق، حدد الطبيعة القانونية (مدنية أم تجارية) للحالات التالية، مع التعليل:
            </p>
            
            <div className="grid gap-4 mb-6">
              <div className="bg-white/60 p-3 rounded-lg border border-amber-200">
                <span className="font-bold ml-2">الحالة 1:</span> طبيبة وصديقتها المحامية أسسوا شركة لتسيير عيادة ومكتب في مبنى واحد.
              </div>
              <div className="bg-white/60 p-3 rounded-lg border border-amber-200">
                <span className="font-bold ml-2">الحالة 2:</span> أربعة أشخاص اشتروا قطعة أرض في "حي الوئام" لتقسيمها وبيعها بربح.
              </div>
              <div className="bg-white/60 p-3 rounded-lg border border-amber-200">
                <span className="font-bold ml-2">الحالة 3:</span> جمعية ثقافية في عين صالح فتحت متجراً صغيراً لبيع الحرف اليدوية لتمويل نشاطاتها.
              </div>
            </div>

            <button 
              onClick={() => setShowThinkShareAnswer(!showThinkShareAnswer)}
              className="flex items-center gap-2 text-sm bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg transition"
            >
              {showThinkShareAnswer ? 'إخفاء الحل والتعليل' : 'إظهار الحل والتعليل'}
              <ArrowDown className={`w-4 h-4 transition-transform ${showThinkShareAnswer ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showThinkShareAnswer && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-amber-200 grid gap-4 md:grid-cols-3">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <h4 className="font-bold text-slate-800 mb-1">🩺 الحالة 1: مدنية</h4>
                      <p className="text-sm text-slate-600">لأن موضوع النشاط (طب/محاماة) هو مهن حرة ذات طابع مدني، ما لم يتخذوا شكل شركة تجارية (مثل SARL).</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <h4 className="font-bold text-slate-800 mb-1">💰 الحالة 2: تجارية</h4>
                      <p className="text-sm text-slate-600">لأن الشراء بقصد البيع وتحقيق الربح هو عمل تجاري بحسب الموضوع (المادة 2 تجاري).</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <h4 className="font-bold text-slate-800 mb-1">🤝 الحالة 3: ليست شركة</h4>
                      <p className="text-sm text-slate-600">الجمعيات لا تهدف لتقسيم الأرباح (ركن جوهري في الشركة)، لذا هي تخضع لقانون الجمعيات وليس الشركات.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <SourceReader sectionKey="concepts" />
    </div>
  );
};

export default StageConcepts;