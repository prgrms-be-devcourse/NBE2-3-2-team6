import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image.png";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="border-b border-b-gray-100 py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="로고" className="h-8 w-8" />
          <Link to="/" className="text-2xl font-bold">
            현혈증 기부 시스템
          </Link>
        </div>

        <nav className="flex space-x-6">
          <Link
            to="/donate"
            className="flex items-center hover:text-red-400 py-2"
          >
            기부하기
          </Link>

          {/* 커뮤니티 드롭다운 추가 */}
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-red-400 py-2">
              <span>커뮤니티</span>
              <ChevronDown size={16} />
            </button>

            <div className="invisible group-hover:visible absolute left-0 w-48 bg-white text-black rounded-md shadow-lg">
              <div className="py-1">
                <Link
                  to="/community/notice"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                >
                  공지사항
                </Link>
                <Link
                  to="/community/request"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                >
                  요청게시판
                </Link>
                <Link
                  to="/community/article"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                >
                  헌혈 기사
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-red-400 py-2">
              <span>헌혈의집</span>
              <ChevronDown size={16} />
            </button>

            <div className="invisible group-hover:visible absolute left-0 w-48 bg-white text-black rounded-md shadow-lg">
              <div className="py-1">
                <Link
                  to="/center"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                >
                  헌혈의 집 찾기
                </Link>
                {/* <Link
                  to="/center/reservation"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                >
                  예약
                </Link> */}
              </div>
            </div>
          </div>

          {/* 로그인 상태에 따른 조건부 렌더링 */}
          {isLoggedIn ? (
            <>
              {/* 마이페이지 드롭다운 */}
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-red-400 py-2">
                  <span>마이페이지</span>
                  <ChevronDown size={16} />
                </button>

                <div className="invisible group-hover:visible absolute left-0 w-48 bg-white text-black rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      to="/mypage/dashboard"
                      className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                    >
                      대시보드
                    </Link>
                    <Link
                      to="/mypage/redcard"
                      className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                    >
                      나의 헌혈증 목록
                    </Link>
                    <Link
                      to="/mypage/profile"
                      className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                    >
                      회원 정보 수정
                    </Link>
                    <Link
                      to="/mypage/request"
                      className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                    >
                      나의 요청 목록
                    </Link>
                    <Link
                      to="/mypage/history"
                      className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                    >
                      기부 / 수혜 목록
                    </Link>
                  </div>
                </div>
              </div>

              {/* 로그아웃 버튼 */}
              <button
                onClick={handleLogout}
                className="flex items-center hover:text-red-400 py-2"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center hover:text-red-400 py-2"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
