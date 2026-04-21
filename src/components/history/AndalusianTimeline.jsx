import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FullWidthImageTimeline = () => {
  const [activeEra, setActiveEra] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const ERA_DURATION = 5000;

  // صور النقاط الزمنية (الدائرية)
  const timelineImages = [
    "/assets/s.png",
    "/assets/alzahraa.webp",
    "/assets/Aljafería_Palace.jpg",
    "/assets/Séville_-_Remparts_almohades.JPG",
    "/assets/500px-Torre_del_oro_laurels_Seville_Andalusia_Spain.jpg",
    "public/assets/Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg" 
  ];

  // صورة واحدة لكل حقبة
  const eraMainImage = {
    0: "/assets/s.png",
    1: "/assets/alzahraa.webp",
    2: "/assets/Aljafería_Palace.jpg",
    3: "/assets/Séville_-_Remparts_almohades.JPG",
    4: "/assets/500px-Torre_del_oro_laurels_Seville_Andalusia_Spain.jpg",
    5: "public/assets/Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg"
  };

  const eras = [
    { 
      year: "711", 
      title: "فتح الأندلس", 
      region: "جبل طارق",
      color: "#C9A87C",
      quote: "فجر جديد يشرق من جبل طارق",
      summary: "طارق بن زياد يعبر المضيق بجيشه ويفتح الأندلس، معلناً بداية عصر جديد من الحضارة الإسلامية في أوروبا.",
      season: "spring",
      seasonIcon: "🌸",
      expansion: 20
    },
    { 
      year: "756", 
      title: "الدولة الأموية", 
      region: "قرطبة",
      color: "#4A7C59",
      quote: "قرطبة تصبح جوهرة العالم",
      summary: "عبدالرحمن الداخل يؤسس الدولة الأموية في الأندلس، وتحول قرطبة إلى أكبر مركز للعلم والثقافة في أوروبا.",
      season: "summer",
      seasonIcon: "☀️",
      expansion: 45
    },
    { 
      year: "1031", 
      title: "عصر الطوائف", 
      region: "إشبيلية",
      color: "#D4A373",
      quote: "انقسام الراية وبقاء الروح",
      summary: "سقوط خلافة قرطبة وتقسيم الأندلس إلى ممالك صغيرة متنافسة، لكن الحضارة استمرت في الازدهار.",
      season: "autumn",
      seasonIcon: "🍂",
      expansion: 35
    },
    { 
      year: "1090", 
      title: "دولة المرابطين", 
      region: "مراكش",
      color: "#B5835A",
      quote: "جيوش الصحراء تعبر لإنقاذ الأندلس",
      summary: "يوسف بن تاشفين يعبر من الصحراء ويوحد الأندلس مرة أخرى، ويوقف زحف النصارى نحو الجنوب.",
      season: "desert",
      seasonIcon: "🏜️",
      expansion: 60
    },
    { 
      year: "1146", 
      title: "دولة الموحدين", 
      region: "مراكش",
      color: "#5D8A7A",
      quote: "عصر الفلسفة والعمارة الشامخة",
      summary: "عهد ابن رشد وابن طفيل، وتشييد أعظم المساجد مثل مسجد إشبيلية وخيرالدا.",
      season: "golden",
      seasonIcon: "✨",
      expansion: 75
    },
    { 
      year: "1232", 
      title: "مملكة غرناطة", 
      region: "غرناطة",
      color: "#C27A7A",
      quote: "المعقل الأخير وجمال الحمراء",
      summary: "آخر معقل إسلامي في الأندلس، حيث شيدت قصة الحمراء الخالدة كشاهد على جمال الحضارة الإسلامية.",
      season: "twilight",
      seasonIcon: "🌅",
      expansion: 15
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEra((prev) => (prev + 1) % eras.length);
    }, ERA_DURATION);
    return () => clearInterval(timer);
  }, [eras.length]);

  // دالة لتحويل الأرقام إلى عربية
  const toArabicNumbers = (num) => {
    const arabicNumbers = {
      '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
      '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
    };
    return num.toString().replace(/[0-9]/g, (digit) => arabicNumbers[digit]);
  };

  // دالة لفتح الخريطة
  const handleExploreMap = () => {
    console.log("استكشاف الخريطة للحقبة:", eras[activeEra].title);
  };

  return (
    <div className="relative w-full mx-auto font-sans" dir="rtl">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Amiri:wght@400;700&display=swap');
          .font-arabic { font-family: 'Cairo', sans-serif; }
          .font-years { font-family: 'Amiri', serif; }
        `}
      </style>

      {/* الخلفية */}
      <motion.div 
        className="absolute inset-0 overflow-hidden shadow-xl"
        animate={{ backgroundColor: eras[activeEra].color }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div 
          className="absolute inset-0 bg-white/10 rounded-full blur-3xl"
          animate={{ 
            x: ["0%", "100%", "0%"],
            y: ["0%", "30%", "0%"]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-white/5" />
      </motion.div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 p-5 md:p-8 lg:p-10">
        
        {/* الهيدر العلوي */}
        <div className="flex justify-center items-center mb-3 border-b border-white/35 pb-3">
          <div className="text-center">
            <h3 className="text-white/80 text-xl md:text-2xl lg:text-3xl font-arabic font-bold tracking-wider">
              「 من جبل طارق إلى الحمراء 」
            </h3>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="flex flex-row items-center justify-between gap-15 mb-6">
          
          {/* الصورة الثابتة مع الزخارف */}
          <div className="hidden md:block flex-shrink-0">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
                <img 
                  src={eraMainImage[activeEra]} 
                  alt={eras[activeEra].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-white/40 text-[8px] md:text-[9px] font-arabic">
                  {eras[activeEra].region} • {eras[activeEra].title}
                </p>
              </div>
              
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-white/30 rounded-tr-xl" />
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-white/30 rounded-bl-xl" />
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-white/20 rounded-br-lg" />
            </motion.div>
          </div>

          {/* المعلومات */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEra}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-5xl md:text-6xl lg:text-7xl font-years text-white font-bold">
                    {toArabicNumbers(eras[activeEra].year)}
                  </span>
                  <span className="text-white/50 text-lg md:text-xl">هـ</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-arabic font-bold text-white mb-4">
                  {eras[activeEra].title}
                </h2>
                
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-4 italic">
                  "{eras[activeEra].quote}"
                </p>
                
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-4">
                  {eras[activeEra].summary}
                </p>

                {/* ** الزر تحت فقرة الملخص مباشرة ** */}
        <div className="mt-2">
  <motion.button
    onClick={handleExploreMap}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-[#C4A87C] hover:border-[#C4A87C] text-white hover:text-white rounded-lg font-medium text-sm md:text-base transition-all duration-300 shadow-lg cursor-pointer"
  >
    <span>استكشف على الخريطة</span>
    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </motion.button>
</div>
               
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* التايم لاين مع الصور */}
        <div className="relative mt-4 pt-4">
          <div className="absolute top-10 left-0 right-0 h-px bg-white/20 rounded-full" />
          
          <div className="relative flex justify-between items-start px-2">
            {eras.map((era, index) => {
              const isActive = activeEra === index;
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveEra(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative group focus:outline-none"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    y: isActive ? -25 : 0,
                    scale: isActive ? 1.15 : 1
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <div 
                    className={`
                      relative w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full overflow-hidden
                      border-3 transition-all duration-300
                      ${isActive ? 'border-white shadow-2xl' : 'border-white/30'}
                      ${isHovered ? 'border-white/90' : ''}
                    `}
                    style={isActive ? { boxShadow: `0 0 25px ${era.color}80` } : {}}
                  >
                    <img 
                      src={timelineImages[index]} 
                      alt={era.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {isActive && <div className="absolute inset-0 bg-white/10" />}
                    
                    {isActive && (
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle 
                          cx="50%" cy="50%" r="48%"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray="300"
                          strokeDashoffset={300 - (300 * (Date.now() % ERA_DURATION) / ERA_DURATION)}
                          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                        />
                      </svg>
                    )}
                    
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-[10px] backdrop-blur-sm">
                        {era.seasonIcon}
                      </div>
                    )}
                  </div>

                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <div className={`
                      text-[10px] md:text-xs font-years transition-all duration-300
                      ${isActive ? 'text-white font-bold' : 'text-white/40'}
                    `}>
                      {toArabicNumbers(era.year)}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullWidthImageTimeline;