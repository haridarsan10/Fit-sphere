
"use client";

import * as React from "react";

import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { sidebarConfig } from "@/config/sidebar/sidebar-config";
import { normalizeRole } from "@/shared/utils/normalize-role";

// Use your existing authentication utility
import { getCurrentUser } from "@/shared/utils/jwt";
import { getToken } from "@/shared/utils/auth";

import type { AppRole } from "@/shared/types/role/role";

type AuthenticatedUser = {
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

  // 1. Get currently authenticated user
  const token= getToken()
  const currentUser = getCurrentUser(token) as AuthenticatedUser | null;


  // 2. Normalize the user's role
  const role: AppRole | null = normalizeRole(currentUser?.role);

  // 3. Handle missing or invalid role
  if (!role) {
    return null;
  }

  // 4. Get navigation configuration for that role
  const roleData = sidebarConfig[role];

  // 5. Prepare user information
  const user = {
    name:
      currentUser?.name ??
      currentUser?.email?.split("@")[0] ??
      "User",

    email: currentUser?.email ?? "",

    avatar:
      currentUser?.avatar ??
      "/avatars/default.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>

      {/* Sidebar Header */}
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            FS
          </div>

          <span className="font-semibold">
            FitSphere
          </span>
        </div>
      </SidebarHeader>

      {/* Role Based Navigation */}
      <SidebarContent>
        <NavMain items={roleData.navMain} />
      </SidebarContent>

      {/* Logged In User */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />

    </Sidebar>
  );
}
