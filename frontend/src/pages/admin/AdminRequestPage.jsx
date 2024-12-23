import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminSideBar from "../../components/wrapper/AdminSidebar";
import { Search } from 'lucide-react';

const AdminRequestPage = () => {

  const PAGE_SIZE = 10;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // 필터링 관련 상태
  const [selectedStatus, setSelectedStatus] = useState("최신순"); // 기본 정렬
  const [selectedOption, setSelectedOption] = useState("전체글"); // 기본 옵션
  const [startDate, setStartDate] = useState(""); // 시작 날짜
  const [endDate, setEndDate] = useState(""); // 종료 날짜

  // 페이지, 사이즈, (최신,만료,좋아요), (전체글,관심글), 시작 날짜, 종료 날짜
  const fetchData = async (page, size, status, option, start, end) => {
    try {
      const url = "https://2c065562-04c8-4d72-8c5a-4e4289daa4b5.mock.pstmn.io/admin/request"

      const params = {
        page: page-1,
        size: size,
        status: status || "최신순",
        option: option || "전체글",
        startDate: start || "전체",
        endDate: end || "전체",
      }
      const response = await axios.get(url, {params});

      if (response.status === 200) {
        if (response.data && response.data.requests) {
          setContent(response.data.requests);
          setTotalPages(response.data.totalPages);
          setTotalElements(response.data.totalElements);
        } else {
          setContent([]);
        }
      }   
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생: ", error);
      setContent([]);
    }
  };

  // 기본 데이터 로드
  useEffect(() => {
    fetchData(page, PAGE_SIZE, selectedStatus, selectedOption, startDate, endDate);
  }, [page, selectedStatus, selectedOption, startDate, endDate]);

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

  // 정렬 버튼 클릭 시
  const handleStatusClick = (status) => {
    setSelectedStatus(status);

    setSelectedOption("전체글");
    setStartDate("");
    setEndDate("");

    fetchData(1, PAGE_SIZE, status, selectedOption, startDate, endDate); // 필터링된 데이터 로드
    setPage(1);
  };

  // 필터 버튼 클릭 시
  const handleFilterClick = () => {

    console.log("옵션:", selectedOption);
    console.log("시작 날짜:", startDate || "전체");
    console.log("종료 날짜:", endDate || "전체");

    fetchData(1, PAGE_SIZE, selectedStatus, selectedOption, startDate, endDate); // 필터링된 데이터 로드
    setPage(1);
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px]">
            <h1 className="text-2xl font-bold mb-6">요청게시판</h1>

            {/* 게시판 필터링(날짜, 상태, 조회) */}
            <div className="w-100 mb-3">
              <div
                className="flex items-center justify-between" // 전체 가로 정렬
                style={{ width: "100%", alignItems: "center" }}
              >
                {/* 왼쪽: 최신순, 만료순, 좋아요 순 */}
                <div className="flex">
                  {["최신순", "만료순", "좋아요순"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusClick(status)}
                      style={{
                        fontSize: "14px",
                        fontWeight: selectedStatus === status ? "bold" : "500",
                        color: selectedStatus === status ? "red" : "gray",
                        cursor: "pointer",
                        padding: "5px 12px",
                      }}
                    >
                      • {status}
                    </button>
                  ))}
                </div>

                {/* 오른쪽: 옵션 선택, 날짜 입력, 버튼 */}
                <div className="flex items-center space-x-4">
                  {/* 옵션 선택 */}
                  <div className="w-[230px] border p-1 rounded text-center">
                    <label htmlFor="dropdown" className="me-2" style={{ fontSize: "15px", fontWeight: "bold" }} >
                      옵션 선택 
                    </label>
                    <select
                      id="dropdown"
                      className="form-select"
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      style={{ 
                        width: "110px",
                        fontSize: "15px", // 글씨 크기 조정
                        textAlignLast: "center", // 드롭다운 화살표 오른쪽 정렬 유지
                        padding: "5px", // 패딩 조정
                       }}
                    >
                      <option value="" disabled>
                        선택
                      </option>
                      <option value="전체글">전체글</option>
                      <option value="관심글">관심글</option>
                    </select>
                  </div>

                  {/* 시작 날짜 - 종료 날짜 */}
                  <div className="w-[330px] border p-2 rounded text-center">
                    <label htmlFor="startDate" className="me-2"></label>
                    <input
                      type="date"
                      id="startDate"
                      className="form-control me-3"
                      style={{ width: "120px", fontSize: "15px" }}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label htmlFor="endDate" className="me-2">
                      ~
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      className="form-control me-3"
                      style={{ width: "120px", fontSize: "15px"  }}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>

                  {/* 버튼 */}
                  <div className="px-2 py-2 rounded-lg hover:bg-red-200 transition-colors">
                    <button
                      className="btn btn-dark flex items-center justify-center"
                      onClick={handleFilterClick}
                    >
                      <Search className="w- h-6 text-red-500 mx-auto"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>


            {/* 게시판 리스트 */}
            <div className="border rounded-lg">
              {/* 헤더 */}
              <div className="flex bg-gray-50 py-3 border-b">
                <div className="w-16 text-center text-sm font-medium text-gray-500">번호</div>
                <div className="flex-1 px-6 text-sm font-medium text-gray-500">제목</div>
                <div className="w-32 text-center text-sm font-medium text-gray-500">작성일</div>
                <div className="w-20 text-center text-sm font-medium text-gray-500">조회수</div>
              </div>

              {/* 리스트 아이템들 */}
              <div className="divide-y">
                {content && content.length > 0 ? (
                  content.map((request) => (
                    <div key={request.id} className="flex items-center py-3 hover:bg-gray-50">
                      <div className="w-16 text-center text-sm text-gray-500">{request.id}</div>
                      <div className="flex-1 px-6">
                        <Link to={`/community/request/${request.id}`} className="text-gray-900 hover:text-red-600">
                          {request.title}
                        </Link>
                      </div>
                      <div className="w-32 text-center text-sm text-gray-500">
                        {new Date(request.date).toLocaleDateString()}
                      </div>
                      <div className="w-20 text-center text-sm text-gray-500">{request.views}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">데이터가 없습니다.</div>
                )}
              </div>
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

export default AdminRequestPage;