import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../lib/axios";

const MainPage = () => {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);

  // 샘플 데이터 - 실제로는 API나 props로 받아와야 합니다
  const boardItems = [
    {
      id: 1,
      title: "긴급) 백혈병 환우를 위한 헌혈증이 필요합니다",
      date: "2024.12.15",
    },
    {
      id: 2,
      title: "수술을 앞둔 딸을 위해 도움을 요청드립니다",
      date: "2024.12.14",
    },
    { id: 3, title: "희귀혈액형 보유자를 찾습니다", date: "2024.12.14" },
    { id: 4, title: "정기 헌혈 캠페인 참여해주세요", date: "2024.12.13" },
    { id: 5, title: "헌혈증 기부 감사합니다", date: "2024.12.13" },
  ];

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await api.get("/donations/top");
        const formattedRankings = response.data.map((donor) => ({
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
  }, []);

  return (
    <main className="flex-grow bg-gray-50 py-8">
      {/* Stats Section */}
      <section className="mb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-red-600 mb-2">1,234장</p>
              <p className="text-gray-600">현재까지 기부된 현혈증</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-red-600 mb-2">567명</p>
              <p className="text-gray-600">도움을 받은 환자</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-red-600 mb-2">89건</p>
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
            <h3 className="text-xl font-bold mb-4">최근 게시글</h3>
            <div className="space-y-4">
              {boardItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center hover:bg-gray-50 p-2 rounded cursor-pointer"
                  onClick={() => navigate(`/board/${item.id}`)}
                >
                  <span className="text-gray-800 flex-1 truncate">
                    {item.title}
                  </span>
                  <span className="text-gray-500 text-sm ml-4">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking Section - 데이터 로딩 상태 처리 추가 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">이달의 기부왕</h3>
            <div className="space-y-4">
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
