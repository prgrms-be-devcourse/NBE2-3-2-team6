import AdminSideBar from "../../components/wrapper/AdminSideBar";
import api from "../../lib/axios";
import { ThumbsUp } from 'lucide-react';
import { HandHeart } from 'lucide-react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RedboxDonationModal from "../../components/RedboxDonationModal";

const AdminRequestDetailPage = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const [request, setRequest] = useState(null);
 const [likes, setLikes] = useState(0);
 const [currentAmount, setCurrentAmount] = useState(0);
 const [isRedboxModalOpen, setIsRedboxModalOpen] = useState(false); 
 const [isLiked, setIsLiked] = useState(true);

 const url = `/requests/${id}`;

 const handleFileClick = async (requestNo, fileNo) => {
  try {
    const response = await api.get(`/requests/${requestNo}/files/${fileNo}`);
    
    // 파일 다운로드 처리
    window.location.href = response.data;
  } catch (error) {
    console.error("파일 다운로드 실패:", error);
  }
};

 const fetchData = async () => {
    try {
      const response = await api.get(url); // API 호출하여 요청 데이터 가져오기
      console.log(response);
      setRequest(response.data); // 요청 데이터 상태 업데이트
      setLikes(response.data.likes); // 좋아요 수 상태 업데이트
      setCurrentAmount(response.data.currentAmount); // 현재 기부 금액 상태 업데이트
      setIsLiked(response.data.liked); // 좋아요 상태 업데이트
      console.log("좋아요 상태 업데이트 : ", response.data.liked);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생: ", error); // 오류 처리
    }
  };

 useEffect(() => {
    fetchData();
 }, [id, isLiked]);

 // 좋아요 버튼 클릭 시 호출되는 함수
 const handleLike = async () => {
    
    if (request.status === "만료") {
      alert("만료된 게시글입니다.");
      return;
    }

    try {

      const response = await api.post(url + '/like'); // 좋아요 요청 API 호출

      if (response.status === 200) {
        console.log("200 OK 좋아요 업데이트")
        alert(response.data.message); // 성공 메시지 알림
        setIsLiked((prevIsLiked) => !prevIsLiked); // 좋아요 상태 토글
      }
    } catch (error) {

      if (response.status === 403) {
        alert("로그인이 필요합니다");
      } else {
        console.error("좋아요 요청 오류:", error); // 오류 처리
      }
    }
  };

 const handleDonate = async (quantity, comment) => {
   try {
     const donationUrl = 'localhost:5173/donate';
     const payload = {
       quantity: parseInt(quantity),
       requestId: id,
       comment,
     };
     console.log('요청 로그: ', payload);
     const response = await api.post(donationUrl, payload);
     console.log('응답 로그: ', response);
     
     if (response.status === 200) {
       setCurrentAmount((prevAmount) => prevAmount + parseInt(quantity));
       alert("기부가 성공적으로 처리되었습니다.");
     } else {
       alert("기부 처리 중 오류가 발생했습니다.");
     }
   } catch (error) {
     console.error("기부 오류:", error);
     alert("기부 요청 실패");
   }
    setIsRedboxModalOpen(false);
  };

 return (
   <div className="flex-1 bg-gray-50">
     <div className="flex">
       <AdminSideBar />
       <div className="flex-1 p-8">
         {request && (
           <>
             <div className="bg-white rounded-lg shadow-md p-6 h-[800px]">
               <h1 className="text-2xl font-bold mb-6">요청게시판</h1>
               <hr className="my-4 border-t-2 border-gray-300" />
               <div className="flex bg-gray-50 py-3 border-b">
                 <div className="text-2xl flex-1 text-center">{request.title}</div>
               </div>
               <div className="flex bg-gray-50 py-3 border-b">
                  <div className="w-1/12 text-right text-sm font-medium text-gray-500">작성자</div>
                  <div className="w-1/12 text-center text-sm font-medium">{request.userName}</div>
                  <div className="w-1/12 text-right text-sm font-medium text-gray-500">등록일</div>
                  <div className="w-1/12 text-center text-sm font-medium">{request.date}</div>
                  <div className="w-1/12 text-right text-sm font-medium text-gray-500">기부 시작일</div>
                  <div className="w-1/12 text-center text-sm font-medium">{request.startDate}</div>
                  <div className="w-1/12 text-right text-sm font-medium text-gray-500">기부 마감일</div>
                  <div className="w-1/12 text-center text-sm font-medium">{request.endDate}</div>
                  <div className="w-1/12 text-right text-sm font-medium text-gray-500">목표 헌혈증 개수</div>
                  <div className="w-1/12 text-center text-sm font-medium">{request.currentAmount}/{request.targetAmount}</div>
                  <div className="w-12 text-right text-sm font-medium text-gray-500">상태</div>
                  <div className="w-1/12 text-center text-sm font-medium">{request.status}</div>
                  <div className="w-12 text-right text-sm font-medium text-gray-500">조회수</div>
                  <div className="w-1/12 text-center text-sm font-medium">{request.views}</div>
                </div>

                {/* HTML 문자열 렌더링 */}
                <div
                  className="mt-4 pl-4 h-[500px]"
                  dangerouslySetInnerHTML={{ __html: request.content }}
                ></div> {/* 요청 내용 */}

             </div>
             <div className="mt-4 flex items-center">
               <button
                 className="mx-1 px-3 py-2 bg-gray-300 text-black rounded"
                 onClick={() => navigate("/admin/community/request")}
               >
                 목록
               </button>
               <button
                 className="mx-1 px-3 py-2 bg-gray-300 text-black rounded"
                 onClick={() => setIsRedboxModalOpen(true)}
               >
                 <HandHeart />
               </button>
               <span className="mx-2">{currentAmount} 기부</span>
               <button
                 className={`mx-1 px-3 py-2 transition-colors duration-200 ${
                   isLiked 
                     ? 'bg-red-500 text-white hover:bg-red-600' 
                     : 'bg-gray-300 text-black hover:bg-gray-400'
                 }`}
                 onClick={handleLike}
               >
                 <ThumbsUp 
                   className={`${isLiked ? 'fill-current animate-pulse' : ''}`}
                   size={20}
                 />
               </button>
               <span className="mx-2">{likes} 따봉</span>
             </div>

             <div className="mt-6 bg-white rounded-lg shadow-md p-6 h-auto">
                <h2 className="text-lg font-bold mb-2">첨부파일</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  {request.attachFileResponses &&
                  request.attachFileResponses.length > 0 ? (
                    request.attachFileResponses.map((file, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <span className="mr-2">📎 {file.originFilename}</span>
                        <button
                          className="text-black border border-gray-300 bg-white rounded px-2"
                          onClick={() =>
                            handleFileClick(request.id, file.fileNo)
                          }
                        >
                          다운로드
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">첨부된 파일이 없습니다.</div>
                  )}
                </div>
              </div>
           </>
         )}
       </div>
     </div>

      {isRedboxModalOpen && (
        <RedboxDonationModal
          onClose={() => setIsRedboxModalOpen(false)}
          onSubmit={handleDonate}
        />
      )}
    </div>
  );
};

export default AdminRequestDetailPage;
