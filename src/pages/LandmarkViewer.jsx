import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pannellum } from 'pannellum-react';
import { useParams, useNavigate } from 'react-router-dom';
import { galleryData } from '@/lib/galleryData';

const LandmarkViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [activeLandmark, setActiveLandmark] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState(null);

  useEffect(() => {
    const foundLandmark = galleryData.find(item => item.id === id);
    if (foundLandmark) {
      setActiveLandmark(foundLandmark);
      window.scrollTo(0, 0);
    } else {
      navigate('/gallery');
    }
  }, [id, navigate]);

  if (!activeLandmark) return <div className="min-h-screen bg-[#111] flex items-center justify-center text-[#C1A881]">جاري التحضير...</div>;

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
      
      {/* 1. المسرح البانورامي الأساسي */}
      <div className="relative w-full h-[60vh] md:h-[75vh] bg-[#111] overflow-hidden">
        <button 
          onClick={() => navigate('/gallery')}
          className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-white/20 transition-all shadow-lg"
        >
          <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-sm font-bold">العودة</span>
        </button>

        <Pannellum width="100%" height="100%" image={activeLandmark.mainView.img} pitch={0} yaw={180} hfov={100} autoLoad={true} autoRotate={-1.5} showZoomCtrl={false} showFullscreenCtrl={false} mouseZoom={true} />
        
        {/* معلومات المعلم فوق البانوراما */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none z-10 flex flex-col justify-end p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-bold mb-4 inline-block">
              {activeLandmark.style}
            </span>
            <h2 className="font-amiri text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl">
              {activeLandmark.name}
            </h2>
            <p className="text-white/80 max-w-2xl text-lg md:text-xl font-light leading-relaxed drop-shadow-md">
              {activeLandmark.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. معرض الصور بالكروت المصغرة */}
      <div className="flex-grow max-w-[1600px] mx-auto w-full px-4 md:px-8 py-16">
        
        <div className="flex items-center gap-4 mb-10">
          <h3 className="font-amiri text-3xl md:text-4xl font-bold" style={{ color: theme.primary }}>
            المشاهد والأروقة
          </h3>
          <div className="flex-1 h-[2px] opacity-20" style={{ backgroundColor: theme.primary }}></div>
        </div>

        {activeLandmark.views && activeLandmark.views.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
            {activeLandmark.views.map((view) => (
              <motion.div 
                key={view.id} 
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-md"
                onClick={() => openModal(view)}
              >
                <img src={view.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={view.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-tajawal font-bold text-base md:text-lg drop-shadow-md leading-tight">{view.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="w-full py-24 text-center rounded-2xl border-2 border-dashed bg-white/40" style={{ borderColor: `${theme.primary}30`, color: theme.primary }}>
            <p className="font-bold text-lg opacity-70">لم يتم إدراج الصور البصرية لهذا المعلم بعد.</p>
          </div>
        )}
      </div>

      {/* المودال لعرض الصورة 360 */}
      <AnimatePresence>
        {isModalOpen && modalView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
          >
            <button onClick={closeModal} className="absolute top-6 right-6 z-[110] w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
              <span className="text-xl md:text-2xl font-light">✕</span>
            </button>
            <motion.div className="w-full h-full max-w-[1600px] max-h-[900px] bg-[#0a0a0a] rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative">
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                <span className="text-white font-amiri text-lg md:text-xl">{modalView.title}</span>
              </div>
              <Pannellum width="100%" height="100%" image={modalView.img} pitch={0} yaw={180} hfov={110} autoLoad={true} autoRotate={-2} mouseZoom={true} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LandmarkViewer;