import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Download,
  Users2,
  Calendar,
  Compass,
  FileCheck2,
  ArrowRight,
  Target,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AboutPageProps {
  navigate: (route: string, param?: string) => void;
  subSection?: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate, subSection }) => {
  const { team, settings } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'management' | 'technical'>('all');

  const filteredTeam = activeTab === 'all'
    ? team
    : team.filter(m => m.category === activeTab);

  const handleDownloadProfile = () => {
    // Generate clean printable PDF summary or text download
    const content = `
SENIOR ENVIRONMENTAL & ENGINEERING LTD (SEEL)
CORPORATE PROFILE
Official Website: https://www.seniorenv.com/
Phone: ${settings.phone} | Email: ${settings.email}
Office: ${settings.officeAddress}

1. COMPANY OVERVIEW
Founded in 2015, Senior Environmental & Engineering Ltd is a leading environmental and engineering consultancy firm in East Africa delivering integrated technical, environmental, laboratory and sustainable development solutions.

2. MISSION
To provide reliable, sustainable and cost-effective environmental, quality and engineering solutions supported by technical expertise and compliance with applicable regulatory and statutory requirements.

3. VISION
To become a preferred environmental and engineering solutions provider through comprehensive, value-added and timely service delivery.

4. CORE VALUES
- Integrity
- Professionalism
- Service Excellence
- Opportunity Creation
- Environmental Responsibility
- Innovation
- Quality Assurance

5. KEY STATUTORY ACCREDITATIONS & ALIGNMENTS
- National Environment Management Authority (NEMA) Registered Firm of Experts
- Directorate of Occupational Safety & Health Services (DOSHS) Approved
- ISO 9001:2015 & ISO 14001:2015 Aligned Systems
- Energy and Petroleum Regulatory Authority (EPRA) Licensed Energy Auditors
- Engineers Board of Kenya (EBK) Registered Professional Engineers

6. CORE SPECIALIZATIONS
- Environmental Consultancy (EIA, EA, ESIA)
- Air Quality Consultancy & Isokinetic Stack Emission Testing
- Ambient Air Quality Monitoring (PM2.5, PM10)
- Indoor Air Quality (IAQ) & Occupational Hygiene
- Acoustic Noise & Vibration Monitoring
- Food, Soil & Effluent Laboratory Analytical Testing
- Building & Civil Infrastructure Construction Engineering
- Industrial Energy Audits & Inspections (EPRA)
- Air Dispersion Modelling (AERMOD / CALPUFF)
- GIS & Spatial Data Management
- Geotechnical Site Investigations (Core Drilling & SPT)
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SEEL-Corporate-Profile-2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-[#174B35] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/src/assets/images/hero_environmental_engineering_1793480528430.jpg"
            alt="About SEEL"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-300">
            <Compass className="w-3.5 h-3.5" />
            <span>Corporate Identity & Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            About Senior Environmental & Engineering Ltd
          </h1>
          <p className="text-sm sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Delivering multidisciplinary environmental science, regulatory compliance, emissions monitoring, and high-precision civil engineering solutions across East Africa since 2015.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={handleDownloadProfile}
              className="bg-[#E85B22] hover:bg-[#d64e17] text-white px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Corporate Profile</span>
            </button>
            <button
              onClick={() => navigate('contact')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-lg text-xs font-semibold"
            >
              Contact Our Directors
            </button>
          </div>
        </div>
      </section>

      {/* Main Corporate Profile & History */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
                Who We Are
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
                An Established Environmental & Engineering Powerhouse
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Senior Environmental & Engineering Ltd (SEEL) was established in 2015 in Nairobi, Kenya, by a consortium of senior environmental scientists, registered consulting engineers, and industrial chemists. Our founding premise was simple yet uncompromising: to bridge the gap between regulatory environmental compliance and pragmatic engineering execution.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Over the past 12+ years of collective practice and more than 3,200 successfully completed projects, SEEL has become a premier trusted advisor to international corporations, industrial manufacturing facilities, government agencies, and real estate developers.
              </p>

              {/* Milestones Timeline */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#174B35] font-bold text-xs flex items-center justify-center shrink-0">
                    2015
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Founding & NEMA Registration</h4>
                    <p className="text-xs text-slate-600">Established in Nairobi, gaining formal registration as a NEMA Firm of Experts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#174B35] font-bold text-xs flex items-center justify-center shrink-0">
                    2018
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Emissions Testing & Air Quality Laboratory</h4>
                    <p className="text-xs text-slate-600">Acquired USEPA Method 5 isokinetic stack testing consoles and Class 1 acoustic meters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#174B35] font-bold text-xs flex items-center justify-center shrink-0">
                    2021
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Geotechnical & Civil Infrastructure Expansion</h4>
                    <p className="text-xs text-slate-600">Integrated motorized rotary core drilling rigs and materials testing facilities.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#174B35] font-bold text-xs flex items-center justify-center shrink-0">
                    2025+
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">East African Regional Footprint</h4>
                    <p className="text-xs text-slate-600">Surpassed 3,200 completed projects and 1,814 clients across Kenya, Uganda, and Tanzania.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="/src/assets/images/service_environmental_lab_1793480530132.jpg"
                  alt="SEEL Laboratory facilities"
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Core Values */}
      <section className="py-20 bg-[#F8FAF8] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#174B35] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#174B35]">Our Mission</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                "To provide reliable, sustainable and cost-effective environmental, quality and engineering solutions supported by technical expertise and compliance with applicable regulatory and statutory requirements."
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#E85B22] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#174B35]">Our Vision</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                "To become a preferred environmental and engineering solutions provider through comprehensive, value-added and timely service delivery."
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
                Guiding Principles
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#174B35]">
                Our Seven Core Values
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Integrity', desc: 'Unwavering ethical conduct, honest scientific reporting, and transparent client advisory.' },
                { title: 'Professionalism', desc: 'High technical competence, certified practitioners, and punctual milestone delivery.' },
                { title: 'Service Excellence', desc: 'Going beyond statutory minimums to deliver actionable value-added engineering.' },
                { title: 'Opportunity Creation', desc: 'Fostering industrial growth, community livelihoods, and local technical employment.' },
                { title: 'Environmental Responsibility', desc: 'Safeguarding air, soil, and aquatic ecosystems for future generations.' },
                { title: 'Innovation', desc: 'Adopting advanced computer air dispersion models, drones, and real-time telemetry.' },
                { title: 'Quality Assurance', desc: 'Standard operating procedures aligned with ISO 9001:2015 and ISO 14001:2015.' },
                { title: 'Client Partnership', desc: 'Long-term collaborative relationships built on technical trust and reliability.' },
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2"
                >
                  <div className="text-xs font-extrabold text-[#36A853]">0{idx + 1}.</div>
                  <h4 className="text-base font-bold text-slate-900">{val.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Technical Experts Directory */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
                Human Capital
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
                Management & Technical Experts
              </h2>
              <p className="text-sm text-slate-600">
                Our operations are led by verified senior consultants, registered lead experts, and credentialed engineers with distinguished careers.
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['all', 'management', 'technical'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white text-[#174B35] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'all' ? 'All Experts' : `${tab} Team`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeam.map(member => (
              <div
                key={member.id}
                className="bg-[#F8FAF8] rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group"
              >
                <div className="h-60 w-full overflow-hidden bg-slate-200 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {member.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E85B22] transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#174B35]">
                      {member.role}
                    </div>
                    <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                      <div><strong>Qualifications:</strong> {member.qualification}</div>
                      <div><strong>Accreditations:</strong> {member.certifications}</div>
                    </div>
                    <p className="text-xs text-slate-600 pt-2 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => navigate('contact')}
                      className="text-[#E85B22] font-semibold hover:underline"
                    >
                      Request Technical Consultation →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations & Quality Standards */}
      <section className="py-20 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
              Statutory Rigor
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
              Certifications & Quality Standards
            </h2>
            <p className="text-sm text-slate-600">
              SEEL operates under strict national and international standard operating procedures to guarantee the highest caliber of evidence and compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#36A853]" />
              <h4 className="text-base font-bold text-slate-900">NEMA Kenya Registered Firm of Experts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Licensed under the Environmental Management and Co-ordination Act (EMCA Cap 387) to conduct EIA, EA, and statutory baseline studies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <Award className="w-8 h-8 text-[#E85B22]" />
              <h4 className="text-base font-bold text-slate-900">DOSHS Approved OSH Advisors</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Approved by the Directorate of Occupational Safety & Health Services to carry out workplace safety, noise dosimetry, and hygiene audits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <FileCheck2 className="w-8 h-8 text-[#174B35]" />
              <h4 className="text-base font-bold text-slate-900">ISO 9001:2015 & ISO 14001:2015</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Management systems aligned with international standards for Quality Management (ISO 9001) and Environmental Management (ISO 14001).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#36A853]" />
              <h4 className="text-base font-bold text-slate-900">EPRA Energy Auditor Certification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Certified by the Energy and Petroleum Regulatory Authority to conduct statutory investment-grade industrial energy audits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <Award className="w-8 h-8 text-[#E85B22]" />
              <h4 className="text-base font-bold text-slate-900">Engineers Board of Kenya (EBK)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our civil and structural engineering teams comprise registered professional consulting engineers in good standing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <FileCheck2 className="w-8 h-8 text-[#174B35]" />
              <h4 className="text-base font-bold text-slate-900">ISO/IEC 17025 Laboratory Protocols</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Analytical water, soil, and emissions testing adhered to international testing laboratory competence guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
