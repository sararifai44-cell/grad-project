import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VerseOfTheDay = () => {
  const navigate = useNavigate();

  const exampleVerse = {
    part1: "يا أُهَيلَ الحَيِّ مِن وادي الغَضا",
    part2: "بِتُّ في نُعماءَ في عَهدِ الرِضا",
    poet: "ابن الخطيب"
  };

  const handleStartAnalysis = () => {
    navigate('/analyze', { state: { prefilledVerse: exampleVerse } });
  };

  return (
    <section className="py-10 bg-[#FBF9F4]" dir="rtl">
      <div className="max-w-[820px] mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-[#C89B64]/20 border-r-8 border-r-[#C89B64] shadow-[0_15px_40px_-15px_rgba(44,26,20,0.06)] rounded-tl-[2.5rem] rounded-br-[2.5rem] overflow-hidden flex flex-col md:flex-row items-stretch"
        >
          
          {/* الجانب الأيمن: النص الشعري (بخلفية بيج رملي دافئ) */}
          <div className="flex-grow p-6 md:p-10 flex flex-col justify-center bg-[#F3EDE2] border-b md:border-b-0 md:border-l border-[#C89B64]/10">
            <div className="flex items-center gap-2 mb-5 opacity-40">
              <span className="font-tajawal text-[9px] font-black uppercase tracking-[0.2em] text-[#2C1A14]">بيتٌ أندلسيّ</span>
              <div className="h-px w-8 bg-[#C89B64]"></div>
            </div>
            
            <div className="space-y-3">
              <motion.h2 
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="font-aref text-2xl md:text-3xl text-[#2C1A14] font-bold leading-tight"
              >
                {exampleVerse.part1}
              </motion.h2>
              
              <motion.h2 
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-aref text-2xl md:text-3xl text-[#C89B64] font-bold leading-tight mr-10 md:mr-20 lg:mr-28"
              >
                {exampleVerse.part2}
              </motion.h2>
            </div>
            
            <div className="mt-6 flex items-center gap-2 opacity-50">
                <div className="w-1.5 h-[1px] bg-[#C89B64]"></div>
                <p className="font-aref text-lg text-[#2C1A14] italic tracking-wide">— {exampleVerse.poet}</p>
            </div>
          </div>

          {/* الجانب الأيسر: الأخضر الزيتوني والزر الذهبي المطفي */}
          <div className="w-full md:w-[280px] p-6 md:p-8 bg-[#243B2B] flex flex-col justify-center relative">
            
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#C89B64]/15 rounded-br-full"></div>

            <h3 className="font-tajawal text-[10px] font-black text-[#C89B64] uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C89B64] rotate-45"></span>
              تحليل أدبي
            </h3>
            
            <div className="grid grid-cols-2 gap-y-3 mb-8">
              {['البحر والوزن', 'تحليل القافية', 'الغرض الشعري', 'شرح المعاني'].map((feat, i) => (
                <div key={i} className="flex items-center gap-1.5 group cursor-default">
                  <div className="w-1 h-1 bg-[#C89B64]/40 rounded-full group-hover:bg-[#C89B64] transition-colors"></div>
                  <span className="font-tajawal text-[9px] text-white/50 font-bold group-hover:text-white transition-colors">{feat}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <motion.button 
                onClick={handleStartAnalysis}
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "#FDF8E7", 
                  color: "#243B2B",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)" 
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 bg-[#B4975A] text-white rounded-xl font-tajawal font-black text-[9px] uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-lg"
              >
                بدء التحليل
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
           
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default VerseOfTheDay;