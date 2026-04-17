import React from 'react';

const PrimaryButton = ({ 
  children, 
  onClick, 
  className = "", 
  showIcon = true, 
  icon,
  type = "button",
  ...props
}) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center gap-3 px-8 py-3.5 bg-[#1B3B32] text-[#F4EFE6] rounded-full text-lg hover:bg-[#152e27] border border-[#1B3B32] hover:border-[#F4EFE6]/30 transition-all duration-300 shadow-lg shadow-[#1B3B32]/20 ${className}`}
      {...props}
    >
      {/* عرض الأيقونة المخصصة إذا تم تمريرها، وإلا عرض السهم المتجه لليسار كافتراضي (ليتناسب مع RTL) */}
      {showIcon && (
        icon || (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        )
      )}
      
      {/* النص الذي سيتم تمريره للزر */}
      <span className="font-sans">{children}</span>
    </button>
  );
};

export default PrimaryButton;