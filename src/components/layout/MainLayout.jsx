import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* Outlet هو المكان الذي ستظهر فيه صفحاتنا (مثل الصفحة الرئيسية) */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;