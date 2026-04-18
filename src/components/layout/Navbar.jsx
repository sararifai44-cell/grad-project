import { useState, useEffect } from "react";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; 

const navLinks = [
  { name: 'الرئيسية', id: 'hero' }, 
  { name: 'معالم التراث', id: 'platform-features' }, 
  { name: 'قصائد', id: 'poetry-section' },
  { name: 'عن المشروع', id: 'why-andalusia' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate(); 
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (!isScrolled) setIsScrolled(true);
      } else {
        if (isScrolled) setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/home') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate('/home'); 
    }
  };

  // ✅ التعديل هنا: وضعنا المسار الصحيح تماماً كما يظهر في المتصفح
  const transparentPages = ['/home', '/poetry-analysis','/history-classification']; 
  const isTransparentPage = transparentPages.includes(location.pathname);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-none ${
        // سيصبح شفافاً في البداية لهذه الصفحات، ويتحول للأخضر عند السكرول
        isScrolled || !isTransparentPage ? "py-3 bg-[#1A3C34] shadow-2xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="flex flex-shrink-0 items-center">
           <span 
             onClick={() => navigate('/home')} 
             className="font-serif font-bold text-lg lg:text-xl tracking-wide text-[#FDF1D3] drop-shadow-md cursor-pointer"
           >
             حين تفتح الأندلس
           </span>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center gap-10 font-bold text-sm tracking-widest text-[#FDF1D3]">
          {navLinks.map((item, index) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)}
              className={`hover:scale-110 transition-transform ${index === 0 && !isScrolled && location.pathname === '/home' ? "border-b-2 border-[#FDF1D3]" : "opacity-80 hover:opacity-100"}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="hidden md:flex flex-shrink-0 justify-end items-center gap-6">
          {location.pathname !== '/login' && (
            <button 
              onClick={() => navigate('/login')} 
              className="relative text-[13px] font-bold text-white/80 hover:text-white transition-colors group"
            >
              سجل دخول
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#FDF1D3] transition-all duration-300 group-hover:w-full"></span>
            </button>
          )}

          {location.pathname !== '/register' && (
            <button 
              onClick={() => navigate('/register')} 
              className="px-5 py-2 text-[12px] font-bold bg-transparent border border-[#FDF1D3]/50 text-[#FDF1D3] rounded-full hover:bg-[#FDF1D3] hover:text-[#1A3C34] transition-all"
            >
              إنشاء حساب
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#FDF1D3] hover:text-white transition-colors">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-[#1A3C34] py-6 px-6 md:hidden shadow-xl border-t border-[#FDF1D3]/10"
          >
            <div className="flex flex-col gap-6 items-center font-bold text-lg text-[#FDF1D3]">
              {navLinks.map((item) => (
                <button key={item.id} onClick={() => handleNavClick(item.id)} className="opacity-90 hover:opacity-100">
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col gap-4 w-full mt-4 pt-4 border-t border-[#FDF1D3]/10">
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} 
                  className="text-[15px] font-bold text-white/80 hover:text-white transition-colors group"
                >
                  سجل دخول
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); navigate('/register'); }} 
                  className="px-5 py-2.5 text-[14px] font-bold bg-transparent border border-[#FDF1D3]/50 text-[#FDF1D3] rounded-full hover:bg-[#FDF1D3] hover:text-[#1A3C34] transition-all w-full"
                >
                  إنشاء حساب
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;