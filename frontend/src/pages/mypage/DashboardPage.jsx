import MyPageSideBar from "../../components/wrapper/MyPageSideBar";
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
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-full">
        <MyPageSideBar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm p-8 h-full">
            {/* Main Content Section */}
            <div className="space-y-8">
              {/* Profile and Grade Section */}
              <div className="grid grid-cols-12 gap-12">
                {/* Left Side - Profile Info */}
                <div className="col-span-9 space-y-4">
                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <User className="text-gray-400" />
                    <span className="text-gray-600">성 명:</span>
                    <span className="font-medium">홍길동</span>
                  </div>

                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <Calendar className="text-gray-400" />
                    <span className="text-gray-600">생년월일:</span>
                    <span>1990.01.01</span>
                  </div>

                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <User className="text-gray-400" />
                    <span className="text-gray-600">성 별:</span>
                    <span>여</span>
                  </div>

                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <Phone className="text-gray-400" />
                    <span className="text-gray-600">연락처:</span>
                    <span>010-5555-9999</span>
                  </div>

                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <Clock className="text-gray-400" />
                    <span className="text-gray-600">최근 기부일자:</span>
                    <span>2024.03.15</span>
                  </div>

                  <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <Clock className="text-gray-400" />
                    <span className="text-gray-600">최근 헌혈일자:</span>
                    <span>2024.03.15</span>
                  </div>
                </div>

                {/* Right Side - Grade Badge */}
                <div className="col-span-3 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full border-4 border-red-500 flex items-center justify-center">
                        <div className="text-center">
                          <Award className="w-8 h-8 text-red-500 mx-auto mb-2" />
                          <h3 className="text-xl font-bold text-red-500">
                            VIP
                          </h3>
                          <p className="text-sm text-gray-500">헌혈 전문가</p>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">A+</span>
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
                      1,234
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    현재까지 기부된 현혈증
                  </p>
                  <p className="text-red-400 text-xs mt-2">
                    +12% from last month
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <Users className="w-6 h-6 text-red-500" />
                    <span className="text-2xl font-bold text-red-500">567</span>
                  </div>
                  <p className="text-gray-600 text-sm">도움을 받은 환자</p>
                  <p className="text-red-400 text-xs mt-2">
                    +5% from last month
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <Clock className="w-6 h-6 text-red-500" />
                    <span className="text-2xl font-bold text-red-500">89</span>
                  </div>
                  <p className="text-gray-600 text-sm">진행중인 기부 요청</p>
                  <p className="text-red-400 text-xs mt-2">+3 new requests</p>
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
