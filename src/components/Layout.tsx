import { Outlet } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { SidebarProvider } from "~/provider/SidbarProvider";
import { UserInfoProvider } from "~/provider/UserInfoProvider";

export function Layout() {
  return (
    <>
      <SidebarProvider>
        <UserInfoProvider>
          <div className="flex h-full max-h-full w-full max-w-full flex-row">
            <Sidebar />
            <div className="h-screen w-full overflow-y-auto bg-slate-200">
              <Outlet />
            </div>
          </div>
        </UserInfoProvider>
      </SidebarProvider>
    </>
  );
}
