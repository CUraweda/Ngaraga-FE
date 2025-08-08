import { createBrowserRouter } from "react-router-dom";
import { listedParam, listedParamAdmin } from "./listed.param";
import ProtectedLayout from "./ProtectedLayout";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/user/Register"));
const Home = lazy(() => import("@/pages/Home"));
const LayoutHome = lazy(() => import("@/components/Layout/LayoutHome"));
const HomeMarket = lazy(() => import("@/pages/user/HomeMarket"));
const ProfileUser = lazy(() => import("@/pages/user/ProfileUser"));
const LayoutAdmin = lazy(() => import("@/components/Layout/LayoutAdmin"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Master = lazy(() => import("@/pages/admin/Collections/Master"));
const Category = lazy(() => import("@/pages/admin/Collections/Category"));
const Series = lazy(() => import("@/pages/admin/Collections/Series"));
const Cards = lazy(() => import("@/pages/admin/Collections/Cards"));
const CardDetail = lazy(() => import("@/pages/admin/Collections/CardDetail"));
const DetailCard = lazy(() => import("@/pages/user/DetailCard"));
const User = lazy(() => import("@/pages/admin/User"));
const RankedCollectors = lazy(() => import("@/pages/RankedCollectors"));
const SettingPage = lazy(() => import("@/pages/admin/SettingPage"));

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: listedParam.signin,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: listedParam.signup,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: listedParam.home,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LayoutHome />
      </Suspense>
    ),
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
        <Suspense fallback={<div>Loading...</div>}>
          <LayoutHome />
        </Suspense>
      </ProtectedLayout>
    ),
    children: [{ path: listedParam.profile, element: <ProfileUser /> }],
  },
  {
    path: listedParamAdmin.home,
    element: (
      <ProtectedLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <LayoutAdmin />
        </Suspense>
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
