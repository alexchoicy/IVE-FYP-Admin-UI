import { createContext, useState } from "react";
import { SidebarProviderProps } from "../@types/Providers/SideBar";
import { SideBarContextType } from "../@types/Contexts/SideBar";

export const SidebarContext = createContext<SideBarContextType | null>(null);

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  function toggle() {
    setIsSideBarOpen((prev) => !prev);
  }

  return (
    <SidebarContext.Provider
      value={{
        isSideBarOpen,
        toggle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
