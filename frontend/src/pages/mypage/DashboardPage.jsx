import { useState, useEffect } from "react";
import MyPageSideBar from "../../components/wrapper/MyPageSideBar";
import api from "../../lib/axios";
import {
  User,
  Calendar,
  Heart,
  Users,
  Clock,
  Phone,
  Award,
} from "lucide-react";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    userInfo: {
      name: "",
      birth: "",
      gender: "",
      phoneNumber: "",
    },
    donationStats: {
      totalDonatedCards: 0,
      patientsHelped: 0,
      grade: "",
      lastDonationDate: "",
      inProgressRequests: 0,
    },
  });

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.error("대시보드 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const { userInfo, donationStats } = dashboardData;

  const formatGender = (gender) => {
    if (gender === "MALE") return "남";
    if (gender === "FEMALE") return "여";
    return "N/A";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-full">
        <MyPageSideBar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm p-8 h-full">
            <div className="space-y-8">
              {/* Profile and Grade Section */}
              <div className="grid grid-cols-12 gap-12">
                <div className="col-span-9 space-y-4">
                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <User className="text-gray-400" />
                    <span className="text-gray-600">성 명:</span>
                    <span className="font-medium">{userInfo.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <Calendar className="text-gray-400" />
                    <span className="text-gray-600">생년월일:</span>
                    <span>{userInfo.birth}</span>
                  </div>
                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <User className="text-gray-400" />
                    <span className="text-gray-600">성 별:</span>
                    <span>{formatGender(userInfo.gender)}</span>
                  </div>
                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <Phone className="text-gray-400" />
                    <span className="text-gray-600">연락처:</span>
                    <span>{userInfo.phoneNumber}</span>
                  </div>
                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <Clock className="text-gray-400" />
                    <span className="text-gray-600">최근 기부일자:</span>
                    <span>{donationStats.lastDonationDate}</span>
                  </div>
                </div>

                <div className="col-span-3 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full border-4 border-red-500 flex items-center justify-center">
                        <div className="text-center">
                          <Award className="w-8 h-8 text-red-500 mx-auto mb-2" />
                          <h3 className="text-xl font-bold text-red-500">
                            {donationStats.grade || "N/A"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {donationStats.grade === "BRONZE" && "헌혈 초보자"}
                            {donationStats.grade === "SILVER" && "헌혈 입문자"}
                            {donationStats.grade === "GOLD" && "헌혈 마스터"}
                            {donationStats.grade === "MVP" && "헌혈 레전드"}
                          </p>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {donationStats.totalDonatedCards}개
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards Section */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <Heart className="w-6 h-6 text-red-500" />
                    <span className="text-2xl font-bold text-red-500">
                      {donationStats.totalDonatedCards}개
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    현재까지 기부한 헌혈증
                  </p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <Users className="w-6 h-6 text-red-500" />
                    <span className="text-2xl font-bold text-red-500">
                      {donationStats.patientsHelped}명
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">도움을 받은 환자</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <Clock className="w-6 h-6 text-red-500" />
                    <span className="text-2xl font-bold text-red-500">
                      {donationStats.inProgressRequests}개
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">진행중인 기부 요청</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
