
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CalendarDays,
  Utensils,
  TrendingUp,
  UserRound,
  ClipboardList,
  CreditCard,
  Settings,
  MessageSquare,
  Building2,
  BarChart3,
} from "lucide-react";

import type { AppRole } from "@/shared/types/role/role";

export const sidebarConfig = {

  // USER SIDEBAR
  User: {
    navMain: [
      {
        title: "Dashboard",
        url: "/user/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        title: "My Workouts",
        url: "/user/workouts",
        icon: <Dumbbell />,
      },
      {
        title: "Diet Plans",
        url: "/user/diet",
        icon: <Utensils />,
      },
      {
        title: "Progress",
        url: "/user/progress",
        icon: <TrendingUp />,
      },
      {
        title: "Calendar",
        url: "/user/calendar",
        icon: <CalendarDays />,
      },
      {
        title: "Messages",
        url: "/user/messages",
        icon: <MessageSquare />,
      },
      {
        title: "Profile",
        url: "/user/profile",
        icon: <UserRound />,
      },
    ],

    projects: [],
  },

  // GYM OWNER SIDEBAR
  Gymowner: {
    navMain: [
      {
        title: "Dashboard",
        url: "/gym-owner/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        title: "Gyms",
        url: "/gym-owner/gyms",
        icon: <Building2 />,
      },
      {
        title: "Members",
        url: "/gym-owner/members",
        icon: <Users />,
      },
      {
        title: "Trainers",
        url: "/gym-owner/trainers",
        icon: <UserRound />,
      },
      {
        title: "Memberships",
        url: "/gym-owner/memberships",
        icon: <CreditCard />,
      },
      {
        title: "Attendance",
        url: "/gym-owner/attendance",
        icon: <ClipboardList />,
      },
      {
        title: "Analytics",
        url: "/gym-owner/analytics",
        icon: <BarChart3 />,
      },
      {
        title: "Settings",
        url: "/gym-owner/settings",
        icon: <Settings />,
      },
    ],

    projects: [],
  },

  // TRAINER SIDEBAR
  Trainer: {
    navMain: [
      {
        title: "Dashboard",
        url: "/trainer/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        title: "My Clients",
        url: "/trainer/clients",
        icon: <Users />,
      },
      {
        title: "Workout Plans",
        url: "/trainer/workouts",
        icon: <Dumbbell />,
      },
      {
        title: "Schedule",
        url: "/trainer/schedule",
        icon: <CalendarDays />,
      },
      {
        title: "Messages",
        url: "/trainer/messages",
        icon: <MessageSquare />,
      },
      {
        title: "Profile",
        url: "/trainer/profile",
        icon: <UserRound />,
      },
    ],

    projects: [],
  },

   // ADMIN SIDEBAR
  Admin: {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: <LayoutDashboard />,
      },
       {
        title: "Gyms",
        url: "/gym-owner/gyms",
        icon: <Building2 />,
      },
      {
        title: "My Clients",
        url: "/admin/clients",
        icon: <Users />,
      },
      {
        title: "Workout Plans",
        url: "/admin/workouts",
        icon: <Dumbbell />,
      },
      {
        title: "Schedule",
        url: "/admin/schedule",
        icon: <CalendarDays />,
      },
      {
        title: "Messages",
        url: "/admin/messages",
        icon: <MessageSquare />,
      },
      {
        title: "Profile",
        url: "/admin/profile",
        icon: <UserRound />,
      },
    ],

    projects: [],
  },

} satisfies Record<AppRole, {
  navMain: {
    title: string;
    url: string;
    icon: React.ReactNode;
  }[];
  projects: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}>;
