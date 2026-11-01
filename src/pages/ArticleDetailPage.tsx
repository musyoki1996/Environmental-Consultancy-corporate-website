import React from 'react';
import { Calendar, User, ChevronLeft, ArrowRight, Share2, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ArticleDetailPageProps {
  slug: string;
  navigate: (route: string, param?: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug, navigate }) => {
  const { articles, showToast } = useApp();
  const article = articles.find(a => a.slug === slug || a.id === slug) || articles[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard.', 'info');
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Top Breadcrumb */}
      <div className="bg-[#174B35] text-white py-4 px-4 sm:px-8 border-b border-[#235840]">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
          <button
            onClick={() => navigate('resources')}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Knowledge Centre</span>
          </button>
          <span className="text-emerald-300 font-semibold">{article.category}</span>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="py-16 max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="bg-emerald-50 text-[#174B35] font-bold px-2.5 py-1 rounded">
                {article.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishedAt}</span>
              </span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#36A853]" />
                <span className="font-semibold text-slate-800">Author: {article.author}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-slate-500 hover:text-[#E85B22] transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden h-72 sm:h-96 w-full bg-slate-100">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
            <p className="font-medium text-slate-900 text-base sm:text-lg border-l-4 border-[#36A853] pl-4 italic">
              {article.summary}
            </p>
            <p className="leading-relaxed">
              {article.content}
            </p>
            <p className="leading-relaxed">
              Industrial facilities and developers operating across Kenya are obligated by statute to maintain rigorous documentation. By adhering to NEMA testing methodologies, establishing baseline ambient records, and deploying modern monitoring equipment, facilities avoid punitive compliance notices, stop-work orders, or regulatory fines.
            </p>
            <p className="leading-relaxed">
              For organizations seeking comprehensive technical support, Senior Environmental & Engineering Ltd delivers calibrated field measurements, automated data reporting, and engineered abatement designs that satisfy both local authorities and international funding institutions.
            </p>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <Tag className="w-4 h-4 text-[#E85B22]" />
            <span className="font-bold text-slate-700">Tags:</span>
            {article.tags.map(t => (
              <span key={t} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                {t}
              </span>
            ))}
          </div>

          {/* Callout */}
          <div className="p-6 rounded-xl bg-[#F8FAF8] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Need advice on this topic for your facility?</h4>
              <p className="text-xs text-slate-600">Our senior experts can review your emissions limits or audit schedule.</p>
            </div>
            <button
              onClick={() => navigate('contact')}
              className="bg-[#E85B22] hover:bg-[#d64e17] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors shrink-0"
            >
              Contact Technical Desk
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
