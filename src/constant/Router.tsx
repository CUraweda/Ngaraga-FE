import { createBrowserRouter } from "react-router-dom";
import { listedParam, listedParamAdmin } from "./listed.param";
import Login from "@/pages/Login";
import Register from "@/pages/user/Register";
import Home from "@/pages/Home";
import LayoutHome from "@/components/Layout/LayoutHome";
import HomeMarket from "@/pages/user/HomeMarket";
import ProfileUser from "@/pages/user/ProfileUser";
import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import Dashboard from "@/pages/admin/Dashboard";
import Master from "@/pages/admin/Collections/Master";
import Category from "@/pages/admin/Collections/Category";
import Series from "@/pages/admin/Collections/Series";
import Cards from "@/pages/admin/Collections/Cards";
import ProtectedLayout from "./ProtectedLayout";
import CardDetail from "@/pages/admin/Collections/CardDetail";
import DetailCard from "@/pages/user/DetailCard";
import User from "@/pages/admin/User";
import RankedCollectors from "@/pages/RankedCollectors";
import SettingPage from "@/pages/admin/SettingPage";

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "*",
    element: <Home />,
  },
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
    children: [
      { path: listedParam.home, element: <Home /> },
      { path: listedParam.market, element: <HomeMarket /> },
      { path: listedParam.detailCard, element: <DetailCard /> },
      { path: listedParam.rankedCollectors, element: <RankedCollectors /> },
    ],
  },
  {
    path: listedParam.home,
    element: (
      <ProtectedLayout>
        <LayoutHome />
      </ProtectedLayout>
    ),
    children: [
      { path: listedParam.profile, element: <ProfileUser /> },
    ],
  },
  {
    path: listedParamAdmin.home,
    element: (
      <ProtectedLayout>
        <LayoutAdmin />
      </ProtectedLayout>
    ),
    children: [
      { path: listedParamAdmin.home, element: <Dashboard /> },
      { path: listedParamAdmin.master, element: <Master /> },
      { path: listedParamAdmin.category, element: <Category /> },
      { path: listedParamAdmin.series, element: <Series /> },
      { path: listedParamAdmin.cards, element: <Cards /> },
      { path: listedParamAdmin.cardsDetail, element: <CardDetail /> },
      { path: listedParamAdmin.user, element: <User /> },
      { path: listedParamAdmin.setting, element: <SettingPage /> },
    ],
  },

]);

export default Route;
