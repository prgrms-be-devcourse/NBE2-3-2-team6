import Sidebar from "../Sidebar";

export default function MyPageSideBar() {
  const CATEGORY_NAME = "마이페이지";
  const MY_PAGE_SIDEBAR_URLS = [
    {
      key: "dashboard",
      name: "대시보드",
      url: "/mypage/dashboard",
    },
    {
      key: "redcard",
      name: "나의 헌혈증 목록",
      url: "/mypage/redcard",
    },
    {
      key: "profile",
      name: "회원 정보 수정",
      url: "/mypage/profile",
    },
    {
      key: "request",
      name: "나의 요청 목록",
      url: "/mypage/request",
    },
    {
      key: "history",
      name: "기부 / 수혜 목록",
      url: "/mypage/history",
    },
  ];
  return <Sidebar category={CATEGORY_NAME} param={MY_PAGE_SIDEBAR_URLS} />;
}
