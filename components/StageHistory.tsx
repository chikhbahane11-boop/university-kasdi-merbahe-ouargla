import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE_DATA, QUIZ_QUESTIONS } from '../constants';
import { ArrowLeft, ArrowRight, Scroll, CheckCircle2, HelpCircle, Briefcase, Users, Building } from 'lucide-react';
import GlossaryTerm from './GlossaryTerm';
import SourceReader from './SourceReader';

const MotionDiv = motion.div as any;

// Helper to get icon based on string
const getIcon = (iconName: string) => {
  switch(iconName) {
    case 'users': return <Users className="w-6 h-6" />;
    case 'briefcase': return <Briefcase className="w-6 h-6" />;
    case 'building': return <Building className="w-6 h-6" />;
    default: return <Scroll className="w-6 h-6" />;
  }
};

const StageTypes: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quizState, setQuizState] = useState<{ [key: number]: number | null }>({});
  const [showQuizResult, setShowQuizResult] = useState<{ [key: number]: boolean }>({});

  const currentType = TIMELINE_DATA[activeIndex];

  const handleNext = () => {
    if (activeIndex < TIMELINE_DATA.length - 1) setActiveIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(prev => prev - 1);
  };

  const handleQuizAnswer = (questionId: number, optionIndex: number) => {
    setQuizState({ ...quizState, [questionId]: optionIndex });
    setShowQuizResult({ ...showQuizResult, [questionId]: true });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">أنواع الشركات التجارية</h2>
        <p className="text-slate-500">تدرج النماذج من "الاعتبار الشخصي" إلى "الاعتبار المالي"</p>
      </div>

      {/* Stepper Navigation */}
      <div className="flex justify-center items-center gap-4 mb-8">
        {TIMELINE_DATA.map((event, idx) => (
          <div key={event.id} className="flex items-center">
            <button
              onClick={() => setActiveIndex(idx)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                idx === activeIndex 
                  ? 'bg-indigo-600 text-white shadow-lg scale-110 ring-4 ring-indigo-100' 
                  : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
              }`}
            >
              {idx + 1}
            </button>
            {idx < TIMELINE_DATA.length - 1 && (
              <div className={`w-16 h-1 mx-2 rounded ${idx < activeIndex ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="relative bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden min-h-[500px]">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left: Info */}
              <div className="flex-1 space-y-6">
                <div className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold">
                  {currentType.year}
                </div>
                <h2 className="text-4xl font-extrabold text-slate-800">{currentType.civilization}</h2>
                <div className="flex items-center gap-3 text-xl text-amber-700 font-serif italic border-r-4 border-amber-400 pr-4 bg-amber-50 p-2 rounded-r">
                  {getIcon(currentType.icon)}
                  {currentType.title}
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {currentType.description}
                </p>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h4 className="font-bold text-slate-900 mb-4 border-b pb-2">أهم الخصائص القانونية:</h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {currentType.principles.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Quiz */}
              <div className="w-full md:w-1/3 space-y-4">
                 <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-lg h-full">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-yellow-400" />
                      سؤال سريع
                    </h4>
                    
                    {QUIZ_QUESTIONS[activeIndex] ? (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-slate-200 mb-4">
                          {QUIZ_QUESTIONS[activeIndex].question}
                        </p>
                        <div className="space-y-2">
                          {QUIZ_QUESTIONS[activeIndex].options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handleQuizAnswer(QUIZ_QUESTIONS[activeIndex].id, optIdx)}
                              disabled={showQuizResult[QUIZ_QUESTIONS[activeIndex].id]}
                              className={`w-full text-right p-2 rounded text-xs transition-colors ${
                                showQuizResult[QUIZ_QUESTIONS[activeIndex].id]
                                  ? optIdx === QUIZ_QUESTIONS[activeIndex].correctAnswer
                                    ? 'bg-green-600 text-white'
                                    : quizState[QUIZ_QUESTIONS[activeIndex].id] === optIdx
                                      ? 'bg-red-500 text-white'
                                      : 'bg-slate-700 text-slate-400'
                                  : 'bg-slate-700 hover:bg-slate-600 text-white'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {showQuizResult[QUIZ_QUESTIONS[activeIndex].id] && (
                          <MotionDiv 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 p-3 bg-white/10 rounded text-xs text-slate-200"
                          >
                            {QUIZ_QUESTIONS[activeIndex].explanation}
                          </MotionDiv>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">لا يوجد اختبار لهذه المرحلة.</p>
                    )}
                 </div>
              </div>
            </div>
            
            {/* Dynamic Source Reader */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <SourceReader sectionKey={currentType.id} defaultOpen={false} />
            </div>
          </MotionDiv>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm border-t border-slate-100 z-20">
          <button 
            onClick={handlePrev} 
            disabled={activeIndex === 0}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
          >
            <ArrowRight className="w-5 h-5" /> السابق
          </button>
          
          <button 
            onClick={handleNext}
            disabled={activeIndex === TIMELINE_DATA.length - 1}
             className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition ${activeIndex === TIMELINE_DATA.length - 1 ? 'opacity-30 cursor-not-allowed text-slate-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            التالي <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageTypes;