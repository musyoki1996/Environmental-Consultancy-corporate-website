import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Shield,
  MessageSquare,
  Wind,
  HardHat,
  ArrowRight,
  Compass,
  FileCheck2,
  Building,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  FolderKanban,
  BookOpen,
  Users2,
  Layers,
  Building2,
  LayoutGrid,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string, param?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, navigate }) => {
  const { settings, services, industries, isAdmin } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for ESC key to close nav drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNavDrawerOpen(false);
        setServicesDropdownOpen(false);
        setAboutDropdownOpen(false);
        setIndustriesDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (route: string, param?: string) => {
    navigate(route, param);
    setNavDrawerOpen(false);
    setServicesDropdownOpen(false);
    setAboutDropdownOpen(false);
    setIndustriesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const cleanNumber = (settings.whatsapp || '+254726856602').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      'Hello SEEL, I would like to enquire about your environmental and engineering services. Kindly assist me.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const query = searchQuery.toLowerCase().trim();

  const allMainPages = [
    { route: 'home', label: 'Homepage', icon: Compass, desc: 'Overview, hero, services grid & corporate credentials', tags: 'home welcome overview hero' },
    { route: 'about', label: 'About Us', icon: Users2, desc: 'Company profile, vision, leadership & accreditations', tags: 'company team mission vision history credentials' },
    { route: 'services', label: 'All 13 Services', icon: Layers, desc: 'Complete directory of environmental & engineering capabilities', tags: 'environmental engineering laboratory stack air water eia noise' },
    { route: 'industries', label: 'Industries We Serve', icon: Building2, desc: 'Sector compliance for manufacturing, construction, energy & more', tags: 'sectors manufacturing construction energy aviation mining agriculture' },
    { route: 'projects', label: 'Projects & Case Studies', icon: FolderKanban, desc: 'Featured environmental audits & engineering projects across Kenya', tags: 'portfolio track record audits nairobi kenya clients' },
    { route: 'resources', label: 'Resources & Knowledge', icon: BookOpen, desc: 'EMCA regulations, compliance checklists & industry publications', tags: 'faqs downloads checklists nema doshs regulations articles' },
    { route: 'contact', label: 'Contact Us', icon: Mail, desc: 'Gateway Mall Nairobi offices, direct phone & official enquiry form', tags: 'get in touch office location gateway mall telephone email map' },
    { route: 'quote', label: 'Request a Quote', icon: FileCheck2, desc: 'Instant quotation scoping with formal tracking code', tags: 'request quote pricing proposal reference tracking estimate' },
  ];

  const filteredMainPages = query
    ? allMainPages.filter(p => p.label.toLowerCase().includes(query) || p.tags.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query))
    : allMainPages;

  const filteredServices = query
    ? services.filter(s => s.title.toLowerCase().includes(query) || (s.shortDescription && s.shortDescription.toLowerCase().includes(query)) || (s.category && s.category.toLowerCase().includes(query)))
    : services;

  const filteredIndustries = query
    ? industries.filter(i => i.name.toLowerCase().includes(query) || (i.challenges && i.challenges.toLowerCase().includes(query)))
    : industries;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 shadow-sm bg-white">
      {/* 1. TOP CORPORATE CONTACT & REGULATORY UTILITY BAR */}
      <div className="bg-[#174B35] text-white py-2 px-4 sm:px-8 border-b border-[#235840] text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Contact coordinates */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#36A853] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#36A853]" />
              <span className="font-semibold">{settings.phone}</span>
            </a>

            <a
              href={`mailto:${settings.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-[#36A853] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#36A853]" />
              <span>{settings.email}</span>
            </a>

            <span className="hidden lg:inline-block text-white/70">
              Gateway Mall, 4th Floor, Mombasa Rd, Nairobi
            </span>
          </div>

          {/* WhatsApp Direct Action & Accreditations in top bar */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleWhatsApp}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-3 py-1 rounded-md text-[11px] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Open WhatsApp Chat with SEEL"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp: {settings.phone}</span>
            </button>

            <span className="hidden xl:inline-flex items-center gap-1 text-white/80 text-[11px]">
              <Shield className="w-3.5 h-3.5 text-[#36A853]" />
              <span>NEMA Reg. Firm of Experts</span>
            </span>

            {isAdmin ? (
              <button
                onClick={() => handleNavClick('admin')}
                className="bg-[#E85B22] text-white px-2.5 py-0.5 rounded text-[11px] font-semibold hover:bg-[#d14b15] cursor-pointer"
              >
                Admin CMS
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('admin')}
                className="text-white/70 hover:text-white text-[11px] cursor-pointer"
              >
                Staff Portal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. CORPORATE IDENTITY & PRIMARY CTA BAR */}
      <div className="bg-white border-b border-slate-100 py-3 sm:py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Official SEEL Logo & Corporate Brand Lockup */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 sm:gap-4 cursor-pointer shrink-0 group"
          >
            <img
              src="/assets/aistudio/images__13__ac2b8989.jpeg"
              alt="Senior Environmental & Engineering Ltd Logo"
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#174B35] leading-none">
                SEEL
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide uppercase mt-0.5">
                Senior Environmental & Engineering Ltd
              </span>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Engineering Excellence · Environmental Responsibility · Sustainable Futures
              </span>
            </div>
          </div>

          {/* Right Header CTAs: Navigation Menu Icon + WhatsApp & Quote Request */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* NAVIGATION MENU ICON BUTTON (Opens Site Page Navigation on any device) */}
            <button
              onClick={() => setNavDrawerOpen(!navDrawerOpen)}
              className="bg-[#174B35] hover:bg-[#113827] text-white px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              title="Open Navigation Menu for all pages"
            >
              {navDrawerOpen ? (
                <X className="w-4 h-4 text-[#36A853]" />
              ) : (
                <Menu className="w-4 h-4 text-[#36A853]" />
              )}
              <span className="tracking-wide">Navigation Menu</span>
            </button>

            {/* WhatsApp Consultation Action Button */}
            <button
              onClick={handleWhatsApp}
              className="hidden md:flex bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200 items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </button>

            {/* Primary Request a Quote Button */}
            <button
              onClick={() => handleNavClick('quote')}
              className="bg-[#E85B22] hover:bg-[#d64e17] text-white text-xs sm:text-sm font-bold py-2.5 px-4 sm:px-5 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>

      {/* 3. DEDICATED NAVIGATION BAR WITH MENU ICON & DIRECT PAGE LINKS */}
      <nav className="w-full bg-[#F5F8F5] border-y border-slate-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-1.5 py-1.5 overflow-x-auto no-scrollbar">
            {/* NAVIGATION BAR MENU ICON BUTTON - Dedicated Menu Icon to Navigate Different Pages */}
            <div className="relative shrink-0 mr-1.5">
              <button
                onClick={() => setNavDrawerOpen(!navDrawerOpen)}
                className="bg-[#174B35] hover:bg-[#113827] text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs border border-[#235840] group shrink-0"
                title="Navigation bar menu icon: Open menu to navigate all pages of the website"
                aria-label="Open Navigation bar menu to navigate different pages"
              >
                <div className="w-4 h-4 rounded bg-[#235840] flex items-center justify-center text-[#36A853] group-hover:text-white transition-colors">
                  {navDrawerOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
                </div>
                <span className="font-bold tracking-tight">Pages Menu</span>
                <ChevronDown className="w-3 h-3 text-emerald-300 opacity-80" />
              </button>
            </div>

            {/* Page 1: Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                currentRoute === 'home'
                  ? 'bg-[#174B35] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#E85B22] hover:bg-white/80'
              }`}
            >
              <Compass className="w-3.5 h-3.5 opacity-80" />
              <span>Home</span>
            </button>

            {/* Page 2: About Us with Sub-pages Dropdown */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('about')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  currentRoute === 'about'
                    ? 'bg-[#174B35] text-white shadow-xs'
                    : 'text-slate-700 hover:text-[#E85B22] hover:bg-white/80'
                }`}
              >
                <Users2 className="w-3.5 h-3.5 opacity-80" />
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2.5 px-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => handleNavClick('about', 'profile')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#E85B22] rounded-lg transition-colors cursor-pointer"
                  >
                    Company Profile & History
                  </button>
                  <button
                    onClick={() => handleNavClick('about', 'vision')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#E85B22] rounded-lg transition-colors cursor-pointer"
                  >
                    Vision, Mission & Core Values
                  </button>
                  <button
                    onClick={() => handleNavClick('about', 'team')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#E85B22] rounded-lg transition-colors cursor-pointer"
                  >
                    Management & Technical Experts
                  </button>
                  <button
                    onClick={() => handleNavClick('about', 'certifications')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#E85B22] rounded-lg transition-colors cursor-pointer"
                  >
                    Accreditations & Quality Standards
                  </button>
                </div>
              )}
            </div>

            {/* Page 3: Services (13 Specialized Engineering Categories) with Mega Menu */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('services')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  currentRoute === 'services' || currentRoute === 'service-detail'
                    ? 'bg-[#174B35] text-white shadow-xs'
                    : 'text-slate-700 hover:text-[#E85B22] hover:bg-white/80'
                }`}
              >
                <Layers className="w-3.5 h-3.5 opacity-80" />
                <span>Services (13 Categories)</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-[720px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-2 gap-6 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div>
                    <div className="text-[11px] font-bold text-[#174B35] uppercase tracking-wider mb-2.5 flex items-center gap-1.5 pb-1.5 border-b border-slate-100">
                      <Wind className="w-3.5 h-3.5 text-[#36A853]" />
                      <span>Environmental & Air Quality</span>
                    </div>
                    <div className="space-y-1">
                      {services.slice(0, 6).map(s => (
                        <button
                          key={s.id}
                          onClick={() => handleNavClick('service-detail', s.slug)}
                          className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-[#E85B22] hover:bg-slate-50 rounded-md transition-colors block truncate cursor-pointer"
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-[#174B35] uppercase tracking-wider mb-2.5 flex items-center gap-1.5 pb-1.5 border-b border-slate-100">
                      <HardHat className="w-3.5 h-3.5 text-[#E85B22]" />
                      <span>Engineering & Laboratory</span>
                    </div>
                    <div className="space-y-1">
                      {services.slice(6).map(s => (
                        <button
                          key={s.id}
                          onClick={() => handleNavClick('service-detail', s.slug)}
                          className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-[#E85B22] hover:bg-slate-50 rounded-md transition-colors block truncate cursor-pointer"
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2 pt-3 mt-1 border-t border-slate-100 flex items-center justify-between bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <span className="text-xs text-slate-600">
                      Need custom sampling protocols or statutory NEMA consultation?
                    </span>
                    <button
                      onClick={() => handleNavClick('services')}
                      className="text-xs font-bold text-[#174B35] hover:text-[#E85B22] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore All 13 Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Page 4: Industries We Serve */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setIndustriesDropdownOpen(true)}
              onMouseLeave={() => setIndustriesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('industries')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  currentRoute === 'industries' || currentRoute === 'industry-detail'
                    ? 'bg-[#174B35] text-white shadow-xs'
                    : 'text-slate-700 hover:text-[#E85B22] hover:bg-white/80'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 opacity-80" />
                <span>Industries</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {industriesDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2.5 px-2 z-50 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  {industries.map(ind => (
                    <button
                      key={ind.id}
                      onClick={() => handleNavClick('industry-detail', ind.slug)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50 hover:text-[#E85B22] rounded-lg transition-colors truncate cursor-pointer"
                    >
                      {ind.name}
                    </button>
                  ))}
                  <div className="pt-2 mt-1 border-t border-slate-100 px-3">
                    <button
                      onClick={() => handleNavClick('industries')}
                      className="text-xs font-bold text-[#174B35] hover:text-[#E85B22] cursor-pointer"
                    >
                      Explore All Sectors →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Page 5: Projects & Case Studies */}
            <button
              onClick={() => handleNavClick('projects')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                currentRoute === 'projects' || currentRoute === 'project-detail'
                  ? 'bg-[#174B35] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#E85B22] hover:bg-white/80'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5 opacity-80" />
              <span>Projects & Case Studies</span>
            </button>

            {/* Page 6: Resources & Knowledge Centre */}
            <button
              onClick={() => handleNavClick('resources')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                currentRoute === 'resources' || currentRoute === 'article-detail'
                  ? 'bg-[#174B35] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#E85B22] hover:bg-white/80'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 opacity-80" />
              <span>Resources & Publications</span>
            </button>

            {/* Page 7: Contact Us */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                currentRoute === 'contact'
                  ? 'bg-[#174B35] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#E85B22] hover:bg-white/80'
              }`}
            >
              <Mail className="w-3.5 h-3.5 opacity-80" />
              <span>Contact Us</span>
            </button>

            {/* Page 8: Request a Quote Page */}
            <button
              onClick={() => handleNavClick('quote')}
              className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                currentRoute === 'quote'
                  ? 'bg-[#E85B22] text-white shadow-xs'
                  : 'text-[#E85B22] hover:bg-orange-50'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Request Quote</span>
            </button>
          </div>

          {/* Right indicator */}
          <div className="text-[11px] text-slate-500 font-medium hidden xl:flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#36A853]" />
            <span>Nairobi Office Open Mon–Sat</span>
          </div>
        </div>
      </nav>

      {/* 4. FULL-PAGE NAVIGATION MENU MODAL / DRAWER (Triggered by Navigation Menu Icon) */}
      {navDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0"
            onClick={() => setNavDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 bg-[#174B35] text-white flex items-center justify-between border-b border-[#235840]">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/images__13__ac2b8989.jpeg"
                  alt="SEEL"
                  className="w-10 h-10 object-contain rounded-full bg-white p-1"
                />
                <div>
                  <h3 className="font-extrabold text-base tracking-tight">Navigation Menu</h3>
                  <p className="text-xs text-emerald-300">Explore all SEEL pages & services</p>
                </div>
              </div>

              <button
                onClick={() => setNavDrawerOpen(false)}
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Live Search Bar for Instant Page Navigation */}
            <div className="px-6 pt-4 pb-2 border-b border-slate-100 bg-slate-50/50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages or services (e.g. EIA, stack, water, quote)..."
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#174B35] focus:ring-1 focus:ring-[#174B35] transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Body: Comprehensive Categorized Page Navigation */}
            <div className="p-6 space-y-8 flex-1">
              {/* Fast Direct Action Strip */}
              <div className="grid grid-cols-2 gap-3 pb-6 border-b border-slate-100">
                <button
                  onClick={handleWhatsApp}
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>WhatsApp Chat</span>
                </button>
                <button
                  onClick={() => handleNavClick('quote')}
                  className="bg-[#E85B22] hover:bg-[#d64e17] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center shadow-xs cursor-pointer"
                >
                  Request a Quote
                </button>
              </div>

              {/* Main Pages Section */}
              {filteredMainPages.length > 0 && (
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-[#E85B22] uppercase tracking-wider flex items-center justify-between">
                    <span>Primary Website Pages ({filteredMainPages.length})</span>
                    {searchQuery && <span className="text-slate-400 font-normal">Filtered</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {filteredMainPages.map(page => {
                      const Icon = page.icon;
                      return (
                        <button
                          key={page.route}
                          onClick={() => handleNavClick(page.route)}
                          className={`p-3 rounded-xl border text-left font-bold flex items-center justify-between transition-all cursor-pointer ${
                            currentRoute === page.route
                              ? 'bg-[#174B35] text-white border-[#174B35] shadow-xs'
                              : 'bg-[#F8FAF8] border-slate-200 text-slate-800 hover:border-[#36A853] hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-[#36A853]" />
                            <div>
                              <div className="font-bold">{page.label}</div>
                              <div className="text-[10px] text-slate-500 font-normal line-clamp-1">{page.desc}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0 ml-1" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All 13 Services Quick Navigation Directory */}
              {filteredServices.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-bold text-[#174B35] uppercase tracking-wider">
                      Specialized Services ({filteredServices.length})
                    </div>
                    <button
                      onClick={() => handleNavClick('services')}
                      className="text-xs font-semibold text-[#E85B22] hover:underline cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                    {filteredServices.map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleNavClick('service-detail', s.slug)}
                        className="text-left p-2 rounded-lg text-slate-700 hover:text-[#E85B22] hover:bg-slate-50 transition-colors truncate block font-medium cursor-pointer"
                      >
                        · {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Industries Directory */}
              {filteredIndustries.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-bold text-[#174B35] uppercase tracking-wider">
                      Industry Sectors ({filteredIndustries.length})
                    </div>
                    <button
                      onClick={() => handleNavClick('industries')}
                      className="text-xs font-semibold text-[#E85B22] hover:underline cursor-pointer"
                    >
                      All Sectors →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {filteredIndustries.map(ind => (
                      <button
                        key={ind.id}
                        onClick={() => handleNavClick('industry-detail', ind.slug)}
                        className="text-left p-2 rounded-lg text-slate-700 hover:text-[#E85B22] hover:bg-slate-50 transition-colors truncate block font-medium cursor-pointer"
                      >
                        · {ind.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty Search State */}
              {searchQuery && filteredMainPages.length === 0 && filteredServices.length === 0 && filteredIndustries.length === 0 && (
                <div className="text-center py-8 px-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-slate-800">No matching pages found</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Try searching for common terms like "EIA", "Stack", "Noise", "Soil", "Audit", or "Contact".
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 px-4 py-1.5 bg-[#174B35] text-white text-xs font-bold rounded-lg hover:bg-[#113827] cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer Coordinates */}
            <div className="p-6 bg-[#F8FAF8] border-t border-slate-200 text-xs space-y-3">
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold">Direct Telephone:</span>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="font-bold text-[#174B35] hover:text-[#E85B22]"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold">Official Email:</span>
                <a
                  href={`mailto:${settings.email}`}
                  className="font-bold text-[#174B35] hover:text-[#E85B22]"
                >
                  {settings.email}
                </a>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>NEMA Kenya Reg. Firm of Experts</span>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="text-[#174B35] font-bold hover:underline"
                >
                  {isAdmin ? 'Admin Console' : 'Staff Login'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
