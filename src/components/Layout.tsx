import { Outlet } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { SidebarProvider } from "~/provider/SidbarProvider";
import { UserInfoProvider } from "~/provider/UserInfoProvider";

export function Layout() {
  return (
    <>
      <SidebarProvider>
        <UserInfoProvider>
          <div className="flex h-screen w-screen flex-row">
            <Sidebar />
            <div className="h-full w-full bg-slate-200">
              <Outlet />
            </div>
          </div>
        </UserInfoProvider>
      </SidebarProvider>
    </>
  );
}
