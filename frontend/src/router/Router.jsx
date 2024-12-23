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
import AdminNoticeDetailPage from "../pages/admin/AdminNoticeDetailPage";
import AdminRequestDetailPage from "../pages/admin/AdminRequestDetailPage";
import AdminNoticeWritePage from "../pages/admin/AdminNoticeWritePage";
import DashboardPage from "../pages/mypage/DashboardPage";
import RedcardPage from "../pages/mypage/RedcardPage";
import ProfilePage from "../pages/mypage/ProfilePage";
import HistoryPage from "../pages/mypage/HistoryPage";
import RequestListPage from "../pages/mypage/RequestListPage";
import FindAccountPage from "../pages/FindAccountPage";
import FindResultPage from "../pages/FindResultPage";
import RequestDetailPage from "../pages/community/RequestDetailPage";

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
        element: <RequestDetailPage />
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
      {
        path: "admin/community/notice/:id",
        element: <AdminNoticeDetailPage />,
      },
      {
        path: "admin/community/notice/write",
        element: <AdminNoticeWritePage />,
      },
      {
        path: "admin/community/request/:id",
        element: <AdminRequestDetailPage />,
      },
    ],
  }
]);

export default router;