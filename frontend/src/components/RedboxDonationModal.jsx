import { useState } from "react";

const Modal = ({ onSubmit, onClose }) => {
  const [quantity, setQuantity] = useState("");
  const [comment, setComment] = useState("");
  const handleSubmit = () => {
    if (!quantity || quantity <= 0) {
      alert("유효한 개수를 입력하세요.");
      return;
    }
    onSubmit(quantity, comment); 
    // onClose(); 
  };
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
                따뜻한 마음을 나누어요
        </label>
        <div>
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
        </div>
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