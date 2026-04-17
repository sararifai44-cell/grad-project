import React from 'react';
import { motion } from 'framer-motion';
import PrimaryButton from '@/components/ui/PrimaryButton';
const AnalysisHero = ({ inputText, setInputText, handleAnalyze, isAnalyzing, heroBackgroundImage }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroBackgroundImage})`,
          backgroundPosition: 'center 9%' 
        }}
      />
      
      <div className="absolute inset-0 bg-black/25 pointer-events-none z-0"></div>
      
      <section className="relative w-full min-h-screen flex flex-col justify-center items-start text-right pr-6 md:pr-12 lg:pr-20 pl-10 pt-32 pb-24 z-10 max-w-[1600px] mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl" 
          style={{ fontFamily: '"Amiri", serif', lineHeight: '1.2' }}
        >
          <span className="text-[#D9C8A9]">تحليل الشعر </span>
          <span className="text-white">آلياً</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl mb-12 max-w-3xl font-light leading-relaxed text-[#F9F7F1] drop-shadow-lg"
        >
          بوابة ذكية تفتح آفاقاً جديدة في دراسة الأدب الأندلسي بلمسة تقنية حديثة.
        </motion.p>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-start items-center gap-4 md:gap-6 mb-14 w-full"
        >
          {[
            { text: "التحليل العروضي الآلي" },
            { text: "تصنيف الأغراض الشعرية" },
            { text: "شرح أدبي مبسط" }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -5, backgroundColor: '#EADBC3', scale: 1.05 }}
              className="flex items-center gap-4 bg-[#D9C8A9] px-6 py-3 rounded-full shadow-lg border border-[#D9C8A9] cursor-default group transition-all"
            >
              <div className="flex items-center justify-center opacity-80 group-hover:rotate-90 transition-transform duration-700">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L14.5 7.5L22 10L14.5 12.5L12 20L9.5 12.5L2 10L9.5 7.5L12 0Z" fill="#2D140D"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-[#2D140D]">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-row items-stretch w-full max-w-xl h-14 shadow-2xl rounded-xl overflow-hidden"
        >
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="أدخل بيتاً شعرياً..."
            className="flex-grow bg-white text-[#1A3C34] placeholder-[#1A3C34]/50 px-6 py-0 text-lg outline-none border-none"
            style={{ fontFamily: '"Amiri", serif' }}
          />
          <PrimaryButton 
            style={{ color: '#F9F7F1', margin: 0 }} 
            className="bg-[#1A3C34] hover:bg-[#245247] px-8 font-bold transition-all whitespace-nowrap !rounded-none border-none flex items-center justify-center" 
            onClick={handleAnalyze}
          >
            {isAnalyzing ? 'جارِ...' : 'ابدأ التحليل'}
          </PrimaryButton>
        </motion.div>
      </section>
    </div>
  );
};

export default AnalysisHero;