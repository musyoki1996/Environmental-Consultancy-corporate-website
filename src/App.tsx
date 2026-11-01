import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { BackToTop } from './components/common/BackToTop';
import { CookieConsent } from './components/common/CookieConsent';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LegalPages } from './pages/LegalPages';
import { ArrowLeft, Compass } from 'lucide-react';

interface RouteState {
  route: string;
  param?: string;
}

export function App() {
  const [current, setCurrent] = useState<RouteState>(() => {
    // Read initial route from URL hash if available
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return { route: 'home' };
    const parts = hash.split('/');
    return {
      route: parts[0] || 'home',
      param: parts[1] || undefined
    };
  });

  const navigate = (route: string, param?: string) => {
    setCurrent({ route, param });
    const hash = param ? `#${route}/${param}` : `#${route}`;
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync back/forward button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setCurrent({ route: 'home' });
        return;
      }
      const parts = hash.split('/');
      setCurrent({
        route: parts[0] || 'home',
        param: parts[1] || undefined
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (current.route) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'about':
        return <AboutPage navigate={navigate} subSection={current.param} />;
      case 'services':
        return <ServicesPage navigate={navigate} />;
      case 'service-detail':
        return <ServiceDetailPage slug={current.param || 'environmental-consultancy'} navigate={navigate} />;
      case 'industries':
        return <IndustriesPage navigate={navigate} />;
      case 'industry-detail':
        return <IndustryDetailPage slug={current.param || 'pharmaceutical-industries'} navigate={navigate} />;
      case 'projects':
        return <ProjectsPage navigate={navigate} />;
      case 'project-detail':
        return <ProjectDetailPage slug={current.param || 'bamburi-cement-kiln-emissions'} navigate={navigate} />;
      case 'resources':
        return <ResourcesPage navigate={navigate} />;
      case 'article-detail':
        return <ArticleDetailPage slug={current.param || 'navigating-nema-air-quality-regulations-kenya'} navigate={navigate} />;
      case 'contact':
        return <ContactPage navigate={navigate} />;
      case 'quote':
        return <RequestQuotePage initialService={current.param} navigate={navigate} />;
      case 'admin':
        return <AdminDashboardPage navigate={navigate} />;
      case 'legal':
        return <LegalPages initialTab={current.param} navigate={navigate} />;
      default:
        return (
          <div className="py-28 px-4 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Compass className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-[#174B35]">Page Not Found</h1>
            <p className="text-xs text-slate-500">
              The requested page could not be located in SEEL's directory.
            </p>
            <button
              onClick={() => navigate('home')}
              className="bg-[#174B35] hover:bg-[#113827] text-white px-5 py-2.5 rounded-lg text-xs font-bold inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to SEEL Homepage</span>
            </button>
          </div>
        );
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col font-sans selection:bg-[#E85B22] selection:text-white">
        <Header currentRoute={current.route} navigate={navigate} />
        <main className="flex-1">{renderContent()}</main>
        <Footer navigate={navigate} />
        <WhatsAppButton />
        <BackToTop />
        <CookieConsent />
      </div>
    </AppProvider>
  );
}

export default App;
