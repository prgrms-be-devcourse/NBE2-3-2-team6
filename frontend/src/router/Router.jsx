import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import NoticePage from "../pages/community/NoticePage";
import RequestPage from "../pages/community/RequestPage";
import ArticlePage from "../pages/community/ArticlePage";
import DefaultLayout from "../layout/DefaultLayout";
import AuthLayout from "../layout/AuthLayout";
import NoticeDetailPage from "../pages/community/NoticeDetailPage";
import RequestWritePage from "../pages/community/RequestWritePage";
import DonatePage from "../pages/DonatePage";
import CenterFindPage from "../pages/center/CenterFindPage";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/donate",
        element: <DonatePage />,
      },
      {
        path: "/community/notice",
        element: <NoticePage />,
      },
      {
        path: "/community/notice/:id",
        element: <NoticeDetailPage />,
      },
      {
        path: "/community/request",
        element: <RequestPage />,
      },
      {
        path: "/community/request/write",
        element: <RequestWritePage />,
      },
      {
        path: "/community/article",
        element: <ArticlePage />,
      },
      {
        path: "/center",
        element: <CenterFindPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

export default router;
