import { Link, useLocation } from "react-router-dom";
import logo from "../assets/image.png";

const FindResultPage = () => {
  const location = useLocation();
  // location.state로 전달된 데이터를 받아서 처리
  // type: "id" | "password"
  // foundId: string (아이디 찾기 결과일 경우)
  // email: string (비밀번호 찾기 결과일 경우)
  const { type, foundId, email } = location.state || {};

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
        </div>

        {/* 결과 메시지 */}
        <div className="text-center space-y-4">
          {type === "id" ? (
            <>
              <h3 className="text-xl font-medium text-gray-900">
                아이디 찾기 결과
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-2">회원님의 아이디는</p>
                <p className="text-xl font-bold text-red-600">{foundId}</p>
                <p className="text-gray-600 mt-2">입니다</p>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium text-gray-900">
                비밀번호 찾기 완료
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  {email} 으로
                  <br />
                  임시 비밀번호를 발송하였습니다
                </p>
              </div>
              <p className="text-sm text-gray-500">
                이메일이 확인되지 않는 경우 스팸메일함을 확인해주세요
              </p>
            </>
          )}
        </div>

        {/* 안내 메시지 */}
        {type === "password" && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              보안을 위해 로그인 후 반드시 비밀번호를 변경해주시기 바랍니다
            </p>
          </div>
        )}

        {/* 버튼 */}
        <div className="space-y-4">
          <Link
            to="/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            로그인하기
          </Link>
          {type === "id" && (
            <Link
              to="/find/account"
              state={{ activeTab: "password" }}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              비밀번호 찾기
            </Link>
          )}
        </div>

        {/* 추가 링크 */}
        <div className="text-center">
          <span className="text-sm text-gray-600">
            도움이 더 필요하신가요?{" "}
          </span>
          <Link
            to="/support"
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            고객센터
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindResultPage;
