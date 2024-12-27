import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Editor } from "@toast-ui/react-editor";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";
import axios from "axios";

const RequestModifyPage = () => {
  const { id } = useParams(); // URL에서 ID를 가져옴
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [donationStartDate, setDonationStartDate] = useState("");
  const [donationEndDate, setDonationEndDate] = useState("");
  const [donationAmount, setDonationAmount] = useState("1");
  const [attachFile, setAttachFile] = useState("선택된 파일 없음");
  const [initialContent, setInitialContent] = useState(""); // 에디터 초기값

  const fetchRequestDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/requests/${id}`);
      const data = response.data;

      setTitle(data.title);
      setDonationStartDate(data.startDate);
      setDonationEndDate(data.endDate);
      setDonationAmount(data.targetAmount);
      setInitialContent(data.content);

      if (data.attachments && data.attachments.length > 0) {
        setAttachFile(data.attachments[0].name);
      }
    } catch (error) {
      console.error("요청 데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    fetchRequestDetails(); // 페이지가 로드되면 데이터 불러오기
  }, [id]);

  useEffect(() => {
    // Editor의 내용을 동적으로 설정
    if (editorRef.current) {
      editorRef.current.getInstance().setHTML(initialContent || ""); // 초기값이 없으면 빈 문자열
    }
  }, [initialContent]);

  const handleSaveButton = async () => {
    try {
      const content = editorRef.current?.getInstance().getHTML();
      const file = fileInputRef.current?.files[0];

      if (!title || !content) {
        alert("제목과 내용을 입력해주세요");
        return;
      }

      const formData = new FormData();
      const postData = {
        requestTitle: title,
        requestContent: content,
        targetAmount: donationAmount,
        donationStartDate: donationStartDate,
        donationEndDate: donationEndDate,
      };

      formData.append("post", new Blob([JSON.stringify(postData)], { type: "application/json" }));
      if (file) {
        formData.append("file", file);
      }

      const response = await axios.put(
        `http://localhost:8080/requests/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("수정이 완료되었습니다.");
        navigate(`/community/requests/${id}`);
      } else {
        alert("수정 실패");
      }
    } catch (error) {
      console.error("Error modifying put:", error);
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <CommunitySideBar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">글 수정</h1>

            <div className="mb-4">
              <input
                type="text"
                placeholder="제목을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기부 시작일자
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={donationStartDate}
                  onChange={(e) => setDonationStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기부 종료일자
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={donationEndDate}
                  onChange={(e) => setDonationEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                헌혈증 요청 개수
              </label>
              <input
                type="number"
                min="1"
                placeholder="요청할 헌혈증 개수를 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                첨부파일
              </label>
              <div className="flex items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setAttachFile(file ? file.name : "선택된 파일 없음");
                  }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  파일 선택
                </button>
                <span className="ml-3 text-sm text-gray-500">{attachFile}</span>
              </div>
            </div>

            <div className="border rounded-lg">
              <Editor
                ref={editorRef}
                initialValue="<p>로딩 중...</p>" // 기본 초기값
                height="600px"
                initialEditType="wysiwyg"
                hideModeSwitch={true}
                useCommandShortcut={false}
                language="ko-KR"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => navigate(`/community/requests/${id}`)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleSaveButton}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModifyPage;
