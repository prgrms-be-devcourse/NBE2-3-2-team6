import { Link } from "react-router-dom"; // Link 컴포넌트
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AdminRequestPage = () => {

    // 요청 들어온 개수를 fetchData 실행될때
    const [count, setCount] = useState(0); //count 초기값 0
    // plag : result 개수에서 요청 개수 변경시 flag 값 변경하고 useEffect 넣기기 

    const navigate = useNavigate();
    const url = 'http://localhost:8080/admin/requests';

    const [reqdata, reqSetdata] = useState([]);
    
    /// 데이터 가져오기
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const result = await response.json();
            reqSetdata(result);
            console.log(result);
        } catch(error) {
            console.log("데이터를 가져오는 중 오류 발생 : ", error);
        }
    };

    // 데이터 보내기
    const sendData = async(id, status) => {
        try {
            const response = await fetch(url + `/${id}`, {
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

    // 대괄호에 있는 변수가 변할때 중괄에 있는 함수가 호출된다(트리거) 
    useEffect(() => {
        fetchData();
    }, [
       count 
    ]);

    /// 데이터 보내기 (게시판 id, status)
    const handleEdit = (id) => {
        sendData(id, '승인');
    };

    const handleDelete = (id) => {
        sendData(id, '거절');
    };

    const [modal, setModal] = useState({ isOpen: false, action: '', title: '', id: null });

    /// modal 처리
    const handleModal = (action, reqdata) => {
        setModal({ isOpen: true, action, title: reqdata.title, id: reqdata.id });
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

      //max-w-screen-lg mx-auto px-4 py-8 space-y-8
      <div className="flex-1 bg-gray-50">
        <div className="flex">
        {/* 메인 컨텐츠 */}
        <div className="flex-1 p-8">
            <div className="bg-white max-w-screen-lg mx-auto rounded-lg shadow-md p-6 h-[800px]">
            <div className="mt-3"></div>
            <h1 className="text-2xl text-center font-bold mb-6">게시글 승인 요청 목록</h1>

            {/* 게시판 리스트 */}
            <div className="border rounded-lg">
                {/* 헤더 */}
                <div className="flex bg-gray-50 py-3 border-b">
                <div className="w-20 text-center text-sm font-medium text-gray-500">번호</div>
                <div className="flex-1 px-6 text-left text-sm font-medium text-gray-500">제목</div>
                <div className="w-30 text-center text-sm font-medium text-gray-500">작성자</div>
                <div className="w-36 text-center text-sm font-medium text-gray-500">작성일</div>
                <div className="w-16 text-center font-medium text-gray-500"></div>
                <div className="w-16 text-center font-medium text-gray-500"></div>
            </div>
            </div>

            {/* 리스트 아이템들 */}
            <section className="max-h-[600px] overflow-y-auto divide-y">

                {reqdata.map((data) => (
                    <div
                    key={data.id}
                    className="flex items-center py-3 hover:bg-gray-50"
                    >
                    <div className="w-20 text-center text-sm text-gray-500">
                        {data.id}
                    </div>
                    
                    <div className="flex-1 px-6 text-gray-500">
                        <Link
                        to={`/admin/approve/${data.id}`}
                        className="text-gray-900 hover:text-red-600"
                        >
                          {data.title}
                        </Link>
                    </div>

                    <div className="w-30 text-center text-sm text-gray-500">
                        {data.author}
                    </div>

                    <div className="w-36 text-center text-sm text-gray-500">
                        {data.date}
                    </div>
                    
                    <div className="w-16 text-center text-sm text-gray-500">
                        <button
                            onClick={() => handleModal('승인', data)}
                            className="mx-1 px-3 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                            >승인
                        </button>
                    </div >
                    <div className="w-16 text-center text-sm text-gray-500">
                        <button
                            onClick={() => handleModal('거절', data)}
                            className="mx-1 px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                            >거절
                        </button>
                    </div>
                    </div>
                ))}
                </section>
            </div>

            {/* 모달 */}
            {modal.isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">{modal.action} 확인</h2>
                        <p className="mb-4">{`'${modal.id}'번 게시물을 ${modal.action}하시겠습니까?`}</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={confirmAction}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >확인</button>
                            <button
                                onClick={() => setModal({ isOpen: false, action: '', title: '', id: null })}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >취소</button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
        </div>
    )
};

export default AdminRequestPage;