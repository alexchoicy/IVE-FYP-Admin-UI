import {
  Icon24Hours,
  IconBell,
  IconCalendar,
  IconCarGarage,
  IconChartPie,
  IconLayoutDashboard,
  IconReportAnalytics,
  IconSettings,
} from "@tabler/icons-react";

export const MainSideBar: LargeSidebarItemProps[] = [
  {
    title: "Dashboard",
    Icon: IconLayoutDashboard,
    url: "/dashboard",
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
  {
    title: "Parking Lot",
    Icon: IconCarGarage,
    url: "/parking-lot",
  },
  {
    title: "Bookings",
    Icon: IconCalendar,
    url: "/bookings",
  },
  {
    title: "Price",
    Icon: Icon24Hours,
    url: "/price",
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
