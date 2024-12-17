import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useHistory 추가
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  const noticesData = [
    {
      id: 1,
      title: "현혈증 기부 시스템 이용 안내",
      author: "관리자",
      date: "2024-03-15",
      views: 156,
      content: "공지사항 내용입니다. 현혈증 기부 시스템에 대한 안내입니다.",
      attachments: [
        { name: "수혈비용 청구서(20170701 개정).hwp", downloads: 683 },
        { name: "수혈자 내역서(20170701 개정).xls", downloads: 750 },
        { name: "20220924 헌혈증서 재발급 실시에 대한 안내.hwp", downloads: 744 },
      ],
    },
    { id: 2, title: "2024년 헌혈의 집 운영시간 변경 안내", author: "관리자", date: "2024-03-10", views: 234, content: "공지사항 내용입니다. 현혈증 기부 시스템에 대한 안내입니다." },
    { id: 3, title: "현혈증 기부 캠페인 안내", author: "관리자", date: "2024-03-05", views: 189, content: "공지사항 내용입니다. 현혈증 기부 시스템에 대한 안내입니다." },
    { id: 4, title: "시스템 정기 점검 안내", author: "관리자", date: "2024-03-01", views: 145, content: "공지사항 내용입니다. 현혈증 기부 시스템에 대한 안내입니다." },
  ];

  useEffect(() => {
    const foundNotice = noticesData.find((notice) => notice.id === parseInt(id));
    setNotice(foundNotice);
  }, [id]);

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <CommunitySideBar />

        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px] max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">공지사항</h1>
            <hr className="my-4 border-t-2 border-gray-300" />
            <div className="flex bg-gray-50 py-3 border-b">
              <div className="text-2xl flex-1 text-center">{notice.title}</div>
            </div>
            <div className="flex bg-gray-50 py-3 border-b">
              <div className="w-20 text-center text-sm font-medium text-gray-500">작성자</div>
              <div className="w-20 text-left text-sm font-medium">{notice.author}</div>
              <div className="w-20 text-center text-sm font-medium text-gray-500">등록일</div>
              <div className="w-28 text-center text-sm font-medium">{notice.date}</div>
              <div className="w-20 text-right text-sm font-medium text-gray-500">조회수</div>
              <div className="w-20 text-center text-sm font-medium">{notice.views}</div>
            </div>
            <p className="mt-4 pl-4">{notice.content}</p>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-md p-6 h-auto max-w-6xl">
            <h2 className="text-lg font-bold mb-2">첨부파일</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              {notice.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="mr-2">📎 {attachment.name} (다운로드 : {attachment.downloads}회)</span>
                  <button className="text-black border border-gray-300 bg-white rounded px-2">미리보기</button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button
              className="bg-gray-300 text-black rounded px-4 py-2"
              onClick={() => {navigate("/community/notice") }}
            >
              목록
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailPage;
