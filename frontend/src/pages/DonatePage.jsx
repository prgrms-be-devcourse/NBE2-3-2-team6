import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import MemberDonationModal from "../components/MemberDonationModal";
import RedboxDonationModal from "../components/RedboxDonationModal";
import logo from "../assets/image.png";

const DonatePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    totalDonatedCards: 0,
    totalPatientsHelped: 0,
    inProgressRequests: 0,
  });
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isRedboxModalOpen, setIsRedboxModalOpen] = useState(false);
  const [donationType, setDonationType] = useState("");

  const handleSubmit = async (quantity, comment, userId = null) => {
    try {
      await api.post(`/donate/${donationType}`, {
        userId,
        quantity,
        comment,
      });
      alert("기부되었습니다.");
    } catch (error) {
      console.error("기부 오류:", error);
      alert("기부에 실패하였습니다");
    }
    setIsMemberModalOpen(false);
    setIsRedboxModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/redbox/stats");
      setData(response.data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
      alert("레드박스 데이터를 불러오는 데 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
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
            <div className="flex justify-center space-x-8">
              <button
                className="bg-white border border-gray-300 hover:border-red-500 hover:text-red-600 transition-all text-gray-700 rounded-lg px-6 py-3 flex items-center justify-center shadow-md"
                onClick={() => {
                  setDonationType("redbox");
                  setIsRedboxModalOpen(true);
                }}
              >
                <img src={logo} alt="레드 박스" className="w-12 h-12 mr-2" />
                레드박스 기부하기
              </button>
              <button
                className="bg-white border border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-all text-gray-700 rounded-lg px-6 py-3 flex items-center justify-center shadow-md"
                onClick={() => {
                  setDonationType("user");
                  setIsMemberModalOpen(true);
                }}
              >
                <img src={logo} alt="개인 기부" className="w-12 h-12 mr-2" />
                개인에게 기부하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-red-600">레드박스 통계</h3>
            <p className="text-gray-600 text-xl mt-4">
              진행중인 레드박스 기부 현황과 요청 건수를 확인해보세요.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8 text-center">
            {/* 총 기부된 헌혈증 */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <p className="text-4xl font-bold text-red-600 mb-2">
                {data.totalDonatedCards} 개
              </p>
              <p className="text-gray-600 text-lg">레드박스에 기부된 헌혈증</p>
            </div>
            {/* 도움을 받은 환자 */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <p className="text-4xl font-bold text-red-600 mb-2">
                {data.totalPatientsHelped} 명
              </p>
              <p className="text-gray-600 text-lg">
                레드박스를 통해 도움받은 환자
              </p>
            </div>
            {/* 진행 중인 기부 요청 */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <p className="text-4xl font-bold text-red-600 mb-2">
                {data.inProgressRequests} 건
              </p>
              <button
                className="text-gray-600 text-lg hover:text-black"
                onClick={() => navigate("/community/request")}
              >
                진행 중인 요청 확인하기
              </button>
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
