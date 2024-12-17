import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";

const NoticePage = () => {
  const [data, setData] = useState({
    notices: [
      { id: 1, title: "현혈증 기부 시스템 이용 안내", date: "2024-03-15", views: 156 },
      { id: 2, title: "2024년 헌혈의 집 운영시간 변경 안내", date: "2024-03-10", views: 234 },
      { id: 3, title: "현혈증 기부 캠페인 안내", date: "2024-03-05", views: 189 },
      { id: 4, title: "시스템 정기 점검 안내", date: "2024-03-01", views: 145 }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <CommunitySideBar />

        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 p-6 h-[800px] max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">공지사항</h1>

            <div className="border rounded-lg">
              <div className="flex bg-gray-50 py-3 border-b">
                <div className="w-16 text-center text-sm font-medium text-gray-500">번호</div>
                <div className="flex-1 px-6 text-sm font-medium text-gray-500">제목</div>
                <div className="w-24 text-center text-sm font-medium text-gray-500">작성일</div>
                <div className="w-20 text-center text-sm font-medium text-gray-500">조회수</div>
              </div>

              <div className="divide-y">
                {data.notices.map((notice) => (
                  <div key={notice.id} className="flex items-center py-3 hover:bg-gray-50">
                    <div className="w-16 text-center text-sm text-gray-500">{notice.id}</div>
                    <div className="flex-1 px-6">
                      <Link to={`/community/notice/${notice.id}`} className="text-gray-900 hover:text-red-600">
                        {notice.title}
                      </Link>
                    </div>
                    <div className="w-24 text-center text-sm text-gray-500">{notice.date}</div>
                    <div className="w-20 text-center text-sm text-gray-500">{notice.views}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <nav className="flex space-x-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">이전</button>
                <button className="px-3 py-1 border rounded bg-red-600 text-white">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">다음</button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
