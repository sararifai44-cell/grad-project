// src/pages/GalleryIndex.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { galleryData } from '@/lib/galleryData';
import LandmarkCard from '@/components/gallery/LandmarkCard';
import { Pannellum } from 'pannellum-react';

// صورة الهيرو (قصر الحمراء - غرناطة)
// ملاحظة: تأكد من وضع كود الـ base64 كاملاً هنا، أو استخدام مسار صورة مباشر مثل "/images/hero-360.jpg"
const heroImage ="assets/Street View 360_LE_upscale_prime.jpg"

const GalleryIndex = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('الكل');

  const filteredData = filter === 'الكل' 
    ? galleryData 
    : galleryData.filter(l => l.style.includes(filter));

  return (
    <div className="min-h-screen bg-[#F4EFE6] font-tajawal" dir="rtl">
      
    
      {/* الهيرو مع صورة 360 درجة */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#1A0F0B]">
        {/* مكون Pannellum لعرض الـ 360 */}
        <div className="absolute inset-0">
          <Pannellum
            width="100%"
            height="100%"
            image={heroImage}
            pitch={0}
            yaw={0}
            hfov={100}
            autoLoad={true}
            autoRotate={-2} // سرعة الدوران التلقائي
            showControls={false} // إخفاء أزرار التحكم
            mouseZoom={false} // تعطيل الزووم بالماوس
          />
          {/* طبقة داكنة فوق الصورة مع pointer-events-none للسماح بسحب الصورة إذا أردت */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F0B]/60 to-[#1A0F0B]/40 pointer-events-none"></div>
        </div>

       {/* تدرج لوني داكن على اليمين فقط لضمان وضوح النص بدون الحاجة لصندوق */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#1A0F0B]/90 via-[#1A0F0B]/40 to-transparent pointer-events-none z-0"></div>

        {/* المحتوى فوق الصورة - ستايل متحفي هادئ */}
        <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 flex justify-start">
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
              className="pointer-events-auto max-w-2xl mt-8" 
            >
              
              {/* العنوان بخط مناسب وعلى سطر واحد */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-amiri leading-[1.2] text-white drop-shadow-lg whitespace-nowrap">
                معماريّة <span className="text-[#C5A059]">الأندلس</span>
              </h1>
              
              {/* وصف مقروء ومقسوم على سطرين بشكل إجباري */}
              <p className="text-white/80 text-base md:text-lg mb-10 font-tajawal leading-relaxed font-light drop-shadow-md">
                رحلة بصرية غامرة في روائع العمارة الإسلامية، <br />
                توثيق لأعظم المعالم الخالدة عبر الزمن وتفاصيلها الساحرة.
              </p>

              {/* زر بيج أغمق، بحجم أصغر، وحواف بيضوية (rounded-full) */}
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
                className="group flex items-center justify-center gap-3 px-6 py-2.5 bg-[#E6D5B8] text-[#1A0F0B] border border-[#C5A059]/60 rounded-full font-bold text-base transition-all duration-300 hover:bg-[#C5A059] hover:text-white hover:border-[#C5A059] hover:shadow-lg w-fit"
              >
                <span className="font-tajawal mt-1">استكشف المعالم</span>
                <svg 
                  className="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-x-1.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>

       
      </section>

  {/* شريط الحقب الأندلسية الكامل - تصميم مطور */}
      <div className="relative z-40 bg-[#F4EFE6]/80 backdrop-blur-md py-6 border-b border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-6">
    {/* قسم العنوان المضبط مع الأقواس */}
<div className="max-w-4xl mx-auto px-6 mb-10 text-center">
  <div className="flex flex-col items-center">
    
    <h2 className="text-[#5C3A21] font-tajawal text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed flex items-center flex-wrap justify-center gap-2">
      <span>تصفح الآثار المعمارية موزعة حسب</span>
      
      {/* كلمة التسلسل التاريخي داخل أقواس وبمسافة واضحة */}
      <span className="flex items-center text-[#C5A059] mx-1">
      
        <span className="border-b border-[#C5A059]/30 pb-0.5">التسلسل التاريخي</span>
      
      </span>
      
      <span>للأندلس</span>
    </h2>

    {/* خط توضيحي صغير جداً يفصل عن الفلتر */}
  </div>
</div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {[
              { id: 'الكل', label: 'الكل' },
              { id: 'إمارة', label: ' الإمارة' },
              { id: 'خلافة', label: ' الخلافة' },
              { id: 'طوائف', label: ' الطوائف' },
              { id: 'مرابطي', label: ' المرابطين' },
              { id: 'موحدي', label: ' الموحدين' },
              { id: 'نصري', label: ' بني نصر' }
            ].map((era) => (
              <motion.button
                key={era.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(era.id)}
                className={`relative px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-500 overflow-hidden group ${
                  filter === era.id
                    ? 'bg-[#2C4A2E] text-white shadow-lg shadow-[#2C4A2E]/30'
                    : 'bg-white/50 text-[#5C3A21] border border-[#C5A059]/30 hover:border-[#2C4A2E]'
                }`}
              >
                {/* تأثير لمعان خفيف عند الهوفر */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                
                <span className="relative z-10 font-tajawal">
                  {era.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

   {/* شبكة المعالم */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        {/* شبكة عرض بـ 4 أعمدة في الشاشات الكبيرة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((landmark, index) => (
              <motion.div
                key={landmark.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/gallery/${landmark.id}`)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  
                  {/* قسم الصورة - يسحب الآن من coverImage */}
                  <div className="aspect-[4/3] bg-[#2C4A2E]/10 relative overflow-hidden">
                    <img 
                      src={landmark.coverImage} 
                      alt={landmark.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null; 
                        // صورة احتياطية في حال لم يعمل الرابط
                        e.target.src = "https://images.unsplash.com/photo-1543385759-4509eab8a548?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                    
                    {/* طبقة التدرج اللوني فوق الصورة لضمان جمالية التصميم */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5C3A21]/40 to-transparent pointer-events-none z-10"></div>
                  </div>

                  {/* قسم النصوص والمعلومات */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-[#5C3A21] mb-1.5 group-hover:text-[#2C4A2E] transition">
                      {landmark.name}
                    </h3>
                    <p className="text-[#6B5B4F] text-xs line-clamp-2 mb-3 flex-grow leading-relaxed">
                      {landmark.description}
                    </p>
                    
                    {/* الموقع وزر استكشف */}
                    <div className="mt-auto flex items-center justify-between border-t border-[#F4EFE6] pt-3">
                      <span className="text-[#2C4A2E] text-xs font-bold flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {landmark.title.split(' - ')[0]} 
                      </span>
                      
                      {/* زر استكشف الصغير */}
                      <span className="flex items-center gap-1 px-3 py-1.5 bg-[#F4EFE6] text-[#5C3A21] group-hover:bg-[#C5A059] group-hover:text-white rounded-full text-[10px] sm:text-xs font-bold transition-colors duration-300">
                        استكشف
                        <svg 
                          className="w-3 h-3 transform transition-transform duration-300 group-hover:-translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
     

    </div>
  );
};

export default GalleryIndex;