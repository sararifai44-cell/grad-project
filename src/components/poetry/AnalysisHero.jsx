import React, { useCallback } from 'react'; // أضفنا useCallback
import { motion } from 'framer-motion';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { publicAsset } from "@/lib/publicAsset"; 

// 1. نقل البيانات الثابتة خارج الكمبوننت (لتحسين الذاكرة)
const heroBgImage = publicAsset("ba.jpg"); 

const FEATURES = [
  { text: "التحليل العروضي الآلي" }, // صححنا الخطأ المطبعي هنا
  { text: "تصنيف الأغراض الشعرية" },
  { text: "شرح أدبي مبسط" }
];

// 2. تعريف الأنيميشن في متغيرات ثابتة
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const ITEM_VARIANTS = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const AnalysisHero = () => { 
  // 3. استخدام useCallback لضمان أداء مستقر
  const scrollToAnalyzer = useCallback(() => {
    const element = document.getElementById('analyzer-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* الخلفية مع تحسين التحميل */}
      <motion.img 
        src={heroBgImage}
        alt="" // تركها فارغة للمتصفحات لأنها ديكورية فقط
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "linear" }} // تقليل الوقت ليكون التفاعل أنعم
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        style={{ objectPosition: 'center 9%' }}
        fetchpriority="high"
      />
      
      {/* طبقة التظليل المدمجة */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none z-0" />
      
      <section className="relative w-full min-h-screen flex flex-col justify-center items-start text-right pr-6 md:pr-12 lg:pr-20 pl-10 pt-32 pb-24 z-10 max-w-[1600px] mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl font-serif text-white" 
          style={{ lineHeight: '1.2' }}
        >
          <span className="text-[#D9C8A9]">تحليل الشعر </span>
          <span>آلياً</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl mb-12 max-w-3xl font-light leading-relaxed text-[#F9F7F1] drop-shadow-lg"
        >
          بوابة ذكية تفتح آفاقاً جديدة في دراسة الأدب الأندلسي بلمسة تقنية حديثة.
        </motion.p>

        {/* قائمة المميزات */}
        <motion.div 
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-start items-center gap-4 md:gap-6 mb-14 w-full"
        >
          {FEATURES.map((item, index) => (
            <motion.div 
              key={index} 
              variants={ITEM_VARIANTS}
              whileHover={{ y: -5, backgroundColor: '#EADBC3', scale: 1.05 }}
              className="flex items-center gap-4 bg-[#D9C8A9] px-6 py-3 rounded-full shadow-lg border border-[#D9C8A9] cursor-default group transition-all"
            >
              <div className="flex items-center justify-center opacity-80 group-hover:rotate-90 transition-transform duration-700">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 0L14.5 7.5L22 10L14.5 12.5L12 20L9.5 12.5L2 10L9.5 7.5L12 0Z" fill="#2D140D"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-[#2D140D]">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <PrimaryButton 
            className="bg-[#1A3C34] hover:bg-[#245247] px-14 py-5 text-xl rounded-full font-bold transition-all shadow-2xl flex items-center justify-center gap-2 cursor-pointer text-[#F9F7F1]" 
            onClick={scrollToAnalyzer}
          >
            ابدأ التحليل الآن
          </PrimaryButton>
        </motion.div>
      </section>
    </div>
  );
};

export default AnalysisHero;