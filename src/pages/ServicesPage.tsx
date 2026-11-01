import React, { useState } from 'react';
import {
  Wind,
  HardHat,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ServicesPageProps {
  navigate: (route: string, param?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate }) => {
  const { services } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Environmental', 'Air Quality', 'Occupational Health', 'Laboratory', 'Engineering'];

  const filtered = services.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.scopeOfWork.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Header */}
      <section className="py-20 lg:py-24 bg-[#174B35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
            Integrated Technical Scope
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Our 13 Specialized Service Areas
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            Delivering precision environmental consulting, stack emission testing, ambient air quality surveillance, acoustic noise monitoring, geotechnical investigations, and sustainable infrastructure engineering.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="pt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services by keyword, regulation or method..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-slate-300 text-xs border border-white/20 focus:outline-none focus:bg-white focus:text-slate-900 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/10 rounded-xl border border-white/15">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-[#174B35] shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
            <span>Showing <strong>{filtered.length}</strong> services</span>
            <span>All services backed by ISO aligned QA & NEMA Lead Experts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(service => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-[#174B35]">
                    {service.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E85B22] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="text-[11px] font-semibold text-slate-800 mb-1">Key Scope:</div>
                    {service.scopeOfWork.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#36A853] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
                    <button
                      onClick={() => navigate('service-detail', service.slug)}
                      className="text-xs font-bold text-[#174B35] hover:text-[#E85B22] flex items-center gap-1"
                    >
                      <span>Full Specifications</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigate('quote', service.title)}
                      className="bg-[#E85B22] hover:bg-[#d64e17] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-colors"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
