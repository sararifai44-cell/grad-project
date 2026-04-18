import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../features/auth/RegisterForm";

const RegisterPage = () => {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const verses = [
    { text: "سَلامٌ مِن صَبا بَرَدى أَرَقُّ", author: "أحمد شوقي (في حب الأندلس)" },
    { text: "يا زَمانَ الوَصلِ بِالأَندَلُسِ", author: "لسان الدين بن الخطيب" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % verses.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [verses.length]);

  // دالة تُستدعى عندما يكتمل التسجيل بنجاح في الفورم
  const handleRegisterSuccess = () => {
    // توجيه فوري ومباشر لصفحة اللوجن بدون أي انتظار
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black" dir="rtl">
      
      {/* فيديو الخلفية */}
      <video 
        ref={videoRef}
        src="public\assets\gate.mp4" 
        className="absolute inset-0 w-full h-full object-cover z-0"
        muted playsInline loop
      />

      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 z-20 min-h-screen bg-black/60">
        
        {/* القسم الأيسر: الأبيات */}
        <div className="hidden lg:flex relative flex-col items-center justify-center p-12">
         
          
          <div className="relative w-full h-[400px] flex items-center justify-center mt-10">
            <AnimatePresence mode="wait">
              <motion.div key={currentVerseIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center absolute w-full flex flex-col items-center">
                <div className="font-andalus-title text-[2.8rem] leading-snug text-sand-100 flex items-center justify-center">
                  <span className="text-andalus-gold mx-5 text-5xl">«</span>
                  <motion.span
                    key={`reg-text-${currentVerseIndex}`}
                    initial={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" }}
                    animate={{ clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)" }}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                    className="inline-block"
                  >
                    {verses[currentVerseIndex].text}
                  </motion.span>
                  <span className="text-andalus-gold mx-5 text-5xl">»</span>
                </div>
                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 1.5, delay: 2.5 }} className="w-24 h-[1px] bg-gradient-to-r from-transparent via-andalus-gold to-transparent my-10" />
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 3 }} className="font-andalus-fancy text-2xl text-andalus-gold tracking-widest">
                  {verses[currentVerseIndex].author}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* القسم الأيمن: الفورم */}
        <div className="flex items-center justify-center p-6 w-full relative">
          <RegisterForm onRegister={handleRegisterSuccess} /> 
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;