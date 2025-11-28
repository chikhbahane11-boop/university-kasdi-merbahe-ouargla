
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Briefcase, Building, Info, MousePointerClick, X } from 'lucide-react';

const StageConcepts: React.FC = () => {
  // Contributions State
  const [activeContribution, setActiveContribution] = useState<string | null>(null);

  const contributions = [
    {
      id: 'cash',
      icon: Coins,
      title: 'حصص نقدية',
      desc: 'مبالغ مالية يدفعها الشريك. يجب دفع خُمس (1/5) المبلغ على الأقل عند التأسيس في شركات المساهمة.',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 'kind',
      icon: Building,
      title: 'حصص عينية',
      desc: 'عقارات، منقولات، معدات، أو براءات اختراع. يجب تقييمها من طرف خبير (محافظ الحصص) لضمان نزاهة رأس المال.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'industry',
      icon: Briefcase,
      title: 'حصص صناعية (عمل)',
      desc: 'تقديم الشريك لعمله أو خبرته الفنية. لا تدخل في تكوين رأس المال (لأنه ضمان للدائنين) ولكن تخول الحق في األرباح.',
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  return (
    <div className="space-y-16 py-4">
      
      {/* 1. Interactive Article 544 Viewer */}
      <section className="relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">تعريف الشركة التجارية</h2>
          <p className="text-slate-500">حلل النص القانوني التالي (المادة 544) بالنقر على الكلمات الملونة</p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-center group">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-slate-800 rounded-full opacity-50 blur-3xl"></div>
          
          <div className="relative z-10">
            <span className="inline-block bg-slate-800 text-amber-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-slate-700">
              المادة 544 من القانون التجاري الجزائري
            </span>
            
            <h3 className="text-2xl md:text-4xl leading-loose font-serif text-white font-medium">
              "تعد 
              <Tooltip word="شركات تجارية" content="سواء كان غرضها تجارياً أو مدنياً، الشكل هو المعيار الحاسم في القانون الجزائري." /> 
              كل شركة تتخذ شكل 
              <Tooltip word="شركة التضامن" content="النموذج الأمثل لشركات الأشخاص. الشركاء تجار ومسؤولون بصفة مطلقة." />
              ، أو شركات التوصية، أو 
              <Tooltip word="الشركات ذات المسؤولية المحدودة" content="(SARL) الشركة الأكثر شيوعاً. تجمع بين الطابع الشخصي والمالي." />
              ، أو 
              <Tooltip word="شركات المساهمة" content="(SPA) النموذج الأمثل لشركات الأموال. تقوم على جمع رؤوس الأموال الضخمة." />
              ، تجارية بحكم 
              <Tooltip word="شكلها" content="المعيار الشكلي هو الأقوى. بمجرد اتخاذ أحد هذه القوالب، تصبح الشركة تجارية وتخضع لقانون التجارة والإفلاس." />
              ومهما يكن 
              <Tooltip word="موضوعها" content="حتى لو كان نشاطها مدنياً (مثل الفلاحة)، فإن الشكل التجاري يصبغها بالصفة التجارية." />
              ."
            </h3>
          </div>
          
          <div className="mt-8 flex justify-center text-slate-400 text-sm gap-2 animate-pulse">
            <MousePointerClick className="w-4 h-4" />
            <span>اضغط على الكلمات الملونة بالذهبي للشرح</span>
          </div>
        </div>
      </section>

      {/* 2. Contributions Visualizer (Arkan) */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-10 w-2 bg-amber-500 rounded-full"></div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">أركان الشركة: الحصص</h2>
            <p className="text-slate-500">لا شركة بدون تقديم حصة (نقدية، عينية، أو عمل)</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {contributions.map((item) => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              onClick={() => setActiveContribution(item.id)}
              className={`group cursor-pointer relative overflow-hidden rounded-2xl p-6 border-2 transition-all duration-300 ${
                activeContribution === item.id 
                  ? 'bg-white border-amber-500 shadow-xl scale-105 z-10' 
                  : 'bg-white border-slate-100 hover:border-amber-200 hover:shadow-lg'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${item.color} group-hover:bg-slate-900 group-hover:text-amber-400`}>
                <item.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{item.title}</h3>
              <p className="text-slate-500 text-sm">انقر للتفاصيل القانونية</p>

              {/* Expandable Content */}
              <AnimatePresence>
                {activeContribution === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4"
                  >
                    {item.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. General Pillars (Quick View) */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">الأركان الموضوعية العامة (م 416 مدني)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['الرضـا', 'الأهليـة', 'المحــل', 'السبــب'].map((pillar, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl text-center shadow-sm border border-slate-100 hover:border-amber-400 transition-colors">
              <span className="font-bold text-slate-700">{pillar}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

// Internal Tooltip Component
const Tooltip = ({ word, content }: { word: string, content: string }) => {
  const [show, setShow] = useState(false);
  
  return (
    <span className="relative inline-block mx-1">
      <span 
        className="text-amber-400 font-bold cursor-pointer border-b-2 border-amber-400/30 hover:bg-amber-400/10 hover:border-amber-400 transition-colors px-1 rounded"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
      >
        {word}
      </span>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-white text-slate-800 text-sm p-4 rounded-xl shadow-xl border border-slate-200 z-50 text-right leading-relaxed font-sans"
          >
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-200 transform rotate-45"></div>
            <div className="relative z-10 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default StageConcepts;
