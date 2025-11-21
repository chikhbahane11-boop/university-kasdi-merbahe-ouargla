import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Star, Download, Trash2, Users, EyeOff, Lock, Unlock, LayoutList, FileText } from 'lucide-react';
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
        setResponses(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse responses", e);
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
        const safe = (str: string) => (str || '').replace(/"/g, '""');
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
    <div className="max-w-3xl mx-auto pb-12">
      
      {/* Comprehensive Summary */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-12 overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-3">
             <LayoutList className="w-6 h-6" />
             <div>
               <h2 className="text-xl font-bold">الملخص الشامل: الشركات التجارية</h2>
               <p className="text-indigo-200 text-sm">مراجعة نهائية - د. ضيف شعيب</p>
             </div>
           </div>
           
           <a 
             href="http://dspace.univ-djelfa.dz:8080/xmlui/bitstream/handle/112/6946/%D9%85%D8%AD%D8%A7%D8%B6%D8%B1%D8%A7%D8%AA%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9.pdf"
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-lg text-sm font-bold border border-white/20"
           >
             <FileText className="w-4 h-4" />
             تحميل المطبوعة (PDF)
           </a>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto">
           <button 
             onClick={() => setActiveTab('concepts')}
             className={`flex-1 min-w-[100px] py-4 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'concepts' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             1. المفاهيم
           </button>
           <button 
             onClick={() => setActiveTab('nature')}
             className={`flex-1 min-w-[100px] py-4 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'nature' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             2. الطبيعة القانونية
           </button>
           <button 
             onClick={() => setActiveTab('classification')}
             className={`flex-1 min-w-[100px] py-4 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'classification' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             3. التصنيف
           </button>
        </div>

        <div className="p-6 min-h-[300px]">
           {activeTab === 'concepts' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border-r-4 border-indigo-500">
                   <h4 className="font-bold text-indigo-900 mb-2">تعريف الشركة (م 416 مدني)</h4>
                   <p className="text-slate-700 text-sm leading-relaxed">
                     عقد يلتزم بمقتضاه شخصان أو أكثر بأن يساهم كل منهم في نشاط مشترك بتقديم حصة من مال أو عمل، لاقتسام ما قد ينتج عنه من ربح أو خسارة.
                   </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border-r-4 border-sky-500">
                   <h4 className="font-bold text-sky-900 mb-2">تجارية الشركة (م 544 تجاري)</h4>
                   <p className="text-slate-700 text-sm leading-relaxed">
                     تكون الشركة تجارية إذا كان غرضها ممارسة أعمال تجارية، أو إذا اتخذت شكلاً تجارياً (SNC, SCS, SARL, SPA) حتى لو كان نشاطها مدنياً (الشكلية التجارية).
                   </p>
                </div>
             </motion.div>
           )}

           {activeTab === 'nature' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 p-4 rounded-lg">
                    <h4 className="font-bold text-slate-800 mb-2">النظرية العقدية</h4>
                    <p className="text-sm text-slate-600">
                      ترى أن الشركة "عقد" يعتمد على إرادة الأطراف. يظهر هذا بوضوح في <strong>شركات الأشخاص</strong> (التضامن).
                    </p>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-lg">
                    <h4 className="font-bold text-slate-800 mb-2">النظرية النظامية</h4>
                    <p className="text-sm text-slate-600">
                      ترى أن الشركة "نظام" يفرضه القانون بقواعد آمرة. يظهر هذا في <strong>شركات الأموال</strong> (المساهمة).
                    </p>
                  </div>
               </div>
               <div className="bg-amber-50 p-3 rounded text-sm text-amber-800 mt-2">
                 <strong>الخلاصة:</strong> المشرع الجزائري جمع بين الاثنين؛ التأسيس عقدي، لكن حياة الشركة تخضع للنظام القانوني.
               </div>
             </motion.div>
           )}

           {activeTab === 'classification' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-right border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b-2 border-slate-200">
                        <th className="p-3 border font-bold">معيار التفرقة</th>
                        <th className="p-3 border font-bold text-sky-700 bg-sky-50/50">الشركات المدنية</th>
                        <th className="p-3 border font-bold text-indigo-700 bg-indigo-50/50">الشركات التجارية</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 border font-bold bg-slate-50/50">النشاط (الموضوع)</td>
                        <td className="p-3 border">مدني (فلاحة، مهن حرة، استخراجي)</td>
                        <td className="p-3 border">تجاري (شراء لبيع، صناعة، خدمات..)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 border font-bold bg-slate-50/50">الشكل القانوني</td>
                        <td className="p-3 border">حرة في اتخاذ الشكل (غير التجاري)</td>
                        <td className="p-3 border">ملزمة بأشكال محددة (SNC, SPA, SARL..)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 border font-bold bg-slate-50/50">صفة التاجر</td>
                        <td className="p-3 border">لا يكتسب الشريك صفة التاجر</td>
                        <td className="p-3 border">يكتسبها الشريك في التضامن، والشركة</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 border font-bold bg-slate-50/50">الإفلاس</td>
                        <td className="p-3 border">تخضع لنظام الإعسار المدني</td>
                        <td className="p-3 border">تخضع لنظام الإفلاس التجاري</td>
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
        <p className="text-slate-500">ماذا استفدت من درس الشركات التجارية؟</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-6">
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              الاسم الكامل (اختياري):
            </label>
            <input 
              type="text"
              name="studentName"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="اسم الطالب..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              1. معلومة قانونية جديدة تعلمتها اليوم:
            </label>
            <textarea 
              name="learned"
              required
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition min-h-[80px]"
              placeholder="مثلاً: الفرق بين الشركة المدنية والتجارية..."
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              2. سؤال لا يزال يشغل تفكيرك:
            </label>
            <textarea 
              name="question"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition min-h-[80px]"
              placeholder="سؤال سأجيب عليه في الحصة القادمة..."
            ></textarea>
          </div>

           <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              ملاحظة أو اقتراح:
            </label>
            <textarea 
              name="suggestion"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition min-h-[80px]"
            ></textarea>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">
              3. تقييمك للمحاضرة:
            </label>
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

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5" />
            إرسال
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 bg-green-50 rounded-3xl border border-green-100 p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-900">تم الإرسال بنجاح!</h2>
          <p className="text-green-700 max-w-md">
            شكراً لمشاركتك. راجع بريدك الإلكتروني أو المنصة للحصول على ملخص الدرس لاحقاً.
          </p>
          <button 
            onClick={() => setSubmitted(false)} 
            className="text-green-600 font-medium hover:underline"
          >
            إرسال رد جديد
          </button>
        </div>
      )}

      {/* Dashboard */}
      <div className="mt-16 border-t-2 border-dashed border-slate-200 pt-8">
        <button 
          onClick={toggleDashboard}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition mx-auto text-sm font-bold"
        >
          {showDashboard ? <EyeOff className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          {showDashboard ? "إغلاق اللوحة" : "لوحة المعلم"}
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
                      <h3 className="text-lg font-bold text-white">منطقة المعلم</h3>
                      <p className="text-sm text-slate-400 text-center max-w-xs">
                        كلمة المرور: omar2016
                      </p>
                      <form onSubmit={handleLogin} className="flex gap-2 w-full max-w-xs">
                        <input 
                          type="password" 
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          placeholder="كلمة المرور"
                          className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                          autoFocus
                        />
                        <button 
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold"
                        >
                          <Unlock className="w-4 h-4" />
                        </button>
                      </form>
                      {authError && <span className="text-red-400 text-xs">خطأ في كلمة المرور</span>}
                   </div>
                ) : (
                  <>
                    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                       <h3 className="text-xl font-bold text-white flex items-center gap-2">
                         <Users className="w-5 h-5" />
                         سجل الردود ({responses.length})
                       </h3>
                       <div className="flex gap-3">
                          <button 
                            onClick={downloadCSV}
                            disabled={responses.length === 0}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50"
                          >
                            <Download className="w-4 h-4" />
                            تصدير
                          </button>
                          <button 
                             onClick={clearResponses}
                             disabled={responses.length === 0}
                             className="flex items-center gap-2 bg-red-900/50 hover:bg-red-900 text-red-200 px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            مسح
                          </button>
                       </div>
                    </div>
                    {responses.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-right text-sm">
                          <thead className="bg-slate-800 text-slate-200">
                            <tr>
                              <th className="p-3 rounded-r-lg">الاسم</th>
                              <th className="p-3">تعلمت</th>
                              <th className="p-3">سؤال</th>
                              <th className="p-3 rounded-l-lg">التقييم</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800">
                            {responses.map((r) => (
                              <tr key={r.id} className="hover:bg-slate-800/50 transition">
                                <td className="p-3 font-bold text-white">{r.studentName}</td>
                                <td className="p-3 truncate max-w-xs">{r.learned}</td>
                                <td className="p-3 truncate max-w-xs">{r.question}</td>
                                <td className="p-3 text-yellow-500 font-bold">{r.rating}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500">لا توجد ردود بعد</div>
                    )}
                  </>
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