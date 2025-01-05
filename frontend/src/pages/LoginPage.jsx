import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api, { decodeJWT } from "../lib/axios";
import logo from "../assets/image.png";
import { getRedirectPath } from "../utils/roleRedirect";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const accessToken = response.headers["access"];
      localStorage.setItem("accessToken", accessToken);

      // JWT 디코딩
      const decodedToken = decodeJWT(accessToken);
      const userRole = decodedToken?.role;

      // 권한에 따른 리다이렉션
      navigate(getRedirectPath(userRole));
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.");
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
              헌혈증 기부 시스템
            </h2>
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            로그인하여 헌혈증 기부를 시작해보세요
          </p>
        </div>

        {/* 로그인 폼 */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="이메일"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="비밀번호"
              />
            </div>
          </div>

          {/* 로그인 상태 유지 및 아이디/비밀번호 찾기 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                로그인 상태 유지
              </label>
            </div>
            <div className="text-sm">
              <Link
                to="/find/account"
                className="font-medium text-red-600 hover:text-red-500"
              >
                아이디/비밀번호 찾기
              </Link>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              로그인
            </button>
          </div>
        </form>

        {/* 오류 메시지 출력 */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* 소셜 로그인 */}
        <div className="mt-8">
          <div className="text-center text-sm text-gray-500 mb-4">소셜 계정으로 로그인</div>
          <div className="grid grid-cols-1 gap-4">
            <button className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <img
                src="/src/assets/btnG_아이콘원형.png" // 원형 네이버 아이콘 이미지 경로
                alt="네이버 로그인"
                className="h-12 w-12" // 이미지 크기를 약간 키움
              />
            </button>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center">
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
  );
};

export default LoginPage;
