import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";
import axios from "axios"; // axios 임포트

const url = 'https://2c065562-04c8-4d72-8c5a-4e4289daa4b5.mock.pstmn.io/request';
const PAGE_SIZE = 10; // 페이지 크기 상수화

const RequestPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}?page=${page - 1}&size=${PAGE_SIZE}`);
        setRequests(response.data.requests); // requests 배열 설정
        setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
        setTotalElements(response.data.totalElements); // 전체 요청 수 설정
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생: ", error);
      }
    };

    fetchData(); // 데이터 가져오기
  }, [page]);

  // 현재 페이지 그룹 계산을 위한 상수
  const PAGE_GROUP_SIZE = 10;
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

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

  const handleRequestWrite = () => {
    navigate("/community/request/write");
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <CommunitySideBar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px]">
            <h1 className="text-2xl font-bold mb-6">요청게시판</h1>

            <div className="border rounded-lg">
              <div className="flex bg-gray-50 py-3 border-b">
                <div className="w-16 text-center text-sm font-medium text-gray-500">번호</div>
                <div className="flex-1 px-6 text-center text-sm font-medium text-gray-500">제목</div>
                <div className="w-24 text-center text-sm font-medium text-gray-500">작성일</div>
                <div className="w-20 text-center text-sm font-medium text-gray-500">조회수</div>
              </div>

              <div className="divide-y">
                {requests.map((request) => (
                  <div key={request.id} className="flex items-center py-3 hover:bg-gray-50">
                    <div className="w-16 text-center text-sm text-gray-500">{request.id}</div>
                    <div className="flex-1 px-6">
                      <Link to={`/community/request/${request.id}`} className="text-gray-900 hover:text-red-600">
                        {request.title}
                      </Link>
                    </div>
                    <div className="w-24 text-center text-sm text-gray-500">{new Date(request.date).toLocaleDateString()}</div>
                    <div className="w-20 text-center text-sm text-gray-500">{request.views}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 페이지네이션 */}
            <div className="mt-6 flex flex-col items-center space-y-2 justify-between">
              <div className="flex justify-between items-center w-full">
                <div className="w-16"></div>
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
                <button
                  onClick={handleRequestWrite}
                  className="px-3 py-1 border rounded hover:bg-gray-50"
                >
                  글쓰기
                </button>
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

export default RequestPage;
