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
      
      {/* شريط علوي شفاف */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-[#C5A059]/20 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-[#2C4A2E] font-amiri text-2xl font-bold">معمارية الأندلس</div>
          <div className="hidden md:flex gap-8 text-[#5C3A21]">
            <a href="#" className="hover:text-[#2C4A2E] transition">الرئيسية</a>
            <a href="#" className="hover:text-[#2C4A2E] transition">المعالم</a>
            <a href="#" className="hover:text-[#2C4A2E] transition">المدونة</a>
            <a href="#" className="hover:text-[#2C4A2E] transition">من نحن</a>
          </div>
        </div>
      </nav>

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
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F0B]/80 to-[#1A0F0B]/40 pointer-events-none"></div>
        </div>

        {/* المحتوى فوق الصورة */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mb-6"></div>
            
           
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              معماريّة<br />
              <span className="text-[#C5A059]">الأندلس</span>
            </h1>
            
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              رحلة بصرية في روائع العمارة الإسلامية، توثيق لأعظم المعالم الخالدة
            </p>

            <div className="flex gap-4 justify-center mt-8 pointer-events-auto">
              <button className="px-8 py-3 bg-[#C5A059] text-[#1A0F0B] rounded-full font-bold hover:bg-[#D4B87A] transition shadow-lg">
                استكشف المعالم
              </button>
            </div>
          </motion.div>
        </div>

        {/* سهم للأسفل */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 text-2xl z-10"
        >
          ↓
        </motion.div>
      </section>

      {/* شريط الفلترة */}
      <div className="sticky top-20 z-40 bg-[#F4EFE6] py-4 border-b border-[#2C4A2E]/10">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max justify-center">
            {['الكل', 'أموي', 'موحدي', 'نصري', 'طوائف'].map((era) => (
              <button
                key={era}
                onClick={() => setFilter(era)}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                  filter === era
                    ? 'bg-[#2C4A2E] text-white'
                    : 'bg-white text-[#5C3A21] hover:bg-[#2C4A2E]/10'
                }`}
              >
                عصر {era}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* شبكة المعالم */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] bg-[#2C4A2E]/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5C3A21]/20 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#5C3A21] mb-2 group-hover:text-[#2C4A2E] transition">
                      {landmark.title}
                    </h3>
                    <p className="text-[#6B5B4F] text-sm line-clamp-2">
                      {landmark.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[#2C4A2E] text-sm font-bold">{landmark.location}</span>
                      <span className="text-[#C5A059] text-xs">{landmark.style}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* قسم مميز مع صورة صغيرة */}
    
     

    </div>
  );
};

export default GalleryIndex;