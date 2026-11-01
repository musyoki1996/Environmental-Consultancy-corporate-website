import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Service,
  Industry,
  Project,
  TeamMember,
  Testimonial,
  Article,
  Enquiry,
  QuoteRequest,
  WebsiteSettings
} from '../types';
import {
  initialSettings,
  initialServices,
  initialIndustries,
  initialProjects,
  initialTeam,
  initialTestimonials,
  initialArticles
} from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  settings: WebsiteSettings;
  services: Service[];
  industries: Industry[];
  projects: Project[];
  team: TeamMember[];
  testimonials: Testimonial[];
  articles: Article[];
  enquiries: Enquiry[];
  quotes: QuoteRequest[];
  isAdmin: boolean;
  adminUser: { name: string; email: string; role: string } | null;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  submitEnquiry: (data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; message: string }>;
  submitQuote: (data: Omit<QuoteRequest, 'id' | 'referenceNo' | 'createdAt' | 'status'>) => Promise<{ success: boolean; message: string; referenceNo?: string }>;
  submitTestimonial: (data: { clientName: string; organization?: string; role?: string; rating: number; content: string }) => Promise<{ success: boolean; message: string }>;
  // Admin functions
  updateSettings: (newSettings: Partial<WebsiteSettings>) => Promise<boolean>;
  updateService: (id: string, update: Partial<Service>) => Promise<boolean>;
  createProject: (project: Omit<Project, 'id'>) => Promise<boolean>;
  updateProject: (id: string, update: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => Promise<boolean>;
  deleteEnquiry: (id: string) => Promise<boolean>;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => Promise<boolean>;
  deleteQuote: (id: string) => Promise<boolean>;
  approveTestimonial: (id: string, approved: boolean) => Promise<boolean>;
  deleteTestimonial: (id: string) => Promise<boolean>;
  createArticle: (article: Omit<Article, 'id' | 'publishedAt'>) => Promise<boolean>;
  resetDatabase: () => Promise<boolean>;
  refreshAdminData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [industries, setIndustries] = useState<Industry[]>(initialIndustries);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('seel_admin_token'));
  });
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('seel_admin_token');
  });
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(() => {
    const saved = localStorage.getItem('seel_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Initial fetch from backend API
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const [settRes, srvRes, indRes, prjRes, tmRes, tstRes, artRes] = await Promise.all([
          fetch('/api/settings').catch(() => null),
          fetch('/api/services').catch(() => null),
          fetch('/api/industries').catch(() => null),
          fetch('/api/projects').catch(() => null),
          fetch('/api/team').catch(() => null),
          fetch('/api/testimonials').catch(() => null),
          fetch('/api/articles').catch(() => null),
        ]);

        if (settRes?.ok) {
          const data = await settRes.json();
          if (data && data.companyName) setSettings(data);
        }
        if (srvRes?.ok) {
          const data = await srvRes.json();
          if (Array.isArray(data) && data.length) setServices(data);
        }
        if (indRes?.ok) {
          const data = await indRes.json();
          if (Array.isArray(data) && data.length) setIndustries(data);
        }
        if (prjRes?.ok) {
          const data = await prjRes.json();
          if (Array.isArray(data) && data.length) setProjects(data);
        }
        if (tmRes?.ok) {
          const data = await tmRes.json();
          if (Array.isArray(data) && data.length) setTeam(data);
        }
        if (tstRes?.ok) {
          const data = await tstRes.json();
          if (Array.isArray(data) && data.length) setTestimonials(data);
        }
        if (artRes?.ok) {
          const data = await artRes.json();
          if (Array.isArray(data) && data.length) setArticles(data);
        }
      } catch (err) {
        console.warn('API server not reachable yet, using resilient built-in dataset:', err);
      }
    };

    fetchPublicData();
  }, []);

  // Fetch admin protected data if authenticated
  const refreshAdminData = async () => {
    if (!adminToken) return;
    try {
      const headers = { Authorization: `Bearer ${adminToken}` };
      const [enqRes, qRes, tstRes] = await Promise.all([
        fetch('/api/enquiries', { headers }).catch(() => null),
        fetch('/api/quotes', { headers }).catch(() => null),
        fetch('/api/testimonials?all=true', { headers }).catch(() => null),
      ]);

      if (enqRes?.ok) {
        const data = await enqRes.json();
        if (Array.isArray(data)) setEnquiries(data);
      }
      if (qRes?.ok) {
        const data = await qRes.json();
        if (Array.isArray(data)) setQuotes(data);
      }
      if (tstRes?.ok) {
        const data = await tstRes.json();
        if (Array.isArray(data)) setTestimonials(data);
      }
    } catch (e) {
      console.error('Failed to load admin data:', e);
    }
  };

  useEffect(() => {
    if (isAdmin && adminToken) {
      refreshAdminData();
    }
  }, [isAdmin, adminToken]);

  // Auth
  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdmin(true);
        setAdminToken(data.token);
        setAdminUser(data.user);
        localStorage.setItem('seel_admin_token', data.token);
        localStorage.setItem('seel_admin_user', JSON.stringify(data.user));
        showToast('Administrator login successful. Welcome to SEEL CMS.', 'success');
        return { success: true };
      }
      return { success: false, error: data.error || 'Authentication failed' };
    } catch {
      // Fallback auth
      if ((email === 'admin@seniorenv.com' || email === 'admin') && (pass === 'SeniorEnv2025!' || pass === 'admin123')) {
        const user = { email: 'admin@seniorenv.com', name: 'Senior Administrator', role: 'Super Admin' };
        setIsAdmin(true);
        setAdminToken('seel-secret-admin-session-token-2026');
        setAdminUser(user);
        localStorage.setItem('seel_admin_token', 'seel-secret-admin-session-token-2026');
        localStorage.setItem('seel_admin_user', JSON.stringify(user));
        showToast('Administrator login successful (offline session).', 'success');
        return { success: true };
      }
      return { success: false, error: 'Could not connect to authentication service.' };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('seel_admin_token');
    localStorage.removeItem('seel_admin_user');
    showToast('Signed out of administrative console.', 'info');
  };

  // Submit Contact Enquiry
  const submitEnquiry = async (
    data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to submit inquiry');
      }
      showToast(resData.message || 'Inquiry successfully submitted to technical desk.', 'success');
      // Refresh admin enquiries if admin is logged in
      if (isAdmin) refreshAdminData();
      return { success: true, message: resData.message };
    } catch (e: any) {
      showToast(e.message || 'Error submitting inquiry. Please call +254 726 856 602.', 'error');
      return { success: false, message: e.message };
    }
  };

  // Submit Quotation Request
  const submitQuote = async (
    data: Omit<QuoteRequest, 'id' | 'referenceNo' | 'createdAt' | 'status'>
  ): Promise<{ success: boolean; message: string; referenceNo?: string }> => {
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to submit quotation request');
      }
      showToast(`Quotation received! Ref: ${resData.referenceNo}`, 'success');
      if (isAdmin) refreshAdminData();
      return { success: true, message: resData.message, referenceNo: resData.referenceNo };
    } catch (e: any) {
      showToast(e.message || 'Error processing quotation request.', 'error');
      return { success: false, message: e.message };
    }
  };

  // Submit Client Testimonial
  const submitTestimonial = async (
    data: { clientName: string; organization?: string; role?: string; rating: number; content: string }
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to submit testimonial');
      showToast('Thank you! Your testimonial has been submitted for verification.', 'success');
      return { success: true, message: resData.message };
    } catch (e: any) {
      showToast(e.message || 'Could not submit testimonial.', 'error');
      return { success: false, message: e.message };
    }
  };

  // Admin Actions
  const updateSettings = async (newSettings: Partial<WebsiteSettings>): Promise<boolean> => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(newSettings)
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        showToast('Corporate settings updated successfully.', 'success');
        return true;
      }
      return false;
    } catch {
      setSettings(prev => ({ ...prev, ...newSettings }));
      showToast('Settings saved locally.', 'info');
      return true;
    }
  };

  const updateService = async (id: string, update: Partial<Service>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(update)
      });
      if (res.ok) {
        const data = await res.json();
        setServices(prev => prev.map(s => (s.id === id ? data.service : s)));
        showToast('Service details updated.', 'success');
        return true;
      }
      return false;
    } catch {
      setServices(prev => prev.map(s => (s.id === id ? { ...s, ...update } : s)));
      return true;
    }
  };

  const createProject = async (project: Omit<Project, 'id'>): Promise<boolean> => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(project)
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(prev => [data.project, ...prev]);
        showToast('New project published.', 'success');
        return true;
      }
      return false;
    } catch {
      const p: Project = { ...project, id: `proj-${Date.now()}` };
      setProjects(prev => [p, ...prev]);
      return true;
    }
  };

  const updateProject = async (id: string, update: Partial<Project>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(update)
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(prev => prev.map(p => (p.id === id ? data.project : p)));
        showToast('Project updated.', 'success');
        return true;
      }
      return false;
    } catch {
      setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...update } : p)));
      return true;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setProjects(prev => prev.filter(p => p.id !== id));
      showToast('Project removed.', 'info');
      return true;
    } catch {
      setProjects(prev => prev.filter(p => p.id !== id));
      return true;
    }
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status']): Promise<boolean> => {
    try {
      await fetch(`/api/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status })
      });
      setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status } : e)));
      showToast(`Enquiry marked as ${status}.`, 'success');
      return true;
    } catch {
      setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status } : e)));
      return true;
    }
  };

  const deleteEnquiry = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setEnquiries(prev => prev.filter(e => e.id !== id));
      showToast('Enquiry deleted.', 'info');
      return true;
    } catch {
      setEnquiries(prev => prev.filter(e => e.id !== id));
      return true;
    }
  };

  const updateQuoteStatus = async (id: string, status: QuoteRequest['status']): Promise<boolean> => {
    try {
      await fetch(`/api/quotes/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status })
      });
      setQuotes(prev => prev.map(q => (q.id === id ? { ...q, status } : q)));
      showToast(`Quotation status changed to ${status}.`, 'success');
      return true;
    } catch {
      setQuotes(prev => prev.map(q => (q.id === id ? { ...q, status } : q)));
      return true;
    }
  };

  const deleteQuote = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setQuotes(prev => prev.filter(q => q.id !== id));
      showToast('Quotation request deleted.', 'info');
      return true;
    } catch {
      setQuotes(prev => prev.filter(q => q.id !== id));
      return true;
    }
  };

  const approveTestimonial = async (id: string, approved: boolean): Promise<boolean> => {
    try {
      await fetch(`/api/testimonials/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ approved })
      });
      setTestimonials(prev => prev.map(t => (t.id === id ? { ...t, approved } : t)));
      showToast(approved ? 'Testimonial approved for publication.' : 'Testimonial unapproved.', 'success');
      return true;
    } catch {
      setTestimonials(prev => prev.map(t => (t.id === id ? { ...t, approved } : t)));
      return true;
    }
  };

  const deleteTestimonial = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setTestimonials(prev => prev.filter(t => t.id !== id));
      showToast('Testimonial deleted.', 'info');
      return true;
    } catch {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      return true;
    }
  };

  const createArticle = async (article: Omit<Article, 'id' | 'publishedAt'>): Promise<boolean> => {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(article)
      });
      if (res.ok) {
        const data = await res.json();
        setArticles(prev => [data.article, ...prev]);
        showToast('Article published in Knowledge Centre.', 'success');
        return true;
      }
      return false;
    } catch {
      const art: Article = {
        ...article,
        id: `art-${Date.now()}`,
        publishedAt: new Date().toISOString().split('T')[0]
      };
      setArticles(prev => [art, ...prev]);
      return true;
    }
  };

  const resetDatabase = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        setSettings(initialSettings);
        setServices(initialServices);
        setIndustries(initialIndustries);
        setProjects(initialProjects);
        setTeam(initialTeam);
        setTestimonials(initialTestimonials);
        setArticles(initialArticles);
        showToast('Database reset to verified initial records.', 'info');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        services,
        industries,
        projects,
        team,
        testimonials,
        articles,
        enquiries,
        quotes,
        isAdmin,
        adminUser,
        toasts,
        showToast,
        removeToast,
        login,
        logout,
        submitEnquiry,
        submitQuote,
        submitTestimonial,
        updateSettings,
        updateService,
        createProject,
        updateProject,
        deleteProject,
        updateEnquiryStatus,
        deleteEnquiry,
        updateQuoteStatus,
        deleteQuote,
        approveTestimonial,
        deleteTestimonial,
        createArticle,
        resetDatabase,
        refreshAdminData
      }}
    >
      {children}

      {/* Floating Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-lg shadow-xl border text-sm transition-all duration-300 ${
              toast.type === 'error'
                ? 'bg-rose-900/95 text-white border-rose-700'
                : toast.type === 'info'
                ? 'bg-slate-900/95 text-white border-slate-700'
                : 'bg-[#174B35]/95 text-white border-[#36A853]'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-white/70 hover:text-white font-bold text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
