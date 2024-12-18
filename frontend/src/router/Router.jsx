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
import AdminPage from "../pages/admin/AdminPage";
import AdminRequestPage from "../pages/admin/AdminRequestPage";
import AdminLayout from "../layout/AdminLayout";
import AdminArticlePage from "../pages/admin/AdminArticlePage";
import AdminNoticePage from "../pages/admin/AdminNoticePage";
import ApprovalRequestPage from "../pages/admin/ApprovalRequestPage";

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
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminPage/>,
      },
      {
        path: "/admin/community/request",
        element: <AdminRequestPage/>,
      },
      {
        path: "/admin/community/article",
        element: <AdminArticlePage/>,
      },
      {
        path: "/admin/community/notice",
        element: <AdminNoticePage/>,
      },
      {
        path: "/admin/approve",
        element: <ApprovalRequestPage/>,
      },
    ],
  }
]);

export default router;
