"use client";

const stats = [
  {
    icon: "school",
    label: "Total Students",
    value: "1,284",
    change: "+12%",
    positive: true,
  },
  {
    icon: "local_florist",
    label: "Active Courses",
    value: "42",
    change: "+5%",
    positive: true,
  },
  {
    icon: "assignment_turned_in",
    label: "Graduation Rate",
    value: "94%",
    change: "-2%",
    positive: false,
  },
  {
    icon: "sensors",
    label: "Live Webinars",
    value: "8",
    change: "+15%",
    positive: true,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500">
              <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
            </div>
            <div
              className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                stat.positive
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-red-500 bg-red-50"
              }`}
            >
               <span className="material-symbols-outlined text-[10px]">{stat.positive ? 'trending_up' : 'trending_down'}</span>
               {stat.change}
            </div>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight group-hover:text-accent transition-colors">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
}
