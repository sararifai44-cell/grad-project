import React from 'react';
import { motion } from 'framer-motion';
import { Pannellum } from 'pannellum-react';

const GalleryHook = () => {
  return (
    // القسم ملموم جداً
    <section className="py-6 bg-[#FDF8F0] overflow-hidden" dir="rtl">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        
        {/* الحاوية الأساسية مع إضافة Border واضح وفخم */}
        <div className="grid grid-cols-1 lg:grid-cols-10 items-stretch bg-white rounded-[2rem] overflow-hidden shadow-2xl border-[3px] border-[#C1A881] relative">
          
          {/* الجانب الأيمن: البطاقة النصية (40%) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 p-8 md:p-10 flex flex-col justify-center bg-white order-2 lg:order-1 relative"
          >
            {/* لمسة جمالية: إطار داخلي رفيع جداً (Inner Border) */}
            <div className="absolute inset-2 border border-[#C1A881]/10 rounded-[1.5rem] pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-3 text-[#C1A881] mb-1">
                <div className="w-6 h-[1.5px] bg-[#C1A881]"></div>
                <span className="font-['Cairo'] text-2xl font-bold tracking-widest uppercase">تجربة بصرية 360°</span>
              </div>

              {/* العنوان بخط كبير وفخم */}
              <h3 className="font-amiri text-3xl md:text-4xl text-[#1B3022] font-bold leading-tight">
                اكتشف <span className="text-[#C1A881]">التفاصيل الحية</span>
              </h3>

              {/* خط الكتابة كبير وواضح */}
              <div className="border-r-[4px] border-[#C1A881] pr-6 py-1">
                <p className="font-tajawal text-gray-700 text-lg md:text-xl leading-[1.7] text-justify font-medium">
                  أنت لست مجرد متصفح، أنت <span className="text-[#1B3022] font-bold">المستكشف</span>. حرك الكاميرا، واقترب من النقوش التي صمدت لقرون.
                </p>
              </div>

              <div className="pt-4">
                <button className="group/btn flex items-center gap-3 bg-[#1B3022] hover:bg-[#C1A881] text-white px-8 py-3 rounded-xl font-tajawal text-sm font-bold transition-all duration-300 shadow-md">
                  <span>استكشاف المزيد</span>
                  <svg className="w-4 h-4 transform rotate-180 transition-transform group-hover/btn:-translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* الجانب الأيسر: الصورة (60%) مع فاصل داخلي قوي */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 h-[350px] md:h-[430px] relative order-1 lg:order-2 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[#C1A881]"
          >
         {/* زوايا تأطير داخلية ناعمة في الأركان الأربعة */}
<div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-white/50 z-10 pointer-events-none"></div>
<div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-white/50 z-10 pointer-events-none"></div>
<div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-white/50 z-10 pointer-events-none"></div>
<div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-white/50 z-10 pointer-events-none"></div>

            <Pannellum
              width="100%"
              height="100%"
              image="assets/Street View3 360 (1).jpg"
              pitch={0}
              yaw={0}
              hfov={100} 
              autoLoad
              autoRotate={-1.5}              
              showControls={false}         
              draggable={true}
            />
            
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GalleryHook;