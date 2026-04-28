import React from 'react';
import { motion } from 'framer-motion';

const GoldMinimalistStats = () => {
  const historicalStats = [
    { value: "٧٨١", suffix: "عاماً", title: "من الوجود الحضاري" },
    { value: "٣", suffix: "عواصم", title: "قرطبة، إشبيلية، وغرناطة" },
    { value: "+٧٠", suffix: "مكتبة", title: "في قرطبة وحدها" },
    { value: "٦", suffix: "حقب", title: "دول إسلامية متعاقبة" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-[#FDF8F0] px-6" dir="rtl">
      <div className="max-w-[1000px] mx-auto">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {historicalStats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group border border-[#CD7F32]/30 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative"
            >
              
              {/* خلفية ذهبية خفيفة عند الهوفر */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#CD7F32]/0 via-[#CD7F32]/0 to-[#CD7F32]/5 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* شريط علوي ذهبي - ظاهر دائماً */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CD7F32] via-[#D4AF37] to-[#CD7F32]"></div>
              
              <div className="px-5 py-7 text-center relative z-10">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-amiri text-4xl font-bold text-[#1B3022] tracking-tight group-hover:text-[#CD7F32] transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="font-amiri text-lg font-medium text-[#C1A881]">
                    {stat.suffix}
                  </span>
                </div>
                
                <div className="w-10 h-px bg-[#CD7F32] my-3 mx-auto group-hover:w-14 transition-all duration-300"></div>
                
                <p className="font-['Cairo'] text-[#1B3022] text-sm md:text-base font-medium leading-relaxed">
                  {stat.title}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default GoldMinimalistStats;