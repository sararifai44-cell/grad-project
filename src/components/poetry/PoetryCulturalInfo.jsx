import React from 'react';
import { motion } from 'framer-motion';

/**
 * GuideSection - أيقونات أدبية كلاسيكية (كتاب، ريشة، محبرة)
 * تصميم 4 كاردز متناسقة جنب بعض لهوية "مميزات منصة التحليل"
 */

const GuideSection = () => {
  const guideItems = [
    {
      title: "البحر الشعري",
      description: "الميزان الموسيقي الذي يضبط إيقاع الأبيات وتفعيلاتها، تماماً كوزن العمارة الأندلسية.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-14 h-14">
          <path d="M9 3v13.5a2.5 2.5 0 105 0V6a2 2 0 012-2h2" />
          <path d="M7 19h10M7 15h10M7 11h10" />
          <rect x="5" y="3" width="14" height="18" rx="2" />
        </svg>
      ),
      accent: "#C1A881",
    },
    {
      title: "القافية والروي",
      description: "خاتمة البيت التي تمنح القصيدة جرسها الموسيقي، ونهاية الرحلة في كل بيت شعري.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-14 h-14">
          <path d="M15.5 3L18 5.5l-9 9-2.5-2.5 9-9zM6 14l-2 5 5-2-3-3z" />
          <path d="M14 18h6a2 2 0 012 2v1H2v-1a2 2 0 012-2h6" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      ),
      accent: "#6B3A3A",
    },
    {
      title: "الغرض الشعري",
      description: "المعنى الجوهري خلف الأبيات، من غزل رقيق أو رثاء حزين أو مدح ملكي باذخ.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-14 h-14">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M22 6l-10 7L2 6" />
          <rect x="9" y="11" width="6" height="4" rx="1" strokeDasharray="2 2" />
        </svg>
      ),
      accent: "#C1A881",
    },
    {
      title: "الشرح والتفصيل",
      description: "فك رموز الاستعارات الأندلسية وشرح الصور البيانية التي تزدان بها القصيدة.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-14 h-14">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" />
          <path d="M6 8h2M16 8h2M6 12h2M16 12h2" />
        </svg>
      ),
      accent: "#6B3A3A",
    }
  ];

  return (
<section className="bg-[#F2EFE9] w-full pb-12 pt-1 px-6" dir="rtl">      <div className="max-w-7xl mx-auto">
        
        {/* Header - الخط الفاصل المعتمد في التصميم */}
      <div className="mb-7 relative w-full">
  <div className="flex items-center justify-center gap-3 mb-3">
  </div>
  <h2 className="text-2xl md:text-3xl font-serif text-[#6B3A3A] font-bold text-center">
    ماذا ستحصل في نتائج التحليل؟
  </h2>
  <div className="w-20 h-0.5 bg-[#C1A881]/50 rounded-full mt-3 mx-auto"></div>
</div>
        
        {/* Grid Container - 4 كروت أدبية متجاوبة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {guideItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, boxShadow: "0 20px 35px -12px rgba(107, 58, 58, 0.25)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#E8DFD3] overflow-hidden group"
            >
              {/* الشريط العلوي الملون */}
              <div className="h-2 w-full" style={{ backgroundColor: item.accent }}></div>
              
              <div className="p-6 flex flex-col items-center text-center">
                {/* Icon Container with hover effect */}
                <div 
                  className="w-20 h-20 mb-5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F2EFE9]"
                  style={{ color: item.accent }}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-[#6B3A3A] mb-3 font-serif">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#5C381B] leading-relaxed text-sm font-sans">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default GuideSection;