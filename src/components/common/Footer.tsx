import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  Award,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FooterProps {
  navigate: (route: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings, services } = useApp();

  const handleNav = (route: string, param?: string) => {
    navigate(route, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#174B35] text-slate-200 border-t border-[#235840]">
      {/* Pre-footer trust banner */}
      <div className="border-b border-[#235840] py-6 px-4 sm:px-8 bg-[#123e2b]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#36A853]" />
              <strong className="text-white">NEMA Kenya</strong> Registered Firm of Experts
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E85B22]" />
              <strong className="text-white">DOSHS</strong> Approved Safety & Health Auditors
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span>
              <strong className="text-white">ISO 9001:2015 & ISO 14001:2015</strong> Aligned Systems
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('quote')}
              className="text-white bg-[#E85B22] hover:bg-[#d44e18] px-3.5 py-1.5 rounded-md font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Instant Quote Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 cursor-pointer group bg-white/5 p-2 rounded-xl inline-flex border border-white/10"
            >
              <img
                src="/assets/aistudio/images__13__ac2b8989.jpeg"
                alt="SEEL Logo"
                className="h-12 w-auto object-contain bg-white rounded-full p-1"
              />
              <div>
                <div className="font-bold text-white text-base tracking-tight">SEEL</div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider">
                  Senior Environmental & Engineering
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-300">
              Senior Environmental & Engineering Ltd is an established consultancy founded in 2015,
              delivering integrated environmental compliance, air emissions monitoring, geotechnical
              investigations, and sustainable infrastructure solutions across Kenya and East Africa.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <div>
                <span className="text-white/60">P.O. Box: </span>
                <span className="text-white font-medium">{settings.postalAddress}</span>
              </div>
              <div>
                <span className="text-white/60">Registration: </span>
                <span className="text-white font-medium">NEMA Firm of Experts Reg. No. 2145</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4 text-[#36A853]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us & Corporate History
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors"
                >
                  Our 13 Core Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('industries')}
                  className="hover:text-white transition-colors"
                >
                  Industries We Serve
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('projects')}
                  className="hover:text-white transition-colors"
                >
                  Projects & Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('resources')}
                  className="hover:text-white transition-colors"
                >
                  Knowledge Centre & Downloads
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Technical Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quote')}
                  className="text-[#E85B22] font-semibold hover:underline"
                >
                  Request a Formal Quote →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4 text-[#36A853]">
              Our Key Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {services.slice(0, 6).map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => handleNav('service-detail', s.slug)}
                    className="hover:text-white transition-colors text-left truncate max-w-full block"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-xs text-[#E85B22] font-medium hover:underline pt-1 block"
                >
                  View all 13 specialized services →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-4 text-xs text-slate-300">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4 text-[#36A853]">
              Contact Information
            </h4>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#E85B22] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">{settings.officeAddress}</p>
                <a
                  href="https://maps.google.com/?q=Gateway+Mall+Mombasa+Road+Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#36A853] hover:underline flex items-center gap-1 mt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#36A853] shrink-0" />
              <div>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-[#E85B22] font-medium transition-colors"
                >
                  {settings.phone}
                </a>
                <div className="text-[10px] text-slate-400">Direct Consultation Hotline</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#36A853] shrink-0" />
              <div>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-white hover:text-[#E85B22] font-medium transition-colors"
                >
                  {settings.email}
                </a>
                <div className="text-[10px] text-slate-400">Official Correspondence</div>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <Clock className="w-4 h-4 text-[#36A853] shrink-0 mt-0.5" />
              <div className="text-[11px] space-y-0.5 text-slate-300">
                <div>{settings.workingHoursWeekday}</div>
                <div>{settings.workingHoursSaturday}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#235840] py-6 px-4 sm:px-8 bg-[#0f3424] text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Senior Environmental & Engineering Ltd (SEEL). All rights reserved.
            <span className="block sm:inline sm:ml-2 text-slate-500">
              Engineering Excellence. Environmental Responsibility. Sustainable Futures.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button
              onClick={() => handleNav('legal', 'privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('legal', 'terms')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('legal', 'cookies')}
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('admin')}
              className="text-[#36A853] hover:text-white font-medium transition-colors"
            >
              Admin CMS
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
