import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users, Building2, Briefcase } from 'lucide-react';

const StageHistory: React.FC = () => {
  return (
    <div className="space-y-8 min-h-[600px]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">شجرة تصنيف الشركات</h2>
        <p className="text-slate-500">استكشف الهيكل التنظيمي للشركات في القانون الجزائري</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-xl border-4 border-slate-100 z-10 relative">
            <h3 className="text-xl font-bold">الشركات التجارية</h3>
            <span className="text-xs text-slate-400 block mt-1 text-center">المادة 544 وما يليها</span>
          </div>
          
          <div className="w-1 h-12 bg-slate-300"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative">
            <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-1 bg-slate-300 -translate-y-full"></div>

            <TreeNode 
              title="شركات الأشخاص"
              subtitle="الاعتبار الشخصي"
              icon={Users}
              color="bg-amber-500"
              items={[
                { name: 'شركة التضامن (SNC)', desc: 'النموذج الأساسي. مسؤولية مطلقة وتضامنية. جميع الشركاء تجار.' },
                { name: 'شركة التوصية البسيطة (SCS)', desc: 'فريقان: متضامنون (تجار) وموصون (أصحاب مال فقط).' },
                { name: 'شركة المحاصة', desc: 'شركة مستترة ليس لها شخصية معنوية. تنعقد بين الشركاء فقط.' }
              ]}
            />

            <TreeNode 
              title="شركات الأموال"
              subtitle="الاعتبار المالي"
              icon={Building2}
              color="bg-indigo-600"
              items={[
                { name: 'شركة المساهمة (SPA)', desc: 'النموذج الأمثل. رؤوس أموال ضخمة. أسهم قابلة للتداول. مسؤولية محدودة.' },
                { name: 'شركة التوصية بالأسهم', desc: 'نادرة. تضم شركاء متضامنين ومساهمين.' },
                { name: 'المساهمة البسيطة (SAS)', desc: 'استحدثت في 2022 للشركات الناشئة. مرونة عالية.' }
              ]}
            />
          </div>

          <div className="mt-12 w-full max-w-md">
             <div className="w-1 h-12 bg-slate-300 mx-auto -mt-12 relative z-0"></div>
             <TreeNode 
              title="الشركة المختلطة"
              subtitle="طبيعة مزدوجة"
              icon={Briefcase}
              color="bg-emerald-600"
              defaultOpen={true}
              items={[
                { name: 'الشركة ذات المسؤولية المحدودة (SARL)', desc: 'الأكثر شيوعاً. تجمع بين تحديد المسؤولية (أموال) ومنع تداول الحصص (أشخاص).' },
                { name: 'مؤسسة الشخص الوحيد (EURL)', desc: 'شكل خاص من SARL تتكون من شريك واحد فقط.' }
              ]}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

const TreeNode = ({ title, subtitle, icon: Icon, color, items, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col items-center w-full">
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full relative z-10 overflow-hidden rounded-xl shadow-md transition-all duration-300 ${isOpen ? 'ring-4 ring-slate-100' : ''}`}
      >
        <div className={`${color} p-4 text-white flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-right">
              <h4 className="font-bold text-lg">{title}</h4>
              <p className="text-xs text-white/80">{subtitle}</p>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="w-[90%] bg-white border-x border-b border-slate-200 rounded-b-xl shadow-inner overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors cursor-default">
                  <h5 className={`font-bold text-sm mb-1 ${color.replace('bg-', 'text-')}`}>{item.name}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StageHistory;