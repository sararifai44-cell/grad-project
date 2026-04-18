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
    path: "/history-classification" // <-- التعديل هنا: أضفنا مسار الصفحة
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
    <section id="platform-features" className="relative pt-8 pb-14 md:pt-12 md:pb-20 2xl:pt-24 2xl:pb-32 px-6 bg-[#F2EFE9] z-30 border-t border-[#C1A881]/10">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-8 2xl:mb-14">
          <h2 className="text-3xl md:text-5xl lg:text-6xl 2xl:text-[80px] font-serif font-black text-[#3E2723] mb-3 2xl:mb-6">« أدوات المنصة »</h2>
          <p className="text-[#5D4037]/70 font-sans max-w-xl 2xl:max-w-3xl text-sm md:text-base 2xl:text-xl leading-relaxed text-center">نضع بين يديك أحدث التقنيات لخدمة وإحياء التراث الأندلسي العريق.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-10 w-full px-2 md:px-0">
          {featuresData.map((feature, index) => (
            <motion.div 
              key={feature.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -10, 
                boxShadow: "0px 20px 40px rgba(62, 39, 35, 0.15)" 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                opacity: { delay: index * 0.1 } 
              }}
              onClick={() => {
                if (feature.path) {
                  navigate(feature.path);
                }
              }}
              className="flex flex-col bg-[#FAF9F6] rounded-[1.8rem] 2xl:rounded-[2.5rem] overflow-hidden shadow-sm border border-[#3E2723]/5 hover:border-[#C1A881]/40 transition-colors duration-300 group cursor-pointer w-full"
            >
              <div className="w-full h-40 lg:h-44 2xl:h-72 relative overflow-hidden bg-black border-b border-[#3E2723]/5">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.9]" 
                />
              </div>
              <div className="flex flex-col p-5 2xl:p-8 text-center items-center bg-white/40 flex-1 justify-between pointer-events-none">
                <div>
                  <h3 className="text-lg 2xl:text-2xl font-serif font-bold text-[#3E2723] mb-2 2xl:mb-4">{feature.title}</h3>
                  <p className="text-[#5D4037]/80 text-[12px] 2xl:text-base mb-5 2xl:mb-8 leading-relaxed">{feature.description}</p>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-[#1A3C34] font-bold text-[14px] 2xl:text-[18px] border-t border-[#C1A881]/20 pt-4 2xl:pt-6 w-full group-hover:text-[#255248] transition-colors"> 
                  {feature.buttonText} <ArrowLeft size={16} className="2xl:scale-125" />
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