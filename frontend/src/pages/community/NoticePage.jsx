import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";

const NoticePage = () => {
  const [data, setData] = useState({ notices: [] });

  const url = 'https://316fa20d-ea61-4140-9970-98cd5e0fda23.mock.pstmn.io/redbox/notices'

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("네트워크 응답이 좋지 않습니다.");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생 : ", error);
    }
  };

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <CommunitySideBar />

        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px] max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">공지사항</h1>

            <div className="border rounded-lg">
              <div className="flex bg-gray-50 py-3 border-b">
                <div className="w-16 text-center text-sm font-medium text-gray-500">번호</div>
                <div className="flex-1 px-6 text-center text-sm font-medium text-gray-500">제목</div>
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

            {/* TODO 페이지네이션 */}
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
