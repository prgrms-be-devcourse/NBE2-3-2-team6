import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";
import axios from "axios";
import { ThumbsUp } from 'lucide-react';
import { HandHeart } from 'lucide-react';
import RedboxDonationModal from "../../components/RedboxDonationModal"; // 모달 컴포넌트 임포트

const RequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [likes, setLikes] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [isRedboxModalOpen, setIsRedboxModalOpen] = useState(false); // 모달 상태 추가

  const url = `https://9891dae0-553b-40f5-9ada-4f17eb1659c2.mock.pstmn.io/redbox/request/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setRequest(response.data);
        setLikes(response.data.likes);
        setCurrentAmount(response.data.current_amount);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생: ", error);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleDonate = async (quantity, comment) => {
    // 기부 요청 처리 로직 추가
    try {
      const donationUrl = 'localhost:5173/donate'; // 실제 기부 API URL
      const payload = {
        quantity: parseInt(quantity), // 기부 수량
        requestId: id, // 현재 게시글 ID
        comment,
      };
      console.log('요청 로그: ', payload);
      const response = await axios.post(donationUrl, payload);
      console.log('응답 로그: ', response);
      
      if (response.status === 200) {
        setCurrentAmount((prevAmount) => prevAmount + parseInt(quantity)); // 기부 수량 업데이트
        alert("기부가 성공적으로 처리되었습니다.");
      } else {
        alert("기부 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("기부 오류:", error);
      alert("기부 요청 실패");
    }

    setIsRedboxModalOpen(false); // 모달 닫기
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <CommunitySideBar />
        <div className="flex-1 p-8">
          {request && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl">
                <h1 className="text-2xl font-bold mb-6">요청게시판</h1>
                <hr className="my-4 border-t-2 border-gray-300" />
                <div className="flex bg-gray-50 py-3 border-b">
                  <div className="text-2xl flex-1 text-center">{request.title}</div>
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
                <p className="mt-4 pl-4 h-[500px]">{request.content}</p>
              </div>
              <div className="mt-4 flex items-center">
                <button
                  className="mx-1 px-3 py-2 bg-gray-300 text-black rounded"
                  onClick={() => navigate("/community/request")}
                >
                  목록
                </button>
                <button
                  className="mx-1 px-3 py-2 bg-gray-300 text-black rounded"
                  onClick={() => setIsRedboxModalOpen(true)} // 모달 열기
                >
                  <HandHeart />
                </button>
                <span className="mx-2">{currentAmount} 기부</span>
                <button
                  className="mx-1 px-3 py-2 bg-gray-300 text-black rounded"
                  onClick={handleLike}
                >
                  <ThumbsUp />
                </button>
                <span className="mx-2">{likes} 따봉</span>
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-md p-6 h-auto max-w-6xl">
                <h2 className="text-lg font-bold mb-2">첨부파일</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  {request.attachments &&
                    request.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <span className="mr-2">📎 {attachment.name} (다운로드: {attachment.downloads}회)</span>
                        <button className="text-black border border-gray-300 bg-white rounded px-2">미리보기</button>
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
