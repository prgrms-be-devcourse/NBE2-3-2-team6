import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Editor } from "@toast-ui/react-editor";
import CommunitySideBar from "../../components/wrapper/CommunitySideBar";
import api from "../../lib/axios";
import { useEffect } from 'react';

const url = "/write/requests";

const RequestWritePage = () => {
  const formatDate = (date) => date.toISOString().split("T")[0];

  const navigate = useNavigate();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [donationStartDate, setDonationStartDate] = useState(formatDate(new Date()));
  const [donationEndDate, setDonationEndDate] = useState(formatDate(new Date()));
  const [donationAmount, setDonationAmount] = useState("1");
  const [attachFiles, setAttachFiles] = useState([]);

  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleDonationStartDateInput = (e) => setDonationStartDate(e.target.value);
  const handleDonationEndDateInput = (e) => setDonationEndDate(e.target.value);
  const handleDonationAmountInput = (e) => setDonationAmount(e.target.value);

  useEffect(() => {
    // 오늘 날짜를 yyyy-mm-dd 형식으로 설정
    const today = new Date().toISOString().split('T')[0];
    setDonationStartDate(today); // 기본적으로 시작일자를 오늘 날짜로 설정
    setDonationEndDate(today);   // 기본적으로 종료일자를 시작일자와 동일하게 설정
  }, []);

  const handleFileButton = () => {
    fileInputRef.current?.click();
  };

  // 파일 처리 함수 수정
  const handleAttachFileInput = (e) => {
    const files = Array.from(e.target.files);
    setAttachFiles((prev) => [...prev, ...files]);
  };

  // 파일 삭제 함수 추가
  const handleFileDelete = (index) => {
    setAttachFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveButton = async () => {
    try {
      const content = editorRef.current?.getInstance().getHTML();

      if (!title || !content) {
        alert("제목과 내용을 입력해주세요");
        return;
      }

      const formData = new FormData();
      const postData = {
        requestTitle: title,
        requestContent: content,
        targetAmount: donationAmount,
        donationStartDate,
        donationEndDate,
      };
      formData.append(
        "post",
        new Blob([JSON.stringify(postData)], { type: "application/json" })
      );

      attachFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await api.post(url, formData);

      if (response.status === 201) {
        const { id } = response.data;
        alert("등록 완료");
        navigate(`/mypage/request/${id}`);
      } else {
        alert("등록 실패");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleCancelButton = () => navigate("/community/request");

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <CommunitySideBar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">글쓰기</h1>

            <div className="mb-4">
              <input
                type="text"
                placeholder="제목을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={title}
                onChange={handleTitleInput}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기부 시작일자</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={donationStartDate}
                  min={new Date().toISOString().split('T')[0]} // 오늘 날짜 이후로 선택 가능
                  onChange={handleDonationStartDateInput}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기부 종료일자</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={donationEndDate}
                  min={donationStartDate} // 기부 시작일자보다 같거나 더 큰 날짜로 설정
                  onChange={handleDonationEndDateInput}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">헌혈증 요청 개수</label>
              <input
                type="number"
                min="1"
                placeholder="요청할 헌혈증 개수를 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={donationAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "0") {
                    alert("헌혈증 요청 개수는 1 이상이어야 합니다.");
                    // 값이 0이면 1로 자동 변경
                    handleDonationAmountInput({ target: { value: "1" } });
                  } else {
                    handleDonationAmountInput(e);
                  }
                }}
              />
            </div>

            {/* 파일 첨부 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                첨부파일
              </label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleAttachFileInput}
                    multiple
                  />
                  <button
                    onClick={handleFileButton}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    파일 선택
                  </button>
                  {attachFiles.length === 0 && (
                    <span className="ml-3 text-sm text-gray-500">
                      선택된 파일 없음
                    </span>
                  )}
                </div>
                {attachFiles.length > 0 && (
                  <div className="space-y-1 mt-2">
                    {attachFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm text-gray-600">
                          {file.name}
                        </span>
                        <button
                          onClick={() => handleFileDelete(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

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

            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={handleCancelButton} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                취소
              </button>
              <button onClick={handleSaveButton} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
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
