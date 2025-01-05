import Sidebar from "../Sidebar";

export default function CommunitySideBar() {
  const CATEGORY_NAME = "커뮤니티";
  const COMMUNITY_SIDEBAR_URLS = [
    {
      key: "notice",
      name: "공지사항",
      url: "/community/notice",
    },
    {
      key: "request",
      name: "요청게시판",
      url: "/community/request",
    },
    {
      key: "article",
      name: "헌혈 기사",
      url: "/community/article",
    },
  ];
  return <Sidebar category={CATEGORY_NAME} param={COMMUNITY_SIDEBAR_URLS} />;
}
