
import React, { useState } from 'react';
import { LayoutList, FileText, FileDown, ExternalLink, Lock, CheckCircle2, AlertCircle, BarChart3, CheckCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOCKED_QUESTIONS } from '../constants';

const StageConclusion: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'classification' | 'nature'>('concepts');
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Review Section Lock State
  const [isReviewLocked, setIsReviewLocked] = useState(true);
  const [reviewCode, setReviewCode] = useState('');
  const [reviewError, setReviewError] = useState('');

  // الروابط
  const STUDENT_FORM_LINK = "https://forms.gle/ZHXAnYn81c4DjEad6";
  const TEACHER_RESPONSES_LINK = "https://docs.google.com/forms/u/0/"; 

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'omar2016') {
      window.open(TEACHER_RESPONSES_LINK, '_blank');
      setError('');
      setPassword('');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  const handleUnlockReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewCode.trim() === 'omar 2016') {
        setIsReviewLocked(false);
        setReviewError('');
    } else {
        setReviewError('⚠️ كود غير صحيح');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-12">
      
      {/* 1. Comprehensive Summary Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
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
             تحميل الملخص (PDF)
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
             3. معايير التصنيف
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
                      <p className="text-sm text-slate-600">الشركة "عقد" يستند لإرادة الأطراف. تسود في شركات الأشخاص.</p>
                   </div>
                   <div className="border border-slate-200 p-4 rounded-lg">
                      <h4 className="font-bold text-slate-800 mb-2">النظرية النظامية</h4>
                      <p className="text-sm text-slate-600">الشركة "نظام" يخضع لقواعد آمرة. تسود في شركات الأموال.</p>
                   </div>
                </div>
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
                      <p className="text-sm text-slate-600">شركة مختلطة. مسؤولية محدودة بالحصص.</p>
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
                        <td className="p-3">مدني: فلاحة، مهن حرة، تعليم.</td>
                        <td className="p-3">تجاري: شراء لأجل البيع، صناعة، بنوك.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold bg-slate-50/50">الشكل (المادة 544)</td>
                        <td className="p-3">لا يوجد شكل محدد.</td>
                        <td className="p-3 font-bold text-indigo-700">تجارية بحكم الشكل: SNC, SARL, SPA.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold bg-slate-50/50">صفة التاجر</td>
                        <td className="p-3">لا تكتسبها الشركة.</td>
                        <td className="p-3">تكتسبها الشركة دائماً.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </motion.div>
           )}
        </div>
      </div>

      {/* 2. Password Protected Review Section */}
      <div className="relative">
          {isReviewLocked ? (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white shadow-2xl">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">المراجعة الشاملة (منطقة مغلقة)</h3>
              <p className="text-slate-400 mb-8">أدخل كود المحاضرة للوصول إلى الأسئلة المتوقعة.</p>
              
              <form onSubmit={handleUnlockReview} className="max-w-sm mx-auto relative">
                <input 
                  type="password" 
                  placeholder="أدخل الكود هنا..."
                  className="w-full px-5 py-4 rounded-xl bg-slate-700 border border-slate-600 text-white text-center focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  value={reviewCode}
                  onChange={(e) => setReviewCode(e.target.value)}
                />
                <button 
                  type="submit"
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-900/50"
                >
                  فتح القفل 🔓
                </button>
                {reviewError && (
                  <p className="text-red-400 text-sm mt-4 bg-red-900/20 py-2 rounded animate-pulse">
                    {reviewError}
                  </p>
                )}
              </form>
            </div>
          ) : (
            <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-100 animate-fade-in">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-green-200">
                <h3 className="text-2xl font-bold text-green-900 flex items-center gap-2">
                  <CheckCircle className="text-green-600" />
                  الأسئلة المتوقعة والإجابات النموذجية
                </h3>
                <button 
                  onClick={() => setIsReviewLocked(true)}
                  className="text-sm font-bold text-green-700 hover:bg-green-100 px-3 py-1 rounded-lg transition"
                >
                  إعادة القفل 🔒
                </button>
              </div>

              <div className="space-y-4">
                {LOCKED_QUESTIONS.map((item, i) => (
                  <details key={i} className="bg-white border border-green-100 rounded-xl overflow-hidden group">
                    <summary className="flex justify-between items-center p-5 cursor-pointer font-bold text-slate-800 hover:bg-green-50/50 transition">
                      <span>{item.q}</span>
                      <ChevronDown className="text-slate-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="p-5 pt-0 text-slate-600 leading-relaxed bg-green-50/30 border-t border-green-50">
                      <span className="font-bold text-green-700">الإجابة النموذجية: </span>
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* 3. Exit Ticket Section (Links) */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Student Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center flex flex-col items-center justify-center space-y-6 hover:shadow-xl transition-shadow">
          <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">بطاقة الخروج (للطلبة)</h3>
            <p className="text-slate-500">شاركنا ما تعلمته اليوم وسجل حضورك</p>
          </div>
          <a 
            href={STUDENT_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            اضغط هنا لملء البطاقة
          </a>
        </div>

        {/* Teacher Card */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-200 p-2 rounded-lg text-slate-600">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">فضاء الأستاذ</h3>
          </div>

          {!showAdmin ? (
            <button 
              onClick={() => setShowAdmin(true)}
              className="w-full bg-white border border-slate-300 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-100 transition flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              عرض الردود
            </button>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAdminLogin}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">كلمة المرور</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-left"
                  placeholder="••••••••"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {error}
                </p>
              )}
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition"
                >
                  دخول
                </button>
                <button 
                  type="button"
                  onClick={() => { setShowAdmin(false); setError(''); }}
                  className="px-4 py-2 text-slate-500 hover:bg-slate-200 rounded-lg transition"
                >
                  إلغاء
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>

      {/* 4. Final Footer Summary */}
      <footer className="bg-blue-900 text-white rounded-3xl p-8 md:p-12 text-center md:text-right">
          <h2 className="text-2xl font-bold mb-6 border-b border-blue-700 pb-4 inline-block">
            خاتمة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-blue-100 leading-relaxed text-sm md:text-base">
            <p>
              نستنتج أن <strong>الشركة التجارية</strong> في التشريع الجزائري هي نظام قانوني مركب يجمع بين الإرادة (العقد) والتنظيم (القانون). تكتسب صفتها التجارية إما بالموضوع (طبيعة النشاط) أو بالشكل (المساهمة، التضامن، SARL) طبقاً للمادة 544.
            </p>
            <p>
              تأسيس الشركة يتطلب توافر أركان موضوعية عامة (الرضا، المحل، السبب، الأهلية) وأركان خاصة (تعدد الشركاء، تقديم الحصص، نية المشاركة) بالإضافة للأركان الشكلية الجوهرية (الكتابة الرسمية والنشر).
            </p>
          </div>
          <div className="mt-8 text-xs text-blue-400 text-center">
            © 2025 جميع الحقوق محفوظة - قسم قانون الأعمال
          </div>
      </footer>

    </div>
  );
};

export default StageConclusion;
