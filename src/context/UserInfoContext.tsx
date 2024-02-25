import { createContext, useContext } from "react";

export const UserInfoContext = createContext<userInfoContextType | null>(null);

export function useUserInfoContext() {
  const context = useContext(UserInfoContext);
  if (context == null)
    throw new Error(
      "useUserInfoContext must be used within a UserInfoProvider",
    );
  return context;
}
