import React from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, Factory, HardHat } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface IndustriesPageProps {
  navigate: (route: string, param?: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ navigate }) => {
  const { industries } = useApp();

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-[#174B35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
            Industrial & Infrastructure Sectors
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Industries We Serve
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            Every industry presents unique environmental exposure risks, emissions envelopes, and structural engineering demands. SEEL provides customized technical solutions tailored to regional regulatory frameworks.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map(ind => (
              <div
                key={ind.id}
                onClick={() => navigate('industry-detail', ind.slug)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={ind.image}
                    alt={ind.name}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-60 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white font-bold text-lg">
                    {ind.name}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] font-bold text-[#E85B22] uppercase tracking-wider">
                        Operational Challenges:
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                        {ind.challenges}
                      </p>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-[#174B35] uppercase tracking-wider">
                        Key Solutions:
                      </div>
                      <div className="space-y-1 mt-1 text-xs text-slate-700">
                        {ind.solutions.slice(0, 2).map((sol, i) => (
                          <div key={i} className="flex items-center gap-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#36A853]" />
                            <span className="truncate">{sol}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#174B35] group-hover:text-[#E85B22] transition-colors">
                    <span>View Sector Compliance Roadmap</span>
                    <ArrowRight className="w-4 h-4" />
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
