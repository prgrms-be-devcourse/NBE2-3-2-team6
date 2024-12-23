import { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [hotList, setHotList] = useState([]);
  const [likedList, setLikeList] = useState([]);

  const url = "https://ab876606-577e-4a4b-87b5-90e8cac3a98f.mock.pstmn.io/admin/main";

  const fetchData = async () => {
    try {
      const { data: result } = await axios.get(url);
      const { data: resultHot } = await axios.get(`${url}/hot`);
      const { data: resultLiked } = await axios.get(`${url}/like`);
      setData(result);
      setHotList(resultHot.articles);
      setLikeList(resultLiked.articles);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-8">
      {/* 상단 지표 섹션 */}
      <div className="flex justify-between space-x-4">
        {[
          { title: "가입한 회원 수", value: data.member_cnt },
          { title: "레드박스 보유 현황", value: data.rebox_cnt },
          { title: "누적 기부 수", value: data.total_cnt },
          { title: "요청 사항", value: data.pending_cnt, link: true },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`w-[17rem] p-6 text-center rounded-lg shadow-md ${
              item.link ? "border-2 border-red-600 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300" : "bg-white"
            }`}
            onClick={item.link ? () => (window.location.href = "/admin/approve") : undefined}
          >
            <h2 className={`text-sm ${item.link ? "text-red-600 font-semibold" : "text-gray-400 font-medium"}`}>
              {item.title}
            </h2>
            <p className="text-3xl font-bold text-red-600">{item.value}</p>
          </div>
        ))}
      </div>

      {/* 인기 게시글 목록 */}
      <ContentSection title="인기 게시글" list={hotList} />

      {/* 좋아요한 게시글 목록 */}
      <ContentSection title="좋아요한 게시글" list={likedList} />
    </div>
  );
};

const ContentSection = ({ title, list }) => (
  <div className="border rounded-lg">
    <div className="flex bg-gray-50 py-3 border-b">
      <div className="w-16 text-center text-sm font-medium text-gray-500">번호</div>
      <div className="flex-1 px-6 text-sm font-medium text-gray-500">제목</div>
      <div className="w-24 text-center text-sm font-medium text-gray-500">작성일</div>
      <div className="w-20 text-center text-sm font-medium text-gray-500">조회수</div>
    </div>
    <div className="divide-y">
      {list.map((article) => (
        <div key={article.id} className="flex items-center py-3 hover:bg-gray-50">
          <div className="w-16 text-center text-sm text-gray-500">{article.id}</div>
          <div className="flex-1 px-6">{article.title}</div>
          <div className="w-24 text-center text-sm text-gray-500">{article.date}</div>
          <div className="w-20 text-center text-sm text-gray-500">{article.views}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AdminPage;