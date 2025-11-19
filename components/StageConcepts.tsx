import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CommunityGraph from './CommunityGraph';
import { Timer, Lightbulb } from 'lucide-react';

const StageConcepts: React.FC = () => {
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (timerActive && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const startTimer = (seconds: number) => {
    setTimer(seconds);
    setTimerActive(true);
  };

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">المفاهيم الأساسية</h2>
        <p className="text-slate-500">الركائز التي سنبني عليها</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Concept 1: International Law */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-indigo-600 p-4 text-white">
            <h3 className="text-xl font-bold text-center">1. القانون الدولي</h3>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-lg text-slate-700 font-medium leading-relaxed text-center">
              "مجموعة القواعد التي تنظم العلاقات بين الدول والكيانات الدولية."
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border-r-4 border-indigo-500">
              <h4 className="font-bold text-slate-900 mb-2">تشبيه (Anchoring):</h4>
              <p className="text-sm text-slate-600">
                تماما مثل <strong>قوانين المرور</strong> التي تمنع الفوضى والحوادث بين السيارات في الشارع، القانون الدولي يمنع الفوضى بين الدول.
                <br/>
                <span className="text-xs text-slate-400 mt-1 block">* ملاحظة: هو لا يمنع الحروب تماماً، بل يضع لها قواعد.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Concept 2: International Community */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-sky-600 p-4 text-white">
            <h3 className="text-xl font-bold text-center">2. المجتمع الدولي</h3>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-lg text-slate-700 font-medium leading-relaxed text-center">
              "الوسط الاجتماعي الذي تعيش فيه الدول والمنظمات وتتفاعل فيه."
            </p>
            <div className="h-48 w-full">
               {/* D3 Visualization embedded here */}
               <CommunityGraph />
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border-r-4 border-sky-500">
              <h4 className="font-bold text-slate-900 mb-2">تشبيه:</h4>
              <p className="text-sm text-slate-600">
                هو مثل <strong>"الحي السكني"</strong>. السكان هم الدول، ولهم جمعية سكان (منظمات)، وقواعد مشتركة للعيش.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Learning Activity */}
      <motion.div 
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2 text-amber-700 font-bold">
               <Lightbulb className="w-6 h-6" />
               <span>نشاط تفاعلي: فكر - زاوج - شارك</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              سؤال للنقاش: لماذا نعتبر القانون الدولي مهماً لحياتنا اليومية كأفراد؟
            </h3>
            <p className="text-slate-600 text-sm">
              (فكر في السفر، البريد، الإنترنت، البضائع المستوردة...)
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-xl shadow-sm min-w-[200px]">
             <Timer className={`w-8 h-8 ${timerActive ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
             <span className="text-3xl font-mono font-bold text-slate-800">
               00:{timer.toString().padStart(2, '0')}
             </span>
             <div className="flex gap-2">
               <button 
                onClick={() => startTimer(60)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm transition"
               >
                 دقيقة تفكير
               </button>
               <button 
                onClick={() => startTimer(120)}
                className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded text-sm transition"
               >
                 دقيقتان نقاش
               </button>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StageConcepts;