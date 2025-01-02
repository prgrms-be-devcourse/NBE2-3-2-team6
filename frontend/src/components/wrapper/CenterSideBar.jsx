import Sidebar from "../Sidebar";

export default function CenterSideBar() {
  const CATEGORY_NAME = "헌혈의 집";
  const CENTER_SIDEBAR_URLS = [
    {
      key: "",
      name: "헌혈의 집 찾기",
      url: "/center",
    },
    // {
    //   key: "reserve",
    //   name: "헌혈의 집 예약",
    //   url: "/center/reservation"
    // }
  ];
  return <Sidebar category={CATEGORY_NAME} param={CENTER_SIDEBAR_URLS} />;
}
