import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import WhyAndalusia from "../components/home/WhyAndalusia";
import GalleryHook from "@/components/home/GalleryHook";
import PoetryDivider from "@/components/home/PoetryDivider";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FDF1D3] selection:bg-[#1A3C34] font-sans" dir="rtl">
      <HeroSection />
      <FeaturesSection />
      <GalleryHook/>
      <PoetryDivider/>

            <WhyAndalusia />

    </div>
  );
};

export default HomePage;