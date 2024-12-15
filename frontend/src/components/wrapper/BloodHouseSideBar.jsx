import Sidebar from "../Sidebar";

export default function BloodHouseSideBar() {
  const CATEGORY_NAME = "헌혈의 집";
  const BLOOD_HOUSE_SIDEBAR_URLS = [
    {
      key: "reservation",
      name: "조회 및 예약",
      url: "/blood-house/reservation",
    },
  ];
  return <Sidebar category={CATEGORY_NAME} param={BLOOD_HOUSE_SIDEBAR_URLS} />;
}
