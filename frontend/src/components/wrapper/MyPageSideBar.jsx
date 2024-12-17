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
      key: "password",
      name: "비밀번호 수정",
      url: "/mypage/password",
    },
    {
      key: "donation",
      name: "기부 목록",
      url: "/mypage/donation",
    },
    {
      key: "receipt",
      name: "수혜 목록",
      url: "/mypage/receipt",
    },
  ];
  return <Sidebar category={CATEGORY_NAME} param={MY_PAGE_SIDEBAR_URLS} />;
}
