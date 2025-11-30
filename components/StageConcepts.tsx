import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Briefcase, Building, Info, MousePointerClick, Scale, BookOpen, Lightbulb, Users, HeartHandshake } from 'lucide-react';
import { THINKING_QUESTIONS } from '../constants';

const StageConcepts: React.FC = () => {
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

      {/* 2. Conceptual Distinction: Civil vs Commercial */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white flex items-center gap-3">
          <Scale className="w-8 h-8" />
          <h2 className="text-2xl font-bold">التمييز: الشركة المدنية vs التجارية</h2>
        </div>
        
        <div className="p-8 grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2 border-slate-200">الشركة المدنية</h3>
            <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
              <li className="flex gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span>تخضع للقانون المدني (المواد 416-449).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span><strong>المعيار الموضوعي:</strong> تمارس نشاطاً مدنياً (فلاحة، مهن حرة، تعليم، عقار).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span>لا يكتسب الشركاء صفة التاجر.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span>لا تخضع لنظام الإفلاس التجاري بل لنظام الإعسار المدني.</span>
              </li>
            </ul>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-4 border-b pb-2 border-indigo-200">الشركة التجارية</h3>
            <ul className="space-y-3 text-indigo-800 text-sm leading-relaxed">
              <li className="flex gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>تخضع للقانون التجاري (المواد 544 وما يليها).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>المعيار الشكلي (م 544):</strong> تعتبر تجارية بمجرد اتخاذ الشكل (SNC, SPA, SARL) مهما كان نشاطها.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>تكتسب الشخصية المعنوية بالقيد في السجل التجاري.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Critical Thinking 1 */}
        <div className="bg-yellow-50 border-t border-yellow-100 p-6 flex gap-4 items-start">
          <div className="bg-yellow-200 p-2 rounded-lg text-yellow-700">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-yellow-900 text-sm mb-1">سؤال للتفكير النقدي:</h4>
            <p className="text-yellow-800 text-sm leading-relaxed">
              {THINKING_QUESTIONS.definition.question}
            </p>
            <p className="text-xs text-yellow-600 mt-2 italic">تلميح: {THINKING_QUESTIONS.definition.hint}</p>
          </div>
        </div>
      </section>

      {/* 3. Legal Nature: Contract vs Institution */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8" />
          <h2 className="text-2xl font-bold">الطبيعة القانونية: عقد أم نظام؟</h2>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
             <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">1</span>
                  النظرية العقدية
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-2">
                  تعتبر الشركة "عقداً" يستند إلى سلطان الإرادة (المادة 416 مدني). 
                </p>
                <div className="bg-slate-50 p-3 rounded text-xs italic text-slate-500 border-r-2 border-blue-300">
                  "العقد شريعة المتعاقدين..." (المادة 54 ق.م)
                </div>
                <p className="text-xs text-slate-400 mt-2">تظهر بوضوح في شركات الأشخاص (التضامن).</p>
             </div>
             <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">2</span>
                  النظرية النظامية (المؤسسة)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-2">
                  تعتبر الشركة "نظاماً" (Institution) يخضع لقواعد قانونية آمرة تضعها الدولة. إرادة الشركاء تقتصر على الانضمام، لكن التسيير يخضع للقانون (حماية للغير).
                </p>
                <p className="text-xs text-slate-400">تظهر بوضوح في شركات الأموال (المساهمة).</p>
             </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border-r-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-1">موقف المشرع الجزائري:</h4>
            <p className="text-slate-600 text-sm">
              أخذ بموقف <strong>مختلط</strong>. فالشركة تبدأ كـ "عقد" (يتطلب الرضا والأهلية في التأسيس)، ثم تتحول إلى "نظام" (شخص معنوي) بمجرد القيد في السجل التجاري، حيث تخضع لقواعد آمرة لا يملك الشركاء تغييرها.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Pillars of the Company Contract */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-10 w-2 bg-amber-500 rounded-full"></div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">أركان عقد الشركة</h2>
            <p className="text-slate-500">لا تقوم الشركة إلا بتوافر أركان موضوعية (عامة وخاصة) وشكلية</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* General Pillars */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center border-b border-slate-200 pb-3">1. الأركان الموضوعية العامة (م 416 مدني)</h3>
            <div className="grid grid-cols-2 gap-4">
              <Tooltip word="الرضـا" content="يجب أن يكون الرضا موجوداً وصحيحاً (خالياً من عيوب الإرادة كالغلط والتدليس) ومنصباً على بنود العقد." />
              <Tooltip word="الأهليـة" content="يجب أن يكون الشريك أهلاً للتعاقد (19 سنة). في شركات التضامن يشترط الأهلية التجارية." />
              <Tooltip word="المحــل" content="هو النشاط الذي تمارسه الشركة. يجب أن يكون مشروعاً وممكناً وغير مخالف للنظام العام." />
              <Tooltip word="السبــب" content="هو الباعث الدافع للتعاقد، وهو تحقيق الربح المشروع." />
            </div>
          </div>

          {/* Specific Pillars */}
          <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-6 text-center border-b border-indigo-200 pb-3">2. الأركان الموضوعية الخاصة</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">تعدد الشركاء</h4>
                  <p className="text-xs text-slate-500">الأصل هو التعدد (شخصين أو أكثر). الاستثناء: EURL و SAS (شريك وحيد).</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">نية المشاركة (Affectio Societatis)</h4>
                  <p className="text-xs text-slate-500">الرغبة في التعاون والمساواة وتحمل المخاطر (تمييزاً عن عقد العمل).</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">تقديم الحصص</h4>
                  <p className="text-xs text-slate-500">أنظر التفاصيل أدناه (نقدية، عينية، صناعية).</p>
                </div>
              </div>
            </div>
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

        <div className="bg-yellow-50 border-t border-yellow-100 p-6 flex gap-4 items-start mt-6 rounded-xl">
          <div className="bg-yellow-200 p-2 rounded-lg text-yellow-700">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-yellow-900 text-sm mb-1">سؤال للتفكير النقدي:</h4>
            <p className="text-yellow-800 text-sm leading-relaxed">
              {THINKING_QUESTIONS.pillars.question}
            </p>
            <p className="text-xs text-yellow-600 mt-2 italic">تلميح: {THINKING_QUESTIONS.pillars.hint}</p>
          </div>
        </div>
      </section>

    </div>
  );
};

const Tooltip = ({ word, content }: { word: string, content: string }) => {
  const [show, setShow] = useState(false);
  
  return (
    <span className="relative inline-block mx-1">
      <span 
        className="text-amber-400 font-bold cursor-pointer border-b-2 border-amber-400/30 hover:bg-amber-400/10 hover:border-amber-400 transition-colors px-1 rounded block text-center p-2 bg-white shadow-sm"
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