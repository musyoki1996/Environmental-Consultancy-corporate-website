import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg border border-slate-200 transition-all duration-200 hover:scale-110 flex items-center justify-center cursor-pointer"
      aria-label="Scroll back to top"
    >
      <ArrowUp className="w-5 h-5 text-[#174B35]" />
    </button>
  );
};
