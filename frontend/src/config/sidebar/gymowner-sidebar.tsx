import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CreditCard,
  UserRound,
  Settings,
  BarChart,
  Building2,
} from "lucide-react"

export const gymownerSidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/gymowner/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Gyms",
      url: "/gymowner/gyms",
      icon: Building2,
    },
    {
      title: "Members",
      url: "/gymowner/members",
      icon: Users,
    },
    {
      title: "Trainers",
      url: "/gymowner/trainers",
      icon: UserRound,
    },
    {
      title: "Workout Management",
      url: "/gymowner/workouts",
      icon: Dumbbell,
    },
    {
      title: "Membership Plans",
      url: "/gymowner/memberships",
      icon: CreditCard,
    },
    {
      title: "Analytics",
      url: "/gymowner/analytics",
      icon: BarChart,
    },
    {
      title: "Settings",
      url: "/gymowner/settings",
      icon: Settings,
    },
  ],
}