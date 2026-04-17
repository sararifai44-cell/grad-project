import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onRegister }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // انتقال فوري ومباشر
    onRegister(); 
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
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="w-full max-w-sm p-8 bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden z-10 border border-andalus-gold/20"
      dir="rtl"
    >
      {/* الترويسة - بخط العناوين الفخم font-andalus-title */}
      <motion.div variants={itemVariants} className="text-center space-y-2 mb-8 pt-2">
        <h1 className="font-andalus-title text-3xl text-andalus-clay font-bold leading-tight drop-shadow-sm">
          إنشاء حساب جديد
        </h1>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-emerald-950">
        
        {/* الاسم الكامل */}
        <motion.div variants={itemVariants} className="group">
          <div className="relative">
            <User className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-950/40 w-4 h-4 group-focus-within:text-andalus-clay transition-colors pointer-events-none" />
            <input type="text" required placeholder="الاسم الكامل" className="w-full bg-sand-200/50 border border-emerald-950/10 rounded-xl py-3 pr-10 pl-3 text-sm text-emerald-950 placeholder-emerald-950/40 focus:bg-sand-100 focus:border-andalus-clay outline-none transition-all shadow-inner" />
          </div>
        </motion.div>

        {/* البريد الإلكتروني */}
        <motion.div variants={itemVariants} className="group">
          <div className="relative">
            <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-950/40 w-4 h-4 group-focus-within:text-andalus-clay transition-colors pointer-events-none" />
            <input type="email" required placeholder="البريد الإلكتروني" className="w-full bg-sand-200/50 border border-emerald-950/10 rounded-xl py-3 pr-10 pl-3 text-sm text-emerald-950 placeholder-emerald-950/40 focus:bg-sand-100 focus:border-andalus-clay outline-none transition-all shadow-inner" />
          </div>
        </motion.div>

        {/* كلمة المرور */}
        <motion.div variants={itemVariants} className="group">
          <div className="relative">
            <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-950/40 w-4 h-4 group-focus-within:text-andalus-clay transition-colors pointer-events-none" />
            <input type="password" required placeholder="كلمة المرور" className="w-full bg-sand-200/50 border border-emerald-950/10 rounded-xl py-3 pr-10 pl-3 text-sm text-emerald-950 placeholder-emerald-950/40 focus:bg-sand-100 focus:border-andalus-clay outline-none transition-all shadow-inner" />
          </div>
        </motion.div>

        {/* زر التسجيل - أصبح الآن بنفس الخط font-andalus-title */}
        <motion.button 
          type="submit" 
          variants={itemVariants} 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          className="w-full bg-andalus-clay hover:bg-[#6b340f] text-sand-100 font-andalus-title text-2xl py-3 rounded-xl mt-6 flex justify-center items-center gap-2.5 transition-colors shadow-xl"
        >
          <UserPlus size={22} />
          إنشاء حساب
        </motion.button>
        
        {/* رابط العودة لتسجيل الدخول */}
        <motion.div variants={itemVariants} className="text-center text-xs text-emerald-950/60 pt-4 font-sans relative z-10">
          لديك حساب بالفعل؟ <button type="button" onClick={() => navigate("/login")} className="text-andalus-clay font-bold hover:text-[#6b340f] transition-colors bg-transparent border-none cursor-pointer">تسجيل الدخول</button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;