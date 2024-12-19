import { useEffect, useState } from "react";
import axios from "axios";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";

const url = "https://316fa20d-ea61-4140-9970-98cd5e0fda23.mock.pstmn.io/redbox/articles";

const ArticlePage = () => {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // 현재 페이지 그룹 계산을 위한 상수
  const PAGE_GROUP_SIZE = 10;
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(url);
        setArticles(response.data.articles);
        setTotalElements(response.data.totalElements);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        {/* 사이드바 */}
        <CommunitySideBar />

        {/* 메인 컨텐츠 */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px]">
            <h1 className="text-2xl font-bold mb-6">헌혈 기사</h1>

            {/* 게시판 리스트 */}
            <div className="border rounded-lg">
              {/* 헤더 */}
              <div className="flex bg-gray-50 py-3 border-b">
                <div className="w-16 text-center text-sm font-medium text-gray-500">번호</div>
                <div className="flex-1 px-6 text-center text-sm font-medium text-gray-500">제목</div>
                <div className="w-24 text-center text-sm font-medium text-gray-500">작성일</div>
                <div className="w-32 text-center text-sm font-medium text-gray-500">출처</div>
              </div>

              {/* 리스트 아이템들 */}
              <div className="divide-y">
                {articles.map((article) => (
                  <div key={article.id} className="flex items-center py-3 hover:bg-gray-50">
                    <div className="w-16 text-center text-sm text-gray-500">{article.id}</div>
                    <div className="flex-1 px-6">
                      <a
                        href={article.link}
                        target="_blank" // 새 탭에서 열기
                        rel="noopener noreferrer" // 보안을 위한 추가 속성
                        className="text-gray-900 hover:text-red-600"
                      >
                        {article.title}
                      </a>
                    </div>
                    <div className="w-24 text-center text-sm text-gray-500">{article.date}</div>
                    <div className="w-32 text-center text-sm text-gray-500">{article.source}</div> {/* 출처 추가 */}
                  </div>
                ))}
              </div>
            </div>

            {/* 페이지네이션 */}
            <div className="mt-6 flex flex-col items-center space-y-2 justify-between">
              <div className="flex justify-items-center">
                <div></div>
                <nav className="flex space-x-2 justify-between">
                  {/* 이전 그룹 버튼 */}
                  <button
                    onClick={handlePrevGroup}
                    disabled={startPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    이전
                  </button>

                  {/* 페이지 번호 버튼들 */}
                  {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                  ).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 border rounded ${pageNum === page
                        ? "bg-red-600 text-white"
                        : "hover:bg-gray-50"
                        }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* 다음 그룹 버튼 */}
                  <button
                    onClick={handleNextGroup}
                    disabled={endPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    다음
                  </button>
                </nav>
              </div>

              {/* 전체 페이지 정보 */}
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

export default ArticlePage;
