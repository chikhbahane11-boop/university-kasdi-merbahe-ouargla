import React, { useState } from 'react';
import { Send, CheckCircle, Star } from 'lucide-react';

const StageConclusion: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 bg-green-50 rounded-3xl border border-green-100 p-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-900">شكراً لمشاركتكم!</h2>
        <p className="text-green-700 max-w-md">
          تم استلام بطاقة الخروج بنجاح. آراؤكم تساعدنا في تحسين المحاضرات القادمة.
          <br/>
          <strong>تذكير:</strong> المحاضرة القادمة ستكون عن "المجتمع الدولي في العصور الوسطى".
        </p>
        <button 
          onClick={() => setSubmitted(false)} 
          className="text-green-600 font-medium hover:underline"
        >
          إرسال رد آخر
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">بطاقة الخروج (Exit Ticket)</h2>
        <p className="text-slate-500">قبل أن تغادروا، ساعدونا في تقييم فهمكم</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-6">
        
        {/* Question 1 */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700">
            1. اكتب شيئاً واحداً جديداً تعلمته اليوم:
          </label>
          <textarea 
            required
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition min-h-[80px]"
            placeholder="مثلاً: معاهدة قادش..."
          ></textarea>
        </div>

        {/* Question 2 */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700">
            2. اكتب سؤالاً لا يزال يحيرك:
          </label>
          <textarea 
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition min-h-[80px]"
            placeholder="سؤال أرغب في طرحه..."
          ></textarea>
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-700">
            3. درجة فهمك للمحاضرة:
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
          <div className="flex justify-between text-xs text-slate-400 px-2">
            <span>ضعيف</span>
            <span>ممتاز</span>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Send className="w-5 h-5" />
          إرسال البطاقة
        </button>
      </form>
    </div>
  );
};

export default StageConclusion;