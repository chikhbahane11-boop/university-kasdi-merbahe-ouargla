
import React, { useState } from 'react';
import { Stage, NavItem } from './types';
import { BookOpen, History, Lightbulb, GraduationCap, MessageCircle, Menu, X, FileDown, School } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import StageIntro from './components/StageIntro';
import StageConcepts from './components/StageConcepts';
import StageHistory from './components/StageHistory';
import StageApplication from './components/StageApplication';
import StageConclusion from './components/StageConclusion';

const MotionDiv = motion.div as any;

const NAV_ITEMS: NavItem[] = [
  { id: Stage.INTRO, label: 'الافتتاح والقصة', icon: BookOpen },
  { id: Stage.CONCEPTS, label: 'المفاهيم والأركان', icon: Lightbulb },
  { id: Stage.HISTORY, label: 'شجرة التصنيف', icon: History },
  { id: Stage.APPLICATION, label: 'لعبة الفرز', icon: GraduationCap },
  { id: Stage.CONCLUSION, label: 'الختام والتقييم', icon: MessageCircle },
];

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.INTRO);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderStage = () => {
    switch (currentStage) {
      case Stage.INTRO: return <StageIntro />;
      case Stage.CONCEPTS: return <StageConcepts />;
      case Stage.HISTORY: return <StageHistory />;
      case Stage.APPLICATION: return <StageApplication />;
      case Stage.CONCLUSION: return <StageConclusion />;
      default: return <StageIntro />;
    }
  };

  const currentIndex = NAV_ITEMS.findIndex(i => i.id === currentStage);
  const progressPercentage = ((currentIndex + 1) / NAV_ITEMS.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-tajawal text-slate-900 selection:bg-amber-100 selection:text-slate-900 dir-rtl">
      
      {/* Mobile Header - Fixed Menu Alignment to Right */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-bold text-lg text-slate-900">مدخل للشركات التجارية</h1>
        {/* Menu Button on the Right */}
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-800 p-2 hover:bg-slate-100 rounded-lg transition">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex flex-1 container mx-auto max-w-7xl p-4 lg:p-8 gap-8 relative">
        
        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-y-0 right-0 z-40 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none lg:bg-transparent lg:w-64 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="h-full flex flex-col p-6 lg:p-0 bg-white lg:bg-transparent">
             <div className="mb-8 hidden lg:block">
               <div className="flex items-center gap-2 mb-2">
                 <School className="w-8 h-8 text-amber-500" />
                 <h1 className="text-2xl font-extrabold text-slate-900">الشركات التجارية</h1>
               </div>
               <p className="text-sm text-slate-500 font-medium">محاضرة تفاعلية - د. ضيف شعيب</p>
             </div>

             <nav className="space-y-3 flex-1">
               {NAV_ITEMS.map((item) => {
                 const isActive = currentStage === item.id;
                 return (
                   <button
                     key={item.id}
                     onClick={() => {
                       setCurrentStage(item.id);
                       setSidebarOpen(false);
                     }}
                     className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-right font-bold ${
                       isActive 
                         ? 'bg-slate-900 text-white shadow-lg shadow-slate-300 border-r-4 border-amber-500' 
                         : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm'
                     }`}
                   >
                     <item.icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                     <span>{item.label}</span>
                   </button>
                 );
               })}
             </nav>

             <div className="space-y-6 mt-auto">
                {/* Progress Bar */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">التقدم</span>
                        <span className="text-xs font-bold text-slate-900">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                        className="bg-amber-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                    </div>
                </div>

                {/* Download Brochure Button */}
                <a 
                  href="https://share.google/q98lJPAxCt330mH9g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-xl font-bold shadow-md shadow-amber-200 transition-all transform hover:-translate-y-1"
                >
                  <FileDown className="w-5 h-5" />
                  <span>تحميل المطبوعة</span>
                </a>
             </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <MotionDiv
              key={currentStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full"
            >
              {renderStage()}
            </MotionDiv>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};

export default App;
