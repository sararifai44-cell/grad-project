import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, Trash2, ArrowLeft, RefreshCw, FileText, Check, ArrowDown, BookOpen, Sparkles, X, MousePointerClick,
  Zap, Brain, Award, Lightbulb, Type, Copy, AlertCircle, RotateCcw, Copy as CopyIcon, Trash, HelpCircle, BarChart3, Search, Save, FolderOpen, Bookmark, Edit3
} from 'lucide-react';
import { useAnalyzePoetryMutation } from './poetryApiSlice'; 

import { motion, AnimatePresence } from 'framer-motion';

export default function PoetryAnalysisAcademic() {
  const [verses, setVerses] = useState([
    { shatr1: '', shatr2: '' },
  ]);
  
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isExampleOpen, setIsExampleOpen] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialResult, setTutorialResult] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [helpField, setHelpField] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [savedItems, setSavedItems] = useState([]);
  const [showCollections, setShowCollections] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  const resultsRef = useRef(null); 

  const [analyzePoetry, { isLoading: isAnalyzing, isError }] = useAnalyzePoetryMutation();

  // تحميل المجموعات المحفوظة من localStorage عند بدء التشغيل
  useEffect(() => {
    const saved = localStorage.getItem('poetryCollections');
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, []);

  // حفظ المجموعات في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem('poetryCollections', JSON.stringify(savedItems));
  }, [savedItems]);

  // Tutorial example data - Andalusian poetry
  const tutorialExample = {
    shatr1: 'لا تنسَ أيام الشباب ولذّته',
    shatr2: 'فإن الشباب ساعة من ساعات'
  };

  // ==================== Handlers ====================
  const handleVerseChange = (index, field, value) => {
    const newVerses = [...verses];
    newVerses[index][field] = value;
    setVerses(newVerses);
    validateInput(field, value);
  };

  const handleAddVerse = () => {
    setVerses([...verses, { shatr1: '', shatr2: '' }]);
    addAlert('تم إضافة بيت جديد', 'success');
  };
  
  const handleRemoveVerse = (index) => {
    if (verses.length > 1) {
      setVerses(verses.filter((_, i) => i !== index));
      addAlert('تم حذف البيت بنجاح', 'info');
    } else {
      addAlert('يجب الاحتفاظ ببيت واحد على الأقل', 'warning');
    }
  };

  // ==================== Toolbar Handlers ====================
  const handleCopyAll = () => {
    const allText = verses
      .map(v => `${v.shatr1} ${v.shatr2}`.trim())
      .filter(v => v)
      .join('\n');
    
    if (allText.trim()) {
      navigator.clipboard.writeText(allText);
      addAlert('✓ تم نسخ جميع الأبيات بنجاح', 'success');
    } else {
      addAlert('لا توجد أبيات لنسخها', 'warning');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('هل تريد حذف جميع الأبيات؟ هذه العملية لا يمكن التراجع عنها.')) {
      setVerses([{ shatr1: '', shatr2: '' }]);
      addAlert('⚠ تم مسح جميع الأبيات', 'warning');
    }
  };

  // ==================== Save to Collection ====================
  const handleSaveToCollection = () => {
    if (!analysisResult) {
      addAlert('⚠ لا توجد نتائج لحفظها. قم بتحليل القصيدة أولاً', 'warning');
      return;
    }
    
    const hasPoetry = verses.some(v => v.shatr1.trim() !== '' || v.shatr2.trim() !== '');
    if (!hasPoetry) {
      addAlert('⚠ لا توجد أبيات شعرية لحفظها', 'warning');
      return;
    }
    
    setIsSaveModalOpen(true);
    setCollectionName('');
  };

  const confirmSave = () => {
    const name = collectionName.trim();
    if (!name) {
      addAlert('⚠ يرجى إدخال اسم للمجموعة', 'warning');
      return;
    }
    
    const poetryText = verses
      .filter(v => v.shatr1.trim() !== '' || v.shatr2.trim() !== '')
      .map(v => `${v.shatr1.trim()} ${v.shatr2.trim()}`.trim())
      .join('\n');
    
    const newItem = {
      id: Date.now(),
      name: name,
      date: new Date().toLocaleString('ar-EG'),
      verses: verses.filter(v => v.shatr1.trim() !== '' || v.shatr2.trim() !== ''),
      poetryText: poetryText,
      analysis: analysisResult,
      versesCount: verses.filter(v => v.shatr1.trim() !== '' || v.shatr2.trim() !== '').length
    };
    
    setSavedItems(prev => [newItem, ...prev]);
    setIsSaveModalOpen(false);
    setCollectionName('');
    addAlert(`✓ تم حفظ "${name}" في مجموعتك بنجاح`, 'success');
  };

  const handleDeleteSavedItem = (id) => {
    if (window.confirm('هل تريد حذف هذا العنصر نهائياً؟')) {
      setSavedItems(prev => prev.filter(item => item.id !== id));
      addAlert('✓ تم حذف العنصر بنجاح', 'success');
    }
  };

  const handleLoadSavedItem = (item) => {
    const loadedVerses = item.verses.map(v => ({ shatr1: v.shatr1, shatr2: v.shatr2 }));
    setVerses(loadedVerses);
    setAnalysisResult(item.analysis);
    setShowCollections(false);
    setActiveTab('results');
    addAlert(`✓ تم تحميل "${item.name}" بنجاح`, 'success');
  };

  // ==================== Alert System ====================
  const addAlert = (message, type = 'info') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 3500);
  };

  // ==================== Smart Input Validation ====================
  const validateInput = (field, value) => {
    if (value.length > 150) {
      addAlert('⚠ تحذير: النص طويل جداً (أكثر من 150 حرف)', 'warning');
    }
    
    if (/[a-zA-Z]/.test(value)) {
      addAlert('ℹ ملاحظة: يبدو أن هناك أحرف إنجليزية في النص', 'info');
    }
    
    if (/\d/.test(value)) {
      addAlert('ℹ ملاحظة: يبدو أن هناك أرقام في النص', 'info');
    }
  };

  // ==================== Tutorial Handlers ====================
  const handleTutorialNext = async () => {
    if (tutorialStep === 1) {
      setTutorialResult({
        purpose: 'الحنين والذكرى',
        meter: 'البحر الكامل',
        rhyme: 'التاء والهاء',
        explanation: 'البيت يتحدث عن جمال أيام الشباب وضرورة عدم نسيانها، حيث يشبه الشاعر الشباب بساعة من ساعات الحياة القصيرة والمهمة. يستخدم الشاعر الأسلوب الإنشائي بصيغة النهي (لا تنسَ) لإضفاء طابع تأثيري على البيت. والقافية هنا تعتمد على حرف التاء والهاء مما يعطي البيت موسيقى جميلة وسهلة التذكر.'
      });
      setTutorialStep(2);
    } else if (tutorialStep < 2) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setIsExampleOpen(false);
      setTutorialStep(0);
      setTutorialResult(null);
    }
  };

  const handleTutorialBack = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
      if (tutorialStep === 2) {
        setTutorialResult(null);
      }
    }
  };

  const isInputValid = verses.some(v => v.shatr1.trim() !== '' || v.shatr2.trim() !== '');
  const filledVerses = verses.filter(v => v.shatr1.trim() || v.shatr2.trim()).length;

  const toArabicNumerals = (num) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(char => arabicNumbers[char] || char).join('');
  };

  const handleAnalyze = async () => {
    if (!isInputValid) {
      addAlert('⚠ يرجى إدخال بيت شعري واحد على الأقل', 'warning');
      return;
    }
    
    setAnalysisResult(null); 
    addAlert('🔄 جاري تحليل النص...', 'info');
    
    const formattedVerses = verses
      .filter(v => v.shatr1.trim() !== '' || v.shatr2.trim() !== '') 
      .map(v => `${v.shatr1.trim()} ${v.shatr2.trim()}`.trim()); 

    try {
      const response = await analyzePoetry({ verses: formattedVerses, title: "تحليل جديد" }).unwrap();
      setAnalysisResult({
        purpose: response?.result?.content?.purpose || "غير محدد",
        meter: response?.result?.content?.meter || "غير محدد",
        rhyme: response?.result?.content?.rhyme || "غير محدد",
        explanation: response?.result?.content?.explanation?.summary || "لا يوجد شرح متاح."
      });
      addAlert('✓ تم التحليل بنجاح!', 'success');
      setActiveTab('results');
    } catch (err) {
      console.error("Analysis Error:", err);
      addAlert('✗ حدث خطأ أثناء التحليل. يرجى المحاولة مجدداً', 'error');
    }
  };

  const handleCopyReport = () => {
    if (!analysisResult) return;
    
    const poetryText = verses
      .filter(v => v.shatr1.trim() !== '' || v.shatr2.trim() !== '')
      .map(v => `${v.shatr1.trim()} ${v.shatr2.trim()}`.trim())
      .join('\n');
    
    const reportText = `
═══════════════════════════════════════
           تقرير التحليل البلاغي
═══════════════════════════════════════

📝 النص الشعري:
${poetryText}

📊 نتائج التحليل:
─────────────────────
• البحر الشعري: ${analysisResult.meter}
• القافية والروي: ${analysisResult.rhyme}
• الغرض الشعري: ${analysisResult.purpose}

📖 الشرح البلاغي والمعنوي:
${analysisResult.explanation}

═══════════════════════════════════════
تم التحليل بواسطة منصة تحليل الشعر العربي
═══════════════════════════════════════
    `.trim();
    
    navigator.clipboard.writeText(reportText);
    addAlert('✓ تم نسخ التقرير مع القصيدة بنجاح', 'success');
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => { 
      if (e.key === 'Escape') {
        setIsExampleOpen(false);
        setTutorialStep(0);
        setTutorialResult(null);
        setIsSaveModalOpen(false);
        setShowCollections(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ====== حالة بيانات سلايدر النقوش الأندلسية ======
  const [currentImg, setCurrentImg] = React.useState(0);
  const sliderImages = [
    { src: "public/assets/sli.webp", desc: "نقوش ابن زمرك - بهو الأسود" },
    { src: "public/assets/xc.webp", desc: "زخرفة جصية - قصر الحمراء" },
    { src: "/assets/maria-bobrova-JZiQSVd9iH4-unsplash.jpg", desc: "أبيات شعرية - تيجان الأعمدة" }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextImg = () => setCurrentImg((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));

  return (
    <div style={{
      backgroundColor: '#F2EFE9',
      minHeight: '100vh',
    }} className="text-[#FDF1D3] pb-16 md:pb-24 selection:bg-[#1A3C34]/95 selection:text-white" dir="rtl">

      {/* ===== قسم: لماذا شعرها؟ ===== */}
      <section className="w-full bg-[#F2EFE9] py-8 md:py-10 shadow-inner flex items-center" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full">
          
          <div className="w-full md:w-[50%] flex flex-col order-2 md:order-1 self-center">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px w-8 bg-[#C1A881]"></div>
              <span className="text-[#C1A881] font-bold text-xs uppercase tracking-wider">رؤية المشروع</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-serif">
              <span className="text-[#1A2E20]">لماذا </span>
              <span className="text-[#C1A881]">شعرها؟</span>
            </h2>
            <div className="w-full h-[1.5px] bg-[#C1A881]/50 mb-7 rounded-full"></div>
            <div className="flex flex-col gap-3 mb-7 pl-1">
              {[
                { title: "ديوان الرقي الأندلسي", desc: "تميز الأدب الأندلسي برقة اللفظ وعمق الخيال، وكان مرآة لرقي حضارتهم." },
                { title: "العبقرية الموسيقية", desc: "نحلل آلياً الأوزان والقوافي لنكشف أسرار الموشحات التي هزت أركان اللغة." },
                { title: "تبسيط الجمال", desc: "نهدف لنقل جماليات اللغة العربية للأجيال الجديدة بأسلوب رقمي معاصر." }
              ].map((card, i) => (
                <div key={i} className="bg-[#6B3A3A] p-4 rounded-xl shadow-[4px_4px_0px_#D4CCBF] transition-all duration-300 hover:shadow-[5px_5px_0px_#C1A881] hover:-translate-y-0.5">
                  <h3 className="text-[#FDF1D3] font-bold text-lg font-serif mb-1">{card.title}</h3>
                  <p className="text-white text-sm leading-relaxed opacity-95">{card.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => {
                  document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' });
                  setActiveTab('input');
                }}
                className="inline-flex items-center gap-2 bg-[#1A3C34] hover:bg-[#112a24] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:-translate-y-1"
              >
                <span>ابدأ بالتحليل الآن</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              </button>
              <button className="bg-transparent border-2 border-[#C1A881] text-[#6B3A3A] hover:bg-[#C1A881] hover:text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-1">
                جولة في النقوش
              </button>
            </div>
          </div>

          <div className="w-full md:w-[50%] flex flex-col items-center order-1 md:order-2 self-center">
            <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-t-full border-[5px] border-[#4A3B32] overflow-hidden shadow-2xl group bg-[#1A120B]">
              <img 
                key={currentImg}
                src={sliderImages[currentImg].src} 
                alt="Andalusian Poetry Inscriptions" 
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out animate-in fade-in zoom-in-95"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevImg} className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#4A3B32] shadow-xl backdrop-blur-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg></button>
                <button onClick={nextImg} className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#4A3B32] shadow-xl backdrop-blur-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"></path></svg></button>
              </div>
            </div>
            <div className="mt-4 text-center max-w-[320px]">
              <div className="flex justify-center gap-1.5 mb-2">
                {sliderImages.map((_, idx) => (
                  <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${currentImg === idx ? 'w-5 bg-[#C1A881]' : 'w-1.5 bg-[#C1A881]/30'}`}></div>
                ))}
              </div>
              <p className="text-[#3E2723] text-[13px] font-bold leading-tight drop-shadow-sm px-2">{sliderImages[currentImg].desc}</p>
            </div>
          </div>
        </div>
      </section>
  <div className="w-80 h-0.5 bg-[#C1A881]/50 rounded-full mt-7 mx-auto"></div>

      {/* ==================== Tabs Section ==================== */}
      <main className="max-w-5xl mx-auto pt-3  md:pt-12 px-4 md:px-6 lg:px-8" id="input-section">
        <div className="bg-white rounded-2xl border-2 border-[#D4CCBF] overflow-hidden shadow-md">
          
          {/* Tab Buttons */}
          <div className="flex border-b border-[#E8DFD3] bg-[#F9F7F3]">
            <button 
              onClick={() => setActiveTab('input')}
              className={`flex-1 py-4 px-6 text-center font-bold transition-all duration-300 ${
                activeTab === 'input' 
                  ? 'bg-[#1A3C34] text-[#FDF1D3] border-b-2 border-[#C1A881]' 
                  : 'text-[#6B3A3A] hover:bg-[#6B3A3A]/5'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Edit3 size={18} />
                <span>إدخال الأبيات</span>
              </div>
            </button>
            <button 
              onClick={() => {
                if (analysisResult) {
                  setActiveTab('results');
                } else {
                  addAlert('⚠ يرجى إجراء تحليل أولاً لظهور النتائج', 'warning');
                }
              }}
              className={`flex-1 py-4 px-6 text-center font-bold transition-all duration-300 ${
                activeTab === 'results' && analysisResult
                  ? 'bg-[#1A3C34] text-[#FDF1D3] border-b-2 border-[#C1A881]' 
                  : !analysisResult ? 'text-[#A89F94] cursor-not-allowed bg-gray-50' : 'text-[#6B3A3A] hover:bg-[#6B3A3A]/5'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText size={18} />
                <span>النتائج والتقرير</span>
                {!analysisResult && <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">قيد الانتظار</span>}
              </div>
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-5 md:p-6 bg-[#FDFCF8]">
            <AnimatePresence mode="wait">
              {activeTab === 'input' ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Input Section Content */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#6B3A3A]/10 rounded-lg flex items-center justify-center">
                          <span className="text-[#6B3A3A] text-sm">📝</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1A3C34]">أدخل الأبيات الشعرية</h3>
                      </div>
                      <div className="flex items-center gap-2">
                      
                        <button onClick={handleAddVerse} className="p-2 text-[#6B3A3A] hover:bg-[#6B3A3A]/10 rounded-lg transition-all" title="إضافة بيت">
                          <Plus size={18} />
                        </button>
                        <button onClick={handleCopyAll} className="p-2 text-[#6B3A3A] hover:bg-[#6B3A3A]/10 rounded-lg transition-all" title="نسخ الكل">
                          <CopyIcon size={18} />
                        </button>
                        <button onClick={handleClearAll} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all" title="مسح الكل">
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Verses Container */}
                    <div className="space-y-3 max-h-[450px] overflow-y-auto mb-4">
                      {verses.map((verse, index) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={index} className="group">
                          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center bg-white border border-[#E8DFD3] rounded-xl p-3 hover:border-[#C1A881] hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-center w-8 h-8 bg-[#6B3A3A] text-[#FDF1D3] rounded-lg font-bold text-sm shrink-0">
                              {toArabicNumerals(index + 1)}
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input 
                                type="text" 
                                placeholder="الشطر الأول" 
                                value={verse.shatr1} 
                                onChange={(e) => handleVerseChange(index, 'shatr1', e.target.value)} 
                                className="w-full border-b-2 border-[#E8DFD3] focus:border-[#6B3A3A] px-3 py-2 outline-none transition-all duration-300 text-center font-serif text-[#1A120B] placeholder:text-[#A89F94]" 
                              />
                              <input 
                                type="text" 
                                placeholder="الشطر الثاني" 
                                value={verse.shatr2} 
                                onChange={(e) => handleVerseChange(index, 'shatr2', e.target.value)} 
                                className="w-full border-b-2 border-[#E8DFD3] focus:border-[#6B3A3A] px-3 py-2 outline-none transition-all duration-300 text-center font-serif text-[#1A120B] placeholder:text-[#A89F94]" 
                              />
                            </div>
                            <div className="w-8 shrink-0">
                              {verses.length > 1 && (
                                <button onClick={() => handleRemoveVerse(index)} className="w-full text-center text-gray-400 hover:text-red-500 transition-all">✕</button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                      <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700">يمكنك إضافة عدة أبيات شعرية. كل بيت من شطرين</p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs text-[#8B7C6E]">عدد الأبيات: <b className="text-[#6B3A3A]">{verses.length}</b></span>
                      <span className="text-xs text-[#8B7C6E]">المكتملة: <b className="text-[#1A3C34]">{filledVerses}</b></span>
                    </div>
                    
                    <div className="flex justify-center gap-3 pt-3 border-t border-[#E8DFD3]">
                      <button onClick={handleAnalyze} disabled={isAnalyzing || !isInputValid} className="bg-[#1A3C34] hover:bg-[#112a24] disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md">
                        {isAnalyzing ? <><RefreshCw size={18} className="animate-spin" /> جاري التحليل...</> : <><span>بدء التحليل</span> <ArrowLeft size={18} /></>}
                      </button>
                      <button onClick={() => setIsExampleOpen(true)} className="border-2 border-[#6B3A3A]/30 text-[#6B3A3A] px-6 py-3 rounded-xl font-bold hover:bg-[#6B3A3A]/5 transition-all">مثال</button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {analysisResult ? (
                    <div ref={resultsRef}>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#6B3A3A]/10 rounded-lg flex items-center justify-center">
                            <FileText size={18} className="text-[#6B3A3A]" />
                          </div>
                          <h3 className="text-lg font-bold text-[#1A3C34]">تقرير التحليل البلاغي</h3>
                        </div>
                        <button onClick={handleCopyReport} className="flex items-center gap-1 text-xs bg-[#1A3C34] text-white px-3 py-1.5 rounded-lg hover:bg-[#112a24] transition-all">
                          <CopyIcon size={12} /> نسخ التقرير
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                        {[
                          { label: "البحر الشعري", value: analysisResult.meter },
                          { label: "القافية والروي", value: analysisResult.rhyme },
                          { label: "الغرض الشعري", value: analysisResult.purpose }
                        ].map((metric, i) => (
                          <div key={i} className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-[#1A3C34] py-2 px-3 text-center">
                              <p className="text-xs font-bold text-[#FDF1D3]">{metric.label}</p>
                            </div>
                            <div className="p-3 text-center">
                              <p className="text-base font-bold text-[#1A120B] font-serif">{metric.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-[#F9F7F3] border border-[#E8DFD3] rounded-xl overflow-hidden mb-5">
                        <div className="bg-white border-b border-[#E8DFD3] py-2 px-4 flex items-center gap-2">
                          <Check size={16} className="text-[#6B3A3A]" />
                          <h4 className="text-sm font-bold text-[#6B3A3A]">الشرح البلاغي والمعنوي</h4>
                        </div>
                        <div className="p-4 text-[#1A120B] text-sm leading-relaxed space-y-3 max-h-[250px] overflow-y-auto">
                          {analysisResult.explanation.split('\n').map((paragraph, idx) => {
                            if (!paragraph.trim()) return null;
                            const isBullet = paragraph.startsWith('-') || paragraph.startsWith('*');
                            return (
                              <p key={idx} className={isBullet ? "flex items-start gap-2" : ""}>
                                {isBullet && <span className="text-[#C1A881]">✦</span>}
                                <span>{isBullet ? paragraph.replace(/^[-*]\s*/, '') : paragraph}</span>
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="flex justify-center gap-3 pt-3 border-t border-[#E8DFD3]">
                        <button onClick={() => {
                          setAnalysisResult(null);
                          setVerses([{ shatr1: '', shatr2: '' }]);
                          setActiveTab('input');
                          addAlert('🔄 تم إعادة تعيين المدخلات', 'info');
                        }} className="bg-[#1A3C34] hover:bg-[#112a24] text-white px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                          <RefreshCw size={14} /> تحليل جديد
                        </button>
                        <button onClick={handleSaveToCollection} className="bg-[#6B3A3A] hover:bg-[#572d2d] text-white px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                          <Save size={14} /> حفظ في مجموعتي
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText size={48} className="mx-auto text-[#A89F94] mb-3" />
                      <p className="text-[#8B7C6E]">لا توجد نتائج بعد</p>
                      <p className="text-xs text-[#A89F94] mt-2">قم بإدخال الأبيات في تبويب "إدخال الأبيات" ثم اضغط "بدء التحليل"</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ==================== Saved Collections Modal (Dialog only, no sidebar) ==================== */}
    
      {/* ==================== Save Modal ==================== */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 bg-[#1A120B]/50 backdrop-blur-sm" onClick={() => setIsSaveModalOpen(false)}>
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="py-4 px-5 bg-[#6B3A3A] text-white">
              <div className="flex items-center gap-2"><Save size={18} /><h3 className="text-lg font-bold">حفظ في مجموعتي</h3></div>
            </div>
            <div className="p-5">
              <p className="text-sm text-[#5C381B] mb-4">أدخل اسماً للمجموعة لحفظ القصيدة مع تحليلها:</p>
              <input type="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} placeholder="مثال: قصيدة المتنبي - الخيل والليل" className="w-full border-2 border-[#E8DFD3] rounded-lg px-4 py-2.5 outline-none focus:border-[#6B3A3A] transition-all duration-200 text-right" autoFocus onKeyPress={(e) => e.key === 'Enter' && confirmSave()} />
            </div>
            <div className="border-t-2 border-[#E8DFD3] p-4 flex justify-between gap-3">
              <button onClick={() => setIsSaveModalOpen(false)} className="flex-1 px-4 py-2 rounded-lg border-2 border-[#D4CCBF] text-[#5C381B] hover:bg-[#F5F2EB]">إلغاء</button>
              <button onClick={confirmSave} className="flex-1 px-4 py-2 rounded-lg bg-[#6B3A3A] text-white hover:bg-[#8B4A4A]">حفظ</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== Alerts Container ==================== */}
      <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 space-y-2 max-w-sm pointer-events-none">
        {alerts.map(alert => (
          <div key={alert.id} className={`px-4 py-3 rounded-lg text-xs font-medium shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-200 pointer-events-auto ${
            alert.type === 'success' ? 'bg-green-500 text-white' :
            alert.type === 'warning' ? 'bg-amber-500 text-white' :
            alert.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            <span>{alert.type === 'success' && <Check size={14} />}{alert.type === 'warning' && <AlertCircle size={14} />}{alert.type === 'error' && <X size={14} />}{alert.type === 'info' && <BarChart3 size={14} />}</span>
            <span>{alert.message}</span>
          </div>
        ))}
      </div>
ء
      {/* ==================== Tutorial Modal (مثل ما كان فوق) ==================== */}
      {isExampleOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:py-20 bg-[#1A120B]/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto" 
          dir="rtl"
          onClick={() => {
            setIsExampleOpen(false);
            setTutorialStep(0);
            setTutorialResult(null);
          }}
        >
          <div 
            className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-[#E8DFD3]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shrink-0 relative flex justify-between items-center p-4 md:p-6 border-b-2 border-[#E8DFD3] bg-[#1A3C34]/95">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-bold text-white">شرح تفاعلي</h2>
                  <p className="text-xs md:text-sm text-white/80">خطوات استخدام المحلل</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsExampleOpen(false);
                  setTutorialStep(0);
                  setTutorialResult(null);
                }}
                className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="h-1 bg-[#E8DFD3]">
              <div 
                className="h-full bg-[#1A3C34]/95 transition-all duration-300"
                style={{ width: `${((tutorialStep + 1) / 3) * 100}%` }}
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              {tutorialStep === 0 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-[#1A3C34]/95 text-white rounded-full flex items-center justify-center font-bold text-sm">١</div>
                      <h3 className="text-lg md:text-xl font-bold text-[#5C381B]">أدخل البيت الشعري</h3>
                    </div>
                    <p className="text-sm md:text-base text-[#8B7C6E] mb-6">سنستخدم بيتاً أندلسياً جميلاً كمثال:</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#FDFCF8] to-[#F9F7F3] border-2 border-[#1A3C34] rounded-lg p-5 md:p-6 space-y-4">
                    <div className="text-center">
                      <p className="text-sm md:text-base text-[#8B7C6E] font-sans mb-3">الشطر الأول:</p>
                      <p className="text-lg md:text-2xl font-serif text-[#5C381B] font-bold leading-relaxed">{tutorialExample.shatr1}</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-12 h-px bg-[#D4CCBF]"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm md:text-base text-[#8B7C6E] font-sans mb-3">الشطر الثاني:</p>
                      <p className="text-lg md:text-2xl font-serif text-[#5C381B] font-bold leading-relaxed">{tutorialExample.shatr2}</p>
                    </div>
                  </div>
                </div>
              )}

              {tutorialStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-[#1A3C34]/95 text-white rounded-full flex items-center justify-center font-bold text-sm">٢</div>
                      <h3 className="text-lg md:text-xl font-bold text-[#5C381B]">اضغط على زر التحليل</h3>
                    </div>
                    <p className="text-sm md:text-base text-[#8B7C6E] mb-6">بعد إدخال البيت، اضغط على زر "بدء التحليل" لتحليل النص:</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#FDFCF8] to-[#F9F7F3] border-2 border-[#1A3C34] rounded-lg p-6 md:p-8 flex justify-center">
                    <button className="bg-[#1A3C34]/95 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 group">
                      <RefreshCw size={18} className="animate-spin" />
                      <span>جاري التحليل...</span>
                    </button>
                  </div>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                    <p className="text-xs md:text-sm text-amber-800 font-sans">
                      <span className="font-bold">⏳ انتظر قليلاً:</span> يقوم النظام بتحليل البيت واستخراج المعلومات المطلوبة.
                    </p>
                  </div>
                </div>
              )}

              {tutorialStep === 2 && tutorialResult && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-[#1A3C34]/95 text-white rounded-full flex items-center justify-center font-bold text-sm">٣</div>
                      <h3 className="text-lg md:text-xl font-bold text-[#5C381B]">عرض النتائج</h3>
                    </div>
                    <p className="text-sm md:text-base text-[#8B7C6E] mb-6">هنا ستظهر نتائج التحليل:</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                    <div className="bg-gradient-to-br from-[#FDFCF8] to-[#F9F7F3] border-2 border-[#1A3C34] rounded-lg p-4 md:p-5 text-center">
                      <p className="text-xs font-sans font-bold text-[#8B7C6E] uppercase mb-2">البحر الشعري</p>
                      <p className="text-base md:text-lg font-bold text-[#5C381B]">{tutorialResult.meter}</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#FDFCF8] to-[#F9F7F3] border-2 border-[#1A3C34] rounded-lg p-4 md:p-5 text-center">
                      <p className="text-xs font-sans font-bold text-[#8B7C6E] uppercase mb-2">القافية والروي</p>
                      <p className="text-base md:text-lg font-bold text-[#5C381B]">{tutorialResult.rhyme}</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#FDFCF8] to-[#F9F7F3] border-2 border-[#1A3C34] rounded-lg p-4 md:p-5 text-center">
                      <p className="text-xs font-sans font-bold text-[#8B7C6E] uppercase mb-2">الغرض الشعري</p>
                      <p className="text-base md:text-lg font-bold text-[#5C381B]">{tutorialResult.purpose}</p>
                    </div>
                  </div>

                  <div className="bg-[#F9F7F3] border-2 border-[#E8DFD3] rounded-lg p-4 md:p-6">
                    <h4 className="text-sm md:text-base font-bold text-[#1A3C34] mb-3 flex items-center gap-2">
                      <Check size={16} className="bg-[#1A3C34]/95 text-white rounded-full p-0.5" />
                      الشرح البلاغي والمعنوي
                    </h4>
                    <p className="text-sm md:text-base text-[#1A120B] leading-relaxed font-serif text-justify">
                      {tutorialResult.explanation}
                    </p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <p className="text-xs md:text-sm text-green-800 font-sans">
                      <span className="font-bold">✓ تم بنجاح:</span> الآن تفهم كيفية استخدام المحلل! جرّب بإدخال أبيات شعرية أخرى.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 border-t-2 border-[#E8DFD3] bg-gradient-to-r from-[#FDFCF8] to-white p-4 md:p-6 flex justify-between gap-3">
              <button 
                onClick={handleTutorialBack}
                disabled={tutorialStep === 0}
                className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-sans font-semibold text-sm md:text-base border-2 border-[#D4CCBF] text-[#5C381B] hover:bg-[#F5F2EB] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← السابق
              </button>
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((step) => (
                  <button
                    key={step}
                    onClick={() => setTutorialStep(step)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      step === tutorialStep ? 'bg-[#1A3C34]/95 w-6' : 'bg-[#D4CCBF]'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={handleTutorialNext}
                className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-sans font-semibold text-sm md:text-base bg-[#1A3C34]/95 text-white hover:shadow-lg transition-all duration-200"
              >
                {tutorialStep === 2 ? 'إغلاق' : 'التالي'} →
              </button>
            </div>
          </div>

        </div>
        
      )}

    </div>
  );
}