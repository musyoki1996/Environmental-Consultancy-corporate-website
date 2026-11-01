import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Building,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ContactPageProps {
  navigate: (route: string, param?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const { settings, services, submitEnquiry } = useApp();

  const [form, setForm] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: 'Kenya',
    serviceRequired: 'Environmental Consultancy',
    projectLocation: '',
    subject: '',
    message: '',
    attachmentNote: '',
    mathAnswer: '',
  });

  const [captchaNum1] = useState(4);
  const [captchaNum2] = useState(7);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ id: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Spam protection check
    if (parseInt(form.mathAnswer.trim(), 10) !== captchaNum1 + captchaNum2) {
      setErrorMsg(`Verification failed: Please answer ${captchaNum1} + ${captchaNum2} correctly.`);
      return;
    }

    setSubmitting(true);
    const fullMessage = `${form.message}${form.attachmentNote ? `\n[Note regarding attachments: ${form.attachmentNote}]` : ''}`;

    const res = await submitEnquiry({
      fullName: form.fullName,
      company: form.company,
      email: form.email,
      phone: form.phone,
      country: form.country,
      serviceRequired: form.serviceRequired,
      projectLocation: form.projectLocation || 'Kenya',
      subject: form.subject || `Inquiry: ${form.serviceRequired}`,
      message: fullMessage
    });

    setSubmitting(false);

    if (res.success) {
      setConfirmation({
        id: `ENQ-${Date.now().toString().slice(-5)}`,
        message: res.message
      });
      setForm({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        country: 'Kenya',
        serviceRequired: 'Environmental Consultancy',
        projectLocation: '',
        subject: '',
        message: '',
        attachmentNote: '',
        mathAnswer: ''
      });
    } else {
      setErrorMsg(res.message || 'Submission failed. Please check network connection or call us directly.');
    }
  };

  const handleWhatsApp = () => {
    const clean = (settings.whatsapp || '+254726856602').replace(/[^0-9]/g, '');
    const text = encodeURIComponent('Hello SEEL, I would like to enquire about your environmental and engineering services. Kindly assist me.');
    window.open(`https://wa.me/${clean}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Hero Header */}
      <section className="py-20 lg:py-24 bg-[#174B35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
            Client & Regulatory Liaison
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Contact Technical Desk
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            Reach out to Senior Environmental & Engineering Ltd for statutory environmental audits, isokinetic stack emissions testing, acoustic monitoring, or geotechnical drilling inquiries.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 5 Columns: Corporate Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-[#174B35]">Corporate Headquarters</h2>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#E85B22] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Physical Office</h4>
                      <p className="mt-0.5 leading-relaxed">{settings.officeAddress}</p>
                      <p className="text-slate-500 mt-1">{settings.postalAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#36A853] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Telephone Hotline</h4>
                      <a
                        href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                        className="font-semibold text-slate-900 hover:text-[#E85B22] transition-colors mt-0.5 block"
                      >
                        {settings.phone}
                      </a>
                      <p className="text-[11px] text-slate-500">Official technical advisory desk</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#36A853] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                      <a
                        href={`mailto:${settings.email}`}
                        className="font-semibold text-slate-900 hover:text-[#E85B22] transition-colors mt-0.5 block"
                      >
                        {settings.email}
                      </a>
                      <p className="text-[11px] text-slate-500">Corporate correspondence & RFPs</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#36A853] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Business Working Hours</h4>
                      <p className="mt-0.5">{settings.workingHoursWeekday}</p>
                      <p>{settings.workingHoursSaturday}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Direct WhatsApp Chat</span>
                  </button>
                  <a
                    href="https://maps.google.com/?q=Gateway+Mall+Mombasa+Road+Nairobi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-slate-300 hover:border-slate-400 text-slate-700 py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-[#174B35]" />
                    <span>Google Maps Directions</span>
                  </a>
                </div>
              </div>

              {/* Map visual card */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white p-4 space-y-3">
                <div className="text-xs font-bold text-[#174B35] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#E85B22]" />
                  <span>Gateway Mall Mombasa Road Location</span>
                </div>
                <div className="h-44 rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-500 relative overflow-hidden border border-slate-200">
                  <iframe
                    title="SEEL Office Location"
                    src="https://maps.google.com/maps?q=Gateway+Mall+Mombasa+Road+Nairobi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    className="border-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Formal Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <div className="mb-8 space-y-2">
                <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
                  Lead Generation & Inquiries
                </div>
                <h3 className="text-2xl font-bold text-[#174B35]">
                  Send Us a Comprehensive Inquiry
                </h3>
                <p className="text-xs text-slate-600">
                  Fill in all relevant details below. All submissions are lodged securely in our engineering database and addressed within one business day.
                </p>
              </div>

              {confirmation ? (
                <div className="p-8 bg-emerald-50 border border-[#36A853] rounded-2xl text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-[#36A853] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#174B35]">
                    Inquiry Confirmed & Lodged
                  </h4>
                  <div className="text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-emerald-200 inline-block text-slate-700">
                    Tracking ID: <strong>{confirmation.id}</strong>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                    {confirmation.message}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setConfirmation(null)}
                      className="bg-[#174B35] hover:bg-[#113827] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      Submit Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={e => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g. Dr. Jane Mutua"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Safari Enterprises Ltd"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="jane.mutua@company.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+254 722 000 000"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.country}
                        onChange={e => setForm({ ...form, country: e.target.value })}
                        placeholder="Kenya / Uganda / Tanzania"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Service Required *
                      </label>
                      <select
                        value={form.serviceRequired}
                        onChange={e => setForm({ ...form, serviceRequired: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      >
                        {services.map(s => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Project Site Location
                      </label>
                      <input
                        type="text"
                        value={form.projectLocation}
                        onChange={e => setForm({ ...form, projectLocation: e.target.value })}
                        placeholder="e.g. Athi River Industrial Zone"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                        placeholder="e.g. Stack testing quotation request"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Project Description & Technical Scope *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Please specify your equipment, number of stacks, testing timeline, or NEMA compliance deadlines..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Supporting Document References (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.attachmentNote}
                      onChange={e => setForm({ ...form, attachmentNote: e.target.value })}
                      placeholder="e.g. Architectural drawings, NEMA improvement notice number, or layout plans"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>

                  {/* Anti-Spam Human Verification */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-slate-700 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#36A853]" />
                      <span>Security verification: What is <strong>{captchaNum1} + {captchaNum2}</strong>?</span>
                    </div>
                    <input
                      type="text"
                      required
                      value={form.mathAnswer}
                      onChange={e => setForm({ ...form, mathAnswer: e.target.value })}
                      placeholder="Enter sum"
                      className="w-24 bg-white border border-slate-300 rounded p-1.5 text-xs text-center focus:outline-none focus:border-[#36A853]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Protected by 256-bit encryption.
                    </span>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#E85B22] hover:bg-[#d64e17] text-white px-8 py-3 rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Submitting to Desk...' : 'Submit Inquiry'}</span>
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
