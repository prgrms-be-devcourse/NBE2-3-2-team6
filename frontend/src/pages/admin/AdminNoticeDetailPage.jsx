import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSideBar from "../../components/wrapper/AdminSideBar";
import Notice from "../../components/Notice";
import api from "../../lib/axios";

const AdminNoticeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);

  const url = `/notices/${id}`;

  const fetchNotice = async () => {
    try {
      const response = await api.get(url);
      setNotice(response.data);
      setIsAdmin(isAdmin);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생: ", error);
    }
  };

  useEffect(() => {
    fetchNotice(); // 데이터 가져오기
  }, [id]);

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex">
        <AdminSideBar />
        <Notice notice={notice} isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default AdminNoticeDetailPage;
