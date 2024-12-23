import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MemberDonationModal from "../components/MemberDonationModal";
import RedboxDonationModal from "../components/RedboxDonationModal";

const DonatePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isRedboxModalOpen, setIsRedboxModalOpen] = useState(false);

  const url = 'https://ab876606-577e-4a4b-87b5-90e8cac3a98f.mock.pstmn.io/redbox';

  const handleSubmit = async ( quantity, comment, memberId = null) => {
    try {
      const payload = memberId ? { quantity, comment, memberId } : { quantity, comment };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("기부 성공");
      } else {
        throw new Error("기부 요청 실패");
      }
    } catch (error) {
      console.error("기부 오류:", error);
      alert("기부 실패");
    }
    setIsMemberModalOpen(false);
    setIsRedboxModalOpen(false);
  };
  
  const fetchData = async() => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch(error) {
      console.error("데이터를 가져오는 중 오류 발생 : ", error)
    }
  };

  useEffect(() => {
    fetchData(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);


  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold mt-10 mb-10">
              생명을 나누는 <span className="text-red-600">따뜻한 마음</span>
            </h2>
            <p className="text-gray-600 text-3xl mt-15 mb-20">
              당신의 작은 기부가 누군가에게는 큰 희망이 됩니다
            </p>
            <button className="bg-green-500 hover:bg-pink-500 transition-colors rounded-lg mr-8"
              onClick={() => setIsRedboxModalOpen(true)}
            >
              <img src="/src/assets/image.png" alt="레드 박스" className="w-25 h-25" />
              레드박스 기부하기
            </button>
            <button className="bg-yellow-500 hover:bg-blue-500 transition-colors rounded-lg ml-8"
              onClick={() => setIsMemberModalOpen(true)}
            >
              <img src="/src/assets/image.png" alt="레드 박스" className="w-25 h-25" />
              개인에게 기부하기
            </button>
          </div>
        </div>

            
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-red-600 mb-2">{data.cnt_donate} 명</p>
              <p className="text-gray-600">현재까지 기부된 현혈증</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-red-600 mb-2">{data.cnt_receive_users} 명</p>
              <p className="text-gray-600">도움을 받은 환자</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-red-600 mb-2">{data.cnt_articles} 건</p>
              <button className="text-gray-600 hover:text-black" onClick={()=>{navigate("/community/request")}}>진행중인 기부 요청 확인하기</button>
            </div>
          </div>
        </div>
      </section>
      {/* 모달 컴포넌트 */}
      {isMemberModalOpen && (
        <MemberDonationModal
          onClose={() => setIsMemberModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
      {isRedboxModalOpen && (
        <RedboxDonationModal
          onClose={() => setIsRedboxModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
};

export default DonatePage;
