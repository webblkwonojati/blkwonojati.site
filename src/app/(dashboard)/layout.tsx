import "./admin.css";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import Header from "@/components/dashboard/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import PageTransition from "@/components/PageTransition";

import { checkRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await checkRole();

  if (!role) {
    redirect("/");
  }
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#FAFAFA] flex flex-col min-h-screen">
        <Header />
        
        {/* Dashboard Content Container */}
        <div className="p-4 md:p-8 flex-1 max-w-[1400px] mx-auto w-full">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
