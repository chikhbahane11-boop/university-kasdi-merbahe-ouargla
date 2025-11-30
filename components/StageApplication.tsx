import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2, XCircle, Trophy, Users, Building2 } from 'lucide-react';

const ITEMS_TO_SORT = [
  { id: '1', name: 'شركة التضامن', type: 'persons' },
  { id: '2', name: 'شركة المساهمة', type: 'capital' },
  { id: '3', name: 'شركة التوصية البسيطة', type: 'persons' },
  { id: '4', name: 'شركة المساهمة البسيطة', type: 'capital' },
  { id: '5', name: 'شركة المحاصة', type: 'persons' },
  { id: '6', name: 'SARL (طابع مختلط يميل للأموال)', type: 'capital' },
];

const StageApplication: React.FC = () => {
  const [items, setItems] = useState(ITEMS_TO_SORT);
  const [bins, setBins] = useState<{ persons: typeof ITEMS_TO_SORT, capital: typeof ITEMS_TO_SORT }>({ persons: [], capital: [] });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleItemClick = (id: string) => {
    setSelectedItem(id);
    setFeedback(null);
  };

  const handleBinClick = (binType: 'persons' | 'capital') => {
    if (!selectedItem) return;

    const item = items.find(i => i.id === selectedItem);
    if (!item) return;

    const isCorrect = (item.type === binType) || (item.name.includes('SARL') && binType === 'capital'); 

    if (isCorrect) {
      setFeedback('correct');
      setTimeout(() => {
        setBins(prev => ({ ...prev, [binType]: [...prev[binType], item] }));
        setItems(prev => prev.filter(i => i.id !== selectedItem));
        setSelectedItem(null);
        setFeedback(null);
      }, 500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const resetGame = () => {
    setItems(ITEMS_TO_SORT);
    setBins({ persons: [], capital: [] });
    setSelectedItem(null);
    setFeedback(null);
  };

  const isGameComplete = items.length === 0;

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">لعبة الفرز: أشخاص أم أموال؟</h2>
        <p className="text-slate-500">اختر الشركة ثم ضعها في الصندوق المناسب</p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Game Area */}
        <div className="p-8 min-h-[500px] flex flex-col">
          
          {/* Deck of Cards */}
          <div className="flex-1 mb-12">
            {isGameComplete ? (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <Trophy className="w-20 h-20 text-amber-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">ممتاز!</h3>
                <p className="text-slate-500">لقد أكملت تصنيف جميع الشركات بنجاح.</p>
                <button onClick={resetGame} className="mt-6 flex items-center gap-2 mx-auto text-indigo-600 hover:text-indigo-800 font-bold">
                  <RefreshCw className="w-4 h-4" /> إعادة اللعبة
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.button
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      onClick={() => handleItemClick(item.id)}
                      className={`p-4 rounded-xl border-2 font-bold text-sm shadow-sm transition-all relative ${
                        selectedItem === item.id 
                          ? feedback === 'wrong' 
                            ? 'bg-red-50 border-red-500 text-red-700 animate-shake'
                            : feedback === 'correct'
                              ? 'bg-green-50 border-green-500 text-green-700 scale-105'
                              : 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-200 scale-105'
                          : 'bg-white border-slate-100 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {item.name}
                      {selectedItem === item.id && feedback === 'correct' && (
                        <div className="absolute -top-2 -left-2 bg-green-500 text-white rounded-full p-1">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      {selectedItem === item.id && feedback === 'wrong' && (
                        <div className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1">
                          <XCircle className="w-4 h-4" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Bins */}
          <div className="grid grid-cols-2 gap-8 mt-auto">
            {/* Persons Bin */}
            <div 
              onClick={() => handleBinClick('persons')}
              className={`rounded-2xl border-4 border-dashed p-6 text-center transition-all cursor-pointer relative overflow-hidden ${
                selectedItem ? 'border-amber-400 bg-amber-50 hover:bg-amber-100' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
              <Users className={`w-12 h-12 mx-auto mb-3 ${selectedItem ? 'text-amber-500' : 'text-slate-300'}`} />
              <h4 className="font-bold text-slate-800">شركات الأشخاص</h4>
              <p className="text-xs text-slate-500 mt-1">تقوم على الثقة الشخصية</p>
              
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {bins.persons.map(i => (
                  <span key={i.id} className="text-[10px] bg-white border border-amber-200 px-2 py-1 rounded-full text-amber-700 font-bold animate-in fade-in slide-in-from-top-2">
                    {i.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Capital Bin */}
            <div 
              onClick={() => handleBinClick('capital')}
              className={`rounded-2xl border-4 border-dashed p-6 text-center transition-all cursor-pointer relative overflow-hidden ${
                selectedItem ? 'border-indigo-400 bg-indigo-50 hover:bg-indigo-100' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
              <Building2 className={`w-12 h-12 mx-auto mb-3 ${selectedItem ? 'text-indigo-600' : 'text-slate-300'}`} />
              <h4 className="font-bold text-slate-800">شركات الأموال</h4>
              <p className="text-xs text-slate-500 mt-1">تقوم على جمع المال</p>

              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {bins.capital.map(i => (
                  <span key={i.id} className="text-[10px] bg-white border border-indigo-200 px-2 py-1 rounded-full text-indigo-700 font-bold animate-in fade-in slide-in-from-top-2">
                    {i.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StageApplication;