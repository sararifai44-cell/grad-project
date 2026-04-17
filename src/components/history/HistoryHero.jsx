import React from 'react';
import { motion } from 'framer-motion';

// استدعاء صورة الخلفية
import analysisBg from '@/assets/maria-bobrova-JZiQSVd9iH4-unsplash.jpg'; 

const HistoryHero = ({ heroBackgroundImage = analysisBg, onQuickStart }) => {
  return (
    <div className="relative w-full min-h-[20vh] flex items-center pt-20 pb-12 overflow-hidden" dir="rtl">
      
      {/* 1. الخلفية بتأثير التغبيش */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-sm scale-105 z-0"
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      />
      
      {/* 2. الطبقة اللونية الأندلسية الفاتحة (Sandstone) */}
      <div className="absolute inset-0 bg-[#F9F7F1]/90 z-0"></div>

      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
        
        {/* القسم الأيمن: المحتوى النصي الخاص بالأداة */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-right z-20">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#C4A87C]"></div>
              <h2 className="text-[#C4A87C] font-bold text-sm tracking-widest uppercase">
                أدوات التحليل التاريخي
              </h2>
            </div>
            
            <h1 
              className="text-4xl lg:text-6xl font-bold text-[#1A3C34] mb-6 leading-tight drop-shadow-sm" 
              style={{ fontFamily: '"Amiri", serif' }}
            >
              ميزان الوقائع: <br />
              <span className="text-[#C4A87C]">السبب والنتيجة</span>
            </h1>

            {/* تم جعل النص هنا أغمق وأسمك ليكون أوضح للقراءة */}
            <p className="text-[#1A3C34] text-xl mb-8 leading-relaxed font-medium border-r-4 border-[#C4A87C] pr-6 max-w-md bg-white/30 p-4 rounded-l-lg shadow-sm">
              "هنا نربط خيوط التاريخ؛ أدخل الحدث الأندلسي لتعرف الدوافع التي حركته والآثار التي خلّدها في صفحات الزمان."
            </p>

            <div className="flex gap-6 mb-10">
               <div className="flex items-center gap-2 text-[#1A3C34] font-bold text-base">
                  <span className="w-8 h-8 rounded-full bg-[#C4A87C]/20 flex items-center justify-center text-[#C4A87C]">١</span>
                  تصنيف ذكي
               </div>
               <div className="flex items-center gap-2 text-[#1A3C34] font-bold text-base">
                  <span className="w-8 h-8 rounded-full bg-[#C4A87C]/20 flex items-center justify-center text-[#C4A87C]">٢</span>
                  ربط منطقي
               </div>
            </div>

            {/* زر البدء السريع الجديد */}
            <button 
              onClick={onQuickStart}
              className="bg-[#1A3C34] text-[#F9F7F1] px-10 py-3.5 rounded-full font-bold text-lg hover:scale-105 hover:bg-[#C4A87C] transition-all shadow-lg flex items-center gap-4 group border border-transparent hover:border-[#1A3C34]"
              style={{ fontFamily: '"Amiri", serif' }}
            >
              <span>البدء السريع</span>
              <svg 
                className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* القسم الأيسر: البوابة الأندلسية بحجم أصغر وأكثر تركيزاً */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mt-10 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-[320px] h-[400px] rounded-t-[10rem] rounded-b-2xl p-2 border border-[#C4A87C]/40 shadow-2xl bg-white/50 backdrop-blur-md"
          >
            <div className="relative w-full h-full rounded-t-[9.5rem] rounded-b-xl overflow-hidden bg-[#F9F7F1]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
                style={{ backgroundImage: `url(${heroBackgroundImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A3C34]/80 via-[#1A3C34]/20 to-transparent"></div>
              
              {/* أيقونة تعبيرية عن التحليل وسط البوابة */}
              <div className="absolute inset-0 flex items-center justify-center mt-12">
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                 >
                    <svg className="w-20 h-20 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                 </motion.div>
              </div>
            </div>

            {/* زخرفة خشبية أسفل البوابة */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-[#5D4037] text-[#C4A87C] text-sm font-bold rounded-md shadow-xl border border-[#C4A87C]/30 tracking-wide">
               مخطوطات التحليل
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default HistoryHero;