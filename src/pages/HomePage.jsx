import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import WhyAndalusia from "../components/home/WhyAndalusia";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FDF1D3] selection:bg-[#1A3C34] font-sans" dir="rtl">
      <HeroSection />
      <FeaturesSection />
      <WhyAndalusia />
    </div>
  );
};

export default HomePage;