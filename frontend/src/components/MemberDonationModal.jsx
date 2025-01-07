import { useState } from "react";
import api from "../lib/axios";

const Modal = ({ onSubmit, onClose }) => {
  // const
  const [quantity, setQuantity] = useState("");
  const [comment, setComment] = useState("");
  const [receivedId, setReceivedId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!receivedId || !memberName) {
      alert("회원을 등록해주세요");
      return;
    }
    if (!quantity || quantity <= 0) {
      alert("유효한 개수를 입력하세요.");
      return;
    }
    onSubmit(quantity, comment, receivedId);
  };
  const validEmail = async (email) => {
    try {
      const response = await api.post("/auth/email-check", {
        email,
      });
      setMemberName(response.data.name);
      setReceivedId(response.data.userId);
      alert("확인되었습니다.");
    } catch (error) {
      console.error("이메일 인증 요청 오류:", error);
      alert("이메일 확인 실패");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          따뜻한 마음을 나누어요
        </label>
        <div className="flex items-center mb-4 space-x-4">
          <input
            type="text"
            value={email}
            placeholder="받을 회원의 이메일을 입력하세요"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => validEmail(email)}
          >
            회원 조회
          </button>
        </div>
        <input
          type="text"
          value={memberName}
          readOnly
          placeholder="이메일 확인을 해주세요"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
        />
        <input
          type="number"
          min="1"
          value={quantity}
          placeholder="기부할 헌혈증 개수"
          className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          value={comment}
          placeholder="따뜻한 나눔의 말"
          className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-center mt-4 space-x-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={handleSubmit}
          >
            나눔
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
