import { createContext, useContext } from "react";

export const SidebarContext = createContext<SideBarContextType | null>(null);

export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value == null)
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  return value;
}
