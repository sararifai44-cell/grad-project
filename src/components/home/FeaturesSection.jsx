// eslint-disable-next-line
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import { publicAsset } from "@/lib/publicAsset";

const featuresData = [
  {
    id: "poetry",
    title: "التحليل الآلي للشعر",
    description: "حلل القصائد بذكاء لاكتشاف بحورها،و شرح مفرداتها، ",
    buttonText: "ابدأ التحليل",
    image: publicAsset("Gemini_Generated_Image_cxdt5ccxdt5ccxdt (1) (2).jpg"),
    path: "/poetry-analysis" 
  },
  {
    id: "history",
    title: "تصنيف الأحداث",
    description: "استكشف تاريخ الأندلس عبر خط زمني يربط كل حدث بأسبابه ونتائجه المباشرة.",
    buttonText: "حلل الأحداث",
    image: publicAsset("1024px-Castillo_(Baños_de_la_Encina),_vista_exterior_00.jpg"),
    path: "/history-classification" 
  },
  {
    id: "geography",
    title: "الخريطة التفاعلية",
    description:"تتبع المسار الزمني لرحلة الفتح العظيم خطوة بخطوة.",
    buttonText: "افتح الخريطة",
    image: publicAsset("1.jpg"),
    path: "" 
  },
  {
    id: "gallery",
    title: "معرض الصور",
    description: "مجموعة منتقاة من الصور واللوحات التي تجسد العمارة والحياة في بلاد الأندلس.",
    buttonText: "عرض الصور",
    image: publicAsset("jorge-fernandez-salas-yteO5bs_QCA-unsplash (1) (1).jpg"),
    path: "" 
  }
];

const FeaturesSection = () => {
  const navigate = useNavigate(); 

  return (
    <section id="platform-features" className="relative pt-8 pb-14 md:pt-12 md:pb-20 2xl:pt-32 2xl:pb-48 px-6 bg-[#F2EFE9] z-30 border-t border-[#C1A881]/10">
      {/* تم تحديد max-w في 2xl لضمان عدم تمدد المحتوى بشكل مفرط في الشاشات العملاقة */}
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto relative z-10 flex flex-col items-center">
        
        <div className="text-center mb-8 2xl:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl 2xl:text-[85px] font-serif font-black text-[#3E2723] mb-3 2xl:mb-8">« أدوات المنصة »</h2>
          <p className="text-[#5D4037]/70 font-sans max-w-xl 2xl:max-w-4xl text-sm md:text-base 2xl:text-2xl leading-relaxed text-center">نضع بين يديك أحدث التقنيات لخدمة وإحياء التراث الأندلسي العريق.</p>
        </div>
        
        {/* تحسين الفراغات (Gap) في الشاشات الكبيرة جداً */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-12 w-full px-2 md:px-0">
          {featuresData.map((feature, index) => (
            <motion.div 
              key={feature.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03, 
                y: -12, 
                boxShadow: "0px 25px 50px rgba(62, 39, 35, 0.18)" 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                opacity: { delay: index * 0.1 } 
              }}
              onClick={() => {
                if (feature.path) {
                  navigate(feature.path);
                }
              }}
              className="flex flex-col bg-[#FAF9F6] rounded-[1.8rem] 2xl:rounded-[3rem] overflow-hidden shadow-sm border border-[#3E2723]/5 hover:border-[#C1A881]/40 transition-colors duration-300 group cursor-pointer w-full"
            >
              {/* تعديل ارتفاع الصورة في 2xl ليتناسب مع ضخامة الشاشة */}
              <div className="w-full h-40 lg:h-44 2xl:h-80 relative overflow-hidden bg-black border-b border-[#3E2723]/5">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.9]" 
                />
              </div>

              {/* زيادة الحشوة الداخلية (Padding) في الشاشات الكبيرة للحفاظ على التوازن البصري */}
              <div className="flex flex-col p-5 2xl:p-10 text-center items-center bg-white/40 flex-1 justify-between pointer-events-none">
                <div>
                  <h3 className="text-lg 2xl:text-3xl font-serif font-bold text-[#3E2723] mb-2 2xl:mb-6">{feature.title}</h3>
                  <p className="text-[#5D4037]/80 text-[12px] 2xl:text-lg mb-5 2xl:mb-10 leading-relaxed">{feature.description}</p>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-[#1A3C34] font-bold text-[14px] 2xl:text-[20px] border-t border-[#C1A881]/20 pt-4 2xl:pt-8 w-full group-hover:text-[#255248] transition-colors"> 
                  {feature.buttonText} <ArrowLeft size={16} className="2xl:scale-150" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;