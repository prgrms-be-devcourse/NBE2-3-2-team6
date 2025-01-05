import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Editor } from "@toast-ui/react-editor";
import AdminSideBar from "../../components/wrapper/AdminSideBar";
import api from "../../lib/axios";

const AdminNoticeModifyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [existingFiles, setExistingFiles] = useState([]);
  const [newAttachFiles, setNewAttachFiles] = useState([]);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await api.get(`/notices/${id}`);
        setTitle(response.data.title);
        editorRef.current?.getInstance().setHTML(response.data.content);
        setExistingFiles(response.data.attachFileResponses || []);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    };
    fetchNotice();
  }, [id]);

  const handleTitleInput = (e) => setTitle(e.target.value);

  const handleFileButton = () => fileInputRef.current?.click();

  const handleAttachFileInput = (e) => {
    const files = Array.from(e.target.files);
    setNewAttachFiles((prev) => [...prev, ...files]);
  };

  const handleNewFileDelete = (index) => {
    setNewAttachFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExistingFileDelete = async (fileNo) => {
    if (window.confirm("파일을 삭제하시겠습니까?")) {
      try {
        await api.delete(`/notices/${id}/files/${fileNo}`);
        setExistingFiles((prev) =>
          prev.filter((file) => file.fileNo !== fileNo)
        );
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await api.post(`/notices/${id}/files`, formData);

      alert("저장이 완료되었습니다.");
      // 파일 목록 새로고침
      const response = await api.get(`/notices/${id}`);
      setExistingFiles(response.data.attachFileResponses);
      // 새 파일 목록에서 제거
      setNewAttachFiles((prev) => prev.filter((f) => f !== file));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSaveButton = async () => {
    if (window.confirm("수정하시겠습니까?")) {
      try {
        const content = editorRef.current?.getInstance().getHTML();

        if (!title || !content) {
          alert("제목과 내용을 입력해주세요");
          return;
        }

        // FormData 대신 직접 JSON 객체 전송
        const request = { title, content };

        const response = await api.put(`/notices/${id}`, request);

        if (response.status === 200) {
          alert("수정되었습니다");
          navigate(`/admin/community/notice/${id}`);
        }
      } catch (error) {
        console.error("Error updating notice:", error);
      }
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">수정하기</h1>

            <div className="mb-4">
              <input
                type="text"
                placeholder="제목을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={title}
                onChange={handleTitleInput}
              />
            </div>

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
                </div>

                {existingFiles.length > 0 && (
                  <div className="space-y-1 mt-2">
                    <p className="text-sm font-medium text-gray-700">
                      기존 파일
                    </p>
                    {existingFiles.map((file) => (
                      <div
                        key={file.fileNo}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm text-gray-600">
                          {file.originFilename}
                        </span>
                        <button
                          onClick={() => handleExistingFileDelete(file.fileNo)}
                          className="text-red-500 hover:text-red-700"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {newAttachFiles.length > 0 && (
                  <div className="space-y-1 mt-2">
                    <p className="text-sm font-medium text-gray-700">
                      새로운 파일
                    </p>
                    {newAttachFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm text-gray-600">
                          {file.name}
                        </span>
                        <div>
                          <button
                            onClick={() => handleFileUpload(file)}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                          >
                            저장
                          </button>
                          <button
                            onClick={() => handleNewFileDelete(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            삭제
                          </button>
                        </div>
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
              <button
                onClick={() => navigate(`/admin/community/notice/${id}`)}
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

export default AdminNoticeModifyPage;
