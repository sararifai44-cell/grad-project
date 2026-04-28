// src/pages/LandmarkViewer.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pannellum } from 'pannellum-react';
import { useParams, useNavigate } from 'react-router-dom';
import { galleryData } from '@/lib/galleryData';
const LandmarkViewer = () => {
  const { id } = useParams(); // التقاط الـ id من الرابط
  const navigate = useNavigate();
  
  const [activeLandmark, setActiveLandmark] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState(null);

  useEffect(() => {
    // البحث عن المعلم المطلوب بناءً على الرابط
    const foundLandmark = galleryData.find(item => item.id === id);
    if (foundLandmark) {
      setActiveLandmark(foundLandmark);
      setActiveCategory(foundLandmark.categories[0]);
      window.scrollTo(0, 0);
    } else {
      navigate('/gallery'); // إذا كان الـ ID غلط، رجعه للمعرض
    }
  }, [id, navigate]);

  if (!activeLandmark || !activeCategory) return <div className="min-h-screen bg-[#111] flex items-center justify-center text-[#C1A881]">جاري التحضير...</div>;

  const { theme } = activeLandmark;

  const openModal = (view) => {
    setModalView(view);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalView(null), 300); 
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen flex flex-col font-tajawal transition-colors duration-1000" style={{ backgroundColor: theme.accent }} dir="rtl">
      
      {/* المسرح البانورامي 360 */}
      <div className="relative w-full h-[75vh] md:h-[85vh] bg-[#111] overflow-hidden border-b-[3px]" style={{ borderColor: theme.secondary }}>
        
        {/* زر العودة للمعرض (مهم جداً للـ UX) */}
        <button 
          onClick={() => navigate('/gallery')}
          className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 transition-colors"
        >
          <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-sm font-bold">العودة للأروقة</span>
        </button>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none z-10"></div>

        <Pannellum
          width="100%"
          height="100%"
          image={activeLandmark.mainView.img}
          pitch={0}
          yaw={180}
          hfov={100}
          autoLoad={true}
          autoRotate={-1.5}
          showZoomCtrl={false}
          showFullscreenCtrl={false}
          mouseZoom={true}
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 right-6 md:top-24 md:right-12 backdrop-blur-xl p-8 md:p-10 rounded-2xl max-w-[400px] shadow-2xl z-20 pointer-events-none border"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: `${theme.secondary}40` }}
        >
          <h2 className="font-amiri text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {activeLandmark.name}
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-loose font-light">
            {activeLandmark.description}
          </p>
        </motion.div>
        
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10"></div>
      </div>

      {/* معرض الزوايا المصنف (التبويبات الداخلية) */}
      <div className="flex-grow pt-16 pb-24 px-4 md:px-8">
        <div className="max-w-[1500px] mx-auto">
          
          <div className="flex flex-col items-center text-center mb-8">
            <h3 className="font-amiri text-3xl md:text-4xl font-bold mb-3" style={{ color: theme.primary }}>
               أقسام وزوايا {activeLandmark.name}
            </h3>
          </div>

          {/* التبويبات */}
          <div className="flex justify-center gap-3 md:gap-6 mb-12 overflow-x-auto no-scrollbar pb-2">
            {activeLandmark.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border-2"
                style={{
                  backgroundColor: activeCategory.id === category.id ? theme.primary : 'transparent',
                  color: activeCategory.id === category.id ? theme.accent : theme.primary,
                  borderColor: activeCategory.id === category.id ? theme.primary : `${theme.primary}40`,
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* صور القسم المختار */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {activeCategory.views.map((view) => (
                <motion.div 
                  key={view.id} 
                  whileHover={{ y: -5 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-lg"
                  onClick={() => openModal(view)}
                >
                  <img src={view.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={view.title} />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex flex-col justify-end p-4">
                    <span className="text-white font-bold text-lg drop-shadow-md">{view.title}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* المودال */}
      <AnimatePresence>
        {isModalOpen && modalView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          >
            <button onClick={closeModal} className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
              <span className="text-xl font-bold">X</span>
            </button>
            <motion.div className="w-full h-full max-w-[1600px] max-h-[900px] bg-black rounded-2xl overflow-hidden border border-white/10">
              <Pannellum width="100%" height="100%" image={modalView.img} pitch={0} yaw={180} hfov={110} autoLoad={true} autoRotate={-2} mouseZoom={true} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LandmarkViewer;