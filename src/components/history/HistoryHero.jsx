import React from 'react';
import { motion } from 'framer-motion';

const HistoryHero = ({ onQuickStart }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="relative w-full h-screen flex items-center bg-[#0d0c0b] overflow-hidden" dir="rtl">

      {/* 1. طبقة الخلفية والخريطة */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div
          className="absolute inset-0 bg-no-repeat opacity-[0.85]"
          style={{
            backgroundImage: `url('/assets/coy4.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'left center' 
          }}
        />
        
        {/* إضافة أوفرلاي خفيف على كامل الصورة */}
        <div className="absolute inset-0 bg-[#0d0c0b]/30 z-10 pointer-events-none"></div>
        
        {/* تم تخفيف التدرج على اليمين ليظهر المزيد من الخريطة خلف النص */}
        <div className="absolute inset-y-0 right-0 w-full md:w-3/4 bg-gradient-to-l from-[#0d0c0b]/80 via-[#0d0c0b]/50 to-transparent z-10 pointer-events-none"></div>
        
        {/* تدرج علوي لحماية النافبار (Navbar) */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0d0c0b]/90 to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* 2. حاوية المحتوى - justify-start في الـ rtl تعني التثبيت على اليمين */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-start pt-16">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl flex flex-col items-start text-right"
        >
        
          {/* عنوان يعكس طبيعة النظام كأداة تحليلية وفهم عميق */}
        <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-2xl lg:text-[4rem] font-bold text-white mb-4 leading-[1.3] drop-shadow-lg"
            style={{ fontFamily: ' sans-serif' }}
          >
                        مُحلّل الأحداث الأندلسية

          </motion.h1>

        <motion.div
            variants={itemVariants}
            className="mb-8 border-r-4 border-[#C4A87C] pr-4 py-1"
          >
            <span
              className="text-[#C4A87C] text-3xl md:text-4xl font-medium drop-shadow-md"
              style={{ fontFamily: '"Amiri", serif' }}
            >
              تصنيف زمني واستكشاف للروابط السببية
            </span>
          </motion.div>

          {/* الزر الأخضر الغامق */}
          <motion.button 
            variants={itemVariants}
            onClick={onQuickStart}
            className="group relative px-10 py-3.5 bg-[#1A3C34] border border-[#C4A87C]/40 text-white rounded-full font-bold text-lg overflow-hidden transition-all shadow-xl hover:border-[#C4A87C] mb-12"
          >
            <div className="absolute inset-0 w-0 bg-[#C4A87C] transition-all duration-500 ease-out group-hover:w-full"></div>
            <span className="relative flex items-center gap-3 group-hover:text-[#0d0c0b] transition-colors duration-300">
              ابدأ تحليل الحدث
              <svg className="w-5 h-5 -rotate-90 transition-transform duration-500 group-hover:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </motion.button>

        </motion.div>
      </div>
    </div>
  );
};

export default HistoryHero;