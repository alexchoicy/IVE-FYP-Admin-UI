import { Children } from "react";
import CompanyLogo from "~/assets/logo.png";
import Icon from "~/assets/Icon.png";
import { twMerge } from "tailwind-merge";
import {
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarRightExpand,
  IconLogout,
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebarContext } from "~/context/useSidebarContext";
import { bottomSideBar, MainSideBar } from "~/configs/SideBarConfig";
import { useUserInfoContext } from "~/context/UserInfoContext";
import { LogoutRequest } from "~/data/Request/AuthRequest";

export function Sidebar() {
  const { isSideBarOpen, toggle } = useSidebarContext();
  const { userInfo } = useUserInfoContext();
  const location = useLocation();
  const navigate = useNavigate();
  async function Logout() {
    await LogoutRequest();
    localStorage.removeItem("userInfo");
    navigate("/login", { replace: true });
  }
  return (
    <>
      <aside
        className={`pd-4 sticky top-0  h-full flex-col justify-between overflow-y-auto bg-SIDEBAR-BACKGROUND p-5 ${isSideBarOpen ? "flex" : "hidden"}`}
      >
        <div>
          <div className="flex flex-row items-center justify-between">
            <Link to="/" className="flex flex-row">
              <img className="h-12 w-12 object-cover" src={CompanyLogo} />
              <div className="flex w-full items-center gap-4 p-3 text-lg font-bold text-white">
                Easy Park
              </div>
            </Link>
            <div onClick={toggle} className="cursor-pointer text-lg text-white">
              <IconLayoutSidebarRightExpand />
            </div>
          </div>
          <LargeSidebarSection title={"Main"}>
            {MainSideBar.map((item) => (
              <LargeSidebarItem
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                url={item.url}
                isActive={location.pathname === item.url}
              ></LargeSidebarItem>
            ))}
          </LargeSidebarSection>
        </div>
        <div>
          <LargeSidebarSection title={"Settings"} className="">
            {bottomSideBar.map((item) => (
              <LargeSidebarItem
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                url={item.url}
                isActive={location.pathname === item.url}
              ></LargeSidebarItem>
            ))}
          </LargeSidebarSection>
          <div className="flex flex-row gap-3">
            <div>
              <img className="h-10 w-10 rounded-full object-cover" src={Icon} />
            </div>
            <div className="font-bold text-SIDEBAR-TEXT">
              <div>
                {userInfo?.firstName}, {userInfo?.lastName}
              </div>
              <div>{userInfo?.email}</div>
            </div>
            <div className="text-SIDEBAR-LOGOUT hover:cursor-pointer">
              <IconLogout onClick={Logout} />
            </div>
          </div>
        </div>
      </aside>
      {/* This is the sidebar when it is collapsed */}
      <aside
        className={` pd-4 relative top-0 h-full flex-col justify-between overflow-y-auto overflow-x-hidden bg-SIDEBAR-BACKGROUND p-5 ${isSideBarOpen ? "hidden" : "flex"}`}
      >
        <div className="flex flex-row items-center justify-between">
          <Link to="/">
            <img src={CompanyLogo} className="h-12 w-12 object-cover" />
          </Link>
          <div className="cursor-pointer text-SIDEBAR-TEXT" onClick={toggle}>
            <IconLayoutSidebarLeftExpand />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="pt-5">
            {MainSideBar.map((item) => (
              <SmallSidebarItem
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                url={item.url}
                isActive={location.pathname === item.url}
              ></SmallSidebarItem>
            ))}
          </div>
        </div>
        <div>
          <div className="">
            {bottomSideBar.map((item) => (
              <SmallSidebarItem
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                url={item.url}
                isActive={location.pathname === item.url}
              ></SmallSidebarItem>
            ))}
          </div>
          <div className="flex justify-center">
            <img src={Icon} className="h-12 w-12 rounded-full object-cover " />
          </div>
        </div>
      </aside>
    </>
  );
}

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
  className,
}: LargeSidebarSectionProps) {
  const childrenArary = Children.toArray(children);
  const visibleChildren = childrenArary.slice(0, visibleItemCount);
  return (
    <div className={twMerge("py-5", className)}>
      <div className="text-SIDEBAR-TITLE">{title}</div>
      {visibleChildren}
    </div>
  );
}

function LargeSidebarItem({
  title,
  url,
  Icon,
  className,
  isActive,
}: LargeSidebarItemProps) {
  return (
    <Link
      to={url}
      className={twMerge(
        `flex w-full items-center gap-4 rounded-lg p-3 text-SIDEBAR-TEXT hover:bg-SIDEBAR-HOVER ${
          isActive ? "bg-SIDEBAR-ACTIVE font-bold " : undefined
        }`,
        className,
      )}
    >
      <Icon />
      <div>{title}</div>
    </Link>
  );
}

function SmallSidebarItem({ title, url, Icon, isActive }: SideBarItemProps) {
  return (
    <Link
      to={url}
      className={twMerge(
        `hover:bg-SIDEBAR-HOVE max-w-25 flex w-full flex-col items-center gap-4 rounded-lg py-2 text-SIDEBAR-TEXT ${
          isActive ? "bg-SIDEBAR-ACTIVE font-bold " : undefined
        }`,
      )}
    >
      <Icon />
      <div>{title}</div>
    </Link>
  );
}
