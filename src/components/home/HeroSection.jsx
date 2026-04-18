import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { publicAsset } from "@/lib/publicAsset";

const heroVideoSrc = publicAsset("hero1.webm");
// إضافة مسار صورة الـ Poster (تأكد من وجود صورة بهذا الاسم في مجلد الـ public)
const heroPosterSrc = publicAsset("hero-poster.jpg"); 

const HeroSection = () => {
  // تم حذف videoRef لعدم الحاجة إليه
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex flex-col items-start justify-center overflow-hidden bg-black text-right">
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-gradient-to-l from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />
      
      {/* تم إزالة الـ ref وإضافة الـ poster */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        poster={heroPosterSrc}
        src={heroVideoSrc}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/70 z-[5] pointer-events-none" />

      <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-20 flex flex-col h-full justify-center w-full pr-8 md:pr-16 lg:pr-24 2xl:pr-40">
        <motion.div initial="hidden" animate="visible" className="flex flex-col items-start text-right max-w-[850px] 2xl:max-w-[1400px] gap-5 mt-16 md:mt-24 lg:mt-32 2xl:mt-48">
          <h1 className="font-serif font-bold text-6xl md:text-8xl lg:text-[95px] 2xl:text-[140px] text-[#FDF1D3] leading-none drop-shadow-2xl">حين تفتح الأندلس</h1>
          <p className="font-sans text-lg md:text-xl lg:text-2xl 2xl:text-4xl text-[#FDF1D3]/80 leading-relaxed font-light max-w-xl 2xl:max-w-3xl">منصةٌ رقمية تدمج بين التحليل الآلي للقصائد والتصنيف التاريخي للأحداث، في مساحة بصرية تفاعلية.</p>
          
          <button 
            onClick={() => scrollToSection("platform-features")} 
            className="mt-6 px-12 py-4 2xl:px-16 2xl:py-6 2xl:text-xl bg-[#1A3C34] hover:bg-[#C1A881] hover:text-[#3E2723] text-[#FDF1D3] font-bold rounded-full border border-white/5 flex items-center gap-4 group transition-colors duration-300 cursor-pointer"
          >
            اكتشف ميزات المنصة <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform duration-300" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;