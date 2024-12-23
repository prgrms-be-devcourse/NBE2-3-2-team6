import Sidebar from "../Sidebar";

export default function AdminSideBar() {
  const CATEGORY_NAME = "관리자용 게시판";
  const COMMUNITY_SIDEBAR_URLS = [
    {
      key: "notice",
      name: "관리자용 공지사항",
      url: "/admin/community/notice",
    },
    {
      key: "request",
      name: "관리자용 요청게시판",
      url: "/admin/community/request",
    },
    {
      key: "article",
      name: "관리자용 헌혈 기사",
      url: "/admin/community/article",
    },
  ];
  return <Sidebar category={CATEGORY_NAME} param={COMMUNITY_SIDEBAR_URLS} />;
}
