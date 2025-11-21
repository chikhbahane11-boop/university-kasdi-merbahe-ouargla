import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, TrendingUp, ShieldAlert, Coins } from 'lucide-react';

const data = [
  {
    name: 'منشأة فردية',
    risk: 100,
    capital: 10,
    descRisk: 'مسؤولية مطلقة (أنت والشركة واحد)',
    descCapital: 'رأس مال بسيط جداً'
  },
  {
    name: 'تضامن SNC',
    risk: 90,
    capital: 30,
    descRisk: 'تضامنية ومطلقة بين الشركاء',
    descCapital: 'تجميع رؤوس أموال عائلية/صغيرة'
  },
  {
    name: 'محدودة SARL',
    risk: 40,
    capital: 60,
    descRisk: 'محدودة بقدر الحصة (أمان نسبي)',
    descCapital: 'متوسطة، مناسبة للمشاريع المتوسطة'
  },
  {
    name: 'مساهمة SPA',
    risk: 10,
    capital: 100,
    descRisk: 'محدودة جداً (تخسر قيمة السهم فقط)',
    descCapital: 'ضخمة جداً (طرح عام للجمهور)'
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-slate-900/95 text-white p-4 rounded-xl shadow-xl border border-slate-700 max-w-xs text-right" dir="rtl">
        <h4 className="font-bold text-indigo-300 mb-2 border-b border-slate-700 pb-2">{label}</h4>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-rose-400 mb-1">
              <ShieldAlert className="w-3 h-3" />
              <span>المخاطرة (المسؤولية)</span>
            </div>
            <p className="text-sm font-medium">{dataPoint.descRisk}</p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 mb-1">
              <Coins className="w-3 h-3" />
              <span>حجم رأس المال</span>
            </div>
            <p className="text-sm font-medium">{dataPoint.descCapital}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const EvolutionChart: React.FC = () => {
  return (
    <div className="mt-8">
      {/* Chart Container */}
      <div className="w-full h-[350px] p-4 bg-white rounded-xl shadow-sm border border-slate-200 relative">
        <h3 className="text-center text-slate-800 font-bold mb-6 flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          العلاقة العكسية: المخاطرة vs رأس المال
        </h3>
        
        <div className="absolute top-4 left-4 bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded flex items-center gap-1">
          <Info className="w-3 h-3" />
          مرر الفأرة للتفاصيل
        </div>

        <ResponsiveContainer width="100%" height="80%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              tick={{fontSize: 12}} 
              tickMargin={10}
            />
            <YAxis hide domain={[0, 110]} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="risk" 
              name="المخاطرة (المسؤولية)" 
              stroke="#f43f5e" 
              fillOpacity={1} 
              fill="url(#colorRisk)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="capital" 
              name="رأس المال" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorCapital)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Explanation / Legend Section */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-rose-50 p-4 rounded-lg border border-rose-100 flex items-start gap-3">
          <div className="bg-rose-100 p-2 rounded-full text-rose-600 mt-1">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-rose-900 text-sm">اللون الأحمر: المخاطرة</h4>
            <p className="text-xs text-rose-800 mt-1 leading-relaxed">
              كلما كانت الشركة "صغيرة وشخصية" (منشأة/تضامن)، زادت مسؤوليتك الشخصية عن الديون (مخاطرة عالية).
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex items-start gap-3">
          <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 mt-1">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900 text-sm">اللون الأخضر: رأس المال</h4>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              الشركات الكبرى (المساهمة) تتطلب رأس مال ضخم جداً، لكنها توفر لك حماية (مسؤولية محدودة).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionChart;