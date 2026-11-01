import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Calendar,
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  Tag,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ResourcesPageProps {
  navigate: (route: string, param?: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ navigate }) => {
  const { articles, settings } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tags = ['All', 'NEMA', 'Air Quality', 'Geotechnical', 'Industrial Hygiene', 'Compliance'];

  const filtered = articles.filter(art => {
    const matchTag = selectedTag === 'All' || art.tags.includes(selectedTag);
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTag && matchSearch;
  });

  const handleDownload = (docName: string) => {
    const docData = `
SENIOR ENVIRONMENTAL & ENGINEERING LTD (SEEL)
TECHNICAL RESOURCE DOCUMENT: ${docName.toUpperCase()}
Official Website: https://www.seniorenv.com/
Contact: ${settings.phone} | ${settings.email}

This document contains standard statutory guidelines and technical reference data prepared by SEEL's NEMA Registered Lead Experts and EBK Consulting Engineers.

KEY REGULATORY FRAMEWORKS:
1. EMCA (Cap 387) Environmental Impact Assessment and Audit Regulations
2. Environmental Management and Co-ordination (Air Quality) Regulations 2014
3. Environmental Management and Co-ordination (Noise and Excessive Vibration Pollution) Regulations 2009
4. Occupational Safety and Health Act (OSHA 2007)
5. EPRA Energy Management Regulations 2012

For project-specific statutory permitting and isokinetic monitoring, contact our technical desk at info@seniorenv.com.
    `.trim();

    const blob = new Blob([docData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${docName.toLowerCase().replace(/\s+/g, '-')}-seel.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'When is an Environmental Impact Assessment (EIA) legally mandatory in Kenya?',
      a: 'Under the Second Schedule of the Environmental Management and Co-ordination Act (EMCA Cap 387), any new project involving manufacturing, energy, mining, infrastructure, or high-density commercial real estate must submit an EIA Study Report to NEMA and receive a formal license prior to ground breaking.'
    },
    {
      q: 'How frequently must industrial stack emissions be tested under Kenyan law?',
      a: 'The EMCA (Air Quality) Regulations 2014 specify periodic monitoring requirements—typically semi-annual or annual testing for stationary combustion sources (boilers, kilns, furnaces) by a NEMA-designated air quality laboratory using isokinetic sampling methods.'
    },
    {
      q: 'What are the permissible workplace noise levels under DOSHS?',
      a: 'Under the OSHA 2007 Noise Prevention and Control Regulations, the occupational exposure limit for continuous noise is 85 dBA for an 8-hour shift. Environments exceeding 90 dBA require mandatory engineering dampening and certified personal hearing protection.'
    },
    {
      q: 'Why is geotechnical borehole drilling necessary before foundation construction?',
      a: 'Subsurface drilling and Standard Penetration Testing (SPT) identify soil stratigraphy, ground water levels, and allowable bearing capacity. This prevents catastrophic foundation settlement, structural shear failures, and costly architectural cracking.'
    }
  ];

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-[#174B35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
            Knowledge Centre & Publications
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Environmental & Engineering Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            Statutory regulatory updates, technical white papers, case studies, and compliance guidelines authored by SEEL's senior environmental specialists and consulting engineers.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles, whitepapers or FAQs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-slate-300 text-xs border border-white/20 focus:outline-none focus:bg-white focus:text-slate-900 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Articles List */}
            <div className="lg:col-span-8 space-y-8">
              {/* Tag filters */}
              <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200">
                <span className="text-xs font-semibold text-slate-500 mr-2">Filter by Topic:</span>
                {tags.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTag(t)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedTag === t
                        ? 'bg-[#174B35] text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Articles Grid */}
              <div className="space-y-6">
                {filtered.map(article => (
                  <article
                    key={article.id}
                    onClick={() => navigate('article-detail', article.slug)}
                    className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-6 group"
                  >
                    <div className="h-44 md:w-56 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="text-[#36A853] font-bold">{article.category}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{article.publishedAt}</span>
                          </span>
                          <span>·</span>
                          <span>{article.readTime}</span>
                        </div>

                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#E85B22] transition-colors leading-snug">
                          {article.title}
                        </h2>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="text-slate-500 font-medium">By {article.author}</span>
                        <span className="text-[#174B35] font-bold group-hover:text-[#E85B22] flex items-center gap-1">
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* FAQs Accordion */}
              <div className="pt-8 border-t border-slate-200 space-y-6">
                <div className="flex items-center gap-2 text-[#174B35] font-bold text-xl">
                  <HelpCircle className="w-6 h-6 text-[#E85B22]" />
                  <h2>Frequently Asked Regulatory Questions</h2>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
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

            {/* Sidebar Downloads & Documents */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#174B35] font-bold text-base">
                  <Download className="w-5 h-5 text-[#36A853]" />
                  <h3>Statutory & Technical Downloads</h3>
                </div>
                <p className="text-xs text-slate-600">
                  Approved regulatory guides, technical parameters, and corporate brochures available for download.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { title: 'SEEL Corporate Profile 2026', size: 'PDF · 2.4 MB' },
                    { title: 'NEMA Air Quality Sampling Guide', size: 'PDF · 1.1 MB' },
                    { title: 'Statutory Environmental Audit Checklist', size: 'PDF · 850 KB' },
                    { title: 'Occupational Noise Limits Reference Chart', size: 'PDF · 620 KB' },
                  ].map((doc, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#36A853] transition-colors flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="truncate">
                        <div className="font-bold text-slate-800 truncate">{doc.title}</div>
                        <div className="text-[10px] text-slate-500">{doc.size}</div>
                      </div>
                      <button
                        onClick={() => handleDownload(doc.title)}
                        className="bg-[#174B35] hover:bg-[#113827] text-white p-2 rounded-lg shrink-0 transition-colors cursor-pointer"
                        title="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Card */}
              <div className="p-6 rounded-2xl bg-[#174B35] text-white shadow-xl space-y-4">
                <h4 className="font-bold text-base">Need Tailored Technical Advice?</h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Our licensed NEMA Lead Experts and engineers provide confidential regulatory assessments.
                </p>
                <button
                  onClick={() => navigate('contact')}
                  className="w-full bg-[#E85B22] hover:bg-[#d64e17] text-white py-2.5 rounded-lg font-bold text-xs shadow transition-colors cursor-pointer"
                >
                  Contact Advisory Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
