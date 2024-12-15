import { Link } from "react-router-dom";
import logo from "../assets/image.png";
import { ChevronDown } from "lucide-react";

const Header = () => {
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
                  to="/blood-house/reservation"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                >
                  조회 및 예약
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/login"
            className="flex items-center hover:text-red-400 py-2"
          >
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
