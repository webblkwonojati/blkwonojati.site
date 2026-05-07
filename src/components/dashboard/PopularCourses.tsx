"use client";

import { cn } from "@/lib/utils";

const courses = [
  {
    title: "Organic Farming 101",
    description: "Panduan lengkap pupuk organik dan rotasi tanaman berkelanjutan.",
    enrollments: 450,
    price: "Gratis",
    badge: "HOT",
    badgeColor: "bg-[#fc703d] text-white",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
  },
  {
    title: "Advanced Hydroponics",
    description: "Kuasai vertical farming dan manajemen nutrisi lingkungan terkendali.",
    enrollments: 382,
    price: "Gratis",
    badge: "POPULER",
    badgeColor: "bg-blue-500 text-white",
    image:
      "https://images.unsplash.com/photo-1558449195-9cb49e211a5c?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function PopularCourses() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <h4 className="font-bold text-lg text-slate-900">Popular Courses</h4>
        <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:text-accent transition-colors">
          Manage All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.title}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
          >
            <div className="h-40 bg-slate-100 relative overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className={cn(
                  "absolute top-3 right-3 font-black text-[9px] px-2.5 py-1 rounded-full shadow-lg z-10 uppercase tracking-widest",
                  course.badgeColor
                )}
              >
                {course.badge}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h5 className="font-bold text-base mb-2 text-slate-900 group-hover:text-primary transition-colors leading-tight">{course.title}</h5>
              <p className="text-xs font-medium text-slate-500 mb-4 leading-relaxed line-clamp-2">
                {course.description}
              </p>
              <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-primary">groups</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.enrollments}</span>
                </div>
                <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">{course.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
