import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Editor } from "@toast-ui/react-editor";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";

const RequestWritePage = () => {
  // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const navigate = useNavigate();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [donationStartDate, setDonationStartDate] = useState(
    formatDate(new Date())
  );
  const [donationEndDate, setDonationEndDate] = useState(
    formatDate(new Date())
  );
  const [donationAmount, setDonationAmount] = useState("1");
  const [attachFile, setAttachFile] = useState("");

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleDonationStartDateInput = (e) => {
    setDonationStartDate(e.target.value);
  };

  const handleDonationEndDateInput = (e) => {
    setDonationEndDate(e.target.value);
  };

  const handleDonationAmountInput = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleFileButton = () => {
    fileInputRef.current?.click();
  };

  const handleAttachFileInput = (e) => {
    setAttachFile(e.target.value);
  };

  const handleSaveButton = async () => {
    try {
      const content = editorRef.current?.getInstance().getHTML();

      console.log(content);

      // TODO: API 호출로 데이터 저장
      // const response = await axios.post("http://localhost:8080/boards", {
      //   title,
      //   content,
      // });

      // navigate("/community/request");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleCancelButton = () => {
    navigate("/community/request");
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        {/* 사이드바 */}
        <CommunitySideBar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">글쓰기</h1>

            {/* 제목 입력 */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="제목을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={title}
                onChange={handleTitleInput}
              />
            </div>

            {/* 기부 기간 및 요청 개수 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기부 시작일자
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={donationStartDate}
                  onChange={handleDonationStartDateInput}
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
                  onChange={handleDonationEndDateInput}
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
                onChange={handleDonationAmountInput}
              />
            </div>

            {/* 파일 첨부 */}
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
                />
                <button
                  onClick={handleFileButton}
                  onChange={handleAttachFileInput}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  파일 선택
                </button>
                <span className="ml-3 text-sm text-gray-500">
                  선택된 파일 없음
                </span>
              </div>
            </div>

            {/* 에디터 */}
            <div className="border rounded-lg">
              <Editor
                ref={editorRef}
                initialValue=""
                height="600px"
                initialEditType="wysiwyg"
                hideModeSwitch={true}
                useCommandShortcut={false}
                language="ko-KR"
              />
            </div>

            {/* 버튼 그룹 */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={handleCancelButton}
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

export default RequestWritePage;
