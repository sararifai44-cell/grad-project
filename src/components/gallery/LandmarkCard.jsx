// import React from 'react';
// import { motion } from 'framer-motion';

// const LandmarkCard = ({ landmark, onClick }) => {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       whileHover={{ y: -10 }}
//       onClick={onClick}
//       className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group border-2 border-transparent hover:border-[#C1A881]/50 transition-all duration-500 shadow-2xl"
//     >
//       {/* الصورة */}
//       <img 
//         src={landmark.mainView.img} 
//         alt={landmark.name} 
//         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
//       />
      
//       {/* التدرج اللوني والنصوص - ثابت مثل الصورة تماماً */}
//       <div className="absolute inset-0 bg-gradient-to-t from-[#271A14] via-[#271A14]/40 to-transparent flex flex-col justify-end p-8 text-right">
//         <div className="flex justify-between items-end">
//           <div>
//             <span className="text-[#C1A881] text-xs font-bold uppercase mb-2 block tracking-widest">
//               {landmark.style}
//             </span>
//             <h4 className="font-amiri text-3xl md:text-4xl font-bold text-white mb-2">
//               {landmark.name}
//             </h4>
//             <p className="text-[#FDF8F0]/70 font-tajawal text-sm max-w-[250px] line-clamp-2">
//               {landmark.description}
//             </p>
//           </div>
          
//           {/* زر السهم */}
//           <div className="w-12 h-12 rounded-full bg-[#C1A881] text-[#271A14] flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
//             <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default LandmarkCard; 
// src/components/gallery/LandmarkCard.jsx
// src/components/gallery/LandmarkCard.jsx
// src/components/gallery/LandmarkCard.jsx
// src/components/gallery/LandmarkCard.jsx
// src/components/gallery/LandmarkCard.jsx
// src/components/gallery/LandmarkCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LandmarkCard = ({ landmark, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      whileHover={{ y: -12 }}
      onClick={onClick}
      className="bg-white rounded-[2rem] overflow-hidden cursor-pointer group shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(193,168,129,0.15)] border-2 border-transparent hover:border-[#C1A881] transition-all duration-500 flex flex-col h-full"
    >
      {/* حاوية الصورة - ممتدة بالكامل للأعلى واليمين واليسار بدون حواف */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img 
          src={landmark.mainView.img} 
          alt={landmark.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        {/* تدرج لوني خفيف أسفل الصورة لضمان وضوح النص */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0B]/80 via-transparent to-transparent"></div>
        
        {/* سنة البناء - موسطة أسفل الصورة كما في التصميم */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-sm drop-shadow-md">
          {landmark.year}
        </div>
      </div>
      
      {/* منطقة النص - موسطة (Center) لتعطي الطابع المتحفي الفخم */}
      <div className="px-6 pb-6 pt-5 flex-grow flex flex-col justify-between text-center">
        <div>
          <h4 className="font-amiri text-2xl font-bold text-[#1A0F0B] group-hover:text-[#C1A881] transition-colors duration-300">
            {landmark.name}
          </h4>
          <span className="text-[#C1A881] text-[11px] font-bold uppercase tracking-widest mt-1 block">
            {landmark.style}
          </span>
          
          <p className="text-[#1A0F0B] font-tajawal text-[13px] font-medium leading-relaxed line-clamp-2 mt-3">
            {landmark.description}
          </p>
        </div>
        
        {/* الزر الجديد - تصميم كبسولة غامقة مع نص وسهم كما طلبت */}
        <div className="mt-6 flex justify-center w-full">
          <div className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-[#271A14] text-[#C1A881] font-bold text-sm transition-all duration-300 group-hover:bg-[#C1A881] group-hover:text-[#271A14] shadow-md">
            <span>Start Tour</span>
            {/* سهم متحرك */}
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default LandmarkCard;