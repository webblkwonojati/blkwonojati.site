"use client";

const enrollments = [
  {
    name: "Ahmad Subarjo",
    course: "Teknik Barista",
    date: "8 Apr 2026",
    status: "Confirmed",
  },
  {
    name: "Siti Aminah",
    course: "Hidroponik Lanjut",
    date: "7 Apr 2026",
    status: "Pending",
  },
  {
    name: "Budi Santoso",
    course: "Mekanik Otomotif",
    date: "6 Apr 2026",
    status: "Confirmed",
  },
  {
    name: "Dewi Lestari",
    course: "Desain Grafis",
    date: "5 Apr 2026",
    status: "Cancelled",
  },
];

export default function RecentEnrollments() {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#fc703d]/10 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-slate-900">Recent Enrollments</h4>
        <button className="text-[10px] font-black text-[#fc703d] uppercase tracking-widest hover:underline">View History</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#fc703d]/10">
              <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Student Name</th>
              <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course</th>
              <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#fc703d]/5">
            {enrollments.map((en, index) => (
              <tr key={index} className="hover:bg-[#fc703d]/5 transition-colors group">
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#fc703d]/10 flex items-center justify-center text-[#fc703d] text-xs font-bold ring-2 ring-transparent group-hover:ring-[#fc703d]/20 transition-all">
                      {en.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-slate-800">{en.name}</span>
                  </div>
                </td>
                <td className="py-4 text-sm font-medium text-slate-500">{en.course}</td>
                <td className="py-4">
                  <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${
                    en.status === 'Confirmed' ? 'text-primary bg-primary/10' :
                    en.status === 'Pending' ? 'text-blue-500 bg-blue-50' :
                    'text-red-500 bg-red-50'
                  }`}>
                    {en.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
