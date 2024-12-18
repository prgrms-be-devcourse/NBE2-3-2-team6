import { useEffect, useState } from "react";

const AdminPage = () => {

  const [data, setData] = useState({});

  const url = 'https://ab876606-577e-4a4b-87b5-90e8cac3a98f.mock.pstmn.io/admin/main'
  
  // 데이터 받아오기
  const fetchData = async() => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      console.log(result);
    } catch(error) {
      console.error("데이터를 가져오는 중 오류 발생 : ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <div className="flex justify-center space-x-4 p-4 bg-gray-50">
      {/*member_cnt*/}
      <div className="w-[17rem] bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-sm text-gray-400 font-medium">가입한 회원 수</h2>
        <p className="text-3xl font-bold text-red-600">{data.member_cnt}</p>
      </div>

      {/*redbox_cnt*/}
      <div className="w-[17rem] bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-sm text-gray-400 font-medium">레드박스 보유 현황</h2>
        <p className="text-3xl font-bold text-red-600">{data.rebox_cnt}</p>
      </div>

      {/*total_cnt*/}<div className="w-[17rem] bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-sm text-gray-400 font-medium">누적 기부 수</h2>
        <p className="text-3xl font-bold text-red-600">{data.total_cnt}</p>
      </div>
      
      {/*pending_cnt*/}
      <div
        className="w-[17rem] bg-white rounded-lg border-2 border-red-600 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 text-center"
        onClick={() => window.location.href = '/target-page'} // 이동할 페이지 경로 설정
      >
        <h2 className="text-sm text-red-600 font-semibold">요청 사항</h2>
        <p className="text-3xl font-bold text-red-600">{data.pending_cnt}</p>
      </div>
    </div>

  );
};

export default AdminPage;
