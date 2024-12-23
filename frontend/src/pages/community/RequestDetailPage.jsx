import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";
import axios from "axios";
import { ThumbsUp, HandHeart } from 'lucide-react';
import RedboxDonationModal from "../../components/RedboxDonationModal"; // 기부 모달 컴포넌트 임포트

const RequestDetailPage = () => {
  const { id } = useParams(); // URL 파라미터에서 요청 ID 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  const [request, setRequest] = useState(null); // 요청 데이터 상태
  const [likes, setLikes] = useState(0); // 좋아요 수 상태
  const [currentAmount, setCurrentAmount] = useState(0); // 현재 기부 금액 상태
  const [isRedboxModalOpen, setIsRedboxModalOpen] = useState(false); // 기부 모달 열림 상태
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태

  // 요청 상세 정보를 가져오기 위한 URL
  const url = `https://9891dae0-553b-40f5-9ada-4f17eb1659c2.mock.pstmn.io/redbox/request/${id}`;

  // 요청 데이터 가져오기 함수
  const fetchData = async () => {
    try {
      const response = await axios.get(url); // API 호출하여 요청 데이터 가져오기
      setRequest(response.data); // 요청 데이터 상태 업데이트
      setLikes(response.data.likes); // 좋아요 수 상태 업데이트
      setCurrentAmount(response.data.current_amount); // 현재 기부 금액 상태 업데이트
      setIsLiked(response.data.isLiked); // 좋아요 상태 업데이트
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생: ", error); // 오류 처리
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, [id, isLiked]);

  // 좋아요 버튼 클릭 시 호출되는 함수
  const handleLike = async () => {
    try {
      const response = await axios.post(url + "/like"); // 좋아요 요청 API 호출

      if (response.status === 200) {
        alert(response.data.message); // 성공 메시지 알림
        setIsLiked((prevIsLiked) => !prevIsLiked); // 좋아요 상태 토글
      }
    } catch (error) {
      console.error("좋아요 요청 오류:", error); // 오류 처리
    }
  };

  // 기부 요청 처리 함수
  const handleDonate = async (quantity, comment) => {
    try {
      const donationUrl = 'localhost:5173/donate'; // 실제 기부 API URL
      const payload = {
        quantity: parseInt(quantity), // 기부 수량
        requestId: id, // 현재 요청 ID
        comment, // 기부에 대한 코멘트
      };
      const response = await axios.post(donationUrl, payload); // 기부 요청 API 호출
      if (response.status === 200) {
        setCurrentAmount((prevAmount) => prevAmount + parseInt(quantity)); // 기부 금액 업데이트
        alert("기부가 성공적으로 처리되었습니다."); // 성공 메시지 알림
      } else {
        alert("기부 처리 중 오류가 발생했습니다."); // 오류 메시지
      }
    } catch (error) {
      console.error("기부 오류:", error); // 오류 처리
      alert("기부 요청 실패"); // 실패 메시지 알림
    }

    setIsRedboxModalOpen(false); // 기부 모달 닫기
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <CommunitySideBar /> {/* 사이드바 컴포넌트 */}
        <div className="flex-1 p-8">
          {request && ( // 요청 데이터가 있을 때만 렌더링
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">요청게시판</h1>
                <hr className="my-4 border-t-2 border-gray-300" />
                <div className="flex bg-gray-50 py-3 border-b">
                  <div className="text-2xl flex-1 text-center">{request.title}</div> {/* 요청 제목 */}
                </div>
                <div className="flex bg-gray-50 py-3 border-b">
                  <div className="w-20 text-center text-sm font-medium text-gray-500">작성자</div>
                  <div className="w-20 text-left text-sm font-medium">{request.author}</div>
                  <div className="w-20 text-left text-sm font-medium text-gray-500">등록일</div>
                  <div className="w-28 text-left text-sm font-medium">{request.date}</div>
                  <div className="w-20 text-center text-sm font-medium text-gray-500">기부 시작일</div>
                  <div className="w-28 text-center text-sm font-medium">{request.start_date}</div>
                  <div className="w-20 text-center text-sm font-medium text-gray-500">기부 마감일</div>
                  <div className="w-28 text-center text-sm font-medium">{request.end_date}</div>
                  <div className="w-36 text-center text-sm font-medium text-gray-500">목표 헌혈증 개수</div>
                  <div className="w-15 text-left text-sm font-medium">{request.target_amount}</div>
                  <div className="w-20 text-right text-sm font-medium">{request.status}</div>
                  <div className="w-28 text-right text-sm font-medium text-gray-500">조회수</div>
                  <div className="w-20 text-center text-sm font-medium">{request.views}</div>
                </div>
                <div
                  className="mt-4 pl-4 h-[500px]"
                  dangerouslySetInnerHTML={{ __html: request.content }}
                ></div>
              </div>
              <div className="mt-4 flex items-center">
                <button
                  className="mx-1 px-3 py-2 bg-gray-300 text-black rounded"
                  onClick={() => navigate("/community/request")} // 목록으로 이동
                >
                  목록
                </button>
                <button
                  className="mx-1 px-3 py-2 bg-gray-300 text-black rounded"
                  onClick={() => setIsRedboxModalOpen(true)} // 기부 모달 열기
                >
                  <HandHeart />
                </button>
                <span className="mx-2">{currentAmount} 기부</span> {/* 현재 기부 금액 표시 */}
                <button
                  className={`mx-1 px-3 py-2 transition-colors duration-200 ${isLiked
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-300 text-black hover:bg-gray-400'
                    }`}
                  onClick={handleLike} // 좋아요 버튼 클릭 시
                >
                  <ThumbsUp
                    className={`${isLiked ? 'fill-current animate-pulse' : ''}`}
                    size={20}
                  />
                </button>
                <span className="mx-2">{likes} 따봉</span> {/* 좋아요 수 표시 */}
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-md p-6 h-auto">
                <h2 className="text-lg font-bold mb-2">첨부파일</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  {request.attachments &&
                    request.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <span className="mr-2">📎 {attachment.name} (다운로드: {attachment.downloads}회)</span>
                        <a
                          href={attachment.url} // 첨부파일의 URL
                          download // 다운로드 속성
                          className="text-black border border-gray-300 bg-white rounded px-2 mr-2"
                        >
                          다운로드
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 레드박스 기부 모달 컴포넌트 */}
      {isRedboxModalOpen && (
        <RedboxDonationModal
          onClose={() => setIsRedboxModalOpen(false)}
          onSubmit={handleDonate} // 기부 처리 함수
        />
      )}
    </div>
  );
};

export default RequestDetailPage;
