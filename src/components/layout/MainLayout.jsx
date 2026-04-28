import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"; // لا تنسي تستدعي الفوتر

const MainLayout = () => {
  return (
    // الحاوية الأساسية: min-h-screen بتضمن إن الطول على الأقل يغطي الشاشة كاملة
    // flex و flex-col عشان نرتب العناصر تحت بعض (نافبار -> محتوى -> فوتر)
    <div className="min-h-screen flex flex-col bg-[#FDF8F0]">
      
      <Navbar />
      
      {/* flex-grow بتخلي المحتوى يتمدد ليعبي أي فراغ، فبيدفش الفوتر لتحت */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
};

export default MainLayout;