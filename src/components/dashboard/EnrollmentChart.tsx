"use client";

import { useState, useEffect } from "react";

const chartData = [
  { month: "Jan", height: 40 },
  { month: "Feb", height: 55 },
  { month: "Mar", height: 45 },
  { month: "Apr", height: 70 },
  { month: "May", height: 85 },
  { month: "Jun", height: 100 },
];

export default function EnrollmentChart() {
  const [period, setPeriod] = useState("6months");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#fc703d]/10 shadow-sm h-[400px]">
        {/* Placeholder to prevent layout shift */}
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#fc703d]/10 shadow-sm transition-all hover:border-[#fc703d]/30">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-slate-900">Enrollment Trends</h4>
        <select
          id="enrollment-period"
          className="bg-slate-50 border-none text-[10px] font-black uppercase rounded-lg py-1.5 px-3 cursor-pointer focus:ring-2 focus:ring-[#fc703d] focus:outline-none text-slate-600"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>
      <div className="h-64 relative flex items-end gap-2 px-1">
        {chartData.map((bar, index) => (
          <div
            key={bar.month}
            className={`flex-1 rounded-t-lg transition-all duration-300 cursor-pointer group relative ${
              index === chartData.length - 1
                ? "bg-[#fc703d] hover:bg-[#fc703d]/90 shadow-lg shadow-[#fc703d]/20"
                : "bg-[#fc703d]/20 hover:bg-[#fc703d]/40"
            }`}
            style={{ height: `${bar.height}%` }}
          >
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {Math.round(bar.height * 12.84)} Siswa
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
        {chartData.map((bar) => (
          <span key={bar.month}>{bar.month}</span>
        ))}
      </div>
    </div>
  );
}
