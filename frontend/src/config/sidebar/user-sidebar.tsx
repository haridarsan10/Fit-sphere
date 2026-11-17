import {
  LayoutDashboard,
  Dumbbell,
  CalendarDays,
  TrendingUp,
  Utensils,
  CreditCard,
  UserRound,
  Settings,
} from "lucide-react"

export const userSidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Workout",
      url: "/user/workout",
      icon: Dumbbell,
      items: [
        {
          title: "My Workout Plans",
          url: "/user/workout/plans",
        },
        {
          title: "Start Workout",
          url: "/user/workout/start",
        },
      ],
    },
    {
      title: "Progress",
      url: "/user/progress",
      icon: TrendingUp,
    },
    {
      title: "Diet",
      url: "/user/diet",
      icon: Utensils,
    },
    {
      title: "Attendance",
      url: "/user/attendance",
      icon: CalendarDays,
    },
    {
      title: "Membership",
      url: "/user/membership",
      icon: CreditCard,
    },
    {
      title: "Profile",
      url: "/user/profile",
      icon: UserRound,
    },
    {
      title: "Settings",
      url: "/user/settings",
      icon: Settings,
    },
  ],
}