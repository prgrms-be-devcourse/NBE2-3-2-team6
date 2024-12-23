import axios from "axios";
import { useEffect, useState } from "react";
import AdminSideBar from "../../components/wrapper/AdminSideBar";

const AdminArticlePage = () => {
  const size = 10;
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [articleData, setArticleData] = useState({
    subject: "",
    url: "",
    source: "",
  });

  const baseUrl = "http://localhost:8080/articles";

  const PAGE_GROUP_SIZE = 10;
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  useEffect(() => {
    fetchBoards(page, size);
  }, [page, size]);

  const fetchBoards = async (page, size) => {
    try {
      const response = await axios.get(baseUrl, {
        params: {
          page: page,
          size,
        },
      });

      setArticles(response.data.content);
      setTotalElements(response.data.totalElements);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const handleOpenModal = async (mode = "create", articleId = null) => {
    setModalMode(mode);
    setSelectedArticleId(articleId);

    if (mode === "edit" && articleId) {
      try {
        // 개별 게시글 조회 API 호출
        const response = await axios.get(`${baseUrl}/${articleId}`);
        const articleDetail = response.data;

        setArticleData({
          subject: articleDetail.subject,
          url: articleDetail.url,
          source: articleDetail.source,
        });
      } catch (error) {
        console.error("Error fetching article detail:", error);
      }
    } else {
      setArticleData({
        subject: "",
        url: "",
        source: "",
      });
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMode("create");
    setSelectedArticleId(null);
    setArticleData({
      subject: "",
      url: "",
      source: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === "edit") {
        await axios.put(`${baseUrl}/${selectedArticleId}`, articleData);
      } else {
        await axios.post(baseUrl, articleData);
      }

      handleCloseModal();
      fetchBoards(page, size);
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };

  const handleDelete = async (articleId) => {
    if (window.confirm("정말로 이 기사를 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${baseUrl}/${articleId}`);
        fetchBoards(page, size);
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

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
        <AdminSideBar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px]">
            <h1 className="text-2xl font-bold mb-6">헌혈 기사</h1>

            <div className="border rounded-lg">
              <div className="flex bg-gray-50 py-3 border-b">
                <div className="w-16 text-center text-sm font-medium text-gray-500">
                  번호
                </div>
                <div className="flex-1 px-6 text-center text-sm font-medium text-gray-500">
                  제목
                </div>
                <div className="w-32 text-center text-sm font-medium text-gray-500">
                  출처
                </div>
                <div className="w-32 text-center text-sm font-medium text-gray-500">
                  관리
                </div>
              </div>

              <div className="divide-y">
                {articles.map((article) => (
                  <div
                    key={article.articleNo}
                    className="flex items-center py-3 hover:bg-gray-50"
                  >
                    <div className="w-16 text-center text-sm text-gray-500">
                      {article.articleNo}
                    </div>
                    <div className="flex-1 px-6">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-red-600"
                      >
                        {article.subject}
                      </a>
                    </div>
                    <div className="w-32 text-center text-sm text-gray-500">
                      {article.source}
                    </div>
                    <div className="w-32 text-center text-sm flex justify-center space-x-2">
                      <button
                        onClick={() =>
                          handleOpenModal("edit", article.articleNo)
                        }
                        className="px-2 py-1 text-blue-600 hover:text-blue-800"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(article.articleNo)}
                        className="px-2 py-1 text-red-600 hover:text-red-800"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center space-y-2 justify-between">
              <div className="flex justify-between items-center w-full">
                <div className="w-16"></div>
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
                <button
                  onClick={() => handleOpenModal("create")}
                  className="px-3 py-1 border rounded hover:bg-gray-50"
                >
                  등록
                </button>
              </div>

              <div className="text-sm text-gray-500">
                {page} / {totalPages} 페이지 (총 {totalElements}개)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {modalMode === "create" ? "헌혈 기사 등록" : "헌혈 기사 수정"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  name="subject"
                  value={articleData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기사 URL
                </label>
                <input
                  type="url"
                  name="url"
                  value={articleData.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  출처
                </label>
                <input
                  type="text"
                  name="source"
                  value={articleData.source}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  {modalMode === "create" ? "등록" : "수정"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticlePage;
