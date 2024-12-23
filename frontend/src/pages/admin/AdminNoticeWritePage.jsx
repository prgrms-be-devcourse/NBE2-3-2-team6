import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Editor } from "@toast-ui/react-editor";
import AdminSideBar from "../../components/wrapper/AdminSideBar";
import axios from "axios";

const AdminNoticeWritePage = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [attachFile, setAttachFile] = useState("선택된 파일 없음");

  // const url = "https://2c065562-04c8-4d72-8c5a-4e4289daa4b5.mock.pstmn.io/admin/notice/write"

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleFileButton = () => {
    fileInputRef.current?.click();
  };

  const handleAttachFileInput = (e) => {
    const file = e.target.files[0]; // 선택한 파일 가져오기
    setAttachFile(file ? file.name : "선택된 파일 없음");
  };

  const handleSaveButton = async () => {
    try {
      const content = editorRef.current?.getInstance().getHTML();
      const file = fileInputRef.current?.files[0];

      if (!title || !content) {
        alert("제목과 내용을 입력해주세요");
        return;
      }

      // FormData 생성 
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) {
        formData.append("file", file);
      }

      // FormData 내용 확인
    //   for (const [key, value] of formData.entries()) {
    //     console.log("FormData 내용 확인")
    //     console.log(key, value);
    //   }

      // API 호출
      // TODO : formdata로 제목, 내용, 파일을 다 넣었음(erd에서는 구분되어 있음)
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("작성되었습니다");
        navigate("/admin/community/notice");
      } else {
        console.log(error);
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
              <div className="flex items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleAttachFileInput}
                />
                <button
                  onClick={handleFileButton}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  파일 선택
                </button>
                <span className="ml-3 text-sm text-gray-500">
                  {attachFile}
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

export default AdminNoticeWritePage;