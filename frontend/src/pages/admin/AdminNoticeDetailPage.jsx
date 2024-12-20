import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSideBar from "../../components/wrapper/AdminSidebar";
import Notice from "../../components/Notice";
import axios from "axios";

const AdminNoticeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);

  const url = 'https://9891dae0-553b-40f5-9ada-4f17eb1659c2.mock.pstmn.io/redbox/notices/${id}';
  //const url = https://316fa20d-ea61-4140-9970-98cd5e0fda23.mock.pstmn.io/redbox/notices/${id};

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get(url);
        setNotice(response.data);
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생: ", error);
      }
    };

    fetchNotice(); // 데이터 가져오기
  }, [id]);

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <AdminSideBar />
        <Notice notice={notice} isAdmin={isAdmin} url={url}/>
      </div>
    </div>
  );
};

export default AdminNoticeDetailPage;