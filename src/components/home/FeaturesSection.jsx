// eslint-disable-next-line
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // استدعاء أداة التنقل
import { publicAsset } from "@/lib/publicAsset";

const featuresData = [
  {
    id: "poetry",
    title: "التحليل الآلي للشعر",
    description: "حلل القصائد بذكاء لاكتشاف بحورها،و شرح مفرداتها، ",
    buttonText: "ابدأ التحليل",
    image: publicAsset("Gemini_Generated_Image_cxdt5ccxdt5ccxdt (1) (1).png"),
    path: "/poetry-analysis" // <-- التعديل هنا: ضفنا مسار الصفحة
  },
  {
    id: "history",
    title: "تصنيف الأحداث",
    description: "استكشف تاريخ الأندلس عبر خط زمني يربط كل حدث بأسبابه ونتائجه المباشرة.",
    buttonText: "تصفح الأحداث",
    image: publicAsset("1024px-Castillo_(Baños_de_la_Encina),_vista_exterior_00.png"),
    path: "" // مسار فارغ مؤقتاً لحين بناء الصفحة
  },
  {
    id: "geography",
    title: "الخريطة التفاعلية",
    description:"تتبع المسار الزمني لرحلة الفتح العظيم خطوة بخطوة.",
    buttonText: "افتح الخريطة",
    image: publicAsset("1.PNG"),
    path: "" // مسار فارغ مؤقتاً
  },
  {
    id: "gallery",
    title: "معرض الصور",
    description: "مجموعة منتقاة من الصور واللوحات التي تجسد العمارة والحياة في بلاد الأندلس.",
    buttonText: "عرض الصور",
    image: publicAsset("pexels-david-vives-1474251-34136118.jpg"),
    path: "" // مسار فارغ مؤقتاً
  }
];

const FeaturesSection = () => {
  const navigate = useNavigate(); // <-- التعديل هنا: تعريف الدالة

  return (
    <section id="platform-features" className="relative pt-8 pb-14 md:pt-12 md:pb-20 px-6 bg-[#F2EFE9] z-30 border-t border-[#C1A881]/10">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-[#3E2723] mb-3">« أدوات المنصة »</h2>
          <p className="text-[#5D4037]/70 font-sans max-w-xl text-sm md:text-base leading-relaxed text-center">نضع بين يديك أحدث التقنيات لخدمة وإحياء التراث الأندلسي العريق.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-2 md:px-0">
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
              className="flex flex-col bg-[#FAF9F6] rounded-[1.8rem] overflow-hidden shadow-sm border border-[#3E2723]/5 hover:border-[#C1A881]/40 transition-colors duration-300 group cursor-pointer w-full"
            >
              <div className="w-full h-40 lg:h-44 relative overflow-hidden bg-black border-b border-[#3E2723]/5">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.9]" />
              </div>
              <div className="flex flex-col p-5 text-center items-center bg-white/40 flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#3E2723] mb-2">{feature.title}</h3>
                  <p className="text-[#5D4037]/80 text-[12px] mb-5 leading-relaxed">{feature.description}</p>
                </div>
                
                {/* التعديل هنا: ربط الزر بمسار الـ feature */}
                <button 
                  onClick={() => {
                    if (feature.path) {
                      navigate(feature.path);
                    }
                  }}
                  className="flex items-center justify-center gap-2 text-[#836243] font-bold text-[11px] border-t border-[#C1A881]/20 pt-4 w-full hover:text-[#3E2723] transition-colors"
                > 
                  {feature.buttonText} <ArrowLeft size={14} />
                </button>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;