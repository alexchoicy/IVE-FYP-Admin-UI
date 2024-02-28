import { useEffect, useState } from "react";
import { UserInfoContext } from "~/context/UserInfoContext";

export function UserInfoProvider({ children }: ProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("user");
    }
  }, [userInfo]);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}
