import { useState, useEffect } from "react";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import { publicAsset } from "@/lib/publicAsset";



const WhyAndalusia = () => {



 

  return (
    <section id="why-andalusia" className="relative py-5 px-6 bg-[#F2EFE9] overflow-hidden z-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-10">
        
        <div className="flex-[1.5] w-full space-y-4 text-right">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="mb-4"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3E2723] mb-2">لماذا الأندلس؟</h2>
            <div className="w-16 h-1 bg-[#C1A881] rounded-full"></div>
          </motion.div>

        
        </div>

     
      </div>
    </section>
  );
};

export default WhyAndalusia;