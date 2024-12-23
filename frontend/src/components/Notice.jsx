import React, { useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notice = ({notice, isAdmin, url}) => {

    const navigate = useNavigate();

    const handleDeleteBtn = useCallback(async () => {
        try{
            const response = await axios.delete(url);
            if(response.status === 200) {
        
                alert(response.data.message); 
                navigate("/admin/community/notice", {replace: true});
            }
        } catch(error) {
            console.log(error);
        }  
      }, [url, navigate]);
    
    return (
        <div className="flex-1 p-8"> 
          {notice && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6 h-auto max-w-6xl">
                <h1 className="text-2xl font-bold mb-6">공지사항</h1>
                <hr className="my-4 border-t-2 border-gray-300" />
                <div className="flex bg-gray-50 py-3 border-b">
                  <div className="text-2xl flex-1 text-center">{notice.title}</div>
                </div>
                <div className="flex bg-gray-50 py-3 border-b">
                  <div className="w-20 text-center text-sm font-medium text-gray-500">작성자</div>
                  <div className="w-20 text-left text-sm font-medium">{notice.author}</div>
                  <div className="w-20 text-center text-sm font-medium text-gray-500">등록일</div>
                  <div className="w-28 text-center text-sm font-medium">{new Date(notice.date).toLocaleDateString()}</div>
                  <div className="w-20 text-right text-sm font-medium text-gray-500">조회수</div>
                  <div className="w-20 text-center text-sm font-medium">{notice.views}</div>
                </div>
                <p className="mt-4 pl-4">{notice.content}</p>
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-md p-6 h-auto max-w-6xl">
                <h2 className="text-lg font-bold mb-2">첨부파일</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  {notice.attachments && notice.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="mr-2">📎 {attachment.name} (다운로드: {attachment.downloads}회)</span>
                      <button className="text-black border border-gray-300 bg-white rounded px-2">미리보기</button>
                    </div>
                  ))}
                </div>
              </div>

              {isAdmin && (
                <div className="w-16 text-center text-sm text-gray-500">
                <button
                    onClick={() => handleDeleteBtn()}
                    className="mx-1 px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  삭제
                </button>
            </div>
              )}
              <div className="mt-4">
                <button
                  className="bg-gray-300 text-black rounded px-4 py-2"
                  onClick={() => navigate("/admin/community/notice")}
                >
                  목록
                </button>
              </div>
            </>
          )}
        </div>
    );
};

export default Notice;