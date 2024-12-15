import { useNavigate } from "react-router-dom";

const DonatePage = () => {
  const navigate = useNavigate();

  const handleLinkDonateButton = () => {
    navigate("/donate"); // 기본 이동
  };

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              생명을 나누는 <span className="text-red-600">따뜻한 마음</span>
            </h2>
            <p className="text-gray-600 mb-8">
              당신의 작은 기부가 누군가에게는 큰 희망이 됩니다
            </p>
            <button
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
              onClick={handleLinkDonateButton}
            >
              지금 기부하기
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-red-600 mb-2">1,234장</p>
              <p className="text-gray-600">현재까지 기부된 현혈증</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-red-600 mb-2">567명</p>
              <p className="text-gray-600">도움을 받은 환자</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-red-600 mb-2">89건</p>
              <p className="text-gray-600">진행중인 기부 요청</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DonatePage;
