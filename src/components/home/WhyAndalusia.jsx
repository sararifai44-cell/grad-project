import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhyAndalusia = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // مسار صورة الخلفية (المشوشة)
  const backgroundImagePath = "/assets/maria-bobrova-JZiQSVd9iH4-unsplash.jpg"; 

  const slides = [
    {
      id: 0,
      tag: "رؤية المنصة",
      titleWord: "الأندلس؟",
      btnText: "استكشف الأندلس",
      p1: <>الأندلس ليست مجرد صفحات في كتب التاريخ، بل هي <strong className="text-[#1B3022] font-900">نموذجٌ حضاري</strong> حيّ يجمع بين الفن والعلم والإنسان.</>,
      p2: <>اخترناها لتكون منطلقنا لأن إرثها يمثل ذروة الإبداع العالمي، ومن خلال منصتنا، نعيد إحياء هذا التراث برؤية تقنية حديثة تربط الماضي بالمستقبل.</>,
      img: "/assets/mm.PNG" 
    },
    {
      id: 1,
      tag: "الإرث الأدبي",
      titleWord: "شعرها؟",
      btnText: "استكشف الشعر الأندلسي",
      p1: <>لأن الشعر كان ديوان حياتهم ومرآة رقيّهم. تميز الأدب الأندلسي بـ <strong className="text-[#1B3022] font-900">رقة اللفظ</strong> وعمق الخيال الذي لم يسبقه إليه أحد.</>,
      p2: <>نقدم هنا تحليلًا آلياً للأوزان والقوافي، لنكشف عن العبقرية الموسيقية في موشحاتهم وقصائدهم، ونبسط جماليات اللغة العربية للأجيال الجديدة.</>,
      img: "/assets/Capture.PNG" 
    },
    {
      id: 2,
      tag: "الذاكرة والعمران",
      titleWord: "تاريخها؟",
      btnText: "استكشف على الخريطة",
      p1: <>تاريخ الأندلس ليس مجرد أحداث، بل هو <strong className="text-[#1B3022] font-900">قصة بصرية</strong> محفورة في جدران الحمراء وأعمدة مسجد قرطبة.</>,
      p2: <>نربط هنا بين الأحداث التاريخية والمعالم العمرانية، لنتتبع كيف تحولت الحجارة إلى فن هندسي يتنفس جمالاً، ونستكشف العوامل التي جعلت من مدنها منارات للعالم.</>,
      img: "/assets/e7.jpg" 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section 
      className="relative py-10 px-4 md:px-8 bg-cover bg-center overflow-hidden
                 before:content-[''] before:absolute before:inset-0 
                 before:bg-black/40 before:backdrop-blur-md before:z-0" 
      style={{ backgroundImage: `url(${backgroundImagePath})` }}
      dir="rtl"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Tajawal:wght@500;700;800;900&display=swap');
          .font-amiri { font-family: 'Amiri', serif; }
          .font-tajawal { font-family: 'Tajawal', sans-serif; }
        `}
      </style>

      <div className="max-w-[1050px] mx-auto relative z-10"> 
        <div className="relative bg-[#F4EFE6] rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 shadow-2xl overflow-hidden border border-[#D4AF37]/20">
          
          <div className="relative z-10 flex flex-col justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center"
              >
                
                {/* القسم النصي */}
                <div className="space-y-6 md:col-span-7 text-right">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-[#D4AF37]"></div>
                      <span className="font-tajawal text-[#D4AF37] font-bold text-xs tracking-widest uppercase">
                        {slides[activeSlide].tag}
                      </span>
                    </div>
                    <h2 className="font-amiri text-4xl md:text-5xl text-[#1B3022] font-extrabold leading-[1.2] mt-2">
                      لماذا <span className="text-[#D4AF37]">{slides[activeSlide].titleWord}</span>
                    </h2>
                  </div>
                  
                  <div className="space-y-3 font-tajawal text-[#1B3022]/90 text-base md:text-lg leading-relaxed md:min-h-[110px]">
                    <p>{slides[activeSlide].p1}</p>
                    <p>{slides[activeSlide].p2}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4">
                    {/* الزر المحدث والنشط */}
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => console.log(`Navigating to: ${slides[activeSlide].btnText}`)}
                      className="px-6 py-2.5 bg-[#1B3022] text-[#F4EFE6] rounded-full font-tajawal font-bold text-sm flex items-center gap-2 hover:bg-[#2A4533] transition-colors duration-300 shadow-lg cursor-pointer active:opacity-80"
                    >
                      <span>{slides[activeSlide].btnText}</span>
                      <span className="text-[#D4AF37]">←</span>
                    </motion.button>
                  </div>
                </div> 

                {/* القسم البصري */}
                <div className="relative order-first md:order-last flex justify-center items-center md:col-span-5">
                  <div className="relative w-full max-w-[280px] aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl shadow-xl border-3 border-[#2c1a14c1] group">
                    <img 
                      src={slides[activeSlide].img} 
                      alt="الأندلس" 
                      className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022]/70 to-transparent opacity-60"></div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* نقاط التحكم */}
        <div className="mt-6 flex justify-center items-center gap-3 relative z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeSlide === index ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyAndalusia;