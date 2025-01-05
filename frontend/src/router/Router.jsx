import { createBrowserRouter, redirect } from "react-router-dom";
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
import AdminPage from "../pages/admin/AdminPage";
import AdminRequestPage from "../pages/admin/AdminRequestPage";
import AdminLayout from "../layout/AdminLayout";
import AdminArticlePage from "../pages/admin/AdminArticlePage";
import AdminNoticePage from "../pages/admin/AdminNoticePage";
import ApprovalRequestPage from "../pages/admin/ApprovalRequestPage";
import AdminNoticeDetailPage from "../pages/admin/AdminNoticeDetailPage";
import AdminRequestDetailPage from "../pages/admin/AdminRequestDetailPage";
import AdminNoticeWritePage from "../pages/admin/AdminNoticeWritePage";
import ApprovalRequestDetailPage from "../pages/admin/ApprovalRequestDetailPage";
import DashboardPage from "../pages/mypage/DashboardPage";
import RedcardPage from "../pages/mypage/RedcardPage";
import ProfilePage from "../pages/mypage/ProfilePage";
import HistoryPage from "../pages/mypage/HistoryPage";
import RequestListPage from "../pages/mypage/RequestListPage";
import FindAccountPage from "../pages/FindAccountPage";
import FindResultPage from "../pages/FindResultPage";
import RequestDetailPage from "../pages/community/RequestDetailPage";
import AdminNoticeModifyPage from "../pages/admin/AdminNoticeModifyPage";

import MyRequestDetailPage from "../pages/mypage/MyRequestDetailPage";
import MyRequestModifyPage from "../pages/mypage/MyRequestModifyPage";

import { decodeJWT } from "../lib/axios";

const requireAdmin = () => {
  const token = localStorage.getItem("accessToken");
  const decodedToken = token ? decodeJWT(token) : null;

  if (decodedToken?.role !== "ROLE_ADMIN") {
    return redirect("/");
  }
  return null;
};

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
        path: "/community/request/:id",
        element: <RequestDetailPage />,
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
      {
        path: "/mypage/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/mypage/redcard",
        element: <RedcardPage />,
      },
      {
        path: "/mypage/profile",
        element: <ProfilePage />,
      },
      {
        path: "/mypage/request",
        element: <RequestListPage />,
      },
      {
        path: "/mypage/request/:id",
        element: <MyRequestDetailPage />,
      },
      {
        path: "/mypage/request/modify/:id",
        element: <MyRequestModifyPage />,
      },
      {
        path: "/mypage/history",
        element: <HistoryPage />,
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
      {
        path: "/find/account",
        element: <FindAccountPage />,
      },
      {
        path: "/find/result",
        element: <FindResultPage />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    loader: requireAdmin,
    children: [
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/admin/community/request",
        element: <AdminRequestPage />,
      },
      {
        path: "/admin/community/article",
        element: <AdminArticlePage />,
      },
      {
        path: "/admin/community/notice",
        element: <AdminNoticePage />,
      },
      {
        path: "/admin/approve",
        element: <ApprovalRequestPage />,
      },
      {
        path: "/admin/approve/:id",
        element: <ApprovalRequestDetailPage/>,
      },
      {
        path: "/admin/community/notice/:id",
        element: <AdminNoticeDetailPage />,
      },
      {
        path: "/admin/community/notice/modify/:id",
        element: <AdminNoticeModifyPage />,
      },
      {
        path: "/admin/community/notice/write",
        element: <AdminNoticeWritePage />,
      },
      {
        path: "/admin/community/request/:id",
        element: <AdminRequestDetailPage />,
      },
    ],
  },
]);

export default router;
