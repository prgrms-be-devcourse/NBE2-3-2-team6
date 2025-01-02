import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";
import api from "../../lib/axios";
import { formatDate } from "../../utils/dateUtils";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  const url = `/notices/${id}`;

  useEffect(() => {
    fetchNotice(); // 데이터 가져오기
  }, [id]);

  const fetchNotice = async () => {
    try {
      const response = await api.get(url);
      setNotice(response.data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생: ", error);
    }
  };

  const handleFileClick = async (noticeNo, fileNo) => {
    try {
      const response = await api.get(`/notices/${noticeNo}/files/${fileNo}`);
      // 파일 다운로드 처리
      window.location.href = response.data;
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <CommunitySideBar />
        <div className="flex-1 p-8">
          {notice && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">공지사항</h1>
                <hr className="my-4 border-t-2 border-gray-300" />
                <div className="flex bg-gray-50 py-3 border-b">
                  <div className="text-2xl flex-1 text-center">
                    {notice.title}
                  </div>
                </div>
                <div className="flex bg-gray-50 py-3 border-b">
                  <div className="w-20 text-center text-sm font-medium text-gray-500">
                    작성자
                  </div>
                  <div className="w-20 text-left text-sm font-medium">
                    {notice.writer}
                  </div>
                  <div className="w-20 text-center text-sm font-medium text-gray-500">
                    등록일
                  </div>
                  <div className="w-28 text-center text-sm font-medium">
                    {formatDate(notice.createdDate)}
                  </div>
                  <div className="w-20 text-right text-sm font-medium text-gray-500">
                    조회수
                  </div>
                  <div className="w-20 text-center text-sm font-medium">
                    {notice.views}
                  </div>
                </div>
                <div
                  className="mt-4 pl-4 h-[500px]"
                  dangerouslySetInnerHTML={{ __html: notice.content }}
                ></div>
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-md p-6 h-auto">
                <h2 className="text-lg font-bold mb-2">첨부파일</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  {notice.attachFileResponses &&
                  notice.attachFileResponses.length > 0 ? (
                    notice.attachFileResponses.map((file, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <span className="mr-2">📎 {file.originFilename}</span>
                        <button
                          className="text-black border border-gray-300 bg-white rounded px-2"
                          onClick={() =>
                            handleFileClick(notice.noticeNo, file.fileNo)
                          }
                        >
                          다운로드
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">첨부된 파일이 없습니다.</div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  className="bg-gray-300 text-black rounded px-4 py-2"
                  onClick={() => navigate("/community/notice")}
                >
                  목록
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailPage;
