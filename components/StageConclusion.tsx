
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Star, Trash2, Users, EyeOff, Lock, Unlock, LayoutList, FileText, FileDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExitTicketResponse {
  id: number;
  date: string;
  studentName: string;
  learned: string;
  question: string;
  suggestion: string;
  rating: number;
}

const StageConclusion: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState<ExitTicketResponse[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState<'concepts' | 'classification' | 'nature'>('concepts');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const TEACHER_PASSWORD = "omar2016";

  useEffect(() => {
    const saved = localStorage.getItem('companies_exit_ticket_responses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setResponses(parsed);
        } else {
          localStorage.removeItem('companies_exit_ticket_responses');
        }
      } catch (e) {
        console.error("Corrupt data in local storage, resetting.", e);
        localStorage.removeItem('companies_exit_ticket_responses');
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newResponse: ExitTicketResponse = {
      id: Date.now(),
      date: new Date().toLocaleString('ar-EG'),
      studentName: (formData.get('studentName') as string) || 'غير محدد',
      learned: (formData.get('learned') as string) || '',
      question: (formData.get('question') as string) || '',
      suggestion: (formData.get('suggestion') as string) || '',
      rating: parseInt(formData.get('rating') as string) || 0,
    };

    const updatedResponses = [newResponse, ...responses];
    setResponses(updatedResponses);
    localStorage.setItem('companies_exit_ticket_responses', JSON.stringify(updatedResponses));
    setSubmitted(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === TEACHER_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  const downloadCSV = () => {
    try {
      const BOM = "\uFEFF";
      const headers = "التاريخ,الاسم,التقييم,ماذا تعلمت,سؤال محير,ملاحظات واقتراحات\n";
      const rows = responses.map(r => {
        const safe = (str: string) => (str || '').replace(/"/g, '""').replace(/\n/g, ' ');
        return `"${r.date}","${safe(r.studentName)}","${r.rating}/5","${safe(r.learned)}","${safe(r.question)}","${safe(r.suggestion)}"`;
      }).join("\n");

      const blob = new Blob([BOM + headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ردود_الشركات_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed", error);
      alert("حدث خطأ أثناء التصدير.");
    }
  };

  const clearResponses = () => {
    if (confirm("هل أنت متأكد من حذف جميع الردود المحفوظة؟")) {
      setResponses([]);
      localStorage.removeItem('companies_exit_ticket_responses');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      
      {/* Comprehensive Summary */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-12 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-3">
             <LayoutList className="w-8 h-8" />
             <div>
               <h2 className="text-xl font-bold">الملخص الشامل: الشركات التجارية</h2>
               <p className="text-indigo-100 text-sm">وفقاً لمطبوعة د. ضيف شعيب</p>
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

      {/* Exit Ticket Form */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">بطاقة الخروج</h2>
        <p className="text-slate-500">رأيك يهمنا لتطوير المحاضرات القادمة</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">الاسم الكامل (اختياري):</label>
            <input type="text" name="studentName" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="محمد..." />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">1. أهم فكرة رسخت في ذهنك اليوم:</label>
            <textarea name="learned" required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]" placeholder="الفرق بين..."></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">2. نقطة ما زالت غامضة:</label>
            <textarea name="question" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]" placeholder="كيف يتم..."></textarea>
          </div>

           <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">ملاحظة أو اقتراح للأستاذ:</label>
            <textarea name="suggestion" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]" placeholder="أقترح أن..."></textarea>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">تقييمك للمحاضرة:</label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} className="flex-1 cursor-pointer group">
                  <input type="radio" name="rating" value={rating} className="hidden peer" required />
                  <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-200 peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:text-indigo-700 transition group-hover:bg-slate-50">
                    <Star className={`w-6 h-6 ${rating === 5 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-400'}`} />
                    <span className="text-sm font-bold">{rating}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md">
            <Send className="w-5 h-5" />
            إرسال الرد
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-6 bg-green-50 rounded-3xl border border-green-100 p-8">
          <CheckCircle className="w-16 h-16 text-green-600" />
          <h2 className="text-3xl font-bold text-green-900">تم الإرسال بنجاح!</h2>
          <button onClick={() => setSubmitted(false)} className="text-green-600 font-medium hover:underline">إرسال رد آخر</button>
        </div>
      )}

      {/* Teacher Dashboard Section */}
      <div className="mt-16 border-t-2 border-dashed border-slate-200 pt-8">
        <button 
          onClick={toggleDashboard}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition mx-auto text-sm font-bold"
        >
          {showDashboard ? <EyeOff className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          {showDashboard ? "إغلاق لوحة التحكم" : "دخول الأستاذ"}
        </button>

        <AnimatePresence>
          {showDashboard && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-900 text-slate-300 rounded-xl mt-4 p-6 shadow-2xl">
                {!isAuthenticated ? (
                   <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <div className="p-3 bg-slate-800 rounded-full">
                        <Lock className="w-8 h-8 text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">لوحة تحكم الأستاذ</h3>
                      <p className="text-sm text-slate-400">الرجاء إدخال كلمة المرور لعرض ردود الطلبة</p>
                      
                      <form onSubmit={handleLogin} className="flex gap-2 w-full max-w-xs">
                        <input 
                          type="password" 
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-center"
                          placeholder="كلمة المرور"
                        />
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg">
                          <Unlock className="w-5 h-5" />
                        </button>
                      </form>
                      {authError && <p className="text-red-400 text-sm">كلمة المرور غير صحيحة</p>}
                   </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-indigo-400" />
                        <h3 className="text-xl font-bold text-white">ردود الطلبة ({responses.length})</h3>
                      </div>
                      <div className="flex gap-3">
                         <button onClick={downloadCSV} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold">
                           <FileText className="w-4 h-4" /> تصدير Excel
                         </button>
                         <button onClick={clearResponses} className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg text-xs font-bold">
                           <Trash2 className="w-4 h-4" /> حذف الكل
                         </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-sm">
                        <thead>
                          <tr className="text-slate-500 border-b border-slate-800">
                            <th className="pb-3 font-medium">التاريخ</th>
                            <th className="pb-3 font-medium">الاسم</th>
                            <th className="pb-3 font-medium">التقييم</th>
                            <th className="pb-3 font-medium w-1/3">ماذا تعلم</th>
                            <th className="pb-3 font-medium w-1/3">سؤال/ملاحظة</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {responses.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="py-8 text-center text-slate-500">لا توجد ردود حتى الآن</td>
                            </tr>
                          ) : (
                            responses.map((res) => (
                              <tr key={res.id} className="hover:bg-slate-800/50 transition">
                                <td className="py-3 text-slate-400 whitespace-nowrap">{res.date}</td>
                                <td className="py-3 font-bold text-white">{res.studentName}</td>
                                <td className="py-3">
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${res.rating >= 4 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {res.rating}/5
                                  </span>
                                </td>
                                <td className="py-3 text-slate-300">{res.learned}</td>
                                <td className="py-3 text-slate-300">
                                  <div className="space-y-1">
                                    <p className="text-indigo-300">{res.question}</p>
                                    {res.suggestion && <p className="text-emerald-300 text-xs">💡 {res.suggestion}</p>}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StageConclusion;
