import { useContext } from "react";
import { SidebarContext } from "../provider/SidbarProvider";

export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value == null)
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  return value;
}
