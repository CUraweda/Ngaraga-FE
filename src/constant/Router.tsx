import { createBrowserRouter } from "react-router-dom";
import { listedParam } from "./listed.param";
import Login from "@/pages/Login";
import Register from "@/pages/user/Register";
import Home from "@/pages/Home";
import LayoutHome from "@/components/Layout/LayoutHome";

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: listedParam.signin,
    element: <Login />,
  },
  {
    path: listedParam.signup,
    element: <Register />,
  },
  {
    path: listedParam.home,
    element: <LayoutHome />,
    children: [{ path: listedParam.home, element: <Home /> }],
  },
  
]);

export default Route;
