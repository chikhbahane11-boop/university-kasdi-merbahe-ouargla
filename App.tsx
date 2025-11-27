import React, { useState } from 'react';
import { Stage, NavItem } from './types';
import { BookOpen, History, Lightbulb, GraduationCap, MessageCircle, Menu, X } from 'lucide-react';
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
  { id: Stage.CONCEPTS, label: 'المفاهيم الأساسية', icon: Lightbulb },
  { id: Stage.HISTORY, label: 'أنواع الشركات', icon: History },
  { id: Stage.APPLICATION, label: 'الربط والتطبيق', icon: GraduationCap },
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-tajawal text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 dir-rtl">
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-bold text-lg text-indigo-900">مدخل للشركات التجارية</h1>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-600 p-2">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex flex-1 container mx-auto max-w-7xl p-4 lg:p-8 gap-8 relative">
        
        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-y-0 right-0 z-40 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none lg:bg-transparent lg:w-64
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="h-full flex flex-col p-4 lg:p-0 bg-white lg:bg-transparent">
             <div className="mb-8 hidden lg:block">
               <h1 className="text-2xl font-extrabold text-indigo-900">مدخل للشركات التجارية</h1>
               <p className="text-sm text-slate-500 mt-1">مقياس الشركات التجارية</p>
             </div>

             <nav className="space-y-2 flex-1">
               {NAV_ITEMS.map((item) => {
                 const isActive = currentStage === item.id;
                 return (
                   <button
                     key={item.id}
                     onClick={() => {
                       setCurrentStage(item.id);
                       setSidebarOpen(false);
                     }}
                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-right ${
                       isActive 
                         ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                         : 'text-slate-600 hover:bg-white hover:shadow-sm'
                     }`}
                   >
                     <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`} />
                     <span className="font-bold text-sm">{item.label}</span>
                   </button>
                 );
               })}
             </nav>

             <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="text-xs font-bold text-indigo-400 mb-2 uppercase">التقدم</div>
                <div className="w-full bg-white rounded-full h-2 mb-2 overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs text-indigo-700">
                  {currentIndex + 1} من {NAV_ITEMS.length} مراحل
                </div>
             </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/20 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <MotionDiv
              key={currentStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
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