import React, { useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  FileSpreadsheet,
  FolderKanban,
  Sliders,
  LogOut,
  Lock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit3,
  Plus,
  RefreshCw,
  Star,
  Users,
  Settings,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';

interface AdminDashboardPageProps {
  navigate: (route: string, param?: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigate }) => {
  const {
    isAdmin,
    adminUser,
    login,
    logout,
    settings,
    updateSettings,
    enquiries,
    updateEnquiryStatus,
    deleteEnquiry,
    quotes,
    updateQuoteStatus,
    deleteQuote,
    projects,
    createProject,
    deleteProject,
    testimonials,
    approveTestimonial,
    deleteTestimonial,
    articles,
    createArticle,
    resetDatabase,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'enquiries' | 'quotes' | 'projects' | 'testimonials' | 'articles' | 'settings'
  >('overview');

  // Login form state
  const [emailInput, setEmailInput] = useState('admin@seniorenv.com');
  const [passwordInput, setPasswordInput] = useState('SeniorEnv2025!');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);

  // New Project form state
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Stack Emissions Testing',
    location: 'Nairobi, Kenya',
    client: '',
    year: new Date().getFullYear().toString(),
    description: '',
    scopeOfWorkText: '',
    outcomes: '',
    image: '/src/assets/images/service_air_quality_stack_1793480529106.jpg',
    featured: true
  });

  // New Article form state
  const [showNewArticleModal, setShowNewArticleModal] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Regulatory Updates',
    summary: '',
    content: '',
    author: 'SEEL Lead Technical Assessor',
    image: '/src/assets/images/hero_environmental_engineering_1793480528430.jpg',
    tagsText: 'NEMA, Compliance, Air Quality',
    readTime: '5 min read'
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    const res = await login(emailInput, passwordInput);
    setLoginLoading(false);
    if (!res.success) {
      setLoginError(res.error || 'Invalid credentials');
    }
  };

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(settingsForm);
  };

  const handleCreateProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const scopes = newProject.scopeOfWorkText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const slug = newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await createProject({
      slug,
      title: newProject.title,
      category: newProject.category,
      location: newProject.location,
      client: newProject.client || 'Corporate Client',
      year: newProject.year,
      description: newProject.description,
      scopeOfWork: scopes,
      outcomes: newProject.outcomes,
      image: newProject.image,
      featured: newProject.featured
    });
    setShowNewProjectModal(false);
    setNewProject({
      title: '',
      category: 'Stack Emissions Testing',
      location: 'Nairobi, Kenya',
      client: '',
      year: new Date().getFullYear().toString(),
      description: '',
      scopeOfWorkText: '',
      outcomes: '',
      image: '/src/assets/images/service_air_quality_stack_1793480529106.jpg',
      featured: true
    });
  };

  const handleCreateArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = newArticle.tagsText.split(',').map(t => t.trim()).filter(Boolean);
    const slug = newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await createArticle({
      slug,
      title: newArticle.title,
      category: newArticle.category,
      summary: newArticle.summary,
      content: newArticle.content,
      author: newArticle.author,
      image: newArticle.image,
      tags,
      readTime: newArticle.readTime
    });
    setShowNewArticleModal(false);
  };

  // Login Gate
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#F8FAF8]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
              <Lock className="w-7 h-7 text-[#174B35]" />
            </div>
            <h2 className="text-2xl font-bold text-[#174B35]">SEEL Admin Portal</h2>
            <p className="text-xs text-slate-500">
              Authorized access to corporate database, quotation triage, and content management.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Administrator Email</label>
              <input
                type="text"
                required
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
              />
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-[#174B35]">Pre-configured Admin Credentials:</div>
              <div>Email: <code className="bg-white px-1.5 py-0.5 rounded border">admin@seniorenv.com</code></div>
              <div>Password: <code className="bg-white px-1.5 py-0.5 rounded border">SeniorEnv2025!</code></div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#174B35] hover:bg-[#113827] text-white py-3 rounded-xl font-bold text-xs transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="w-full min-h-screen bg-[#F4F6F4] flex flex-col">
      {/* Admin Top Bar */}
      <div className="bg-[#174B35] text-white py-3 px-6 sm:px-8 border-b border-[#235840] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/images__13__ac2b8989.jpeg"
            alt="SEEL"
            className="w-8 h-8 rounded-full bg-white p-0.5 object-contain"
          />
          <div>
            <h1 className="font-extrabold text-sm tracking-tight">SEEL Management System</h1>
            <p className="text-[10px] text-emerald-300">
              Logged in as {adminUser?.name || 'Administrator'} · {adminUser?.role || 'Super Admin'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => navigate('home')}
            className="text-slate-300 hover:text-white flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>
          <button
            onClick={logout}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'enquiries', label: `Inquiries (${enquiries.length})`, icon: Inbox },
            { id: 'quotes', label: `Quote Requests (${quotes.length})`, icon: FileSpreadsheet },
            { id: 'projects', label: `Projects (${projects.length})`, icon: FolderKanban },
            { id: 'testimonials', label: `Testimonials (${testimonials.length})`, icon: Star },
            { id: 'articles', label: `Articles (${articles.length})`, icon: BookOpen },
            { id: 'settings', label: 'Company Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#174B35] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase">Incoming Inquiries</div>
                <div className="text-3xl font-extrabold text-[#174B35]">{enquiries.length}</div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  {enquiries.filter(e => e.status === 'new').length} new unaddressed
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase">Formal Quote Requests</div>
                <div className="text-3xl font-extrabold text-[#E85B22]">{quotes.length}</div>
                <div className="text-[11px] text-amber-600 font-semibold">
                  {quotes.filter(q => q.status === 'pending').length} pending appraisal
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase">Published Projects</div>
                <div className="text-3xl font-extrabold text-slate-800">{projects.length}</div>
                <div className="text-[11px] text-slate-500 font-medium">All categorized</div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase">Client Testimonials</div>
                <div className="text-3xl font-extrabold text-[#36A853]">{testimonials.length}</div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  {testimonials.filter(t => t.approved).length} approved & live
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Inquiries Preview */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#174B35]">Latest Contact Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-[#E85B22] font-semibold hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {enquiries.slice(0, 4).map(e => (
                    <div
                      key={e.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{e.fullName} ({e.company})</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          e.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {e.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-slate-500">{e.serviceRequired} · {e.phone}</div>
                      <p className="text-slate-700 line-clamp-1 italic">"{e.message}"</p>
                    </div>
                  ))}
                  {enquiries.length === 0 && (
                    <p className="text-xs text-slate-400 py-4 text-center">No inquiries logged yet.</p>
                  )}
                </div>
              </div>

              {/* Recent Quotation Requests Preview */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#174B35]">Recent Quotation Requests</h3>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="text-xs text-[#E85B22] font-semibold hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {quotes.slice(0, 4).map(q => (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#E85B22]">{q.referenceNo}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                          {q.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="font-bold text-slate-800">{q.fullName} · {q.company}</div>
                      <div className="text-slate-500">{q.serviceRequested} · {q.projectLocation}</div>
                      <p className="text-slate-700 line-clamp-1">{q.projectScope}</p>
                    </div>
                  ))}
                  {quotes.length === 0 && (
                    <p className="text-xs text-slate-400 py-4 text-center">No quotation requests logged yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Database management tools */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Database Synchronization</h4>
                <p className="text-xs text-slate-500">
                  Reset the persistent database to the official verified SEEL seed dataset anytime.
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all data back to the default verified records?')) {
                    resetDatabase();
                  }
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                <span>Reset to Verified Seed Data</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Enquiries Management */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#174B35]">Contact Inquiries ({enquiries.length})</h3>
                <p className="text-xs text-slate-500">Live submissions recorded through the website contact forms.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {enquiries.map(enq => (
                <div key={enq.id} className="py-4 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-slate-900">{enq.fullName}</span>
                      <span className="text-slate-500">({enq.company})</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={enq.status}
                        onChange={e => updateEnquiryStatus(enq.id, e.target.value as any)}
                        className={`font-semibold rounded px-2 py-1 text-[11px] border ${
                          enq.status === 'new'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : enq.status === 'contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>

                      <button
                        onClick={() => deleteEnquiry(enq.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                    <div><strong>Email:</strong> <a href={`mailto:${enq.email}`} className="text-[#174B35] underline">{enq.email}</a></div>
                    <div><strong>Phone:</strong> <a href={`tel:${enq.phone}`} className="text-[#174B35] underline">{enq.phone}</a></div>
                    <div><strong>Service:</strong> {enq.serviceRequired}</div>
                  </div>

                  <p className="text-slate-800 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                    {enq.message}
                  </p>
                </div>
              ))}

              {enquiries.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No inquiries received yet. Submissions from the contact form will appear here.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Quotes Management */}
        {activeTab === 'quotes' && (
          <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#174B35]">Formal Quotation Requests ({quotes.length})</h3>
                <p className="text-xs text-slate-500">Client procurement requests with official reference numbers.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {quotes.map(q => (
                <div key={q.id} className="py-5 space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm bg-orange-50 text-[#E85B22] border border-orange-200 px-2.5 py-1 rounded-md">
                        {q.referenceNo}
                      </span>
                      <span className="font-bold text-sm text-slate-900">{q.fullName}</span>
                      <span className="text-slate-500">({q.company})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={q.status}
                        onChange={e => updateQuoteStatus(q.id, e.target.value as any)}
                        className="font-semibold rounded px-2.5 py-1 text-[11px] bg-slate-50 border border-slate-300"
                      >
                        <option value="pending">Pending</option>
                        <option value="assessing">Assessing</option>
                        <option value="quoted">Quoted</option>
                        <option value="closed">Closed</option>
                      </select>

                      <button
                        onClick={() => deleteQuote(q.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Delete Quote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px]">
                    <div><span className="text-slate-400 block">Service:</span> <strong className="text-[#174B35]">{q.serviceRequested}</strong></div>
                    <div><span className="text-slate-400 block">Location:</span> <strong>{q.projectLocation}</strong></div>
                    <div><span className="text-slate-400 block">Timeline:</span> <strong>{q.estimatedTimeline}</strong></div>
                    <div><span className="text-slate-400 block">Budget Mode:</span> <strong>{q.budgetRange}</strong></div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
                    <span className="font-bold text-slate-900 block text-[11px] mb-1">Scope & Specifications:</span>
                    {q.projectScope}
                    {q.attachmentsNote && (
                      <div className="mt-2 text-[11px] text-slate-500">
                        <strong>Attachment Note:</strong> {q.attachmentsNote}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {quotes.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No quotation requests in queue.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Projects Management */}
        {activeTab === 'projects' && (
          <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#174B35]">Manage Portfolio Projects ({projects.length})</h3>
                <p className="text-xs text-slate-500">Add, edit, or remove engineering and environmental case studies.</p>
              </div>

              <button
                onClick={() => setShowNewProjectModal(true)}
                className="bg-[#174B35] hover:bg-[#113827] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {projects.map(proj => (
                <div key={proj.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-4">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-16 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-sm text-slate-900">{proj.title}</div>
                      <div className="text-slate-500">{proj.client} · {proj.location} · {proj.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => navigate('project-detail', proj.slug)}
                      className="text-[#174B35] hover:underline font-semibold"
                    >
                      View Live
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Testimonials Management */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#174B35]">Client Testimonials ({testimonials.length})</h3>
                <p className="text-xs text-slate-500">Approve or manage customer commendations before they appear on the homepage.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {testimonials.map(t => (
                <div key={t.id} className="py-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-900">{t.clientName}</span>
                      <span className="text-slate-500 ml-2">({t.role} · {t.organization})</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => approveTestimonial(t.id, !t.approved)}
                        className={`px-3 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                          t.approved
                            ? 'bg-emerald-100 text-[#174B35] hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        {t.approved ? 'Approved (Live)' : 'Pending Approval'}
                      </button>

                      <button
                        onClick={() => deleteTestimonial(t.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="italic text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    "{t.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Articles Management */}
        {activeTab === 'articles' && (
          <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#174B35]">Knowledge Centre Articles ({articles.length})</h3>
                <p className="text-xs text-slate-500">Publish statutory insights, guidelines, and technical publications.</p>
              </div>

              <button
                onClick={() => setShowNewArticleModal(true)}
                className="bg-[#174B35] hover:bg-[#113827] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Article</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {articles.map(art => (
                <div key={art.id} className="py-4 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{art.title}</h4>
                    <p className="text-slate-500">{art.category} · By {art.author} · {art.publishedAt}</p>
                  </div>
                  <button
                    onClick={() => navigate('article-detail', art.slug)}
                    className="text-[#174B35] hover:underline font-semibold"
                  >
                    Read
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Website Settings & KPIs */}
        {activeTab === 'settings' && (
          <div className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-xs animate-in fade-in duration-200">
            <div>
              <h3 className="font-bold text-base text-[#174B35]">Corporate Metadata & Editable KPI Statistics</h3>
              <p className="text-xs text-slate-500">
                Update the official phone number, address, email, and performance statistics published across the website.
              </p>
            </div>

            <form onSubmit={handleSettingsSave} className="space-y-6 text-xs">
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase text-[#E85B22] tracking-wider">Performance Indicators (KPIs)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Projects Completed</label>
                    <input
                      type="text"
                      value={settingsForm.statProjectsCompleted}
                      onChange={e => setSettingsForm({ ...settingsForm, statProjectsCompleted: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Years of Experience</label>
                    <input
                      type="text"
                      value={settingsForm.statYearsExperience}
                      onChange={e => setSettingsForm({ ...settingsForm, statYearsExperience: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Satisfied Clients</label>
                    <input
                      type="text"
                      value={settingsForm.statSatisfiedClients}
                      onChange={e => setSettingsForm({ ...settingsForm, statSatisfiedClients: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-xs uppercase text-[#E85B22] tracking-wider">Contact & Office Coordinates</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official Telephone</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={e => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={e => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Postal Address</label>
                    <input
                      type="text"
                      value={settingsForm.postalAddress}
                      onChange={e => setSettingsForm({ ...settingsForm, postalAddress: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Physical Office Address</label>
                  <input
                    type="text"
                    value={settingsForm.officeAddress}
                    onChange={e => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:bg-white focus:border-[#36A853]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-[#174B35] hover:bg-[#113827] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow transition-colors cursor-pointer"
                >
                  Save Settings & Update Site
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Modal: Add New Project */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-lg font-bold text-[#174B35]">Publish New Project</h3>
            <form onSubmit={handleCreateProjectSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. Isokinetic Stack Testing for Manufacturing Boiler"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:bg-white focus:border-[#36A853]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={newProject.category}
                    onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                  >
                    <option value="Stack Emissions Testing">Stack Emissions Testing</option>
                    <option value="Environmental Impact Assessments">Environmental Impact Assessments</option>
                    <option value="Noise and Vibration Monitoring">Noise and Vibration Monitoring</option>
                    <option value="Geotechnical Investigations">Geotechnical Investigations</option>
                    <option value="Environmental Audits">Environmental Audits</option>
                    <option value="Industrial Energy Audits">Industrial Energy Audits</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newProject.client}
                    onChange={e => setNewProject({ ...newProject, client: e.target.value })}
                    placeholder="e.g. KenGen / Bamburi Cement"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Site Location *</label>
                  <input
                    type="text"
                    required
                    value={newProject.location}
                    onChange={e => setNewProject({ ...newProject, location: e.target.value })}
                    placeholder="e.g. Mombasa, Kenya"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Completion Year</label>
                  <input
                    type="text"
                    value={newProject.year}
                    onChange={e => setNewProject({ ...newProject, year: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Description *</label>
                <textarea
                  required
                  rows={3}
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Comprehensive description of the engineering and environmental challenges..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Scope of Work (one item per line)</label>
                <textarea
                  rows={3}
                  value={newProject.scopeOfWorkText}
                  onChange={e => setNewProject({ ...newProject, scopeOfWorkText: e.target.value })}
                  placeholder="Isokinetic particulate sampling&#10;Flue gas analysis&#10;Compliance certification"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Verified Outcomes / Value</label>
                <input
                  type="text"
                  value={newProject.outcomes}
                  onChange={e => setNewProject({ ...newProject, outcomes: e.target.value })}
                  placeholder="e.g. Achieved 100% compliance with NEMA statutory emission limits."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#174B35] hover:bg-[#113827] text-white px-5 py-2 rounded-lg font-bold"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Article */}
      {showNewArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-lg font-bold text-[#174B35]">Publish Article in Knowledge Centre</h3>
            <form onSubmit={handleCreateArticleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={newArticle.title}
                  onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
                  placeholder="e.g. Best Practices for NEMA Stack Emission Testing in 2026"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newArticle.category}
                    onChange={e => setNewArticle({ ...newArticle, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                  >
                    <option value="Regulatory Updates">Regulatory Updates</option>
                    <option value="Technical Publications">Technical Publications</option>
                    <option value="Environmental Insights">Environmental Insights</option>
                    <option value="Case Studies">Case Studies</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={newArticle.author}
                    onChange={e => setNewArticle({ ...newArticle, author: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Summary / Executive Abstract *</label>
                <textarea
                  required
                  rows={2}
                  value={newArticle.summary}
                  onChange={e => setNewArticle({ ...newArticle, summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Article Body *</label>
                <textarea
                  required
                  rows={5}
                  value={newArticle.content}
                  onChange={e => setNewArticle({ ...newArticle, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newArticle.tagsText}
                  onChange={e => setNewArticle({ ...newArticle, tagsText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewArticleModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#174B35] hover:bg-[#113827] text-white px-5 py-2 rounded-lg font-bold"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
