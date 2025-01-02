import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Editor } from "@toast-ui/react-editor";
import AdminSideBar from "../../components/wrapper/AdminSideBar";
import api from "../../lib/axios";

const AdminNoticeWritePage = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [attachFiles, setAttachFiles] = useState([]);

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

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
      const request = {
        title: title,
        content: content,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(request)], {
          type: "application/json",
        })
      );

      attachFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await api.post("/notices", formData);

      if (response.status === 201) {
        alert("작성되었습니다");
        navigate(`/admin/community/notice/${response.data.noticeNo}`);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleCancelButton = () => {
    navigate("/admin/community/notice");
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        {/* 사이드바 */}
        <AdminSideBar />
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

export default AdminNoticeWritePage;
