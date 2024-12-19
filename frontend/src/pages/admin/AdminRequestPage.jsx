import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminSideBar from "../../components/wrapper/AdminSidebar";
import { Search } from 'lucide-react';

const AdminRequestPage = () => {
  //const url = 'https://9891dae0-553b-40f5-9ada-4f17eb1659c2.mock.pstmn.io/redbox/request';
  const PAGE_SIZE = 10;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // [필터링] 날짜 선택
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //select 선택
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const fetchData = async (page, size) => {
    try {
      const response = await axios.get(`${url}?page=${page - 1}&size=${size}`);
      if (response.data && response.data.requests) {
        setContent(response.data.requests);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
      } else {
        setContent([]);
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생: ", error);
      setContent([]);
    }
  };

  useEffect(() => {
    fetchData(page, PAGE_SIZE);
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

  // (필터링) 선택값 확인 가능, 필터 처리 로직
  const filterByContent = () => {
    try {
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
      console.log('Selected Status:', selectedStatus);
      console.log('Selected Option:', selectedOption);
      // 여기에 실제 필터링 로직 추가
    } catch (error) {
      console.error("필터링 중 오류 발생: ", error);
    }
  };

  // select 선택된 값 출력(상태)
  const handleStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  // select 선택된 값 출력(정렬)
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
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
              <div className="flex align-items-center justify-start space-x-4">
                {/* 상태 선택 */}
                <div className="w-[250px] border p-2 rounded me-3 text-center">
                  <label htmlFor="dropdown" className="me-2 text-red-600">상태 선택</label>
                  <select
                    id="dropdown"
                    className="form-select"
                    value={selectedStatus}
                    onChange={handleStatus}
                    style={{ width: '120px' }}
                  >
                    <option value="" disabled>선택</option>
                    <option value="진행중">진행중</option>
                    <option value="마감">마감</option>
                  </select>
                </div>

                {/* 옵션 선택 */}
              <div className="w-[250px] border p-2 rounded me-3 text-center">
                  <label htmlFor="dropdown" className="me-2 text-red-600">옵션 선택</label>
                  <select
                    id="dropdown"
                    className="form-select"
                    value={selectedOption}
                    onChange={handleChange}
                    style={{ width: '120px' }}
                  >
                    <option value="" disabled>조회 방법</option>
                    <option value="조회수">조회수</option>
                    <option value="추천수">추천수</option>
                    <option value="최신수">최신수</option>
                    <option value="진행률">진행률</option>
                  </select>
                </div>

                {/* 시작 날짜 - 종료 날짜 */}
                <div className="w-[330px] border p-2 rounded me-3 text-center">
                  <label htmlFor="startDate" className="me-2"></label>
                  <input
                    type="date"
                    id="startDate"
                    className="form-control me-3"
                    style={{ width: '120px' }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <label htmlFor="endDate" className="me-2"> ~ </label>
                  <input
                    type="date"
                    id="endDate"
                    className="form-control me-3"
                    style={{ width: '120px' }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                {/* 버튼 - 서버에 전송하는 정보 */}
                <div className="px-2 py-2 rounded-lg hover:bg-red-200 transition-colors">
                  <button className="btn btn-dark" onClick={filterByContent}>
                    <Search className="w- h-6 text-red-500 mx-auto"/>
                  </button>
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