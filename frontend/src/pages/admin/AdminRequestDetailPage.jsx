import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSideBar from "../../components/wrapper/AdminSidebar";
import axios from "axios";
import { ThumbsUp } from 'lucide-react';
import { HandHeart } from 'lucide-react';
import RedboxDonationModal from "../../components/RedboxDonationModal";

const AdminRequestDetailPage = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const [request, setRequest] = useState(null);
 const [likes, setLikes] = useState(0);
 const [currentAmount, setCurrentAmount] = useState(0);
 const [isRedboxModalOpen, setIsRedboxModalOpen] = useState(false); 
 const [isLiked, setIsLiked] = useState(true);
 // TODO: 게시글 관련해서 첨부파일 다운로드 기능 개발 할건가요 현구님께 물어봅시다 딩동댕

 const url = `https://9891dae0-553b-40f5-9ada-4f17eb1659c2.mock.pstmn.io/redbox/request/${id}`;

 const fetchData = async () => {
  try {
    const response = await axios.get(url);
    setRequest(response.data);
    setLikes(response.data.likes);
    setCurrentAmount(response.data.current_amount);
    setIsLiked(response.data.isLiked);
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생: ", error);
  }
};

 useEffect(() => {
    fetchData(); // 2번 날라감(좋아요 시)
 }, [id, isLiked]);

 const handleLike = async() => {
   try {
     const response = await axios.post(url+"/like");
 
     if (response.status === 200) {
       alert(response.data.message);
       //TODO : 재렌더링을 위해서 isLiked로 설정했는데 fetchData()가 두 번 호출되는 issue (성능 개선)
       setIsLiked((prevIsLiked) => !prevIsLiked);
     }
   } catch (error) {
     console.error("좋아요 요청 오류:", error);
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
     const response = await axios.post(donationUrl, payload);
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

 const handleDeleteBtn = async() => {
   try{
       const response = await axios.post(url);

       if(response.ok) {
           alert(response.data.message);
           //TODO: 삭제 성공시 목록으로 가기
       }
   } catch(error) {
       console.log("err");
   }  
 };

 return (
   <div className="flex-1 bg-gray-50">
     <div className="flex">
       <AdminSideBar />
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
               <div className="w-16 text-center text-sm text-gray-500">
                   <button
                       onClick={() => handleDeleteBtn()}
                       className="mx-1 px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                   >
                     삭제
                   </button>
               </div>
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