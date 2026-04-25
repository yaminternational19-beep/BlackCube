'use client';
// import { useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Settings,
  ChevronRight,
  Users
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
// import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const sidebarItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview & Analytics"
  },
  {
    id: "home-cms",
    title: "Home Page",
    icon: FileText,
    description: "Edit Home Page Content"
  },
  {
    id: "about-cms",
    title: "About Page",
    icon: FileText,
    description: "Edit About Page Content"
  },
  {
    id: "services-cms",
    title: "Services Page",
    icon: FileText,
    description: "Edit Services Page Content"
  },
  {
    id: "contact-cms",
    title: "Contact Page",
    icon: FileText,
    description: "Edit Contact Page Content"
  },
  {
    id: "portfolio-cms",
    title: "Portfolio Page",
    icon: FileText,
    description: "Edit Portfolio Page Content"
  },
  {
    id: "career-cms",
    title: "Career Page",
    icon: FileText,
    description: "Edit Career Page Content"
  },
  {
    id: "users",
    title: "Contact Submissions",
    icon: Users,
    description: "Manage Contact Submissions"
  },
  {
    id: "job-applications",
    title: "Job Applications",
    icon: FileText,
    description: "Manage Job Applications"
  }
];

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      className={cn(
        "border-r border-border transition-all duration-300 h-screen flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      {/* Fixed Header */}
      <div className="p-4 border-b border-sidebar-border flex-shrink-0">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">Admin</h3>
              {/* <p className="text-xs text-sidebar-foreground/60">Content Management</p> */}
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center ">
            <Settings className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <SidebarContent className="bg-sidebar flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "w-full justify-start px-3 py-2 rounded-lg transition-colors",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      activeTab === item.id && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    )}
                  >
                    <item.icon className={cn(
                      "h-4 w-4 flex-shrink-0",
                      activeTab === item.id ? "text-primary" : "text-sidebar-foreground/60"
                    )} />
                    {!isCollapsed && (
                      <div className="flex-1 text-left ml-3">
                        <div className="text-sm font-medium">{item.title}</div>
                        {/* <div className="text-xs text-sidebar-foreground/60">{item.description}</div> */}
                      </div>
                    )}
                    {!isCollapsed && activeTab === item.id && (
                      <ChevronRight className="h-4 w-4 text-primary" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
