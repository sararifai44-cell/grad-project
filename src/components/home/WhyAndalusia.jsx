import { useState, useEffect } from "react";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import { publicAsset } from "@/lib/publicAsset";

const sliderImages = [
  publicAsset("e7.jpg"),
  publicAsset("pexels-zekai-zhu-214984943-11829134.jpg"),
  publicAsset("maria-bobrova-JZiQSVd9iH4-unsplash.jpg"),
  publicAsset("c6.jpg"),
];

const WhyAndalusia = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    sliderImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []); 

  return (
    <section id="why-andalusia" className="relative py-5 px-6 bg-[#F2EFE9] overflow-hidden z-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-10">
        
        <div className="flex-[1.5] w-full space-y-4 text-right">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="mb-4"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3E2723] mb-2">لماذا الأندلس؟</h2>
            <div className="w-16 h-1 bg-[#C1A881] rounded-full"></div>
          </motion.div>

        
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 w-full max-w-sm sticky top-28 self-start"
        >
          {/* التعديل هنا: الإطار الذهبي المتدرج الفخم */}
          <div className="p-2.5 bg-gradient-to-br from-[#C1A881] via-[#E6D5B8] to-[#836243] rounded-t-[15rem] rounded-b-none shadow-[0_20px_50px_rgba(93,64,55,0.3)]">
            {/* الإطار الداخلي الذي يحتوي على الصور */}
            <div className="relative aspect-[3/4] rounded-t-[14.5rem] rounded-b-none overflow-hidden border-[4px] border-[#5D4037] bg-[#050505]">
              <AnimatePresence>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }} 
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{ willChange: "opacity, transform" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={sliderImages[currentSlide]} 
                    className="w-full h-full object-cover"
                    alt="Andalusia Slide"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-10 left-6 flex flex-col gap-2 z-30">
                {sliderImages.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? "h-8 bg-[#C1A881]" : "h-2 bg-white/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyAndalusia;