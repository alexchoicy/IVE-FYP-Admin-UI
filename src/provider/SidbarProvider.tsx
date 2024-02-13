import { createContext, useState } from "react";

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
