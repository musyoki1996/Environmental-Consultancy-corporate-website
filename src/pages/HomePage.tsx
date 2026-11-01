import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wind,
  HardHat,
  Microscope,
  Compass,
  FileCheck2,
  Users2,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  Star,
  Layers,
  Activity,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { clientPartnersList } from '../data/initialData';

interface HomePageProps {
  navigate: (route: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { settings, services, industries, projects, testimonials, submitEnquiry } = useApp();
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>('All');
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>('All');

  // Quick enquiry state for Section K
  const [quickForm, setQuickForm] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    serviceRequired: 'Environmental Consultancy',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitEnquiry({
      fullName: quickForm.fullName,
      company: quickForm.company,
      email: quickForm.email,
      phone: quickForm.phone,
      country: 'Kenya',
      serviceRequired: quickForm.serviceRequired,
      projectLocation: 'Kenya / East Africa',
      subject: `Inquiry: ${quickForm.serviceRequired}`,
      message: quickForm.message
    });
    setSubmitting(false);
    if (res.success) {
      setSubmittedRef('Received');
      setQuickForm({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        serviceRequired: 'Environmental Consultancy',
        message: ''
      });
    }
  };

  // Service categories
  const serviceCategories = ['All', 'Environmental', 'Air Quality', 'Occupational Health', 'Laboratory', 'Engineering'];
  const filteredServices = selectedServiceCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedServiceCategory);

  // Project categories
  const projectCategories = ['All', 'Stack Emissions Testing', 'Environmental Impact Assessments', 'Noise and Vibration Monitoring', 'Geotechnical Investigations'];
  const filteredProjects = selectedProjectCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedProjectCategory);

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* SECTION A: HERO BANNER */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Background Image with Dark Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_environmental_engineering_1793480528430.jpg"
            alt="Environmental engineers on site"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
          <div className="absolute inset-0 bg-[#174B35]/25 mix-blend-multiply" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-[#36A853]" />
              <span>NEMA Registered Firm of Experts · DOSHS Approved</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Engineering Excellence. <br />
              <span className="text-[#36A853]">Environmental</span> Responsibility.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl text-balance">
              Delivering innovative environmental, engineering and sustainable development solutions through technical expertise, precision and professional excellence across Kenya and East Africa.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('services')}
                className="bg-[#E85B22] hover:bg-[#d64e17] text-white px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:translate-y-[-1px] flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('quote')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Request a Consultation</span>
              </button>

              <button
                onClick={() => navigate('contact')}
                className="text-slate-300 hover:text-white px-4 py-3.5 text-sm font-medium transition-colors flex items-center gap-1.5 underline underline-offset-4"
              >
                <span>Contact Our Experts</span>
              </button>
            </div>

            {/* Hero Quick Trust Markers */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
              <div>
                <div className="font-bold text-white text-base">3,200+</div>
                <div className="text-slate-400">Projects Completed</div>
              </div>
              <div>
                <div className="font-bold text-white text-base">12+ Years</div>
                <div className="text-slate-400">Corporate Track Record</div>
              </div>
              <div>
                <div className="font-bold text-white text-base">1,814+</div>
                <div className="text-slate-400">Satisfied Clients</div>
              </div>
              <div>
                <div className="font-bold text-white text-base">ISO Aligned</div>
                <div className="text-slate-400">9001 & 14001 Standards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: CORPORATE INTRODUCTION */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
                Corporate Overview
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] leading-tight tracking-tight text-balance">
                Advancing Sustainable Development Through Engineering Excellence
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Founded in 2015, <strong>Senior Environmental & Engineering Ltd (SEEL)</strong> has established itself as an authoritative leader in environmental compliance, environmental monitoring, technical engineering, and sustainable development across Kenya and the wider East African region.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We combine deep statutory regulatory expertise with state-of-the-art monitoring instrumentation—including certified isokinetic stack sampling consoles, Class 1 acoustic noise analyzers, and advanced geotechnical drilling rigs. Our multidisciplinary team of licensed NEMA Lead Experts, certified engineers, and analytical chemists ensures that your projects achieve statutory approvals while optimizing operational efficiency.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#36A853] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Regulatory Assurance</h4>
                    <p className="text-xs text-slate-600">Full compliance with NEMA, DOSHS, EPRA, and county municipal bylaws.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#36A853] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Calibrated Instrumentation</h4>
                    <p className="text-xs text-slate-600">Traceable measurement tools ensuring legally defensible data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#36A853] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Integrated Capabilities</h4>
                    <p className="text-xs text-slate-600">One-stop consultancy spanning EIA, air quality, laboratory, and civil works.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#36A853] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Experienced Leadership</h4>
                    <p className="text-xs text-slate-600">Over 16 years of hands-on senior engineering and environmental advisory.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => navigate('about')}
                  className="bg-[#174B35] hover:bg-[#113827] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Read More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('about', 'team')}
                  className="text-[#174B35] hover:text-[#E85B22] font-semibold text-sm transition-colors cursor-pointer"
                >
                  Meet Our Leadership →
                </button>
              </div>
            </div>

            {/* Right Photographic Feature */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="/src/assets/images/service_building_construction_1793480531032.jpg"
                  alt="SEEL Engineers conducting on-site technical inspection"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="text-xs font-semibold text-[#36A853] uppercase tracking-wider">
                    Established 2015 · Nairobi, Kenya
                  </div>
                  <div className="text-lg font-bold">
                    Precision Ground & Infrastructure Engineering
                  </div>
                  <p className="text-xs text-slate-200">
                    Inspecting and certifying critical commercial, industrial, and public projects.
                  </p>
                </div>
              </div>

              {/* Offset floating stamp */}
              <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 bg-white p-4 rounded-xl shadow-xl border border-slate-100 max-w-xs">
                <div className="p-3 bg-emerald-50 rounded-lg text-[#36A853]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">ISO 9001 & 14001</div>
                  <div className="text-[11px] text-slate-500">Aligned Quality & Environmental Management Systems</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: KEY PERFORMANCE INDICATORS */}
      <section className="py-16 bg-[#174B35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#235840]">
            <div className="px-4 text-center sm:text-left space-y-1">
              <div className="text-3xl sm:text-5xl font-extrabold text-[#36A853] tracking-tight">
                {settings.statProjectsCompleted}
              </div>
              <div className="text-sm font-bold text-white">Projects Completed</div>
              <p className="text-xs text-slate-300">Across industrial, infrastructure and commercial sectors.</p>
            </div>

            <div className="px-4 pt-6 sm:pt-0 text-center sm:text-left space-y-1">
              <div className="text-3xl sm:text-5xl font-extrabold text-[#E85B22] tracking-tight">
                {settings.statYearsExperience}
              </div>
              <div className="text-sm font-bold text-white">Years of Experience</div>
              <p className="text-xs text-slate-300">Delivering environmental compliance and engineering solutions.</p>
            </div>

            <div className="px-4 pt-6 sm:pt-0 text-center sm:text-left space-y-1">
              <div className="text-3xl sm:text-5xl font-extrabold text-[#36A853] tracking-tight">
                {settings.statSatisfiedClients}
              </div>
              <div className="text-sm font-bold text-white">Satisfied Clients</div>
              <p className="text-xs text-slate-300">From multinational manufacturers to infrastructure authorities.</p>
            </div>

            <div className="px-4 pt-6 sm:pt-0 text-center sm:text-left space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight pt-2">
                ISO Certified Systems
              </div>
              <div className="text-sm font-bold text-[#36A853]">ISO 9001 & ISO 14001</div>
              <p className="text-xs text-slate-300">Aligned quality assurance & environmental management protocols.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: OUR SERVICES */}
      <section className="py-20 lg:py-24 bg-[#F8FAF8] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
                Comprehensive Technical Scope
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
                Our 13 Specialized Service Categories
              </h2>
              <p className="text-sm text-slate-600">
                Senior Environmental & Engineering Ltd delivers certified solutions spanning EIA, stack emission testing, acoustics, industrial hygiene, laboratory analytics, and civil infrastructure.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl">
              {serviceCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedServiceCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedServiceCategory === cat
                      ? 'bg-white text-[#174B35] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Frame */}
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

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E85B22] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    {service.scopeOfWork.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#36A853]" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
                    <button
                      onClick={() => navigate('service-detail', service.slug)}
                      className="text-xs font-bold text-[#174B35] hover:text-[#E85B22] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => navigate('quote', service.title)}
                      className="bg-[#E85B22] hover:bg-[#d64e17] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                    >
                      Request This Service
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('services')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#174B35] hover:text-[#E85B22] bg-white border border-slate-200 px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
            >
              <span>Explore All 13 Dedicated Service Detail Pages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION E: WHY CHOOSE SEEL? */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
              Corporate Value Proposition
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight text-balance">
              Why East Africa's Leading Enterprises Choose SEEL
            </h2>
            <p className="text-sm text-slate-600">
              We stand apart through our deep regulatory standing, uncompromised technical integrity, and multidisciplinary engineering depth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 hover:border-[#36A853] transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#174B35] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Experienced Technical Professionals</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Licensed NEMA Lead Experts, Registered Consulting Engineers (EBK), and certified industrial hygienists with over 16 years of hands-on expertise.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 hover:border-[#36A853] transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#E85B22] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Integrated Solutions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamless synergy between environmental science, laboratory chemistry, and civil/structural engineering under one roof.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 hover:border-[#36A853] transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#174B35] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Regulatory Compliance Expertise</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unmatched proficiency with Kenya EMCA regulations, DOSHS occupational requirements, and international IFC/World Bank standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 hover:border-[#36A853] transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#E85B22] flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">Modern Monitoring Technology</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equipped with USEPA isokinetic stack testers, Class 1 sound analyzers, AERMOD dispersion software, and hydraulic drill rigs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 hover:border-[#36A853] transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#174B35] flex items-center justify-center font-bold text-sm">
                05
              </div>
              <h3 className="text-base font-bold text-slate-900">Professional Project Management</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rigorous project governance ensuring timely delivery, strict milestones, and clear statutory submission protocols.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 hover:border-[#36A853] transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#E85B22] flex items-center justify-center font-bold text-sm">
                06
              </div>
              <h3 className="text-base font-bold text-slate-900">Quality Assurance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Management systems aligned with ISO 9001:2015 and ISO 14001:2015, ensuring reproducible, legally defensible findings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 hover:border-[#36A853] transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#174B35] flex items-center justify-center font-bold text-sm">
                07
              </div>
              <h3 className="text-base font-bold text-slate-900">Client-Focused Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated project managers providing transparent consultation, rapid turnarounds, and bespoke mitigation recommendations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-slate-200 hover:border-[#36A853] transition-colors space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#E85B22] flex items-center justify-center font-bold text-sm">
                08
              </div>
              <h3 className="text-base font-bold text-slate-900">Commitment to Sustainability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Practical, economically viable strategies that preserve ecosystems while enabling commercial growth and job creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: INDUSTRIES WE SERVE */}
      <section className="py-20 lg:py-24 bg-[#F8FAF8] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
                Targeted Sector Solutions
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
                Industries We Serve
              </h2>
              <p className="text-sm text-slate-600">
                Tailored engineering, environmental compliance, and monitoring services addressing the unique operational challenges of key industries.
              </p>
            </div>

            <button
              onClick={() => navigate('industries')}
              className="text-xs font-bold text-[#174B35] hover:text-[#E85B22] flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>View All Sectors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map(ind => (
              <div
                key={ind.id}
                onClick={() => navigate('industry-detail', ind.slug)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 h-72 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={ind.image}
                  alt={ind.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#36A853] transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {ind.challenges}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-[#E85B22]">
                    <span>Explore Solutions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION G: OUR PROJECTS */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
                Proven Track Record
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
                Featured Engineering & Environmental Projects
              </h2>
              <p className="text-sm text-slate-600">
                Verified case studies demonstrating our technical excellence in stack testing, EIA approvals, acoustics, and geotechnical drilling.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              {projectCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedProjectCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedProjectCategory === cat
                      ? 'bg-white text-[#174B35] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(proj => (
              <div
                key={proj.id}
                onClick={() => navigate('project-detail', proj.slug)}
                className="bg-[#F8FAF8] rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#174B35] text-white px-2.5 py-1 rounded text-[11px] font-bold">
                    {proj.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded text-[11px] font-semibold">
                    {proj.location}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-slate-500">
                      Client: <span className="text-slate-800 font-bold">{proj.client}</span> · {proj.year}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#E85B22] transition-colors leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-[#174B35]">
                    <span>View Project Specifications</span>
                    <ArrowRight className="w-4 h-4 text-[#E85B22] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('projects')}
              className="inline-flex items-center gap-2 bg-[#174B35] hover:bg-[#113827] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow transition-colors"
            >
              <span>Explore Complete Projects Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION H: CLIENTS AND PARTNERS */}
      <section className="py-16 bg-[#F8FAF8] border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
              Trusted Corporate Partnerships
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#174B35]">
              Organizations We Have Proudly Served
            </h2>
            <p className="text-xs text-slate-500">
              Verified corporate relationships and project engagements across manufacturing, infrastructure, and energy sectors.
            </p>
          </div>

          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {clientPartnersList.map((client, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center transition-all hover:border-[#36A853] hover:shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 mb-2 border border-slate-100">
                  <Building className="w-5 h-5 text-[#174B35]" />
                </div>
                <div className="text-xs font-bold text-slate-800 tracking-tight">
                  {client.name}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {client.industry}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION I: TESTIMONIALS */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
              Client Commendations
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-sm text-slate-600">
              Hear directly from Health, Safety, and Engineering directors who rely on SEEL's technical rigour and statutory dependability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.filter(t => t.approved).map(t => (
              <div
                key={t.id}
                className="p-8 rounded-2xl bg-[#F8FAF8] border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                  <div className="w-10 h-10 rounded-full bg-[#174B35] text-white flex items-center justify-center font-bold text-xs">
                    {t.clientName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{t.clientName}</div>
                    <div className="text-[11px] text-slate-500">
                      {t.role} {t.organization ? `· ${t.organization}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION J: CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-br from-[#174B35] to-[#0f3424] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sustainable Futures Begin With Professional Compliance</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
            Let's Build a Safer, Greener and More Sustainable Future.
          </h2>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Partner with SEEL for reliable environmental, engineering and technical solutions backed by statutory accreditations and proven East African track records.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('quote')}
              className="bg-[#E85B22] hover:bg-[#d64e17] text-white px-7 py-3.5 rounded-lg font-bold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              Request a Quote
            </button>
            <button
              onClick={() => navigate('contact')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-3.5 rounded-lg font-semibold text-sm transition-colors cursor-pointer"
            >
              Talk to Our Experts
            </button>
          </div>
        </div>
      </section>

      {/* SECTION K: CONTACT SECTION */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Info & Office details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
                  Direct Inquiries
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
                  Contact Our Technical Office
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Have a specific environmental audit, stack testing campaign, or geotechnical survey required? Reach out directly to our engineering desk.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-5 h-5 text-[#E85B22] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Physical Office</h4>
                    <p>{settings.officeAddress}</p>
                    <p className="text-slate-500 mt-1">{settings.postalAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Phone className="w-5 h-5 text-[#36A853] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Phone Hotline</h4>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="font-semibold text-slate-800 hover:text-[#E85B22]"
                    >
                      {settings.phone}
                    </a>
                    <p className="text-[11px] text-slate-500">Available Monday to Saturday</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Mail className="w-5 h-5 text-[#36A853] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                    <a
                      href={`mailto:${settings.email}`}
                      className="font-semibold text-slate-800 hover:text-[#E85B22]"
                    >
                      {settings.email}
                    </a>
                    <p className="text-[11px] text-slate-500">Fast response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-[#36A853] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Operating Hours</h4>
                    <p>{settings.workingHoursWeekday}</p>
                    <p>{settings.workingHoursSaturday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Inquiry Form */}
            <div className="lg:col-span-7 bg-[#F8FAF8] p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-[#174B35] mb-2">
                Send a Technical Inquiry
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Fill in the form below and an engineer will review your statutory compliance and testing requirements.
              </p>

              {submittedRef ? (
                <div className="p-6 bg-emerald-50 border border-[#36A853] rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-[#36A853] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#174B35]">Inquiry Received</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your inquiry has been successfully lodged in our technical desk database. An environmental engineer will review your requirements and follow up.
                  </p>
                  <button
                    onClick={() => setSubmittedRef(null)}
                    className="text-xs font-bold text-[#E85B22] hover:underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={quickForm.fullName}
                        onChange={e => setQuickForm({ ...quickForm, fullName: e.target.value })}
                        placeholder="e.g. Eng. Joseph Omondi"
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#36A853]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={quickForm.company}
                        onChange={e => setQuickForm({ ...quickForm, company: e.target.value })}
                        placeholder="e.g. Apex Industries Ltd"
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#36A853]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={quickForm.email}
                        onChange={e => setQuickForm({ ...quickForm, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#36A853]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={quickForm.phone}
                        onChange={e => setQuickForm({ ...quickForm, phone: e.target.value })}
                        placeholder="+254 700 000 000"
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#36A853]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Service Required *
                    </label>
                    <select
                      value={quickForm.serviceRequired}
                      onChange={e => setQuickForm({ ...quickForm, serviceRequired: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#36A853]"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Details / Inquiry Brief *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={quickForm.message}
                      onChange={e => setQuickForm({ ...quickForm, message: e.target.value })}
                      placeholder="Please specify project location, facility type, timelines, or specific statutory requirements..."
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#36A853]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[11px] text-slate-500">
                      Your details are securely transmitted to SEEL's engineering database.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#E85B22] hover:bg-[#d64e17] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? 'Submitting...' : 'Send Inquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
