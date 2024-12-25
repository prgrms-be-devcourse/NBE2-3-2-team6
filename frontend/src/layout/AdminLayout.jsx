import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
