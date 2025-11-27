
import React, { useState } from 'react';
import { LayoutList, FileText, FileDown, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const StageConclusion: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'classification' | 'nature'>('concepts');

  return (
    <div className="max-w-4xl mx-auto pb-12">
      
      {/* Comprehensive Summary */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-12 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-3">
             <LayoutList className="w-8 h-8" />
             <div>
               <h2 className="text-xl font-bold">الملخص الشامل: الشركات التجارية</h2>
             </div>
           </div>
           
           <a 
             href="http://dspace.univ-djelfa.dz:8080/xmlui/bitstream/handle/112/6946/%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A7%D8%AA%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9.pdf"
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 transition px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
           >
             <FileDown className="w-4 h-4" />
             تحميل المطبوعة (PDF)
           </a>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
           <button 
             onClick={() => setActiveTab('concepts')}
             className={`flex-1 min-w-[120px] py-4 text-sm font-bold transition-colors ${activeTab === 'concepts' ? 'text-indigo-700 border-b-2 border-indigo-600 bg-white' : 'text-slate-500 hover:text-slate-700'}`}
           >
             1. المفهوم والنظريات
           </button>
           <button 
             onClick={() => setActiveTab('nature')}
             className={`flex-1 min-w-[120px] py-4 text-sm font-bold transition-colors ${activeTab === 'nature' ? 'text-indigo-700 border-b-2 border-indigo-600 bg-white' : 'text-slate-500 hover:text-slate-700'}`}
           >
             2. أنواع الشركات
           </button>
           <button 
             onClick={() => setActiveTab('classification')}
             className={`flex-1 min-w-[120px] py-4 text-sm font-bold transition-colors ${activeTab === 'classification' ? 'text-indigo-700 border-b-2 border-indigo-600 bg-white' : 'text-slate-500 hover:text-slate-700'}`}
           >
             3. معايير التصنيف (مهم)
           </button>
        </div>

        <div className="p-6 min-h-[300px] bg-white">
           {activeTab === 'concepts' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                   <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-bold text-indigo-900">تعريف الشركة (م 416 مدني)</h4>
                   </div>
                   <p className="text-slate-700 leading-relaxed">
                     "الشركة عقد يلتزم بمقتضاه شخصان أو أكثر بأن يساهم كل منهم في نشاط مشترك بتقديم حصة من مال أو عمل، لاقتسام ما قد ينتج عنه من ربح أو خسارة."
                   </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                   <div className="border border-slate-200 p-4 rounded-lg">
                      <h4 className="font-bold text-slate-800 mb-2">النظرية العقدية</h4>
                      <p className="text-sm text-slate-600">الشركة "عقد" يستند لإرادة الأطراف. تسود في شركات الأشخاص (التضامن).</p>
                   </div>
                   <div className="border border-slate-200 p-4 rounded-lg">
                      <h4 className="font-bold text-slate-800 mb-2">النظرية النظامية</h4>
                      <p className="text-sm text-slate-600">الشركة "نظام" (Institution) يخضع لقواعد آمرة من الدولة. تسود في شركات الأموال.</p>
                   </div>
                </div>
                <p className="text-xs text-center text-slate-400 mt-2">المشرع الجزائري أخذ بالموقف المختلط: تأسيس عقدي وحياة نظامية.</p>
             </motion.div>
           )}

           {activeTab === 'nature' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="bg-orange-100 text-orange-600 font-bold p-2 rounded">SNC</div>
                    <div>
                      <h4 className="font-bold text-slate-800">شركة التضامن (م 551)</h4>
                      <p className="text-sm text-slate-600">شركة أشخاص. مسؤولية تضامنية ومطلقة. الشركاء تجار.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="bg-sky-100 text-sky-600 font-bold p-2 rounded">SARL</div>
                    <div>
                      <h4 className="font-bold text-slate-800">المسؤولية المحدودة (م 564)</h4>
                      <p className="text-sm text-slate-600">شركة مختلطة. مسؤولية محدودة بالحصص. لا يكتسب الشريك صفة التاجر.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="bg-indigo-100 text-indigo-600 font-bold p-2 rounded">SPA</div>
                    <div>
                      <h4 className="font-bold text-slate-800">شركة المساهمة (م 592)</h4>
                      <p className="text-sm text-slate-600">شركة أموال. رؤوس أموال ضخمة. أسهم قابلة للتداول.</p>
                    </div>
                  </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'classification' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-sm text-right">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700">
                        <th className="p-3 border-b font-bold">معيار التفرقة</th>
                        <th className="p-3 border-b font-bold text-sky-700 bg-sky-50">الشركات المدنية</th>
                        <th className="p-3 border-b font-bold text-indigo-700 bg-indigo-50">الشركات التجارية</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-bold bg-slate-50/50">الموضوع (النشاط)</td>
                        <td className="p-3">مدني: فلاحة، مهن حرة (طب، محاماة)، تعليم، حرف.</td>
                        <td className="p-3">تجاري: شراء لأجل البيع، صناعة، نقل، بنوك، تأمين.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold bg-slate-50/50">الشكل (المادة 544)</td>
                        <td className="p-3">لا يوجد شكل محدد، غالباً شركة مدنية مهنية.</td>
                        <td className="p-3 font-bold text-indigo-700">تجارية بحكم الشكل: SNC, SCS, SARL, SPA.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold bg-slate-50/50">صفة التاجر</td>
                        <td className="p-3">لا تكتسبها الشركة ولا الشركاء.</td>
                        <td className="p-3">تكتسبها الشركة دائماً (والشركاء في التضامن).</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold bg-slate-50/50">الإفلاس</td>
                        <td className="p-3">تخضع للإعسار المدني.</td>
                        <td className="p-3">تخضع لنظام الإفلاس التجاري.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </motion.div>
           )}
        </div>
      </div>

      {/* Exit Ticket Form - Google Form Embed */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">بطاقة الخروج</h2>
        <p className="text-slate-500">رأيك يهمنا لتطوير المحاضرات القادمة</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden relative">
         <div className="bg-indigo-600 h-2 w-full"></div>
         
         <div className="relative w-full h-[800px] bg-slate-50">
            <iframe 
                src="https://forms.gle/ZHXAnYn81c4DjEad6"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                className="w-full h-full"
                title="بطاقة الخروج - الشركات التجارية"
            >
                جاري التحميل...
            </iframe>
         </div>

         <div className="p-4 text-center bg-slate-50 border-t border-slate-200">
            <p className="text-slate-500 text-sm mb-2">هل تواجه مشكلة في عرض النموذج؟</p>
            <a 
              href="https://forms.gle/ZHXAnYn81c4DjEad6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold transition"
            >
              <ExternalLink className="w-4 h-4" />
              افتح النموذج في نافذة جديدة
            </a>
         </div>
      </div>
    </div>
  );
};

export default StageConclusion;
