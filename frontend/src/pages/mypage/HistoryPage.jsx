import { useState, useEffect } from "react";
import MyPageSideBar from "../../components/wrapper/MyPageSideBar";
import api from "../../lib/axios";
import { formatDate } from "../../utils/dateUtils";

const DonationListPage = () => {
  const [activeTab, setActiveTab] = useState("donation");
  const size = 6;
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const PAGE_GROUP_SIZE = 10;
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const tabs = [
    { id: "donation", name: "기부" },
    { id: "receipt", name: "수혜" },
  ];

  // API 호출 함수
  const fetchData = async (tabType, page) => {
    setIsLoading(true);
    try {
      const endpoint =
        tabType === "donation"
          ? "/users/my-info/redcards/donations"
          : "/users/my-info/redcards/receipts";

      const response = await api.get(endpoint, {
        params: {
          page: page,
          size,
        },
      });

      const data = response.data;

      setContent(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // 에러 처리 로직 추가 필요
    } finally {
      setIsLoading(false);
    }
  };

  // 탭 변경 핸들러
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setPage(1); // 페이지를 1로 리셋
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  // 이전/다음 그룹으로 이동
  const handlePrevGroup = () => {
    if (startPage > 1) {
      setPage(startPage - 1);
    }
  };

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setPage(startPage + PAGE_GROUP_SIZE);
    }
  };

  // 탭이나 페이지가 변경될 때마다 데이터 요청
  useEffect(() => {
    fetchData(activeTab, page);
  }, [activeTab, page]);

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <MyPageSideBar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px]">
            <h1 className="text-2xl font-bold mb-6">기부 / 수혜 목록</h1>

            {/* 탭 */}
            <div className="mb-6 border-b">
              <div className="flex space-x-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`pb-3 px-2 -mb-px text-sm font-medium ${
                      activeTab === tab.id
                        ? "text-red-600 border-b-2 border-red-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 카드 리스트로 변경 */}
            {isLoading ? (
              <div className="py-4 text-center">로딩 중...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-sm text-gray-500">
                          {activeTab === "donation" ? "받는 분" : "보내신 분"}
                        </span>
                        <p className="font-medium">
                          {activeTab === "donation"
                            ? item.receiverName
                            : item.donorName}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">기부 개수</span>
                        <p className="font-medium text-red-600">
                          {item.donationAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="text-sm text-gray-500">기부 메시지</span>
                      <p className="mt-1 text-gray-700">
                        {item.donationMessage}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500">
                      {formatDate(item.donationDate)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 페이지네이션 */}
            <div className="mt-6 flex flex-col items-center space-y-2 justify-between">
              <div className="flex justify-center items-center w-full">
                <nav className="flex space-x-2 justify-between">
                  <button
                    onClick={handlePrevGroup}
                    disabled={startPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    이전
                  </button>

                  {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                  ).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 border rounded ${
                        pageNum === page
                          ? "bg-red-600 text-white"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={handleNextGroup}
                    disabled={endPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    다음
                  </button>
                </nav>
              </div>

              <div className="text-sm text-gray-500">
                {page} / {totalPages} 페이지 (총 {totalElements}개)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationListPage;
