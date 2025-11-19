import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'البداية',
    scope: 10,
    complexity: 20,
    period: 'مجتمعات بدائية'
  },
  {
    name: 'بابل',
    scope: 30,
    complexity: 40,
    period: 'الحدود والنزاعات'
  },
  {
    name: 'مصر الفرعونية',
    scope: 50,
    complexity: 60,
    period: 'السلام والتحالف'
  },
  {
    name: 'روما',
    scope: 75,
    complexity: 70,
    period: 'عالمية القانون'
  },
  {
    name: 'العصر الحديث',
    scope: 100,
    complexity: 100,
    period: 'منظمات دولية'
  },
];

const EvolutionChart: React.FC = () => {
  return (
    <div className="w-full h-[300px] mt-6 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-center text-slate-700 font-bold mb-4">تطور نطاق وتعقيد القانون الدولي عبر الزمن</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#64748b" />
          <YAxis stroke="#64748b" hide />
          <Tooltip 
            contentStyle={{ direction: 'rtl', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
          />
          <Area type="monotone" dataKey="scope" name="نطاق التطبيق (عالمية)" stackId="1" stroke="#4f46e5" fill="#818cf8" />
          <Area type="monotone" dataKey="complexity" name="التعقيد المؤسسي" stackId="1" stroke="#0ea5e9" fill="#7dd3fc" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EvolutionChart;