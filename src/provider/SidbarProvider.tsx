import { useState } from "react";
import { SidebarContext } from "~/context/useSidebarContext";

export function SidebarProvider({ children }: ProviderProps) {
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
