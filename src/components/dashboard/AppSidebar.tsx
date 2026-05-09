"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Newspaper,
  Image as ImageIcon,
  Link2,
  Link as LinkIcon,
  Briefcase,
  Users as UsersIcon,
  Globe,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { cn } from "@/lib/utils"

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Newspaper, label: "Berita & Artikel", href: "/admin/berita" },
  { icon: ImageIcon, label: "Galeri Dokumentasi", href: "/admin/galeri" },
  { icon: Link2, label: "Linktree Manager", href: "/admin/links" },
  { icon: LinkIcon, label: "Shortlink Manager", href: "/admin/shortlink" },
  { icon: Briefcase, label: "Lowongan Kerja", href: "/admin/lowongan-kerja" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user } = useUser()
  const role = user?.publicMetadata?.role as string

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-[#EAEAEA] bg-white">
      <SidebarHeader className="h-[60px] flex items-center px-6 overflow-hidden border-b border-[#EAEAEA]">
        <Link href="/admin" className="flex items-center gap-3 transition-opacity hover:opacity-70">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-black">
            <Image src="/logo-blk.png" alt="Logo" width={14} height={14} className="object-contain brightness-0 invert" />
          </div>
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-black tracking-tight text-[15px]">Wonojati Admin</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#666] font-medium text-[13px] mb-2 px-3">Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      render={<Link href={item.href} />}
                      isActive={isActive} 
                      tooltip={item.label}
                      className={cn(
                        "h-9 rounded-md px-3 transition-colors text-[14px]",
                        isActive 
                          ? "bg-[#FAFAFA] text-black font-medium" 
                          : "text-[#666] font-normal hover:bg-[#FAFAFA] hover:text-black"
                      )}
                    >
                      <item.icon className={cn("w-4 h-4", isActive ? "text-black" : "text-[#666]")} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {role === 'super_admin' && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-[#666] font-medium text-[13px] mb-2 px-3">Settings</SidebarGroupLabel>
            <SidebarMenu className="gap-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  render={<Link href="/admin/users" />}
                  isActive={pathname === "/admin/users"} 
                  tooltip="User Management"
                  className={cn(
                    "h-9 rounded-md px-3 transition-colors text-[14px]",
                    pathname === "/admin/users" 
                      ? "bg-[#FAFAFA] text-black font-medium" 
                      : "text-[#666] font-normal hover:bg-[#FAFAFA] hover:text-black"
                  )}
                >
                  <UsersIcon className={cn("w-4 h-4", pathname === "/admin/users" ? "text-black" : "text-[#666]")} />
                  <span>User Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-[#EAEAEA] bg-[#FAFAFA]/50">
        <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:justify-center">
          <div className="h-8 w-8 shrink-0 rounded-full bg-[#EAEAEA] border border-[#EAEAEA] overflow-hidden flex items-center justify-center">
             {user?.imageUrl ? (
               <Image src={user.imageUrl} alt="User" width={32} height={32} className="object-cover" />
             ) : (
               <UsersIcon size={14} className="text-[#666]" />
             )}
          </div>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
             <span className="text-[13px] font-medium text-black truncate">{user?.fullName || user?.username || "Admin"}</span>
             <span className="text-[12px] text-[#666]">{role?.replace('_', ' ') || 'Staff'}</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
