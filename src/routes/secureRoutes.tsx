import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "~/components/Layout";
import { checkAuth } from "~/data/Request/AuthRequest";

// function checkAuth(): boolean {
//   const state = localStorage.getItem("userInfo");
//   if (state) {
//     return true;
//   }
//   return false;
// }

export function SecureRoutes() {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = async () => {
      const isLoggedin = await checkAuth();
      setIsLogged(isLoggedin);
      setLoading(false);
    };
    authStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLogged ? (
    <>
      <Layout />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
