import StatsCards from "@/components/dashboard/StatsCards";
import EnrollmentChart from "@/components/dashboard/EnrollmentChart";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import RecentEnrollments from "@/components/dashboard/RecentEnrollments";
import PopularCourses from "@/components/dashboard/PopularCourses";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            UPT BLK Wonojati Overview
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Selamat datang kembali. Berikut adalah ringkasan aktivitas pusat pelatihan hari ini.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all cursor-pointer hover:shadow-sm active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-sm text-[#fc703d]">
              download
            </span>
            Export Data
          </button>
        </div>
      </div>

      {/* Statistics */}
      <StatsCards />

      {/* Charts & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EnrollmentChart />
        <UpcomingEvents />
      </div>

      {/* Tables & Lists */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <RecentEnrollments />
        <PopularCourses />
      </div>
    </div>
  );
}
