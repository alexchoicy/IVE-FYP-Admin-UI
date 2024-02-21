import { Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";

function checkAuth(): boolean {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
}

export function SecureRoutes() {
  const isLogged = checkAuth();
  return isLogged ? (
    <>
      <Layout />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
