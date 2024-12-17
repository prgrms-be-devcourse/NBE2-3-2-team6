import MyPageSideBar from "../../components/wrapper/MyPageSideBar";
import axios from "axios";
import { useEffect, useState } from "react";

const RedCardPage = () => {
  // 페이지네이션 상태 관리
  const size = 6;
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([
    {
      id: 1,
      cardNumber: "BD123456789",
      donationDate: "2024-03-15",
      hospital: "대한적십자사 서울중앙센터",
      registrationDate: "2024-03-16",
      status: "available",
    },
    {
      id: 2,
      cardNumber: "BD987654321",
      donationDate: "2024-03-14",
      hospital: "대한적십자사 부산센터",
      registrationDate: "2024-03-15",
      status: "available",
    },
    {
      id: 3,
      cardNumber: "BD123456789",
      donationDate: "2024-03-15",
      hospital: "대한적십자사 서울중앙센터",
      registrationDate: "2024-03-16",
      status: "available",
    },
    {
      id: 4,
      cardNumber: "BD987654321",
      donationDate: "2024-03-14",
      hospital: "대한적십자사 부산센터",
      registrationDate: "2024-03-15",
      status: "available",
    },
    {
      id: 5,
      cardNumber: "BD123456789",
      donationDate: "2024-03-15",
      hospital: "대한적십자사 서울중앙센터",
      registrationDate: "2024-03-16",
      status: "available",
    },
    {
      id: 6,
      cardNumber: "BD987654321",
      donationDate: "2024-03-14",
      hospital: "대한적십자사 부산센터",
      registrationDate: "2024-03-15",
      status: "used",
    },
  ]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // 현재 페이지 그룹 계산을 위한 상수
  const PAGE_GROUP_SIZE = 6;
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redCardData, setRedCardData] = useState({
    cardNumber: "",
    bloodType: "",
    donationDate: "",
    hospitalName: "",
  });

  const fetchRedcards = async (page, size) => {
    try {
      const response = await axios.get("http://localhost:8080/boards", {
        params: {
          page: page, // Spring Boot는 0부터 시작하므로 1을 빼줍니다
          size,
        },
      });

      const { content, totalPages, totalElements } = response.data;
      setContent(content);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  useEffect(() => {
    fetchRedcards(page, size);
  }, [page, size]);

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

  const handleRedCardWrite = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRedCardData({
      cardNumber: "",
      donationDate: "",
      hospitalName: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRedCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/redcards", redCardData);
      handleCloseModal();
      // 데이터 새로고침을 위해 현재 페이지 다시 불러오기
      fetchRedcards(page, size);
    } catch (error) {
      console.error("Error submitting red card:", error);
    }
  };

  const handleStatusChange = async (id) => {
    try {
      // 백엔드 상태 업데이트
      // await axios.patch(`http://localhost:8080/redcards/${id}/status`);

      // 로컬 상태 업데이트
      setContent((prevContent) =>
        prevContent.map((card) =>
          card.id === id
            ? { ...card, status: card.status === "used" ? "available" : "used" }
            : card
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        {/* 사이드바 */}
        <MyPageSideBar />

        {/* 메인 컨텐츠 */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px]">
            <h1 className="text-2xl font-bold mb-6">나의 헌혈증 목록</h1>

            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {content?.length > 0 ? (
                content.map((redcard) => (
                  <div
                    key={redcard.id}
                    className={`${
                      redcard.status === "used"
                        ? "bg-gray-50 border-gray-200"
                        : "bg-white border-red-100"
                    } rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border`}
                  >
                    {/* Card Header */}
                    {/* Card Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          #{redcard.id}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm ${
                            redcard.status === "used"
                              ? "text-gray-500"
                              : "text-red-600"
                          }`}
                        >
                          {redcard.status === "used" ? "사용완료" : "사용가능"}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={redcard.status === "used"}
                            onChange={() => handleStatusChange(redcard.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-gray-600">증서번호</span>
                        <span className="font-medium">
                          {redcard.cardNumber}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-gray-600">헌혈일자</span>
                        <span className="font-medium">
                          {redcard.donationDate}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">헌혈장소</span>
                        <span className="font-medium">{redcard.hospital}</span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-4 pt-4 border-t">
                      <span className="text-sm text-gray-500">
                        등록일: {redcard.registrationDate}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                // Empty State
                <div className="col-span-3 text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🩸</div>
                  <h3 className="text-lg font-medium text-gray-900">
                    아직 등록된 헌혈증이 없습니다
                  </h3>
                  <p className="text-gray-500 mt-2">
                    첫 번째 헌혈증을 등록해보세요!
                  </p>
                  <button
                    onClick={handleRedCardWrite}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    헌혈증 등록하기
                  </button>
                </div>
              )}
            </div>

            {/* 페이지네이션 */}
            <div className="flex flex-col items-center space-y-4 mt-8">
              {/* 등록 버튼과 페이지네이션을 감싸는 컨테이너 */}
              <div className="flex justify-between items-center w-full mb-4">
                <div className="w-24"></div> {/* 좌측 여백용 */}
                <nav className="flex items-center space-x-1">
                  {/* 이전 그룹 버튼 */}
                  <button
                    onClick={handlePrevGroup}
                    disabled={startPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* 페이지 번호들 */}
                  <div className="flex space-x-1">
                    {Array.from(
                      { length: endPage - startPage + 1 },
                      (_, i) => startPage + i
                    ).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg ${
                          pageNum === page
                            ? "bg-red-600 text-white font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* 다음 그룹 버튼 */}
                  <button
                    onClick={handleNextGroup}
                    disabled={endPage === totalPages}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </nav>
                {/* 등록 버튼 */}
                <button
                  onClick={handleRedCardWrite}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  헌혈증 등록
                </button>
              </div>

              {/* 페이지 정보 */}
              <div className="text-sm text-gray-500">
                총 {totalElements}개 중 {page} 페이지
              </div>
            </div>
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">헌혈증 등록</h2>
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
                      증서번호
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={redCardData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      헌혈일자
                    </label>
                    <input
                      type="date"
                      name="donationDate"
                      value={redCardData.donationDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      헌혈장소
                    </label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={redCardData.hospitalName}
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
                      등록
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedCardPage;
