import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/axios";

const ApprovalRequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(0); //count 초기값 0
  const [request, setRequest] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, action: "", title: "", id: id });

  const url = `http://localhost:8080/admin/requests/${id}`;

  //const url = `/admin/requests/${id}`;

  const handleFileClick = async (requestNo, fileNo) => {
    try {
      const response = await api.get(`/requests/${requestNo}/files/${fileNo}`);
      // 파일 다운로드 처리
      window.location.href = response.data;
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
    }
  };

  /// 데이터 가져오기
  const fetchData = async () => {
    try {
      const response = await api.get(url);
      setRequest(response.data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생 : ", error);
    }
  };

  /// 데이터 보내기 (게시판 id, status)
  const sendData = async(id, status) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                approveStatus: status,
            }),
        });


        if (response.ok) {
            alert("처리 완료");
            setCount(count+1); 
            navigate('/admin/approve');
        }

    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [
    count 
  ]);

  /// 모달 핸들링
  const handleModal = (action, reqdata) => {
    setModal({ isOpen: true, action, title: reqdata.title, id: reqdata.id });
  };

  /// 데이터 보내기 (게시판 id, status)
  const handleEdit = (id) => {
    sendData(id, '승인');
  };

  const handleDelete = (id) => {
      sendData(id, '거절');
  };

  const confirmAction = () => {
    if (modal.action === '승인') {
        handleEdit(modal.id);
    } else if (modal.action === '거절') {
        handleDelete(modal.id);
    }
    setModal({ isOpen: false, action: '', title: '', id: null });
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        {/* 메인 컨텐츠 */}
        <div className="flex-1 p-8">
          {request && (
            <div className="bg-white max-w-screen-lg mx-auto rounded-lg shadow-md p-6 h-auto">
              <h1 className="text-2xl text-center font-bold mb-6">게시글 승인 요청</h1>
              <div className="flex bg-gray-50 py-3 border-b">
                <div className="text-2xl flex-1 text-center">{request.title}</div>
              </div>
              <div className="flex bg-gray-50 py-3 border-b">
                <div className="w-20 text-center text-sm font-medium text-gray-500">작성자</div>
                <div className="w-20 text-center text-sm font-medium">{request.author}</div>
                <div className="w-20 text-center text-sm font-medium text-gray-500">등록일</div>
                <div className="w-24 text-center text-sm font-medium">{request.date}</div>
                <div className="w-24 text-center text-sm font-medium text-gray-500">기부 시작일</div>
                <div className="w-24 text-center text-sm font-medium">{request.startDate}</div>
                <div className="w-24 text-center text-sm font-medium text-gray-500">기부 마감일</div>
                <div className="w-24 text-center text-sm font-medium">{request.endDate}</div>
                <div className="w-32 text-center text-sm font-medium text-gray-500">목표 헌혈증 개수</div>
                <div className="w-4 text-center text-sm font-medium">{request.targetAmount}</div>
                <div className="w-12 text-center text-sm font-medium text-red-600">{request.status}</div>
                <div className="w-16 text-center text-sm font-medium text-gray-500">조회수</div>
                <div className="w-8 text-center text-sm font-medium">{request.views}</div>
              </div>
              <div
                className="mt-4 pl-4 h-[350px]"
                dangerouslySetInnerHTML={{ __html: request.content }}
              ></div>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6 h-auto">
                <h2 className="text-lg font-bold mb-2">첨부파일</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  {request.attachFileResponses &&
                  request.attachFileResponses.length > 0 ? (
                    request.attachFileResponses.map((file, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <span className="mr-2">📎 {file.originFilename}</span>
                        <button
                          className="text-black border border-gray-300 bg-white rounded px-2"
                          onClick={() =>
                            handleFileClick(request.id, file.fileNo)
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

              <div className="flex justify-between items-center mt-4 pt-4">
                <button
                  className="mx-1 px-3 py-2 bg-gray-300 text-black rounded"
                  onClick={() => navigate("/admin/approve")}
                >
                  목록
                </button>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleModal("승인", request)}
                    className="mx-1 px-3 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => handleModal("거절", request)}
                    className="mx-1 px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    거절
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {modal.isOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">{modal.action} 확인</h2>
              <p className="mb-4">'{modal.id}'번 게시물을 {modal.action}하시겠습니까?</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={confirmAction}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  확인
                </button>
                <button
                  onClick={() => setModal({ isOpen: false, action: "", title: "", id: null })}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalRequestDetailPage;
