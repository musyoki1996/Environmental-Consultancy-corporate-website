import React, { useState } from 'react';
import { MessageSquare, X, Send, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhatsAppButton: React.FC = () => {
  const { settings, services } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('General Environmental & Engineering Consultation');
  const [userNote, setUserNote] = useState('');

  const officialNumber = settings.whatsapp || '+254726856602';
  const cleanNumber = officialNumber.replace(/[^0-9]/g, '');

  const handleStartChat = (customMessage?: string) => {
    let msg = customMessage;
    if (!msg) {
      msg = `Hello SEEL, I would like to enquire about ${selectedService}. ${userNote ? `Details: ${userNote}. ` : ''}Kindly assist me.`;
    }
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-white"
          aria-label="Chat with SEEL on WhatsApp"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 fill-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-200 rounded-full" />
          </div>
          <span className="hidden sm:inline font-semibold text-xs tracking-wide">
            Chat on WhatsApp
          </span>
        </button>
      </div>

      {/* WhatsApp Interactive Modal Box */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#174B35] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/images__13__ac2b8989.jpeg"
                alt="SEEL"
                className="w-9 h-9 rounded-full bg-white p-0.5 object-contain"
              />
              <div>
                <h4 className="font-bold text-sm leading-tight">SEEL Support Desk</h4>
                <p className="text-[11px] text-emerald-300">Typically replies within 15 mins</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#F8FAF8] text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-slate-700 leading-relaxed">
              Hello! Welcome to <strong>Senior Environmental & Engineering Ltd</strong>. How can our technical specialists assist your project today?
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-700 block">
                Select Service Area:
              </label>
              <select
                value={selectedService}
                onChange={e => setSelectedService(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-[#36A853]"
              >
                <option value="General Consultation">General Consultation</option>
                {services.map(s => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-700 block">
                Optional Project Location or Brief:
              </label>
              <input
                type="text"
                value={userNote}
                onChange={e => setUserNote(e.target.value)}
                placeholder="e.g. Mombasa Road, stack emission testing"
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-[#36A853]"
              />
            </div>

            <button
              onClick={() => handleStartChat()}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors text-xs"
            >
              <Send className="w-4 h-4" />
              <span>Start WhatsApp Conversation</span>
            </button>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>Direct Call:</span>
              <a
                href={`tel:${officialNumber.replace(/\s+/g, '')}`}
                className="text-[#174B35] font-semibold hover:underline flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3 text-[#E85B22]" />
                <span>{officialNumber}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
