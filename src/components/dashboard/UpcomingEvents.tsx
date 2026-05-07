"use client";

const events = [
  {
    title: "Hydroponics Advanced Workshop",
    time: "Tomorrow, 10:00 AM",
    type: "Offline",
  },
  {
    title: "Barista Certification Exam",
    time: "Apr 12, 09:00 AM",
    type: "Offline",
  },
  {
    title: "Eco-farming Webinar",
    time: "Apr 15, 02:00 PM",
    type: "Online",
  },
];

export default function UpcomingEvents() {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#fc703d]/10 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-slate-900">Upcoming Events</h4>
        <button className="text-[10px] font-black text-[#fc703d] uppercase tracking-widest hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-[#fc703d]/10 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#fc703d]/10 flex items-center justify-center text-[#fc703d] shrink-0">
              <span className="material-symbols-outlined">{event.type === 'Online' ? 'videocam' : 'event'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-bold text-slate-800 truncate group-hover:text-[#fc703d] transition-colors">{event.title}</h5>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
