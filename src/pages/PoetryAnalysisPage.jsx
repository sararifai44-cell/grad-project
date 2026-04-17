import React, { useState } from 'react';
import AnalysisHero from '../components/poetry/AnalysisHero';
import AnalysisSection from '../components/poetry/AnalysisSection';

// استيراد صورة الهيرو من مجلد الـ assets
import heroBackgroundImage from '../assets/ي.png';

const PoetryAnalysisPage = () => {
  const [inputText, setInputText] = useState(''); 
  const [verses, setVerses] = useState([
    { shatr1: '', shatr2: '' },
    { shatr1: '', shatr2: '' }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // الدوال المنطقية
  const addNewVerse = () => setVerses([...verses, { shatr1: '', shatr2: '' }]);

  const handleInputChange = (index, field, value) => {
    const updatedVerses = [...verses];
    updatedVerses[index][field] = value;
    setVerses(updatedVerses);
  };

  const removeVerse = (index) => {
    if (verses.length > 1) setVerses(verses.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    const hasText = inputText.trim() || verses.some(v => v.shatr1.trim() !== '' || v.shatr2.trim() !== '');
    if (!hasText) return; 

    setIsAnalyzing(true);
    document.getElementById('analysis-section')?.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden text-[#F9F7F1] bg-[#1a1a1a]" 
      style={{ fontFamily: '"Cairo", sans-serif' }}
      dir="rtl"
    >
      {/* 1. قسم الهيرو */}
      <AnalysisHero 
        inputText={inputText}
        setInputText={setInputText}
        handleAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
        heroBackgroundImage={heroBackgroundImage}
      />

      {/* 2. قسم التحليل */}
      <AnalysisSection 
        verses={verses}
        handleInputChange={handleInputChange}
        removeVerse={removeVerse}
        addNewVerse={addNewVerse}
        handleAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
      />
    </div>
  );
};

export default PoetryAnalysisPage;