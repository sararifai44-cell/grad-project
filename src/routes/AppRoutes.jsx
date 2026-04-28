import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import PoetryAnalysisPage from "../pages/PoetryAnalysisPage";
import HistoryClassificationPage from "../pages/HistoryClassificationPage"; 
// 1. استيراد صفحة الغاليري الجديدة
import GalleryIndex from "../pages/GalleryIndex";
import LandmarkViewer from "../pages/LandmarkViewer";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* جميع المسارات هنا ستعرض النافبار والفوتر تلقائياً */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/poetry-analysis" element={<PoetryAnalysisPage />} />
          <Route path="/history-classification" element={<HistoryClassificationPage />} /> 
          <Route path="/gallery" element={<GalleryIndex />} />
<Route path="/gallery/:id" element={<LandmarkViewer />} />
          {/* 2. إضافة مسار الغاليري الجديد هنا */}
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;