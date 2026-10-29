import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipe from "./pages/Recipe";
import Layout from "./layouts/Layout";
import ProtectedRoute, { PublicOnlyRoute } from "./components/Routeguards";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recipe",
        element: <Recipe />,
      },
      {
        path: "terms-conditions",
        element: <Recipe />,
      },
      {
        path: "/privacy-policy",
        element: <Recipe />,
      },
    ],
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forgot-password",
        element: <Signup />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [],
  },
]);

export default router;
