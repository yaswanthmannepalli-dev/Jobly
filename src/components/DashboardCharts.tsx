"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  date: string;
  visitors: number;
}

export default function DashboardCharts({ data }: { data: ChartData[] }) {
  return (
    <div className="h-[350px] w-full mt-8 bg-white rounded-2xl border border-line p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-6 text-foreground">Website Visitors (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            cursor={{ stroke: '#f3e8ff', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="visitors" 
            stroke="#9333ea" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#9333ea', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, fill: '#9333ea', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
