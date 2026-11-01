import React, { useState } from 'react';
import { Shield, ChevronLeft, Lock, FileText, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LegalPagesProps {
  initialTab?: string;
  navigate: (route: string, param?: string) => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ initialTab = 'privacy', navigate }) => {
  const { settings } = useApp();
  const [tab, setTab] = useState<'privacy' | 'terms' | 'cookies'>(
    initialTab === 'terms' ? 'terms' : initialTab === 'cookies' ? 'cookies' : 'privacy'
  );

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Breadcrumb Header */}
      <div className="bg-[#174B35] text-white py-4 px-4 sm:px-8 border-b border-[#235840]">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
          <span className="text-emerald-300 font-semibold">Corporate Legal Policies</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 w-full space-y-8">
        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1 bg-white rounded-xl border border-slate-200">
          <button
            onClick={() => setTab('privacy')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tab === 'privacy'
                ? 'bg-[#174B35] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tab === 'terms'
                ? 'bg-[#174B35] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setTab('cookies')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tab === 'cookies'
                ? 'bg-[#174B35] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cookie Policy
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6">
          {tab === 'privacy' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-[#174B35]">Privacy Policy</h1>
              <p className="text-slate-500 text-xs">
                Last updated: October 2026 · Senior Environmental & Engineering Ltd
              </p>
              <p>
                Senior Environmental & Engineering Ltd ("SEEL", "we", "our") is committed to safeguarding the privacy and confidentiality of personal data entrusted to us by clients, regulatory partners, and website visitors in accordance with the <strong>Kenya Data Protection Act, 2019</strong> and international data privacy benchmarks.
              </p>
              <h3 className="text-base font-bold text-slate-900">1. Information We Collect</h3>
              <p>
                When you request a quotation, submit a technical inquiry, or engage our engineering consultancy services, we may collect:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full name, corporate email address, telephone contact, and organization title.</li>
                <li>Project site coordinates, facility specifications, and industrial equipment descriptions.</li>
                <li>Technical drawings, terms of reference, and statutory improvement notices submitted for assessment.</li>
              </ul>
              <h3 className="text-base font-bold text-slate-900">2. Lawful Basis & Use of Data</h3>
              <p>
                Information collected is utilized exclusively for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Formulating engineering proposals, bills of quantities, and quotations.</li>
                <li>Conducting statutory field assessments, NEMA impact studies, and DOSHS compliance audits.</li>
                <li>Communicating critical findings, compliance schedules, and testing results.</li>
              </ul>
              <h3 className="text-base font-bold text-slate-900">3. Data Security & Confidentiality</h3>
              <p>
                SEEL enforces bank-grade encryption protocols and strict physical access controls. We do not sell, rent, or trade your corporate information to third-party commercial marketing entities.
              </p>
              <h3 className="text-base font-bold text-slate-900">4. Contacting the Data Protection Desk</h3>
              <p>
                For data access requests or privacy inquiries, contact our legal desk at <a href={`mailto:${settings.email}`} className="text-[#174B35] font-bold">{settings.email}</a>.
              </p>
            </div>
          )}

          {tab === 'terms' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-[#174B35]">Terms & Conditions of Service</h1>
              <p className="text-slate-500 text-xs">
                Last updated: October 2026 · Senior Environmental & Engineering Ltd
              </p>
              <p>
                By accessing this corporate website or contracting Senior Environmental & Engineering Ltd for environmental consultancy, stack emissions testing, acoustic monitoring, or civil engineering, you agree to these statutory terms.
              </p>
              <h3 className="text-base font-bold text-slate-900">1. Professional Standards & Regulatory Independence</h3>
              <p>
                SEEL operates as an independent Firm of Experts registered under NEMA Kenya and licensed by the Engineers Board of Kenya (EBK). All findings, stack sampling measurements, and geotechnical data are prepared with scientific objectivity in adherence to applicable statutory laws.
              </p>
              <h3 className="text-base font-bold text-slate-900">2. Client Obligations & Site Access</h3>
              <p>
                Clients engaging SEEL for on-site monitoring must ensure safe sampling access (including compliant stack sampling ports and safety railings meeting OSHA standards), provide unhindered entry for field technicians, and supply accurate operating parameters.
              </p>
              <h3 className="text-base font-bold text-slate-900">3. Intellectual Property</h3>
              <p>
                All proprietary methodologies, software modeling configurations, and website corporate brand assets remain the exclusive intellectual property of Senior Environmental & Engineering Ltd.
              </p>
            </div>
          )}

          {tab === 'cookies' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-[#174B35]">Cookie Policy</h1>
              <p className="text-slate-500 text-xs">
                Last updated: October 2026 · Senior Environmental & Engineering Ltd
              </p>
              <p>
                Our website utilizes necessary and performance cookies to ensure stable navigation, maintain authenticated administrative sessions, and analyze traffic volumes to enhance technical content delivery.
              </p>
              <h3 className="text-base font-bold text-slate-900">Essential Technical Cookies</h3>
              <p>
                These cookies enable core portal functions, including user preference storage and security against unauthorized request forgery.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
