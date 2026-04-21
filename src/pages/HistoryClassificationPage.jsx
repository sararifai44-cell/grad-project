import React from 'react';
import HistoryHero from '@/components/history/HistoryHero';
import AndalusianTimeline from '@/components/history/AndalusianTimeline'; // استيراد التايم لاين
import EventAnalysis from '@/components/history/EventAnalysis';

const HistoryClassificationPage = () => {
  return (
    <div className="history-classification-page bg-[#fdfaf5] min-h-screen">
      {/* 1. قسم الهيرو (العنوان الرئيسي) */}
      <HistoryHero />

      {/* 2. قسم التايم لاين (شرح الحقب التاريخية) */}
      <AndalusianTimeline />

      {/* 3. قسم محلل الأحداث (البحث عن الأسباب والنتائج) */}
      <EventAnalysis />
    </div>
  );
};

export default HistoryClassificationPage;