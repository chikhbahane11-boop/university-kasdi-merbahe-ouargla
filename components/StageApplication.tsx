import React from 'react';
import { COMPARISON_DATA } from '../constants';
import EvolutionChart from './EvolutionChart';

const StageApplication: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">من الماضي إلى الحاضر</h2>
        <p className="text-slate-500">إثبات أن القانون الدولي تراث إنساني مشترك</p>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {COMPARISON_DATA.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4 mx-auto">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-4">{item.concept}</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">قديماً</span>
                <p className="text-sm text-slate-600 mt-1">{item.ancient}</p>
              </div>
              <div className="h-px bg-slate-100 w-full"></div>
              <div className="text-center">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">اليوم</span>
                <p className="text-sm text-slate-800 font-medium mt-1">{item.modern}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recharts Evolution Chart */}
      <EvolutionChart />
      
      <div className="bg-slate-900 text-white p-8 rounded-2xl text-center">
        <h3 className="text-2xl font-bold mb-4">سؤال للتفكير النقدي</h3>
        <p className="text-lg opacity-90 mb-6">
          "بعد هذا العرض، هل تعتقد أن القانون الدولي هو اختراع غربي حديث، أم أنه نتاج تراكم حضاري عالمي؟"
        </p>
        <div className="inline-block bg-white/20 px-6 py-2 rounded-full text-sm backdrop-blur-sm">
          موضوع للنقاش المفتوح
        </div>
      </div>
    </div>
  );
};

export default StageApplication;