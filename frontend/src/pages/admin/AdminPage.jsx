import { useEffect, useState } from "react";
import api from "../../lib/axios";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [hotList, setHotList] = useState([]);
  const [likedList, setLikeList] = useState([]);

  const url = "/admin";

  const fetchData = async () => {
    try {
      const response = await api.get(`${url}/statistics`);
      setData(response.data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const fetchHot = async () => {
    try {
      const response = await api.get(`${url}/hot`);
      setHotList(response.data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const fetchLike = async () => {
    try {
      const response = await api.get(`${url}/like`);
      setLikeList(response.data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchHot();
    fetchLike();
  }, []);

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { title: "가입한 회원 수", value: data.userCount },
            { title: "레드박스 보유 현황", value: data.redcardCountInRedbox },
            { title: "누적 기부 수", value: data.sumDonation },
            { title: "요청 사항", value: data.requestCount, link: true },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-6 text-center rounded-lg shadow-md ${
                item.link
                  ? "border-2 border-red-600 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  : "bg-white"
              }`}
              onClick={
                item.link
                  ? () => (window.location.href = "/admin/approve")
                  : undefined
              }
            >
              <h2
                className={`text-sm ${
                  item.link
                    ? "text-red-600 font-semibold"
                    : "text-gray-400 font-medium"
                }`}
              >
                {item.title}
              </h2>
              <p className="text-3xl font-bold text-red-600">{item.value}</p>
            </div>
          ))}
        </div>
        {/* 게시글 섹션들 */}
        <div className="grid grid-cols-2 gap-8">
          <ContentSection title="인기 게시글" list={hotList} />
          <ContentSection title="좋아요한 게시글" list={likedList} />
        </div>
      </div>
    </div>
  );
};

const ContentSection = ({ title, list }) => (
  <div className="bg-white border rounded-lg shadow-sm">
    <h3 className="text-lg font-semibold p-3">{title}</h3>
    <div className="flex bg-gray-50 py-2 border-b">
      <div className="w-16 text-center text-sm font-medium text-gray-500">
        번호
      </div>
      <div className="flex-1 px-6 text-sm font-medium text-gray-500">제목</div>
      <div className="w-24 text-center text-sm font-medium text-gray-500">
        작성일
      </div>
    </div>
    {list.length > 0 ? (
      <div className="divide-y h-[400px]">
        {list.slice(0, 5).map((request) => (
          <div
            key={request.id}
            className="flex items-center py-[12px] hover:bg-gray-50"
          >
            <div className="w-16 text-center text-sm text-gray-500">
              {request.id}
            </div>
            <div className="flex-1 px-6">{request.title}</div>
            <div className="w-24 text-center text-sm text-gray-500">
              {request.date}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex items-center justify-center h-[400px] text-gray-500">
        등록된 게시글이 없습니다.
      </div>
    )}
  </div>
);

export default AdminPage;
