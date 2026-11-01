import React, { useState } from 'react';
import { Search, ArrowRight, MapPin, Calendar, Building, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProjectsPageProps {
  navigate: (route: string, param?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ navigate }) => {
  const { projects } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Stack Emissions Testing',
    'Environmental Impact Assessments',
    'Noise and Vibration Monitoring',
    'Geotechnical Investigations',
    'Air Quality Monitoring',
    'Environmental Audits'
  ];

  const filtered = projects.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-[#174B35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
            Verified Track Record
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Projects & Case Studies
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            Over 3,200 successful engagements delivering environmental compliance, stack emission testing, geotechnical foundations, and acoustics across Kenya and East Africa.
          </p>

          {/* Search & Categories */}
          <div className="pt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by client, location or project scope..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-slate-300 text-xs border border-white/20 focus:outline-none focus:bg-white focus:text-slate-900 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/10 rounded-xl border border-white/15">
              {categories.slice(0, 5).map(cat => (
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

      {/* Projects Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(proj => (
              <div
                key={proj.id}
                onClick={() => navigate('project-detail', proj.slug)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#174B35] text-white px-2.5 py-1 rounded text-[11px] font-bold">
                    {proj.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-[#36A853]" />
                        <span className="font-semibold text-slate-800">{proj.client}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E85B22]" />
                        <span>{proj.location}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#E85B22] transition-colors leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {proj.outcomes && (
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-950">
                      <div className="font-bold text-[11px] text-[#174B35] mb-0.5">Verified Outcome:</div>
                      <p className="line-clamp-2 leading-relaxed">{proj.outcomes}</p>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#174B35]">
                    <span>View Technical Scope</span>
                    <ArrowRight className="w-4 h-4 text-[#E85B22] group-hover:translate-x-1 transition-transform" />
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
