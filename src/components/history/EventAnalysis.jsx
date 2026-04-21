import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// استيراد المكونات المشتركة من مجلد ui
import { Card, CardContent } from '@/components/ui/card';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Badge } from '@/components/ui/badge'; 

const EventAnalysis = () => {
  const [event, setEvent] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(""); // ** الاقتراح 3: رسالة خطأ **

  const handleSearch = () => {
    // ** الاقتراح 3: التحقق من الحقل الفارغ **
    if (!event.trim()) {
      setError("الرجاء إدخال اسم الحدث");
      setResult(null);
      return;
    }
    setError("");
    
    setResult({
      era: "عصر المرابطين",
      date: "٤٧٩ هـ / ١٠٨٦ م",
      causes: [
        "استنجاد ملوك الطوائف بيوسف بن تاشفين",
        "توسع ملك قشتالة ألفونسو السادس وسقوط طليطلة"
      ],
      outcomes: [
        "انتصار المسلمين الساحق وإيقاف الزحف القشتالي",
        "تأخير سقوط الأندلس لقرون إضافية",
        "بداية نهاية سيطرة ملوك الطوائف وتوحيد الأندلس تحت راية المرابطين"
      ]
    });
  };

  return (
    <section className="py-12 px-4 md:py-16 md:px-6 bg-gradient-to-br from-[#fdfaf5] to-[#f5efe6]">
      
      {/* الحاوية الرئيسية */}
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl border border-[#C1A881]/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
        >
          {/* ** الاقتراح 5: تأثير glow عند hover - خلفية زخرفية ** */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C1A881]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#C1A881]/20 rounded-full blur-3xl animate-pulse delay-700" />
          </div>
          
          {/* النصوص داخل الحاوية */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#5D4037] mb-3 font-arabic">
              محلل الأحداث التاريخية
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C1A881]/20 via-[#C1A881] to-[#C1A881]/20 rounded-full mx-auto mb-3" />
            <p className="text-[#8B7355] text-base md:text-lg max-w-2xl mx-auto">
              أدخل اسم الحدث التاريخي لمعرفة الحقبة الزمنية، الأسباب، والنتائج
            </p>
          </div>
          
          {/* بوكس البحث */}
          <div className="max-w-2xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="flex items-center p-1.5 bg-white rounded-full shadow-lg border border-[#C1A881]/40 focus-within:border-[#C1A881] focus-within:ring-2 focus-within:ring-[#C1A881]/30 transition-all duration-300"
            >
              <input 
                type="text"
                placeholder="أدخل اسم الحدث (مثلاً: معركة الزلاقة)..."
                className="flex-1 px-5 py-3 text-base outline-none bg-transparent text-[#5D4037] placeholder-[#B8A07A]/60 rounded-full font-arabic"
                value={event}
                onChange={(e) => {
                  setEvent(e.target.value);
                  if (error) setError(""); // مسح الخطأ عند الكتابة
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <PrimaryButton 
                onClick={handleSearch} 
                className="flex-row-reverse py-2.5 px-8 cursor-pointer hover:scale-105 active:scale-95 rounded-full bg-gradient-to-r from-[#C1A881] to-[#A8885A] hover:from-[#A8885A] hover:to-[#8B6B3E] transition-all duration-300 shadow-md border-0"
              >
                {/* ** الاقتراح 6: أيقونة بحث متحركة ** */}
                <motion.span
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                  className="inline-block ml-1"
                >
                  🔍
                </motion.span>
                تحليل
              </PrimaryButton>
            </motion.div>
            
            {/* ** الاقتراح 3: رسالة خطأ ** */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-center"
                >
                  <p className="text-red-500 text-sm font-arabic bg-red-50/80 backdrop-blur-sm inline-block px-4 py-2 rounded-full">
                    ⚠️ {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* لوحة النتائج */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-10 pt-8 border-t border-[#C1A881]/30"
              >
                {/* زخرفة قبل النتائج */}
                <div className="flex justify-center gap-3 mb-6">
                  <div className="w-16 h-px bg-[#C1A881]/30" />
                  <span className="text-[#C1A881]/40 text-sm font-arabic">✦ نتائج التحليل ✦</span>
                  <div className="w-16 h-px bg-[#C1A881]/30" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* بطاقة الحقبة - ** الاقتراح 5: تأثير glow ** */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex group"
                  >
                    <Card className="bg-gradient-to-br from-[#fcfaf7] to-white border-t-4 border-t-[#C1A881] shadow-md hover:shadow-[0_0_20px_rgba(193,168,129,0.3)] hover:-translate-y-2 transition-all duration-300 overflow-hidden w-full">
                      <CardContent className="flex flex-col items-center justify-center text-center p-6 min-h-[280px]">
                        <h3 className="text-[#C1A881] font-bold mb-3 text-lg uppercase tracking-wider">الحقبة الزمنية</h3>
                        <p className="text-[#5D4037] text-2xl md:text-3xl font-bold mb-3 font-arabic">{result.era}</p>
                        <Badge variant="outline" className="text-base text-[#8B7355] border-[#C1A881] bg-[#C1A881]/5 px-4 py-1.5">
                           {result.date}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* بطاقة الأسباب - ** الاقتراح 5: تأثير glow ** */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex group"
                  >
                    <Card className="bg-gradient-to-br from-[#fcfaf7] to-white border-t-4 border-t-[#5D4037] shadow-md hover:shadow-[0_0_20px_rgba(139,107,62,0.25)] hover:-translate-y-2 transition-all duration-300 w-full">
                      <CardContent className="p-6">
                        <div className="text-center mb-5">
                          <h3 className="text-[#5D4037] font-bold border-b-2 border-[#C1A881] pb-2 inline-block text-2xl">الأسباب</h3>
                        </div>
                        <ul className="space-y-4">
                          {result.causes.map((item, i) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + (i * 0.1) }}
                              className="flex items-start gap-3 text-[#6B5B4F] text-lg md:text-xl leading-relaxed"
                            >
                              <span className="text-[#C1A881] text-xl mt-0.5">✦</span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* بطاقة النتائج - ** الاقتراح 5: تأثير glow ** */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex group"
                  >
                    <Card className="bg-gradient-to-br from-[#fcfaf7] to-white border-t-4 border-t-[#5D4037] shadow-md hover:shadow-[0_0_20px_rgba(139,107,62,0.25)] hover:-translate-y-2 transition-all duration-300 w-full">
                      <CardContent className="p-6">
                        <div className="text-center mb-5">
                          <h3 className="text-[#5D4037] font-bold border-b-2 border-[#C1A881] pb-2 inline-block text-2xl">النتائج</h3>
                        </div>
                        <ul className="space-y-4">
                          {result.outcomes.map((item, i) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + (i * 0.1) }}
                              className="flex items-start gap-3 text-[#6B5B4F] text-lg md:text-xl leading-relaxed"
                            >
                              <span className="text-[#C1A881] text-xl mt-0.5">✦</span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* زخرفة سفلية */}
          <div className="flex justify-center gap-2 mt-6 pt-3">
            <div className="w-8 h-px bg-[#C1A881]/20" />
            <span className="text-[#C1A881]/30 text-xs">۞</span>
            <div className="w-8 h-px bg-[#C1A881]/20" />
          </div>

        </motion.div>
      </div>
      
    </section>
    
  );
};

export default EventAnalysis;