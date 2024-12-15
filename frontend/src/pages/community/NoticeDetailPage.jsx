import { useEffect } from "react";
import { useParams } from "react-router-dom";

const NoticeDetailPage = () => {
  const { id } = useParams();

  useEffect(() => {
    // axios.get...
  }, []);

  return <></>;
};

export default NoticeDetailPage;
