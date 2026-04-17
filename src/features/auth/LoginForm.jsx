// eslint-disable-next-line
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 1. استيراد أداة التوجيه

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate(); // 2. تفعيل أداة التوجيه

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onLogin(); 
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className="w-full max-w-sm p-8 bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden z-10 border border-andalus-gold/20"
      dir="rtl"
    >
      
      {/* الترويسة */}
      <motion.div variants={itemVariants} className="text-center space-y-3.5 mb-10 pt-2">
        <h1 className="font-andalus-kufi text-2xl text-andalus-clay font-bold pt-1.5 leading-tight drop-shadow-sm">
          بوابة الأندلس
        </h1>
      </motion.div>

      {/* نموذج إدخال البيانات */}
      <form onSubmit={handleSubmit} className="space-y-5 font-sans text-emerald-950">
        
        {/* البريد الإلكتروني */}
        <motion.div variants={itemVariants} className="group">
          <label className="block text-xs text-emerald-950/70 mb-1.5 font-bold">البريد الإلكتروني</label>
          <div className="relative">
            <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-950/40 w-4.5 h-4.5 group-focus-within:text-andalus-clay transition-colors pointer-events-none" />
            <input 
              type="email" 
              required
              placeholder="أدخل بريدك الإلكتروني" 
              className="w-full bg-sand-200/50 border border-emerald-950/10 rounded-xl py-3 pr-11 pl-3 text-sm text-emerald-950 placeholder-emerald-950/30 focus:bg-sand-100 focus:border-andalus-clay outline-none transition-all shadow-inner" 
            />
          </div>
        </motion.div>

        {/* كلمة المرور */}
        <motion.div variants={itemVariants} className="group">
          <label className="block text-xs text-emerald-950/70 mb-1.5 font-bold">كلمة المرور</label>
          <div className="relative">
            <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-950/40 w-4.5 h-4.5 group-focus-within:text-andalus-clay transition-colors pointer-events-none" />
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full bg-sand-200/50 border border-emerald-950/10 rounded-xl py-3 pr-11 pl-3 text-sm text-emerald-950 Placeholder-emerald-950/30 focus:bg-sand-100 focus:border-andalus-clay outline-none transition-all shadow-inner" 
            />
          </div>
        </motion.div>

        {/* خيار تذكرني ونسيت كلمة المرور */}
        <motion.div variants={itemVariants} className="flex items-center justify-between text-xs pt-1.5">
            <div className="flex items-center gap-1.5">
                <input type="checkbox" className="w-3.5 h-3.5 border-emerald-950/20 rounded focus:ring-andalus-clay text-andalus-clay cursor-pointer" />
                <label className="text-emerald-950/60 font-medium">تذكرني</label>
            </div>
            <a href="#" className="text-xs text-andalus-clay font-bold hover:text-[#6b340f] transition-colors">نسيت كلمة المرور؟</a>
        </motion.div>

        {/* زر فتح البوابة */}
        <motion.button
          type="submit"
          variants={itemVariants}
          whileHover={{ scale: 1.02, boxShadow: "0px 8px 25px rgba(139, 69, 19, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-andalus-clay hover:bg-[#6b340f] text-sand-100 font-andalus-kufi text-lg py-3 rounded-xl mt-5 flex justify-center items-center gap-2.5 transition-colors shadow-xl group"
        >
          <LogIn size={20} className="group-hover:-translate-x-1 transition-transform" />
تسجيل الدخول        </motion.button>
        
        {/* رابط التسجيل (تم التعديل هنا) */}
        <motion.div variants={itemVariants} className="text-center text-xs text-emerald-950/60 pt-5 font-sans relative z-10">
          ليس لديك حساب؟{" "}
          <button 
            type="button" 
            onClick={() => navigate("/register")} 
            className="text-andalus-clay font-bold hover:text-[#6b340f] transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            سجل الآن كباحث تراث
          </button>
        </motion.div>

      </form>
    </motion.div>
  );
};

export default LoginForm;