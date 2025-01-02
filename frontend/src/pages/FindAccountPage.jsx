import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../lib/axios";
import logo from "../assets/image.png";

const FindAccountPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("id");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 폼 데이터 상태
  const [idFormData, setIdFormData] = useState({
    name: "",
    phone: "",
  });

  const [passwordFormData, setPasswordFormData] = useState({
    email: "",
    name: "",
  });

  // 아이디 찾기 폼 핸들러
  const handleIdFormChange = (e) => {
    const { name, value } = e.target;
    setIdFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 비밀번호 찾기 폼 핸들러
  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 아이디 찾기 제출
const handleFindId = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // Axios 요청
    const response = await api.post("/auth/find-id", {
      userName: idFormData.name,
      phoneNumber: idFormData.phone, // 하이픈 포함된 전화번호 그대로 전송
    });

    // 성공 시 결과 페이지로 이동
    navigate("/find/result", {
      state: {
        type: "id",
        foundId: response.data.email, // FindIdResponse의 email 필드 사용
      },
    });
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "아이디를 찾을 수 없습니다. 입력하신 정보를 다시 확인해주세요."
    );
  } finally {
    setLoading(false);
  }
};

  // 비밀번호 찾기 제출
  const handleFindPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await api.post("/auth/reset-password", {
        email: passwordFormData.email,
        username: passwordFormData.name,
      });
  
      // 성공 시 결과 페이지로 이동
      navigate("/find/result", {
        state: {
          type: "password",
          email: passwordFormData.email, // 이메일을 통해 비밀번호 재설정 안내
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "등록된 정보를 찾을 수 없습니다. 입력하신 정보를 다시 확인해주세요."
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {/* 로고 섹션 */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <img src={logo} alt="로고" className="h-8 w-8" />
            <h2 className="text-2xl font-bold text-gray-900">
              현혈증 기부 시스템
            </h2>
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            아이디/비밀번호를 잊으셨나요?
          </p>
        </div>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* 탭 선택 */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "id"
                ? "border-b-2 border-red-500 text-red-600"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("id");
              setError("");
            }}
          >
            아이디 찾기
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "password"
                ? "border-b-2 border-red-500 text-red-600"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("password");
              setError("");
            }}
          >
            비밀번호 찾기
          </button>
        </div>

        {/* 아이디 찾기 폼 */}
        {activeTab === "id" && (
          <form onSubmit={handleFindId} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  이름
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={idFormData.name}
                  onChange={handleIdFormChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="이름"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  연락처
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={idFormData.phone}
                  onChange={handleIdFormChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="연락처를 입력하세요 ex) 010-0000-0000"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
              >
                {loading ? "처리중..." : "아이디 찾기"}
              </button>
            </div>
          </form>
        )}

        {/* 비밀번호 찾기 폼 */}
        {activeTab === "password" && (
          <form onSubmit={handleFindPassword} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  아이디(이메일)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={passwordFormData.email}
                  onChange={handlePasswordFormChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="아이디(이메일)"
                />
              </div>
              <div>
                <label htmlFor="name" className="sr-only">
                  이름
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={passwordFormData.name}
                  onChange={handlePasswordFormChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="이름"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
              >
                {loading ? "처리중..." : "비밀번호 찾기"}
              </button>
            </div>
          </form>
        )}

        {/* 하단 링크 */}
        <div className="text-center space-y-2">
          <div>
            <Link
              to="/login"
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              로그인으로 돌아가기
            </Link>
          </div>
          <div>
            <span className="text-sm text-gray-600">
              아직 회원이 아니신가요?{" "}
            </span>
            <Link
              to="/signup"
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAccountPage;
