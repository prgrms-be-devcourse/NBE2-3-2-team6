import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../lib/axios";

const MainPage = () => {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);
  const [boardItems, setBoardItems] = useState([]);
  const [data, setData] = useState({
    totalDonatedCards: 0,
    totalPatientsHelped: 0,
    inProgressRequests: 0,
  });

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await api.get("/donations/top");
        const formattedRankings = response.data.donors.map((donor) => ({
          rank: donor.rank,
          name: donor.donorName,
          donations: donor.totalAmount,
        }));
        setRankings(formattedRankings);
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
        // 에러 처리 로직 추가 (필요한 경우)
      }
    };
    fetchRankings();

    const fetchBoardItems = async () => {
      try {
        const response = await api.get("/notices/top5");
        const formattedBoardItems = response.data.notices.map((item) => ({
          id: item.noticeNo,
          title: item.title,
          date: item.createdDate,
        }));
        setBoardItems(formattedBoardItems);
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
        // 에러 처리 로직 추가 (필요한 경우)
      }
    };
    fetchBoardItems();
    const fetchData = async () => {
      try {
        const response = await api.get("/redbox/stats");
        setData(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        alert("레드박스 데이터를 불러오는 데 문제가 발생했습니다.");
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex-grow bg-gray-50 py-8">
      {/* Stats Section */}
      <section className="mb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-red-600 mb-2">
                {data.totalDonatedCards} 개
              </p>
              <p className="text-gray-600">현재까지 기부된 현혈증</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-red-600 mb-2">
                {data.totalPatientsHelped} 명
              </p>
              <p className="text-gray-600">도움을 받은 환자</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-red-600 mb-2">
                {data.inProgressRequests} 건
              </p>
              <p className="text-gray-600">진행중인 기부 요청</p>
            </div>
          </div>
        </div>
      </section>

      {/* Board and Ranking Section */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Board Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">최근 공지사항</h3>
            <div className="space-y-4 h-[250px]">
              {" "}
              {/* 높이 고정 */}
              {boardItems.length > 0 ? (
                boardItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center hover:bg-gray-50 p-2 rounded cursor-pointer"
                    onClick={() => navigate(`/community/notice/${item.id}`)}
                  >
                    <span className="text-gray-800 flex-1 truncate">
                      {item.title}
                    </span>
                    <span className="text-gray-500 text-sm ml-4">
                      {item.date}
                    </span>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  등록된 공지사항이 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* Ranking Section - 데이터 로딩 상태 처리 추가 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">이달의 기부왕</h3>
              <span className="text-sm text-gray-500">30분마다 갱신</span>
            </div>
            <div className="space-y-4 h-[250px]">
              {rankings.length > 0 ? (
                rankings.map((rank) => (
                  <div
                    key={rank.rank}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center">
                      <span
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          rank.rank <= 3
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {rank.rank}
                      </span>
                      <span className="ml-3 text-gray-800">{rank.name}</span>
                    </div>
                    <span className="text-gray-600">{rank.donations}장</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  랭킹 데이터를 불러오는 중...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
