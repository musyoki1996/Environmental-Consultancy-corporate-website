import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('seel_cookie_consent');
    if (!accepted) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('seel_cookie_consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#252B29]/95 text-slate-200 border-t border-slate-700 py-3.5 px-4 sm:px-8 text-xs backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#36A853] shrink-0" />
          <p className="leading-relaxed">
            We use essential cookies and technical analytics to optimize your experience on the SEEL corporate portal in accordance with the Kenya Data Protection Act and international standards.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAccept}
            className="bg-[#36A853] hover:bg-[#2d8f46] text-white px-4 py-1.5 rounded-md font-semibold text-xs transition-colors cursor-pointer"
          >
            Accept All
          </button>
          <button
            onClick={() => setShow(false)}
            className="text-slate-400 hover:text-white px-3 py-1.5 text-xs transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
