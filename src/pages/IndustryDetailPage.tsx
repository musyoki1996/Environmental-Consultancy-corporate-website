import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  HardHat,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  PhoneCall,
  Factory
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface IndustryDetailPageProps {
  slug: string;
  navigate: (route: string, param?: string) => void;
}

export const IndustryDetailPage: React.FC<IndustryDetailPageProps> = ({ slug, navigate }) => {
  const { industries, services } = useApp();
  const industry = industries.find(i => i.slug === slug || i.id === slug) || industries[0];

  const matchedServices = services.filter(s =>
    industry.relevantServices.includes(s.slug) ||
    s.industriesServed.some(ind => ind.toLowerCase().includes(industry.name.toLowerCase().split(' ')[0]))
  );

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={industry.image}
            alt={industry.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full space-y-4">
          <div className="text-xs font-bold text-[#36A853] uppercase tracking-wider">
            Sector Solutions & Regulatory Advisory
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
            {industry.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            Delivering statutory environmental assessments, emissions surveillance, acoustic isolation, and industrial engineering tailored specifically to {industry.name.toLowerCase()}.
          </p>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => navigate('quote', industry.name)}
              className="bg-[#E85B22] hover:bg-[#d64e17] text-white px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm shadow-lg transition-colors cursor-pointer"
            >
              Request Sector Consultation
            </button>
            <button
              onClick={() => navigate('contact')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-lg font-semibold text-xs sm:text-sm"
            >
              Contact Specialist
            </button>
          </div>
        </div>
      </section>

      {/* Main Breakdown */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              {/* Challenges */}
              <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <h3>Sector Environmental & Operational Challenges</h3>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-normal">
                  {industry.challenges}
                </p>
              </div>

              {/* Compliance & Engineering Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-[#174B35] font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#36A853]" />
                    <h4>Statutory Compliance Requirements</h4>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {industry.complianceReqs}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-[#174B35] font-bold text-sm">
                    <HardHat className="w-4 h-4 text-[#E85B22]" />
                    <h4>Engineering & Technical Requirements</h4>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {industry.engineeringReqs}
                  </p>
                </div>
              </div>

              {/* SEEL Technical Solutions */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#174B35]">
                  Our Proven Technical Solutions for {industry.name}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {industry.solutions.map((sol, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#174B35] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {sol}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matched Services */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-lg font-bold text-[#174B35]">
                  Recommended SEEL Services for This Sector
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchedServices.slice(0, 4).map(srv => (
                    <div
                      key={srv.id}
                      onClick={() => navigate('service-detail', srv.slug)}
                      className="p-4 rounded-xl border border-slate-200 bg-[#F8FAF8] hover:border-[#36A853] transition-colors cursor-pointer space-y-2 group"
                    >
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#E85B22] transition-colors">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {srv.shortDescription}
                      </p>
                      <span className="text-xs font-semibold text-[#174B35] inline-flex items-center gap-1">
                        View Service Scope →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-[#174B35] text-white shadow-xl space-y-4">
                <h4 className="font-bold text-base leading-snug">
                  Sector Technical Consultation
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Engage our certified environmental experts and engineers to schedule an on-site audit or statutory emissions testing campaign.
                </p>
                <button
                  onClick={() => navigate('quote', industry.name)}
                  className="w-full bg-[#E85B22] hover:bg-[#d64e17] text-white py-2.5 rounded-lg font-bold text-xs shadow transition-colors cursor-pointer"
                >
                  Request a Formal Proposal
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-[#174B35]">Other Industries</h4>
                <div className="space-y-2 text-xs">
                  {industries.filter(i => i.id !== industry.id).slice(0, 6).map(other => (
                    <button
                      key={other.id}
                      onClick={() => navigate('industry-detail', other.slug)}
                      className="w-full text-left p-2 rounded hover:bg-white text-slate-700 hover:text-[#E85B22] transition-colors truncate block"
                    >
                      · {other.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
