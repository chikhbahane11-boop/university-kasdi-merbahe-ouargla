import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, ScrollText, Star } from 'lucide-react';

const StageIntro: React.FC = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">المدخل: قصة عبر الزمن</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          دعونا نبدأ برحلة إلى الماضي.. تخيلوا أننا في عام 1945، وعلماء الآثار يكتشفون شيئاً مذهلاً.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* The Hook Card */}
        <motion.div 
          className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 shadow-lg relative overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => setRevealed(true)}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200 rounded-bl-full opacity-50"></div>
          
          {!revealed ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <Star className="w-16 h-16 text-amber-600 animate-pulse" />
              <h3 className="text-2xl font-bold text-amber-900">الاكتشاف العظيم</h3>
              <p className="text-amber-800">انقر لكشف السر الذي عمره 3000 عام</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 text-right"
            >
              <div className="flex items-center gap-3 mb-4 border-b border-amber-200 pb-4">
                <ScrollText className="w-8 h-8 text-amber-700" />
                <h3 className="text-xl font-bold text-amber-900">الوثيقة المكتشفة</h3>
              </div>
              <p className="text-amber-800 leading-relaxed">
                لم يجدوا ذهباً ولا كنوزاً، بل وجدوا نصاً يتحدث عن:
              </p>
              <ul className="space-y-2 text-amber-900 font-medium list-disc list-inside">
                <li>السلام الدائم بين دولتين</li>
                <li>الدفاع المشترك (تحالف)</li>
                <li>تسليم اللاجئين السياسيين</li>
                <li>احترام الحدود</li>
              </ul>
              <p className="mt-4 text-sm text-amber-700 italic border-t border-amber-200 pt-4">
                إنها <strong>معاهدة قادش</strong> (1259 ق.م) بين الفراعنة والحيثيين. نفس مبادئ الأمم المتحدة اليوم!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Objectives */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
          <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <Map className="w-5 h-5" />
            أهداف رحلتنا اليوم
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <span className="text-slate-700">التمييز بوضوح بين "القانون الدولي" و "المجتمع الدولي".</span>
            </li>
            <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <span className="text-slate-700">استكشاف مساهمات بابل، مصر، وروما في نشأة القواعد الدولية.</span>
            </li>
            <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <span className="text-slate-700">إثبات أن القانون الدولي تراث إنساني مشترك وليس اختراعاً غربياً حديثاً.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StageIntro;