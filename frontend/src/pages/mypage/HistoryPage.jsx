import { useState, useEffect } from "react";
import MyPageSideBar from "../../components/wrapper/MyPageSideBar";

const DonationListPage = () => {
  const [activeTab, setActiveTab] = useState("donation");
  const size = 10;
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
  const fetchData = async (tabType, pageNum) => {
    setIsLoading(true);
    try {
      // API 호출 로직
      const response = await fetch(
        ""
        // `/api/donations?type=${tabType}&page=${pageNum}&size=${size}`
      );
      const data = await response.json();

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

            {/* 게시판 리스트 */}
            <div className="border rounded-lg">
              <div className="flex bg-gray-50 py-3 border-b">
                <div className="w-16 text-center text-sm font-medium text-gray-500">
                  번호
                </div>
                <div className="flex-1 px-6 text-sm font-medium text-gray-500">
                  제목
                </div>
                <div className="w-24 text-center text-sm font-medium text-gray-500">
                  작성일
                </div>
                <div className="w-20 text-center text-sm font-medium text-gray-500">
                  조회수
                </div>
              </div>

              {/* 로딩 상태 및 데이터 표시 */}
              {isLoading ? (
                <div className="py-4 text-center">로딩 중...</div>
              ) : (
                <div className="divide-y">
                  {content.map((data) => (
                    <div
                      key={data.id}
                      className="flex items-center py-3 hover:bg-gray-50"
                    >
                      <div className="w-16 text-center text-sm text-gray-500">
                        {data.id}
                      </div>
                      <div className="flex-1 px-6">{data.title}</div>
                      <div className="w-24 text-center text-sm text-gray-500">
                        {data.date}
                      </div>
                      <div className="w-20 text-center text-sm text-gray-500">
                        {data.views}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
