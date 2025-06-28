"use client";

import {
  IconBrain,
  IconCalendarClock,
  IconDashboard,
  IconHelp,
  IconLungs,
  IconPrescription,
  IconReportMedical,
  IconSettings,
  IconUserQuestion,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HeartHandshakeIcon } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Appointments",
      url: "/appointments",
      icon: IconCalendarClock,
    },
    {
      title: "ArthaMed",
      url: "/arthamed",
      icon: IconPrescription,
    },
    {
      title: "Smritiyaan",
      url: "/smritiyan",
      icon: IconUserQuestion,
    },
    {
      title: "Rog Dristi",
      url: "/rog-dristi",
      icon: IconReportMedical,
    },
    {
      title: "Shwaas Veda",
      url: "/shwaas-veda",
      icon: IconLungs,
    },
    {
      title: "Neuro Setu",
      url: "/neuro-setu",
      icon: IconBrain,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <HeartHandshakeIcon className="!size-6" />
                <span className="text-base font-semibold">IntelliCure</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
