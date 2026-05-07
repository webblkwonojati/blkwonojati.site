import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { SidebarProvider } from "@/context/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex bg-slate-50 min-h-screen">
        {/* Sidebar - Fixed Left */}
        <SidebarForce />
        
        {/* Main Content Area - Scrolled */}
        <main className="flex-1 lg:ml-64 flex flex-col min-h-screen relative">
          <Header />
          
          {/* Dashboard Content Container */}
          <div className="p-4 md:p-8 relative flex-1">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 -z-0 pointer-events-none opacity-[0.03]" 
                 style={{ backgroundImage: 'radial-gradient(#fc703d 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            </div>
            
            <div className="relative z-10 h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

// Separate component for Sidebar to avoid breaking the server-side layout with "use client" if needed, 
// but Sidebar already has "use client" so it's fine.
function SidebarForce() {
  return <Sidebar />
}
