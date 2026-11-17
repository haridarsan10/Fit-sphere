import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CalendarDays,
  MessageCircle,
  UserRound,
  Settings,
} from "lucide-react"

export const trainerSidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/trainer/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Clients",
      url: "/trainer/clients",
      icon: Users,
    },
    {
      title: "Workout Management",
      url: "/trainer/workouts",
      icon: Dumbbell,
    },
    {
      title: "Schedule",
      url: "/trainer/schedule",
      icon: CalendarDays,
    },
    {
      title: "Messages",
      url: "/trainer/messages",
      icon: MessageCircle,
    },
    {
      title: "Profile",
      url: "/trainer/profile",
      icon: UserRound,
    },
    {
      title: "Settings",
      url: "/trainer/settings",
      icon: Settings,
    },
  ],
}