import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm";

const LoginPage = () => {
  const [isGateOpening, setIsGateOpening] = useState(false);
  const [isFadingToBlack, setIsFadingToBlack] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const verses = [
    { text: "لَم يَكُن وَصلُكَ إِلّا حُلُماً", author: "لسان الدين بن الخطيب" },
    { text: "أَضحى التَنائي بَديلاً مِن تَدانينا", author: "ابن زيدون" },
    { text: "جادَكَ الغَيثُ إِذا الغَيثُ هَمى", author: "لسان الدين بن الخطيب" }
  ];

  useEffect(() => {
    if (isGateOpening) return;
    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % verses.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isGateOpening, verses.length]);

  const handleLoginSuccess = () => {
    setIsGateOpening(true);
    if (videoRef.current) {
      videoRef.current.play();
      
      // التلاشي للسواد قبل الانتقال
      setTimeout(() => setIsFadingToBlack(true), 2000);

      // الانتقال الفعلي لصفحة الهوم
      setTimeout(() => navigate("/home"), 2500);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black" dir="rtl">
      
      {/* فيديو البوابة */}
      <video 
        ref={videoRef}
        src="/assets/gate.mp4" 
        style={{ opacity: isFadingToBlack ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}
        className="absolute inset-0 w-full h-full object-cover z-0"
        muted playsInline
      />

      <AnimatePresence>
        {!isGateOpening && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(15px)", scale: 1.05 }} 
            className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 z-20 min-h-screen bg-black/60"
          >
            {/* القسم الأيسر: عرض الأبيات الشعرية */}
            <div className="hidden lg:flex relative flex-col items-center justify-center p-12">
          
              
              <div className="relative w-full h-[400px] flex items-center justify-center mt-10">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentVerseIndex} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    className="text-center absolute w-full flex flex-col items-center"
                  >
                    
                    {/* التأثير الأصلي: مسح انسيابي (Ink Sweep) من اليمين لليسار */}
                    <div className="font-andalus-title text-[2.8rem] leading-snug text-sand-100 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] flex items-center justify-center">
                      <span className="text-andalus-gold mx-5 text-5xl">«</span>
                      
                      <motion.span
                        key={`text-${currentVerseIndex}`}
                        initial={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" }}
                        animate={{ clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)" }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                        className="inline-block"
                      >
                        {verses[currentVerseIndex].text}
                      </motion.span>
                      
                      <span className="text-andalus-gold mx-5 text-5xl">»</span>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 2.5 }}
                      className="w-24 h-[1px] bg-gradient-to-r from-transparent via-andalus-gold to-transparent my-10"
                    />

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5, delay: 3 }}
                      className="font-andalus-fancy text-2xl text-andalus-gold tracking-widest"
                    >
                      {verses[currentVerseIndex].author}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-6 w-full relative">
              <LoginForm onLogin={handleLoginSuccess} /> 
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* طبقة السواد النهائية للانتقال السلس */}
      {isFadingToBlack && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black z-[100] pointer-events-none"
        />
      )}
    </div>
  );
};

export default LoginPage;