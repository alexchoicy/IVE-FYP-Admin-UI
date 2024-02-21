import { Outlet } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { SidebarProvider } from "../provider/SidbarProvider";

export function Layout() {
  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-screen flex-row">
          <Sidebar />
          <Outlet />
        </div>
      </SidebarProvider>
    </>
  );
}
