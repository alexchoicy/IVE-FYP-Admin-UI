import {
  Icon24Hours,
  IconBell,
  IconCalendar,
  IconChartPie,
  IconHistory,
  IconLayoutDashboard,
  IconMessage,
  IconReportAnalytics,
  IconSettings,
} from "@tabler/icons-react";

export const MainSideBar: LargeSidebarItemProps[] = [
  {
    title: "Dashboard",
    Icon: IconLayoutDashboard,
    url: "/",
  },
  {
    title: "Analytics",
    Icon: IconChartPie,
    url: "/analytics",
  },
  {
    title: "Reports",
    Icon: IconReportAnalytics,
    url: "/reports",
  },
  // {
  //   title: "Parking Lot",
  //   Icon: IconCarGarage,
  //   url: "/parking-lot",
  // },
  {
    title: "Bookings",
    Icon: IconCalendar,
    url: "/bookings",
  },
  {
    title: "Records",
    Icon: IconHistory,
    url: "/records",
  },
  {
    title: "Price",
    Icon: Icon24Hours,
    url: "/price",
  },
  {
    title: "Chats",
    Icon: IconMessage,
    url: "/chats",
  },
];

export const bottomSideBar: LargeSidebarItemProps[] = [
  {
    title: "Settings",
    Icon: IconSettings,
    url: "/settings",
  },
  {
    title: "Notifications",
    Icon: IconBell,
    url: "/notifications",
  },
];
