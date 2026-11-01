import React from 'react';
import {
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProjectDetailPageProps {
  slug: string;
  navigate: (route: string, param?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, navigate }) => {
  const { projects } = useApp();
  const project = projects.find(p => p.slug === slug || p.id === slug) || projects[0];

  const related = projects.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3);

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Top Breadcrumb Header */}
      <div className="bg-[#174B35] text-white py-4 px-4 sm:px-8 border-b border-[#235840]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <button
            onClick={() => navigate('projects')}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Projects Portfolio</span>
          </button>
          <span className="text-emerald-300 font-semibold">{project.category}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative min-h-[380px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded">
              <Building className="w-3.5 h-3.5 text-[#36A853]" />
              <strong className="text-white">{project.client}</strong>
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded">
              <MapPin className="w-3.5 h-3.5 text-[#E85B22]" />
              <span>{project.location}</span>
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded">
              <Calendar className="w-3.5 h-3.5 text-[#36A853]" />
              <span>Completed {project.year}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#174B35]">
                  Project Overview & Engineering Scope
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Scope of Work list */}
              <div className="p-8 rounded-2xl bg-[#F8FAF8] border border-slate-200 space-y-4">
                <h3 className="font-bold text-lg text-[#174B35]">Scope of Technical Services Executed</h3>
                <div className="space-y-3">
                  {project.scopeOfWork.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#36A853] shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Outcomes */}
              {project.outcomes && (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#174B35] font-bold text-base">
                    <Award className="w-5 h-5 text-[#36A853]" />
                    <h3>Verified Project Outcomes & Value Delivered</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                    {project.outcomes}
                  </p>
                </div>
              )}

              {/* Related Projects */}
              {related.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-[#174B35]">Similar Case Studies</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.map(r => (
                      <div
                        key={r.id}
                        onClick={() => navigate('project-detail', r.slug)}
                        className="p-4 rounded-xl border border-slate-200 bg-[#F8FAF8] hover:border-[#E85B22] transition-colors cursor-pointer space-y-2"
                      >
                        <div className="text-[10px] font-bold text-[#36A853] uppercase">{r.client}</div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{r.title}</h4>
                        <span className="text-xs text-[#E85B22] font-semibold inline-flex items-center gap-1">
                          Read Case Study →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-[#174B35] text-white shadow-xl space-y-4 sticky top-28">
                <h4 className="text-lg font-bold leading-tight">
                  Need Similar Engineering or Environmental Solutions?
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Partner with SEEL to ensure your project complies with all statutory regulations and engineering requirements.
                </p>
                <button
                  onClick={() => navigate('quote', project.category)}
                  className="w-full bg-[#E85B22] hover:bg-[#d64e17] text-white py-3 rounded-lg font-bold text-xs shadow transition-colors cursor-pointer text-center"
                >
                  Request a Project Quote
                </button>
                <button
                  onClick={() => navigate('contact')}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg font-medium text-xs border border-white/20 transition-colors"
                >
                  Schedule Technical Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
