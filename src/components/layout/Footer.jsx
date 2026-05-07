import React from 'react';
import { Link } from 'react-router-dom';

const LightSlimFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    // خلفية فاتحة مع خط علوي ذهبي
    <footer className="bg-[#FDF8F0] text-[#1B3022] pt-10 pb-6 border-t-2 border-[#C1A881]/50 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]" dir="rtl">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* العمود الأول: عن المنصة */}
          <div className="space-y-3">
            <h3 className="font-amiri text-2xl font-bold text-[#1B3022]">
              حين تفتح الأندلس
            </h3>
            <p className="font-tajawal text-xs md:text-sm text-[#1B3022]/70 leading-relaxed max-w-xs">
              منصة رقمية تستعرض الإرث الحضاري والثقافي للأندلس بأسلوب عصري يجمع بين الأصالة والتقنية.
            </p>
          </div>

          {/* العمود الثاني: الروابط */}
          <div>
            <h4 className="font-['Cairo'] text-sm font-bold text-[#C1A881] mb-4 uppercase tracking-wider">
              وصول سريع
            </h4>
            <ul className="grid grid-cols-2 gap-2 font-tajawal text-sm">
              <li>
                <Link to="/" className="text-[#1B3022]/80 hover:text-[#C1A881] transition-colors flex items-center gap-1 font-medium">
                  <span className="text-[#C1A881] text-[10px]">✦</span> الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-[#1B3022]/80 hover:text-[#C1A881] transition-colors flex items-center gap-1 font-medium">
                  <span className="text-[#C1A881] text-[10px]">✦</span> التاريخ
                </Link>
              </li>
              <li>
                <Link to="/landmarks" className="text-[#1B3022]/80 hover:text-[#C1A881] transition-colors flex items-center gap-1 font-medium">
                  <span className="text-[#C1A881] text-[10px]">✦</span> المعالم
                </Link>
              </li>
              <li>
                <Link to="/poetry" className="text-[#1B3022]/80 hover:text-[#C1A881] transition-colors flex items-center gap-1 font-medium">
                  <span className="text-[#C1A881] text-[10px]">✦</span> الشعر
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: التواصل */}
          <div className="flex flex-col md:items-end">
            <h4 className="font-['Cairo'] text-sm font-bold text-[#C1A881] mb-4 uppercase tracking-wider">
              تابعنا
            </h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full border border-[#C1A881]/50 flex items-center justify-center hover:bg-[#C1A881] hover:text-white transition-all duration-300 text-[#1B3022]">
                <span className="text-xs font-bold">X</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#C1A881]/50 flex items-center justify-center hover:bg-[#C1A881] hover:text-white transition-all duration-300 text-[#1B3022]">
                <span className="text-xs font-bold">In</span>
              </a>
              <a href="mailto:info@andalusia.com" className="w-8 h-8 rounded-full border border-[#C1A881]/50 flex items-center justify-center hover:bg-[#C1A881] hover:text-white transition-all duration-300 text-[#1B3022]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

     
      </div>
    </footer>
  );
};

export default LightSlimFooter;