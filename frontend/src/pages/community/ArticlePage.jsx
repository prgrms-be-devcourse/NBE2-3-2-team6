import { Link } from "react-router-dom";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";

const ArticlePage = () => {
  const notices = [
    {
      id: 1,
      title: "\"헌혈하니 식빵에 계란프라이가\"…47년간 152회 '헌혈유공자'",
      date: "2024-03-15",
      views: 156,
    },
    {
      id: 2,
      title: "적십자사, 멕시카나치킨과 헌혈문화 확산을 위한 업무협약 체결",
      date: "2024-03-10",
      views: 234,
    },
    {
      id: 3,
      title: "“헌혈은 생명 살리는 고귀한 선행”, 대구경북혈액원 김기헌 팀장",
      date: "2024-03-05",
      views: 189,
    },
    {
      id: 4,
      title: "누네안과병원, 12년째 헌혈나눔 캠페인 '90일의 기적' 진행",
      date: "2024-03-01",
      views: 145,
    },
    {
      id: 5,
      title: "이런 뉴스만 있다면…올겨울도 훈훈",
      date: "2024-02-28",
      views: 167,
    },
  ];

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        {/* 사이드바 */}
        <CommunitySideBar />

        {/* 메인 컨텐츠 */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px]">
            <h1 className="text-2xl font-bold mb-6">헌혈 기사</h1>

            {/* 게시판 리스트 */}
            <div className="border rounded-lg">
              {/* 헤더 */}
              <div className="flex bg-gray-50 py-3 border-b">
                <div className="w-16 text-center text-sm font-medium text-gray-500">
                  번호
                </div>
                <div className="flex-1 px-6 text-sm font-medium text-gray-500">
                  제목
                </div>
                <div className="w-24 text-center text-sm font-medium text-gray-500">
                  작성일
                </div>
                <div className="w-20 text-center text-sm font-medium text-gray-500">
                  조회수
                </div>
              </div>

              {/* 리스트 아이템들 */}
              <div className="divide-y">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="flex items-center py-3 hover:bg-gray-50"
                  >
                    <div className="w-16 text-center text-sm text-gray-500">
                      {notice.id}
                    </div>
                    <div className="flex-1 px-6">
                      <Link
                        to={`/community/notice/${notice.id}`}
                        className="text-gray-900 hover:text-red-600"
                      >
                        {notice.title}
                      </Link>
                    </div>
                    <div className="w-24 text-center text-sm text-gray-500">
                      {notice.date}
                    </div>
                    <div className="w-20 text-center text-sm text-gray-500">
                      {notice.views}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 페이지네이션 */}
            <div className="mt-6 flex justify-center">
              <nav className="flex space-x-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  이전
                </button>
                <button className="px-3 py-1 border rounded bg-red-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  다음
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
