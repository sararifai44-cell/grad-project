import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import PoetryAnalysisPage from "../pages/PoetryAnalysisPage";
// 1. استيراد الصفحة الجديدة (تأكدي من إنشاء الملف أولاً)
import HistoryClassificationPage from "../pages/HistoryClassificationPage"; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/poetry-analysis" element={<PoetryAnalysisPage />} />
          
          {/* 2. إضافة المسار الجديد هنا داخل الـ Layout ليظهر النافبار */}
          <Route path="/history-classification" element={<HistoryClassificationPage />} /> 
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;