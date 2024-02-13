import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Not_Found } from "./pages/Not-Found.tsx";
import { Settings } from "./pages/settings.tsx";
import { Home } from "./pages/Home.tsx";
import { Profiles } from "./pages/Profiles.tsx";
import { Profile } from "./pages/Profile.tsx";
import { Layout } from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Not_Found />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "profiles",
        element: <Profiles />,
        children: [{ path: "/profiles/:id", element: <Profile /> }],
      },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
