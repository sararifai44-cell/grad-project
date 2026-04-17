import React from 'react';
import HistoryHero from '@/components/history/HistoryHero';
// افترض أن الصورة موجودة في مجلد assets

const HistoryClassificationPage = () => {
  return (
    <div className="history-classification-page">
      <HistoryHero  />
    </div>
  );
};

export default HistoryClassificationPage;