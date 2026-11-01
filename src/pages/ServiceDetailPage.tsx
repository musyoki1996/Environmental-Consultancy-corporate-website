import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Award,
  Layers,
  Phone,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  Building2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ServiceDetailPageProps {
  slug: string;
  navigate: (route: string, param?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, navigate }) => {
  const { services, projects, settings } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const service = services.find(s => s.slug === slug || s.id === slug) || services[0];
  const relatedServices = services.filter(s => s.id !== service.id && s.category === service.category).slice(0, 3);
  const relevantProjects = projects.filter(p =>
    p.category.toLowerCase().includes(service.category.toLowerCase()) ||
    p.description.toLowerCase().includes(service.title.toLowerCase())
  ).slice(0, 2);

  // Service specific FAQs
  const defaultFaqs = [
    {
      q: `What statutory requirements govern ${service.title} in Kenya?`,
      a: `In Kenya, this service is primarily governed by EMCA (Cap 387), NEMA statutory guidelines, the Occupational Safety and Health Act (OSHA 2007), and relevant Kenya Bureau of Standards (KEBS) specifications. SEEL ensures every study or measurement complies with national and international lender benchmarks.`
    },
    {
      q: 'How long does a typical compliance assessment or sampling campaign take?',
      a: 'Field monitoring and sampling typically takes 1 to 5 working days depending on the facility size, number of emission stacks, or drilling boreholes. Comprehensive analytical reports and laboratory testing are delivered within 7 to 14 business days.'
    },
    {
      q: 'Are SEEL reports accepted by NEMA and DOSHS inspectors without reservation?',
      a: 'Yes. Senior Environmental & Engineering Ltd is a registered Firm of Experts with NEMA (Reg No. 2145) and an approved OSH advisor with DOSHS. Our reports are signed by licensed Lead Experts and professional consulting engineers.'
    },
    {
      q: 'Can SEEL assist in designing corrective mitigation systems if emissions or noise exceed statutory limits?',
      a: 'Absolutely. Unlike purely analytical labs, SEEL is an engineering consultancy. We design pulse-jet baghouses, acoustic noise barriers, industrial scrubbers, and foundation stabilization retrofits to bring non-compliant facilities into full compliance.'
    }
  ];

  const handleWhatsApp = () => {
    const phone = (settings.whatsapp || '+254726856602').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hello SEEL, I would like to enquire about your "${service.title}" services. Please share technical scope and pricing.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* 1. Full-width Photographic Hero Banner */}
      <section className="relative min-h-[420px] lg:min-h-[480px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
          <div className="absolute inset-0 bg-[#174B35]/30 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-300 backdrop-blur-md">
            <span>{service.category} Specialization</span>
            <span>·</span>
            <span>NEMA Reg. Firm of Experts</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
            {service.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('quote', service.title)}
              className="bg-[#E85B22] hover:bg-[#d64e17] text-white px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm shadow-lg transition-colors cursor-pointer"
            >
              Request a Quote for This Service
            </button>

            <button
              onClick={handleWhatsApp}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-lg font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Columns: Service Body */}
            <div className="lg:col-span-8 space-y-12">
              {/* Detailed Service Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#174B35] tracking-tight">
                  Overview & Technical Rationale
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Scope of Work */}
              <div className="space-y-4 p-8 rounded-2xl bg-[#F8FAF8] border border-slate-200">
                <div className="flex items-center gap-2 text-[#174B35] font-bold text-lg">
                  <FileText className="w-5 h-5 text-[#36A853]" />
                  <h3>Detailed Scope of Work</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {service.scopeOfWork.map((scope, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#36A853] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{scope}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Capabilities & Equipment */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#174B35]">
                  Technical Capabilities & Calibrated Instrumentation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.technicalCapabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1.5"
                    >
                      <div className="w-6 h-6 rounded-md bg-emerald-100 text-[#174B35] flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </div>
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                        {cap}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applicable Standards & Regulatory Considerations */}
              <div className="space-y-4 p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/60">
                <div className="flex items-center gap-2 text-[#174B35] font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-[#36A853]" />
                  <h4>Applicable Standards & Statutory Framework</h4>
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  {service.applicableStandards.map((std, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-[#174B35]">·</span>
                      <span className="font-medium">{std}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relevant Project Examples */}
              {relevantProjects.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#174B35]">
                    Relevant Project Case Studies
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relevantProjects.map(proj => (
                      <div
                        key={proj.id}
                        onClick={() => navigate('project-detail', proj.slug)}
                        className="rounded-xl border border-slate-200 p-4 bg-[#F8FAF8] hover:border-[#E85B22] transition-colors cursor-pointer space-y-2"
                      >
                        <div className="text-[11px] font-bold text-[#36A853] uppercase">
                          {proj.client} · {proj.location}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {proj.outcomes || proj.description}
                        </p>
                        <span className="text-xs font-bold text-[#E85B22] inline-flex items-center gap-1 pt-1">
                          View Case Study →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Frequently Asked Questions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#174B35] font-bold text-xl">
                  <HelpCircle className="w-5 h-5 text-[#E85B22]" />
                  <h3>Frequently Asked Questions</h3>
                </div>
                <div className="space-y-3">
                  {defaultFaqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-4 font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            openFaq === idx ? 'rotate-180 text-[#E85B22]' : 'text-slate-400'
                          }`}
                        />
                      </button>
                      {openFaq === idx && (
                        <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Sticky Action Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Request Quote Card */}
              <div className="p-6 rounded-2xl bg-[#174B35] text-white shadow-xl space-y-4 sticky top-28">
                <div className="text-xs font-bold text-[#36A853] uppercase tracking-wider">
                  Direct Technical Procurement
                </div>
                <h3 className="text-xl font-bold leading-snug">
                  Request a Formal Quote for {service.title}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Provide your facility details and an engineering specialist will prepare a customized technical proposal and statutory compliance schedule.
                </p>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={() => navigate('quote', service.title)}
                    className="w-full bg-[#E85B22] hover:bg-[#d64e17] text-white py-3 rounded-lg font-bold text-xs shadow-md transition-colors text-center cursor-pointer"
                  >
                    Launch Quotation Form
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-[#235840] text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#36A853]" />
                    <span>Direct: {settings.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#36A853]" />
                    <span>NEMA & DOSHS Compliant Reports</span>
                  </div>
                </div>

                {/* Industries Served Tag Cloud */}
                <div className="pt-4 border-t border-[#235840]">
                  <div className="text-[11px] font-bold text-slate-300 uppercase mb-2">
                    Key Sectors Served:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.industriesServed.map((ind, i) => (
                      <span
                        key={i}
                        className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded font-medium"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 space-y-4">
                  <h4 className="font-bold text-sm text-[#174B35]">Related Services</h4>
                  <div className="space-y-3">
                    {relatedServices.map(rel => (
                      <div
                        key={rel.id}
                        onClick={() => navigate('service-detail', rel.slug)}
                        className="text-xs p-3 rounded-lg bg-white border border-slate-200 hover:border-[#E85B22] transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span className="font-semibold text-slate-800 line-clamp-1">{rel.title}</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
