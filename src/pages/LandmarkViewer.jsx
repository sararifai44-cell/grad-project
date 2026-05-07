import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pannellum } from 'pannellum-react';
import { useParams, useNavigate } from 'react-router-dom';
import { galleryData } from '@/lib/galleryData';

const LandmarkViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [activeLandmark, setActiveLandmark] = useState(null);
  const [currentView, setCurrentView] = useState(null);
  
  const sliderRef = useRef(null);

  useEffect(() => {
    const foundLandmark = galleryData.find(item => item.id === id);
    if (foundLandmark) {
      setActiveLandmark(foundLandmark);
      setCurrentView(foundLandmark.mainView);
      window.scrollTo(0, 0);
    } else {
      navigate('/gallery');
    }
  }, [id, navigate]);

  if (!activeLandmark || !currentView) return <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center text-gray-600">جاري التحضير...</div>;

  const { theme } = activeLandmark;

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 320; 
      sliderRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const allViews = [activeLandmark.mainView, ...(activeLandmark.views || [])];
  const isMainView = currentView.id === activeLandmark.mainView.id;

  return (
    <div className="min-h-screen flex flex-col font-tajawal bg-[#FDF8F0] pt-10 md:pt-20 pb-16" dir="rtl">
      
      <div className="max-w-[1450px] mx-auto w-full px-4 md:px-6">
        
        {/* الترويسة العلوية وزر العودة */}
{/* الترويسة العلوية - ستايل بسيط وأنيق (Minimal & Clean) */}
<div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-3">
  
 {/* قسم العنوان: مدمج بلمسة لونية هادئة */}
<div className="flex items-center gap-5 group">
    {/* مؤشر هوية انسيابي يتفاعل مع الحركة */}
    <div 
      className="w-1.5 h-10 rounded-full transition-all duration-300 group-hover:h-12 shadow-sm" 
      style={{ backgroundColor: theme.primary }}
    ></div>
    
    <div className="flex flex-col">
      <h1 className="font-almarai text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
        {activeLandmark.name}
      </h1>
      {/* خط سفلي رقيق جداً */}
      <div className="w-1/2 h-[1px] bg-gray-100 mt-1"></div>
    </div>
  </div>
  {/* زر العودة: ستايل كلاسيكي مع هوفر تفاعلي */}
 <button 
  onClick={() => navigate('/gallery')}
  className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-95 group"
  style={{ 
    backgroundColor: theme.primary, 
  }}
  onMouseEnter={(e) => {
    // هوفر يعتمد على تغميق اللون قليلاً ليعطي إحساس بالضغط
    e.currentTarget.style.filter = 'contrast(1.2) brightness(0.9)'; 
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.filter = 'none';
  }}
>
  {/* النص جهة اليمين */}
  <span className="text-sm font-bold font-tajawal">
    العودة للمعرض
  </span>

  {/* السهم جهة اليسار مع حركة انزلاق بسيطة عند الهوفر */}
  <svg 
    className="w-5 h-5 rotate-180 transition-transform duration-300 group-hover:-translate-x-2" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
  </svg>
</button>
</div>
        {/* 1. المشغل المركزي */}
        <div className="relative w-full h-[310px] sm:h-[380px] md:h-[450px] bg-[#111] rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-black/5">
          <Pannellum 
            key={currentView.id} 
            width="100%" 
            height="100%" 
            image={currentView.img} 
            pitch={0} 
            yaw={180} 
            hfov={115} 
            autoLoad={true} 
            autoRotate={-1.5} 
            showZoomCtrl={false} 
            showFullscreenCtrl={false} 
            mouseZoom={true} 
          />
        </div>
{/* 2. منطقة النصوص الوصفية (مع أيقونة بجانب العنوان) */}
<div className="mt-6 mb-10 max-w-[1250px] mx-auto px-4 md:px-6">
  <motion.div 
    key={currentView.id}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white rounded-xl p-5 md:p-7 shadow-sm border-2 flex flex-col md:flex-row gap-6 md:gap-10 items-center overflow-hidden transition-colors duration-500"
    style={{ borderColor: `${theme.primary}40` }} 
  >
    
    {/* عمود العنوان - مع أيقونة بجانبه */}
    <div className="w-full md:w-1/3 shrink-0 text-center md:text-right border-l-0 md:border-l border-gray-100 md:pl-8">
      <div className="flex items-center justify-center md:justify-start gap-2 mb-1 opacity-60">
        <span className="text-[10px] font-bold tracking-widest uppercase">الموقع الحالي</span>
      </div>
      
      <div className="flex items-center justify-center md:justify-start gap-3">
        {/* أيقونة المعلم بجانب العنوان */}
        <svg 
          className="w-7 h-7 md:w-8 md:h-8 shrink-0" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          style={{ color: theme.primary }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        
        <h2 
          className="font-amiri text-3xl md:text-4xl font-bold leading-tight"
          style={{ color: theme.primary }}
        >
          {currentView.title}
        </h2>
      </div>
    </div>

    {/* عمود المعلومات - 3 أسطر مع أيقونات */}
    <div className="w-full md:w-2/3 flex flex-col gap-3">
      <AnimatePresence mode="wait">
        {isMainView ? (
          <motion.div 
            key="info-rows"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-2"
          >
            {/* السطر الأول: نبذة تاريخية */}
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-gray-50 shrink-0" style={{ color: theme.primary }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-1 italic">
                {activeLandmark.description.split('.')[0]}...
              </p>
            </div>

            {/* السطر الثاني: الطراز المعماري */}
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-gray-50 shrink-0" style={{ color: theme.primary }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-gray-700 font-bold text-sm md:text-base">
                الطراز: <span className="font-medium text-gray-500">{activeLandmark.style}</span>
              </p>
            </div>

            {/* السطر الثالث: الموقع الجغرافي */}
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-gray-50 shrink-0" style={{ color: theme.primary }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <p className="text-gray-700 font-bold text-sm md:text-base">
                المكان: <span className="font-medium text-gray-500">{activeLandmark.name}، الأندلس</span>
              </p>
            </div>
          </motion.div>
        ) : (
          /* وضع الاستكشاف للزوايا الأخرى */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2"
          >
             <div className="flex items-center gap-3">
               <div className="p-1.5 rounded-md bg-gray-50 shrink-0" style={{ color: theme.primary }}>
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
               </div>
               <p className="text-gray-600 font-medium italic text-sm md:text-base">استكشف الزاوية من خلال تحريك الصورة يميناً ويساراً.</p>
             </div>
             <div className="w-full h-[1px] bg-gray-50"></div>
             <p className="text-[12px] text-gray-400">هذا المشهد يعرض تفاصيل دقيقة لزخارف {currentView.title}.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
</div>

        {/* 3. شريط الأروقة (بقي كما هو) */}
        <div className="max-w-[1300px] mx-auto px-2 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h3 className="font-amiri text-3xl font-bold text-gray-900">
                المشاهد المتاحة
              </h3>
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-white border border-gray-200 text-gray-600 shadow-sm">
                {allViews.length}
              </span>
            </div>
          </div>

          <div className="relative group">
            
            <button 
              onClick={() => scrollSlider('right')} 
              className="hidden md:flex absolute -right-6 top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-white border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.08)] rounded-full items-center justify-center text-gray-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.primary}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#4b5563'; }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </button>

            <div 
              ref={sliderRef}
              className="flex gap-5 md:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1"
            >
              {allViews.map((view) => {
                const isActive = currentView.id === view.id;
                return (
                  <motion.div 
                    key={view.id} 
                    whileHover={{ y: -5 }}
                    onClick={() => setCurrentView(view)}
                    className="shrink-0 w-[220px] sm:w-[260px] flex flex-col cursor-pointer snap-start group/card"
                  >
                    <div 
                      className={`relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500 border-[3px] ${
                        isActive ? 'shadow-[0_8px_25px_rgba(0,0,0,0.12)] scale-[1.02]' : 'border-transparent shadow-sm opacity-80 hover:opacity-100'
                      }`}
                      style={{ borderColor: isActive ? theme.primary : 'transparent' }}
                    >
                      <img src={view.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110" alt={view.title} />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                      {isActive && (
                        <div className="absolute top-4 right-4 text-white p-2 rounded-full shadow-lg backdrop-blur-md" style={{ backgroundColor: theme.primary }}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-right px-1">
                      <h4 className="font-tajawal font-bold text-lg transition-colors duration-300" style={{ color: isActive ? theme.primary : '#4A4A4A' }}>
                        {view.title}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button 
              onClick={() => scrollSlider('left')} 
              className="hidden md:flex absolute -left-6 top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-white border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.08)] rounded-full items-center justify-center text-gray-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.primary}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#4b5563'; }}
            >
              <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LandmarkViewer;