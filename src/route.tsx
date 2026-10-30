import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipe from "./pages/Recipe";
import Layout from "./layouts/Layout";
import ProtectedRoute, { PublicOnlyRoute } from "./components/Routeguards";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Recipe />,
      },
      {
        path: "/recipes/:id",
        element: <Recipe />,
      },
      {
        path: "/community",
        element: <Recipe />,
      },
      {
        path: "/terms-conditions",
        element: <Terms />,
      },
      {
        path: "/privacy-policy",
        element: <Privacy />,
      },
      {
        path: "*",
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
// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/explore", element: <Explore /> },
//       { path: "/recipe/:id", element: <RecipeDetails /> },
//       {
//         // TODO: ProtectedRoute redirects to /login when there is no user
//         element: <ProtectedRoute />,
//         children: [
//           { path: "/favorites", element: <Favorites /> },
//           { path: "/my-recipes", element: <MyRecipes /> },
//           { path: "/shopping-list", element: <ShoppingList /> },
//           { path: "/profile", element: <Profile /> },
//         ],
//       },
//     ],
//   },
//   { path: "/login", element: <LoginPage /> },
//   { path: "/signup", element: <SignupPage /> },
//   { path: "*", element: <NotFound /> },
// ]);
export default router;
