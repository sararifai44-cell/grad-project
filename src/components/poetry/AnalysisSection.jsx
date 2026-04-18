import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Lightbulb, Music, FileText, 
  Plus, Trash2, Feather, Search
} from 'lucide-react';
import { publicAsset } from "@/lib/publicAsset";

// --- الألوان الأساسية (تصميمك الأصلي) ---
const theme = {
  bg: '#faf8f3',
  primary: '#6b4423', 
  accent: '#7a9b76',  
  mutedBtn: '#b09c8a' 
};

const steps = [
    { num: "١", title: "أدخل الأبيات", img: publicAsset("undraw_insert_z218.svg") },
    { num: "٢", title: "تحليل ذكي", img: publicAsset("undraw_chat-with-ai_ir62.svg") },
    { num: "٣", title: "النتائج والتفاصيل", img: publicAsset("undraw_data-at-work_3tbf (2).svg") },
];

export default function PoetryAnalysis() {
  const [verses, setVerses] = useState([
    { shatr1: '', shatr2: '' },
    { shatr1: '', shatr2: '' },
    { shatr1: '', shatr2: '' },
    { shatr1: '', shatr2: '' },
    { shatr1: '', shatr2: '' },
  ]);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleVerseChange = (index, field, value) => {
    const newVerses = [...verses];
    newVerses[index][field] = value;
    setVerses(newVerses);
  };

  const handleScrollToAnalyzer = () => {
    const analyzerSection = document.getElementById('analyzer-section');
    if (analyzerSection) {
      analyzerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddVerse = () => {
    setVerses([...verses, { shatr1: '', shatr2: '' }]);
  };

  const handleRemoveVerse = (index) => {
    if (verses.length > 1) {
      setVerses(verses.filter((_, i) => i !== index));
    }
  };

  const isInputValid = verses.some(v => v.shatr1.trim() !== '' || v.shatr2.trim() !== '');

  const handleAnalyze = () => {
    if (!isInputValid) return;
    setIsAnalyzing(true);
    setAnalysisResult(null); 
    setTimeout(() => {
      setAnalysisResult({
        purpose: "الفخر والحماسة",
        meter: "البحر الطويل",
        rhyme: "الميم المكسورة",
        explanation: "في هذا البيت الشعري، يستخدم الشاعر أسلوباً بلاغياً راقياً يجمع بين الوصف الحسي والمشاعر الوجدانية. الصور الشعرية تتداخل لتخلق لوحة فنية متكاملة تعبر عن عمق التجربة الإنسانية. استخدام الكلمات المنتقاة بعناية يضفي على الأبيات موسيقى داخلية تتناغم مع الوزن الخارجي، مما يعزز الأثر الجمالي والعاطفي للنص."
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const getPlaceholder = (index, isShatr1) => {
    return isShatr1 ? "أدخل الشطر الأول" : "أدخل الشطر الثاني";
  };

  return (
    <div className="min-h-screen font-['Amiri',_serif] pb-24 text-right" style={{ backgroundColor: theme.bg }} dir="rtl">
      
      {/* ================= كيف يعمل الموقع (تصميمك الأصلي تماماً) ================= */}
      <section className="py-12 px-6 lg:px-12 bg-[#f0f7f1] select-none" dir="rtl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
          
          <div className="w-full lg:w-1/3 flex flex-col justify-center text-center lg:text-right shrink-0">
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black mb-4 text-[#3d2e1f] leading-[1.2] tracking-tight">
              كيف يعمل الموقع؟
            </h2>
            <div className="hidden lg:block w-16 h-1 bg-[#6b4423] mb-6 rounded-full opacity-80"></div>
            <div className="bg-white rounded-2xl p-5 mb-6 max-w-md mx-auto lg:mx-0 relative shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e5dcd3] border-r-[6px] border-r-[#6b4423] group hover:shadow-[0_8px_30px_rgba(107,68,35,0.08)] transition-all duration-300">
              <span className="absolute -top-3 left-4 text-5xl text-[#8b7355] opacity-10 font-serif rotate-180 group-hover:scale-110 transition-transform duration-300">"</span>
              <p className="text-[#4a3427] text-base lg:text-lg font-bold leading-loose relative z-10">
                أداة بسيطة وسريعة لتحليل بحور الشعر العربي باستخدام الذكاء الاصطناعي، مصممة بدقة لتمنحك تجربة أدبية استثنائية.
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <button 
                onClick={handleScrollToAnalyzer}
                className="bg-[#6b4423] text-white px-6 py-3 rounded-[0.5rem] font-bold text-lg shadow-[0_8px_20px_rgba(107,68,35,0.3)] hover:bg-[#4a3427] transition-all duration-300 flex items-center gap-3 group"
              >
                <span>ابدأ التحليل الآن</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center group mt-4 lg:mt-0">
                <div className="w-full aspect-square bg-white rounded-3xl p-6 mb-4 flex items-center justify-center shadow-sm border border-[#e2ede4] hover:-translate-y-2 transition-all duration-500">
                  <img src={step.img} alt={step.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col items-center -mt-2">
                  <span className="text-3xl md:text-4xl font-black text-[#8b7355] opacity-40 mb-1 font-serif group-hover:opacity-80 transition-all duration-300">
                    {step.num}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white bg-[#6b4423] px-8 py-2.5 rounded-full shadow-[0_8px_20px_rgba(107,68,35,0.3)] -mt-8 z-20 relative transition-all duration-300">
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= القسم الرئيسي: الأداة والنتائج (تصميمك الأصلي) ================= */}
      <section id="analyzer-section" className="px-4 max-w-[1400px] mx-auto mb-20 bg-white/40 py-12 rounded-3xl border border-[#e5dcd3]/50">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-md shrink-0" style={{ backgroundColor: theme.primary }}>
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ color: theme.primary }}>أداة تحليل الشعر العربي</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch mx-auto px-2 md:px-6">
          <div className="lg:col-span-7 bg-white w-full h-[540px] rounded-2xl shadow-sm border-2 p-6 md:p-8 flex flex-col overflow-hidden" style={{ borderColor: theme.mutedBtn }}>
            <div className="hidden md:flex gap-3 items-center mb-4 px-2 shrink-0">
              <div className="w-8 shrink-0"></div>
              <div className="flex-1 text-center font-bold text-[#6b4423] text-base border-b border-[#e5dcd3] pb-2">الشطر الأول</div>
              <div className="w-9 shrink-0"></div>
              <div className="flex-1 text-center font-bold text-[#6b4423] text-base border-b border-[#e5dcd3] pb-2">الشطر الثاني</div>
              <div className="w-10 shrink-0"></div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3 mb-4">
              {verses.map((verse, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-2 items-center relative group shrink-0">
                  <div className="hidden md:flex w-7 h-7 shrink-0 rounded-full bg-[#7a9b76]/15 text-[#7a9b76] items-center justify-center font-bold text-xs font-sans">{index + 1}</div>
                  <div className="flex-1 w-full flex flex-col gap-1">
                    <input type="text" placeholder={getPlaceholder(index, true)} value={verse.shatr1} onChange={(e) => handleVerseChange(index, 'shatr1', e.target.value)} className="w-full bg-[#faf8f3] border border-[#b09c8a]/40 rounded-lg px-4 py-2.5 outline-none focus:border-[#6b4423] focus:bg-white transition-all text-lg text-[#3d2e1f] text-center" />
                  </div>
                  <div className="hidden md:flex items-center justify-center text-[#b09c8a] opacity-30"><Feather size={16} className="rotate-45" /></div>
                  <div className="flex-1 w-full flex flex-col gap-1">
                    <input type="text" placeholder={getPlaceholder(index, false)} value={verse.shatr2} onChange={(e) => handleVerseChange(index, 'shatr2', e.target.value)} className="w-full bg-[#faf8f3] border border-[#b09c8a]/40 rounded-lg px-4 py-2.5 outline-none focus:border-[#6b4423] focus:bg-white transition-all text-lg text-[#3d2e1f] text-center" />
                  </div>
                  <div className="w-8 flex justify-center">
                    {verses.length > 1 && (
                      <button onClick={() => handleRemoveVerse(index)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="shrink-0 pt-3 border-t border-[#e5dcd3]">
              <div className="flex justify-start mb-4">
                <button onClick={handleAddVerse} className="flex items-center gap-1.5 text-[#8b7355] hover:text-[#6b4423] font-bold text-sm transition-colors">
                  <Plus size={16} /> أضف بيتاً جديداً
                </button>
              </div>
              <div className="flex justify-center">
                <button onClick={handleAnalyze} disabled={isAnalyzing || !isInputValid} className="text-white px-10 py-3 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg w-full md:w-auto justify-center transition-all active:scale-[0.98] disabled:opacity-50" style={{ backgroundColor: theme.primary }}>
                  {isAnalyzing ? "جارٍ التحليل..." : <><Sparkles size={18}/> تحليل القصيدة</>}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 w-full h-[540px]">
            <div className="bg-[#fdfcf9] border-t-4 border-x border-b border-[#e5dcd3] rounded-2xl shadow-xl flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-l from-[#6b4423]/10 to-transparent p-4 border-b border-[#e5dcd3] shrink-0">
                <p className="text-[#4a3427] font-bold text-xl text-center">نتائج التحليل الأدبي</p>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
                {!analysisResult && !isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                    <Search size={48} className="text-[#b09c8a] mb-4 animate-pulse" />
                    <p className="text-[#6b4423] font-bold text-xl mb-2">لا توجد نتائج بعد</p>
                    <p className="text-[#8b7355] text-base px-4">أدخل الأبيات الشعرية واضغط تحليل لعرض النتائج الكاملة هنا.</p>
                  </div>
                ) : isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-12 h-12 border-4 border-[#7a9b76] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-[#6b4423] font-bold text-xl">جاري استخراج المكنونات...</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-[#e5dcd3] border-r-4 border-r-[#b09c8a] rounded-lg p-4 flex flex-col justify-center shadow-sm relative overflow-hidden">
                        <div className="absolute top-3 left-3 opacity-10"><Lightbulb size={32} className="text-[#6b4423]" /></div>
                        <span className="text-[12px] text-gray-500 font-bold uppercase mb-1">الغرض الشعري</span>
                        <p className="font-bold text-xl text-[#3d2e1f] leading-snug">{analysisResult.purpose}</p>
                      </div>
                      <div className="bg-white border border-[#e5dcd3] border-r-4 border-r-[#d4b08c] rounded-lg p-4 flex flex-col justify-center shadow-sm relative overflow-hidden">
                        <div className="absolute top-3 left-3 opacity-10"><FileText size={32} className="text-[#6b4423]" /></div>
                        <span className="text-[12px] text-gray-500 font-bold uppercase mb-1">القافية</span>
                        <p className="font-bold text-xl text-[#3d2e1f] leading-snug">{analysisResult.rhyme}</p>
                      </div>
                    </div>
                    <div className="bg-white border border-[#e5dcd3] border-r-4 border-r-[#7a9b76] rounded-lg p-5 flex items-center gap-4 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-[#faf8f3] flex items-center justify-center text-[#7a9b76] shrink-0 border border-[#7a9b76]/20"><Music size={24} /></div>
                      <div className="flex flex-col">
                        <span className="text-[12px] text-gray-500 font-bold uppercase mb-1">البحر الشعري والإيقاع</span>
                        <p className="font-bold text-3xl text-[#2d1b10]">{analysisResult.meter}</p>
                      </div>
                    </div>
                    <div className="bg-white border border-[#e5dcd3] border-r-4 border-r-[#6b4423] rounded-lg p-5 shadow-sm flex flex-col relative">
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#e5dcd3]">
                        <BookOpen size={20} className="text-[#6b4423]" />
                        <span className="text-lg font-bold text-[#6b4423]">الشرح البلاغي والتحليل</span>
                      </div>
                      <div className="text-[#4a3427] text-lg leading-relaxed text-justify pr-1">{analysisResult.explanation}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #b09c8a; border-radius: 10px; }
      `}</style>
    </div>
  );
}