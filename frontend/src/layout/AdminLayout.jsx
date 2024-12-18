import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
      <Footer />
    </div>
  );
}
